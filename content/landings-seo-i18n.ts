import type { Idioma } from "@/lib/i18n";
import { LANDINGS, type LandingSlug } from "@/data/landings";
import { LANDINGS_SEO as ES, type TextoLanding } from "./landings-seo";
import { LANDINGS_SEO as EN } from "./en/landings-seo";
import { LANDINGS_SEO as DE } from "./de/landings-seo";

/* ============================================================
   QUÉ LANDINGS ESTÁN PUBLICADAS DE VERDAD

   data/landings.ts dice cuáles MERECEN página, que es una decisión de
   estrategia. Este archivo dice cuáles la TIENEN, que es un hecho:
   una landing existe cuando está escrita en los tres idiomas.

   POR QUÉ LOS TRES Y NO UNO. Toda la web está en castellano, inglés y
   alemán. Si una landing se publicase solo en castellano, /en y /de
   servirían una página vacía o en otro idioma, y eso Google lo trata
   como error de contenido, no como página nueva. Es exactamente el
   tipo de página fina que decidimos no hacer. Mejor cinco páginas en
   tres idiomas que quince a medias.

   CONSECUENCIA PRÁCTICA: para publicar una landing basta con escribir
   su texto en los tres archivos. No hay que tocar la ruta, ni el
   sitemap, ni el menú. Y mientras falte un idioma, la página no
   existe en ninguno, que es lo que queremos.
   ============================================================ */

const POR_IDIOMA: Record<Idioma, Partial<Record<LandingSlug, TextoLanding>>> = { es: ES, en: EN, de: DE };

/** Los slugs con texto en los tres idiomas, en el orden de data/landings.ts. */
export const LANDINGS_PUBLICADAS: LandingSlug[] = LANDINGS.map((l) => l.slug).filter(
  (slug): slug is LandingSlug => Boolean(ES[slug] && EN[slug] && DE[slug]),
);

export function estaPublicada(slug: string): slug is LandingSlug {
  return (LANDINGS_PUBLICADAS as string[]).includes(slug);
}

/* ¿Este módulo tiene página propia publicada? Lo pregunta la rejilla
   de /modulos: si la tiene, la tarjeta lleva a la página —que es la
   que se indexa y la que explica— y no directamente a la demo. Una
   tarjeta que salta a la demo gasta la visita sin dejar texto por
   medio, y sin texto no hay nada que posicionar. */
export function landingDelModulo(moduloId: string): LandingSlug | undefined {
  return LANDINGS_PUBLICADAS.find((slug) => LANDINGS.find((l) => l.slug === slug)?.modulo === moduloId);
}

/** Solo se llama con un slug ya validado por estaPublicada. */
export function textoLanding(lang: Idioma, slug: LandingSlug): TextoLanding {
  return POR_IDIOMA[lang][slug]!;
}

/* El titular entero, uniendo las dos partes del h1. Lo visual se
   parte en dos; el <title>, la descripcion y los datos estructurados
   llevan la frase completa. */
export function tituloLanding(lang: Idioma, slug: LandingSlug): string {
  return textoLanding(lang, slug).h1.join(" ");
}
