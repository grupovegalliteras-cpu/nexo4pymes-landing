"use client";

import { Check, X } from "lucide-react";
import type { CSSProperties } from "react";
import { useIdioma } from "@/components/i18n/idioma";
import { Etiqueta, Titulo } from "@/components/deeptech/piezas";
import { antesDespues as ES } from "@/content/inicio";
import { antesDespues as EN } from "@/content/en/inicio";
import { antesDespues as DE } from "@/content/de/inicio";

/* ============================================================
   ANTES Y DESPUÉS — LA SECCIÓN QUE EXPLICA ESTO SIN TECNICISMOS

   POR QUÉ EXISTE. El texto estaba escrito en content/inicio.ts desde
   hace meses y no se pintaba en ningún sitio: la portada arrancaba con
   las cuatro piezas, que son los nombres de lo que vendemos —«CRM»,
   «configurador», «integraciones»—, y de ahí se iba directa a la demo.
   Quien entra sin saber qué es un CRM no tenía dónde reconocerse.

   Esta sección no vende nada: nombra el problema con las palabras que
   usa quien lo tiene («un archivo para cada cosa, versiones que no
   cuadran y nadie sabe cuál es el bueno») y pone al lado qué cambia.
   Es el patrón que usan los que lideran estas búsquedas: el dolor
   primero, en el idioma del lector, y la solución después.

   DOS COLUMNAS Y NO DOS BLOQUES. Los pares están alineados por índice
   —antes.filas[i] y despues.filas[i] hablan de lo mismo—, así que se
   leen en pareja y el contraste se ve en la misma línea de los ojos.
   Si se pintaran como dos listas seguidas, habría que recordar la
   primera mientras se lee la segunda.

   SIN TARJETAS DE CRISTAL. Diez tarjetas con borde y fondo eran más
   ruido que contenido justo en la sección que tiene que leerse del
   tirón. Filas con una raya entre medias y un icono: lo que cambia es
   el color del texto, no la caja.
   ============================================================ */

const POR_IDIOMA = { es: ES, en: EN, de: DE };

export function AntesDespues() {
  const d = POR_IDIOMA[useIdioma()];

  return (
    <section id="antes-despues" className="relative scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <Etiqueta>{d.categoria}</Etiqueta>
          <Titulo className="mt-4 text-[32px] sm:text-[48px]">{d.titular}</Titulo>
          <p data-revelar className="mt-4 text-[17px] leading-relaxed text-fg-2">
            {d.intro}
          </p>
        </div>

        {/* Los rótulos de las dos columnas solo caben en escritorio. En el
            móvil cada fila lleva su propio icono, que ya dice de qué lado
            está sin necesidad de cabecera. */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-2 lg:gap-10">
          {[d.antes, d.despues].map((lado, i) => (
            <div key={i}>
              <p
                className="font-mono text-[11px] tracking-[0.12em] uppercase"
                style={{ color: i === 0 ? "var(--dt-fg-3, #8b94a7)" : "var(--dt-cian)" }}
              >
                {lado.etiqueta}
              </p>
              <p className="mt-1.5 text-[17px] font-semibold text-fg">{lado.resumen}</p>
            </div>
          ))}
        </div>

        <ul className="mt-8 border-t border-white/[0.08] lg:mt-6">
          {d.antes.filas.map((antes, i) => {
            const despues = d.despues.filas[i];
            return (
              <li
                key={antes.titulo}
                data-revelar
                className="grid gap-5 border-b border-white/[0.08] py-6 lg:grid-cols-2 lg:gap-10"
                style={{ "--d": `${i * 50}ms` } as CSSProperties}
              >
                <div className="flex gap-3">
                  <X className="mt-0.5 size-4 shrink-0 text-fg-3" aria-hidden />
                  <div>
                    <p className="text-[16px] leading-snug font-semibold text-fg-2">{antes.titulo}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-3">{antes.texto}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0" style={{ color: "var(--dt-cian)" }} aria-hidden />
                  <div>
                    <p className="text-[16px] leading-snug font-semibold text-fg">{despues.titulo}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-2">{despues.texto}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-[62ch] text-[14.5px] leading-relaxed text-fg-3">{d.nota}</p>
      </div>
    </section>
  );
}
