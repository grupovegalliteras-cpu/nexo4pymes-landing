"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { marca } from "@/content/marca";
import { contenido } from "@/content/i18n";
import { useIdioma } from "@/components/i18n/idioma";

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
  const lang = useIdioma();
  const { calendario } = contenido(lang).contacto;
  const [cargado, setCargado] = useState(false);

  /* Parámetros de tema de Calendly. Antes iban fijos en oscuro, de
     cuando la web entera era oscura; ahora el sitio tiene tema claro y
     oscuro, así que se miran en el momento de pulsar. Se lee el
     atributo que pone el script de app/(demo)/[lang]/layout.tsx. */
  function urlCalendly() {
    const oscuro =
      typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";
    const tema = oscuro
      ? "&background_color=0d1a21&text_color=e6eef2&primary_color=3db1d3"
      : "&background_color=ffffff&text_color=0c1a22&primary_color=0a5d78";
    return `${marca.calendly}?hide_gdpr_banner=1${tema}`;
  }
  const url = cargado ? urlCalendly() : marca.calendly;

  if (cargado) {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <iframe
          src={url}
          title={calendario.titular}
          className="h-[680px] w-full border-0 sm:h-[720px]"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 text-center shadow-e1 sm:p-10">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <CalendarClock className="size-6" />
      </span>

      <h3 className="mt-5 font-display text-[20px] font-semibold text-fg sm:text-[23px]">
        {calendario.consentimiento.titulo}
      </h3>

      <p className="mx-auto mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-fg-2">
        {calendario.consentimiento.texto}
      </p>

      <div className="mt-7 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => setCargado(true)}
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[16px] font-semibold text-brand-ink transition hover:brightness-110 sm:h-12 sm:w-auto sm:text-[15px]"
        >
          {calendario.consentimiento.boton}
        </button>

        <a
          href={marca.calendly}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center text-[14px] text-fg-3 underline-offset-4 hover:text-fg hover:underline"
        >
          {calendario.consentimiento.alternativa} ↗
        </a>
      </div>
    </div>
  );
}
