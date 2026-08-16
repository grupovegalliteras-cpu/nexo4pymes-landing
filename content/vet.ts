/* Copy de la home veterinaria rediseñada (antes vivía en /veterinarias,
   ahora es la portada del sitio: es la página que recibe el tráfico
   de captación y la que convierte, así que aquí sí se persigue la
   keyword "automatización para clínicas veterinarias" en H1 y title.

   Texto portado palabra por palabra desde la maqueta del rediseño
   (spec-home.md) — no reescrito. Las cifras (precio, plazas...) NO
   se repiten a mano: se leen de `oferta` en content/marca.ts. */

export const navVet = [
  { href: "#problema", texto: "El problema" },
  { href: "#como-va", texto: "Cómo va" },
  { href: "#diagnostico", texto: "Precio" },
  { href: "#faq", texto: "Preguntas" },
];

export const heroVet = {
  categoria: "Solo para clínicas veterinarias",
  titularA: "El WhatsApp de vuestra clínica,",
  titularB: "contestado y agendado solo",
  subtituloA: "Un agente de IA contesta los mensajes de las familias, deja la cita puesta en ",
  subtituloB: "vuestro",
  subtituloC:
    " Google Calendar y avisa de las vacunas que tocan. Vosotros no cambiáis de programa ni de forma de trabajar.",
  ctaPrincipal: "Agendar llamada gratis de 15 min",
  ctaSecundario: { texto: "Ver la secuencia real ↓", href: "#como-va" },
  micro:
    "15 min por videollamada, sin compromiso. Si encajamos, el diagnóstico cuesta 150€ — nunca es gratis, para que sea un análisis de verdad.",
  badgeImagen: { titulo: "18 sin responder", texto: "Un martes cualquiera · 9:38" },
  imagenAlt: "Bandeja de WhatsApp de una clínica veterinaria con familias esperando respuesta",
};

export const marquesina = [
  "DIAGNÓSTICO EN 3–4 DÍAS",
  "EL DOCUMENTO ES VUESTRO PASE LO QUE PASE",
  "SIN CAMBIAR DE PROGRAMA",
  "MÁXIMO 3 CLÍNICAS A LA VEZ",
  "SIN PERMANENCIA",
];

export const problemaVet = {
  categoria: "El problema",
  titular: "A las 9:38 ya hay 18 mensajes y la sala de espera llena",
  subtitulo:
    "Ninguno es urgente por separado. Juntos, son la razón por la que una clínica pierde citas sin enterarse.",
  tarjetas: [
    {
      icono: "mensaje" as const,
      titulo: "El WhatsApp lo absorbe todo",
      texto:
        "Citas, dudas de dosis, la foto de una herida y un pedido de pienso, en el mismo chat. Se contesta cuando se puede — normalmente, tarde.",
      coste: "Coste: la familia llama a la clínica de al lado",
    },
    {
      icono: "vacuna" as const,
      titulo: "Vacunas que se pasan",
      texto:
        "Nadie avisa de que a Nala le toca la trivalente este mes. La revisión se salta y esa visita, sencillamente, no se factura.",
      coste: "Coste: ingresos recurrentes que no vuelven",
    },
    {
      icono: "reloj" as const,
      titulo: "La agenda se cuadra a mano",
      texto:
        "Apuntar, mover, confirmar y volver a llamar. Tiempo del auxiliar y del veterinario en algo que no cura a ningún animal.",
      coste: "Coste: horas de personal clínico cada semana",
    },
  ],
  destacado: "Cada mensaje sin contestar a tiempo es, potencialmente, una cita que se va a otra clínica.",
};

export const comoVaVet = {
  categoria: "Cómo va, de verdad",
  titular: "Un mensaje entra a las 9:38. A las 9:39 la cita está puesta.",
  subtitulo:
    "No es una simulación bonita: es la secuencia exacta que ocurre, sin que nadie del equipo toque el móvil.",
  telefono: { nombre: "Clínica Veterinaria", estadoInicial: "en línea" },
  burbujas: [
    { paso: 0, tipo: "recibido" as const, texto: "Hola, quería pedir cita para vacunar a mi perrita Nala. ¿Tenéis hueco esta semana?", hora: "9:38" },
    { paso: 1, tipo: "sistema" as const, texto: "Luna consulta vuestro Google Calendar…" },
    { paso: 1, tipo: "enviado" as const, texto: "¡Hola! Tengo el jueves a las 17:30 o el viernes a las 10:00. ¿Cuál os viene mejor?", hora: "9:38" },
    { paso: 2, tipo: "recibido" as const, texto: "El jueves a las 17:30 👍", hora: "9:39" },
    { paso: 2, tipo: "enviado" as const, texto: "Hecho ✅ Jueves 17:30, vacunación de Nala. Os llega un recordatorio el día antes.", hora: "9:39" },
    { paso: 3, tipo: "sistema" as const, texto: "Miércoles 17:30 · recordatorio automático enviado" },
  ],
  pasos: [
    {
      hora: "9:38",
      titulo: "Entra el mensaje",
      texto: "Una familia escribe al WhatsApp de siempre, el número de la clínica. No se descarga nada ni cambia de app.",
    },
    {
      hora: "9:38 · 6 SEGUNDOS DESPUÉS",
      titulo: "Luna mira los huecos reales",
      texto: "Consulta vuestro Google Calendar en ese momento y ofrece solo horas que existen de verdad. Nada de dobles reservas.",
    },
    {
      hora: "9:39",
      titulo: "La cita queda puesta",
      texto: "Se crea en vuestro calendario con nombre del animal, motivo y contacto — igual que la habría apuntado la persona de mostrador.",
    },
    {
      hora: "24 H ANTES · Y 1 H ANTES",
      titulo: "El recordatorio sale solo",
      texto: "Bajan las ausencias sin que nadie llame por teléfono. Lo mismo para vacunas y desparasitaciones, 7 días antes de que toquen.",
    },
  ],
  replay: "Ver otra vez",
  clics: { texto: "Clics del equipo en toda la secuencia:", valor: "cero" },
};

