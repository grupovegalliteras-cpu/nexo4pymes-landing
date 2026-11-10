import type { Metadata } from "next";
import { ObligacionesPage } from "@/components/site/obligaciones-page";
import { FAQ_OBLIGACIONES } from "@/content/obligaciones-faq";
import { COMPROBADO, OBLIGACIONES } from "@/content/obligaciones";
import { marca } from "@/content/marca";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaFaq, esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* /obligaciones — la puerta.

   De todo lo que se busca en este nicho, las obligaciones legales
   españolas son lo único que cumple las cuatro condiciones: mucha
   gente, en España, con una fecha encima y dispuesta a pagar, y
   ganable por dos personas siendo exactas. El razonamiento largo está
   en el comentario de components/site/obligaciones-page.tsx.

   HACÍA PAREJA CON /modulos/facturacion-verifactu y /modulos/control-horario,
   dos páginas de producto que se retiraron con el giro del 6/11/2026;
   y no compite con ellas: esas páginas son para quien ya busca un
   programa; esta es para quien todavía está averiguando si le obliga
   algo. Son dos intenciones distintas, y por eso son páginas distintas.

   EL TÍTULO NO LLEVA "MALLORCA". Es la única página del sitio donde se
   deja fuera a propósito: la norma es estatal y quien la busca no
   escribe el topónimo. Mallorca sigue estando en el negocio declarado
   en los datos estructurados y en el texto, que es donde sirve. */

const RUTA = "/obligaciones";

/* EL TÍTULO YA NO VA A POR "QUÉ OBLIGA A UNA EMPRESA". Medido el 3 de
   noviembre de 2026: el término paraguas autocompleta casi entero a
   Latinoamérica —"obligaciones de una empresa sas", "en Bolivia", "en
   Colombia", "ante el SAT"— y "obligaciones fiscales 2027" no devuelve
   ni una sugerencia. Esta página llevaba tres meses con cero
   impresiones no por el contenido, que es el correcto, sino porque su
   título iba a por una frase que en España nadie teclea.

   LO QUE SÍ SE TECLEA son las normas por su nombre, y ahí VeriFactu ya
   tiene su propia página. Así que el hub se queda con las dos que no
   la tienen todavía y que sí tienen demanda medida: "factura
   electrónica obligatoria" y "registro de jornada obligatorio". El día
   que esas dos tengan página propia, este título vuelve a cambiar. */
const TITULO = {
  es: "Factura electrónica y registro de jornada",
  en: "E-invoicing and working-time records in Spain",
  de: "E-Rechnung und Arbeitszeiterfassung in Spanien",
};
const DESCRIPCION = {
  es: "Desde cuándo obliga la factura electrónica entre empresas y qué exige ya el registro de jornada: lo publicado en el BOE, separado de lo que solo está anunciado.",
  en: "When business-to-business e-invoicing starts to bind you and what working-time records already require: what is published in Spain, not what is only announced.",
  de: "Ab wann die E-Rechnung zwischen Unternehmen gilt und was die Arbeitszeiterfassung schon verlangt: was im Gesetzblatt steht, getrennt vom bloß Angekündigten.",
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
      type: "website",
      siteName: marca.nombre,
      locale: OG_LOCALE[lang],
      title: titulo,
      description: descripcion,
      url: urlAbsoluta(lang, RUTA),
      images: [{ url: "/assets/og-nexo4pymes.jpg", width: 1200, height: 630, alt: marca.nombre }],
    },
  };
}

export default async function PaginaObligaciones({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const url = urlAbsoluta(lang, RUTA);
  return (
    <>
      <ObligacionesPage lang={lang} />
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
                  ruta: RUTA,
                },
              ]),
              /* Las ocho preguntas van también como datos: las ocho
                 respuestas están en el HTML, sin acordeón, así que lo
                 declarado y lo publicado coinciden. */
              esquemaFaq(
                FAQ_OBLIGACIONES[lang].map(([p, r]) => ({ p, r })),
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
                /* La fecha de la última comprobación de las fuentes, que
                   en una página de plazos legales es el dato que decide
                   si todavía vale. No es la fecha del despliegue. */
                dateModified: COMPROBADO,
                about: OBLIGACIONES.map((o) => ({
                  "@type": "Legislation",
                  name: o.nombre[lang],
                  description: o.queObliga[lang],
                })),
                mainEntity: { "@id": `${url}#faq` },
              },
            ]),
          ),
        }}
      />
    </>
  );
}
