/* English version of content/contacto.ts */

export const heroContacto = {
  categoria: "Contact",
  titularA: "Tell us what takes up",
  titularB: "most of your time",
  parrafo:
    "Two ways to start, both free and with no commitment: a 15-minute video call or a written message. We reply within 24 working hours.",
};

export const viasContacto = [
  {
    icono: "agenda" as const,
    tono: "azul" as const,
    titulo: "15-min video call",
    texto: "The quick route. Pick a slot in the calendar and we talk. No card, no sales pitch.",
    accion: "See available slots",
    destacado: true,
  },
  {
    icono: "mensaje" as const,
    tono: "violeta" as const,
    titulo: "Form",
    texto: "If you'd rather write it down before talking. The more detail you give, the more useful our first reply will be.",
    accion: "Go to the form",
    destacado: false,
  },
  {
    icono: "documento" as const,
    tono: "mint" as const,
    titulo: "Direct email",
    texto: "For proposals, partnerships or anything that doesn't fit the two options above.",
    accion: "Write an email",
    destacado: false,
  },
];

export const calendario = {
  categoria: "Book a call",
  titular: "Pick a slot and let's talk",
  intro: "15 minutes on a video call. No card, no commitment and no sales pitch.",
  consentimiento: {
    titulo: "The calendar is provided by Calendly",
    texto: "When it loads, Calendly (Calendly LLC, USA) will receive your IP address and may set its own cookies. That's why we don't load it until you ask.",
    boton: "Load the calendar",
    alternativa: "Or open it in a new tab",
  },
};

export const formulario = {
  categoria: "Form",
  titular: "Write to us and we'll look at it in writing",
  intro: "Nothing is required except what we need to reply. The more specific your “what takes up your time”, the more useful our first reply will be.",
  sectores: [
    "Trades and technical services (plumbing, HVAC, pools, maintenance)",
    "Property and community management",
    "Retail",
    "Professional services (advisory, law firm, consultancy)",
    "Logistics and transport",
    "Hospitality and tourism",
    "Health and wellbeing",
    "Other",
  ],
  campos: {
    nombre: { etiqueta: "Name", ayuda: "" },
    empresa: { etiqueta: "Company", ayuda: "" },
    email: { etiqueta: "Email", ayuda: "This is where we'll reply." },
    telefono: { etiqueta: "Phone", ayuda: "Optional. Only if you'd rather we call you." },
    sector: { etiqueta: "Industry", ayuda: "" },
    mensaje: {
      etiqueta: "What takes up most of your time?",
      ayuda: "A couple of sentences is enough. For example: “our mornings go on answering the same messages”.",
    },
  },
  consentimiento: "I have read and accept the privacy policy. My data will only be used to reply to this enquiry.",
  enviar: "Send message",
  enviando: "Sending…",
  exito: {
    titulo: "Message sent",
    texto: "We'll reply within 24 working hours. If you're in a hurry, message us on WhatsApp and we'll look at it straight away.",
  },
  error: {
    titulo: "We couldn't send it",
    texto: "Something went wrong on our side. Write to us directly and we'll sort it out:",
  },
};

export const datosEmpresa = {
  categoria: "Company details",
  titular: "Who receives your message",
  intro: "For transparency, and because the GDPR requires us to say who processes your data.",
};
