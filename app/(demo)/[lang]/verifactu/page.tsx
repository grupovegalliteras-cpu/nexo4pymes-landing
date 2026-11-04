import type { Metadata } from "next";
import { VerifactuPage } from "@/components/site/verifactu-page";
import { FAQ_VERIFACTU } from "@/content/verifactu";
import { COMPROBADO, HITOS } from "@/content/verifactu-estado";
import { marca } from "@/content/marca";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaFaq, esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* /verifactu — la puerta nacional.

   SU RAZÓN DE SER ESTÁ EN content/verifactu.ts, con la medición que la
   provocó. En corto: /obligaciones tiene el contenido correcto y el
   título equivocado —va a por una frase que nadie teclea— y lo que la
   gente escribe es «verifactu», a secas, con sus variantes de fecha.

   NO LLEVA TOPÓNIMO, igual que /obligaciones y por el mismo motivo: la
   norma es estatal. Mallorca sigue estando en el negocio declarado en
   los datos estructurados, que es donde sirve para el mapa.

   EL TÍTULO CABE EN 60 CARACTERES CONTANDO EL SUFIJO. Lleva delante la
   palabra que se busca y detrás la pregunta que se hace con ella. */

const RUTA = "/verifactu";

const TITULO = {
  es: "VeriFactu: fechas, aplazamiento y quién obliga",
  en: "VeriFactu: dates, postponement and who it binds",
  de: "VeriFactu: Fristen, Verschiebung und für wen",
};
/* La descripción cabe en 165 caracteres: es lo que cabe en un
   resultado de Google antes de que corte. La primera versión se fue a
   189 y perdía justo el final, que es donde está el dato bueno. */
const DESCRIPCION = {
  es: "Qué fechas de VeriFactu están en el BOE y cuál es solo un anuncio, a quién obliga y qué dice de verdad el artículo 201 bis sobre las multas.",
  en: "Which VeriFactu dates are published in Spain and which is only an announcement, who it binds, and what article 201 bis really says about fines.",
  de: "Welche VeriFactu-Fristen im Gesetzblatt stehen und welche nur angekündigt sind, für wen sie gelten und was Artikel 201 bis zu Bußgeldern sagt.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = TITULO[lang];
  const descripcion = DESCRIPCION[lang];
  return {
    title: { absolute: `${titulo} | Nexo4Pymes` },
    description: descripcion,
    alternates: alternativas(lang, RUTA),
    openGraph: {
      type: "article",
      siteName: marca.nombre,
      locale: OG_LOCALE[lang],
      title: titulo,
      description: descripcion,
      url: urlAbsoluta(lang, RUTA),
      images: [{ url: "/assets/og-nexo4pymes.jpg", width: 1200, height: 630, alt: marca.nombre }],
    },
  };
}

export default async function PaginaVerifactu({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const url = urlAbsoluta(lang, RUTA);
  return (
    <>
      <VerifactuPage lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                {
                  nombre: tr(lang, {
                    es: "Obligaciones legales",
                    en: "Legal obligations",
                    de: "Gesetzliche Pflichten",
                  }),
                  ruta: "/obligaciones",
                },
                { nombre: "VeriFactu", ruta: RUTA },
              ]),
              esquemaFaq(
                FAQ_VERIFACTU[lang].map(([p, r]) => ({ p, r })),
                `${url}#faq`,
                lang,
              ),
              {
                "@type": "WebPage",
                "@id": `${url}#pagina`,
                url,
                name: TITULO[lang],
                description: DESCRIPCION[lang],
                inLanguage: OG_LOCALE[lang].replace("_", "-"),
                isPartOf: { "@id": marca.dominio + "/#website" },
                publisher: { "@id": marca.dominio + "/#business" },
                /* La fecha en que se leyeron las fuentes, no la del
                   despliegue: en una página de plazos es el dato que
                   decide si todavía vale. */
                dateModified: COMPROBADO,
                about: {
                  "@type": "Legislation",
                  name: "VeriFactu — Real Decreto 1007/2023",
                  legislationIdentifier: "BOE-A-2023-24840",
                  description: tr(lang, {
                    es: "Requisitos de los sistemas informáticos de facturación: firma, huella encadenada y registro de alta por cada factura.",
                    en: "Requirements for invoicing software: signature, chained hash and an issue record for every invoice.",
                    de: "Anforderungen an Rechnungssoftware: Signatur, verketteter Hash und Ausstellungsdatensatz je Rechnung.",
                  }),
                  /* Las fechas van también como datos, con su estado: lo
                     anunciado no se declara como si estuviera en vigor. */
                  temporalCoverage: HITOS.filter((h) => h.estado === "en-vigor")
                    .map((h) => h.fecha)
                    .join(", "),
                },
                mainEntity: { "@id": `${url}#faq` },
              },
            ]),
          ),
        }}
      />
    </>
  );
}
