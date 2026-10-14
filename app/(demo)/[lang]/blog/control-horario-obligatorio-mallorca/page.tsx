import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* El artículo está escrito en tres archivos, uno por idioma.
   Esta página solo elige cuál enseñar.

   HACE PAREJA CON /modulos/control-horario. La landing es para quien
   ya busca un programa de fichaje; este artículo, para quien busca si
   el fichaje digital es obligatorio — que es mucha más gente, llega
   antes en la decisión, y hoy encuentra sobre todo páginas de
   vendedores diciéndole que sí lo es. */

const RUTA = "/blog/control-horario-obligatorio-mallorca";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: {
      absolute: tr(lang, {
        es: "Control horario: qué obliga de verdad y qué os venden",
        en: "Time tracking in Spain: what the law really requires",
        de: "Arbeitszeiterfassung: Was wirklich Pflicht ist",
      }),
    },
    description: tr(lang, {
      es: "Registrar la jornada es obligatorio desde 2019; hacerlo digitalmente no lo es. Qué dice el artículo 34.9, por qué el papel se rompe en el trabajo de campo y qué cambia con el móvil.",
      en: "Recording working hours has been mandatory since 2019; doing it digitally is not. What article 34.9 says, why paper breaks in field work, and what changes with a phone.",
      de: "Die Arbeitszeiterfassung ist seit 2019 Pflicht, die digitale Führung nicht. Was Artikel 34.9 verlangt, warum Papier im Außendienst zerbricht und was sich mit dem Handy ändert.",
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
                    es: "Control horario obligatorio",
                    en: "Mandatory time tracking",
                    de: "Pflicht zur Zeiterfassung",
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
