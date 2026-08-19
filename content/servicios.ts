/* Copy de /servicios — el detalle largo de qué automatizamos, cómo
   trabajamos y qué cuesta.

   REPARTO DE CONTENIDO tras el giro de posicionamiento:
   · la lista de sectores se fue a la home (content/inicio.ts), donde
     es un selector interactivo y trabaja mucho más;
   · "quiénes somos", los valores y el bloque de datos y RGPD se
     fueron a /nosotros (content/nosotros.ts), que el brief pedía como
     página propia;
   · aquí se queda lo que de verdad es "servicios": el catálogo, el
     método, por qué el diagnóstico va primero y los precios.

   Las cifras que ya viven en content/marca.ts (precio del diagnóstico,
   precio anterior, duración) no se repiten aquí a mano: los
   componentes que las necesitan las leen directamente de `oferta`. */

export const navServicios = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#metodo", texto: "Método" },
  { href: "#caso", texto: "Por qué diagnóstico" },
  { href: "#precios", texto: "Precios" },
  { href: "#faq", texto: "Preguntas" },
];

export const heroServicios = {
  volver: { texto: "← Volver al inicio", href: "/" },
  titularA: "No vendemos automatizaciones.",
  titularB: "Primero os decimos si de verdad las necesitáis.",
  parrafo:
    "Somos Nexo4Pymes, un equipo pequeño de Mallorca. Automatizamos procesos con IA para pymes y autónomos de cualquier sector. Aquí está el detalle completo: qué hacemos exactamente, cómo trabajamos y cuánto cuesta.",
  cta: "Agendar llamada gratis de 15 min",
  indice: [
    { href: "#servicios", texto: "Qué automatizamos" },
    { href: "#metodo", texto: "Cómo trabajamos" },
    { href: "#caso", texto: "Por qué diagnóstico primero" },
    { href: "#precios", texto: "Precios" },
    { href: "#faq", texto: "Preguntas" },
  ],
};

export const servicios = {
  categoria: "Servicios",
  titular: "Qué automatizamos, en concreto",
  intro:
    "Nada de «soluciones de IA». Esta es la lista de cosas que dejan de hacerse a mano cuando trabajamos con vosotros. No se contrata todo: se elige en el roadmap qué merece la pena y en qué orden.",
  tarjetas: [
    {
      icono: "mensaje" as const,
      tono: "azul" as const,
      titulo: "Atención al cliente con IA",
      texto:
        "Un agente contesta a vuestros clientes en el canal de siempre —WhatsApp, email o el chat de la web— con vuestro tono y vuestros límites.",
      items: [
        "Responde dudas frecuentes: horarios, precios, plazos, disponibilidad, ubicación",
        "Escala a una persona cuando la cosa se complica",
        "Nunca improvisa: si no está seguro, pasa la conversación",
      ],
    },
    {
      icono: "agenda" as const,
      tono: "violeta" as const,
      titulo: "Citas, reservas y visitas",
      texto: "Agendar, mover y cancelar directamente en vuestro calendario, con los huecos reales de ese momento.",
      items: [
        "Se integra con Google Calendar — sin cambiar de programa",
        "Sin dobles reservas ni huecos fantasma",
        "Cada cita se identifica por código único, no por nombre",
      ],
    },
    {
      icono: "campana" as const,
      tono: "mint" as const,
      titulo: "Recordatorios y seguimientos",
      texto: "Lo que se pierde no suele ser el cliente: es el aviso que nadie llegó a mandar.",
      items: [
        "Aviso de cita a 24 h y 1 h antes, para bajar las ausencias",
        "Renovaciones, mantenimientos y vencimientos: aviso antes de que lleguen",
        "Seguimiento post-venta o post-visita, si tiene sentido en vuestro caso",
      ],
    },
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "Leads, CRM y fichas de cliente",
      texto: "Que deje de estar todo en la cabeza de una persona y en notas sueltas del móvil.",
      items: [
        "Cada contacto entra en su ficha, con el origen y el historial",
        "Presupuestos con seguimiento automático: ninguno se queda frío",
        "Empezamos con hoja de cálculo si es lo que os sirve — sin comprar software",
      ],
    },
    {
      icono: "documento" as const,
      tono: "violeta" as const,
      titulo: "Facturación y administración",
      texto: "El papeleo repetitivo que se come las tardes del sábado.",
      items: [
        "Generación y envío automático de facturas",
        "Recordatorios de facturas pendientes de cobro",
        "Registro de gastos sin tener que abrir Excel",
      ],
    },
    {
      icono: "grafico" as const,
      tono: "azul" as const,
      titulo: "Datos y cuadro de mando",
      texto:
        "La mayoría de pymes tienen los números repartidos en cuatro sitios y ninguno cuadra. Esto los junta en una pantalla.",
      items: [
        "Panel con lo que entra, de dónde viene y qué se convierte",
        "Informes que se envían solos, sin que nadie los prepare",
        "Alertas cuando un número se sale de lo normal",
      ],
    },
    {
      icono: "globo" as const,
      tono: "mint" as const,
      titulo: "Presencia online y contenido",
      texto:
        "Sale en el diagnóstico más veces de lo que la gente espera: a veces el cuello de botella no es atender, es que no os encuentran.",
      items: [
        "Revisión de web, ficha de Google y redes sociales",
        "Publicación automática de contenido en varias redes a la vez",
        "Captación de clientes nuevos y qué hacer con los que llegan",
      ],
    },
  ],
};

