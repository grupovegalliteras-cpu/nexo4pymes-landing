import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { HeroHome } from "@/components/home/HeroHome";
import { QueHacemos } from "@/components/home/QueHacemos";
import { ComoTrabajamos } from "@/components/home/ComoTrabajamos";
import { FormaDeVerlo } from "@/components/home/FormaDeVerlo";
import { QueAutomatizamos } from "@/components/home/QueAutomatizamos";
import { AQuienAyudamos } from "@/components/home/AQuienAyudamos";
import { BloqueVet } from "@/components/home/BloqueVet";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { Contacto } from "@/components/home/Contacto";
import { faqHome, navHome } from "@/content/home";
import { marca } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";

/* PORTADA — página de posicionamiento en Google (tráfico frío).
   El title y la meta description NO mencionan clínicas veterinarias:
   esa búsqueda la trabaja /veterinarias, que es la que convierte. */

const descripcion =
  "Automatizamos WhatsApp, citas, recordatorios y tareas repetitivas de tu pyme. Primero diagnosticamos tu negocio, después implementamos por fases.";

export const metadata: Metadata = {
  title: "Automatización de procesos con IA para pymes | Nexo4Pymes",
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: "Automatización de procesos con IA para pymes | Nexo4Pymes",
    description: descripcion,
    url: "/",
    images: [
      {
        url: "/assets/og-automatizacion-pymes.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes, agencia de automatización de procesos con inteligencia artificial para pymes y autónomos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatización de procesos con IA para pymes | Nexo4Pymes",
    description:
      "Automatizamos WhatsApp, citas, recordatorios y tareas repetitivas de tu pyme. Diagnóstico primero, implementación por fases después.",
    images: ["/assets/og-automatizacion-pymes.jpg"],
  },
};

export default function PaginaInicio() {
  return (
    <>
      {/* CTA de cabecera corto a propósito: con seis enlaces de menú, un botón
          largo parte la barra en dos líneas. El texto completo está en el hero
          y en el bloque de contacto. */}
      <Cabecera enlaces={navHome} cta={{ texto: "Hablemos", href: "#contacto" }} />

      <main id="contenido">
        <HeroHome />
        <QueHacemos />
        <ComoTrabajamos />
        <FormaDeVerlo />
        <QueAutomatizamos />
        <AQuienAyudamos />
        <BloqueVet />
        <FaqSeccion
          categoria="Preguntas frecuentes"
          titular="Dudas habituales sobre automatizar procesos con IA"
          preguntas={faqHome}
        />
        <BlogTeaser />
        <Contacto />
      </main>

      <PieDePagina
        enlaces={[
          { href: "#que-hacemos", texto: "Qué hacemos" },
          { href: "#como-trabajamos", texto: "Cómo trabajamos" },
          { href: "#diagnostico-antes", texto: "Diagnóstico previo" },
          { href: "#que-automatizar", texto: "Qué automatizamos" },
          { href: "#preguntas-frecuentes", texto: "Preguntas frecuentes" },
          { href: "/blog", texto: "Blog" },
          { href: "/veterinarias", texto: "Clínicas veterinarias" },
        ]}
        cruce={{
          pregunta: "¿Tienes una clínica veterinaria?",
          texto: "Mira la página hecha para vosotros",
          href: "/veterinarias",
        }}
      />

      <CtaMovil texto="Solicitar llamada informativa" href="#contacto" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqHome, `${marca.dominio}/#faq`)),
        }}
      />
    </>
  );
}
