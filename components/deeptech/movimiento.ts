"use client";

import { useEffect } from "react";
import { quietoPorPreferencia } from "./decision-movimiento";

/* Todo el movimiento ligado al scroll de la portada, en un solo sitio.

   · El scroll es el del navegador, sin suavizado. Hubo Lenis y se quitó:
     la página iba por detrás de la rueda y se notaba lenta.
   · Un único IntersectionObserver marca con data-visto lo que entra en
     pantalla. Las entradas están en CSS y se disparan con ese atributo:
     [data-revelar] (fundido corto hacia arriba) y los gráficos que lo
     escuchan con [data-al-ver].
   · Animaciones atadas al scroll (scrub), declaradas con data-scrub:
       "salida-hero" → el texto del hero se aleja al bajar
       "inclinar"    → la pieza llega inclinada en 3D y se endereza
       "haz"         → una línea que se dibuja al ritmo del scroll
     Van pegadas al scroll (scrub: true), sin retardo que las haga ir detrás.
   GSAP y ScrollTrigger se descargan aparte, después de pintar.

   Con «reducir movimiento» no habría scrub y todo se vería directamente
   en su sitio — pero hoy la portada se mueve siempre: el porqué está en
   ./decision-movimiento.ts, que es donde se revierte. */
export function useMovimientoPortada() {
  useEffect(() => {
    const reducir = quietoPorPreferencia();

    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.visto = "1";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -4% 0px" },
    );
    const porRevelar = document.querySelectorAll<HTMLElement>("[data-revelar], [data-al-ver]");
    porRevelar.forEach((el) => io.observe(el));

    /* ============================================================
       RED DE SEGURIDAD: SI EL OBSERVADOR NO AVISA, SE ENSEÑA IGUAL

       Estos elementos arrancan escondidos (opacidad 0 y desplazados)
       y solo aparecen cuando el observador les pone data-visto. Son
       43 en la portada. Si ese aviso no llega, no es que no se
       animen: es que no se ven.

       Y puede no llegar. Una pestaña abierta en segundo plano —un
       enlace con el botón central, las pestañas que restaura el
       navegador al arrancar— tiene los observadores de intersección
       congelados en Chrome. Se reanudan al mirarla, pero el riesgo
       es media portada en blanco y es un fallo silencioso: nadie
       avisa, simplemente se va.

       Así que a los 900 ms se mira a mano quién está en pantalla y
       se le quita el escondite, y se vuelve a mirar cuando la
       pestaña pasa a primer plano. Solo rescata lo que de verdad se
       ve; lo de más abajo conserva su entrada al hacer scroll.

       Hasta hoy esto no hacía falta, porque con movimiento reducido
       el escondite ni se aplicaba. Ahora la portada se mueve siempre
       (ver ./decision-movimiento.ts), así que el escondite aplica
       para todo el mundo y la red pasa a ser necesaria. */
    const rescatar = () => {
      for (const el of porRevelar) {
        if (el.dataset.visto) continue;
        const caja = el.getBoundingClientRect();
        if (caja.top < window.innerHeight && caja.bottom > 0) {
          el.dataset.visto = "1";
          io.unobserve(el);
        }
      }
    };
    const reloj = window.setTimeout(rescatar, 900);
    document.addEventListener("visibilitychange", rescatar);
    const soltarRed = () => {
      window.clearTimeout(reloj);
      document.removeEventListener("visibilitychange", rescatar);
    };

    if (reducir) {
      return () => {
        soltarRed();
        io.disconnect();
      };
    }

    let cancelado = false;
    let limpiar = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelado) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('[data-scrub="salida-hero"]').forEach((el) => {
          gsap.to(el, {
            y: -60,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom 15%", scrub: true },
          });
        });
        document.querySelectorAll<HTMLElement>('[data-scrub="inclinar"]').forEach((el) => {
          gsap.fromTo(
            el,
            { rotateX: 18, scale: 0.92, y: 60, transformPerspective: 1600, transformOrigin: "50% 100%" },
            { rotateX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 45%", scrub: true } },
          );
        });
        document.querySelectorAll<HTMLElement>('[data-scrub="haz"]').forEach((el) => {
          gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top 70%", end: "bottom 70%", scrub: true } });
        });
      });
      limpiar = () => ctx.revert();
    });

    return () => {
      cancelado = true;
      soltarRed();
      io.disconnect();
      limpiar();
    };
  }, []);
}
