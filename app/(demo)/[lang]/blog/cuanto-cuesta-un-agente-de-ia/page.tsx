import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { ogArticulo } from "@/content/articulos";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import Articulo from "./es.mdx";

/* ============================================================
   SOLO EN ESPAÑOL, por lo mismo que el resto de artículos nuevos:
   /en y /de son noindex desde noviembre de 2026. Ver
   que-es-un-agente-de-ia/page.tsx, donde está el razonamiento entero.
   ============================================================ */

const RUTA = "/blog/cuanto-cuesta-un-agente-de-ia";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* 58 caracteres: cabe entero en Google con la marca detrás. */
  const titulo = tr(lang, {
    es: "Cuánto cuesta un agente de IA para una pyme en España",
    en: "What an AI agent costs for a small business in Spain",
    de: "Was ein KI-Agent für ein KMU in Spanien kostet",
  });
  const descripcion = tr(lang, {
    es: "Entre 39 € al mes y 3.500 € de golpe: los tres modelos de precio del mercado español, lo que no te cuentan del consumo de WhatsApp y la cuenta para saber si te compensa.",
    en: "From EUR 39 a month to EUR 3,500 up front: the three pricing models in the Spanish market, the usage costs nobody mentions, and how to work out if it pays off.",
    de: "Von 39 EUR im Monat bis 3.500 EUR einmalig: die drei Preismodelle im spanischen Markt, die verschwiegenen Verbrauchskosten und die Rechnung dazu.",
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
                { nombre: "Cuánto cuesta un agente de IA", ruta: RUTA },
              ]),
            ]),
          ),
        }}
      />
    </>
  );
}
