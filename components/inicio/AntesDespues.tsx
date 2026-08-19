"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { antesDespues } from "@/content/inicio";

/* ============================================================
   ANTES / DESPUÉS — el "problema vs solución" del brief.

   Dos presentaciones de los mismos datos, según el espacio:

   · lg y arriba → las dos columnas en paralelo. La comparación se
     hace con los ojos, que es de lo que trata la sección.

   · por debajo → un conmutador de dos estados. Dos columnas de
     cinco filas en un móvil son diez tarjetas apiladas: nadie
     compara nada porque el "antes" y el "después" de cada pareja
     quedan a media pantalla de distancia. Con el conmutador, las
     filas ocupan el mismo sitio y lo que cambia es el contenido,
     que es exactamente la comparación que buscamos.

   Se renderizan los dos montajes y cada uno se oculta con CSS. Es
   texto duplicado en el HTML, sí, pero son ~1 KB y evita medir el
   viewport en JS (que provocaría un salto visible en la primera
   pintura).
   ============================================================ */

const SALIDA = [0.22, 1, 0.36, 1] as const;

export function AntesDespues() {
  return (
    <Seccion id="cambio" tono="oscuro" ancho="ancho">
      <div className="max-w-[720px]">
        <Antetitulo tono="oscuro">{antesDespues.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{antesDespues.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {antesDespues.intro}
          </p>
        </Reveal>
      </div>

      {/* ---------- ESCRITORIO: dos columnas ---------- */}
      <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-2">
        <Columna variante="antes" />
        <Columna variante="despues" />
      </div>

      {/* ---------- MÓVIL Y TABLET: conmutador ---------- */}
      <div className="mt-10 lg:hidden">
        <Conmutador />
      </div>

      <Reveal retraso={0.12}>
        <p className="mx-auto mt-8 max-w-[62ch] text-center text-[14px] leading-relaxed text-white/50 sm:mt-10 sm:text-[15px]">
          {antesDespues.nota}
        </p>
      </Reveal>
    </Seccion>
  );
}

/* ------------------------------------------------------------
   Columna de escritorio.
   ------------------------------------------------------------ */
function Columna({ variante }: { variante: "antes" | "despues" }) {
  const datos = variante === "antes" ? antesDespues.antes : antesDespues.despues;
  const bien = variante === "despues";

  return (
    <Reveal direccion={bien ? "derecha" : "izquierda"}>
      <div
        className={`h-full rounded-panel border p-6 sm:p-7 ${
          bien
            ? "border-mint/22 bg-gradient-to-b from-mint/[.07] to-transparent"
            : "border-white/9 bg-white/[.02]"
        }`}
      >
        <Cabecera datos={datos} bien={bien} />

        <ul className="mt-6 space-y-3">
          {datos.filas.map((fila) => (
            <li key={fila.titulo}>
              <Fila fila={fila} bien={bien} />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------
   Conmutador de móvil.
   ------------------------------------------------------------ */
function Conmutador() {
  const [bien, setBien] = useState(false);
  const reducido = usarMovimientoReducido();
  const datos = bien ? antesDespues.despues : antesDespues.antes;

  return (
    <div>
      {/* Control segmentado. `role=tablist` porque es exactamente eso:
          dos pestañas que gobiernan el mismo panel. */}
      <div
        role="tablist"
        aria-label="Comparar el negocio antes y después de automatizar"
        className="relative grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/[.03] p-1"
      >
        {/* Pastilla que se desliza por debajo de las etiquetas. */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-gradient-to-r from-azul to-violeta"
          animate={{ x: bien ? "calc(100% + 0.5rem)" : "0%" }}
          initial={false}
          transition={{ duration: reducido ? 0.001 : 0.42, ease: SALIDA }}
          style={{ left: "0.25rem" }}
        />

        {[antesDespues.antes, antesDespues.despues].map((opcion, i) => {
          const activa = (i === 1) === bien;
          return (
            <button
              key={opcion.etiqueta}
              type="button"
              role="tab"
              aria-selected={activa}
              aria-controls="panel-antes-despues"
              onClick={() => setBien(i === 1)}
              className={`relative z-10 min-h-[44px] rounded-full px-3 text-[13px] font-medium transition-colors duration-300 ${
                activa ? "text-white" : "text-white/55"
              }`}
            >
              {opcion.etiqueta}
            </button>
          );
        })}
      </div>

      <div
        id="panel-antes-despues"
        role="tabpanel"
        /* min-h: las dos versiones no miden lo mismo y sin esto la
           página pega un salto al conmutar. */
        className="mt-5 min-h-[560px] sm:min-h-[520px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={datos.etiqueta}
            initial={reducido ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducido ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reducido ? 0.001 : 0.3, ease: SALIDA }}
            className={`rounded-panel border p-5 ${
              bien
                ? "border-mint/22 bg-gradient-to-b from-mint/[.07] to-transparent"
                : "border-white/9 bg-white/[.02]"
            }`}
          >
            <Cabecera datos={datos} bien={bien} />

            <ul className="mt-5 space-y-2.5">
              {datos.filas.map((fila) => (
                <li key={fila.titulo}>
                  <Fila fila={fila} bien={bien} />
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Piezas compartidas por los dos montajes.
   ------------------------------------------------------------ */
function Cabecera({
  datos,
  bien,
}: {
  datos: typeof antesDespues.antes;
  bien: boolean;
}) {
  return (
    <div>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] ${
          bien ? "border-mint/30 bg-mint/10 text-mint" : "border-white/12 bg-white/[.04] text-white/55"
        }`}
      >
        <span aria-hidden="true">{bien ? "✓" : "✕"}</span>
        {datos.etiqueta}
      </span>
      <p className="mt-3.5 font-titular text-[19px] font-semibold leading-snug text-white sm:text-[21px]">
        {datos.resumen}
      </p>
    </div>
  );
}

function Fila({
  fila,
  bien,
}: {
  fila: { titulo: string; texto: string };
  bien: boolean;
}) {
  return (
    <div
      className={`rounded-tarjeta border px-4 py-3 ${
        bien ? "border-mint/15 bg-mint/[.04]" : "border-white/7 bg-white/[.02]"
      }`}
    >
      <p className={`text-[14.5px] font-medium ${bien ? "text-white" : "text-white/75"}`}>
        {fila.titulo}
      </p>
      <p className="mt-1 text-[13.5px] leading-snug text-white/50">{fila.texto}</p>
    </div>
  );
}
