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
import { navNosotros } from "@/content/nosotros";
import { marca } from "@/content/marca";

/* /nosotros — el brief la pedía como página propia y tenía razón:
   "quiénes somos" y "datos y RGPD" eran dos secciones enterradas al
   final de /servicios, donde solo llegaba quien ya se había leído el
   catálogo entero. Son justo el material que consulta alguien que
   está decidiendo si fiarse. */

const titulo = "Quiénes somos — un equipo pequeño de Mallorca";
const descripcion =
  "Quiénes están detrás de Nexo4Pymes, cómo trabajamos con pymes, por qué el diagnóstico va siempre primero y qué pasa con los datos de vuestros clientes.";

export const metadata: Metadata = {
  title: { absolute: `${titulo} | Nexo4Pymes` },
  description: descripcion,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    type: "website",
    siteName: marca.nombre,
    locale: "es_ES",
    title: titulo,
    description: descripcion,
    url: "/nosotros",
    images: [
      {
        url: "/assets/og-automatizacion-pymes.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes — quiénes somos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descripcion,
    images: ["/assets/og-automatizacion-pymes.jpg"],
  },
};

export default function PaginaNosotros() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navNosotros}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
        enlacePill={{ href: "/contacto", texto: "Contacto ↗", textoMovil: "Contacto y presupuesto ↗" }}
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
          { href: "#historia", texto: "Quiénes somos" },
          { href: "#valores", texto: "Cómo trabajamos" },
          { href: "#datos", texto: "Datos y RGPD" },
          { href: "/servicios", texto: "Servicios" },
          { href: "/contacto", texto: "Contacto" },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: "¿Queréis ver qué automatizamos?",
          texto: "Servicios, método y precios",
          href: "/servicios",
        }}
      />

      <CtaMovil texto="Agendar llamada gratis" href={marca.calendly} externo />
    </>
  );
}
