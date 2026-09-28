import EN from "@/data/i18n/en.json";
import DE from "@/data/i18n/de.json";
import { IDIOMA_BASE, idiomaDeRuta, type Idioma } from "@/lib/i18n";

/* ============================================================
   TRADUCCIÓN DEL INTERIOR DE LA DEMO (panel de oficina y app)

   Diccionario de frases: la clave es el texto en español tal cual
   aparece en el código y el valor, su traducción (data/i18n/en.json
   y de.json). t("Facturación") devuelve "Invoicing" en inglés; si una
   frase no está en el diccionario se queda en español, nunca rompe.

   Frases con datos: tf("Factura {0} emitida", numero).

   El idioma es global porque el panel y la app solo se pintan en el
   navegador, dentro de una página de un único idioma: se lee de la
   dirección al cargar. Cambiar de idioma recarga la página
   (SelectorIdioma), así que nunca se mezclan.
   ============================================================ */

type Mapa = Record<string, string>;
const MAPAS: Record<Exclude<Idioma, "es">, Mapa> = { en: EN as Mapa, de: DE as Mapa };

let actual: Idioma = typeof window !== "undefined" ? idiomaDeRuta(window.location.pathname) : IDIOMA_BASE;

export function idiomaGlobal(): Idioma {
  return actual;
}

/** Solo para pruebas o casos especiales: el idioma sale de la dirección. */
export function fijarIdiomaGlobal(lang: Idioma) {
  actual = lang;
}

/** Traduce una frase del español. Lo que no sea texto (números, JSX…) se devuelve tal cual. */
export function t<T>(x: T): T {
  if (actual === "es" || typeof x !== "string") return x;
  const clave = x.trim();
  if (!clave) return x;
  const v = MAPAS[actual][clave];
  if (!v) return x;
  return (clave === x ? v : x.replace(clave, v)) as T;
}

/** Traduce un patrón con huecos {0}, {1}… y los rellena. */
export function tf(patron: string, ...args: (string | number | null | undefined)[]): string {
  const p = actual === "es" ? patron : (MAPAS[actual][patron] ?? patron);
  return p.replace(/\{(\d+)\}/g, (_, i) => String(args[Number(i)] ?? ""));
}
