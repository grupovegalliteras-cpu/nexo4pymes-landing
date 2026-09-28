import type { MetadataRoute } from "next";
import { marca } from "@/content/marca";
import { SECTORES } from "@/data/sectors";
import { IDIOMAS, conIdioma } from "@/lib/i18n";

/* Sitemap de la web en sus tres idiomas. Cada página sale en español, inglés y
   alemán, y cada entrada lleva sus versiones hermanas (hreflang) para que Google
   enseñe a cada visitante la de su idioma.

   Al publicar un artículo nuevo del blog, basta con añadir su ruta a PAGINAS. */

const PAGINAS: { ruta: string; prioridad: number; frecuencia: "monthly" | "yearly"; fecha?: string }[] = [
  { ruta: "/", prioridad: 1, frecuencia: "monthly" },
  { ruta: "/demo", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/servicios", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/contacto", prioridad: 0.8, frecuencia: "yearly" },
  { ruta: "/nosotros", prioridad: 0.7, frecuencia: "yearly" },
  ...SECTORES.map((s) => ({ ruta: `/sectores/${s.id}`, prioridad: 0.7, frecuencia: "monthly" as const })),
  { ruta: "/modulos", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/blog", prioridad: 0.6, frecuencia: "monthly" },
  { ruta: "/blog/por-que-diagnosticar-antes-de-automatizar", prioridad: 0.6, frecuencia: "yearly", fecha: "2026-08-05" },
  { ruta: "/legal", prioridad: 0.3, frecuencia: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  const url = (lang: (typeof IDIOMAS)[number], ruta: string) => `${marca.dominio}${conIdioma(lang, ruta) === "/" ? "/" : conIdioma(lang, ruta)}`;
  return PAGINAS.flatMap((p) =>
    IDIOMAS.map((lang) => ({
      url: url(lang, p.ruta),
      lastModified: p.fecha ? new Date(p.fecha) : hoy,
      changeFrequency: p.frecuencia,
      priority: lang === "es" ? p.prioridad : Math.round(p.prioridad * 0.9 * 10) / 10,
      alternates: { languages: Object.fromEntries(IDIOMAS.map((l) => [l, url(l, p.ruta)])) },
    })),
  );
}
