"use client";

import { useEffect } from "react";

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

   Con «reducir movimiento» no hay scrub: todo se ve directamente en su sitio. */
export function useMovimientoPortada() {
  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    document.querySelectorAll("[data-revelar], [data-al-ver]").forEach((el) => io.observe(el));

    if (reducir) return () => io.disconnect();

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
      io.disconnect();
      limpiar();
    };
  }, []);
}
