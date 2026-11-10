import type { Metadata } from "next";
import { alternativas, idiomaOBase } from "@/lib/i18n";
import { ogArticulo } from "@/content/articulos";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import Articulo from "./es.mdx";

/* ============================================================
   EL ARTÍCULO DE MÁS VOLUMEN DEL NICHO

   Medido el 10/11/2026 con el autocompletado de Google (es/ES):
   «chatbot whatsapp» da 241 sugerencias y el grupo de precio lo
   domina «gratis», no «precio» — 53 consultas del tipo «chatbot
   whatsapp gratis», «agente de ia gratis», «asistente virtual
   whatsapp gratis».

   POR QUÉ VAMOS A POR UNA CONSULTA QUE PIDE NO PAGAR. Porque la
   respuesta honesta vende sola: lo gratis existe, tiene tres
   escalones y se rompe por la hora, no por el volumen. Quien lee
   esto y sigue en el escalón 0 no era cliente; quien se reconoce en
   el último apartado llega a la portada sabiendo por qué.

   Y porque el dato que lo sostiene no lo tiene publicado casi nadie
   bien: Meta no cobra los mensajes que entran y regala 1.000
   mensajes de servicio al mes por número. Está en su documentación
   de precios y lo contradicen la mitad de los blogs del sector.

   Solo en español, como los demás artículos nuevos: ver el comentario
   de /blog/que-es-un-agente-de-ia.
   ============================================================ */

const RUTA = "/blog/chatbot-whatsapp-gratis";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* 54 caracteres: cabe entero en Google. */
  const titulo = "Chatbot de WhatsApp gratis: hasta dónde llega sin pagar";
  const descripcion =
    "Los tres escalones de lo gratuito en WhatsApp, por qué la mensajería casi no cuesta y qué se paga de verdad. Con los precios oficiales de Meta.";
  return {
    title: { absolute: titulo },
    description: descripcion,
    alternates: alternativas(lang, RUTA),
    openGraph: ogArticulo(lang, RUTA, { titulo, descripcion }),
  };
}

export default async function Pagina({ params }: { params: Promise<{ lang: string }> }) {
  const lang = idiomaOBase((await params).lang);
  fijarIdioma(lang);
  return (
    <>
      <Articulo />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            grafoPagina([
              esquemaMigas(lang, [
                { nombre: "Blog", ruta: "/blog" },
                { nombre: "Chatbot de WhatsApp gratis", ruta: RUTA },
              ]),
            ]),
          ),
        }}
      />
    </>
  );
}
