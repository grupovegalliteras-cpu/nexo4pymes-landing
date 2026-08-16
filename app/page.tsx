import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { HeroVet } from "@/components/vet/HeroVet";
import { Marquesina } from "@/components/vet/Marquesina";
import { ProblemaVet } from "@/components/vet/ProblemaVet";
import { ComoVaVet } from "@/components/vet/ComoVaVet";
import { LimitesVet } from "@/components/vet/LimitesVet";
import { PorQueNoEmpezamos } from "@/components/vet/PorQueNoEmpezamos";
import { MetodoVet } from "@/components/vet/MetodoVet";
import { OfertaVet } from "@/components/vet/OfertaVet";
import { GateServicios } from "@/components/vet/GateServicios";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { CierreVet } from "@/components/vet/CierreVet";
import { faqVet, marquesina, navVet } from "@/content/vet";
import { marca, oferta } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";

/* HOME — antes vivía en /veterinarias. Es la página de conversión que
   se manda tras las llamadas en frío, así que aquí sí se persigue la
   keyword "automatización para clínicas veterinarias" en H1 y title.
   La página general de pymes (que vivía aquí) se retiró: su
   contenido pasó a /servicios. */

const titulo = "Nexo4Pymes — El WhatsApp de vuestra clínica, contestado y agendado solo";
const descripcion =
  "Un agente de IA contesta los WhatsApp de vuestra clínica veterinaria, agenda en vuestro Google Calendar y avisa de las vacunas que tocan.";

export const metadata: Metadata = {
  title: { absolute: titulo },
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: titulo,
    description: descripcion,
    url: "/",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes — automatización con IA para clínicas veterinarias",
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

export default function PaginaInicio() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navVet}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
        enlacePill={{ href: "/servicios", texto: "Servicios ↗", textoMovil: "Servicios y quiénes somos ↗" }}
      />

      <main id="contenido" className="relative z-10">
        <HeroVet />
        <Marquesina items={marquesina} />
        <ProblemaVet />
        <ComoVaVet />
        <LimitesVet />
        <PorQueNoEmpezamos />
        <MetodoVet />
        <OfertaVet />
        <GateServicios />
        <FaqSeccion id="faq" categoria="Preguntas frecuentes" titular="Lo que nos preguntan siempre" preguntas={faqVet} />
        <CierreVet />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#problema", texto: "El problema" },
          { href: "#como-va", texto: "Cómo va" },
          { href: "#diagnostico", texto: "Precio" },
          { href: "#faq", texto: "Preguntas frecuentes" },
          { href: "/servicios", texto: "Servicios y quiénes somos" },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: "¿Quieres verlo todo con calma?",
          texto: "Servicios, método y quiénes somos",
          href: "/servicios",
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
          __html: JSON.stringify(esquemaFaq(faqVet, `${marca.dominio}/#faq`)),
        }}
      />
    </>
  );
}
