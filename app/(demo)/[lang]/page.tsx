import type { Metadata } from "next";
import { Landing } from "@/components/site/landing";
import { FAQ_PORTADA } from "@/content/faq-portada";
import { colaboradores } from "@/content/colaboradores";
import { esquemaFaq, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { alternativas, idiomaOBase } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return { alternates: alternativas(idiomaOBase((await params).lang), "/") };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  return (
    <>
      <Landing />
      {/* Las siete preguntas que ya se ven en la portada, también como
          dato. Sin esto, un buscador de respuestas tiene que adivinar
          dónde acaba una respuesta y empieza la siguiente; con esto,
          cada par pregunta-respuesta se puede citar suelto. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaFaq(
                FAQ_PORTADA[lang].map(([p, r]) => ({ p, r })),
                urlAbsoluta(lang, "/") + "#faq",
                lang,
              ),
              {
                "@type": "WebPage",
                "@id": urlAbsoluta(lang, "/") + "#pagina",
                url: urlAbsoluta(lang, "/"),
                mentions: colaboradores.map((c) => ({
                  "@type": "Organization",
                  name: c.nombre,
                  ...(c.web ? { url: c.web } : {}),
                })),
              },
            ]),
          ),
        }}
      />
    </>
  );
}
