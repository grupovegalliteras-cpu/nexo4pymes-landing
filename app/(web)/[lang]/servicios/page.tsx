import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { HeroServicios } from "@/components/servicios/HeroServicios";
import { ServiciosGrid } from "@/components/servicios/ServiciosGrid";
import { AvisosServicios } from "@/components/servicios/AvisosServicios";
import { MetodoServicios } from "@/components/servicios/MetodoServicios";
import { CasoDiagnostico } from "@/components/servicios/CasoDiagnostico";
import { ComoEmpezar } from "@/components/servicios/ComoEmpezar";
import { CierreServicios } from "@/components/servicios/CierreServicios";
import { contenido } from "@/content/i18n";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { marca, oferta } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";
import { waLink } from "@/lib/whatsapp";

/* /servicios — el catálogo largo: qué construimos con su alcance
   y sus límites, cómo trabajamos en cinco pasos, por qué el
   diagnóstico va primero y cómo se empieza.

   Ha adelgazado con el rediseño y a propósito. Antes esta página era
   "servicios + sectores + quiénes somos + RGPD", o sea la empresa
   entera en una URL: nadie llegaba al final y Google no sabía de qué
   iba. Ahora los sectores viven en la home (como selector) y
   quiénes somos + RGPD en /nosotros. Aquí solo queda servicio. */

const TITULO = {
  es: "Soluciones digitales a medida para pymes",
  en: "Custom software for small businesses",
  de: "Individuelle Software für kleine Unternehmen",
};
const DESCRIPCION = {
  es: "Qué construimos: CRM a medida, fichaje, configuradores web e integraciones. Cómo trabajamos, en cuatro pasos. Y CentralAvisos, que ya está hecho.",
  en: "What we build: custom CRMs, time clock, web configurators and integrations. How we work, in four steps. And CentralAvisos, which is ready now.",
  de: "Was wir bauen: individuelle CRMs, Zeiterfassung, Web-Konfiguratoren und Integrationen. Wie wir arbeiten, in vier Schritten. Und CentralAvisos, das schon fertig ist.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = TITULO[lang];
  const descripcion = DESCRIPCION[lang];
  return {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: alternativas(lang, "/servicios"),
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: OG_LOCALE[lang],
    title: titulo,
    description: descripcion,
    url: alternativas(lang, "/servicios").canonical,
    images: [
      {
        url: "/assets/og-nexo4pymes.jpg",
        width: 1200,
        height: 630,
        alt: `Nexo4Pymes — ${titulo}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
    images: ["/assets/og-nexo4pymes.jpg"],
  },
  };
}

export default async function PaginaServicios({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const { faqServicios, navServicios } = contenido(lang).servicios;
  const t = (x: { es: string; en: string; de: string }) => tr(lang, x);
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navServicios}
        cta={{ texto: "WhatsApp", href: waLink("GENERAL", undefined, lang), externo: true }}
        enlacePill={{ href: "/contacto", texto: t({ es: "Contacto ↗", en: "Contact ↗", de: "Kontakt ↗" }) }}
      />

      <main id="contenido" className="relative z-10">
        <HeroServicios />
        <ServiciosGrid />
        <AvisosServicios />
        <MetodoServicios />
        <CasoDiagnostico />
        <ComoEmpezar />
        <FaqSeccion id="faq" categoria={t({ es: "Preguntas frecuentes", en: "Frequently asked questions", de: "Häufige Fragen" })} titular={t({ es: "Antes de escribirnos", en: "Before you write to us", de: "Bevor Sie uns schreiben" })} preguntas={faqServicios} />
        <CierreServicios />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#servicios", texto: t({ es: "Servicios", en: "Services", de: "Leistungen" }) },
          { href: "#metodo", texto: t({ es: "Método", en: "Method", de: "Methode" }) },
          { href: "#como-empezar", texto: t({ es: "Cómo se empieza", en: "How to start", de: "So beginnt es" }) },
          { href: "/nosotros", texto: t({ es: "Quiénes somos", en: "About us", de: "Über uns" }) },
          { href: "/contacto", texto: t({ es: "Contacto", en: "Contact", de: "Kontakt" }) },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: t({ es: "¿Queréis saber quién está detrás?", en: "Want to know who's behind it?", de: "Möchten Sie wissen, wer dahintersteht?" }),
          texto: t({ es: "Quiénes somos y qué pasa con vuestros datos", en: "Who we are and what happens to your data", de: "Wer wir sind und was mit Ihren Daten passiert" }),
          href: "/nosotros",
        }}
      />

      <CtaMovil
        texto={t({ es: "Escribidnos por WhatsApp", en: "Message us on WhatsApp", de: "Schreiben Sie uns auf WhatsApp" })}
        href={waLink("GENERAL", undefined, lang)}
        externo
        /* La barra flotante llevaba aquí "Diagnóstico 150€ · quedan N
            plazas". Se quitó al retirar los precios de esta página:
            era el único importe que seguía a la vista al hacer scroll. */
        nota={oferta.ofertaActiva ? t({ es: `Quedan ${oferta.plazasLibres} plazas`, en: `${oferta.plazasLibres} places left`, de: `Noch ${oferta.plazasLibres} Plätze frei` }) : undefined}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqServicios, `${marca.dominio}${alternativas(lang, "/servicios").canonical}#faq`)),
        }}
      />
    </>
  );
}
