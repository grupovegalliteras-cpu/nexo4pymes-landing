/* Copy de la landing de clínicas veterinarias.
   Es la página que recibe el tráfico de captación y la que convierte:
   aquí sí se persigue la keyword "automatización para clínicas
   veterinarias" en H1 y title. */

export const navVet = [
  { href: "#como-funciona", texto: "Cómo funciona" },
  { href: "#diagnostico", texto: "Diagnóstico" },
  { href: "#faq", texto: "Preguntas" },
];

export const heroVet = {
  categoria: "Automatización con IA para clínicas veterinarias",
  titularA: "Que no se os pierda",
  titularB: "ni una cita por WhatsApp",
  subtitulo:
    "Automatizamos la gestión de citas, los recordatorios de vacunas y desparasitaciones, y el WhatsApp saturado de vuestra clínica — sin tocar nada hasta hacer un diagnóstico real de cómo trabajáis hoy.",
  ctaPrincipal: "Agendar llamada gratis de 15 min",
  ctaSecundario: { texto: "Ver el diagnóstico", href: "#diagnostico" },
  micro:
    "Sin compromiso · Diagnóstico de pago desde 150€ (oferta de lanzamiento), nunca gratis, para que sea un análisis real",
};

export const problemaVet = {
  categoria: "El problema",
  titular: "Cada mensaje sin responder es una cita que se va a la competencia",
  puntos: [
    {
      icono: "mensaje" as const,
      titulo: "WhatsApp saturado",
      texto:
        "Citas, dudas y pedidos se mezclan en un solo chat. Nadie da abasto a responder a tiempo durante el día.",
    },
    {
      icono: "vacuna" as const,
      titulo: "Vacunas que se olvidan",
      texto:
        "Sin recordatorios proactivos, las revisiones y desparasitaciones se pasan de fecha — e ingresos que no vuelven.",
    },
    {
      icono: "agenda" as const,
      titulo: "Agenda manual",
      texto:
        "Cuadrar horarios a mano o con herramientas que no se hablan entre sí cuesta tiempo del equipo clínico.",
    },
  ],
  cierre:
    "Cada mensaje de WhatsApp sin responder a tiempo es, potencialmente, una cita perdida.",
};

export const comoFuncionaVet = {
  categoria: "Cómo funciona",
  titular: "Primero diagnóstico. Después, automatización.",
  entradilla:
    "Automatizar un proceso mal diseñado solo amplifica el problema. Por eso nunca empezamos por la tecnología: empezamos por entender cómo trabaja realmente vuestra clínica.",
  pasos: [
    {
      num: "01",
      icono: "lupa" as const,
      titulo: "Diagnóstico",
      texto:
        "Auditamos ventas, marketing, gestión interna y administración. Mapa claro de cómo funciona hoy la clínica.",
    },
    {
      num: "02",
      icono: "mapa" as const,
      titulo: "Roadmap",
      texto:
        "Oportunidades priorizadas por impacto y esfuerzo, con riesgos y coste estimado de cada fase.",
    },
    {
      num: "03",
      icono: "herramienta" as const,
      titulo: "Implementación",
      texto:
        "Se construye fase a fase — agente de WhatsApp, recordatorios y CRM — solo lo que ya está priorizado.",
    },
  ],
};

export const demoVet = {
  categoria: "La demo",
  titular: "Luna, el agente que responde por vosotros",
  texto:
    "Agenda, modifica y cancela citas directamente en vuestro Google Calendar, consulta el historial del paciente y escala a una persona del equipo cuando hace falta. Nunca da diagnósticos médicos ni agenda una urgencia por chat.",
  puntos: [
    "Recordatorios de vacunas y desparasitaciones 7 días antes, con opción de agendar desde el mismo mensaje",
    "Recordatorios de cita a 24h y 1h antes",
    "Búsqueda de cita siempre por identificador único — nunca por teléfono o nombre, para evitar errores",
  ],
  cta: "Pedir una demo en la llamada",
};

