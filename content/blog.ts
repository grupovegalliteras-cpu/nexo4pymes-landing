/* Copy del listado de blog. Vivía en content/home.ts (la portada
   general de pymes la enlazaba); ahora que esa página se retiró,
   este archivo es la única fuente de este contenido. */

export const blogHome = {
  categoria: "Blog",
  titular: "Tecnología para pymes, explicada sin tecnicismos",
  entradilla:
    "Artículos sobre qué software necesita de verdad un negocio pequeño, en qué orden conviene montarlo y qué errores salen caros.",
  publicado: {
    etiqueta: "Diagnóstico previo · 5 min",
    titulo: "Por qué automatizar sin diagnosticar antes puede hundiros el negocio",
    resumen:
      "La automatización no arregla un proceso, lo amplifica. El caso del taller que se llenó la agenda y acabó perdiendo clientes, las tres formas típicas de estropearlo y cuándo la respuesta correcta es no automatizar.",
    href: "/blog/por-que-diagnosticar-antes-de-automatizar",
  },
  proximos: [
    "Qué es un diagnóstico de procesos y qué os lleváis de él",
    "CRM a medida o software de catálogo: cómo elegir sin equivocarse",
    "Configuradores de producto: cuándo compensan y cuándo no",
  ],
};
