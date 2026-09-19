/* Copy de /servicios — el detalle largo de qué construimos, cómo
   trabajamos y cómo se empieza.

   GIRO DE POSICIONAMIENTO. Esta página describía siete áreas de
   automatización. Ahora describe TRES PIEZAS DE SOFTWARE —
   gestión, configurador e integraciones — porque el producto ya
   no son automatizaciones sueltas, es software a medida. La IA
   entra como tecnología de apoyo dentro de la tercera pieza, no
   como el producto que se vende.

   Lo que se automatizaba antes no se ha perdido: casi todo vive
   ahora dentro del pilar 3, que es su sitio natural.

   REPARTO DE CONTENIDO (del rediseño anterior, sigue vigente):
   · la lista de sectores está en la home (content/inicio.ts),
     donde es un selector interactivo y trabaja mucho más;
   · "quiénes somos", los valores y el bloque de datos y RGPD
     están en /nosotros (content/nosotros.ts);
   · aquí queda lo que de verdad es servicio: el catálogo, el
     método, por qué el diagnóstico va primero y cómo se empieza.

   Las cifras de content/marca.ts (precio, duración) NO se usan en
   esta página: se retiraron todos los importes. Ver el bloque de
   CÓMO SE EMPIEZA más abajo. */

export const navServicios = [
  { href: "#servicios", texto: "Qué construimos" },
  { href: "#metodo", texto: "Método" },
  { href: "#caso", texto: "Por qué diagnóstico" },
  { href: "#como-empezar", texto: "Cómo se empieza" },
  { href: "#faq", texto: "Preguntas" },
];

export const heroServicios = {
  volver: { texto: "← Volver al inicio", href: "/" },
  titularA: "No vendemos software.",
  titularB: "Primero miramos si de verdad os hace falta.",
  parrafo:
    "Somos Nexo4Pymes, un equipo pequeño de Mallorca. Desarrollamos soluciones digitales a medida para pymes de cualquier sector: CRMs propios, configuradores web e integraciones. Aquí está el detalle completo de qué construimos, cómo trabajamos y cómo se empieza.",
  cta: "Escríbenos por WhatsApp",
  indice: [
    { href: "#servicios", texto: "Qué construimos" },
    { href: "#metodo", texto: "Cómo trabajamos" },
    { href: "#caso", texto: "Por qué diagnóstico primero" },
    { href: "#como-empezar", texto: "Cómo se empieza" },
    { href: "#faq", texto: "Preguntas" },
  ],
};

/* Tres tarjetas = una fila exacta en escritorio (lg:grid-cols-3).
   Cada una lleva cinco `items` porque esta es la página del
   detalle: es aquí donde alguien viene a ver el alcance real. */
export const servicios = {
  categoria: "Qué construimos",
  titular: "Tres piezas de software, y se empieza por una",
  intro:
    "Nada de «soluciones digitales». Esto es lo que se construye, con su alcance y sus límites. No hace falta encargar las tres: en el roadmap se decide cuál compensa primero y en qué orden van las demás.",
  tarjetas: [
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "CRMs y sistemas de gestión a medida",
      texto:
        "El programa que lleva vuestro negocio por dentro, construido sobre cómo trabajáis de verdad. No una plantilla a la que os tengáis que amoldar.",
      items: [
        "Clientes, pedidos, presupuestos e historial en un solo sitio",
        "Los estados y los pasos son los vuestros, con vuestros nombres",
        "Permisos por persona: cada uno ve lo que le toca ver",
        "Panel con los números del negocio, sin cuadrar hojas a mano",
        "Sustituye a los Excels dispersos, o convive con ellos mientras haga falta",
      ],
    },
    {
      icono: "globo" as const,
      tono: "violeta" as const,
      titulo: "Configuradores y diseñadores web",
      texto:
        "Una herramienta dentro de vuestra web para que el cliente personalice, diseñe o cotice su producto sin que nadie tenga que atenderle.",
      items: [
        "El cliente elige medidas, acabados y opciones y ve el resultado al momento",
        "Precio calculado con vuestras reglas, vuestros márgenes y vuestros descuentos",
        "Vista previa visual de lo que está montando, cuando el producto lo permite",
        "La solicitud llega ya montada: sin descifrar qué quería el cliente",
        "Se conecta con la gestión, así que el presupuesto no se vuelve a teclear",
      ],
    },
    {
      icono: "engranaje" as const,
      tono: "mint" as const,
      titulo: "Automatización e integraciones con IA",
      texto:
        "El pegamento entre las piezas: la web, el sistema de gestión y las herramientas que ya usáis. Aquí es donde entra la IA, como soporte del proceso y no como producto.",
      items: [
        "Sincronización entre la web, la gestión y vuestras herramientas de siempre",
        "Documentos que se generan y se envían solos: presupuestos, facturas, albaranes",
        "Avisos y seguimientos programados, para que nada se quede frío",
        "Atención automática de mensajes frecuentes, con escalado a una persona",
        "Lectura y clasificación de documentos que hoy alguien teclea a mano",
      ],
    },
  ],
};

