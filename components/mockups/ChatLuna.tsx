"use client";

import { useEffect, useRef, useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CalendarCheck, Check, CheckCheck, PhoneCall } from "lucide-react";
import { agendaLuna, guionLuna } from "@/content/vet";

/* ============================================================
   DEMO DE LUNA — la conversación se representa, no se cuenta
   Al entrar en pantalla el chat se reproduce solo: burbujas en
   secuencia, "escribiendo…" antes de cada respuesta del agente, y
   la agenda de al lado se actualiza en el momento exacto en que
   Luna confirma la cita. Esa sincronía es el argumento de venta:
   el agente no responde, agenda.

   Se reproduce cada vez que vuelve a entrar en pantalla, porque en
   móvil es fácil pasarlo de largo mientras se hace scroll.

   Con prefers-reduced-motion se pinta la conversación entera de
   golpe, ya terminada.
   ============================================================ */

const ESPERA_ESCRIBIENDO = 850;
const ESPERA_ENTRE = 620;

export function ChatLuna() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { amount: 0.35 });
  const reducido = usarMovimientoReducido();
  const [visibles, setVisibles] = useState(0);
  const [escribiendo, setEscribiendo] = useState(false);

  useEffect(() => {
    if (!enVista) return;

    if (reducido) {
      setVisibles(guionLuna.length);
      return;
    }

    const temporizadores: ReturnType<typeof setTimeout>[] = [];
    setVisibles(0);
    setEscribiendo(false);

    let acumulado = 400;

    guionLuna.forEach((mensaje, i) => {
      if (mensaje.de === "luna") {
        const inicioEscritura = acumulado;
        temporizadores.push(setTimeout(() => setEscribiendo(true), inicioEscritura));
        acumulado += ESPERA_ESCRIBIENDO;
        temporizadores.push(
          setTimeout(() => {
            setEscribiendo(false);
            setVisibles(i + 1);
          }, acumulado),
        );
      } else {
        temporizadores.push(setTimeout(() => setVisibles(i + 1), acumulado));
      }
      acumulado += ESPERA_ENTRE;
    });

    return () => temporizadores.forEach(clearTimeout);
  }, [enVista, reducido]);

  const citaConfirmada = visibles > 3;
  const escalado = visibles >= guionLuna.length;

  return (
    <div ref={ref} className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]">
      {/* ---------------- CHAT ---------------- */}
      <div
        className="overflow-hidden rounded-[26px] border border-linea bg-white shadow-[0_28px_60px_-30px_rgba(14,59,54,.45)]"
        role="img"
        aria-label="Recreación de una conversación de WhatsApp: Luna, el agente, agenda una cita para la vacuna de Nala y pasa una urgencia al equipo de la clínica"
      >
        <div className="flex items-center gap-3 border-b border-linea bg-cream-2/70 px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal font-titular text-[14px] font-semibold text-white">
            L
          </span>
          <div className="leading-tight">
            <p className="text-[13.5px] font-medium text-bottle">Luna · Clínica</p>
            <p className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-exito" />
              en línea
            </p>
          </div>
        </div>

        <div className="flex min-h-[340px] flex-col justify-end gap-2 px-3.5 py-4 sm:min-h-[380px]">
          {guionLuna.slice(0, visibles).map((mensaje, i) => (
            <Burbuja key={i} mensaje={mensaje} reducido={!!reducido} />
          ))}

          <AnimatePresence>
            {escribiendo && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-md bg-cream-2 px-3.5 py-3"
              >
                {[0, 1, 2].map((p) => (
                  <span
                    key={p}
                    className="h-1.5 w-1.5 rounded-full bg-teal"
                    style={{
                      animation: "pulso-punto 1.1s ease-in-out infinite",
                      animationDelay: `${p * 0.16}s`,
                    }}
                  />
                ))}
                <span className="sr-only">Luna está escribiendo</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------------- PANEL LATERAL ---------------- */}
      <div className="flex flex-col gap-4">
        {/* Agenda que se actualiza cuando Luna confirma. */}
        <div className="rounded-[22px] border border-linea bg-white p-4 shadow-[0_20px_45px_-30px_rgba(14,59,54,.4)]">
          <div className="flex items-center gap-2">
            <CalendarCheck size={15} className="text-teal" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-suave">
              Google Calendar · jueves
            </span>
          </div>

          <ul className="mt-3 space-y-1.5">
            {agendaLuna.map((hueco) => {
              const esElHueco = hueco.hora === "17:30";
              const ocupadoAhora = esElHueco && citaConfirmada;

              return (
                <li
                  key={hueco.hora}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[11.5px] transition-colors duration-500 ${
                    ocupadoAhora
                      ? "bg-teal-claro text-teal"
                      : esElHueco
                        ? "border border-dashed border-teal/40 bg-white text-suave"
                        : "bg-cream-2 text-suave"
                  }`}
                >
                  <span className="font-mono">{hueco.hora}</span>
                  <motion.span
                    key={ocupadoAhora ? "ocupado" : "libre"}
                    initial={esElHueco ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={ocupadoAhora ? "font-medium" : ""}
                  >
                    {ocupadoAhora ? "Nala · vacuna" : hueco.texto}
                  </motion.span>
                </li>
              );
            })}
          </ul>

          <AnimatePresence>
            {citaConfirmada && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-3 flex items-center gap-1.5 overflow-hidden font-mono text-[10px] uppercase tracking-wider text-exito"
              >
                <Check size={12} aria-hidden="true" /> Referencia NX-4417
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Escalado a persona: el límite del agente, dicho en pantalla. */}
        <AnimatePresence>
          {escalado && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[22px] border border-coral/30 bg-coral/6 p-4"
            >
              <div className="flex items-center gap-2">
                <span className="anim-respirar flex h-7 w-7 items-center justify-center rounded-full bg-coral/15 text-coral-dark">
                  <PhoneCall size={13} aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-coral-dark">
                  Pasa al equipo
                </span>
              </div>
              <p className="mt-2 text-[12.5px] leading-snug text-suave">
                Síntomas clínicos: Luna no orienta ni agenda urgencias. Avisa a una persona
                para que llame.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Burbuja({
  mensaje,
  reducido,
}: {
  mensaje: (typeof guionLuna)[number];
  reducido: boolean;
}) {
  const esLuna = mensaje.de === "luna";

  return (
    <motion.div
      initial={reducido ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reducido ? 0.001 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
        esLuna
          ? "mr-auto rounded-bl-md bg-teal-claro text-bottle"
          : "ml-auto rounded-br-md bg-cream-2 text-ink"
      }`}
    >
      <p className="text-[13px] leading-snug">{mensaje.texto}</p>
      <p
        className={`mt-1 flex items-center justify-end gap-1 font-mono text-[9px] ${
          esLuna ? "text-teal/70" : "text-suave/70"
        }`}
      >
        {mensaje.hora}
        {esLuna && <CheckCheck size={11} aria-hidden="true" />}
      </p>
    </motion.div>
  );
}
