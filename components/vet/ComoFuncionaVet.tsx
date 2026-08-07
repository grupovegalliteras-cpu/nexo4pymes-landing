"use client";

import { useRef } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Icono } from "@/components/ui/Icono";
import { comoFuncionaVet } from "@/content/vet";

/* Stepper de tres pasos: horizontal en escritorio, vertical en móvil.
   La barra de progreso avanza con el scroll para que se entienda que
   son tres fases en orden, no un paquete cerrado. */

export function ComoFuncionaVet() {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = usarMovimientoReducido();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const escalaX = useTransform(progreso, [0, 1], [0, 1]);
  const escalaY = useTransform(progreso, [0, 1], [0, 1]);

  return (
    <Seccion id="como-funciona" tono="oscuro">
      <div className="malla malla-fade absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative max-w-[62ch]">
        <Antetitulo tono="oscuro">{comoFuncionaVet.categoria}</Antetitulo>
        <TituloSeccion className="text-white">{comoFuncionaVet.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-6 text-[16px] leading-relaxed text-white/65">
            {comoFuncionaVet.entradilla}
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-14">
        {/* Raíl horizontal (escritorio) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[27px] hidden h-px bg-white/10 sm:block"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleX: reducido ? 1 : escalaX }}
          className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-gradient-to-r from-mint to-coral sm:block"
        />

        {/* Raíl vertical (móvil) */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10 sm:hidden"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reducido ? 1 : escalaY }}
          className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-mint to-coral sm:hidden"
        />

        <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {comoFuncionaVet.pasos.map((paso, i) => (
            <Reveal key={paso.num} retraso={i * 0.12}>
              <div className="relative flex gap-5 sm:block">
                <span
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full
                             border border-mint/25 bg-bottle-900 font-mono text-[15px] text-mint"
                >
                  {paso.num}
                </span>

                <div className="sm:mt-6">
                  <span className="text-mint">
                    <Icono nombre={paso.icono} size={19} />
                  </span>
                  <h3 className="mt-3 text-[21px] text-white">{paso.titulo}</h3>
                  <p className="mt-2.5 max-w-[38ch] text-[15px] leading-relaxed text-white/65">
                    {paso.texto}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
