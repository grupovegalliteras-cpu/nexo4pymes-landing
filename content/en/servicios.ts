/* English version of content/servicios.ts. Same structure; see the Spanish file for the editorial notes. */

export const navServicios = [
  { href: "#servicios", texto: "What we build" },
  { href: "#metodo", texto: "Method" },
  { href: "#caso", texto: "Why diagnosis" },
  { href: "#como-empezar", texto: "How to start" },
  { href: "#faq", texto: "Questions" },
];

export const heroServicios = {
  volver: { texto: "← Back to home", href: "/" },
  titularA: "We don't sell software.",
  titularB: "First we check whether you really need it.",
  parrafo:
    "We're Nexo4Pymes, a small team in Mallorca. We build custom digital solutions for small businesses in any industry: bespoke CRMs, web configurators and integrations. Here's the full detail of what we build, how we work and how to get started.",
  cta: "Message us on WhatsApp",
  indice: [
    { href: "#servicios", texto: "What we build" },
    { href: "#central-avisos", texto: "CentralAvisos" },
    { href: "#metodo", texto: "How we work" },
    { href: "#caso", texto: "Why diagnosis comes first" },
    { href: "#como-empezar", texto: "How to start" },
    { href: "#faq", texto: "Questions" },
  ],
};

export const servicios = {
  categoria: "What we build",
  titular: "Four pieces of software, and you start with one",
  intro:
    "No vague “digital solutions”. This is what gets built, with its scope and its limits. You don't have to order them all: the roadmap decides which one pays off first and in what order the rest follow.",
  tarjetas: [
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "Custom CRMs and management systems",
      texto: "The software that runs your business behind the scenes, built around how you actually work. Not a template you have to bend to.",
      items: [
        "Customers, orders, quotes and history in one place",
        "The statuses and steps are yours, with your names",
        "Permissions per person: everyone sees what they need to see",
        "A dashboard with the business figures, no spreadsheets to reconcile by hand",
        "Replaces scattered Excel files, or lives alongside them for as long as needed",
      ],
    },
    {
      icono: "globo" as const,
      tono: "violeta" as const,
      titulo: "Web configurators and designers",
      texto: "A tool inside your website so the customer can customise, design or price their product without anyone having to attend to them.",
      items: [
        "The customer picks sizes, finishes and options and sees the result instantly",
        "Prices calculated with your rules, your margins and your discounts",
        "A visual preview of what they're putting together, when the product allows it",
        "The request arrives complete: no guessing what the customer wanted",
        "Connected to your management system, so the quote is never typed twice",
      ],
    },
    {
      icono: "reloj" as const,
      tono: "azul" as const,
      titulo: "Time clock and working hours",
      texto: "Everyone clocks in from their own phone and the hours add themselves up. Designed for teams that don't sit in an office.",
      items: [
        "Clock in, clock out and breaks from the phone, with time and location",
        "Hours per person, per week and per project, no timesheets to reconcile",
        "A traceable record: who clocked in, when and from where",
        "Managers see the whole team; each person sees only their own",
        "Check it with your accountant (gestoría): we build the tool, we don't certify compliance",
      ],
    },
    {
      icono: "engranaje" as const,
      tono: "mint" as const,
      titulo: "Automation and AI integrations",
      texto: "The glue between the pieces: your website, your management system and the tools you already use. This is where AI comes in, supporting the process rather than being the product.",
      items: [
        "Sync between your website, your management system and your usual tools",
        "Documents that generate and send themselves: quotes, invoices, delivery notes",
        "Scheduled reminders and follow-ups, so nothing goes cold",
        "Automatic replies to frequent messages, escalated to a person when needed",
        "Reading and sorting documents that someone types in by hand today",
      ],
    },
  ],
};

export const metodoServicios = {
  categoria: "How we work",
  titular: "From the first call to the system up and running",
  intro: "Four steps, no surprises and no twelve-month contracts. You can stop at any of them.",
  pasos: [
    {
      num: "1",
      meta: "15 minutes · video call or WhatsApp",
      titulo: "First call",
      texto:
        "You tell us how the business runs today and what you struggle with every day. We tell you honestly whether this is a fit for you or not. If it isn't, it ends there, no hard feelings.",
    },
    {
      num: "2",
      meta: "3-4 days · in writing",
      titulo: "Diagnosis and roadmap",
      texto:
        "We properly audit how you work: how a customer comes in, how a quote is prepared, where each piece of data lives and what software you already have. It ends in a document with a diagram of how you work today, the software you need ranked by impact and effort, the risks of each piece and the scope of each phase. That document is yours, whether or not you continue with us.",
    },
    {
      num: "3",
      meta: "Phase by phase · approved before starting",
      titulo: "Development and roll-out",
      texto:
        "We build what you've decided, starting with the piece that has the most impact for the least effort. You see the system working as it progresses, not at the end. Each phase is agreed and approved before anything is touched.",
    },
    {
      num: "4",
      meta: "After launch",
      titulo: "Fine-tuning and support",
      texto:
        "The first weeks of real use always bring cases nobody foresaw. The system gets adjusted, whatever gets in the way is fixed and we check the team is actually using it. That's why we work with few clients at a time.",
    },
  ],
};

