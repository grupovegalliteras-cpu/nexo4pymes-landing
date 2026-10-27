import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { landingDe } from "@/data/landings";
import { moduloDe } from "@/data/modules-i18n";
import { LANDINGS_PUBLICADAS, estaPublicada, textoLanding, tituloLanding } from "@/content/landings-seo-i18n";
import { ModuloPage } from "@/components/site/modulo-page";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { esquemaFaq, esquemaMigas, esquemaServicio, grafoPagina, urlAbsoluta } from "@/lib/esquema";

/* ============================================================
   LA RUTA DE LAS LANDINGS DE MÓDULO

   Cuelga de /modulos, que es la rejilla de los 40 y hace de página
   madre. Solo existen las que están escritas en los tres idiomas: la
   lista sale de content/landings-seo-i18n.ts, no de una constante
   aparte, para que no se pueda publicar una a medias por descuido.

   EL TÍTULO LLEVA LA CONSULTA, NO EL NOMBRE INTERNO. El módulo se
   llama "fichaje" en data/modules.ts y la gente escribe "control
   horario". Si el <title> dice "Fichaje", la página no aparece.
   ============================================================ */

export function generateStaticParams() {
  return LANDINGS_PUBLICADAS.map((modulo) => ({ modulo }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/modulos/[modulo]">): Promise<Metadata> {
  const { modulo, lang: l } = await params;
  if (!estaPublicada(modulo)) return {};
  const lang = idiomaOBase(l);
  const seo = textoLanding(lang, modulo);
  const h1 = tituloLanding(lang, modulo);

  /* El topónimo va en el título porque es media partida en local, pero
     detrás de la consulta y no delante: quien busca "software
     facturación verifactu" tiene que ver esas palabras primero. */
  /* El título cabe en 60 caracteres: con los h1 largos («Time tracking
     and clock-in software») la forma inglesa se iba a 68 y Google cortaba
     justo «in Mallorca». Se prueba la natural y si no cabe, la corta.
     Mismo criterio que en /sectores. */
  const largo = tr(lang, {
    es: `${h1} para pymes en Mallorca`,
    en: `${h1} for small businesses in Mallorca`,
    de: `${h1} auf Mallorca`,
  });
  const corto = tr(lang, {
    es: `${h1} en Mallorca`,
    en: `${h1} in Mallorca`,
    de: h1,
  });
  const title = largo.length <= 60 ? largo : corto;

  return {
    title: { absolute: title },
    description: seo.entradilla,
    alternates: alternativas(lang, `/modulos/${modulo}`),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang],
      siteName: "Nexo4Pymes",
      title,
      description: seo.entradilla,
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/modulos/[modulo]">) {
  const { modulo, lang: l } = await params;
  if (!estaPublicada(modulo)) notFound();
  const lang = idiomaOBase(l);
  const seo = textoLanding(lang, modulo);
  const m = moduloDe(lang, landingDe(modulo).modulo)!;
  const ruta = `/modulos/${modulo}`;

  return (
    <>
      <ModuloPage slug={modulo} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              /* Dos niveles: la rejilla de módulos y esta. Así el
                 buscador sabe que no es una página suelta. */
              esquemaMigas(lang, [
                { nombre: tr(lang, { es: "Módulos", en: "Modules", de: "Module" }), ruta: "/modulos" },
                { nombre: m.nombre, ruta },
              ]),
              /* Las preguntas de la página, también como dato. Son las
                 que la gente teclea —"cuándo es obligatorio", "hay
                 alguno gratis", "cuánto cuesta"— y es lo que puede
                 hacer que una AI Overview cite esta página. */
              esquemaFaq(
                seo.faq.map(([p, r]) => ({ p, r })),
                urlAbsoluta(lang, ruta) + "#faq",
                lang,
              ),
              esquemaServicio({ lang, nombre: tituloLanding(lang, modulo), descripcion: seo.entradilla, ruta }),
            ]),
          ),
        }}
      />
    </>
  );
}
