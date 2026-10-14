import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* El artículo está escrito en tres archivos, uno por idioma.
   Esta página solo elige cuál enseñar.

   HACE PAREJA CON /modulos/partes-de-trabajo. La landing enseña el
   producto; este artículo contesta a quien está decidiendo si dar el
   paso, y sobre todo a quien ya lo intentó una vez y lo dejó. De eso
   último no habla ningún competidor, porque ninguno quiere contar que
   su app se abandona si el parte tarda más que el papel. */

const RUTA = "/blog/partes-de-trabajo-movil-mallorca";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: {
      absolute: tr(lang, {
        es: "Partes de trabajo en el móvil: por qué fallan los que fallan",
        en: "Job reports on a phone: why the ones that fail, fail",
        de: "Arbeitsberichte auf dem Handy: Warum manche scheitern",
      }),
    },
    description: tr(lang, {
      es: "Qué se pierde con el parte en papel, por qué se abandonan las apps de partes, qué campos hacen falta de verdad y por qué tiene que funcionar sin cobertura.",
      en: "What paper job reports cost you, why job report apps get abandoned, which fields are genuinely needed, and why it has to work without a signal.",
      de: "Was der Papierbericht kostet, warum Berichts-Apps aufgegeben werden, welche Felder wirklich nötig sind und warum es ohne Empfang funktionieren muss.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                {
                  nombre: tr(lang, {
                    es: "Partes de trabajo en el móvil",
                    en: "Job reports on a phone",
                    de: "Arbeitsberichte auf dem Handy",
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
