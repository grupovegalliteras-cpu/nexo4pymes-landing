/* Copy de /servicios (Servicios, método y quiénes somos), la página
   general de la empresa. Texto portado palabra por palabra desde la
   maqueta del rediseño (spec-servicios.md) — no reescrito. Las cifras
   que ya viven en content/marca.ts (precio del diagnóstico, precio
   anterior, duración) no se repiten aquí a mano: los componentes que
   las necesitan las leen directamente de `oferta`. */

export const navServicios = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#metodo", texto: "Método" },
  { href: "#sectores", texto: "A quién ayudamos" },
  { href: "#precios", texto: "Precios" },
  { href: "#nosotros", texto: "Quiénes somos" },
  { href: "#datos", texto: "Datos y RGPD" },
];

export const heroServicios = {
  volver: { texto: "← Volver a clínicas veterinarias", href: "/" },
  titularA: "No vendemos automatizaciones.",
  titularB: "Primero os decimos si de verdad las necesitáis.",
  parrafo:
    "Somos Nexo4Pymes, un equipo pequeño de Mallorca. Automatizamos procesos con IA para pymes y autónomos, con especialidad en clínicas veterinarias. Aquí está todo el detalle: qué hacemos exactamente, cómo trabajamos, cuánto cuesta y qué pasa con vuestros datos.",
  cta: "Agendar llamada gratis de 15 min",
  indice: [
    { href: "#servicios", texto: "Qué automatizamos" },
    { href: "#metodo", texto: "Cómo trabajamos" },
    { href: "#caso", texto: "Por qué diagnóstico primero" },
    { href: "#sectores", texto: "A quién ayudamos" },
    { href: "#precios", texto: "Precios" },
    { href: "#nosotros", texto: "Quiénes somos" },
    { href: "#datos", texto: "Datos y RGPD" },
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
      titulo: "Agente de WhatsApp",
      texto: "Contesta los mensajes de vuestros clientes en el número de siempre, con vuestro tono y vuestros límites.",
      items: [
        "Responde dudas frecuentes: horarios, precios, ubicación, qué traer",
        "Escala a una persona cuando la cosa se complica",
        "Nunca improvisa: si no está seguro, pasa la conversación",
      ],
    },
    {
      icono: "agenda" as const,
      tono: "violeta" as const,
      titulo: "Gestión de citas",
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
      badge: "Clave en veterinarias",
      items: [
        "Aviso de cita a 24 h y 1 h antes, para bajar las ausencias",
        "Vacunas y desparasitaciones: aviso 7 días antes, con reserva en el mismo mensaje",
        "Seguimiento post-visita o post-venta, si tiene sentido en vuestro caso",
      ],
    },
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "CRM y fichas de cliente",
      texto: "Que deje de estar todo en la cabeza de una persona y en notas sueltas del móvil.",
      items: [
        "Ficha por cliente y por paciente, con su historial de citas",
        "Empezamos con hoja de cálculo si es lo que os sirve — sin comprar software",
        "Se conecta con el agente, para que sepa con quién habla",
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
      icono: "globo" as const,
      tono: "mint" as const,
      titulo: "Presencia online y contenido",
      texto:
        "Sale en el diagnóstico más veces de lo que la gente espera: a veces el cuello de botella no es el WhatsApp, es que no os encuentran.",
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

export const sectores = {
  categoria: "A quién ayudamos",
  titular: "Nuestra especialidad son las clínicas veterinarias",
  intro:
    "Trabajamos con pymes y autónomos en general, pero hemos elegido especializarnos. Conocer a fondo un sector hace que el diagnóstico sea mucho mejor que el de alguien que va de todo un poco.",
  destacado: {
    badge: "Especialidad",
    titulo: "Clínicas veterinarias",
    texto:
      "Citas por WhatsApp, recordatorios de vacunas y desparasitaciones, ausencias que dejan el hueco vacío y una recepción que no da abasto. Aquí tenemos el sistema montado y probado, no partimos de cero.",
    enlace: { texto: "Ver la página de veterinarias →", href: "/" },
  },
  otros: [
    {
      titulo: "Negocios que viven de la agenda",
      texto:
        "Talleres, centros de fisioterapia, peluquerías, clínicas dentales, estéticas. Si vuestro negocio se organiza alrededor de citas y de contestar mensajes, el problema de fondo es prácticamente el mismo.",
    },
    {
      titulo: "Autónomos con mucho papeleo",
      texto:
        "Facturas, presupuestos, recordatorios de cobro, gastos. Trabajo administrativo que no se factura a nadie y que se acaba haciendo por la noche o el fin de semana.",
    },
    {
      titulo: "Pymes que atienden por WhatsApp",
      texto:
        "Comercios, distribuidores, servicios a domicilio. Cualquiera cuyo canal principal de clientes sea un móvil que no para de sonar durante la jornada.",
    },
  ],
};

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

export const quienesSomos = {
  categoria: "Quiénes somos",
  titular: "Un equipo pequeño, de Mallorca",
  parrafos: [
    "Nexo4Pymes nació de una idea sencilla: la mayoría de pymes no necesitan un producto de IA, necesitan que alguien mire cómo trabajan y les diga por dónde empezar. En este sector sobran demos espectaculares y falta gente que se siente a entender el negocio antes de vender nada.",
    "Somos pocos y trabajamos con un número limitado de clientes a la vez. No es falsa escasez: es la única forma de estar encima las semanas siguientes al lanzamiento, que es cuando de verdad se decide si una automatización funciona o se abandona.",
    "Hablamos en lenguaje de negocio, no en jerga técnica. Si en algún momento no entendéis algo de lo que os contamos, es culpa nuestra, no vuestra.",
  ],
  valores: [
    {
      titulo: "Diagnóstico antes que producto",
      texto: "Nunca empezamos por la herramienta. Si el proceso está roto, automatizarlo solo lo rompe más rápido.",
    },
    {
      titulo: "Decir que no cuando toca",
      texto:
        "Si el diagnóstico dice que no compensa automatizar, lo escribimos en el informe. Preferimos perder una venta que dejar a alguien con un sistema que no usa.",
    },
    {
      titulo: "Nada de cajas negras",
      texto: "Todo se monta sobre vuestras cuentas y vuestras herramientas. Si un día queréis seguir sin nosotros, no os quedáis atrapados.",
    },
    {
      titulo: "Pocos clientes a la vez",
      texto: "Preferimos hacer bien tres proyectos que empezar diez y no acabar ninguno.",
    },
  ],
};

export const datosRgpd = {
  categoria: "Datos y RGPD",
  titular: "Qué pasa con la información de vuestros clientes",
  intro: "Es la pregunta que más se repite y la que menos se contesta claro en este sector. Aquí está la respuesta.",
  tarjetas: [
    {
      icono: "escudo" as const,
      titulo: "Los datos siguen siendo vuestros",
      texto: "Todo se monta sobre vuestras propias cuentas y herramientas. Nosotros no nos llevamos una copia de vuestra base de clientes a ningún sitio.",
    },
    {
      icono: "documento" as const,
      titulo: "Contrato de encargado del tratamiento",
      texto: "Antes de empezar se firma el contrato que exige el RGPD, donde queda por escrito a qué datos accedemos y para qué.",
    },
    {
      icono: "info" as const,
      titulo: "Qué se toca y qué no",
      texto: "En el diagnóstico dejamos por escrito qué información usa el sistema y cuál no toca nunca. Los historiales clínicos no forman parte de lo que gestiona el agente.",
    },
    {
      icono: "verificado" as const,
      titulo: "Podéis cortar el acceso cuando queráis",
      texto: "Como todo está en vuestras cuentas, revocarnos el acceso es cuestión de un clic. No hay permanencia ni datos secuestrados.",
    },
  ],
};

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
