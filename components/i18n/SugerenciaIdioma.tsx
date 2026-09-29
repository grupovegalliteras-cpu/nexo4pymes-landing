"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { conIdioma, sinIdioma, type Idioma } from "@/lib/i18n";
import { useIdioma } from "./idioma";
import { recordarIdioma } from "./SelectorIdioma";

const TEXTO: Record<"en" | "de", { frase: string; boton: string; cerrar: string }> = {
  en: { frase: "This website is also available in English.", boton: "View in English", cerrar: "Keep Spanish" },
  de: { frase: "Diese Website gibt es auch auf Deutsch.", boton: "Auf Deutsch ansehen", cerrar: "Auf Spanisch bleiben" },
};

/**
 * Si alguien llega a la versión española con el móvil en inglés o alemán, se le
 * ofrece su idioma una vez. No redirige solo: Google y quien comparte el enlace
 * siguen viendo la página que pidieron.
 */
export function SugerenciaIdioma() {
  const actual = useIdioma();
  const base = sinIdioma(usePathname() ?? "/");
  const [sugerido, setSugerido] = useState<"en" | "de" | null>(null);

  useEffect(() => {
    if (actual !== "es" || document.cookie.includes("idioma=")) return;
    const pref = (navigator.languages?.[0] ?? navigator.language ?? "").toLowerCase();
    if (pref.startsWith("en")) setSugerido("en");
    else if (pref.startsWith("de")) setSugerido("de");
  }, [actual]);

  if (!sugerido) return null;
  const t = TEXTO[sugerido];
  const cerrar = (l: Idioma) => {
    recordarIdioma(l);
    setSugerido(null);
  };
  return (
    <div role="dialog" aria-label={t.frase} lang={sugerido} className="fixed inset-x-3 top-[4.5rem] z-[60] mx-auto flex max-w-md flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-[#0b1220]/95 p-3 pl-4 text-[14px] text-white shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] ring-1 ring-white/12 backdrop-blur-xl">
      <span className="min-w-0 flex-1">{t.frase}</span>
      <span className="flex gap-2">
        <button onClick={() => cerrar("es")} className="rounded-lg px-2.5 py-1.5 text-[13px] text-white/60 hover:text-white">
          {t.cerrar}
        </button>
        <NextLink href={conIdioma(sugerido, base)} onClick={(e) => {
            e.preventDefault();
            cerrar(sugerido);
            window.location.assign(conIdioma(sugerido, base) + window.location.search + window.location.hash);
          }} className="rounded-lg bg-white px-3 py-1.5 text-[13px] font-semibold text-[#0b1220]">
          {t.boton}
        </NextLink>
      </span>
    </div>
  );
}
