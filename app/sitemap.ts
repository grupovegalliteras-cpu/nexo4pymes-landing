import type { MetadataRoute } from "next";
import { marca } from "@/content/marca";
import { SECTORES } from "@/data/sectors";
import { IDIOMAS, conIdioma } from "@/lib/i18n";

/* Sitemap de la web en sus tres idiomas. Cada página sale en español, inglés y
   alemán, y cada entrada lleva sus versiones hermanas (hreflang) para que Google
   enseñe a cada visitante la de su idioma.

   Al publicar un artículo nuevo del blog, basta con añadir su ruta a PAGINAS. */

/* CADA PÁGINA CON SU FECHA, NO CON LA DEL DESPLIEGUE.
   Antes, la que no llevaba `fecha` se iba con `new Date()`: cada vez
   que se subía cualquier cambio, el sitemap le juraba a Google que las
   catorce páginas se habían modificado ese día. Google aprende rápido
   a no creerse un `lastmod` que siempre miente, y entonces deja de
   servir también para la página que sí ha cambiado de verdad.

   AL TOCAR UNA PÁGINA DE VERDAD, cambia su fecha aquí. Es una línea, y
   es lo que hace que Google vuelva a pasar por ella pronto. */
const PAGINAS: { ruta: string; prioridad: number; frecuencia: "monthly" | "yearly"; fecha: string }[] = [
  { ruta: "/", prioridad: 1, frecuencia: "monthly", fecha: "2026-10-08" },
  { ruta: "/demo", prioridad: 0.9, frecuencia: "monthly", fecha: "2026-10-02" },
  { ruta: "/servicios", prioridad: 0.9, frecuencia: "monthly", fecha: "2026-10-08" },
  { ruta: "/contacto", prioridad: 0.8, frecuencia: "yearly", fecha: "2026-10-02" },
  { ruta: "/nosotros", prioridad: 0.7, frecuencia: "yearly", fecha: "2026-10-02" },
  ...SECTORES.map((s) => ({ ruta: `/sectores/${s.id}`, prioridad: 0.7, frecuencia: "monthly" as const, fecha: "2026-10-08" })),
  { ruta: "/modulos", prioridad: 0.6, frecuencia: "monthly", fecha: "2026-10-02" },
  { ruta: "/blog", prioridad: 0.6, frecuencia: "monthly", fecha: "2026-10-08" },
  { ruta: "/blog/por-que-diagnosticar-antes-de-automatizar", prioridad: 0.6, frecuencia: "yearly", fecha: "2026-08-05" },
  /* /legal se queda en el sitemap y ahora además se indexa: es la
     página que acredita quién está detrás. Ver app/(web)/[lang]/legal. */
  { ruta: "/legal", prioridad: 0.3, frecuencia: "yearly", fecha: "2026-09-19" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (lang: (typeof IDIOMAS)[number], ruta: string) => `${marca.dominio}${conIdioma(lang, ruta) === "/" ? "/" : conIdioma(lang, ruta)}`;
  return [
    ...PAGINAS.flatMap((p) =>
      IDIOMAS.map((lang) => ({
        url: url(lang, p.ruta),
        lastModified: new Date(p.fecha),
        changeFrequency: p.frecuencia,
        priority: lang === "es" ? p.prioridad : Math.round(p.prioridad * 0.9 * 10) / 10,
        alternates: { languages: Object.fromEntries(IDIOMAS.map((l) => [l, url(l, p.ruta)])) },
      })),
    ),
    /* Nexo Pádel solo existe en español (clubes de Mallorca), así que va
       suelta y sin hreflang. Con fecha fija por lo mismo que las de
       arriba: un lastmod que cambia en cada despliegue no se cree nadie. */
    { url: `${marca.dominio}/padel`, lastModified: new Date("2026-10-02"), changeFrequency: "monthly", priority: 0.8 },
  ];
}
