"use client";

import { useRef } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { comoTrabajamos } from "@/content/home";

/* La línea del timeline se dibuja conforme se hace scroll: el
   movimiento explica el contenido (fase 1 antes que fase 2) en vez
   de decorarlo. scaleY sobre una línea de altura fija — no se anima
   height, que provocaría relayout en cada frame. */

export function ComoTrabajamos() {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = usarMovimientoReducido();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const escala = useTransform(progreso, [0, 1], [0, 1]);

  return (
    <Seccion id="como-trabajamos" tono="oscuro">
      <div className="malla malla-fade absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative max-w-[62ch]">
        <Antetitulo tono="oscuro">{comoTrabajamos.categoria}</Antetitulo>
        <TituloSeccion className="text-white">{comoTrabajamos.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-6 text-[16.5px] leading-relaxed text-white/65">
            {comoTrabajamos.entradilla}
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-14 pl-9 sm:pl-14">
        {/* Raíl y línea de progreso */}
        <div
          className="absolute bottom-4 left-[13px] top-3 w-px bg-white/10 sm:left-[21px]"
          aria-hidden="true"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reducido ? 1 : escala }}
          className="absolute bottom-4 left-[13px] top-3 w-px origin-top bg-gradient-to-b from-mint via-mint/70 to-coral sm:left-[21px]"
        />

        <div className="flex flex-col gap-12 sm:gap-16">
          {comoTrabajamos.fases.map((fase, i) => (
            <Reveal key={fase.etiqueta} direccion="arriba" retraso={0.05}>
              <div className="relative">
                {/* Nudo del timeline */}
                <span
                  aria-hidden="true"
                  className="absolute -left-9 top-1 flex h-[27px] w-[27px] items-center justify-center rounded-full
                             border border-mint/30 bg-bottle-900 font-mono text-[11px] text-mint sm:-left-14 sm:h-[43px] sm:w-[43px] sm:text-[13px]"
                >
                  {i + 1}
                </span>

                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-coral">
                  {fase.etiqueta}
                </span>
                <h3 className="mt-2.5 text-[22px] text-white sm:text-[26px]">{fase.titulo}</h3>
                <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-white/65">
                  {fase.texto}
                </p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {fase.puntos.map((punto) => (
                    <li
                      key={punto}
                      className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[.03] px-3.5 py-2.5 text-[14px] text-white/70"
                    >
                      <Check
                        size={13}
                        strokeWidth={3}
                        className="mt-1 shrink-0 text-mint"
                        aria-hidden="true"
                      />
                      {punto}
                    </li>
                  ))}
                </ul>

                {fase.cierre && (
                  <p className="mt-5 max-w-[60ch] border-l-2 border-coral/60 pl-4 text-[15px] leading-relaxed text-white/75">
                    {fase.cierre}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
