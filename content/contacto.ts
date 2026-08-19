/* ============================================================
   COPY DE /contacto

   El brief pedía formulario, calendario integrado y vías directas.
   Las tres están, en ese orden de prominencia invertido: primero
   la llamada (que es lo que convierte), después el formulario
   (para quien no quiere videollamada todavía) y al final el email
   directo.

   Los sectores del desplegable son los mismos de la home, más
   "Otro": si alguien no se ve en la lista, el formulario no puede
   ser el sitio donde se atasque.
   ============================================================ */

export const heroContacto = {
  categoria: "Contacto",
  titularA: "Contadnos qué es lo que",
  titularB: "más tiempo os quita",
  parrafo:
    "Dos formas de empezar, las dos gratis y sin compromiso: una videollamada de 15 minutos o un mensaje por escrito. Contestamos en menos de 24 horas laborables.",
};

export const viasContacto = [
  {
    icono: "agenda" as const,
    tono: "azul" as const,
    titulo: "Videollamada de 15 min",
    texto: "La vía rápida. Elegís hueco en el calendario y hablamos. Sin tarjeta y sin presentación comercial.",
    accion: "Ver huecos disponibles",
    destacado: true,
  },
  {
    icono: "mensaje" as const,
    tono: "violeta" as const,
    titulo: "Formulario",
    texto: "Si preferís escribirlo antes de hablar. Cuantos más detalles deis, más útil será la primera respuesta.",
    accion: "Ir al formulario",
    destacado: false,
  },
  {
    icono: "documento" as const,
    tono: "mint" as const,
    titulo: "Email directo",
    texto: "Para propuestas, colaboraciones o cualquier cosa que no encaje en las dos anteriores.",
    accion: "Escribir un email",
    destacado: false,
  },
];

export const calendario = {
  categoria: "Agendar",
  titular: "Elegid hueco y hablamos",
  intro: "15 minutos por videollamada. Sin tarjeta, sin compromiso y sin presentación comercial.",
  /* AVISO DE CARGA DIFERIDA — no quitar sin revisar la política de
     cookies, cuyo punto 3 describe este comportamiento.

     El calendario es un iframe de Calendly, un tercero con sede en
     EE. UU. que instala sus propias cookies en cuanto se carga. El
     iframe solo se monta cuando el visitante pulsa el botón: hasta
     entonces no se ha contactado con ningún servidor de Calendly.

     Esto es independiente del banner de cookies y sigue haciendo
     falta con él puesto — el razonamiento completo está en
     components/contacto/CalendarioEmbebido.tsx. */
  consentimiento: {
    titulo: "El calendario lo sirve Calendly",
    texto:
      "Al cargarlo, Calendly (Calendly LLC, EE. UU.) recibirá vuestra dirección IP y podrá instalar sus propias cookies. Por eso no lo cargamos sin que lo pidáis.",
    boton: "Cargar el calendario",
    alternativa: "O abrirlo en una pestaña nueva",
  },
};

export const formulario = {
  categoria: "Formulario",
  titular: "Escribidnos y lo vemos por escrito",
  intro:
    "Nada obligatorio salvo lo imprescindible para poder contestar. Cuanto más concreto sea el «qué os quita tiempo», más útil será nuestra primera respuesta.",
  sectores: [
    "Servicios profesionales (asesoría, despacho, consultora)",
    "Comercio y retail",
    "Salud y bienestar",
    "Clínica veterinaria",
    "Logística y transporte",
    "Oficios y servicios a domicilio",
    "Hostelería y turismo",
    "Otro",
  ],
  campos: {
    nombre: { etiqueta: "Nombre", ayuda: "" },
    empresa: { etiqueta: "Empresa", ayuda: "" },
    email: { etiqueta: "Email", ayuda: "Aquí es donde os contestaremos." },
    telefono: { etiqueta: "Teléfono", ayuda: "Opcional. Solo si preferís que os llamemos." },
    sector: { etiqueta: "Sector", ayuda: "" },
    mensaje: {
      etiqueta: "¿Qué es lo que más tiempo os quita?",
      ayuda: "Un par de frases bastan. Por ejemplo: «se nos van las mañanas contestando los mismos mensajes».",
    },
  },
  consentimiento:
    "He leído y acepto la política de privacidad. Mis datos se usarán únicamente para responder a esta consulta.",
  enviar: "Enviar mensaje",
  enviando: "Enviando…",
  exito: {
    titulo: "Mensaje enviado",
    texto: "Os contestamos en menos de 24 horas laborables. Si tenéis prisa, podéis agendar la llamada directamente.",
  },
  error: {
    titulo: "No hemos podido enviarlo",
    texto: "Algo ha fallado por nuestro lado. Escribidnos directamente y lo resolvemos:",
  },
};

export const datosEmpresa = {
  categoria: "Datos de la empresa",
  titular: "Quién recibe vuestro mensaje",
  intro: "Por transparencia y porque el RGPD obliga a decir quién trata los datos.",
};
