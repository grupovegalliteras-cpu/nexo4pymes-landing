import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { ogArticulo } from "@/content/articulos";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import Articulo from "./es.mdx";

/* ============================================================
   LOS ARTÍCULOS NUEVOS VAN SOLO EN ESPAÑOL, Y ES DELIBERADO.

   Los artículos antiguos tienen es.mdx, en.mdx y de.mdx porque se
   escribieron cuando el sitio se indexaba en tres idiomas. Desde
   noviembre de 2026, /en y /de son noindex (ver el layout y el
   sitemap): en 90 días dieron 1 clic entre los dos.

   Así que este artículo existe en español y se sirve en español
   también en /en y /de. Un texto en español en una ruta que nadie
   indexa es mejor que una traducción a medias en una ruta que nadie
   indexa, y es muchísimo mejor que no publicarlo por no traducirlo.

   SI VUELVEN LOS IDIOMAS: se añaden en.mdx y de.mdx y se elige aquí,
   igual que hacen los artículos viejos.
   ============================================================ */

const RUTA = "/blog/que-es-un-agente-de-ia";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* 58 caracteres: cabe entero en Google con la marca detrás. */
  const titulo = tr(lang, {
    es: "Qué es un agente de IA y en qué se diferencia de un chatbot",
    en: "What an AI agent is, and how it differs from a chatbot",
    de: "Was ein KI-Agent ist und wie er sich vom Chatbot unterscheidet",
  });
  const descripcion = tr(lang, {
    es: "Un chatbot sigue un guion; un agente entiende y actúa. Qué hace de verdad en una pyme, qué no hace y las cinco preguntas antes de contratar.",
    en: "A chatbot follows a script; an agent understands and acts. What it really does in a small business, what it does not do, and what to ask before you buy.",
    de: "Ein Chatbot folgt einem Skript; ein Agent versteht und handelt. Was er in einem KMU wirklich leistet, was nicht, und was Sie vorher fragen sollten.",
  });
  return {
    title: { absolute: titulo },
    description: descripcion,
    alternates: alternativas(lang, RUTA),
    openGraph: ogArticulo(lang, RUTA, { titulo, descripcion }),
  };
}

export default async function Pagina({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  return (
    <>
      <Articulo />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                { nombre: "Qué es un agente de IA", ruta: RUTA },
              ]),
            ]),
          ),
        }}
      />
    </>
  );
}
