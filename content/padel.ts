/* ============================================================
   NEXO PÁDEL — textos de /padel

   Es la única página de la web que vende un PRODUCTO con cuota mensual,
   no un desarrollo a medida. Por eso es también la única con precios:
   la regla de «nada de precios» de la home y de /servicios no se aplica
   aquí. Los precios son los mismos que los de los emails y la
   presentación para clubes (1 de octubre de 2026).

   Solo en español: los clientes son clubes y escuelas de Mallorca.

   OJO con lo que se promete. El producto se está construyendo por fases
   con los 5 clubes del piloto (octubre 2026 – enero 2027). La sección
   «fases» dice qué funciona y cuándo; si una fase se retrasa, hay que
   cambiarla aquí.
   ============================================================ */

export const padel = {
  whatsapp: "Hola, tengo un club de pádel y he visto Nexo Pádel en vuestra web. Me gustaría verlo con los datos de mi club.",

  hero: {
    etiqueta: "Nexo Pádel · para clubes y escuelas",
    titulo: "Tu club de pádel, sin estar pegado al WhatsApp",
    texto:
      "Un WhatsApp que contesta por vosotros, una escuela que reorganiza sola faltas y recuperaciones, y partidos que se completan sin perseguir al cuarto jugador. La oficina solo ve lo que necesita a una persona.",
    /* Vídeo de fondo del hero: un dron que sobrevuela un club de pádel y entra en él.
       Es un club inventado, generado con IA: no lleva el nombre ni el logo de ningún club real.
       Archivos en public/padel/. Con null se ve el fondo animado de siempre. */
    video: null as null | { horizontal: string; vertical: string; poster: string },
    verDemo: "Ver la demo",
    pedir: "Pídela por WhatsApp",
    chat: [
      { de: "cliente", texto: "Hola! Hoy no puedo ir a la de las 7 😕", hora: "08:12" },
      {
        de: "club",
        texto: "Sin problema, Lucía. Te he quitado de la clase de hoy a las 19:00 y tienes 1 recuperación. Huecos de tu nivel: jueves 18:00 o sábado 10:00.",
        hora: "08:12",
      },
      { de: "cliente", texto: "Sábado 👍", hora: "08:13" },
      { de: "club", texto: "Hecho ✅ Sábado 10:00, pista 3 con Pau. ¡Te lo recordamos el viernes!", hora: "08:13" },
    ],
  },

  problemas: {
    titulo: "Un club de pádel no se gestiona con un Excel y 40 chats de WhatsApp",
    items: [
      ["«A este partido le falta uno»", "Recepción escribiendo a jugadores uno a uno a las ocho de la tarde.", "Se avisa a jugadores de su nivel con el enlace para apuntarse."],
      ["«¿Cuándo puedo recuperar?»", "La misma pregunta de los alumnos, veinte veces por semana.", "La IA ofrece los huecos compatibles y reserva sola."],
      ["El entrenador se pone enfermo a las 16:00", "Llamar a otros entrenadores, avisar a los alumnos y acordarse de la nómina.", "Sustituto libre y del mismo nivel, y alumnos avisados."],
      ["La tarde del día 30", "Cuotas, prorrateos, remesa, recibos devueltos y facturas, a mano.", "Revisáis las excepciones y enviáis la remesa."],
    ],
  },

  dia: {
    titulo: "Un miércoles cualquiera en el club",
    texto: "Así es un día en un club con escuela que usa Nexo Pádel.",
    items: [
      ["08:12", "Un alumno avisa de que falta", "Sale de la clase, recibe su recuperación y elige hueco sin que nadie del club intervenga."],
      ["08:13", "La plaza se rellena sola", "Se ofrece a la lista de espera y a quien tenga recuperaciones de ese nivel."],
      ["11:20", "Preguntan por clases particulares", "La IA contesta con precios y huecos reales de la ficha del club."],
      ["15:30", "Un entrenador se pone enfermo", "Se busca a otro libre a esa hora y que dé ese nivel; los alumnos quedan avisados."],
      ["16:05", "Previsión de lluvia", "Un botón: reubica en pista cubierta si hay hueco, y si no, cancela y crea las recuperaciones."],
      ["18:00", "Al partido de las 22:00 le falta uno", "Se avisa a jugadores de nivel parecido con el enlace de vuestro sistema de reservas."],
      ["Día 30", "Cierre de mes", "Cuotas con altas, bajas y descuentos, y la remesa SEPA preparada."],
    ],
  },

  partes: [
    {
      titulo: "Para el club",
      lema: "Pistas llenas sin estar pegados al teléfono",
      items: [
        "Partidos que se completan solos: se avisa a jugadores de su nivel y franja.",
        "Americanas y ligas: inscripción por WhatsApp, parejas equilibradas y cuadro automático.",
        "Recepción por WhatsApp con IA: precios, horarios y clases, contestados al momento.",
        "Trabaja junto a Playtomic: las pistas se siguen reservando y pagando allí. Si reserváis por teléfono o WhatsApp, os damos una agenda de pistas.",
      ],
    },
    {
      titulo: "Para la escuela",
      lema: "La academia funciona sola, aunque tengáis 300 alumnos",
      items: [
        "Grupos, niveles y lista de espera: las plazas libres se rellenan solas.",
        "Recuperaciones con vuestras reglas: antelación, caducidad, límite al mes y nivel.",
        "Con menores, el WhatsApp habla con el padre o la madre.",
        "Cuotas y cierre de mes con remesa SEPA.",
        "Panel «Pendiente de ti»: solo veis lo que necesita a una persona, con la respuesta preparada.",
      ],
    },
  ],

  fases: {
    titulo: "Lo estamos construyendo con 5 clubes de Mallorca",
    texto:
      "Nexo Pádel está en piloto, de mediados de octubre de 2026 a mediados de enero de 2027. Cada mes añadimos una parte, y así sabéis exactamente qué funciona hoy.",
    items: [
      ["Desde mediados de octubre", "WhatsApp que contesta, escuela (grupos, alumnos, faltas y recuperaciones) y panel «Pendiente de ti»."],
      ["Desde principios de noviembre", "Agenda de pistas, partidos que se completan, americanas, sustituciones y días de lluvia."],
      ["Desde principios de diciembre", "Cuotas y remesa SEPA."],
      ["Después del piloto", "Facturas VeriFactu y apps para entrenadores y jugadores."],
    ],
    piloto:
      "Quedan plazas en el piloto: 3 meses gratis a cambio de vuestra opinión sincera. Nosotros cargamos los datos y lo ponemos en marcha. Al terminar no se cobra nada automáticamente; si seguís, el primer año tiene un 30 % de descuento.",
    cta: "Quiero entrar en el piloto",
  },

  precios: {
    titulo: "Un precio claro para vuestro club o escuela",
    texto: "Sin permanencia. Alta y carga de datos desde vuestro Excel incluidas.",
    planes: [
      {
        nombre: "Escuela",
        para: "Escuelas de hasta 150 alumnos",
        precio: "89 €",
        items: ["Grupos, niveles y calendario", "Recuperaciones y lista de espera", "Cuotas y remesa SEPA", "Hasta 1.000 mensajes de WhatsApp al mes"],
        destacado: false,
      },
      {
        nombre: "Club",
        para: "Club con o sin escuela, hasta 300 alumnos",
        precio: "179 €",
        items: [
          "Todo lo de Escuela",
          "Asistente de WhatsApp con IA",
          "Partidos que se completan solos",
          "Americanas y ligas",
          "Sustituciones y cierre de mes",
          "Agenda de pistas si no tenéis sistema de reservas",
          "Hasta 2.500 mensajes de WhatsApp al mes",
        ],
        destacado: true,
      },
      {
        nombre: "Multisede",
        para: "Grupos de clubes o más de 300 alumnos",
        precio: "A medida",
        items: ["Todo lo de Club", "Varias sedes y empresas", "Integraciones a medida"],
        destacado: false,
      },
    ],
    nota:
      "Precios al mes, sin IVA. El asistente de IA se puede añadir al plan Escuela por 29 € al mes. Los mensajes de WhatsApp que pasen del límite del plan se cobran a precio de coste, unos 2 céntimos cada uno.",
  },

  faq: [
    [
      "¿Tenemos que cambiar de sistema de reservas?",
      "No. Si usáis Playtomic, los jugadores siguen reservando y pagando las pistas allí, y Nexo Pádel les manda el enlace por WhatsApp. Para ver los partidos incompletos hace falta el plan Champion o Master de Playtomic. Si reserváis por teléfono o WhatsApp, os damos una agenda de pistas sencilla.",
    ],
    [
      "¿Podemos seguir usando nuestro WhatsApp de siempre?",
      "Sí. Conectamos el WhatsApp Business del club y podéis seguir contestando desde el móvil cuando queráis. La primera semana, el asistente prepara cada respuesta y vosotros la aprobáis antes de enviarla.",
    ],
    [
      "¿Y si la IA se equivoca?",
      "Contesta con la ficha y las normas del club. Lo que no sabe, o es delicado (una queja, un cobro, un tema de un menor), os lo pasa con la respuesta preparada, y lo decidís vosotros.",
    ],
    ["¿Sirve si el club no tiene escuela?", "Sí. Podéis usar solo la parte de club: el WhatsApp, los partidos que se completan solos y las americanas."],
    ["¿Cuánto se tarda en empezar?", "Nos pasáis el Excel de alumnos y grupos y lo cargamos nosotros. En pocos días la escuela está funcionando."],
    [
      "¿Dónde están los datos?",
      "Los datos del club se guardan en servidores de la Unión Europea, con copias de seguridad diarias, y la IA trabaja en regiones de la UE. Antes de cargar nada firmamos un contrato de protección de datos. Los datos son vuestros: si lo dejáis, os los devolvemos y los borramos.",
    ],
  ],

  cierre: {
    titulo: "Menos WhatsApp. Más pádel.",
    texto: "Os enseñamos Nexo Pádel con los datos de vuestro club en 20 minutos.",
  },
};
