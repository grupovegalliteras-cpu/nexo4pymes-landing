"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Icono, type NombreIcono } from "@/components/ui/Icono";

/* ============================================================
   PANEL DE FLUJO — el visual del hero

   Un mismo esqueleto (entra algo → la IA decide → se ejecutan
   acciones) recorriendo ejemplos de sectores distintos. Es el
   argumento central de la home convertido en imagen: la
   tecnología no cambia, cambia el proceso.

   Por qué animación y no una captura:
   · las dos fotos del proyecto son de un WhatsApp veterinario y
     aquí contarían justo lo contrario de lo que queremos decir;
   · pesa unos KB en vez de ~200, y el LCP del hero pasa a ser
     texto, que es lo que conviene.

   Coste controlado a propósito:
   · solo se animan opacity y transform;
   · con prefers-reduced-motion se congela en el primer escenario
     y no se monta ningún temporizador;
   · el intervalo es de 4,2 s: suficiente para leer los tres
     ejemplos sin que el panel compita con el CTA de al lado.
   ============================================================ */

type Escenario = {
  sector: string;
  canal: string;
  entrada: string;
  decision: string;
  acciones: { icono: NombreIcono; texto: string }[];
};

const ESCENARIOS: Escenario[] = [
  {
    sector: "Comercio",
    canal: "WhatsApp",
    entrada: "¿Os queda la referencia 4120 en azul? ¿Y para cuándo llegaría?",
    decision: "Consulta stock y plazos de entrega",
    acciones: [
      { icono: "mensaje", texto: "Respuesta enviada con stock real" },
      { icono: "lista", texto: "Contacto guardado como lead" },
    ],
  },
  {
    sector: "Salud",
    canal: "Web",
    entrada: "Necesito cambiar mi cita del jueves, me ha surgido algo.",
    decision: "Busca huecos reales en el calendario",
    acciones: [
      { icono: "agenda", texto: "Cita movida al viernes 10:00" },
      { icono: "campana", texto: "Recordatorio reprogramado" },
    ],
  },
  {
    sector: "Servicios",
    canal: "Email",
    entrada: "Adjunto la documentación que me pedisteis para el expediente.",
    decision: "Clasifica el documento y actualiza el expediente",
    acciones: [
      { icono: "documento", texto: "Archivado en su carpeta" },
      { icono: "verificado", texto: "Aviso al responsable del caso" },
    ],
  },
];

const SALIDA = [0.22, 1, 0.36, 1] as const;

export function PanelFlujo() {
  const reducido = usarMovimientoReducido();
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (reducido) return;
    const id = setInterval(() => setIndice((i) => (i + 1) % ESCENARIOS.length), 4200);
    return () => clearInterval(id);
  }, [reducido]);

  const escenario = ESCENARIOS[indice];

  return (
    <div className="relative">
      {/* Halo detrás del panel. Decorativo puro. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px]
                   bg-[radial-gradient(circle_at_50%_35%,rgba(76,125,255,.22),transparent_65%)] blur-2xl"
      />

      <div
        className="relative overflow-hidden rounded-panel border border-white/10
                   bg-gradient-to-br from-white/[.07] to-white/[.02] p-4 backdrop-blur-xl
                   shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)] sm:p-6"
      >
        {/* ---------- BARRA SUPERIOR ---------- */}
        <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-3.5">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
            <span aria-hidden="true" className="anim-respirar h-1.5 w-1.5 rounded-full bg-mint" />
            Flujo activo
          </span>

          {/* Sector del escenario en curso. Cambia con el contenido. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={escenario.sector}
              initial={reducido ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducido ? undefined : { opacity: 0, y: 4 }}
              transition={{ duration: reducido ? 0.001 : 0.25, ease: SALIDA }}
              className="rounded-full border border-white/12 bg-white/[.05] px-2.5 py-1
                         font-mono text-[10px] uppercase tracking-[0.1em] text-white/70"
            >
              {escenario.sector}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ---------- CUERPO ----------
            min-h fija el alto del bloque que cambia: sin ella, cada
            escenario tiene un número de líneas distinto y el panel
            entero daría saltos de layout cada 4 s (y arrastraría al
            hero con él en escritorio). */}
        <div className="min-h-[330px] pt-4 sm:min-h-[352px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={escenario.entrada}
              initial={reducido ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducido ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reducido ? 0.001 : 0.35, ease: SALIDA }}
            >
              {/* PASO 1 — entra algo */}
              <Paso etiqueta={`Entra por ${escenario.canal}`} numero="1">
                <p className="rounded-tarjeta rounded-tl-sm border border-white/10 bg-white/[.05] px-3.5 py-3 text-[14px] leading-snug text-white/85">
                  {escenario.entrada}
                </p>
              </Paso>

              <Conector />

              {/* PASO 2 — la IA decide */}
              <Paso etiqueta="La IA interpreta y decide" numero="2">
                <div className="flex items-center gap-3 rounded-tarjeta border border-azul/25 bg-azul/10 px-3.5 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-caja bg-gradient-to-br from-azul to-violeta text-white">
                    <Icono nombre="engranaje" size={16} />
                  </span>
                  <span className="text-[13.5px] leading-snug text-white/85">{escenario.decision}</span>
                </div>
              </Paso>

              <Conector />

              {/* PASO 3 — se ejecuta */}
              <Paso etiqueta="Se ejecuta solo" numero="3">
                <ul className="space-y-2">
                  {escenario.acciones.map((accion, i) => (
                    <motion.li
                      key={accion.texto}
                      initial={reducido ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reducido ? 0.001 : 0.3,
                        delay: reducido ? 0 : 0.5 + i * 0.18,
                        ease: SALIDA,
                      }}
                      className="flex items-center gap-3 rounded-tarjeta border border-mint/20 bg-mint/[.07] px-3.5 py-2.5"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-caja bg-mint/15 text-mint">
                        <Icono nombre={accion.icono} size={14} />
                      </span>
                      <span className="text-[13px] leading-snug text-white/80">{accion.texto}</span>
                      <span aria-hidden="true" className="ml-auto text-[13px] text-mint">
                        ✓
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Paso>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- PIE ----------
            Indicadores de escenario. Son botones de verdad: quien
            quiera parar en uno concreto puede, en vez de esperar a
            que la rueda vuelva a pasar. */}
        <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-3.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/40">
            Mismo sistema · otro sector
          </span>
          <div className="flex gap-1.5">
            {ESCENARIOS.map((item, i) => (
              <button
                key={item.sector}
                type="button"
                onClick={() => setIndice(i)}
                aria-label={`Ver el ejemplo de ${item.sector}`}
                aria-current={i === indice}
                /* El punto mide 6 px pero el botón 32: el área pulsable
                   cumple sin engordar el indicador. */
                className="flex h-8 w-5 items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === indice ? "w-5 bg-gradient-to-r from-azul to-violeta" : "w-1.5 bg-white/25"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Un paso del flujo: número, etiqueta y contenido. */
function Paso({
  numero,
  etiqueta,
  children,
}: {
  numero: string;
  etiqueta: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/45">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] text-white/70">
          {numero}
        </span>
        {etiqueta}
      </p>
      {children}
    </div>
  );
}

/* Línea vertical entre pasos. */
function Conector() {
  return (
    <div aria-hidden="true" className="ml-2 flex h-5 items-center">
      <span className="h-full w-px bg-gradient-to-b from-white/25 to-white/5" />
    </div>
  );
}
