import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import ArticuloEs from "./es.mdx";
import ArticuloEn from "./en.mdx";
import ArticuloDe from "./de.mdx";

/* El artículo está escrito en tres archivos, uno por idioma (es.mdx, en.mdx, de.mdx).
   Esta página solo elige cuál enseñar. Un artículo nuevo: carpeta con su page.tsx igual que esta. */

const RUTA = "/blog/por-que-diagnosticar-antes-de-automatizar";
const ARTICULO = { es: ArticuloEs, en: ArticuloEn, de: ArticuloDe };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    /* 68 caracteres ya con el titular entero: con "| Nexo4Pymes" detrás
       se iba a 81 y Google cortaba justo la marca. */
    title: {
      absolute: tr(lang, {
        es: "Por qué automatizar sin diagnosticar antes puede hundiros el negocio",
        en: "Why automating without a diagnosis first can sink your business",
        /* 65 caracteres. El titular del artículo sigue siendo el largo;
           este es solo el del buscador, que cortaba a los 70. */
        de: "Automatisieren ohne Analyse kann Ihr Geschäft versenken",
      }),
    },
    /* Estaba en 213 caracteres: Google corta sobre 155 y se perdía el
       final, que era la parte que daba ganas de entrar. */
    description: tr(lang, {
      es: "La automatización no arregla un proceso, lo amplifica. El taller que se llenó la agenda y acabó perdiendo clientes, y cuándo la respuesta es no automatizar.",
      en: "Automation doesn't fix a process, it amplifies it. The workshop that filled its diary and lost customers, and when the right answer is not to automate.",
      de: "Automatisierung repariert keinen Prozess, sie verstärkt ihn: die Werkstatt, die ihren Kalender füllte und Kunden verlor — und wann man nicht automatisiert.",
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
          .mdx). Lo que faltaba era decir de dónde cuelga: la misma
          ruta Inicio › Blog › artículo que ya se ve escrita arriba. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                {
                  nombre: tr(lang, {
                    es: "Por qué diagnosticar antes de automatizar",
                    en: "Why diagnose before automating",
                    de: "Warum erst analysieren, dann automatisieren",
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
