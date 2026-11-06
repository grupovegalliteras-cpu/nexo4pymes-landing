import type { Metadata } from "next";
import { Portada, PREGUNTAS } from "@/components/site/portada";
import { esquemaFaq, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { alternativas, idiomaOBase } from "@/lib/i18n";

/* LA PORTADA.

   Antes montaba <Landing/>, que vendía el catálogo de módulos y
   sectores. Search Console dio la respuesta a ese experimento: 0
   clics comerciales en 90 días. Ahora monta <Portada/>, que vende el
   empleado de IA y nada más.

   LAS PREGUNTAS SALEN DEL MISMO SITIO QUE LA PÁGINA. Antes el FAQ
   estructurado venía de content/faq-portada.ts y la página escribía
   otras preguntas distintas: dos verdades para la misma página.
   Ahora las dos leen PREGUNTAS de components/site/portada.tsx. */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return { alternates: alternativas(idiomaOBase((await params).lang), "/") };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  return (
    <>
      <Portada lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaFaq(
                PREGUNTAS.map(([p, r]) => ({ p, r })),
                urlAbsoluta(lang, "/") + "#faq",
                lang,
              ),
              {
                "@type": "WebPage",
                "@id": urlAbsoluta(lang, "/") + "#pagina",
                url: urlAbsoluta(lang, "/"),
              },
            ]),
          ),
        }}
      />
    </>
  );
}
