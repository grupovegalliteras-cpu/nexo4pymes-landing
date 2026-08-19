import type { MetadataRoute } from "next";
import { marca } from "@/content/marca";

/* El sitemap se genera solo. Al publicar un artículo nuevo basta con
   añadir su slug aquí (o mejor: leer la carpeta app/blog cuando haya
   más de dos o tres).

   Prioridades tras el rediseño: la home general se lleva el 1 porque
   es la que persigue la keyword principal ("automatización de
   procesos con IA para pymes").

   Aquí estaba /sectores/veterinarias con prioridad 0,7. Esa página se
   retiró de internet, así que sale del sitemap: dejarla anunciaría a
   Google una URL que responde con un 301. */

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();

  return [
    { url: `${marca.dominio}/`, lastModified: hoy, changeFrequency: "monthly", priority: 1 },
    {
      url: `${marca.dominio}/servicios`,
      lastModified: hoy,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${marca.dominio}/contacto`,
      lastModified: hoy,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${marca.dominio}/nosotros`,
      lastModified: hoy,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    { url: `${marca.dominio}/blog`, lastModified: hoy, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${marca.dominio}/blog/por-que-diagnosticar-antes-de-automatizar`,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    { url: `${marca.dominio}/legal`, lastModified: hoy, changeFrequency: "yearly", priority: 0.3 },
  ];
}
