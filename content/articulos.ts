import type { Metadata } from "next";
import { marca } from "@/content/marca";
import { urlAbsoluta } from "@/lib/esquema";
import { OG_LOCALE, type Idioma } from "@/lib/i18n";

/* ============================================================
   LAS FECHAS DE LOS ARTÍCULOS, EN UN SOLO SITIO

   EL PROBLEMA QUE RESUELVE. Los artículos no tenían fecha en ningún
   lado: ni visible en la página, ni en los datos estructurados, ni
   como dato propio en el sitemap, donde estaba escrita a mano y se
   quedaba vieja. Sin una fecha declarada, Google se la inventa a
   partir de cuándo rastreó la página, así que cada vez que se tocaba
   la web los artículos parecían recién publicados. Para un buscador
   eso es ruido; para un lector, que un artículo de septiembre diga
   "hoy" es motivo para no fiarse.

   LA DISTINCIÓN QUE IMPORTA. `publicado` no cambia nunca: es cuándo
   salió. `actualizado` es cuándo se revisó el contenido DE VERDAD —no
   cuándo se desplegó la web, no cuándo cambió una clase de CSS—. Si no
   hay revisión real, se deja sin poner y el artículo solo tiene fecha
   de publicación, que es lo correcto.

   Un artículo que se revisa y lo dice gana posiciones en consultas
   donde la frescura cuenta. Uno que miente sobre su frescura las
   pierde cuando Google lo descubre, y lo descubre.

   DE DÓNDE SALEN ESTAS FECHAS. Del historial de git, siguiendo los
   renombrados. Ojo con esto: preguntar cuándo se creó el es.mdx actual
   da una fecha falsa para los artículos anteriores a la reforma de
   idiomas del 28/09/2026, porque esos archivos se crearon de cero ese
   día. El primer post salió el 05/08/2026 como un .html suelto
   (commit dc1585e, «Primer post del blog») y preguntando por el
   es.mdx parecía de septiembre. Hay que usar --follow.

   AL PUBLICAR UNO NUEVO: se añade aquí. El sitemap, el listado y los
   datos estructurados lo leen de este archivo, así que no hay que
   acordarse de tocar tres sitios.
   ============================================================ */

export type Articulo = {
  /** La ruta, sin idioma. Es la clave que lo une todo. */
  ruta: string;
  /** "YYYY-MM-DD". Cuándo salió. No se toca nunca más. */
  publicado: string;
  /** "YYYY-MM-DD". Solo si el CONTENIDO se revisó de verdad. */
  actualizado?: string;
};

export const ARTICULOS: Articulo[] = [
  /* 10/11/2026 — LOS TRES DE WHATSAPP. Salen de medir el
     autocompletado de Google el mismo día: de 674 consultas del
     nicho, 415 llevan la palabra «whatsapp». La demanda no está en
     la inteligencia artificial, está en que te contesten el móvil.

     - «gratis» es el que más volumen tiene de todo el nicho (53
       consultas del grupo de precio, y casi todas piden no pagar).
     - «respuestas automáticas» es el de más intención: quien lo
       busca está configurando la función nativa en ese momento.
     - El de Meta no sale de una medición, sale de un titular: hay
       que desmontar el «han prohibido los bots de IA». */
  { ruta: "/blog/chatbot-whatsapp-gratis", publicado: "2026-11-10" },
  { ruta: "/blog/respuestas-automaticas-whatsapp-business", publicado: "2026-11-10" },
  { ruta: "/blog/meta-bots-ia-whatsapp", publicado: "2026-11-10" },
  /* Noviembre de 2026: los dos primeros son el blog nuevo, el que
     responde a quien ha visto un anuncio y viene a Google a comprobar
     qué es esto antes de escribirnos. Es SEO de reputación, no de
     captación: nadie busca "agente de IA" y nos encuentra, pero el que
     nos ha visto sí busca "qué es un agente de IA". */
  { ruta: "/blog/que-es-un-agente-de-ia", publicado: "2026-11-06" },
  { ruta: "/blog/cuanto-cuesta-un-agente-de-ia", publicado: "2026-11-06" },
  /* 04/11/2026: se le añadió la comprobación fechada del BOE (el 34.9
     intacto, ningún 34 bis) y las cuantías reales de la sanción. Es la
     página que va a por "registro de jornada digital obligatorio cuando
     entra en vigor", la consulta más fuerte de todo el nicho, y lo que
     la distingue es precisamente que la fecha de comprobación está
     escrita. Ver content/jornada-estado.ts. */
  { ruta: "/blog/control-horario-obligatorio-mallorca", publicado: "2026-10-14", actualizado: "2026-11-04" },
  { ruta: "/blog/verifactu-empresas-servicios-mallorca", publicado: "2026-10-14" },
  { ruta: "/blog/centralizar-avisos-llamadas-whatsapp-mallorca", publicado: "2026-10-09" },
  { ruta: "/blog/automatizar-presupuestos-pymes-mallorca", publicado: "2026-10-09" },
  /* El primero de todos. Lo que pasó el 28/09 fue la reforma de
     idiomas y lo del 09/10 un cambio de forma: ninguno de los dos
     tocó el contenido, así que no llevan `actualizado`. */
  { ruta: "/blog/por-que-diagnosticar-antes-de-automatizar", publicado: "2026-08-05" },
];

