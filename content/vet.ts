/* Copy de la home veterinaria rediseñada (antes vivía en /veterinarias,
   ahora es la portada del sitio: es la página que recibe el tráfico
   de captación y la que convierte, así que aquí sí se persigue la
   keyword "automatización para clínicas veterinarias" en H1 y title.

   FASE 1 DEL REDISEÑO MOBILE-FIRST: el texto se sintetizó sin quitar
   ningún argumento. La regla que se aplicó en todo el archivo: ningún
   bloque de texto corrido pasa de ~40 palabras en móvil, y las tarjetas
   se quedan en título + una línea de 12 palabras como mucho. Lo que se
   quitó de un sitio no se perdió: se movió a donde el visitante lo está
   buscando (por ejemplo, el matiz de "el diagnóstico nunca es gratis"
   salió del hero y vive entero en `ofertaVet.infoDinero`).

   Las cifras (precio, plazas...) NO se repiten a mano: se leen de
   `oferta` en content/marca.ts. */

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
  subtituloA: "Un agente de IA responde a las familias, deja la cita en ",
  subtituloB: "vuestro",
  subtituloC: " Google Calendar y avisa de las vacunas. Sin cambiar de programa.",
  /* Una sola etiqueta de CTA en toda la página. Antes había tres
     ("Agendar llamada gratis de 15 min", "Reservar plaza — hablamos
     15 min", "Agendar llamada gratis") para la misma acción, y cada
     variante obliga a releer para comprobar que lleva al mismo sitio. */
  ctaPrincipal: "Agendar llamada gratis",
  ctaSecundario: { texto: "Ver la secuencia real ↓", href: "#como-va" },
  micro: "15 min · sin compromiso · sin tarjeta",
  badgeImagen: { titulo: "18 sin responder", texto: "Un martes cualquiera · 9:38" },
  imagenAlt: "Bandeja de WhatsApp de una clínica veterinaria con familias esperando respuesta",
};

/* Antes eran cinco mensajes girando en una cinta de 38 s marcada
   aria-hidden: las tres objeciones mejor resueltas de todo el sitio,
   ilegibles al pasar e inexistentes para un lector de pantalla.
   Ahora son tres píldoras fijas y legibles.

   Las otras dos no se perdieron: "diagnóstico en 3–4 días" vive en
   `ofertaVet.lateral[0]` y "máximo 3 clínicas a la vez" es el contador
   de plazas de la tarjeta de precio. */
export const garantias = [
  "Sin permanencia",
  "El informe es vuestro",
  "Sin cambiar de programa",
];

