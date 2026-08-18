"use client";

import { useEffect, useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { AnimatePresence, motion } from "framer-motion";

/* Barra de acción fija en móvil.

   FASE 4: antes los umbrales eran números mágicos —aparecía pasado el
   85 % del alto de pantalla y se escondía a 320 px del final—. Con el
   hero comprimido de 1.549 a 724 px esos números dejaron de
   corresponder a nada: la barra salía a media pantalla del hero,
   encima de su propio botón.

   Ahora se miden los dos elementos que de verdad marcan el momento:

   · aparece cuando el hero termina de salir por arriba, o sea justo
     cuando el CTA del hero deja de estar a la vista;
   · desaparece cuando asoma el bloque de cierre, para no poner dos
     botones idénticos en la misma pantalla.

   Si algún ancla no existe (otra página, otro montaje), cae a un
   comportamiento razonable en vez de romperse.

   Sigue siendo un listener de scroll pasivo y no un IntersectionObserver
   a propósito: aquí hace falta leer dos posiciones en el mismo frame y
   el coste real es una lectura de layout ya cacheada por el navegador. */
export function CtaMovil({
  texto,
  href,
  externo = false,
  nota,
  anclaInicio = "top",
  anclaFin = "cierre",
}: {
  texto: string;
  href: string;
  externo?: boolean;
  nota?: string;
  anclaInicio?: string;
  anclaFin?: string;
}) {
  const [visible, setVisible] = useState(false);
  const reducido = usarMovimientoReducido();

  useEffect(() => {
    const alScroll = () => {
      const hero = document.getElementById(anclaInicio);
      const fin = document.getElementById(anclaFin);

      const heroFuera = hero
        ? hero.getBoundingClientRect().bottom <= 8
        : window.scrollY > window.innerHeight * 0.6;

      const finALaVista = fin ? fin.getBoundingClientRect().top < window.innerHeight - 40 : false;

      setVisible(heroFuera && !finALaVista);
    };

    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, [anclaInicio, anclaFin]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducido ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducido ? 0 : 24 }}
          transition={{ duration: reducido ? 0.001 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bottle-900/92 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 backdrop-blur-lg sm:hidden"
        >
          <a
            href={href}
            target={externo ? "_blank" : undefined}
            rel={externo ? "noopener" : undefined}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-azul to-violeta px-5 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(76,125,255,.75)]"
          >
            {texto} <span aria-hidden="true">→</span>
          </a>
          {nota && (
            <p className="mt-1.5 text-center font-mono text-[12px] uppercase tracking-[0.1em] text-white/50">
              {nota}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
