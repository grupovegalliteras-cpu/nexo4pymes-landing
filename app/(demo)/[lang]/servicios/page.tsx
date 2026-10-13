import type { Metadata } from "next";
import { ContactDock, SiteFooter, SiteNav } from "@/components/site/chrome";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { HeroServicios } from "@/components/servicios/HeroServicios";
import { ServiciosGrid } from "@/components/servicios/ServiciosGrid";
import { AvisosServicios } from "@/components/servicios/AvisosServicios";
import { MetodoServicios } from "@/components/servicios/MetodoServicios";
import { CasoDiagnostico } from "@/components/servicios/CasoDiagnostico";
import { ComoEmpezar } from "@/components/servicios/ComoEmpezar";
import { SectoresServicios } from "@/components/servicios/SectoresServicios";
import { CierreServicios } from "@/components/servicios/CierreServicios";
import { contenido } from "@/content/i18n";
import { OG_LOCALE, alternativas, idiomaOBase, tr } from "@/lib/i18n";
import { fijarIdioma } from "@/lib/idioma-servidor";
import { marca } from "@/content/marca";
import { esquemaFaq, esquemaMigas, grafoPagina, urlAbsoluta } from "@/lib/esquema";

/* /servicios — el catálogo largo: qué construimos con su alcance
   y sus límites, cómo trabajamos en cinco pasos, por qué el
   diagnóstico va primero y cómo se empieza.

   Ha adelgazado con el rediseño y a propósito. Antes esta página era
   "servicios + sectores + quiénes somos + RGPD", o sea la empresa
   entera en una URL: nadie llegaba al final y Google no sabía de qué
   iba. Ahora los sectores viven en la home (como selector) y
   quiénes somos + RGPD en /nosotros. Aquí solo queda servicio.

   LA CABECERA Y EL PIE SON LOS DE TODA LA WEB (SiteNav/SiteFooter).
   Esta página tenía los suyos propios, de cuando era otra web con
   otra paleta: al pulsar «Servicios» desde la portada se cambiaba de
   sitio sin cambiar de dominio. La barra flotante de WhatsApp
   también era propia (CtaMovil) y ahora la pone ContactDock, que
   además se aparta solo cuando hay un formulario a la vista. */

/* EL TÍTULO NOMBRA EL SERVICIO Y EL SITIO, EN ESE ORDEN.
   Se miraron los diez primeros resultados de "software a medida
   mallorca": los diez llevan "Mallorca" o "Palma de Mallorca" en el
   título y casi todos son una página de servicio dedicada, no una
   portada. Esta página era la candidata natural a ese resultado y era
   la única del grupo sin el topónimo.

   NO PISA A LA PORTADA. La portada va a por el producto ("programa de
   gestión para empresas de servicios en Mallorca") y esta va a por el
   servicio ("desarrollo de software a medida"). Si las dos dijeran lo
   mismo, Google elegiría una y la otra sobraría. */
const TITULO = {
  es: "Desarrollo de software a medida en Mallorca",
  en: "Custom software development in Mallorca",
  de: "Individuelle Softwareentwicklung auf Mallorca",
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
  const { faqServicios } = contenido(lang).servicios;
  const t = (x: { es: string; en: string; de: string }) => tr(lang, x);
  return (
    <div className="bg-bg text-fg">
      {/* dark: el hero es la franja de agua azul, así que la cabecera
          entra transparente y sólo se vuelve opaca al hacer scroll. */}
      <SiteNav dark />

      <main id="contenido">
        <HeroServicios />
        <ServiciosGrid />
        <AvisosServicios />
        <MetodoServicios />
        <CasoDiagnostico />
        <ComoEmpezar />
        <SectoresServicios />
        <FaqSeccion
          id="faq"
          categoria={t({ es: "Preguntas frecuentes", en: "Frequently asked questions", de: "Häufige Fragen" })}
          titular={t({ es: "Antes de escribirnos", en: "Before you write to us", de: "Bevor Sie uns schreiben" })}
          preguntas={faqServicios}
        />
        <CierreServicios />
      </main>

      <SiteFooter />
      <ContactDock
        mensaje={t({
          es: "Hola, he visto los servicios de Nexo4Pymes y me gustaría comentaros lo que necesitamos.",
          en: "Hi, I've seen the Nexo4Pymes services and I'd like to talk about what we need.",
          de: "Hallo, ich habe die Leistungen von Nexo4Pymes gesehen und möchte über unseren Bedarf sprechen.",
        })}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [{ nombre: t({ es: "Servicios", en: "Services", de: "Leistungen" }), ruta: "/servicios" }]),
              esquemaFaq(faqServicios, urlAbsoluta(lang, "/servicios") + "#faq", lang),
            ]),
          ),
        }}
      />
    </div>
  );
}
