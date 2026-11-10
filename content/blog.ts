/* Copy del listado de blog. Vivía en content/home.ts (la portada
   general de pymes la enlazaba); ahora que esa página se retiró,
   este archivo es la única fuente de este contenido. */

export const blogHome = {
  categoria: "Blog",
  titular: "Inteligencia artificial para pymes, explicada sin tecnicismos",
  /* Es también la meta descripción del listado (ver blog/page.tsx),
     así que se queda por debajo de 160 caracteres: a partir de ahí
     Google la corta a media frase. */
  entradilla:
    "Qué hace de verdad un agente de IA en una pyme, qué cuesta, qué obliga la ley y qué no hace falta comprar.",
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
      etiqueta: "WhatsApp · 8 min",
      titulo: "Chatbot de WhatsApp gratis: hasta dónde llega sin pagar",
      resumen:
        "Los tres escalones de lo gratuito, por qué la mensajería casi no cuesta —Meta regala 1.000 mensajes de servicio al mes— y qué se paga de verdad.",
      href: "/blog/chatbot-whatsapp-gratis",
    },
    {
      etiqueta: "WhatsApp · 7 min",
      titulo: "Respuestas automáticas en WhatsApp Business: cómo se ponen",
      resumen:
        "Bienvenida, ausencia y respuestas rápidas: dónde están, qué escribir dentro para no espantar clientes y los cuatro sitios por donde se rompen.",
      href: "/blog/respuestas-automaticas-whatsapp-business",
    },
    {
      etiqueta: "WhatsApp · 6 min",
      titulo: "¿Meta ha prohibido los bots de IA en WhatsApp?",
      resumen:
        "Lo prohibido son los asistentes de propósito general, no el de tu negocio. Y la prueba está en la propia lista de precios de Meta.",
      href: "/blog/meta-bots-ia-whatsapp",
    },
    {
      etiqueta: "Agentes de IA · 7 min",
      titulo: "Qué es un agente de IA (y en qué se diferencia de un chatbot)",
      resumen:
        "Un chatbot sigue un guion; un agente entiende y actúa. Qué hace de verdad en una pyme, qué no hace aunque te lo cuenten, cuánto tarda en funcionar y las cinco preguntas que separan a los proveedores.",
      href: "/blog/que-es-un-agente-de-ia",
    },
    {
      etiqueta: "Precios · 8 min",
      titulo: "Cuánto cuesta un agente de IA para una pyme en España",
      resumen:
        "Entre 39 € al mes y 3.500 € de golpe. Los tres modelos de precio que vas a encontrar, lo que no te cuentan del consumo de WhatsApp, y la cuenta de dos líneas para saber si te compensa.",
      href: "/blog/cuanto-cuesta-un-agente-de-ia",
    },
    {
      etiqueta: "Control horario · 6 min",
      titulo: "Control horario: qué obliga de verdad y qué os están vendiendo",
      resumen:
        "Registrar la jornada es obligatorio desde 2019; hacerlo digitalmente no lo es. Qué dice el artículo 34.9, por qué el papel se rompe en el trabajo de campo y qué cambia con el fichaje en el móvil.",
      href: "/blog/control-horario-obligatorio-mallorca",
    },
    {
      etiqueta: "Facturación · 7 min",
      titulo: "VeriFactu: qué tiene que hacer una empresa de servicios de Mallorca",
      resumen:
        "Qué obliga hoy y qué es solo un anuncio sin publicar, qué cambia exactamente en vuestras facturas, las dos modalidades y los cuatro pasos que conviene dar ahora.",
      href: "/blog/verifactu-empresas-servicios-mallorca",
    },
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
  ],
};
