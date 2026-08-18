"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { comoVaVet } from "@/content/vet";

/* ============================================================
   LA PIEZA CENTRAL DEL REDISEÑO: la secuencia de WhatsApp animada.
   Un paso cada 1.6 s (0, 1.6, 3.2, 4.8 s), disparada una sola vez al
   entrar en pantalla. El botón "Ver otra vez" la relanza a mano.
   ============================================================ */

const INTERVALO = 1600;

export function ComoVaVet() {
  const reducido = usarMovimientoReducido();
  const refTelefono = useRef<HTMLDivElement>(null);
  const enVista = useInView(refTelefono, { once: true, amount: 0.3 });
  const [paso, setPaso] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function jugar() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reducido) {
      setPaso(3);
      return;
    }
    setPaso(-1);
    comoVaVet.pasos.forEach((_, i) => {
      timers.current.push(setTimeout(() => setPaso(i), i * INTERVALO));
    });
  }

  useEffect(() => {
    if (enVista) jugar();
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo debe arrancar cuando entra en vista
  }, [enVista]);

  const subestado = paso < 0 ? comoVaVet.telefono.estadoInicial : paso < 3 ? "escribiendo…" : "en línea";

  return (
    <Seccion id="como-va" tono="oscuro-hondo" ancho="ancho">
      <div className="malla malla-fade absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative max-w-[62ch]">
        {/* Era un antetítulo con degradado propio. Ahora usa el mismo
            Antetitulo que las demás secciones: la menta y el filete
            bastan, y el degradado se reserva para la acción. */}
        <Antetitulo tono="oscuro">{comoVaVet.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{comoVaVet.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/60">{comoVaVet.subtitulo}</p>
        </Reveal>
      </div>

      <div className="relative mt-14 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* ---------- TELÉFONO ---------- */}
        <div className="relative mx-auto w-full max-w-[380px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[10%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,224,179,.22),transparent_68%)] blur-[34px]"
          />
          <div
            ref={refTelefono}
            className="relative rounded-panel border border-white/13 bg-gradient-to-br from-[rgba(18,22,34,.92)] to-[rgba(8,10,18,.92)] p-3 pb-4 shadow-[0_44px_100px_rgba(0,0,0,.65),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2.5 border-b border-white/7 px-1.5 pb-3.5 pt-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-azul to-violeta shadow-[0_0_18px_rgba(76,125,255,.5)]">
                <Heart size={17} className="text-white" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <div className="text-[13.5px] font-semibold leading-tight text-[#EDEFF8]">
                  {comoVaVet.telefono.nombre}
                </div>
                <div className="font-mono text-[10.5px] text-[#7FE3C4]">{subestado}</div>
              </div>
            </div>

            <div className="flex min-h-[340px] flex-col gap-2.5 px-1.5 pb-1 pt-4">
              {comoVaVet.burbujas.map((b, i) => {
                const visible = paso >= b.paso;
                if (b.tipo === "sistema") {
                  return (
                    <motion.div
                      key={i}
                      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
                      transition={{ duration: 0.5 }}
                      className="self-center max-w-[96%] rounded-caja border border-dashed border-mint/40 bg-mint/8 px-3 py-2 text-center font-mono text-[11px] text-[#8FEBD3]"
                    >
                      {b.texto}
                    </motion.div>
                  );
                }
                const esEnviado = b.tipo === "enviado";
                return (
                  <motion.div
                    key={i}
                    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
                    transition={{ duration: 0.5 }}
                    className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[13.4px] leading-relaxed ${
                      esEnviado
                        ? "self-end rounded-br-[5px] border border-white/14 bg-gradient-to-br from-[rgba(76,125,255,.55)] to-[rgba(176,107,245,.45)] text-white shadow-[0_8px_24px_rgba(76,125,255,.28)]"
                        : "self-start rounded-bl-[5px] border border-white/6 bg-white/7 text-[#E4E7F2]"
                    }`}
                  >
                    {b.texto}
                    {b.hora && (
                      <span
                        className={`mt-1 block text-right font-mono text-[9.5px] ${
                          esEnviado ? "text-white/60" : "text-white/50"
                        }`}
                      >
                        {b.hora}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- PASOS ---------- */}
        <div>
          {comoVaVet.pasos.map((p, i) => {
            const estado = i < paso ? "hecho" : i === paso ? "activo" : "pendiente";
            return (
              <div
                key={p.titulo}
                className="relative flex gap-[18px] py-[18px] transition-opacity duration-500"
                style={{ opacity: i <= paso ? 1 : 0.35 }}
              >
                <div className="relative flex-none">
                  <div
                    className={`flex h-[38px] w-[38px] items-center justify-center rounded-full border font-mono text-[13px] font-semibold transition-all duration-400 ${
                      estado === "activo"
                        ? "scale-[1.12] border-transparent bg-gradient-to-br from-azul to-violeta text-white shadow-[0_0_26px_rgba(120,120,250,.7)]"
                        : estado === "hecho"
                          ? "border-white/16 bg-azul/25 text-white"
                          : "border-white/16 bg-white/5 text-white"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < comoVaVet.pasos.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-11 h-[calc(100%-22px)] w-px bg-gradient-to-b from-white/16 to-transparent"
                    />
                  )}
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.06em] text-[#9FB6FF]">{p.hora}</div>
                  <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-[#F4F6FF]">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-white/58">{p.texto}</p>
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex flex-wrap items-center gap-[18px] border-t border-white/8 pt-6">
            <button
              type="button"
              onClick={jugar}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/4 px-5 py-2.5 text-[13.5px] font-semibold text-[#E9EBF4] backdrop-blur-md transition-colors duration-250 hover:border-azul/50 hover:bg-azul/14"
            >
              <RotateCcw size={15} aria-hidden="true" />
              {comoVaVet.replay}
            </button>
            <div className="text-[14.5px] text-white/60">
              {comoVaVet.clics.texto} <strong className="font-semibold text-mint">{comoVaVet.clics.valor}</strong>.
            </div>
          </div>
        </div>
      </div>
    </Seccion>
  );
}
