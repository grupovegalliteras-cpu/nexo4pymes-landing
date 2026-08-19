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

/* ============================================================
   /sectores/veterinarias — LANDING SECTORIAL

   Esta página FUE la portada del sitio. Con el giro de
   posicionamiento (de "especialistas en veterinarias" a
   "automatización para cualquier pyme"), la home pasa a ser
   genérica y esta baja a ser una landing de sector más, enlazada
   desde el selector de sectores de la home.

   No se ha tocado su contenido a propósito: es la página que se
   manda tras las llamadas en frío y la que mejor convierte del
   sitio. Lo único que cambia es dónde vive y a dónde apuntan sus
   enlaces de navegación.

   Sigue persiguiendo la keyword "automatización para clínicas
   veterinarias" en H1 y title — ahora sin competir con la home,
   que persigue la genérica. Antes se solapaban.

   El 301 de /veterinarias apunta aquí (ver next.config.mjs): esa
   URL se repartió en llamadas en frío y hay que respetarla.
   ============================================================ */

const titulo = "Automatización para clínicas veterinarias — WhatsApp contestado y citas agendadas solas";
const descripcion =
  "Un agente de IA contesta los WhatsApp de vuestra clínica veterinaria, agenda en vuestro Google Calendar y avisa de las vacunas que tocan.";

export const metadata: Metadata = {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: { canonical: "/sectores/veterinarias" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: titulo,
    description: descripcion,
    url: "/sectores/veterinarias",
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

export default function PaginaVeterinarias() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navVet}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
        enlacePill={{ href: "/", texto: "← Todos los sectores", textoMovil: "← Ver todos los sectores" }}
      />

      {/* ORDEN DE LECTURA — fase 1 del rediseño mobile-first.
          Antes: problema → demo → límites → ensayo → método → precio. Ese es el
          orden en que uno explica su negocio, no en el que un desconocido decide
          comprar: el precio quedaba en el píxel 9.301 (63 % del recorrido) y
          casi nadie llegaba en móvil.

          Ahora: primero se demuestra que funciona (la secuencia), después quién
          está detrás y qué se compromete (la prueba), después cuánto cuesta y
          qué se llevan (la oferta), y solo entonces el material que resuelve
          dudas de quien ya está interesado (límites y método). */}
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
          { href: "/servicios", texto: "Servicios" },
          { href: "/", texto: "Otros sectores" },
        ]}
        cruce={{
          pregunta: "¿No tenéis una clínica veterinaria?",
          texto: "Ver qué automatizamos en vuestro sector",
          href: "/#sectores",
        }}
      />

      {/* Sin `nota`: iba a 9,5 px, ilegible, y robaba alto de pantalla al botón.
          El precio y las plazas ya viven en la tarjeta de la oferta. */}
      <CtaMovil texto="Agendar llamada gratis" href={marca.calendly} externo />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqVet, `${marca.dominio}/sectores/veterinarias#faq`)),
        }}
      />
    </>
  );
}
