"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { useTilt } from "@/components/motion/useTilt";
import { Boton } from "@/components/ui/Boton";
import { TextoPorPalabras } from "@/components/motion/TextoPorPalabras";
import { SALIDA } from "@/components/motion/Reveal";
import { heroVet } from "@/content/vet";
import { marca } from "@/content/marca";

/* ============================================================
   HERO DE LA HOME REDISEÑADA
   Fondo ambiental (manchas de color + rejilla + viñeta) fijo detrás
   de toda la página, montado una vez en app/page.tsx — aquí solo va
   el contenido del hero.
   ============================================================ */

export function HeroVet() {
  const reducido = usarMovimientoReducido();
  const tilt = useTilt<HTMLDivElement>();

  const entrada = (retraso: number) => ({
    initial: reducido ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducido ? 0.001 : 0.7, delay: reducido ? 0 : retraso, ease: SALIDA },
  });

  const palabrasA = heroVet.titularA.split(" ").length;

  return (
    <section id="top" className="relative px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <motion.span
            {...entrada(0.05)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[.045] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-mint anim-respirar" />
            {heroVet.categoria}
          </motion.span>

          <h1 className="mt-6 max-w-[15ch] text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.03] tracking-[-0.035em] text-[#F4F6FF]">
            <TextoPorPalabras texto={heroVet.titularA} retraso={0.16} />
            <motion.span
              className="texto-degradado-sheen block"
              initial={reducido ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducido ? 0.001 : 0.72,
                delay: reducido ? 0 : 0.16 + palabrasA * 0.045,
                ease: SALIDA,
              }}
            >
              {heroVet.titularB}
            </motion.span>
          </h1>

          <motion.p
            {...entrada(0.55)}
            className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-white/66 sm:text-[18.5px]"
          >
            {heroVet.subtituloA}
            <strong className="font-semibold text-[#E9EBF4]">{heroVet.subtituloB}</strong>
            {heroVet.subtituloC}
          </motion.p>

          <motion.div {...entrada(0.66)} className="mt-8 flex flex-wrap items-center gap-4">
            <Boton href={marca.calendly} externo tamano="lg" flecha magnetico>
              {heroVet.ctaPrincipal}
            </Boton>
            <a
              href={heroVet.ctaSecundario.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[.03] px-6 py-4 text-[15px] font-medium text-white/85 backdrop-blur-md transition-colors duration-300 hover:border-azul/45 hover:bg-azul/10 hover:text-white"
            >
              {heroVet.ctaSecundario.texto}
            </a>
          </motion.div>

          <motion.p {...entrada(0.76)} className="mt-6 max-w-[46ch] font-mono text-[12px] leading-relaxed text-white/55">
            {heroVet.micro}
          </motion.p>
        </div>

        <motion.div
          initial={reducido ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducido ? 0.001 : 1, delay: reducido ? 0 : 0.25, ease: SALIDA }}
          className="relative mx-auto w-full max-w-[400px]"
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(76,125,255,.4),rgba(176,107,245,.18)_45%,transparent_70%)] blur-[30px]"
          />
          <div
            ref={tilt.ref}
            className="relative rounded-[28px] border border-white/13 bg-gradient-to-br from-white/[.09] to-white/[.02] p-3.5 shadow-[0_40px_90px_rgba(0,0,0,.6),0_0_0_1px_rgba(76,125,255,.14),inset_0_1px_0_rgba(255,255,255,.22)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="overflow-hidden rounded-[18px] border border-white/8">
              <Image
                src="/assets/inbox-real.jpg"
                alt={heroVet.imagenAlt}
                width={800}
                height={1000}
                className="w-full contrast-[1.05] brightness-[.92] saturate-[.85]"
                priority
              />
            </div>

            <div className="absolute -left-5 bottom-9 flex items-center gap-3 rounded-2xl border border-white/14 bg-[rgba(10,12,22,.72)] px-4 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl">
              <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-coral anim-respirar" />
              <div>
                <div className="font-titular text-[17px] font-bold leading-tight text-[#F4F6FF]">
                  {heroVet.badgeImagen.titulo}
                </div>
                <div className="mt-0.5 font-mono text-[10.5px] text-white/50">{heroVet.badgeImagen.texto}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
