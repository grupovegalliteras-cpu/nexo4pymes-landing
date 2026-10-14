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
