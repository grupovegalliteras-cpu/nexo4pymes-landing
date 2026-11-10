"use client";

import { useEffect } from "react";

/* ============================================================
   LAS ENTRADAS AL HACER SCROLL, EN LA WEB NORMAL

   POR QUÉ EXISTE. La portada nueva (06/11/2026) se escribió sin una
   sola entrada: todas las secciones estaban ya colocadas desde el
   primer fotograma. Sumado a que en Windows se cortaban las pocas
   animaciones que había, la página se leía como un folleto impreso.

   CÓMO FUNCIONA. Esto no anima nada: solo marca con data-visto lo
   que entra en pantalla. La animación está en CSS, en el bloque
   [data-revelar] de app/(demo)/deeptech.css, que es la misma entrada
   que usa /deeptech y así no hay dos.

   LO QUE NO HACE, A PROPÓSITO. No usa framer-motion. Esa entrada ya
   existe en components/motion/Reveal.tsx, pero obliga a convertir en
   cliente cada trozo que se quiera animar y a bajarse la librería.
   La portada es HTML del servidor de principio a fin; esto son dos
   kilobytes que no tocan el árbol de React.

   PARA USARLO: <Revelar /> una vez en la página y data-revelar en lo
   que tenga que entrar. El escalonado se pide con el estilo --d:
   style={{ "--d": "80ms" }}.
   ============================================================ */
export function Revelar() {
  useEffect(() => {
    const porRevelar = document.querySelectorAll<HTMLElement>("[data-revelar]");
    if (!porRevelar.length) return;

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.visto = "1";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    porRevelar.forEach((el) => io.observe(el));

    /* RED DE SEGURIDAD. Estos elementos arrancan en opacidad 0: si el
       aviso del observador no llega, no es que no se animen, es que no
       se ven. Y puede no llegar: una pestaña abierta en segundo plano
       —el botón central del ratón, las pestañas que restaura el
       navegador al arrancar— tiene los observadores congelados en
       Chrome. Sería un fallo mudo: nadie avisa de media página en
       blanco, simplemente se va.

       Así que a los 900 ms se mira a mano quién está en pantalla, y se
       vuelve a mirar cuando la pestaña pasa a primer plano. Lo de más
       abajo conserva su entrada al hacer scroll. Es la misma red que
       components/deeptech/movimiento.ts, por el mismo motivo. */
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

    return () => {
      io.disconnect();
      window.clearTimeout(reloj);
      document.removeEventListener("visibilitychange", rescatar);
    };
  }, []);

  return null;
}
