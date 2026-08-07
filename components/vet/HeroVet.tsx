"use client";

import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Boton } from "@/components/ui/Boton";
import { HeroOrbita } from "@/components/mockups/HeroOrbita";
import { TextoPorPalabras } from "@/components/motion/TextoPorPalabras";
import { SALIDA } from "@/components/motion/Reveal";
import { heroVet } from "@/content/vet";
import { marca } from "@/content/marca";

/* Hero de la landing. Mismos elementos flotantes que la portada, pero
   girando en torno a WhatsApp + agenda + recordatorio de vacuna, que es
   de lo que habla esta página. */

export function HeroVet() {
  const reducido = usarMovimientoReducido();

  const entrada = (retraso: number) => ({
    initial: reducido ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducido ? 0.001 : 0.7, delay: reducido ? 0 : retraso, ease: SALIDA },
  });

  return (
    <section
      id="top"
      className="oscuro relative overflow-hidden bg-bottle-900 px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-28 sm:pt-36"
    >
      <div className="malla malla-fade absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-teal/22 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-25%] right-[-12%] h-[520px] w-[520px] rounded-full bg-coral/16 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <motion.span
            {...entrada(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-mint sm:text-[10.5px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint anim-respirar" />
            {heroVet.categoria}
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.35rem,7.6vw,4.2rem)] leading-[1.02]">
            <TextoPorPalabras texto={heroVet.titularA} retraso={0.16} />{" "}
            <TextoPorPalabras
              texto={heroVet.titularB}
              retraso={0.16 + heroVet.titularA.split(" ").length * 0.045}
              resaltar="ni una cita por WhatsApp"
            />
          </h1>

          <motion.p
            {...entrada(0.55)}
            className="mt-6 max-w-[56ch] text-[16.5px] leading-relaxed text-white/70 sm:text-[17.5px]"
          >
            {heroVet.subtitulo}
          </motion.p>

          <motion.div {...entrada(0.66)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Boton href={marca.calendly} externo tamano="lg" flecha>
              {heroVet.ctaPrincipal}
            </Boton>
            <Boton href={heroVet.ctaSecundario.href} variante="secundario" tamano="lg">
              {heroVet.ctaSecundario.texto}
            </Boton>
          </motion.div>

          <motion.p
            {...entrada(0.76)}
            className="mt-6 max-w-[52ch] text-[13.5px] leading-relaxed text-white/45"
          >
            {heroVet.micro}
          </motion.p>
        </div>

        <motion.div
          initial={reducido ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducido ? 0.001 : 1, delay: reducido ? 0 : 0.25, ease: SALIDA }}
          /* En móvil la ilustración va DESPUÉS del titular: si se pone
             encima, el mensaje y el botón caen fuera de la primera pantalla. */
        >
          <HeroOrbita variante="vet" />
        </motion.div>
      </div>
    </section>
  );
}