export const metodoServicios = {
  categoria: "Cómo trabajamos",
  titular: "De la primera llamada al sistema funcionando",
  intro: "Cinco pasos, sin sorpresas y sin contratos de doce meses. En cualquiera de ellos podéis parar.",
  pasos: [
    {
      num: "1",
      meta: "15 minutos · videollamada",
      titulo: "Llamada inicial",
      texto:
        "Nos contáis cómo funciona el negocio hoy y con qué peleáis cada día. Nosotros os decimos, con honestidad, si esto encaja con vosotros o no. Si no encaja, se acaba aquí y tan amigos.",
    },
    {
      num: "2",
      meta: "Diagnóstico",
      titulo: "Diagnóstico",
      texto:
        "Auditamos de verdad cómo trabajáis: cómo entra un cliente, cómo se prepara un presupuesto, dónde vive cada dato y qué programas tenéis ya. Le dedicamos días de trabajo real y termina en un documento que sirve por sí solo, incluso si después no seguís con nosotros.",
    },
    {
      num: "3",
      meta: "Incluido en el diagnóstico",
      titulo: "Roadmap priorizado",
      texto:
        "Un documento con el diagrama de cómo funcionáis hoy, qué software hace falta de verdad ordenado por impacto y esfuerzo, los riesgos de cada pieza y el alcance de cada fase. Ese documento es vuestro, sigáis o no con nosotros.",
    },
    {
      num: "4",
      meta: "Fase a fase · aprobado antes de empezar",
      titulo: "Desarrollo e implementación",
      texto:
        "Se construye lo que hayáis decidido, empezando por la pieza que más impacto tiene con menos esfuerzo. Vais viendo el sistema funcionar según avanza, no al final. Cada fase se acuerda y se aprueba antes de tocar nada.",
    },
    {
      num: "5",
      meta: "Después de arrancar",
      titulo: "Ajuste y acompañamiento",
      texto:
        "Las primeras semanas de uso real siempre aparecen casos que no habíamos previsto. Se ajusta el sistema, se corrige lo que estorba y se comprueba que el equipo lo está usando. Por eso trabajamos con pocos clientes a la vez.",
    },
  ],
};

export const casoDiagnostico = {
  categoria: "Por qué el diagnóstico va siempre primero",
  titular: "Un software hecho sobre un proceso roto sale caro dos veces",
  parrafos: [
    "Es el error que vemos una y otra vez. Un negocio lleva las cosas en cuatro sitios distintos —una hoja de cálculo, el correo, un cuaderno y la cabeza de una persona— y pide «un CRM». Si lo construimos tal cual, sale un programa que reproduce el desorden de siempre, pero ahora con vuestro nombre encima y con la factura del desarrollo pagada.",
    "Por eso lo primero no es la tecnología. Es sentarnos a ver cómo entra un cliente hoy, quién toca qué, dónde se pierde y qué parte de vuestro proceso vale la pena conservar tal cual. Solo después decidimos qué construir, qué conectar y qué no tocar.",
  ],
  cita: "Si no os hace falta software a medida, os lo diremos. Eso también es parte del trabajo.",
};

/* Aquí vivía `sectores`, con las veterinarias como especialidad
   destacada y tres grupos genéricos debajo. Se ha ido entero a la
   home (content/inicio.ts → `sectoresInicio`), convertido en el
   selector interactivo: allí las veterinarias son un sector más
   entre seis y el mensaje pasa a ser adaptabilidad, que es lo que
   pedía el rediseño. */

/* ============================================================
   CÓMO SE EMPIEZA

   Esta sección NO habla de dinero. Ni cifras, ni "gratis", ni
   "se paga", ni presupuestos: fue una petición explícita. Las tres
   tarjetas describen QUÉ es cada paso, no lo que cuesta —
   duración, formato y ritmo:

     15 minutos · Por escrito · Fase a fase

   Si alguien vuelve a meter aquí importes o la palabra "pago",
   está deshaciendo una decisión deliberada, no arreglando un
   olvido. Las cifras se dan en la llamada.

   La misma regla se aplica ya a la home (content/inicio.ts).

   El historial de git tiene la versión con precios, por si algún
   día se quieren recuperar.
   ============================================================ */
