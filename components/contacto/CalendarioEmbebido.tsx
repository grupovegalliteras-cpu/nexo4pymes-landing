"use client";

import { useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { Icono } from "@/components/ui/Icono";
import { calendario } from "@/content/contacto";
import { marca } from "@/content/marca";

/* ============================================================
   CALENDARIO CON CARGA BAJO CONSENTIMIENTO

   El brief pedía "calendario integrado para agendar videollamadas".
   Está, pero no se carga solo, y el motivo es legal, no técnico:

   Calendly es un tercero (Calendly LLC, EE. UU.). En cuanto su
   iframe se monta, recibe la IP del visitante y puede instalar sus
   cookies.

   POR QUÉ SIGUE CON CARGA MANUAL AUNQUE YA HAYA BANNER DE COOKIES:
   el banner cubre analítica y marketing, que son categorías de
   seguimiento. Un contenido incrustado es otra cosa: quien entra en
   /contacto para leer los datos de la empresa no ha pedido abrir una
   conexión con un servidor estadounidense, y meterlo en el saco de
   "aceptar todas" haría el consentimiento menos específico de lo que
   exige el RGPD.

   El patrón de aquí ("click-to-load") da un consentimiento
   contextual y explícito: hasta que el visitante pulsa, no se ha
   hablado con ningún servidor de Calendly; al pulsar, ya se le ha
   dicho quién es y qué recibe.

   Efecto secundario agradable: no se descargan ~400 KB de widget
   de terceros a quien solo pasaba por la página.

   El enlace externo sigue estando para quien prefiera abrirlo en
   una pestaña: es la ruta que ya usa el resto del sitio.
   ============================================================ */

export function CalendarioEmbebido() {
  const [cargado, setCargado] = useState(false);

  /* Parámetros de tema para que el widget no aparezca en blanco puro
     dentro de una web oscura. Son los que documenta Calendly para
     incrustaciones. */
  const url = `${marca.calendly}?hide_gdpr_banner=1&background_color=0b0e1a&text_color=e9ebf4&primary_color=4c7dff`;

  if (cargado) {
    return (
      <div className="overflow-hidden rounded-panel border border-white/10 bg-bottle-800">
        <iframe
          src={url}
          title="Calendario para agendar una llamada de 15 minutos con Nexo4Pymes"
          className="h-[680px] w-full border-0 sm:h-[720px]"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-panel border border-white/10 bg-gradient-to-br from-white/[.055] to-white/[.015]
                 p-6 text-center sm:p-10"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-caja bg-gradient-to-br from-azul to-violeta text-white">
        <Icono nombre="agenda" size={24} />
      </span>

      <h3 className="mt-5 text-[20px] text-white sm:text-[23px]">{calendario.consentimiento.titulo}</h3>

      <p className="mx-auto mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-white/60">
        {calendario.consentimiento.texto}
      </p>

      <div className="mt-7 flex flex-col items-center gap-3">
        <Boton type="button" onClick={() => setCargado(true)} tamano="lg" className="w-full sm:w-auto">
          {calendario.consentimiento.boton}
        </Boton>

        <a
          href={marca.calendly}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center text-[14px] text-white/55 underline-offset-4 hover:text-white hover:underline"
        >
          {calendario.consentimiento.alternativa} ↗
        </a>
      </div>
    </div>
  );
}