export function articuloDe(ruta: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.ruta === ruta);
}

/** La fecha que el sitemap debe dar como lastmod: la revisión si la hay. */
export function fechaSitemap(a: Articulo): string {
  return a.actualizado ?? a.publicado;
}

/** "9 de octubre de 2026" en el idioma que toque. */
export function fechaLegible(iso: string, lang: "es" | "en" | "de"): string {
  const locale = lang === "es" ? "es-ES" : lang === "de" ? "de-DE" : "en-GB";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    /* Mediodía UTC: con la medianoche, en husos al oeste la fecha
       retrocede un día y el artículo aparece publicado la víspera. */
    new Date(`${iso}T12:00:00Z`),
  );
}

/* Estos dos existen para los .mdx. MDX parsea las expresiones como
   JavaScript puro, sin TypeScript: dentro de un .mdx no se puede
   escribir articuloDe(x)!.publicado porque el '!' revienta el parser.
   Asi que la busqueda y el fallo se resuelven aqui, en un .ts de
   verdad, y el .mdx solo llama a una funcion. */
export function fechaPublicacion(ruta: string): string {
  const a = articuloDe(ruta);
  /* Revienta al construir, no en producción con una fecha vacía: un
     artículo sin ficha aquí es un artículo que se publicó sin pasar
     por este archivo, y eso hay que verlo enseguida. */
  if (!a) throw new Error(`articulos.ts: falta la ficha de ${ruta}`);
  return a.publicado;
}

export function fechaRevision(ruta: string): string | undefined {
  return articuloDe(ruta)?.actualizado;
}

/* ============================================================
   LA MISMA FECHA, PERO PARA QUIEN NO LEE EL JSON-LD

   El artículo ya declaraba sus fechas en los datos estructurados
   (BlogPosting) y en el sitemap. Lo que faltaba es la etiqueta que
   leen WhatsApp, LinkedIn, Facebook, Google Discover y los
   buscadores de respuestas: `article:published_time`. Sin ella, y
   con el og:type heredado en "website", un artículo no es un
   artículo para nadie de fuera, y cada uno de ellos se inventa la
   fecha a partir de cuándo lo descargó. De ahí que un artículo de
   octubre se compartiera como recién publicado.

   OJO CON LO QUE ESTO SUSTITUYE. Next no fusiona `openGraph` campo a
   campo: lo que una página define reemplaza entero el bloque del
   layout. Por eso aquí van también `siteName`, `locale` y la imagen:
   si se quitan, el artículo se comparte sin vista previa.
   ============================================================ */
export function ogArticulo(
  lang: Idioma,
  ruta: string,
  { titulo, descripcion }: { titulo: string; descripcion: string },
): NonNullable<Metadata["openGraph"]> {
  const a = articuloDe(ruta);
  if (!a) throw new Error(`articulos.ts: falta la ficha de ${ruta}`);
  /* Mediodía UTC, el mismo instante del que sale la fecha que se ve
     escrita arriba del artículo (ver fechaLegible). Con la medianoche
     las dos podrían no coincidir según el huso del lector. */
  const instante = (iso: string) => `${iso}T12:00:00.000Z`;
  return {
    type: "article",
    locale: OG_LOCALE[lang],
    siteName: marca.nombre,
    title: titulo,
    description: descripcion,
    url: urlAbsoluta(lang, ruta),
    publishedTime: instante(a.publicado),
    modifiedTime: instante(a.actualizado ?? a.publicado),
    authors: ["Alejandro Vega", "Jaume Lliteras"],
    images: [{ url: "/assets/og-nexo4pymes.jpg", width: 1200, height: 630, alt: marca.nombre }],
  };
}