export const comoEmpezar = {
  categoria: "Cómo se empieza",
  titular: "Tres pasos, y el primero son quince minutos",
  intro:
    "Una sola historia, la misma en toda la web: primero hablamos, después analizamos cómo trabajáis y os lo entregamos por escrito, y solo entonces se construye. Siempre fase a fase, y decidiendo vosotros hasta dónde llegar.",
  paso1: {
    meta: "Paso 1 · La llamada",
    destacado: "15 minutos",
    texto:
      "Videollamada corta, sin compromiso y sin presentación comercial. Sirve para ver si encajamos — y a veces la conclusión es que no.",
  },
  paso2: {
    meta: "Paso 2 · El diagnóstico",
    destacado: "Por escrito",
    texto:
      "Análisis completo de cómo trabajáis y un roadmap priorizado, entregado en un documento: qué software hace falta, qué puede esperar y qué no merece la pena construir. Un análisis de verdad, no una llamada de venta disfrazada.",
  },
  paso3: {
    meta: "Paso 3 · Opcional",
    destacado: "Fase a fase",
    texto:
      "Cada pieza del roadmap se aprueba por separado antes de empezar. Vais viendo el sistema funcionar según avanza y decidís cuánto avanzar y cuándo parar, sin ataduras ni permanencia.",
  },
  callout: {
    fuerte: "Y si no seguís:",
    texto:
      "el documento del diagnóstico es vuestro igualmente, con el análisis completo y el roadmap. Podéis ejecutarlo por vuestra cuenta o llevárselo a quien queráis.",
  },
};



/* `quienesSomos` y `datosRgpd` vivían aquí, al final de /servicios,
   donde solo llegaba quien ya se había leído el catálogo entero.
   Ahora son la página /nosotros (content/nosotros.ts), que el brief
   pedía por separado, y allí están además ampliados. */

export const faqServicios = [
  {
    p: "No sabemos nada de tecnología. ¿Es un problema?",
    r: "Al revés: es el perfil con el que mejor trabajamos. Vosotros ponéis el conocimiento del negocio y nosotros lo convertimos en software. No hay que entender cómo está hecho por dentro, y el sistema se entrega con una sesión de puesta en marcha para el equipo.",
  },
  {
    p: "Ya tenemos un programa. ¿Hay que tirarlo?",
    r: "No necesariamente, y se decide en el diagnóstico. A veces lo que falta es una pieza que se conecta con lo que ya tenéis; otras, el programa actual es justo el problema y sale más a cuenta sustituirlo. Lo que no hacemos es dar por hecho que hay que cambiarlo todo.",
  },
  {
    p: "¿El software es nuestro o vuestro?",
    r: "Vuestro. El código y la base de datos viven en vuestras cuentas y os los podéis llevar cuando queráis, incluido el día que decidáis trabajar con otro. No hay licencia mensual por usarlo ni una plataforma nuestra de la que no se pueda salir: encargáis un desarrollo, no alquiláis un sitio.",
  },
  {
    p: "¿Hay permanencia o ataduras?",
    r: "Ninguna. Cada fase se acuerda y se aprueba por separado, y decidís vosotros si hay una siguiente. Si en algún momento queréis parar, paráis, y lo construido se queda funcionando en vuestras cuentas. El mantenimiento posterior es opcional y también se puede dejar.",
  },
  {
    p: "Estamos fuera de Mallorca. ¿Trabajáis en remoto?",
    r: "Sí. Todo el proceso — llamada, diagnóstico, desarrollo y acompañamiento — se hace en remoto sin problema. Estar cerca ayuda, pero no es imprescindible.",
  },
  {
    p: "¿Cuánto tarda todo?",
    r: "El diagnóstico se entrega en 3–4 días desde la reunión inicial. El desarrollo depende de las fases que elijáis, y por eso se trabaja por fases: la idea es que la primera pieza esté en marcha en cuestión de semanas, no de meses. Nada de proyectos de medio año antes de ver el primer resultado.",
  },
];

export const cierreServicios = {
  titular: "Contadnos cómo trabajáis hoy",
  texto:
    "15 minutos por videollamada, sin compromiso. Salís de ahí sabiendo si vuestro negocio necesita software propio — aunque la respuesta sea que todavía no.",
  cta: "Escríbenos por WhatsApp",
  escribir: "¿Preferís escribir? ",
};