export const metodoServicios = {
  categoria: "Cómo trabajamos",
  titular: "De la primera llamada a la primera automatización funcionando",
  intro: "Cinco pasos, sin sorpresas y sin contratos de doce meses. En cualquiera de ellos podéis parar.",
  pasos: [
    {
      num: "1",
      meta: "15 minutos · gratis",
      titulo: "Llamada inicial",
      texto:
        "Nos contáis cómo funciona el negocio hoy y qué es lo que más os quema. Nosotros os decimos, con honestidad, si esto encaja con vosotros o no. Si no encaja, se acaba aquí y no habéis pagado nada.",
    },
    {
      num: "2",
      meta: "Diagnóstico",
      titulo: "Diagnóstico",
      texto:
        "Auditamos de verdad cómo trabajáis: cómo entra un cliente, cómo se agenda, cómo se cobra, cómo os encuentran online y cómo lleváis la administración. Es de pago a propósito: un diagnóstico gratis siempre acaba siendo una excusa para vender, y este no lo es.",
    },
    {
      num: "3",
      meta: "Incluido en el diagnóstico",
      titulo: "Roadmap priorizado",
      texto:
        "Un documento con el diagrama de cómo funcionáis hoy, las oportunidades ordenadas por impacto y esfuerzo, los riesgos de automatizar cada cosa y el coste estimado de cada fase. Ese documento es vuestro, sigáis o no con nosotros.",
    },
    {
      num: "4",
      meta: "Fase a fase · precio cerrado antes de empezar",
      titulo: "Implementación",
      texto:
        "Se construye lo que hayáis decidido, empezando por lo que más impacto tiene con menos esfuerzo. Cada fase se presupuesta y se aprueba antes de tocar nada. Nunca todo de golpe.",
    },
    {
      num: "5",
      meta: "Después de encender",
      titulo: "Ajuste y seguimiento",
      texto:
        "Las primeras semanas siempre aparecen casos que no habíamos previsto. Se afinan las respuestas, se corrigen los límites y se mide si de verdad está funcionando. Por eso trabajamos con pocos clientes a la vez.",
    },
  ],
};

export const casoDiagnostico = {
  categoria: "Por qué el diagnóstico va siempre primero",
  titular: "Automatizar un proceso malo no lo arregla: lo multiplica",
  parrafos: [
    "Es el error que vemos una y otra vez. Un negocio apunta las citas en tres sitios distintos — la agenda de papel, el calendario del ordenador y un grupo de WhatsApp interno — y pide que le automaticen «la agenda». Si lo hacemos tal cual, el resultado es el mismo caos de siempre, pero más rápido y con más mensajes.",
    "Por eso lo primero no es la tecnología. Es sentarnos a ver cómo entra un cliente hoy, quién toca qué, dónde se pierde y cuánto dinero se deja por el camino. Solo después decidimos qué merece la pena automatizar y en qué orden.",
  ],
  cita: "Si automatizar no os compensa, os lo diremos. Eso también es parte del trabajo.",
};

