import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import {
  CierreNosotros,
  EnfoquePyme,
  HeroNosotros,
  Historia,
  Valores,
} from "@/components/nosotros/SeccionesNosotros";
import { DatosRgpd } from "@/components/nosotros/DatosRgpd";
import { contenido } from "@/content/i18n";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { marca } from "@/content/marca";
import { waLink } from "@/lib/whatsapp";

/* /nosotros — el brief la pedía como página propia y tenía razón:
   "quiénes somos" y "datos y RGPD" eran dos secciones enterradas al
   final de /servicios, donde solo llegaba quien ya se había leído el
   catálogo entero. Son justo el material que consulta alguien que
   está decidiendo si fiarse. */

const TITULO = {
  es: "Quiénes somos — un equipo pequeño de Mallorca",
  en: "About us — a small team from Mallorca",
  de: "Über uns — ein kleines Team von Mallorca",
};
const DESCRIPCION = {
  es: "Quiénes están detrás de Nexo4Pymes, cómo trabajamos con pymes, por qué el diagnóstico va siempre primero y qué pasa con los datos de vuestros clientes.",
  en: "Who is behind Nexo4Pymes, how we work with small businesses, why diagnosis always comes first and what happens to your customers' data.",
  de: "Wer hinter Nexo4Pymes steht, wie wir mit kleinen Unternehmen arbeiten, warum die Analyse immer zuerst kommt und was mit den Daten Ihrer Kunden passiert.",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  const titulo = TITULO[lang];
  const descripcion = DESCRIPCION[lang];
  return {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: alternativas(lang, "/nosotros"),
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: OG_LOCALE[lang],
    title: titulo,
    description: descripcion,
    url: alternativas(lang, "/nosotros").canonical,
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

export default async function PaginaNosotros({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  const { navNosotros } = contenido(lang).nosotros;
  const t = (x: { es: string; en: string; de: string }) => tr(lang, x);
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navNosotros}
        cta={{ texto: "WhatsApp", href: waLink("GENERAL", undefined, lang), externo: true }}
        enlacePill={{ href: "/contacto", texto: t({ es: "Contacto ↗", en: "Contact ↗", de: "Kontakt ↗" }), textoMovil: t({ es: "Contacto y presupuesto ↗", en: "Contact and quote ↗", de: "Kontakt und Angebot ↗" }) }}
      />

      <main id="contenido" className="relative z-10">
        <HeroNosotros />
        <Historia />
        <Valores />
        <EnfoquePyme />
        <DatosRgpd />
        <CierreNosotros />
      </main>

      <PieDePagina
        redes
        enlaces={[
          ...navNosotros,
          { href: "/servicios", texto: t({ es: "Servicios", en: "Services", de: "Leistungen" }) },
          { href: "/contacto", texto: t({ es: "Contacto", en: "Contact", de: "Kontakt" }) },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: t({ es: "¿Queréis ver qué construimos?", en: "Want to see what we build?", de: "Möchten Sie sehen, was wir bauen?" }),
          texto: t({ es: "Servicios, método y alcance", en: "Services, method and scope", de: "Leistungen, Methode und Umfang" }),
          href: "/servicios",
        }}
      />

      <CtaMovil texto={t({ es: "Escribidnos por WhatsApp", en: "Message us on WhatsApp", de: "Schreiben Sie uns auf WhatsApp" })} href={waLink("GENERAL", undefined, lang)} externo />
    </>
  );
}
