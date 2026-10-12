"use client";

import { useEffect } from "react";

/* Todo el movimiento ligado al scroll de la portada, en un solo sitio.

   · Scroll suave con Lenis, sincronizado con ScrollTrigger de GSAP. Los
     paneles con scroll propio (el chat de prueba, el panel incrustado)
     llevan data-lenis-prevent para que la rueda funcione dentro.
   · Un único IntersectionObserver marca con data-visto lo que entra en
     pantalla. Las animaciones de entrada están en CSS y se disparan con
     ese atributo: [data-revelar] (profundidad + enfoque de lente),
     [data-glitch] (titulares) y cualquier gráfico que lo escuche.
   · Animaciones atadas al scroll (scrub), declaradas con data-scrub:
       "salida-hero" → el texto del hero se aleja y se desenfoca
       "inclinar"    → la pieza llega inclinada en 3D y se endereza
       "haz"         → una línea que se dibuja al ritmo del scroll
   Lenis, GSAP y ScrollTrigger se descargan aparte, después de pintar.

   Con «reducir movimiento» no hay scroll suave ni scrub: todo se ve
   directamente en su sitio. */
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-revelar], [data-glitch], [data-al-ver]").forEach((el) => io.observe(el));

    if (reducir) return () => io.disconnect();

    let cancelado = false;
    let limpiar = () => {};
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (cancelado) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tic = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tic);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('[data-scrub="salida-hero"]').forEach((el) => {
          gsap.to(el, {
            y: -70,
            scale: 0.94,
            opacity: 0,
            filter: "blur(8px)",
            ease: "none",
            scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom 15%", scrub: true },
          });
        });
        document.querySelectorAll<HTMLElement>('[data-scrub="inclinar"]').forEach((el) => {
          gsap.fromTo(
            el,
            { rotateX: 26, scale: 0.88, y: 90, transformPerspective: 1600, transformOrigin: "50% 100%" },
            { rotateX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 28%", scrub: 0.6 } },
          );
        });
        document.querySelectorAll<HTMLElement>('[data-scrub="haz"]').forEach((el) => {
          gsap.fromTo(el, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top 65%", end: "bottom 65%", scrub: 0.4 } });
        });
      });

      limpiar = () => {
        ctx.revert();
        gsap.ticker.remove(tic);
        lenis.destroy();
      };
    });

    return () => {
      cancelado = true;
      io.disconnect();
      limpiar();
    };
  }, []);
}
