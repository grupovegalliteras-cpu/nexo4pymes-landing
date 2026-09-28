/* Deutsche Fassung von content/contacto.ts */

export const heroContacto = {
  categoria: "Kontakt",
  titularA: "Erzählen Sie uns, was Sie",
  titularB: "am meisten Zeit kostet",
  parrafo:
    "Zwei Wege zum Start, beide kostenlos und unverbindlich: ein 15-minütiger Videocall oder eine schriftliche Nachricht. Wir antworten innerhalb von 24 Arbeitsstunden.",
};

export const viasContacto = [
  {
    icono: "agenda" as const,
    tono: "azul" as const,
    titulo: "Videocall, 15 Min.",
    texto: "Der schnelle Weg. Sie wählen einen Termin im Kalender und wir sprechen. Keine Karte, keine Verkaufspräsentation.",
    accion: "Freie Termine ansehen",
    destacado: true,
  },
  {
    icono: "mensaje" as const,
    tono: "violeta" as const,
    titulo: "Formular",
    texto: "Wenn Sie es lieber aufschreiben, bevor wir sprechen. Je mehr Details, desto nützlicher unsere erste Antwort.",
    accion: "Zum Formular",
    destacado: false,
  },
  {
    icono: "documento" as const,
    tono: "mint" as const,
    titulo: "Direkte E-Mail",
    texto: "Für Vorschläge, Kooperationen oder alles, was nicht zu den beiden anderen Wegen passt.",
    accion: "E-Mail schreiben",
    destacado: false,
  },
];

export const calendario = {
  categoria: "Termin",
  titular: "Termin wählen und sprechen",
  intro: "15 Minuten per Videocall. Keine Karte, unverbindlich und ohne Verkaufspräsentation.",
  consentimiento: {
    titulo: "Der Kalender wird von Calendly bereitgestellt",
    texto: "Beim Laden erhält Calendly (Calendly LLC, USA) Ihre IP-Adresse und kann eigene Cookies setzen. Deshalb laden wir ihn erst, wenn Sie es möchten.",
    boton: "Kalender laden",
    alternativa: "Oder in einem neuen Tab öffnen",
  },
};

export const formulario = {
  categoria: "Formular",
  titular: "Schreiben Sie uns, wir antworten schriftlich",
  intro: "Pflicht ist nur, was wir für eine Antwort brauchen. Je konkreter Ihr „was kostet uns Zeit“, desto nützlicher unsere erste Antwort.",
  sectores: [
    "Handwerk und technische Dienste (Sanitär, Klima, Pools, Wartung)",
    "Immobilien- und Hausverwaltung",
    "Handel und Einzelhandel",
    "Freiberufliche Dienstleistungen (Beratung, Kanzlei, Consulting)",
    "Logistik und Transport",
    "Gastronomie und Tourismus",
    "Gesundheit und Wellness",
    "Sonstiges",
  ],
  campos: {
    nombre: { etiqueta: "Name", ayuda: "" },
    empresa: { etiqueta: "Firma", ayuda: "" },
    email: { etiqueta: "E-Mail", ayuda: "Hierhin schicken wir unsere Antwort." },
    telefono: { etiqueta: "Telefon", ayuda: "Optional. Nur wenn Sie lieber angerufen werden." },
    sector: { etiqueta: "Branche", ayuda: "" },
    mensaje: {
      etiqueta: "Was kostet Sie am meisten Zeit?",
      ayuda: "Ein paar Sätze genügen. Zum Beispiel: „unsere Vormittage gehen mit denselben Nachrichten drauf“.",
    },
  },
  consentimiento: "Ich habe die Datenschutzerklärung gelesen und akzeptiere sie. Meine Daten werden nur zur Beantwortung dieser Anfrage verwendet.",
  enviar: "Nachricht senden",
  enviando: "Wird gesendet…",
  exito: {
    titulo: "Nachricht gesendet",
    texto: "Wir antworten innerhalb von 24 Arbeitsstunden. Wenn es eilt, schreiben Sie uns auf WhatsApp, dann schauen wir sofort.",
  },
  error: {
    titulo: "Das hat nicht geklappt",
    texto: "Bei uns ist etwas schiefgegangen. Schreiben Sie uns direkt, wir lösen das:",
  },
};

export const datosEmpresa = {
  categoria: "Firmendaten",
  titular: "Wer Ihre Nachricht erhält",
  intro: "Aus Transparenz und weil die DSGVO verlangt, dass wir sagen, wer Ihre Daten verarbeitet.",
};
