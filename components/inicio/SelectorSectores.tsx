"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { Icono } from "@/components/ui/Icono";
import { sectoresInicio } from "@/content/inicio";

/* ============================================================
   SELECTOR DE SECTORES

   La pieza que sustituye al viejo "nuestra especialidad son las
   clínicas veterinarias". El mensaje cambia de "hacemos un
   sector" a "el método es el mismo, el proceso cambia": por eso
   es un selector y no una rejilla estática — el visitante elige
   el suyo y ve su propio caso, que es lo que le hace quedarse.

   Las veterinarias siguen dentro, como un sector más, y son el
   único con `href` a landing propia.

   Accesibilidad: es un tablist real con navegación por flechas
   (patrón APG de pestañas manuales). Sin esto, con teclado habría
   que tabular por los seis sectores para llegar al panel.
   ============================================================ */

const SALIDA = [0.22, 1, 0.36, 1] as const;

export function SelectorSectores() {
  const [activo, setActivo] = useState(0);
  const reducido = usarMovimientoReducido();
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const sectores = sectoresInicio.sectores;
  const sector = sectores[activo];

  /* Flechas para moverse entre pestañas, Inicio/Fin para los extremos.
     Se activa al enfocar, que es lo que espera quien navega así. */
  function alPulsarTecla(e: React.KeyboardEvent) {
    const teclas: Record<string, number> = {
      ArrowRight: activo + 1,
      ArrowDown: activo + 1,
      ArrowLeft: activo - 1,
      ArrowUp: activo - 1,
      Home: 0,
      End: sectores.length - 1,
    };

    const destino = teclas[e.key];
    if (destino === undefined) return;

    e.preventDefault();
    const siguiente = (destino + sectores.length) % sectores.length;
    setActivo(siguiente);
    pestanas.current[siguiente]?.focus();
  }

  return (
    <Seccion id="sectores" tono="oscuro" ancho="ancho">
      <div className="max-w-[720px]">
        <Antetitulo tono="oscuro">{sectoresInicio.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{sectoresInicio.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">
            {sectoresInicio.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-[320px_1fr] lg:gap-8">
        {/* ---------- LISTA DE SECTORES ----------
            En móvil es una fila que se desplaza en horizontal; en
            escritorio, una columna. Misma lista, mismo orden. */}
        <div
          role="tablist"
          aria-label="Elegid vuestro sector"
          aria-orientation="vertical"
          onKeyDown={alPulsarTecla}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {sectores.map((item, i) => {
            const seleccionado = i === activo;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  pestanas.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pestana-${item.id}`}
                aria-selected={seleccionado}
                aria-controls="panel-sector"
                /* Solo la pestaña activa entra en el orden de tabulación:
                   desde ella se navega con flechas. */
                tabIndex={seleccionado ? 0 : -1}
                onClick={() => setActivo(i)}
                className={`group relative flex min-h-[44px] shrink-0 items-center gap-3 rounded-full border
                            px-4 py-2.5 text-left transition-colors duration-300
                            lg:w-full lg:rounded-tarjeta lg:px-4 lg:py-3.5 ${
                              seleccionado
                                ? "border-azul/45 bg-azul/12 text-white"
                                : "border-white/10 bg-white/[.02] text-white/60 hover:border-white/20 hover:text-white/85"
                            }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-caja transition-colors duration-300 ${
                    seleccionado ? "bg-gradient-to-br from-azul to-violeta text-white" : "bg-white/6 text-white/55"
                  }`}
                >
                  <Icono nombre={item.icono} size={16} />
                </span>

                <span className="min-w-0">
                  <span className="block whitespace-nowrap text-[14px] font-medium lg:whitespace-normal lg:text-[15px]">
                    {item.nombre}
                  </span>
                  {/* Los ejemplos solo caben en la columna de escritorio. */}
                  <span className="mt-0.5 hidden text-[12.5px] leading-snug text-white/45 lg:block">
                    {item.ejemplos}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------- PANEL DEL SECTOR ELEGIDO ----------
            min-h para que el panel no encoja y estire la página cada
            vez que se cambia de sector. */}
        <div
          role="tabpanel"
          id="panel-sector"
          aria-labelledby={`pestana-${sector.id}`}
          tabIndex={0}
          className="min-h-[500px] sm:min-h-[440px] lg:min-h-[420px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sector.id}
              initial={reducido ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducido ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: reducido ? 0.001 : 0.32, ease: SALIDA }}
              className="h-full rounded-panel border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.015]
                         p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[22px] text-white sm:text-[26px]">{sector.nombre}</h3>
                <span className="rounded-full border border-white/12 bg-white/[.04] px-2.5 py-1 text-[11.5px] text-white/55">
                  {sector.ejemplos}
                </span>
              </div>

              {/* EL DOLOR */}
              <div className="mt-5 rounded-tarjeta border-l-2 border-coral/60 bg-coral/[.06] px-4 py-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-coral">
                  Lo que suele doler
                </p>
                <p className="mt-1.5 text-[14.5px] leading-snug text-white/80">{sector.dolor}</p>
              </div>

              {/* QUÉ SE AUTOMATIZA */}
              <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/45">
                Qué se automatiza aquí
              </p>
              <ul className="mt-3 space-y-2.5">
                {sector.automatizaciones.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reducido ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reducido ? 0.001 : 0.3,
                      delay: reducido ? 0 : 0.1 + i * 0.07,
                      ease: SALIDA,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-[11px] text-mint"
                    >
                      ✓
                    </span>
                    <span className="text-[14.5px] leading-snug text-white/75">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* EL RESULTADO */}
              <div className="mt-6 rounded-tarjeta border border-mint/20 bg-mint/[.06] px-4 py-3.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mint">A qué lleva</p>
                <p className="mt-1.5 text-[15px] font-medium leading-snug text-white">{sector.resultado}</p>
              </div>

              {/* Matices y landing propia, si el sector los tiene. */}
              {"nota" in sector && sector.nota && (
                <p className="mt-4 text-[13px] leading-snug text-white/45">{sector.nota}</p>
              )}

              {"href" in sector && sector.href && (
                <Link
                  href={sector.href}
                  className="group mt-5 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-azul"
                >
                  {sector.enlaceTexto}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Seccion>
  );
}
