import type { Metadata } from "next";
import { PadelPage } from "@/components/site/padel-page";
import { padel } from "@/content/padel";
import { marca } from "@/content/marca";
import { esquemaFaq, esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { alternativas, idiomaOBase } from "@/lib/i18n";

/* /padel — Nexo Pádel. Solo en español (clubes de Mallorca): en /en/padel y
   /de/padel se ve la misma página en español, sin indexar, y la dirección
   buena para Google es siempre /padel. */

/* 56 caracteres con la marca detrás. Antes eran 69 y con "| Nexo4Pymes"
   se iba a 82: Google corta sobre 70 y lo que cortaba era justo el
   nombre. Y entra "Mallorca", que es con lo que busca un club de aquí
   y no estaba en el título. */
const TITULO = "Software para clubes de pádel en Mallorca";
/* 153 caracteres. Estaba en 184 y Google corta sobre 155: lo que se
   perdía era «Hecho en Mallorca», que es la mitad del motivo para
   entrar. Ahora el topónimo va delante y no se corta nada. */
const DESCRIPCION =
  "Programa para clubes y escuelas de pádel en Mallorca: un WhatsApp que contesta por el club, recuperaciones automáticas y partidos que se completan solos.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  return {
    title: { absolute: `${TITULO} | Nexo4Pymes` },
    description: DESCRIPCION,
    alternates: { canonical: alternativas("es", "/padel").canonical },
    robots: lang === "es" ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: "Nexo4Pymes",
      title: "Nexo Pádel: tu club de pádel, sin estar pegado al WhatsApp",
      description: DESCRIPCION,
      url: alternativas("es", "/padel").canonical,
      /* El fotograma del vídeo del hero (1280×720), no la imagen genérica
         de la marca: quien recibe el enlace ve pistas de pádel y entiende
         de qué va antes de abrirlo. */
      images: [{ url: "/padel/hero.jpg", width: 1280, height: 720, alt: "Nexo Pádel" }],
    },
    twitter: { card: "summary_large_image", images: ["/padel/hero.jpg"] },
  };
}

export default function Page() {
  return (
    <>
      <PadelPage />
      {/* Las preguntas que ya se ven en la página, también como dato, y
          los planes con su precio: es la única página de la web con
          precios públicos, así que es la única donde se pueden declarar.
          SoftwareApplication y no Service porque es un producto con cuota
          mensual, que es lo que entiende un buscador por esto. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas("es", [{ nombre: "Nexo Pádel", ruta: "/padel" }]),
              esquemaFaq(
                padel.faq.map(([p, r]) => ({ p, r })),
                urlAbsoluta("es", "/padel") + "#faq",
                "es",
              ),
              {
                "@type": "SoftwareApplication",
                "@id": urlAbsoluta("es", "/padel") + "#producto",
                name: "Nexo Pádel",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, Android, iOS",
                description:
                  "Programa para clubes y escuelas de pádel: asistente de WhatsApp con IA, escuela con faltas y recuperaciones automáticas, partidos que se completan solos y cierre de mes.",
                url: urlAbsoluta("es", "/padel"),
                inLanguage: "es-ES",
                provider: { "@id": marca.dominio + "/#business" },
                areaServed: { "@type": "Place", name: "Mallorca" },
                /* 89 € el plan Escuela, 179 € el plan Club, y Multisede a
                   medida (sin precio, de ahí offerCount 3 con dos precios).
                   Sin IVA y al mes, las dos cosas declaradas. */
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: "EUR",
                  lowPrice: 89,
                  highPrice: 179,
                  offerCount: 3,
                  valueAddedTaxIncluded: false,
                  availability: "https://schema.org/InStock",
                  offers: [
                    { nombre: "Escuela", precio: 89 },
                    { nombre: "Club", precio: 179 },
                  ].map((p) => ({
                    "@type": "Offer",
                    name: p.nombre,
                    availability: "https://schema.org/InStock",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: p.precio,
                      priceCurrency: "EUR",
                      valueAddedTaxIncluded: false,
                      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
                    },
                  })),
                },
              },
            ]),
          ),
        }}
      />
    </>
  );
}
