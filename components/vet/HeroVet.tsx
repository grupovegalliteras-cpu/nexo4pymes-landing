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

   FASE 2: el hero ocupaba 1.457 px en móvil (1,8 pantallas) y la
   captura del buzón —el mejor argumento de la página— empezaba en el
   píxel 868, o sea nunca junto al titular. Ahora cabe en una pantalla:
   H1 a 29 px, un solo botón, microcopia de una línea y la prueba
   convertida en una tarjeta compacta.

   La captura es un único <Image> que cambia de forma con CSS, no dos
   imágenes: en móvil es una miniatura de 58 px dentro de una fila
   (`sizes` hace que el navegador descargue la versión pequeña, que es
   lo que arregla el LCP); a partir de lg vuelve a ser la tarjeta
   grande con la insignia flotante de siempre.
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
    <section id="top" className="relative px-5 pb-10 pt-24 sm:px-8 sm:pb-20 sm:pt-40">
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <motion.span
            {...entrada(0.05)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[.045] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-mint anim-respirar" />
            {heroVet.categoria}
          </motion.span>

          {/* El mínimo del clamp era 2.5rem: a 375 px daba 40 px, o sea
              líneas de 9 caracteres y cinco filas de titular. A 1.8rem
              son ~29 px y tres filas. El máximo de escritorio no cambia. */}
          <h1 className="mt-5 max-w-[15ch] text-[clamp(1.8rem,7vw,5.5rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[#F4F6FF] sm:mt-6 sm:leading-[1.03] sm:tracking-[-0.035em]">
            <TextoPorPalabras texto={heroVet.titularA} retraso={0.16} />
            <motion.span
              className="texto-degradado block"
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
            className="mt-4 max-w-[52ch] text-[16px] leading-[1.5] text-white/66 sm:mt-6 sm:text-[18.5px] sm:leading-relaxed"
          >
            {heroVet.subtituloA}
            <strong className="font-semibold text-[#E9EBF4]">{heroVet.subtituloB}</strong>
            {heroVet.subtituloC}
          </motion.p>

          {/* En móvil el botón ocupa el ancho completo y el enlace
              secundario baja a texto: dos botones apilados costaban
              150 px y hacían dudar sobre cuál es la acción principal. */}
          <motion.div {...entrada(0.66)} className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Boton href={marca.calendly} externo tamano="lg" flecha magnetico className="w-full sm:w-auto">
              {heroVet.ctaPrincipal}
            </Boton>
            <a
              href={heroVet.ctaSecundario.href}
              className="inline-flex items-center justify-center gap-2 rounded-full py-3 text-[14.5px] font-medium text-white/70 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:text-white
                         sm:border sm:border-white/14 sm:bg-white/[.03] sm:px-6 sm:py-4 sm:text-[15px] sm:text-white/85 sm:no-underline sm:backdrop-blur-md sm:hover:border-azul/45 sm:hover:bg-azul/10"
            >
              {heroVet.ctaSecundario.texto}
            </a>
          </motion.div>

          <motion.p {...entrada(0.76)} className="mt-3 max-w-[46ch] font-mono text-[12px] leading-relaxed text-white/55 sm:mt-6">
            {heroVet.micro}
          </motion.p>
        </div>

        <motion.div
          initial={reducido ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducido ? 0.001 : 1, delay: reducido ? 0 : 0.25, ease: SALIDA }}
          className="relative mx-auto w-full lg:max-w-[400px]"
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[10%] hidden rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(76,125,255,.4),rgba(176,107,245,.18)_45%,transparent_70%)] blur-[30px] lg:block"
          />
          <div
            ref={tilt.ref}
            className="relative flex items-center gap-3.5 rounded-2xl border border-white/13 bg-gradient-to-br from-white/[.09] to-white/[.02] p-3 backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] lg:block lg:rounded-panel lg:p-3.5 lg:shadow-[0_40px_90px_rgba(0,0,0,.6),0_0_0_1px_rgba(76,125,255,.14),inset_0_1px_0_rgba(255,255,255,.22)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-[58px] shrink-0 overflow-hidden rounded-caja border border-white/8 lg:w-full lg:rounded-tarjeta">
              <Image
                src="/assets/inbox-real.jpg"
                alt={heroVet.imagenAlt}
                width={800}
                height={1000}
                /* En móvil el navegador descarga ~64 px de ancho en vez de
                   828: es el arreglo de LCP más barato de toda la página. */
                sizes="(max-width: 1023px) 64px, 400px"
                className="h-[72px] w-full object-cover object-top contrast-[1.05] brightness-[.92] saturate-[.85] lg:h-auto lg:object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3 lg:absolute lg:-left-5 lg:bottom-9 lg:rounded-2xl lg:border lg:border-white/14 lg:bg-[rgba(10,12,22,.72)] lg:px-4 lg:py-3.5 lg:shadow-[0_20px_50px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.18)] lg:backdrop-blur-xl">
              <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-coral anim-respirar" />
              <div>
                <div className="font-titular text-[16px] font-bold leading-tight text-[#F4F6FF] lg:text-[17px]">
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
