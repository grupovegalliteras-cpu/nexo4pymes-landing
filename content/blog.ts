/* Copy del listado de blog. Vivía en content/home.ts (la portada
   general de pymes la enlazaba); ahora que esa página se retiró,
   este archivo es la única fuente de este contenido. */

export const blogHome = {
  categoria: "Blog",
  titular: "Tecnología para pymes, explicada sin tecnicismos",
  entradilla:
    "Artículos sobre qué software necesita de verdad un negocio pequeño, en qué orden conviene montarlo y qué errores salen caros.",
  /* ORDEN: el más reciente arriba. Al publicar uno nuevo se añade aquí,
     en app/sitemap.ts y en app/llms.txt/route.ts, y se quita de `proximos`
     si estaba anunciado. */
  /* El párrafo de debajo de la entradilla. Dice desde dónde se escribe
     esto, que es lo único que lo separa de los mil artículos que hay
     sobre lo mismo. */
  desde:
    "Lo escribimos desde Palma, trabajando con empresas de servicios de Mallorca: mantenimiento, limpieza, piscinas, climatización, jardinería, control de plagas, solar y reformas. Los ejemplos salen de casos reales, los precios que aparecen son los que manejamos, y cuando la respuesta honesta es «no hace falta software», también lo decimos.",
  publicados: [
    {
      etiqueta: "Avisos y comunicación · 6 min",
      titulo: "Cómo organizar llamadas, WhatsApp y avisos de clientes en una empresa de Mallorca",
      resumen:
        "Los cuatro pasos para que ningún aviso dependa de que alguien se acuerde: registrarlo, priorizarlo, asignarlo y conectarlo con el trabajo que viene después.",
      href: "/blog/centralizar-avisos-llamadas-whatsapp-mallorca",
    },
    {
      etiqueta: "Presupuestos · 6 min",
      titulo: "Cómo dejar de hacer presupuestos a mano en una pyme de Mallorca",
      resumen:
        "Plantilla, integración con la gestión o configurador web: las tres formas de automatizarlo, cuál encaja según vuestras reglas de precio y cuándo no compensa.",
      href: "/blog/automatizar-presupuestos-pymes-mallorca",
    },
    {
      etiqueta: "Diagnóstico previo · 5 min",
      titulo: "Por qué automatizar sin diagnosticar antes puede hundiros el negocio",
      resumen:
        "La automatización no arregla un proceso, lo amplifica. El caso del taller que se llenó la agenda y acabó perdiendo clientes, las tres formas típicas de estropearlo y cuándo la respuesta correcta es no automatizar.",
      href: "/blog/por-que-diagnosticar-antes-de-automatizar",
    },
  ],
  proximos: [
    "Qué es un diagnóstico de procesos y qué os lleváis de él",
    "CRM a medida o software de catálogo: cómo elegir sin equivocarse",
    "VeriFactu: qué tiene que hacer una empresa de servicios de Baleares",
  ],
};
