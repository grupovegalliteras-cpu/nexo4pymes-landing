/* English version of the parts of content/inicio.ts still in use (the old home page now is the demo). */

export const centralAvisos = {
  categoria: "Our own product · in partnership with Multiservicios Mallorca",
  titular: "Are you missing requests while you're out working?",
  parrafo:
    "CentralAvisos collects your calls, WhatsApp messages, emails and website form, and sorts them by urgency on a dashboard that both the office and the technicians can see. You keep your number and your way of working.",
  puntos: [
    { icono: "mensaje" as const, titulo: "Everything comes in through one place", texto: "Answered and missed calls, WhatsApp, email and web. Without anyone writing anything down." },
    { icono: "campana" as const, titulo: "What's urgent, on top", texto: "Each request arrives with its urgency set. You just read the list from top to bottom." },
    { icono: "reloj" as const, titulo: "The whole day, at nine", texto: "What came in, what's still open and what's ready to invoice." },
  ],
  condiciones: ["From €89/month", "No minimum term", "Your usual number", "Data hosted in the EU"],
  ctaPrincipal: "Send us AVISOS on WhatsApp",
  ctaSecundario: "See how it works",
};

/* Before / after. Pairs are aligned by index: antes[i] and despues[i]
   talk about the same thing. See content/inicio.ts for the Spanish original
   and the reasoning. */
export const antesDespues = {
  categoria: "Before and after",
  titular: "The same business, two ways of running it",
  intro:
    "What you sell and who sells it does not change. What changes is whether the tool fits the way you work, or whether you are the one fitting the tool.",
  antes: {
    etiqueta: "Today, without custom software",
    resumen: "You adapt to the software",
    filas: [
      { titulo: "The software is in charge", texto: "You pay a licence for a rigid program and end up working the way it wants, not the way you need." },
      { titulo: "Your data, scattered across spreadsheets", texto: "One file for each thing, versions that do not match and nobody knows which one is right." },
      { titulo: "Quotes are put together by hand", texto: "Look up prices, do the maths, write the PDF and send it. Every one from scratch again." },
      { titulo: "Every tool goes its own way", texto: "What gets written in one never reaches the other. Somebody types it in again." },
      { titulo: "What makes you different does not fit", texto: "Your own way of working ends up happening outside the program, in loose notes." },
    ],
  },
  despues: {
    etiqueta: "With software built for you",
    resumen: "The system fits the way you work",
    filas: [
      { titulo: "The software fits you", texto: "It is built on your real process. If the way you work is unusual, the system understands it." },
      { titulo: "One place, one number", texto: "Customers, orders and history in one place. The number it shows is the number there is." },
      { titulo: "Your customer quotes themselves, on your website", texto: "They choose, configure and see the price straight away, with your rules and your margins." },
      { titulo: "Everything in sync, with no typing", texto: "What comes in through the website shows up in your management system. No copy and paste between programs." },
      { titulo: "Your way of working, inside the system", texto: "What sets you apart stops being a manual exception and becomes part of the system." },
    ],
  },
  nota: "It does not all get built at once: the diagnosis decides which piece pays off first and which can wait.",
};