export const ofertaVet = {
  categoria: "La oferta",
  titular: "Diagnóstico inicial",
  badge: "Oferta de lanzamiento",
  notaPrecio: "Precio único, sin importar el tamaño de la clínica",
  argumento:
    "Un diagnóstico de pago obliga a un análisis serio — y os quedáis con el documento aunque no sigáis a la fase de implementación.",
  incluye: [
    "Auditoría de procesos: ventas, marketing, gestión interna y administración",
    "Oportunidades de automatización priorizadas por impacto y esfuerzo",
    "Puntos de riesgo si se automatiza sin control",
    "Roadmap de implementación por fases, con coste estimado",
  ],
  cta: "Agendar llamada gratis de 15 min",
  lateral: [
    {
      titulo: "Duración: 3-4 días",
      texto:
        "Entregable: un documento con diagrama, hallazgos y roadmap. Es vuestro, se use o no para la siguiente fase.",
    },
    {
      titulo: "Después, si encaja",
      // No devolver aquí el rango 500-3.000€ que había antes: ese número
      // va en el roadmap que se entrega CON el diagnóstico, no en la web.
      texto:
        "La implementación se vende fase a fase del roadmap, no todo de golpe: aprobáis cada fase por separado, con su coste cerrado antes de empezarla.",
    },
  ],
};

export const sobreNosotrosVet = {
  categoria: "Sobre nosotros",
  titular: "Un equipo pequeño, de Mallorca",
  texto:
    "Somos Nexo4Pymes: automatizamos procesos con IA para pymes y autónomos. Trabajamos con un número limitado de clínicas a la vez para poder dar seguimiento cercano a cada una — nada de vender una plantilla genérica y desaparecer.",
};

export const faqVet = [
  {
    p: "¿Qué incluye exactamente el diagnóstico?",
    r: "Una auditoría de vuestros procesos actuales (ventas, marketing, gestión interna y administración), las oportunidades de automatización priorizadas, los riesgos de automatizar sin control y un roadmap con coste estimado por fase.",
  },
  {
    p: "¿Y si no queremos seguir con la implementación?",
    r: "El documento del diagnóstico es vuestro igualmente. No hay compromiso de continuar a la fase de implementación.",
  },
  {
    p: "¿El agente de WhatsApp sustituye al equipo?",
    r: "No. Gestiona citas, dudas frecuentes y recordatorios, y escala a una persona del equipo cuando hace falta — nunca da diagnósticos médicos ni agenda urgencias por chat.",
  },
  {
    p: "¿Es compatible con el software que ya usamos?",
    r: "Se revisa en el diagnóstico. El agente se integra con Google Calendar y una hoja de cálculo como CRM; si usáis otro software veterinario, valoramos la integración caso a caso.",
  },
  {
    p: "¿Cuánto tarda todo el proceso?",
    r: "El diagnóstico se entrega en 3-4 días. La implementación se planifica fase a fase según el roadmap acordado.",
  },
];

export const cierreVet = {
  titular: "Empecemos por entender cómo trabaja vuestra clínica hoy",
  texto: "15 minutos, sin compromiso, para ver si el diagnóstico encaja con vosotros.",
  cta: "Agendar llamada gratis de 15 min",
  cruce: {
    pregunta: "¿No tienes una clínica veterinaria?",
    // Anchor descriptivo a propósito: ayuda a posicionar
    // "automatización de procesos para pymes".
    enlace:
      "Mira cómo automatizamos procesos en pymes y autónomos de otros sectores",
  },
};

/* Guion de la conversación de Luna. Es una recreación para ilustrar
   cómo trabaja el agente, no la conversación de un cliente real. */
export const guionLuna = [
  {
    de: "cliente" as const,
    texto: "Hola! Quería pedir cita para Nala, que le toca la vacuna 😊",
    hora: "21:47",
  },
  {
    de: "luna" as const,
    texto:
      "¡Hola! Soy Luna, del equipo de la clínica. Tengo hueco el jueves a las 17:30 y el viernes a las 10:00. ¿Cuál os va mejor?",
    hora: "21:47",
  },
  { de: "cliente" as const, texto: "El jueves a las 17:30 perfecto", hora: "21:48" },
  {
    de: "luna" as const,
    texto:
      "Hecho ✅ Nala tiene cita el jueves 17:30 para vacuna anual. Referencia NX-4417. Os aviso 24h y 1h antes.",
    hora: "21:48",
  },
  {
    de: "cliente" as const,
    texto: "Gracias! Una cosa, lleva dos días sin comer y vomitando",
    hora: "21:49",
  },
  {
    de: "luna" as const,
    texto:
      "Eso lo tiene que valorar el equipo, no puedo orientaros yo por chat. Aviso ahora mismo a una persona de la clínica para que os llame.",
    hora: "21:49",
  },
];

/* Estados de la agenda que se van encendiendo mientras avanza el chat. */
export const agendaLuna = [
  { hora: "16:30", texto: "Toby · revisión", estado: "ocupado" as const },
  { hora: "17:00", texto: "Kira · desparasitación", estado: "ocupado" as const },
  { hora: "17:30", texto: "Libre", estado: "libre" as const },
  { hora: "18:00", texto: "Rocco · control peso", estado: "ocupado" as const },
];
