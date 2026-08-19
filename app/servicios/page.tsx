import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { HeroServicios } from "@/components/servicios/HeroServicios";
import { ServiciosGrid } from "@/components/servicios/ServiciosGrid";
import { MetodoServicios } from "@/components/servicios/MetodoServicios";
import { CasoDiagnostico } from "@/components/servicios/CasoDiagnostico";
import { PreciosServicios } from "@/components/servicios/PreciosServicios";
import { CierreServicios } from "@/components/servicios/CierreServicios";
import { faqServicios, navServicios } from "@/content/servicios";
import { marca, oferta } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";

/* /servicios — el catálogo largo: qué automatizamos con su alcance
   y sus límites, cómo trabajamos en cinco pasos, por qué el
   diagnóstico va primero y qué cuesta.

   Ha adelgazado con el rediseño y a propósito. Antes esta página era
   "servicios + sectores + quiénes somos + RGPD", o sea la empresa
   entera en una URL: nadie llegaba al final y Google no sabía de qué
   iba. Ahora los sectores viven en la home (como selector) y
   quiénes somos + RGPD en /nosotros. Aquí solo queda servicio. */

const titulo = "Servicios de automatización con IA para pymes";
const descripcion =
  "Qué automatizamos exactamente —atención al cliente, citas, administración, leads, datos—, cómo trabajamos en cinco pasos y qué cuesta cada fase.";

export const metadata: Metadata = {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: { canonical: "/servicios" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: titulo,
    description: descripcion,
    url: "/servicios",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes — servicios de automatización con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
    images: ["/assets/og-image.jpg"],
  },
};

export default function PaginaServicios() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navServicios}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
        enlacePill={{ href: "/contacto", texto: "Contacto ↗", textoMovil: "Contacto y presupuesto ↗" }}
      />

      <main id="contenido" className="relative z-10">
        <HeroServicios />
        <ServiciosGrid />
        <MetodoServicios />
        <CasoDiagnostico />
        <PreciosServicios />
        <FaqSeccion id="faq" categoria="Preguntas frecuentes" titular="Antes de escribirnos" preguntas={faqServicios} />
        <CierreServicios />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#servicios", texto: "Servicios" },
          { href: "#metodo", texto: "Método" },
          { href: "#precios", texto: "Precios" },
          { href: "/nosotros", texto: "Quiénes somos" },
          { href: "/contacto", texto: "Contacto" },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: "¿Queréis saber quién está detrás?",
          texto: "Quiénes somos y qué pasa con vuestros datos",
          href: "/nosotros",
        }}
      />

      <CtaMovil
        texto="Agendar llamada gratis"
        href={marca.calendly}
        externo
        nota={oferta.ofertaActiva ? `Diagnóstico ${oferta.precio}€ · quedan ${oferta.plazasLibres} plazas` : undefined}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqServicios, `${marca.dominio}/servicios#faq`)),
        }}
      />
    </>
  );
}
