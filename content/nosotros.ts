/* ============================================================
   COPY DE /nosotros

   El brief pedía "Sobre Nosotros" como página propia: historia,
   valores y enfoque centrado en la pyme. Antes esto eran dos
   secciones enterradas al final de /servicios, donde solo llegaba
   quien ya se había leído el catálogo entero.

   El bloque de datos y RGPD viene con ellas: es material de
   confianza, no de catálogo, y aquí es donde alguien lo busca.

   Texto conservado del original donde seguía siendo cierto. Lo
   único reescrito es lo que hablaba de especialidad veterinaria.
   ============================================================ */

export const navNosotros = [
  { href: "#historia", texto: "Quiénes somos" },
  { href: "#valores", texto: "Cómo trabajamos" },
  { href: "#datos", texto: "Datos y RGPD" },
];

export const heroNosotros = {
  categoria: "Quiénes somos",
  titularA: "Un equipo pequeño",
  titularB: "de Mallorca",
  parrafo:
    "Sin oficina de cristal ni departamento comercial. Somos las mismas personas que atienden la llamada, hacen el diagnóstico y montan la automatización.",
  cta: "Agendar llamada gratis",
  micro: "15 min · sin compromiso · sin tarjeta",
};

export const historia = {
  categoria: "La idea",
  titular: "La mayoría de pymes no necesita un producto de IA",
  parrafos: [
    "Nexo4Pymes nació de una idea sencilla: la mayoría de pymes no necesitan un producto de IA, necesitan que alguien mire cómo trabajan y les diga por dónde empezar. En este sector sobran demos espectaculares y falta gente que se siente a entender el negocio antes de vender nada.",
    "Somos pocos y trabajamos con un número limitado de clientes a la vez. No es falsa escasez: es la única forma de estar encima las semanas siguientes al lanzamiento, que es cuando de verdad se decide si una automatización funciona o se abandona.",
    "Hablamos en lenguaje de negocio, no en jerga técnica. Si en algún momento no entendéis algo de lo que os contamos, es culpa nuestra, no vuestra.",
  ],
  /* Hitos verificables, sin cifras de facturación ni de clientes que
     no podamos respaldar. */
  hechos: [
    { valor: "Mallorca", etiqueta: "Desde donde trabajamos" },
    { valor: "Toda España", etiqueta: "Donde damos servicio, en remoto" },
    { valor: "3", etiqueta: "Proyectos a la vez, como máximo" },
  ],
};

export const valores = {
  categoria: "Cómo trabajamos",
  titular: "Cuatro reglas que no negociamos",
  intro:
    "No son valores de pared. Son decisiones que nos cuestan dinero de vez en cuando y que aun así seguimos tomando.",
  lista: [
    {
      icono: "lupa" as const,
      titulo: "Diagnóstico antes que producto",
      texto:
        "Nunca empezamos por la herramienta. Si el proceso está roto, automatizarlo solo lo rompe más rápido. Primero se mira cómo trabajáis; después se decide qué tocar.",
    },
    {
      icono: "verificado" as const,
      titulo: "Decir que no cuando toca",
      texto:
        "Si el diagnóstico dice que no compensa automatizar, lo escribimos en el informe. Preferimos perder una venta que dejar a alguien con un sistema que no usa.",
    },
    {
      icono: "escudo" as const,
      titulo: "Nada de cajas negras",
      texto:
        "Todo se monta sobre vuestras cuentas y vuestras herramientas. Si un día queréis seguir sin nosotros, no os quedáis atrapados ni tenéis que rescatar nada.",
    },
    {
      icono: "reloj" as const,
      titulo: "Pocos clientes a la vez",
      texto:
        "Preferimos hacer bien tres proyectos que empezar diez y no acabar ninguno. Las semanas posteriores al lanzamiento son las que deciden si algo funciona.",
    },
  ],
};

export const enfoquePyme = {
  categoria: "Nuestro enfoque",
  titular: "Por qué solo trabajamos con pymes",
  parrafos: [
    "Una empresa grande tiene departamento de sistemas, presupuesto anual y seis meses para un piloto. Una pyme tiene a la persona de administración haciendo cuatro cosas a la vez y necesita que lo nuevo funcione la semana que viene.",
    "Son dos trabajos distintos. Nosotros hacemos el segundo: soluciones que se montan encima de lo que ya tenéis, que se pagan por fases y que empiezan a devolver tiempo desde la primera.",
  ],
  contraste: [
    {
      etiqueta: "Lo que no hacemos",
      bien: false,
      items: [
        "Proyectos de seis meses antes de ver el primer resultado",
        "Cuotas mensuales obligatorias con permanencia",
        "Plataformas propias de las que luego no se puede salir",
        "Vender antes de entender cómo funciona el negocio",
      ],
    },
    {
      etiqueta: "Lo que sí",
      bien: true,
      items: [
        "Fases cortas, con precio cerrado y resultado visible",
        "Todo montado sobre vuestras cuentas y herramientas",
        "Un informe que os sirve incluso si no seguís con nosotros",
        "Hablar en castellano, no en jerga de consultoría",
      ],
    },
  ],
};

export const datosRgpd = {
  categoria: "Datos y RGPD",
  titular: "Qué pasa con la información de vuestros clientes",
  intro: "Es la pregunta que más se repite y la que menos se contesta claro en este sector. Aquí está la respuesta.",
  tarjetas: [
    {
      icono: "escudo" as const,
      titulo: "Los datos siguen siendo vuestros",
      texto:
        "Todo se monta sobre vuestras propias cuentas y herramientas. Nosotros no nos llevamos una copia de vuestra base de clientes a ningún sitio.",
    },
    {
      icono: "documento" as const,
      titulo: "Contrato de encargado del tratamiento",
      texto:
        "Antes de empezar se firma el contrato que exige el RGPD, donde queda por escrito a qué datos accedemos y para qué.",
    },
    {
      icono: "info" as const,
      titulo: "Qué se toca y qué no",
      texto:
        "En el diagnóstico dejamos por escrito qué información usa el sistema y cuál no toca nunca. La información sensible —historiales, datos de salud, documentación confidencial— queda fuera de lo que gestiona el agente salvo que se acuerde expresamente y con las garantías que toquen.",
    },
    {
      icono: "verificado" as const,
      titulo: "Podéis cortar el acceso cuando queráis",
      texto:
        "Como todo está en vuestras cuentas, revocarnos el acceso es cuestión de un clic. No hay permanencia ni datos secuestrados.",
    },
  ],
  pie: {
    texto: "El detalle legal completo, por si lo necesitáis",
    enlace: { texto: "Aviso legal y privacidad", href: "/legal" },
  },
};

export const cierreNosotros = {
  titular: "¿Hablamos 15 minutos?",
  texto:
    "Nos contáis cómo funciona vuestro negocio y os decimos con honestidad si automatizar algo tiene sentido. Sin presentación comercial y sin compromiso.",
  cta: "Agendar llamada gratis",
  finePrint: "Gratis y sin compromiso · 15 min",
  alternativa: { texto: "O escribidnos y lo vemos por escrito", href: "/contacto" },
};
