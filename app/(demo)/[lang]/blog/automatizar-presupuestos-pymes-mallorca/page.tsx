import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* El artículo está escrito en tres archivos, uno por idioma (es.mdx, en.mdx, de.mdx).
   Esta página solo elige cuál enseñar, igual que el primero del blog. */

const RUTA = "/blog/automatizar-presupuestos-pymes-mallorca";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* El titular del artículo es largo a propósito (es el que se lee), pero
     el título de buscador va a por la búsqueda: "automatizar presupuestos"
     más el topónimo, que es lo que escribe quien tiene el problema. */
  const titulo = tr(lang, {
    es: "Automatizar presupuestos para pymes en Mallorca",
    en: "Automating quotes for small businesses in Mallorca",
    de: "Angebote automatisieren für kleine Betriebe auf Mallorca",
  });
  const descripcion = tr(lang, {
    es: "Las tres formas de dejar de hacer presupuestos a mano: plantilla, integración o configurador web. Cuál encaja en vuestro caso y cuándo no compensa.",
    en: "Three ways to stop writing quotes by hand: a template, an integration or a web configurator. Which one fits your pricing rules, and when it is not worth it.",
    de: "Drei Wege, Angebote nicht mehr von Hand zu schreiben: Vorlage, Anbindung an die Warenwirtschaft oder Web-Konfigurator. Welcher passt und wann es sich nicht lohnt.",
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
      {/* El artículo y sus preguntas se identifican a sí mismos al final del
          .mdx. Aquí va solo de dónde cuelga: la misma ruta que se ve escrita
          arriba del todo. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                {
                  nombre: tr(lang, {
                    es: "Automatizar presupuestos",
                    en: "Automating quotes",
                    de: "Angebote automatisieren",
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