export const limitesVet = {
  categoria: "Los límites, claros desde el principio",
  titular: "Lo que hace Luna — y lo que no va a hacer nunca",
  subtitulo:
    "La duda real no es si funciona, sino qué pasa cuando entra algo delicado. Esto está definido antes de encender nada.",
  siHace: {
    titulo: "✓ Sí hace",
    caption: "automatizable sin riesgo clínico",
    items: [
      "Agendar, mover y cancelar citas en vuestro Google Calendar",
      "Recordatorios de cita a 24 h y 1 h antes",
      "Avisos de vacunas y desparasitaciones 7 días antes, con reserva en el mismo mensaje",
      "Responder dudas frecuentes: horarios, precios de consulta, qué traer, cómo llegar",
      "Buscar la cita por identificador único, nunca por nombre o teléfono, para no confundir pacientes",
    ],
  },
  noHace: {
    titulo: "✕ No hace",
    caption: "y está bloqueado a propósito",
    items: [
      "Dar diagnósticos, opiniones clínicas o pautas de medicación",
      "Gestionar una urgencia por chat: la deriva a una persona al instante",
      "Improvisar cuando no está seguro: si duda, pasa la conversación al equipo",
      "Sustituir a nadie del mostrador. Le quita lo repetitivo, no el trato",
    ],
  },
};

export const porQueNoEmpezamos = {
  categoria: "Por qué nunca empezamos por la tecnología",
  titular: "Automatizar un proceso malo no lo arregla: lo multiplica",
  parrafos: [
    "Imaginad una clínica que apunta las citas en tres sitios: la agenda de papel, el calendario del ordenador y un grupo de WhatsApp interno. Si automatizamos eso tal cual, no ganamos nada — pasamos a tener el mismo lío, pero más rápido y con más mensajes.",
    "Por eso lo primero que hacemos es sentarnos a ver cómo entra una cita hoy, quién la toca, dónde se pierde y qué se factura de menos por ello. Solo después decidimos qué merece la pena automatizar. A veces la conclusión es que hay que arreglar el proceso antes, y os lo decimos aunque signifique venderos menos.",
  ],
  cita: "Si automatizar no os compensa, os lo diremos. Eso también es parte del diagnóstico.",
};

export const metodoVet = {
  categoria: "El método",
  titular: "Primero diagnóstico. Después, automatización por fases.",
  pasos: [
    {
      num: "01",
      titulo: "Diagnóstico",
      texto: "Miramos cómo funciona hoy la clínica de verdad: cómo entra una cita, cómo se cobra, cómo se comunica. Sale un mapa, no una lista de deseos.",
    },
    {
      num: "02",
      titulo: "Roadmap",
      texto: "Oportunidades ordenadas por impacto y esfuerzo, con los riesgos de cada una y el coste estimado por fase. Decidís vosotros por dónde empezar.",
    },
    {
      num: "03",
      titulo: "Implementación",
      texto: "Se construye fase a fase, con precio cerrado antes de empezar cada una. Nunca todo de golpe ni un contrato de doce meses.",
    },
  ],
  callout: {
    fuerte: "El diagnóstico no se queda en el WhatsApp.",
    texto:
      "Miramos también cómo captáis clientes nuevos, cómo está vuestra web y vuestras redes, y cómo lleváis la administración. Si lo que más os frena es que no aparecéis en Google, eso saldrá en el informe aunque no tenga nada que ver con automatizar.",
  },
};

