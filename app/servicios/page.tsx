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
import { faqServicios, navServicios } from "@/content/servicios";
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

const titulo = "Soluciones digitales a medida para pymes";
const descripcion =
  "Qué construimos: CRM a medida, fichaje, configuradores web e integraciones. Cómo trabajamos, en cuatro pasos. Y CentralAvisos, que ya está hecho.";

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
        url: "/assets/og-nexo4pymes.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes — soluciones digitales a medida",
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

export default function PaginaServicios() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navServicios}
        cta={{ texto: "WhatsApp", href: waLink("GENERAL"), externo: true }}
        enlacePill={{ href: "/contacto", texto: "Contacto ↗", textoMovil: "Contacto ↗" }}
      />

      <main id="contenido" className="relative z-10">
        <HeroServicios />
        <ServiciosGrid />
        <AvisosServicios />
        <MetodoServicios />
        <CasoDiagnostico />
        <ComoEmpezar />
        <FaqSeccion id="faq" categoria="Preguntas frecuentes" titular="Antes de escribirnos" preguntas={faqServicios} />
        <CierreServicios />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#servicios", texto: "Servicios" },
          { href: "#metodo", texto: "Método" },
          { href: "#como-empezar", texto: "Cómo se empieza" },
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
        texto="Escribidnos por WhatsApp"
        href={waLink("GENERAL")}
        externo
        /* La barra flotante llevaba aquí "Diagnóstico 150€ · quedan N
            plazas". Se quitó al retirar los precios de esta página:
            era el único importe que seguía a la vista al hacer scroll. */
        nota={oferta.ofertaActiva ? `Quedan ${oferta.plazasLibres} plazas` : undefined}
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
