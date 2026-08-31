import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { Marquesina } from "@/components/vet/Marquesina";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { HeroInicio } from "@/components/inicio/HeroInicio";
import { AntesDespues } from "@/components/inicio/AntesDespues";
import { ServiciosInicio } from "@/components/inicio/ServiciosInicio";
import { SelectorSectores } from "@/components/inicio/SelectorSectores";
import { ProcesoInicio } from "@/components/inicio/ProcesoInicio";
import { PruebaInicio } from "@/components/inicio/PruebaInicio";
import { CierreInicio } from "@/components/inicio/CierreInicio";
import { faqInicio, garantiasInicio, navInicio } from "@/content/inicio";
import { marca } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";

/* ============================================================
   HOME — página general de pymes.

   Dos giros de posicionamiento acumulados en esta página:
     1º dejó de ser landing veterinaria y pasó a hablar a cualquier
        pyme, con los sectores como prueba de adaptabilidad;
     2º dejó de vender "automatización con IA" y pasa a vender
        SOFTWARE A MEDIDA — CRM propio, configuradores web e
        integraciones. La IA sigue dentro, como tecnología de
        apoyo, no como el producto.

   El razonamiento largo del segundo giro está en la cabecera de
   content/inicio.ts, incluida la promesa antigua que ya no se
   puede usar ("no cambiáis de programa").

   ORDEN DE LECTURA, y por qué:
     1. hero       — qué hacemos y para quién, en una pantalla
     2. antes/desp.— el problema, en su lenguaje, no en el nuestro
     3. servicios  — las tres piezas que se construyen
     4. sectores   — "esto va conmigo": el momento de conversión
     5. proceso    — cómo se empieza, para bajar el riesgo percibido
     6. compromisos— quién responde si sale mal
     7. FAQ        — objeciones de quien ya está interesado
     8. cierre     — la acción

   Se hereda del rediseño anterior: lo que demuestra va antes que
   lo que explica, y el material que solo interesa a quien ya está
   dentro (FAQ, letra pequeña) va al final.
   ============================================================ */

const titulo = "Desarrollo de software a medida para pymes";
const descripcion =
  "CRM propio, configuradores de producto para la web e integraciones automatizadas, hechos a la medida de vuestra pyme. Sin licencias mensuales y sin permanencia.";

export const metadata: Metadata = {
  title: { absolute: `${titulo} | Nexo4Pymes` },
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
        url: "/assets/og-automatizacion-pymes.jpg",
        width: 1200,
        height: 630,
        alt: "Nexo4Pymes — software a medida para pymes",
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

export default function PaginaInicio() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navInicio}
        cta={{ texto: "Llamada gratis", href: marca.calendly, externo: true }}
        enlacePill={{ href: "/contacto", texto: "Contacto ↗", textoMovil: "Contacto y presupuesto ↗" }}
      />

      <main id="contenido" className="relative z-10">
        <HeroInicio />
        <Marquesina items={garantiasInicio} />
        <AntesDespues />
        <ServiciosInicio />
        <SelectorSectores />
        <ProcesoInicio />
        <PruebaInicio />
        <FaqSeccion id="faq" categoria="Preguntas frecuentes" titular="Lo que nos preguntan siempre" preguntas={faqInicio} />
        <CierreInicio />
      </main>

      <PieDePagina
        redes
        enlaces={[
          { href: "#cambio", texto: "Qué cambia" },
          { href: "#servicios", texto: "Qué construimos" },
          { href: "#sectores", texto: "Sectores" },
          { href: "/nosotros", texto: "Quiénes somos" },
          { href: "/contacto", texto: "Contacto" },
          { href: "/blog", texto: "Blog" },
        ]}
        cruce={{
          pregunta: "¿Queréis el detalle de cada servicio?",
          texto: "Servicios, alcance y límites",
          href: "/servicios",
        }}
      />

      <CtaMovil texto="Agendar llamada gratis" href={marca.calendly} externo />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqInicio, `${marca.dominio}/#faq`)),
        }}
      />
    </>
  );
}
