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
import { Sectores } from "@/components/servicios/Sectores";
import { PreciosServicios } from "@/components/servicios/PreciosServicios";
import { QuienesSomos } from "@/components/servicios/QuienesSomos";
import { DatosRgpd } from "@/components/servicios/DatosRgpd";
import { CierreServicios } from "@/components/servicios/CierreServicios";
import { faqServicios, navServicios } from "@/content/servicios";
import { marca, oferta } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";

/* /servicios — la página general de la empresa: qué automatizamos,
   cómo trabajamos, a quién ayudamos, precios, quiénes somos y datos.
   La home (/) ya se lleva la keyword de clínicas veterinarias, así
   que aquí el título persigue la búsqueda genérica de automatización
   con IA para pymes. */

const titulo = "Servicios, método y quiénes somos — Nexo4Pymes";
const descripcion =
  "Qué automatizamos, cómo trabajamos en cinco pasos, a quién ayudamos, qué cuesta y qué pasa con los datos de vuestros clientes.";

export const metadata: Metadata = {
  title: { absolute: titulo },
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
        alt: "Nexo4Pymes — servicios, método y quiénes somos",
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
        enlacePill={{ href: "/", texto: "← Veterinarias", textoMovil: "← Clínicas veterinarias" }}
      />

      <main id="contenido" className="relative z-10">
        <HeroServicios />
        <ServiciosGrid />
        <MetodoServicios />
        <CasoDiagnostico />
        <Sectores />
        <PreciosServicios />
        <QuienesSomos />
        <DatosRgpd />
        <FaqSeccion id="faq" categoria="Preguntas frecuentes" titular="Antes de escribirnos" preguntas={faqServicios} />
        <CierreServicios />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#servicios", texto: "Servicios" },
          { href: "#metodo", texto: "Método" },
          { href: "#precios", texto: "Precios" },
          { href: "#nosotros", texto: "Quiénes somos" },
          { href: "/", texto: "Clínicas veterinarias" },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: "¿Buscáis la clínica veterinaria?",
          texto: "Volver a la home de veterinarias",
          href: "/",
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
