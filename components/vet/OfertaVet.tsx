"use client";

import { motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Check, Clock, ShieldCheck } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Contador } from "@/components/ui/Contador";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { Boton } from "@/components/ui/Boton";
import { ofertaVet } from "@/content/vet";
import { marca, oferta } from "@/content/marca";

/* ============================================================
   LA OFERTA — el bloque que tiene que ganar la mirada.
   Las cifras (150€, 250–450€, 3 plazas) salen de content/marca.ts,
   no se escriben a mano aquí.
   ============================================================ */

export function OfertaVet() {
  const reducido = usarMovimientoReducido();

  return (
    <Seccion id="diagnostico" tono="oscuro-hondo" ancho="ancho">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azul/10 blur-[140px]"
      />

      <Antetitulo tono="oscuro">{ofertaVet.categoria}</Antetitulo>
      <TituloSeccion className="text-[#F4F6FF]">{ofertaVet.titular}</TituloSeccion>

      <div className="relative mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* ---------- TARJETA DE PRECIO ---------- */}
        <Reveal direccion="escala">
          <div className="relative rounded-[26px] border border-azul/35 bg-gradient-to-br from-white/[.06] to-white/[.015] p-6 shadow-[0_28px_70px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-8">
            {oferta.ofertaActiva && (
              <span className="inline-flex items-center gap-2 rounded-full border border-azul/35 bg-azul/12 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#9FB6FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-azul anim-respirar" />
                {ofertaVet.badge}
              </span>
            )}

            <div className="mt-6 flex flex-wrap items-end gap-4">
              <span className="relative font-titular text-[24px] text-white/35 sm:text-[28px]">
                {oferta.precioAntiguo}
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-white/45"
                  initial={reducido ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reducido ? 0.001 : 0.5, delay: 0.3, ease: "easeOut" }}
                />
                <span className="sr-only"> (precio anterior)</span>
              </span>

              <span className="bg-gradient-to-r from-white via-[#9FB6FF] to-[#D3B0FF] bg-clip-text font-titular text-[62px] font-bold leading-none text-transparent sm:text-[78px]">
                <Contador hasta={oferta.precio} sufijo="€" />
              </span>
            </div>

            <p className="mt-2 text-[13.5px] text-white/45">{ofertaVet.notaPrecio}</p>

            {oferta.ofertaActiva && (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3">
                <Clock size={15} className="shrink-0 text-coral" aria-hidden="true" />
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: oferta.plazasTotales }).map((_, i) => (
                    <motion.span
                      key={i}
                      className={`h-2 w-2 rounded-full ${i < oferta.plazasLibres ? "bg-coral" : "bg-white/15"}`}
                      initial={reducido ? { scale: 1 } : { scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: reducido ? 0.001 : 0.35, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </span>
                <span className="text-[13.5px] text-white/70">
                  Quedan {oferta.plazasLibres} de {oferta.plazasTotales} plazas — solo para las primeras clínicas
                </span>
              </div>
            )}

            <p className="mt-6 rounded-xl bg-white/[.03] p-4 text-[14.5px] leading-relaxed text-white/68">
              <strong className="font-semibold text-[#F4F6FF]">{ofertaVet.infoDinero.fuerte}</strong>{" "}
              {ofertaVet.infoDinero.texto}
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
                  transition={{ duration: reducido ? 0.001 : 0.45, delay: reducido ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Check size={14} strokeWidth={3} className="mt-1.5 shrink-0 text-mint" aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <Boton href={marca.calendly} externo tamano="lg" flecha magnetico className="w-full">
                {ofertaVet.cta}
              </Boton>
            </div>
            <p className="mt-3 text-center text-[12.5px] text-white/45">{ofertaVet.finePrint}</p>
          </div>
        </Reveal>

        {/* ---------- LATERAL ---------- */}
        <Reveal direccion="derecha" retraso={0.1}>
          <div className="flex h-full flex-col gap-5">
            {ofertaVet.lateral.map((bloque, i) => (
              <div key={bloque.titulo}>
                {i > 0 && <hr className="mb-5 border-white/10" />}
                <h3 className="text-[17px] font-semibold text-[#F4F6FF]">{bloque.titulo}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{bloque.texto}</p>
              </div>
            ))}

            <TarjetaGlow color="76,224,179" className="mt-2 border-mint/20 bg-mint/[.04]">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                <div>
                  <h4 className="text-[16px] font-semibold text-[#F4F6FF]">{ofertaVet.documento.titulo}</h4>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{ofertaVet.documento.texto}</p>
                </div>
              </div>
            </TarjetaGlow>
          </div>
        </Reveal>
      </div>
    </Seccion>
  );
}
