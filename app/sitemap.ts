import type { MetadataRoute } from "next";
import { marca } from "@/content/marca";

/* El sitemap se genera solo. Al publicar un artículo nuevo basta con
   añadir su slug aquí (o mejor: leer la carpeta app/blog cuando haya
   más de dos o tres). */

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();

  return [
    { url: `${marca.dominio}/`, lastModified: hoy, changeFrequency: "monthly", priority: 1 },
    {
      url: `${marca.dominio}/veterinarias`,
      lastModified: hoy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${marca.dominio}/blog`, lastModified: hoy, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${marca.dominio}/blog/por-que-diagnosticar-antes-de-automatizar`,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
