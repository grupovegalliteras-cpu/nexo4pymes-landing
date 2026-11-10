import type { Metadata } from "next";
import { alternativas, idiomaOBase } from "@/lib/i18n";
import { ogArticulo } from "@/content/articulos";
import { esquemaMigas, grafoPagina } from "@/lib/esquema";
import { fijarIdioma } from "@/lib/idioma-servidor";
import Articulo from "./es.mdx";

/* ============================================================
   EL ARTÍCULO QUE DESACTIVA UNA OBJECIÓN DE VENTA

   No nace de una medición de demanda como los otros dos: nace de un
   titular. En octubre de 2025 Meta cambió sus condiciones para
   empresas y la prensa lo contó como «Meta prohíbe los chatbots de
   IA en WhatsApp», con efecto desde enero de 2026. Quien lo leyó y
   tiene un negocio se ha quedado con que esto que vendemos está
   prohibido.

   LO QUE LO SOSTIENE, Y POR QUÉ NO ES UNA OPINIÓN. La propia lista
   de precios de Meta (leída el 10/11/2026, actualizada el 30/09)
   define la categoría «servicio» como los mensajes sin plantilla que
   pueden ir «impulsados por una solución de IA de terceros». Meta
   cobra por ello: no lo cobraría si estuviera prohibido. Ese dato no
   lo hemos visto en ningún artículo del sector en español.

   SE ACTUALIZA SI META MUEVE FICHA. Lleva la fecha de comprobación
   escrita dentro, como las páginas de obligaciones, porque es un
   artículo sobre una norma de un tercero que puede cambiar cada
   trimestre.

   Solo en español: ver el comentario de /blog/que-es-un-agente-de-ia.
   ============================================================ */

const RUTA = "/blog/meta-bots-ia-whatsapp";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = idiomaOBase((await params).lang);
  /* 46 caracteres. */
  const titulo = "¿Meta ha prohibido los bots de IA en WhatsApp?";
  const descripcion =
    "Qué prohibió Meta en enero de 2026, por qué el asistente de tu propio negocio sigue permitido y qué cambia ahora que Meta vende el suyo.";
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
                { nombre: "Meta y los bots de IA en WhatsApp", ruta: RUTA },
              ]),
            ]),
          ),
        }}
      />
    </>
  );
}
