import type { Metadata } from "next";
import { alternativas, idiomaOBase, tr } from "@/lib/i18n";
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
    title: tr(lang, {
      es: "Por qué automatizar sin diagnosticar antes puede hundiros el negocio",
      en: "Why automating without a diagnosis first can sink your business",
      de: "Warum Automatisieren ohne vorherige Analyse Ihr Geschäft versenken kann",
    }),
    description: tr(lang, {
      es: "La automatización no arregla un proceso, lo amplifica. El caso del taller que se llenó la agenda y acabó perdiendo clientes, las tres formas típicas de estropearlo y cuándo la respuesta correcta es no automatizar.",
      en: "Automation doesn't fix a process, it amplifies it. The workshop that filled its diary and ended up losing customers, the three typical ways to get it wrong and when the right answer is not to automate.",
      de: "Automatisierung repariert keinen Prozess, sie verstärkt ihn. Die Werkstatt, die ihren Kalender füllte und Kunden verlor, die drei typischen Fehler und wann die richtige Antwort lautet: nicht automatisieren.",
    }),
    alternates: alternativas(lang, RUTA),
  };
}

export default async function Articulo({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const Contenido = ARTICULO[lang];
  return <Contenido />;
}
