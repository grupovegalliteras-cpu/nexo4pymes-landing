"use client";

import Link from "@/components/i18n/Enlace";
import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { TextoPorPalabras } from "@/components/motion/TextoPorPalabras";
import { FUNDIDO_SIN_MOVIMIENTO, SALIDA } from "@/components/motion/Reveal";
import { Caustics } from "@/components/site/caustics";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { contenido } from "@/content/i18n";
import { useIdioma } from "@/components/i18n/idioma";

/* ============================================================
   HERO DE /servicios

   EL FONDO ES EL MISMO QUE EL DE LAS PÁGINAS DE SECTOR, y eso es lo
   que se pidió: que la web entera se vea igual. Agua en movimiento
   (Caustics, WebGL) sobre el azul profundo, con un velo encima para
   que el texto se lea. El velo cambia de dirección en escritorio
   —de izquierda a derecha en vez de de arriba abajo— porque ahí el
   texto ocupa la mitad izquierda y el agua se tiene que ver a la
   derecha.

   ESTO NO DEPENDE DEL MODO CLARO U OSCURO. Es una franja de color
   fijo, como el hero de los sectores: dentro de ella el texto es
   blanco a propósito. El resto de la página sí cambia con el modo.

   SIN IMAGEN DE PRODUCTO: esta página es de detalle, no de
   captación, así que el hero es texto + índice de anclas a las ocho
   secciones. El índice no es decoración — es lo que deja ver de un
   golpe que debajo hay ocho apartados y no un folleto.
   ============================================================ */

export function HeroServicios() {
  const lang = useIdioma();
  const { heroServicios } = contenido(lang).servicios;
  const reducido = usarMovimientoReducido();

  const entrada = (retraso: number) => ({
    initial: reducido ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    /* Con movimiento reducido se funde en vez de saltar; el porqué
       está en components/motion/Reveal.tsx. */
    transition: { duration: reducido ? FUNDIDO_SIN_MOVIMIENTO : 0.7, delay: reducido ? 0 : retraso, ease: SALIDA },
  });

  const palabrasA = heroServicios.titularA.split(" ").length;

  return (
    <section id="top" className="relative overflow-hidden bg-[#041820] text-white">
      <div className="absolute inset-0">
        <Caustics />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.55),rgb(4_24_32/0.92))] lg:bg-[linear-gradient(100deg,rgb(4_24_32/0.94),rgb(4_24_32/0.45))]" />
      </div>
      {/* Degradado al fondo de la página: sin esto el hero acaba en una
          línea recta de color y se ve el corte. */}
      <div aria-hidden="true" className="to-bg absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent" />

      <div className="relative mx-auto max-w-[900px] px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
        <motion.div {...entrada(0)}>
          <Link
            href={heroServicios.volver.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-white/75 uppercase transition-colors hover:border-white/35 hover:text-white"
          >
            {heroServicios.volver.texto}
          </Link>
        </motion.div>

        <h1 className="font-display mt-6 text-[clamp(2.1rem,6vw,4.2rem)] leading-[1.06] font-semibold tracking-[-0.03em]">
          <TextoPorPalabras texto={heroServicios.titularA} retraso={0.16} />
          <motion.span
            className="block text-[#8fd9ea]"
            initial={reducido ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducido ? FUNDIDO_SIN_MOVIMIENTO : 0.72,
              delay: reducido ? 0 : 0.16 + palabrasA * 0.045,
              ease: SALIDA,
            }}
          >
            {heroServicios.titularB}
          </motion.span>
        </h1>

        <motion.p {...entrada(0.55)} className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-white/75 sm:text-[18.5px]">
          {heroServicios.parrafo}
        </motion.p>

        <motion.div {...entrada(0.64)} className="mt-8">
          <a
            href={waLink("GENERAL", undefined, lang)}
            target="_blank"
            rel="noopener"
            className="vibrar inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-6 text-[16px] font-semibold text-white transition hover:brightness-110 sm:h-12 sm:text-[15px]"
          >
            <MessageCircle className="size-5" />
            {heroServicios.cta}
          </a>
        </motion.div>

        <motion.nav
          {...entrada(0.74)}
          aria-label={lang === "de" ? "Inhalt" : lang === "en" ? "Contents" : "Índice"}
          className="mt-10 flex flex-wrap gap-2 border-t border-white/12 pt-8"
        >
          {heroServicios.indice.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/70 transition-colors duration-200 hover:border-white/30 hover:text-white"
            >
              {item.texto}
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
