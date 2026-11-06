import type { MetadataRoute } from "next";
import { marca } from "@/content/marca";
import { ARTICULOS, fechaSitemap } from "@/content/articulos";
import { COMPROBADO as OBLIGACIONES_COMPROBADO } from "@/content/obligaciones";
import { COMPROBADO as VERIFACTU_COMPROBADO } from "@/content/verifactu-estado";

/* ============================================================
   SITEMAP

   NOVIEMBRE DE 2026: SOLO ESPAÑOL, Y ES UNA DECISIÓN, NO UN OLVIDO.
   El sitio sigue sirviendo /en y /de, pero no se mandan a indexar.
   Dos razones, las dos medidas:

     · En 90 días de Search Console, las versiones inglesa y alemana
       sumaron 1 clic entre las dos, y era la portada inglesa.
     · El contenido nuevo (portada, /ayudas, /servicios) está escrito
       en español. Publicar en Google una versión inglesa a medio
       traducir es peor que no tenerla.

   Como solo se indexa un idioma, tampoco hay hreflang que declarar:
   el hreflang existe para decirle a Google cuál de las versiones
   enseñar, y aquí solo hay una candidata. El noindex de /en y /de
   se pone en app/(demo)/[lang]/layout.tsx.

   SI ALGÚN DÍA SE RECUPERAN LOS IDIOMAS: hay que volver a recorrer
   IDIOMAS aquí, devolver los `alternates.languages` y quitar el
   noindex del layout. Las tres cosas, o no sirve de nada.

   CADA PÁGINA CON SU FECHA, NO CON LA DEL DESPLIEGUE. Un lastmod que
   cambia cada vez que se sube cualquier cosa deja de creérselo nadie,
   y entonces tampoco sirve para la página que sí cambió.
   ============================================================ */

const HOY = "2026-11-06";

const PAGINAS: { ruta: string; prioridad: number; frecuencia: "monthly" | "yearly"; fecha: string }[] = [
  /* La portada ya no es un catálogo: es la página de producto, y es
     la que tiene que ganar la búsqueda de marca después del anuncio. */
  { ruta: "/", prioridad: 1, frecuencia: "monthly", fecha: HOY },

  /* LA CAMPAÑA. Prioridad 1 hasta el 5 de enero de 2027: es la única
     página del sitio con fecha de caducidad y la que sostiene la
     publicidad de diciembre. Cuando cierre el plazo, baja a 0.6. */
  { ruta: "/ayudas", prioridad: 1, frecuencia: "monthly", fecha: HOY },

  /* La página de «qué es un agente de IA». No va a captar en frío:
     va a convencer a quien ya vio el vídeo y viene a comprobar. */
  { ruta: "/servicios", prioridad: 0.9, frecuencia: "monthly", fecha: HOY },

  /* Las dos de obligaciones se quedan. Son las únicas informativas
     con demanda medida (verifactu, fichaje) y su lastmod es la fecha
     en que se comprobaron las fuentes, no la del despliegue: en una
     página de plazos legales, eso es justo lo que Google necesita. */
  { ruta: "/verifactu", prioridad: 0.8, frecuencia: "monthly", fecha: VERIFACTU_COMPROBADO },
  { ruta: "/obligaciones", prioridad: 0.8, frecuencia: "monthly", fecha: OBLIGACIONES_COMPROBADO },

  /* La plantilla gratis: el único imán de correos que tenemos. */
  { ruta: "/plantillas/registro-de-jornada", prioridad: 0.7, frecuencia: "yearly", fecha: OBLIGACIONES_COMPROBADO },

  { ruta: "/blog", prioridad: 0.7, frecuencia: "monthly", fecha: HOY },
  ...ARTICULOS.map((a) => ({ ruta: a.ruta, prioridad: 0.6, frecuencia: "yearly" as const, fecha: fechaSitemap(a) })),

  { ruta: "/contacto", prioridad: 0.6, frecuencia: "yearly", fecha: "2026-10-02" },
  { ruta: "/nosotros", prioridad: 0.6, frecuencia: "yearly", fecha: HOY },

  /* /legal se indexa a propósito: es la página que acredita quién
     está detrás, y eso pesa cuando alguien llega desde un anuncio. */
  { ruta: "/legal", prioridad: 0.3, frecuencia: "yearly", fecha: "2026-09-19" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGINAS.map((p) => ({
      url: `${marca.dominio}${p.ruta}`,
      lastModified: new Date(p.fecha),
      changeFrequency: p.frecuencia,
      priority: p.prioridad,
    })),
    /* Concesia es de otro cliente y vive en public/concesia por una
       reescritura, no como ruta de Next. Se queda tal cual. */
    { url: `${marca.dominio}/concesia`, lastModified: new Date("2026-11-01"), changeFrequency: "monthly" as const, priority: 0.8 },
  ];
}
