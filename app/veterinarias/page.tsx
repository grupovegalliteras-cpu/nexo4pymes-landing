import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { HeroVet } from "@/components/vet/HeroVet";
import { ProblemaVet } from "@/components/vet/ProblemaVet";
import { ComoFuncionaVet } from "@/components/vet/ComoFuncionaVet";
import { DemoLuna } from "@/components/vet/DemoLuna";
import { OfertaVet } from "@/components/vet/OfertaVet";
import { SobreNosotrosVet } from "@/components/vet/SobreNosotrosVet";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { CierreVet } from "@/components/vet/CierreVet";
import { cierreVet, faqVet, navVet } from "@/content/vet";
import { marca, oferta } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";

/* LANDING DE CLÍNICAS VETERINARIAS — página de conversión.
   Es la que se manda tras las llamadas en frío y la que recibe el
   tráfico de captación. Aquí sí se persigue la keyword del sector. */

const titulo = "Nexo4Pymes — Automatización con IA para clínicas veterinarias";
const descripcion = `Automatizamos citas, recordatorios de vacunas y el WhatsApp saturado de vuestra clínica veterinaria. Oferta de lanzamiento: diagnóstico inicial por ${oferta.precio}€, solo ${oferta.plazasTotales} plazas.`;

export const metadata: Metadata = {
  title: {
    absolute: titulo,
  },
  description: descripcion,
  alternates: { canonical: "/veterinarias" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: titulo,
    description: `Que no se os pierda ni una cita por WhatsApp. Oferta de lanzamiento: diagnóstico por ${oferta.precio}€, solo ${oferta.plazasTotales} plazas.`,
    url: "/veterinarias",
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
    description: `Que no se os pierda ni una cita por WhatsApp. Oferta de lanzamiento: diagnóstico por ${oferta.precio}€, solo ${oferta.plazasTotales} plazas.`,
    images: ["/assets/og-image.jpg"],
  },
};

export default function PaginaVeterinarias() {
  return (
    <>
      <Cabecera
        enlaces={navVet}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
      />

      <main id="contenido">
        <HeroVet />
        <ProblemaVet />
        <ComoFuncionaVet />
        <DemoLuna />
        <OfertaVet />
        <SobreNosotrosVet />
        <FaqSeccion
          id="faq"
          categoria="Preguntas frecuentes"
          titular="Antes de escribirnos"
          preguntas={faqVet}
          tono="alt"
        />
        <CierreVet />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#como-funciona", texto: "Cómo funciona" },
          { href: "#diagnostico", texto: "El diagnóstico" },
          { href: "#sobre-nosotros", texto: "Sobre nosotros" },
          { href: "#faq", texto: "Preguntas frecuentes" },
          { href: "/", texto: "Automatización para pymes" },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: cierreVet.cruce.pregunta,
          texto: cierreVet.cruce.enlace,
          href: "/",
        }}
      />

      <CtaMovil
        texto="Agendar llamada gratis"
        href={marca.calendly}
        externo
        nota={`Diagnóstico ${oferta.precio}€ · quedan ${oferta.plazasLibres} plazas`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqVet, `${marca.dominio}/veterinarias#faq`)),
        }}
      />
    </>
  );
}
