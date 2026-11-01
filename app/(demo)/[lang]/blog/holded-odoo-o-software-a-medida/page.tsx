import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { ogArticulo } from "@/content/articulos";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* El artículo está escrito en tres archivos, uno por idioma.
   Esta página solo elige cuál enseñar.

   VA A POR EL SEGUNDO CARRIL CON MÁS DEMANDA MEDIDA DE TODO EL NICHO:
   las comparativas de herramientas. Son cientos de consultas al mes y
   no hay un solo artículo honesto, porque todos los que existen los
   firma alguien que implanta Odoo o alguien que vende Holded. La
   tercera posición —«a veces ninguno de los dos, y así se sabe»— está
   vacía.

   NO COMPITE CON /obligaciones NI CON LAS LANDINGS DE MÓDULO. Aquella
   página es para quien ya sabe que le obliga algo; las landings, para
   quien ya busca un programa. Esta es para quien está comparando y
   todavía no ha decidido nada, que llega antes en la decisión y es
   mucha más gente. */

const RUTA = "/blog/holded-odoo-o-software-a-medida";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* El titular del artículo es el largo (es el que se lee); este es el
     del buscador y lleva delante los dos nombres que se teclean. */
  const titulo = tr(lang, {
    es: "Holded, Odoo o a medida: cómo elegir sin equivocarse",
    en: "Holded, Odoo or custom software: how to choose",
    de: "Holded, Odoo oder Eigenentwicklung: richtig wählen",
  });
  const descripcion = tr(lang, {
    es: "La pregunta que ninguna comparativa hace: cuánto de vuestro trabajo cabe en un catálogo. La prueba del precio y lo que no hay que programar nunca.",
    en: "The question no comparison asks: how much of your work fits in a catalogue. The pricing test, and what should never be built from scratch.",
    de: "Die Frage, die kein Vergleich stellt: Wie viel Ihrer Arbeit passt in einen Katalog? Der Preistest, was man nie selbst baut, und die Kosten, die keiner nennt.",
  });
  return {
    title: { absolute: titulo },
    description: descripcion,
    alternates: alternativas(lang, RUTA),
    openGraph: ogArticulo(lang, RUTA, { titulo, descripcion }),
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
                    es: "Holded, Odoo o a medida",
                    en: "Holded, Odoo or custom software",
                    de: "Holded, Odoo oder Eigenentwicklung",
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
