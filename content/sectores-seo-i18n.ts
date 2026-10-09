import type { Idioma } from "@/lib/i18n";
import type { SectorId } from "@/data/sectors";
import { SECTORES_SEO as ES, type TextoSector } from "./sectores-seo";
import { SECTORES_SEO as EN } from "./en/sectores-seo";
import { SECTORES_SEO as DE } from "./de/sectores-seo";

/* El texto largo de cada sector en el idioma que toque. Los tres
   archivos tienen las mismas claves; si falta un sector en alguno,
   TypeScript lo marca aquí y no en producción. */

const POR_IDIOMA: Record<Idioma, Record<SectorId, TextoSector>> = { es: ES, en: EN, de: DE };

export function textoSector(lang: Idioma, id: SectorId): TextoSector {
  return POR_IDIOMA[lang][id];
}
