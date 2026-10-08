import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* Un artículo, tres archivos (es.mdx, en.mdx, de.mdx). Esta página elige cuál. */

const RUTA = "/blog/centralizar-avisos-llamadas-whatsapp-mallorca";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = tr(lang, {
    es: "Centralizar avisos y llamadas en Mallorca",
    en: "Centralising customer requests and calls in Mallorca",
    de: "Anfragen und Anrufe auf Mallorca bündeln",
  });
  const descripcion = tr(lang, {
    es: "Cómo organizar llamadas, WhatsApp, correos e incidencias en una empresa de servicios de Mallorca, en cuatro pasos, y qué hace CentralAvisos.",
    en: "How to organise calls, WhatsApp, email and incidents in a Mallorca service company, in four steps, and what CentralAvisos does.",
    de: "Wie Sie Anrufe, WhatsApp, E-Mails und Vorfälle in einem Dienstleistungsbetrieb auf Mallorca in vier Schritten ordnen — und was CentralAvisos leistet.",
  });
  return {
    title: { absolute: `${titulo} | Nexo4Pymes` },
    description: descripcion,
    alternates: alternativas(lang, RUTA),
  };
}

export default async function Articulo({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const Contenido = ARTICULO[lang];
  return (
    <>
      <Contenido />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                {
                  nombre: tr(lang, {
                    es: "Centralizar avisos",
                    en: "Centralising requests",
                    de: "Anfragen bündeln",
                  }),
                  ruta: RUTA,
                },
              ]),
            ]),
          ),
        }}
      />
    </>
  );
}
