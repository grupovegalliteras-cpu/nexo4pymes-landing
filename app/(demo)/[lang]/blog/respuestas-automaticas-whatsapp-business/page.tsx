import type { Metadata } from "next";
import { alternativas, idiomaOBase } from "@/lib/i18n";
import { ogArticulo } from "@/content/articulos";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import Articulo from "./es.mdx";

/* ============================================================
   LA CONSULTA DE MÁS INTENCIÓN DEL NICHO

   23 consultas medidas el 10/11/2026 («configurar respuestas
   automáticas whatsapp business», «crear respuestas automáticas en
   whatsapp business»...). No es la de más volumen, pero sí la de
   mejor momento: quien la teclea está con el móvil en la mano
   intentando montar la función nativa, justo antes de descubrir que
   acusa recibo pero no contesta nada.

   POR ESO EL ARTÍCULO ENSEÑA A MONTARLA DE VERDAD, incluidos los
   textos, en vez de usar el tutorial como cebo. Quien se apaña con
   esto no era cliente; quien llega al apartado de los cuatro sitios
   por donde se rompen y se reconoce en tres, sí.

   Solo en español: ver el comentario de /blog/que-es-un-agente-de-ia.
   ============================================================ */

const RUTA = "/blog/respuestas-automaticas-whatsapp-business";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* 57 caracteres. */
  const titulo = "Respuestas automáticas en WhatsApp Business: cómo se ponen";
  const descripcion =
    "Bienvenida, ausencia y respuestas rápidas: dónde están, qué escribir dentro para no espantar clientes y por dónde se quedan cortas.";
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
                { nombre: "Respuestas automáticas en WhatsApp Business", ruta: RUTA },
              ]),
            ]),
          ),
        }}
      />
    </>
  );
}