export const ofertaVet = {
  categoria: "La oferta",
  titular: "Diagnóstico inicial para vuestra clínica",
  badge: "Oferta de lanzamiento",
  notaPrecio: "Precio único, sin importar el tamaño de la clínica",
  infoDinero: {
    fuerte: "Cómo va el dinero:",
    texto:
      "la llamada de 15 min es gratis y sin compromiso. Solo si decidís seguir, el diagnóstico cuesta 150€. No hay ninguna versión gratuita del diagnóstico.",
  },
  incluye: [
    "Auditoría de procesos: citas, atención al cliente, captación, gestión interna y administración",
    "Revisión de vuestra presencia online: web, Google y redes sociales",
    "Oportunidades priorizadas por impacto y esfuerzo",
    "Puntos de riesgo si se automatiza sin control",
    "Roadmap por fases con coste estimado de cada una",
  ],
  cta: "Reservar plaza — hablamos 15 min",
  finePrint: "Sin tarjeta, sin compromiso. Elegís hueco en el calendario y ya está.",
  lateral: [
    {
      titulo: "Duración: 3-4 días",
      texto: "Entregable: un documento con el diagrama de cómo trabajáis hoy, los hallazgos y el roadmap.",
    },
    {
      titulo: "Después, si encaja",
      texto:
        "La implementación se vende fase a fase del roadmap, no todo de golpe. Cada automatización tiene un rango típico de 500–3.000€ según su complejidad, y el precio se cierra antes de empezar.",
    },
  ],
  documento: {
    titulo: "El documento es vuestro, pase lo que pase",
    texto:
      "Si al leer el diagnóstico decidís no seguir, os quedáis igualmente con todo el análisis y el roadmap. Podéis ejecutarlo por vuestra cuenta o llevárselo a quien queráis. No hay letra pequeña ni permanencia.",
  },
};

export const gateServicios = {
  categoria: "¿Quieres verlo todo con calma?",
  titular: "Servicios, método y quiénes somos",
  texto:
    "Esta página va al grano con lo de las clínicas. El detalle completo — todo lo que automatizamos, cómo trabajamos, qué pasa con vuestros datos y quién está detrás — está en su propia página.",
  tags: ["Servicios", "Método completo", "Quiénes somos", "Otros sectores", "Precios", "Datos y RGPD"],
  cta: "Ver servicios y quiénes somos",
};

export const faqVet = [
  {
    p: "En la clínica no sabemos nada de tecnología. ¿Es un problema?",
    r: "No, es lo normal y es justo el punto de partida. No hay ningún programa nuevo que aprender: seguís usando vuestro WhatsApp y vuestro Google Calendar exactamente igual que hoy. Lo montamos, lo configuramos y os enseñamos las cuatro cosas que sí cambian, en una sesión.",
  },
  {
    p: "¿Es seguro? ¿Qué pasa con los datos de nuestros clientes?",
    r: "Todo se monta sobre vuestras propias herramientas y vuestras cuentas: los datos siguen siendo vuestros y podéis cortar el acceso cuando queráis. Antes de empezar firmamos el contrato de encargado del tratamiento que exige el RGPD, y en el diagnóstico dejamos por escrito qué datos toca el sistema y cuáles no toca nunca.",
  },
  {
    p: "¿Y si la familia pregunta algo médico o es una urgencia?",
    r: "El agente no da diagnósticos ni pautas de medicación, y no agenda urgencias por chat. Cuando detecta algo clínico o urgente, corta y avisa a una persona del equipo inmediatamente. Ese límite se configura antes de encender nada.",
  },
  {
    p: "Usamos un software veterinario concreto. ¿Sirve igual?",
    r: "Se revisa en el diagnóstico. La base funciona con Google Calendar y una hoja de cálculo como CRM, que es lo que ya tiene todo el mundo. Si usáis un software veterinario específico, miramos caso a caso si tiene forma de conectarse y os decimos si merece la pena o no.",
  },
  {
    p: "¿Y si hacemos el diagnóstico y decidimos no seguir?",
    r: "El documento es vuestro igualmente, con todo el análisis y el roadmap. No hay compromiso de pasar a implementación ni permanencia de ningún tipo.",
  },
  {
    p: "¿Cuánto cuesta todo al final?",
    r: "El diagnóstico son 150€ ahora mismo (precio de lanzamiento; el normal es 250–450€). Después, cada automatización del roadmap tiene un rango típico de 500–3.000€ según lo compleja que sea, y siempre se cierra el precio antes de empezar la fase. No hay cuota mensual obligatoria.",
  },
  {
    p: "¿Cuánto tarda todo el proceso?",
    r: "El diagnóstico se entrega en 3–4 días desde la reunión inicial. La implementación se planifica fase a fase según el roadmap que acordemos.",
  },
];

export const cierreVet = {
  titular: "¿Cuántas citas se os escapan cada semana por WhatsApp?",
  texto:
    "En 15 minutos lo miramos juntos y os decimos si esto tiene sentido para vuestra clínica. Si no lo tiene, os lo diremos en esa misma llamada.",
  cta: "Agendar llamada gratis de 15 min",
  finePrint: "Gratis y sin compromiso · Si seguimos, el diagnóstico son 150€",
};
