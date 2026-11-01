import type { Metadata } from "next";
import { PlantillaJornadaPage } from "@/components/site/plantilla-jornada-page";
import { marca } from "@/content/marca";
import { COMPROBADO } from "@/content/obligaciones";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* La plantilla gratis, que es el imán de arriba del embudo.

   POR QUÉ ESTA Y NO OTRA. En el barrido de demanda, «plantilla» sale
   pegada a casi todo lo que teclea un empresario: no busca su dolor,
   busca una herramienta, un precio, una ley o una plantilla. Esta es
   la que más se busca de lo nuestro y, sobre todo, es la única que
   podemos regalar diciendo la verdad, porque el registro en hoja de
   cálculo sigue siendo legal.

   NO COMPITE CON /modulos/control-horario NI CON EL ARTÍCULO DEL
   CONTROL HORARIO: aquella vende el fichaje, el artículo explica la
   norma y esta entrega un archivo. Tres intenciones, tres páginas. */

const RUTA = "/plantillas/registro-de-jornada";

const TITULO = {
  es: "Plantilla gratis de registro de jornada",
  en: "Free working-time record template for Excel",
  de: "Kostenlose Vorlage zur Arbeitszeiterfassung",
};
const DESCRIPCION = {
  es: "Hoja con las columnas que exige el artículo 34.9 y el total de horas calculado solo. Sin registro ni correo. Y qué dice la ley sobre el fichaje digital.",
  en: "A sheet with the columns Spanish law requires and the daily total worked out for you. No sign-up, no email. And what the law says about digital clocking in.",
  de: "Tabelle mit den gesetzlich verlangten Spalten und automatisch berechneter Tagessumme. Ohne Anmeldung. Und was das Gesetz zur digitalen Erfassung wirklich sagt.",
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

export default async function PaginaPlantilla({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const url = urlAbsoluta(lang, RUTA);
  return (
    <>
      <PlantillaJornadaPage lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                {
                  nombre: tr(lang, {
                    es: "Plantilla de registro de jornada",
                    en: "Working-time record template",
                    de: "Vorlage zur Arbeitszeiterfassung",
                  }),
                  ruta: RUTA,
                },
              ]),
              /* El archivo, declarado como lo que es. Sin esto, para un
                 buscador esto es una página más con un enlace; con
                 esto, es una descarga con su formato y su licencia. */
              {
                "@type": "CreativeWork",
                "@id": `${url}#plantilla`,
                name: TITULO[lang],
                description: DESCRIPCION[lang],
                url,
                inLanguage: OG_LOCALE[lang].replace("_", "-"),
                isAccessibleForFree: true,
                dateModified: COMPROBADO,
                author: { "@id": marca.dominio + "/#business" },
                publisher: { "@id": marca.dominio + "/#business" },
                encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              },
            ]),
          ),
        }}
      />
    </>
  );
}
