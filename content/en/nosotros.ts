/* English version of content/nosotros.ts */

export const navNosotros = [
  { href: "#historia", texto: "Who we are" },
  { href: "#valores", texto: "How we work" },
  { href: "#datos", texto: "Data and GDPR" },
];

export const heroNosotros = {
  categoria: "Who we are",
  titularA: "A small team",
  titularB: "from Mallorca",
  parrafo: "No glass office and no sales department. We're the same people who take the call, do the diagnosis and write the code.",
  cta: "Message us on WhatsApp",
  micro: "15 min · no commitment · no card",
};

export const historia = {
  categoria: "The idea",
  titular: "Most small businesses don't need yet another program",
  parrafos: [
    "Nexo4Pymes was born from a simple idea: most small businesses don't need another generic tool to adapt to, they need someone to look at how they work and build what they're missing. This sector has plenty of spectacular demos and too few people who sit down to understand the business before selling anything.",
    "We're a small team and work with a limited number of clients at a time. It isn't fake scarcity: it's the only way to stay on top of the weeks after launch, which is when it's really decided whether a system gets used or abandoned.",
    "We speak the language of business, not technical jargon. If at any point you don't understand something we tell you, that's our fault, not yours.",
  ],
  hechos: [
    { valor: "Mallorca", etiqueta: "Where we work from" },
    { valor: "All of Spain", etiqueta: "Where we serve clients, remotely" },
    { valor: "3", etiqueta: "Projects at a time, at most" },
  ],
};

export const valores = {
  categoria: "How we work",
  titular: "Four rules we don't negotiate",
  intro: "These aren't values for the wall. They're decisions that cost us money now and then, and we still keep making them.",
  lista: [
    {
      icono: "lupa" as const,
      titulo: "Diagnosis before product",
      texto: "We never start with the tool. Software built on a broken process leaves it just as broken, only now it's paid for. First we look at how you work; then we decide what to build.",
    },
    {
      icono: "verificado" as const,
      titulo: "Saying no when it's right",
      texto: "If the diagnosis says nothing needs building, we write it in the report. We'd rather lose a sale than leave someone with a system they don't use.",
    },
    {
      icono: "escudo" as const,
      titulo: "The system ends up being yours",
      texto: "The code and data stay in your accounts, with no monthly licence to use it. If one day you want to carry on without us, you take it with you and there's nothing to rescue.",
    },
    {
      icono: "reloj" as const,
      titulo: "Few clients at a time",
      texto: "We'd rather do three projects well than start ten and finish none. The weeks after launch are the ones that decide whether something works.",
    },
  ],
};

export const enfoquePyme = {
  categoria: "Our approach",
  titular: "Why we only work with small businesses",
  parrafos: [
    "A large company has an IT department, an annual budget and six months for a pilot. A small business has one admin person doing four things at once and needs the new thing to work now, not in a year.",
    "They're two different jobs. We do the second: custom software built in short phases, which starts giving time back from the first one and doesn't force you to stop the business to roll it out.",
  ],
  contraste: [
    {
      etiqueta: "What we don't do",
      bien: false,
      items: [
        "Six-month projects before you see the first result",
        "Minimum terms: neither on projects nor on subscriptions",
        "Keeping your data if you leave one day",
        "Building before understanding how the business works",
      ],
    },
    {
      etiqueta: "What we do",
      bien: true,
      items: [
        "Short phases, approved separately, with visible results",
        "The system deployed in your accounts, and yours",
        "A report that's useful even if you don't continue with us",
        "Plain language, not consultancy jargon",
      ],
    },
  ],
};

export const datosRgpd = {
  categoria: "Data and GDPR",
  titular: "What happens to your customers' information",
  intro: "It's the most frequent question and the one least clearly answered in this sector. Here's the answer.",
  tarjetas: [
    {
      icono: "escudo" as const,
      titulo: "The data stays yours",
      texto: "The system is deployed in your own accounts. We don't take a copy of your customer base anywhere.",
    },
    {
      icono: "documento" as const,
      titulo: "Data processing agreement",
      texto: "Before starting we sign the agreement the GDPR requires, which sets out in writing what data we access and why.",
    },
    {
      icono: "info" as const,
      titulo: "What's touched and what isn't",
      texto:
        "In the diagnosis we set out in writing which information the system uses and which it never touches. Sensitive information — records, health data, confidential documents — stays out of what the AI processes unless expressly agreed, with the appropriate safeguards.",
    },
    {
      icono: "verificado" as const,
      titulo: "You can cut off access whenever you like",
      texto: "Because the system lives in your accounts, revoking our access is a single click. No minimum term and no data held hostage.",
    },
  ],
  pie: {
    texto: "The full legal detail, in case you need it",
    enlace: { texto: "Legal notice and privacy", href: "/legal" },
  },
};

export const cierreNosotros = {
  titular: "Shall we talk for 15 minutes?",
  texto: "Tell us how your business runs and we'll tell you honestly whether you need your own software. No sales pitch and no commitment.",
  cta: "Message us on WhatsApp",
  finePrint: "Free, no commitment · 15 min",
  alternativa: { texto: "Or write to us and we'll look at it in writing", href: "/contacto" },
};
