import type { Metadata } from "next";
import { Cabecera } from "@/components/layout/Cabecera";
import { PieDePagina } from "@/components/layout/PieDePagina";
import { CtaMovil } from "@/components/layout/CtaMovil";
import { FondoAmbiente } from "@/components/ui/FondoAmbiente";
import { Marquesina } from "@/components/ui/Marquesina";
import { FaqSeccion } from "@/components/ui/FaqSeccion";
import { HeroInicio } from "@/components/inicio/HeroInicio";
import { AntesDespues } from "@/components/inicio/AntesDespues";
import { ServiciosInicio } from "@/components/inicio/ServiciosInicio";
import { TrabajoReal } from "@/components/inicio/TrabajoReal";
import { CentralAvisos } from "@/components/inicio/CentralAvisos";
import { SelectorSectores } from "@/components/inicio/SelectorSectores";
import { ProcesoInicio } from "@/components/inicio/ProcesoInicio";
import { PruebaInicio } from "@/components/inicio/PruebaInicio";
import { CierreInicio } from "@/components/inicio/CierreInicio";
import { faqInicio, garantiasInicio, navInicio } from "@/content/inicio";
import { marca } from "@/content/marca";
import { esquemaFaq } from "@/lib/esquema";
import { waLink } from "@/lib/whatsapp";

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
     1. hero        — qué hacemos y para quién, en una pantalla
     2. antes/desp. — el problema, en su lenguaje, no en el nuestro
     3. servicios   — las cuatro piezas que se construyen
     4. funcionando — capturas de sistemas reales: la prueba
     5. CentralAvisos — lo único que se puede contratar esta semana
     6. sectores    — "esto va conmigo": el momento de conversión
     7. proceso     — cómo se empieza, para bajar el riesgo percibido
     8. compromisos — quién responde si sale mal
     9. FAQ         — objeciones de quien ya está interesado
    10. cierre      — la acción

   Los pasos 4 y 5 son nuevos y su orden no es casual: primero se
   explica (3), después se demuestra (4) y solo con esa confianza ya
   puesta se ofrece lo barato de contratar (5). Al revés, el producto
   de 89 €/mes aparecería antes de haber dado un motivo para creerlo.

   Se hereda del rediseño anterior: lo que demuestra va antes que
   lo que explica, y el material que solo interesa a quien ya está
   dentro (FAQ, letra pequeña) va al final.
   ============================================================ */

/* TÍTULO Y DESCRIPCIÓN — con intención local.
   El anterior era "Desarrollo de software a medida para pymes": ni
   Mallorca ni Baleares por ninguna parte. Competir por "software a
   medida" a secas es pelear contra toda España; "software a medida en
   Mallorca" lo busca justo quien nos puede contratar, y ahí la
   competencia es una décima parte.

   El título entero, con la marca, se queda en 60 caracteres para que
   Google no lo corte. La descripción, en 155 por lo mismo. La
   descripción no posiciona por sí sola, pero decide si hacen clic:
   por eso acaba en lo que se puede hacer ahora mismo, escribir. */
const titulo = "Software a medida para pymes en Mallorca";
const descripcion =
  "CRM, fichaje y automatizaciones a medida para pymes y autónomos de Baleares. Sin permanencia. Escribidnos por WhatsApp y os decimos si encajamos.";

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
        url: "/assets/og-nexo4pymes.jpg",
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
    images: ["/assets/og-nexo4pymes.jpg"],
  },
};

export default function PaginaInicio() {
  return (
    <>
      <FondoAmbiente />

      <Cabecera
        enlaces={navInicio}
        cta={{ texto: "WhatsApp", href: waLink("GENERAL"), externo: true }}
        enlacePill={{ href: "/contacto", texto: "Contacto ↗", textoMovil: "Contacto y presupuesto ↗" }}
      />

      <main id="contenido" className="relative z-10">
        <HeroInicio />
        <Marquesina items={garantiasInicio} />
        <AntesDespues />
        <ServiciosInicio />
        <TrabajoReal />
        <CentralAvisos />
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

      <CtaMovil texto="Escribidnos por WhatsApp" href={waLink("GENERAL")} externo />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(esquemaFaq(faqInicio, `${marca.dominio}/#faq`)),
        }}
      />
    </>
  );
}
