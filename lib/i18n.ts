/* ============================================================
   IDIOMAS DE LA WEB: español (por defecto), inglés y alemán.

   Direcciones:
     · español  → sin prefijo:  /servicios, /demo
     · inglés   → /en/servicios, /en/demo
     · alemán   → /de/servicios, /de/demo
   Por dentro todas las páginas viven en app/(…)/[lang]/. El español
   llega ahí por una reescritura de next.config.mjs (/servicios se sirve
   desde /es/servicios sin cambiar la dirección que ve el visitante).

   Las direcciones son las mismas en los tres idiomas (/en/servicios, no
   /en/services): así un enlace se traduce cambiando solo el prefijo.
   ============================================================ */

export const IDIOMAS = ["es", "en", "de"] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const IDIOMA_BASE: Idioma = "es";

export const NOMBRE_IDIOMA: Record<Idioma, string> = { es: "Español", en: "English", de: "Deutsch" };
/** Para Intl (fechas, números, moneda) y para el atributo lang */
export const LOCALE: Record<Idioma, string> = { es: "es-ES", en: "en-GB", de: "de-DE" };
export const OG_LOCALE: Record<Idioma, string> = { es: "es_ES", en: "en_GB", de: "de_DE" };

export function esIdioma(x: unknown): x is Idioma {
  return typeof x === "string" && (IDIOMAS as readonly string[]).includes(x);
}

export function idiomaOBase(x: unknown): Idioma {
  return esIdioma(x) ? x : IDIOMA_BASE;
}

/** Añade el prefijo del idioma a una dirección interna ("/servicios" → "/en/servicios"). Lo externo no se toca. */
export function conIdioma(lang: Idioma, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const limpio = sinIdioma(href);
  if (lang === IDIOMA_BASE) return limpio;
  if (limpio === "/") return `/${lang}`;
  if (limpio.startsWith("/#") || limpio.startsWith("/?")) return `/${lang}${limpio.slice(1)}`;
  return `/${lang}${limpio}`;
}

/** Quita el prefijo de idioma de una dirección ("/en/servicios" → "/servicios"). */
export function sinIdioma(path: string): string {
  const m = path.match(/^\/(es|en|de)(?=\/|$|#|\?)(.*)$/);
  if (!m) return path;
  const resto = m[2];
  return resto === "" ? "/" : resto.startsWith("/") ? resto : `/${resto}`;
}

/** Idioma de una dirección visible (sin prefijo = español). */
export function idiomaDeRuta(path: string): Idioma {
  const m = path.match(/^\/(en|de)(?=\/|$|#|\?)/);
  return m ? (m[1] as Idioma) : IDIOMA_BASE;
}

/** Elige el texto del idioma: tr(lang, { es: "Hola", en: "Hello", de: "Hallo" }) */
export function tr<T>(lang: Idioma, textos: Record<Idioma, T>): T {
  return textos[lang] ?? textos[IDIOMA_BASE];
}

/** Metadatos de idioma de una página: dirección canónica y sus versiones en los otros idiomas (hreflang). */
export function alternativas(lang: Idioma, path: string) {
  const languages: Record<string, string> = {};
  for (const l of IDIOMAS) languages[l] = conIdioma(l, path);
  languages["x-default"] = conIdioma(IDIOMA_BASE, path);
  return { canonical: conIdioma(lang, path), languages };
}
