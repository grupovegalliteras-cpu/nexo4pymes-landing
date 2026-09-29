"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { IDIOMAS, NOMBRE_IDIOMA, conIdioma, sinIdioma, type Idioma } from "@/lib/i18n";
import { useIdioma } from "./idioma";

/** Recuerda la elección para no volver a sugerir otro idioma (cookie funcional, un año). */
export function recordarIdioma(lang: Idioma) {
  document.cookie = `idioma=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * ES · EN · DE. Lleva a la misma página en el otro idioma, conservando el ancla.
 * `tono`: "oscuro" sobre fondos oscuros, "claro" sobre fondos claros, "tema" sigue el tema claro/oscuro de la demo.
 * `largo`: nombres completos (para el menú del móvil).
 */
export function SelectorIdioma({ tono = "oscuro", largo = false, className = "" }: { tono?: "oscuro" | "claro" | "tema"; largo?: boolean; className?: string }) {
  const actual = useIdioma();
  const base = sinIdioma(usePathname() ?? "/");
  const oscuro = tono === "oscuro";
  const tema = tono === "tema";
  return (
    <nav aria-label="Idioma / Language / Sprache" className={`flex items-center rounded-full p-0.5 ${tema ? "bg-surface-2 ring-1 ring-line" : oscuro ? "bg-white/[0.08] ring-1 ring-white/12" : "bg-black/[0.05] ring-1 ring-black/10"} ${className}`}>
      {IDIOMAS.map((l) => {
        const activo = l === actual;
        return (
          <NextLink
            key={l}
            href={conIdioma(l, base)}
            hrefLang={l}
            lang={l}
            aria-current={activo ? "true" : undefined}
            title={NOMBRE_IDIOMA[l]}
            onClick={(e) => {
              recordarIdioma(l);
              // recarga completa: la demo prepara sus datos de ejemplo en el idioma nuevo
              // y se conserva la sección en la que estaba (#sectores, #contacto…)
              e.preventDefault();
              window.location.assign(conIdioma(l, base) + window.location.search + window.location.hash);
            }}
            className={`rounded-full font-semibold uppercase transition-colors ${largo ? "px-4 py-2 text-[15px]" : "px-2.5 py-1 text-[12px]"} ${
              tema ? (activo ? "bg-fg text-bg" : "text-fg-2 hover:text-fg") : activo ? (oscuro ? "bg-white text-[#0b1220]" : "bg-[#0c1a22] text-white") : oscuro ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"
            }`}
          >
            {largo ? NOMBRE_IDIOMA[l] : l}
          </NextLink>
        );
      })}
    </nav>
  );
}
