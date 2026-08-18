"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Boton } from "@/components/ui/Boton";
import { TextoPorPalabras } from "@/components/motion/TextoPorPalabras";
import { SALIDA } from "@/components/motion/Reveal";
import { heroServicios } from "@/content/servicios";
import { marca } from "@/content/marca";

/* ============================================================
   HERO DE /servicios
   Sin imagen: esta página es de detalle, no de captación, así que
   el hero es solo texto + índice de anclas a las ocho secciones.
   ============================================================ */

export function HeroServicios() {
  const reducido = usarMovimientoReducido();

  const entrada = (retraso: number) => ({
    initial: reducido ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducido ? 0.001 : 0.7, delay: reducido ? 0 : retraso, ease: SALIDA },
  });

  const palabrasA = heroServicios.titularA.split(" ").length;

  return (
    <section id="top" className="relative px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
      <div className="relative mx-auto max-w-[900px]">
        <motion.div {...entrada(0)}>
          <Link
            href={heroServicios.volver.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md transition-colors hover:border-azul/40 hover:text-white"
          >
            {heroServicios.volver.texto}
          </Link>
        </motion.div>

        <h1 className="mt-6 text-[clamp(2.2rem,6vw,4.4rem)] font-bold leading-[1.06] tracking-[-0.035em] text-[#F4F6FF]">
          <TextoPorPalabras texto={heroServicios.titularA} retraso={0.16} />
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
            {heroServicios.titularB}
          </motion.span>
        </h1>

        <motion.p {...entrada(0.55)} className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-white/66 sm:text-[18.5px]">
          {heroServicios.parrafo}
        </motion.p>

        <motion.div {...entrada(0.64)} className="mt-8">
          <Boton href={marca.calendly} externo tamano="lg" flecha magnetico>
            {heroServicios.cta}
          </Boton>
        </motion.div>

        <motion.nav
          {...entrada(0.74)}
          aria-label="Índice"
          className="mt-10 flex flex-wrap gap-2 border-t border-white/8 pt-8"
        >
          {heroServicios.indice.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/10 bg-white/[.03] px-3.5 py-1.5 text-[13px] text-white/65 transition-colors duration-200 hover:border-azul/40 hover:bg-azul/10 hover:text-white"
            >
              {item.texto}
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
