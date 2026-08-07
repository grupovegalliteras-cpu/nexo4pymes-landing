"use client";

import Link from "next/link";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { motion } from "framer-motion";
import { ArrowDown, Check, Stethoscope } from "lucide-react";
import { Boton } from "@/components/ui/Boton";
import { HeroOrbita } from "@/components/mockups/HeroOrbita";
import { TextoPorPalabras } from "@/components/motion/TextoPorPalabras";
import { heroHome } from "@/content/home";
import { SALIDA } from "@/components/motion/Reveal";

/* Hero de la portada. El orden de entrada guía la lectura:
   categoría → titular → subtítulo → botones → detalle.
   El indicador de scroll cierra diciendo que hay más abajo.

   El H1 no menciona clínicas veterinarias a propósito: esa keyword
   la trabaja /veterinarias y aquí solo aparece en texto corrido. */

export function HeroHome() {
  const reducido = usarMovimientoReducido();

  const entrada = (retraso: number) => ({
    initial: reducido ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducido ? 0.001 : 0.7, delay: reducido ? 0 : retraso, ease: SALIDA },
  });

  return (
    <section className="oscuro relative overflow-hidden bg-bottle-900 px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-28 sm:pt-36">
      {/* Fondo: malla técnica + dos luces de marca muy difusas. */}
      <div className="malla malla-fade absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-teal/22 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 right-[-10%] h-[520px] w-[520px] rounded-full bg-coral/14 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <motion.span
            {...entrada(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/8 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mint"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint anim-respirar" />
            {heroHome.categoria}
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.3rem,7.4vw,4.15rem)] leading-[1.03]">
            <TextoPorPalabras texto={heroHome.titular} resaltar="con IA" retraso={0.16} />
          </h1>

          <motion.p
            {...entrada(0.5)}
            className="mt-6 max-w-[56ch] text-[16.5px] leading-relaxed text-white/70 sm:text-[17.5px]"
          >
            {heroHome.subtitulo}
          </motion.p>

          <motion.div {...entrada(0.62)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Boton href={heroHome.ctaPrincipal.href} tamano="lg" flecha>
              {heroHome.ctaPrincipal.texto}
            </Boton>
            <Boton href={heroHome.ctaSecundario.href} variante="secundario" tamano="lg">
              {heroHome.ctaSecundario.texto}
            </Boton>
          </motion.div>

          {/* Aviso de especialización → landing de veterinarias. */}
          <motion.div
            {...entrada(0.72)}
            className="mt-8 flex gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4"
          >
            <Stethoscope size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
            <p className="text-[14px] leading-relaxed text-white/65">
              <strong className="font-medium text-white">
                Estamos especializados en clínicas veterinarias
              </strong>
              , que es el sector que mejor conocemos, y trabajamos también con pymes y autónomos de
              las demás actividades que verás más abajo.{" "}
              <Link
                href="/veterinarias"
                className="font-medium text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:decoration-mint"
              >
                Si tienes una clínica veterinaria, entra aquí
              </Link>
              .
            </p>
          </motion.div>

          <ul className="mt-8 flex flex-col gap-2.5">
            {heroHome.bullets.map((bullet, i) => (
              <motion.li
                key={bullet}
                {...entrada(0.82 + i * 0.08)}
                className="flex items-center gap-2.5 text-[14.5px] text-white/60"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/12 text-mint">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {bullet}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={reducido ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducido ? 0.001 : 1, delay: reducido ? 0 : 0.25, ease: SALIDA }}
          /* En móvil la ilustración va DESPUÉS del titular: si se pone
             encima, el mensaje y el botón caen fuera de la primera pantalla. */
        >
          <HeroOrbita variante="home" />
        </motion.div>
      </div>

      {/* Indicador de scroll: solo en pantallas altas, donde hay sitio. */}
      <div className="relative mx-auto mt-16 hidden max-w-[1120px] lg:block">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          <ArrowDown size={13} className="anim-indicador" aria-hidden="true" />
          Sigue bajando
        </span>
      </div>
    </section>
  );
}
