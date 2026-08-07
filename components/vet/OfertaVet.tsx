"use client";

import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Check, Clock } from "lucide-react";
import { Antetitulo, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Contador } from "@/components/ui/Contador";
import { Boton } from "@/components/ui/Boton";
import { ofertaVet } from "@/content/vet";
import { marca, oferta } from "@/content/marca";

/* ============================================================
   LA OFERTA — el bloque que tiene que ganar la mirada
   Es la única tarjeta de todo el sitio con borde coral y halo: si
   ese tratamiento se repitiera en otra sección, dejaría de señalar
   nada.

   Las cifras (150€, 250–450€, 3 plazas) salen de content/marca.ts.
   No se escriben a mano aquí.
   ============================================================ */

export function OfertaVet() {
  const reducido = usarMovimientoReducido();

  return (
    <section
      id="diagnostico"
      className="oscuro relative overflow-hidden bg-bottle-900 px-5 py-20 text-white sm:px-8 sm:py-28"
    >
      <div className="malla malla-fade absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/12 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1120px]">
        <Antetitulo tono="oscuro">{ofertaVet.categoria}</Antetitulo>
        <TituloSeccion className="text-white">{ofertaVet.titular}</TituloSeccion>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ---------- TARJETA DE PRECIO ---------- */}
          <Reveal direccion="escala">
            <div className="relative rounded-[26px] border border-coral/45 bg-bottle-800/70 p-6 backdrop-blur-sm sm:p-8">
              {/* Halo del borde, en respiración lenta. */}
              <div
                aria-hidden="true"
                className="anim-respirar pointer-events-none absolute -inset-px -z-10 rounded-[26px] bg-coral/25 blur-lg"
              />

              {oferta.ofertaActiva && (
                <span className="inline-flex items-center gap-2 rounded-full border border-coral/35 bg-coral/12 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-coral">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral anim-respirar" />
                  {ofertaVet.badge}
                </span>
              )}

              <div className="mt-6 flex flex-wrap items-end gap-4">
                {/* Precio anterior: el tachado se dibuja de izquierda a derecha. */}
                <span className="relative font-titular text-[24px] text-white/35 sm:text-[28px]">
                  {oferta.precioAntiguo}
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-white/45"
                    initial={reducido ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: reducido ? 0.001 : 0.5, delay: 0.5, ease: "easeOut" }}
                  />
                  <span className="sr-only"> (precio anterior)</span>
                </span>

                <span className="font-titular text-[62px] font-semibold leading-none text-white sm:text-[78px]">
                  <Contador hasta={oferta.precio} sufijo="€" />
                </span>
              </div>

              <p className="mt-2 text-[13.5px] text-white/45">{ofertaVet.notaPrecio}</p>

              {/* Plazas: tres puntos que se encienden. */}
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3">
                <Clock size={15} className="shrink-0 text-aviso" aria-hidden="true" />
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: oferta.plazasTotales }).map((_, i) => (
                    <motion.span
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i < oferta.plazasLibres ? "bg-aviso" : "bg-white/15"
                      }`}
                      initial={reducido ? { scale: 1 } : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        duration: reducido ? 0.001 : 0.35,
                        delay: 0.7 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  ))}
                </span>
                <span className="text-[13.5px] text-white/70">
                  Quedan {oferta.plazasLibres} de {oferta.plazasTotales} plazas — solo para las
                  primeras clínicas
                </span>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-white/68">
                {ofertaVet.argumento}
              </p>

              <hr className="my-6 border-white/10" />

              <ul className="space-y-3">
                {ofertaVet.incluye.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-white/72"
                    initial={reducido ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: reducido ? 0.001 : 0.45,
                      delay: reducido ? 0 : i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Check
                      size={14}
                      strokeWidth={3}
                      className="mt-1.5 shrink-0 text-mint"
                      aria-hidden="true"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8">
                <Boton href={marca.calendly} externo tamano="lg" flecha className="w-full">
                  {ofertaVet.cta}
                </Boton>
              </div>
            </div>
          </Reveal>

          {/* ---------- LATERAL ---------- */}
          <Reveal direccion="derecha" retraso={0.1}>
            <div className="flex h-full flex-col gap-5 rounded-[26px] border border-white/10 bg-white/[.03] p-6 sm:p-8">
              {ofertaVet.lateral.map((bloque, i) => (
                <div key={bloque.titulo}>
                  {i > 0 && <hr className="mb-5 border-white/10" />}
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
                    {bloque.titulo}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{bloque.texto}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
