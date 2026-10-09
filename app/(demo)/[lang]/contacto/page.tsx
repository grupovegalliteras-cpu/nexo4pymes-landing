import type { Metadata } from "next";
import { ContactoPage } from "@/components/site/contacto-page";
import { marca } from "@/content/marca";
import { esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";

/* /contacto.

   ESTA PÁGINA SE MUDÓ DE app/(web) A app/(demo) y no es un capricho de
   carpetas: son dos plantillas distintas con tipografías, colores y
   cabecera distintas. Mientras vivió en la otra, quien llegaba desde la
   portada tenía la sensación de haber salido del sitio justo en la
   página donde se decide escribir o no escribir.

   El texto es el mismo de siempre (content/contacto.ts, en los tres
   idiomas). Lo que cambió es el envoltorio. */

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = tr(lang, {
    es: "Contacto — hablemos de vuestro negocio",
    en: "Contact — let's talk about your business",
    de: "Kontakt — sprechen wir über Ihr Geschäft",
  });
  const descripcion = tr(lang, {
    es: "Agendad una videollamada gratuita de 15 minutos o escribidnos por WhatsApp. Contestamos en menos de 24 horas laborables, desde Palma de Mallorca.",
    en: "Book a free 15-minute video call or message us on WhatsApp. We reply within 24 working hours, from Palma de Mallorca.",
    de: "Buchen Sie einen kostenlosen 15-minütigen Videocall oder schreiben Sie uns auf WhatsApp. Wir antworten innerhalb von 24 Arbeitsstunden, aus Palma de Mallorca.",
  });
  return {
    title: { absolute: `${titulo} | Nexo4Pymes` },
    description: descripcion,
    alternates: alternativas(lang, "/contacto"),
    openGraph: {
      type: "website",
      siteName: marca.nombre,
      locale: OG_LOCALE[lang],
      title: titulo,
      description: descripcion,
      url: alternativas(lang, "/contacto").canonical,
      images: [{ url: "/assets/og-nexo4pymes.jpg", width: 1200, height: 630, alt: `Nexo4Pymes — ${titulo}` }],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: ["/assets/og-nexo4pymes.jpg"] },
  };
}

export default async function Pagina({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  return (
    <>
      <ContactoPage />
      {/* ContactPage con el punto de contacto repetido aquí: es la
          página a la que un buscador manda a quien pregunta «cómo
          contactar con Nexo4Pymes», y conviene que el teléfono y el
          correo estén en el dato y no solo en el texto. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: tr(lang, { es: "Contacto", en: "Contact", de: "Kontakt" }), ruta: "/contacto" },
              ]),
              {
                "@type": "ContactPage",
                "@id": urlAbsoluta(lang, "/contacto") + "#pagina",
                url: urlAbsoluta(lang, "/contacto"),
                name: tr(lang, { es: "Contacto", en: "Contact", de: "Kontakt" }),
                about: { "@id": marca.dominio + "/#business" },
                isPartOf: { "@id": marca.dominio + "/#website" },
                mainEntity: {
                  "@type": "ContactPoint",
                  telephone: `+${marca.whatsapp}`,
                  email: marca.email,
                  contactType: "sales",
                  areaServed: "ES",
                  availableLanguage: ["es", "en", "de"],
                },
              },
            ]),
          ),
        }}
      />
    </>
  );
}
