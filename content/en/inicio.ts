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