export const problemaVet = {
  categoria: "El problema",
  titular: "A las 9:38 ya hay 18 mensajes y la sala de espera llena",
  subtitulo:
    "Ninguno es urgente por separado. Juntos, son la razón por la que una clínica pierde citas sin enterarse.",
  /* En móvil este dato ocupa el sitio del subtítulo: una cifra se lee
     de un vistazo y un párrafo no. En escritorio se invierte. */
  dato: {
    valor: "18 / 0",
    texto: "mensajes esperando frente a respuestas dadas, un martes cualquiera antes de abrir la consulta.",
  },
  /* El chip de coste es lo que más pesa de cada tarjeta, así que el
     texto descriptivo solo aparece en escritorio: en móvil basta el
     título y el coste. */
  tarjetas: [
    {
      icono: "mensaje" as const,
      titulo: "El WhatsApp lo absorbe todo",
      texto: "Citas, dudas de dosis, fotos y pedidos en el mismo chat. Se contesta tarde.",
      coste: "Coste: la familia llama a la clínica de al lado",
    },
    {
      icono: "vacuna" as const,
      titulo: "Vacunas que se pasan",
      texto: "Nadie avisa de que a Nala le toca la trivalente este mes.",
      coste: "Coste: ingresos recurrentes que no vuelven",
    },
    {
      icono: "reloj" as const,
      titulo: "La agenda se cuadra a mano",
      texto: "Apuntar, mover, confirmar y volver a llamar. Horas que no curan a nadie.",
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
  /* Los pasos van al lado de la animación: quien mira el teléfono no
     puede leer un párrafo a la vez. Una frase por paso. */
  pasos: [
    {
      hora: "9:38",
      titulo: "Entra el mensaje",
      texto: "Al WhatsApp de siempre, el número de la clínica. No se descarga nada ni se cambia de app.",
    },
    {
      hora: "9:38 · 6 SEGUNDOS DESPUÉS",
      titulo: "Luna mira los huecos reales",
      texto: "Consulta vuestro Google Calendar y ofrece solo horas que existen. Sin dobles reservas.",
    },
    {
      hora: "9:39",
      titulo: "La cita queda puesta",
      texto: "Con nombre del animal, motivo y contacto. Igual que la habría apuntado mostrador.",
    },
    {
      hora: "24 H ANTES · Y 1 H ANTES",
      titulo: "El recordatorio sale solo",
      texto: "Bajan las ausencias sin llamar a nadie. Y lo mismo 7 días antes de cada vacuna.",
    },
  ],
  replay: "Ver otra vez",
  clics: { texto: "Clics del equipo en toda la secuencia:", valor: "cero" },
};

export const limitesVet = {
  categoria: "Los límites, claros desde el principio",
  titular: "Lo que hace Luna — y lo que no va a hacer nunca",
  subtitulo:
    "La duda real no es si funciona, sino qué pasa cuando entra algo delicado. Está definido antes de encender nada.",
  siHace: {
    titulo: "✓ Sí hace",
    caption: "automatizable sin riesgo clínico",
    items: [
      "Agendar, mover y cancelar citas en vuestro Google Calendar",
      "Recordatorios de cita 24 h y 1 h antes",
      "Avisos de vacunas 7 días antes, con reserva en el mismo mensaje",
      "Horarios, precios de consulta, qué traer y cómo llegar",
      "Buscar la cita por identificador único, nunca por nombre, para no confundir pacientes",
    ],
  },
  noHace: {
    titulo: "✕ No hace",
    caption: "y está bloqueado a propósito",
    items: [
      "Dar diagnósticos, opiniones clínicas o pautas de medicación",
      "Gestionar urgencias por chat: las deriva a una persona al instante",
      "Improvisar: si duda, pasa la conversación al equipo",
      "Sustituir a nadie del mostrador. Le quita lo repetitivo, no el trato",
    ],
  },
};

/* ============================================================
   LA PRUEBA — sección nueva de la fase 3.

   Va entre la secuencia y el precio porque es donde el visitante
   pasa de "esto funciona" a "¿y estos quiénes son?".

   REGLA DE ESTE BLOQUE: aquí no se escribe nada que no sea cierto
   hoy. No hay testimonios porque todavía no hay clientes, y un
   testimonio inventado en una web comercial es exactamente el tipo
   de cosa que hunde la confianza cuando se descubre. Lo que sí es
   verdad y sí convence a alguien que va a pagar 150€ a un
   desconocido: quién responde, y qué se compromete a hacer si la
   cosa no sale. Los tres compromisos ya se afirman en otras partes
   del sitio; aquí se juntan y se firman.
   ============================================================ */
export const pruebaVet = {
  categoria: "Quiénes estamos detrás",
  titular: "Todavía no tenemos veinte clínicas que enseñaros",
  texto:
    "Somos nuevos y preferimos decirlo antes de que lo preguntéis. Por eso el riesgo lo ponemos nosotros, no vosotros.",
  compromisos: [
    {
      titulo: "El informe es vuestro",
      texto: "Si decidís no seguir, os quedáis con el análisis y el roadmap. Podéis ejecutarlo por vuestra cuenta o llevárselo a quien queráis.",
    },
    {
      titulo: "Sin permanencia",
      texto: "Cada fase se cierra por separado y con el precio cerrado antes de empezarla. Ningún contrato de doce meses.",
    },
    {
      titulo: "Os diremos que no",
      texto: "Si automatizar no os compensa, sale escrito en el informe aunque signifique venderos menos.",
    },
  ],
  /* RELLENAR: nombre, rol y ruta de la foto de quien firma. Mientras
     `nombre` esté vacío, la firma se atribuye a la empresa y la
     localidad, que es igual de cierto y no obliga a inventar nada. */
  firma: {
    nombre: "",
    rol: "",
    foto: "",
  },
  /* Redactado para que siga siendo cierto tanto si `firma.nombre` está
     puesto como si no: no promete un nombre que igual no se ve. */
  firmaTexto: "Contestamos nosotros, en la llamada y después de ella. No hay call center ni formulario que se pierda.",
  /* RELLENAR CUANDO HAYA UNA PRIMERA CLÍNICA. En cuanto `piloto` deje
     de ser null, el bloque de cifras y captura aparece solo encima de
     los compromisos, sin tocar el componente. NO inventar estos datos:
     tienen que salir de una clínica real que haya dado permiso. */
  piloto: null as null | {
    titulo: string;
    cifras: { valor: string; texto: string }[];
    captura: string;
    capturaAlt: string;
  },
};

export const metodoVet = {
  categoria: "El método",
  titular: "Primero diagnóstico. Después, automatización por fases.",
  pasos: [
    {
      num: "01",
      titulo: "Diagnóstico",
      texto: "Cómo entra una cita, cómo se cobra, cómo se comunica. Sale un mapa, no una lista de deseos.",
    },
    {
      num: "02",
      titulo: "Roadmap",
      texto: "Oportunidades ordenadas por impacto y esfuerzo, con el coste estimado de cada fase. Decidís vosotros por dónde empezar.",
    },
    {
      num: "03",
      titulo: "Implementación",
      texto: "Fase a fase, con precio cerrado antes de empezar cada una. Nunca todo de golpe ni doce meses de contrato.",
    },
  ],
  callout: {
    fuerte: "El diagnóstico no se queda en el WhatsApp.",
    texto:
      "Miramos también captación, web, redes y administración. Si lo que más os frena es no aparecer en Google, saldrá en el informe.",
  },
  /* Era la sección "Por qué nunca empezamos por la tecnología": 103
     palabras de ensayo, sin apoyo visual, justo antes del precio. El
     argumento es bueno, así que no se tira: se convierte en el
     diagrama de dos estados que explica por qué el paso 01 es el
     diagnóstico y no la automatización. La cita se queda íntegra
     porque es la mejor frase de toda la página. */
  porQue: {
    titular: "Automatizar un proceso malo no lo arregla: lo multiplica",
    estados: [
      {
        etiqueta: "Sin diagnóstico",
        entrada: "Las citas se apuntan en tres sitios: papel, ordenador y un grupo de WhatsApp.",
        salida: "El mismo lío, tres veces más rápido.",
        bien: false,
      },
      {
        etiqueta: "Con diagnóstico",
        entrada: "Primero se ve cómo entra una cita, quién la toca y dónde se pierde.",
        salida: "Un sitio, una cita, cero dobles reservas.",
        bien: true,
      },
    ],
    cita: "Si automatizar no os compensa, os lo diremos. Eso también es parte del diagnóstico.",
  },
};

export const ofertaVet = {
  categoria: "La oferta",
  titular: "Diagnóstico inicial para vuestra clínica",
  badge: "Oferta de lanzamiento",
  notaPrecio: "Precio único, sin importar el tamaño de la clínica",
  /* Este bloque absorbe el matiz que antes iba en la microcopia del
     hero ("nunca es gratis, para que sea un análisis de verdad"): es
     aquí donde el visitante busca cómo funciona el dinero. */
  infoDinero: {
    fuerte: "La llamada es gratis.",
    texto:
      "Solo si decidís seguir, el diagnóstico cuesta 150€. No hay versión gratuita: así es un análisis de verdad.",
  },
  incluye: [
    "Auditoría de citas, atención, captación y administración",
    "Revisión de vuestra web, Google y redes sociales",
    "Oportunidades priorizadas por impacto y esfuerzo",
    "Puntos de riesgo si se automatiza sin control",
    "Roadmap por fases con coste estimado de cada una",
  ],
  cta: "Agendar llamada gratis",
  finePrint: "Sin tarjeta y sin compromiso. Elegís hueco en el calendario y ya está.",
  lateral: [
    {
      titulo: "Duración: 3-4 días",
      texto: "Entregable: un documento con el diagrama de cómo trabajáis hoy, los hallazgos y el roadmap.",
    },
    {
      titulo: "Después, si encaja",
      texto:
        "La implementación se vende fase a fase, no todo de golpe. Cada automatización va de 500 a 3.000€ según su complejidad, con precio cerrado antes de empezar.",
    },
  ],
  documento: {
    titulo: "El documento es vuestro, pase lo que pase",
    texto:
      "Si decidís no seguir, os quedáis igualmente con el análisis y el roadmap. Sin letra pequeña ni permanencia.",
  },
};

export const gateServicios = {
  categoria: "¿Quieres verlo todo con calma?",
  titular: "Servicios, método y quiénes somos",
  texto:
    "Todo lo que automatizamos, cómo trabajamos, qué pasa con vuestros datos y quién está detrás.",
  tags: ["Servicios", "Método completo", "Quiénes somos", "Otros sectores", "Precios", "Datos y RGPD"],
  cta: "Ver servicios y quiénes somos",
};

/* Las respuestas del FAQ NO se recortan: van dentro de un acordeón, así
   que el visitante decide cuándo pagar ese texto. Lo que sí cambió es
   que ya no hay ninguna abierta al entrar (ver FaqSeccion). */
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
    "En 15 minutos lo miramos juntos. Si no tiene sentido para vuestra clínica, os lo diremos en esa misma llamada.",
  cta: "Agendar llamada gratis",
  finePrint: "Gratis y sin compromiso · 15 min",
};
