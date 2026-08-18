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
import { PruebaVet } from "@/components/vet/PruebaVet";
import { MetodoVet } from "@/components/vet/MetodoVet";
import { OfertaVet } from "@/components/vet/OfertaVet";
import { GateServicios } from "@/components/vet/GateServicios";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { CierreVet } from "@/components/vet/CierreVet";
import { faqVet, garantias, navVet } from "@/content/vet";
import { marca } from "@/content/marca";
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

      {/* ORDEN DE LECTURA — fase 1 del rediseño mobile-first.
          Antes: problema → demo → límites → ensayo → método → precio. Ese es el
          orden en que uno explica su negocio, no en el que un desconocido decide
          comprar: el precio quedaba en el píxel 9.301 (63 % del recorrido) y
          casi nadie llegaba en móvil.

          Ahora: primero se demuestra que funciona (la secuencia), después quién
          está detrás y qué se compromete (la prueba), después cuánto cuesta y
          qué se llevan (la oferta), y solo entonces el material que resuelve
          dudas de quien ya está interesado (límites y método).

          MetodoVet absorbió la antigua sección PorQueNoEmpezamos en la fase 3. */}
      <main id="contenido" className="relative z-10">
        <HeroVet />
        <Marquesina items={garantias} />
        <ProblemaVet />
        <ComoVaVet />
        <PruebaVet />
        <OfertaVet />
        <LimitesVet />
        <MetodoVet />
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

      {/* Sin `nota`: iba a 9,5 px, ilegible, y robaba alto de pantalla al botón.
          El precio y las plazas ya viven en la tarjeta de la oferta. */}
      <CtaMovil texto="Agendar llamada gratis" href={marca.calendly} externo />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqVet, `${marca.dominio}/#faq`)),
        }}
      />
    </>
  );
}