export const casoDiagnostico = {
  categoria: "Why diagnosis always comes first",
  titular: "Software built on a broken process costs you twice",
  parrafos: [
    "It's the mistake we see again and again. A business keeps things in four different places — a spreadsheet, email, a notebook and one person's head — and asks for “a CRM”. If we build it as it is, you get software that reproduces the same old mess, now with your name on it and the development bill paid.",
    "That's why technology doesn't come first. First we sit down to see how a customer comes in today, who touches what, where things get lost and which parts of your process are worth keeping as they are. Only then do we decide what to build, what to connect and what to leave alone.",
  ],
  cita: "If you don't need custom software, we'll tell you. That's part of the job too.",
};

export const comoEmpezar = {
  categoria: "How to start",
  titular: "Three ways to start, and the first is fifteen minutes",
  intro:
    "One story, the same across the whole website: first we talk, then we analyse how you work and give it to you in writing, and only then does anything get built. Always phase by phase, with you deciding how far to go.",
  paso1: {
    meta: "Step 1 · The call",
    destacado: "15 minutes",
    texto: "A short video call, no commitment and no sales pitch. It's to see whether we're a fit — and sometimes the answer is no.",
  },
  paso2: {
    meta: "Step 2 · The diagnosis",
    destacado: "In writing",
    texto:
      "A full analysis of how you work and a prioritised roadmap, delivered as a document: what software you need, what can wait and what isn't worth building. A real analysis, not a sales call in disguise.",
  },
  paso3: {
    meta: "Step 3 · Optional",
    destacado: "Phase by phase",
    texto:
      "Each piece of the roadmap is approved separately before it starts. You see the system working as it progresses and decide how far to go and when to stop, with no ties and no minimum term.",
  },
  callout: {
    fuerte: "And if you don't continue:",
    texto: "the diagnosis document is still yours, with the full analysis and the roadmap. You can carry it out yourselves or take it to whoever you like.",
  },
};

export const avisosServicios = {
  categoria: "Our own product · in partnership with Multiservicios Mallorca",
  titular: "And one thing that's already built: CentralAvisos",
  parrafo:
    "Everything above is custom-built and starts with a diagnosis. CentralAvisos doesn't: it's our own product and it already works. It collects your calls, WhatsApp messages, emails and website form, and sorts them by urgency on a dashboard that both the office and the technicians can see.",
  nota: "If that's exactly what you're missing, no diagnosis or project needed: you sign up and it's up and running.",
  ctaPrincipal: "Send us AVISOS on WhatsApp",
  ctaSecundario: "See how it works",
};

export const faqServicios = [
  {
    p: "We know nothing about technology. Is that a problem?",
    r: "Quite the opposite: it's the profile we work best with. You bring the business knowledge and we turn it into software. You don't need to understand how it's built inside, and the system comes with a launch session for the team.",
  },
  {
    p: "We already have software. Do we have to throw it away?",
    r: "Not necessarily, and it's decided in the diagnosis. Sometimes what's missing is a piece that connects to what you already have; other times the current software is precisely the problem and it pays to replace it. What we don't do is assume everything has to change.",
  },
  {
    p: "Is the software ours or yours?",
    r: "Yours. The code and the database live in your accounts and you can take them whenever you want, including the day you decide to work with someone else. There's no monthly licence to use it and no platform of ours you can't leave: you commission a development, you don't rent a space.",
  },
  {
    p: "Is there a minimum term or any ties?",
    r: "None. Each phase is agreed and approved separately, and you decide whether there's a next one. If at any point you want to stop, you stop, and what's been built keeps running in your accounts. Ongoing maintenance is optional and can also be dropped.",
  },
  {
    p: "We're not in Mallorca. Do you work remotely?",
    r: "Yes. The whole process — call, diagnosis, development and support — works remotely without any problem. Being close helps, but it isn't essential.",
  },
  {
    p: "How long does it all take?",
    r: "The diagnosis is delivered 3–4 days after the first meeting. Development depends on the phases you choose, which is exactly why we work in phases: the idea is to have the first piece running within weeks, not months. No six-month projects before you see the first result.",
  },
];

export const cierreServicios = {
  titular: "Tell us how you work today",
  texto: "15 minutes on a video call, no commitment. You'll come out knowing whether your business needs its own software — even if the answer is not yet.",
  cta: "Message us on WhatsApp",
  escribir: "Prefer to write? ",
};
