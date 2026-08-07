import type { MetadataRoute } from "next";
import { marca } from "@/content/marca";

/* Indexación abierta en todo el sitio. Si alguna vez vuelve un
   "Disallow: /" heredado de una preview, Google deja de ver la web
   entera, incluida la página que posiciona. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${marca.dominio}/sitemap.xml`,
  };
}