/* Aquí vivía `sectores`, con las veterinarias como especialidad
   destacada y tres grupos genéricos debajo. Se ha ido entero a la
   home (content/inicio.ts → `sectoresInicio`), convertido en el
   selector interactivo: allí las veterinarias son un sector más
   entre seis y el mensaje pasa a ser adaptabilidad, que es lo que
   pedía el rediseño. */

export const preciosServicios = {
  categoria: "Precios",
  titular: "Qué cuesta, sin rodeos",
  intro:
    "Una sola historia, la misma en toda la web: la llamada es gratis, el diagnóstico se paga y la implementación se cierra fase a fase.",
  paso1: {
    meta: "Paso 1",
    precio: "Gratis",
    texto: "Llamada de 15 minutos por videollamada. Sin tarjeta y sin compromiso. Sirve para ver si encajamos — y a veces la conclusión es que no.",
  },
  paso2: {
    meta: "Paso 2 · Oferta de lanzamiento",
  },
  paso3: {
    meta: "Paso 3 · Opcional",
    precio: "500–3.000€",
    precioNota: "por fase",
    texto: "Cada automatización del roadmap, según su complejidad. Se presupuesta y se aprueba antes de empezar. Sin cuota mensual obligatoria ni permanencia.",
  },
  callout: {
    fuerte: "Y si no seguís:",
    texto:
      "el documento del diagnóstico es vuestro igualmente, con el análisis completo y el roadmap. Podéis ejecutarlo por vuestra cuenta o llevárselo a quien queráis.",
  },
};

/* `quienesSomos` y `datosRgpd` vivían aquí, al final de /servicios,
   donde solo llegaba quien ya se había leído el catálogo entero.
   Ahora son la página /nosotros (content/nosotros.ts), que el brief
   pedía por separado, y allí están además ampliados. */

export const faqServicios = [
  {
    p: "¿Por qué el diagnóstico es de pago si otros lo hacen gratis?",
    r: "Porque un diagnóstico gratis no es un diagnóstico, es una llamada de venta con otro nombre. Cobrarlo nos obliga a dedicarle días de trabajo real y a entregaros un documento que sirva por sí solo, incluso si no seguís con nosotros. La llamada previa de 15 minutos, esa sí es gratis.",
  },
  {
    p: "No sabemos nada de tecnología. ¿Es un problema?",
    r: "Al revés: es el perfil con el que mejor trabajamos. No hay que aprender ningún programa nuevo — seguís usando lo que ya usáis. Lo montamos, lo configuramos y os enseñamos en una sesión las pocas cosas que sí cambian.",
  },
  {
    p: "¿Tenemos que cambiar de software?",
    r: "No. Nos conectamos encima de lo que ya tenéis. Si usáis Google Calendar, la cita aparece ahí, exactamente igual que si la hubiera apuntado alguien del equipo. Si usáis un software sectorial concreto, miramos en el diagnóstico si se puede conectar y os decimos si compensa.",
  },
  {
    p: "¿Esto sustituye a alguien de mi equipo?",
    r: "No es la idea ni lo vendemos así. Lo que quita es la parte repetitiva — contestar veinte veces el mismo horario, recordar citas, apuntar en tres sitios — para que esa persona pueda dedicarse a lo que sí requiere un humano.",
  },
  {
    p: "¿Hay permanencia o cuota mensual?",
    r: "No hay permanencia. Cada fase de implementación se presupuesta y se aprueba por separado. Si en algún momento queréis parar, paráis, y lo construido se queda funcionando en vuestras cuentas.",
  },
  {
    p: "Estamos fuera de Mallorca. ¿Trabajáis en remoto?",
    r: "Sí. Todo el proceso — llamada, diagnóstico, implementación y seguimiento — se hace en remoto sin problema. Estar cerca ayuda, pero no es imprescindible.",
  },
  {
    p: "¿Cuánto tarda todo?",
    r: "El diagnóstico se entrega en 3–4 días desde la reunión inicial. La implementación depende de las fases que elijáis; la primera automatización suele estar funcionando en cuestión de semanas, no de meses.",
  },
];

export const cierreServicios = {
  titular: "Contadnos qué es lo que más tiempo os quita",
  texto:
    "15 minutos por videollamada, sin compromiso. Salís de ahí sabiendo si automatizar algo de vuestro negocio tiene sentido — aunque la respuesta sea que todavía no.",
  cta: "Agendar llamada gratis de 15 min",
  escribir: "¿Preferís escribir? ",
};
