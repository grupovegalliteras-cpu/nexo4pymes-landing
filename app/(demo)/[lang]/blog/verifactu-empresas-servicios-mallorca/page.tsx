import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* El artículo está escrito en tres archivos, uno por idioma (es.mdx, en.mdx, de.mdx).
   Esta página solo elige cuál enseñar.

   VA EMPAREJADO CON /modulos/facturacion-verifactu y los dos se enlazan
   entre sí a propósito. La landing responde a quien busca un programa;
   este artículo, a quien busca entender la norma. Son dos intenciones
   distintas y por eso son dos páginas: si fueran una, competiría
   consigo misma y Google elegiría solo una de las dos. */

const RUTA = "/blog/verifactu-empresas-servicios-mallorca";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    /* Sin "| Nexo4Pymes" detrás: el titular ya ocupa 66 caracteres y
       Google corta sobre los 70. La marca sale igualmente encima del
       resultado, que la saca del WebSite. */
    title: {
      absolute: tr(lang, {
        es: "VeriFactu: qué tiene que hacer una empresa de servicios",
        en: "VeriFactu: what a service company in Mallorca has to do",
        de: "VeriFactu: Was ein Dienstleistungsbetrieb tun muss",
      }),
    },
    description: tr(lang, {
      es: "Qué obliga hoy y qué es solo un anuncio sin publicar, qué cambia en vuestras facturas y los cuatro pasos que conviene dar ahora.",
      en: "What binds today and what is only an unpublished announcement, what changes in your invoices, the two modes, and the four steps worth taking now.",
      de: "Was heute gilt und was nur angekündigt ist, was sich an Ihren Rechnungen ändert, die zwei Varianten und die vier Schritte, die sich jetzt lohnen.",
    }),
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
      {/* El artículo ya se identifica a sí mismo (ver el final del
          .mdx). Lo que falta aquí es de dónde cuelga: la misma ruta
          Inicio › Blog › artículo que ya se ve escrita arriba. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                {
                  nombre: tr(lang, {
                    es: "VeriFactu para empresas de servicios",
                    en: "VeriFactu for service companies",
                    de: "VeriFactu für Dienstleistungsbetriebe",
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
