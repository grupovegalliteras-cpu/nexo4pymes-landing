/* ============================================================
   COPY DE LA HOME GENERAL (/)
   Antes esta portada era la landing veterinaria. Con el giro de
   posicionamiento, la home deja de hablar de un solo sector: se
   dirige a cualquier pyme y usa los sectores como PRUEBA de
   adaptabilidad, no como especialidad.

   La landing veterinaria no se ha perdido: vive en
   /sectores/veterinarias y se llega a ella desde el selector de
   sectores, como una más.

   Regla de escritura heredada del rediseño móvil y respetada aquí:
   ningún bloque de texto corrido pasa de ~40 palabras, y las
   tarjetas se quedan en título + una línea corta. Las cifras que
   viven en content/marca.ts no se repiten a mano.
   ============================================================ */

export const navInicio = [
  { href: "#cambio", texto: "Qué cambia" },
  { href: "#servicios", texto: "Servicios" },
  { href: "#sectores", texto: "Sectores" },
  { href: "#proceso", texto: "Proceso" },
  { href: "#faq", texto: "Preguntas" },
];

export const heroInicio = {
  categoria: "Automatización con IA para pymes",
  titularA: "Vuestro equipo hace a mano",
  titularB: "lo que una IA ya hace sola",
  parrafo:
    "Automatizamos los procesos repetitivos de vuestra empresa —atención al cliente, citas, administración, seguimiento— sobre las herramientas que ya usáis. Sin cambiar de programa y sin permanencia.",
  ctaPrincipal: "Agendar llamada gratis",
  ctaSecundario: { texto: "Ver qué automatizamos ↓", href: "#servicios" },
  micro: "15 min · sin compromiso · sin tarjeta",
  /* Cifras del SERVICIO, no resultados de cliente inventados. Cada
     una es verificable contra lo que ofrecemos. */
  metricas: [
    { valor: "0€", etiqueta: "La primera llamada" },
    { valor: "3-4", etiqueta: "Días de diagnóstico" },
    { valor: "24/7", etiqueta: "Atención sin turnos" },
  ],
};

/* Píldoras de la marquesina bajo el hero. Compromisos, no promesas
   de resultado. */
export const garantiasInicio = [
  "Sin permanencia",
  "Sobre vuestras herramientas",
  "El informe es vuestro",
  "Precio cerrado por fase",
];

/* ------------------------------------------------------------
   ANTES / DESPUÉS — el "problema vs solución" del brief.
   Se pintan como dos columnas comparadas en escritorio y como un
   conmutador de dos estados en móvil. Los pares están alineados
   por índice: antes[i] y despues[i] hablan de lo mismo.
   ------------------------------------------------------------ */
export const antesDespues = {
  categoria: "Antes y después",
  titular: "El mismo negocio, dos formas de funcionar",
  intro:
    "No cambia lo que vendéis ni quién lo vende. Cambia cuánto trabajo manual hace falta para que salga adelante.",
  antes: {
    etiqueta: "Hoy, sin automatizar",
    resumen: "El negocio depende de que alguien esté disponible",
    filas: [
      {
        titulo: "Los mensajes se acumulan",
        texto: "Se contesta cuando se puede. El cliente que no recibe respuesta pregunta en otro sitio.",
      },
      {
        titulo: "La agenda se cuadra a mano",
        texto: "Apuntar, mover, confirmar y volver a llamar. Horas que no facturan.",
      },
      {
        titulo: "El papeleo se hace de noche",
        texto: "Facturas, presupuestos y recordatorios de cobro fuera de horario.",
      },
      {
        titulo: "Los datos están repartidos",
        texto: "Un Excel, un cuaderno y la cabeza de una persona. Nadie sabe el número real.",
      },
      {
        titulo: "El seguimiento se olvida",
        texto: "El presupuesto enviado hace tres semanas que nadie ha vuelto a tocar.",
      },
    ],
  },
  despues: {
    etiqueta: "Con procesos automatizados",
    resumen: "El negocio sigue funcionando aunque nadie mire el móvil",
    filas: [
      {
        titulo: "Se contesta al momento",
        texto: "Un agente responde en vuestro canal de siempre, con vuestro tono y vuestros límites.",
      },
      {
        titulo: "La cita se pone sola",
        texto: "Sobre huecos reales de vuestro calendario. Sin dobles reservas.",
      },
      {
        titulo: "El papeleo se dispara solo",
        texto: "Factura emitida, enviada y con recordatorio de cobro sin abrir nada.",
      },
      {
        titulo: "Un sitio, un dato",
        texto: "Ficha de cliente con su historial. Consultable por quien lo necesite.",
      },
      {
        titulo: "Nada se queda frío",
        texto: "Cada presupuesto y cada lead tiene su seguimiento programado.",
      },
    ],
  },
  nota: "Ninguna de estas piezas se contrata a ciegas: en el diagnóstico se decide cuáles compensan en vuestro caso y en qué orden.",
};

/* ------------------------------------------------------------
   SERVICIOS DESTACADOS — módulos de la home. La versión larga y
   detallada vive en /servicios; aquí solo el titular de cada área.
   ------------------------------------------------------------ */
export const serviciosInicio = {
  categoria: "Servicios",
  titular: "Qué automatizamos, en concreto",
  intro:
    "Nada de «soluciones de IA». Esta es la lista de cosas que dejan de hacerse a mano. No se contrata todo: se elige en el roadmap qué merece la pena y en qué orden.",
  tarjetas: [
    {
      icono: "mensaje" as const,
      tono: "azul" as const,
      titulo: "Atención al cliente con IA",
      texto: "Un agente contesta WhatsApp, email o web con vuestro tono y escala a una persona cuando toca.",
      metrica: "Respuesta en segundos, a cualquier hora",
    },
    {
      icono: "agenda" as const,
      tono: "violeta" as const,
      titulo: "Citas y reservas",
      texto: "Agendar, mover y cancelar sobre los huecos reales de vuestro calendario.",
      metrica: "Sin dobles reservas ni huecos fantasma",
    },
    {
      icono: "documento" as const,
      tono: "mint" as const,
      titulo: "Administración y facturación",
      texto: "Facturas, presupuestos, recordatorios de cobro y registro de gastos, sin abrir Excel.",
      metrica: "El papeleo deja de ser trabajo de sábado",
    },
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "Captación y gestión de leads",
      texto: "Cada contacto entra en una ficha, se clasifica y se le hace seguimiento sin que nadie lo recuerde.",
      metrica: "Ningún presupuesto se queda frío",
    },
    {
      icono: "grafico" as const,
      tono: "violeta" as const,
      titulo: "Datos y cuadro de mando",
      texto: "Los números del negocio en un sitio: qué entra, de dónde viene y qué se convierte.",
      metrica: "Decidir con datos, no con sensaciones",
    },
    {
      icono: "globo" as const,
      tono: "mint" as const,
      titulo: "Presencia online y contenido",
      texto: "Web, ficha de Google y redes. A veces el cuello de botella no es atender: es que no os encuentran.",
      metrica: "Publicación automática en varios canales",
    },
  ],
  pie: {
    texto: "Cada servicio, explicado con su alcance y sus límites",
    enlace: { texto: "Ver el detalle de servicios", href: "/servicios" },
  },
};

/* ------------------------------------------------------------
   SECTORES — el selector interactivo. Sustituye a la antigua
   sección "nuestra especialidad son las veterinarias".

   `href` solo lo tienen los sectores con landing propia. El resto
   son casos de uso, no páginas.
   ------------------------------------------------------------ */
export const sectoresInicio = {
  categoria: "A quién ayudamos",
  titular: "La misma tecnología, aplicada a vuestro sector",
  intro:
    "El proceso que se automatiza cambia mucho de un negocio a otro. El método para decidir cuál automatizar, no. Elegid el que más se parezca al vuestro.",
  sectores: [
    {
      id: "profesionales",
      icono: "documento" as const,
      nombre: "Servicios profesionales",
      ejemplos: "Asesorías, despachos, consultoras, arquitectura",
      dolor: "Horas facturables que se van en perseguir documentación, agendar reuniones y recordar vencimientos.",
      automatizaciones: [
        "Recogida y recordatorio automático de documentación de cliente",
        "Alta de expediente y ficha de cliente sin teclear dos veces",
        "Avisos de vencimientos y renovaciones antes de que lleguen",
      ],
      resultado: "El equipo dedica su tiempo al criterio, no a perseguir papeles.",
    },
    {
      id: "comercio",
      icono: "globo" as const,
      nombre: "Comercio y retail",
      ejemplos: "Tiendas, distribuidores, ecommerce, mayoristas",
      dolor: "Un móvil que no para: disponibilidad, precios, plazos y estado del pedido, cien veces al día.",
      automatizaciones: [
        "Agente que responde stock, precios, plazos y estado del pedido",
        "Recuperación de carritos y presupuestos sin cerrar",
        "Publicación de catálogo y contenido en varias redes a la vez",
      ],
      resultado: "Se atiende fuera de horario sin ampliar plantilla.",
    },
    {
      id: "salud",
      icono: "escudo" as const,
      nombre: "Salud y bienestar",
      ejemplos: "Fisioterapia, dental, psicología, estética, nutrición",
      dolor: "Ausencias que dejan el hueco vacío y una recepción que no da abasto entre paciente y paciente.",
      automatizaciones: [
        "Citas y cambios de cita sin pasar por recepción",
        "Recordatorios a 24 h y 1 h para bajar las ausencias",
        "Seguimiento post-visita y recuperación de pacientes inactivos",
      ],
      resultado: "Menos huecos vacíos y una recepción que puede atender a quien tiene delante.",
      nota: "Los historiales clínicos quedan siempre fuera de lo que gestiona el agente.",
    },
    {
      id: "veterinarias",
      icono: "vacuna" as const,
      nombre: "Clínicas veterinarias",
      ejemplos: "Clínicas, hospitales veterinarios, centros de referencia",
      dolor: "El WhatsApp lo absorbe todo: citas, dudas de dosis, fotos y pedidos en el mismo chat.",
      automatizaciones: [
        "Agente que agenda en vuestro Google Calendar sin cambiar de programa",
        "Avisos de vacunas y desparasitaciones con reserva en el mismo mensaje",
        "Recordatorios de cita para reducir las ausencias",
      ],
      resultado: "Ingresos recurrentes que dejan de perderse por no avisar a tiempo.",
      /* Único sector con landing propia: es donde tenemos el sistema
         montado y probado, y la página se sigue usando en captación. */
      href: "/sectores/veterinarias",
      enlaceTexto: "Ver la página completa del sector",
    },
    {
      id: "logistica",
      icono: "mapa" as const,
      nombre: "Logística y transporte",
      ejemplos: "Transportistas, última milla, almacenes, mudanzas",
      dolor: "Media jornada contestando «¿dónde está mi pedido?» y cuadrando rutas por teléfono.",
      automatizaciones: [
        "Avisos automáticos de estado y ventana de entrega",
        "Alta de incidencias sin llamada, con su seguimiento",
        "Partes y albaranes que se registran solos",
      ],
      resultado: "Menos llamadas entrantes y trazabilidad sin trabajo extra.",
    },
    {
      id: "oficios",
      icono: "herramienta" as const,
      nombre: "Oficios y servicios a domicilio",
      ejemplos: "Reformas, instaladores, talleres, mantenimiento",
      dolor: "Presupuestos que se envían y nadie vuelve a tocar. Visitas que se cuadran a base de llamadas perdidas.",
      automatizaciones: [
        "Cualificación del trabajo antes de mover una furgoneta",
        "Presupuesto enviado con seguimiento automático a los días",
        "Confirmación de visita y aviso de llegada al cliente",
      ],
      resultado: "Menos desplazamientos en balde y presupuestos que se cierran.",
    },
  ],
};

/* ------------------------------------------------------------
   PROCESO — cuatro pasos. Versión corta del método de /servicios,
   que tiene cinco: aquí "roadmap" va dentro de "diagnóstico"
   porque es el entregable del mismo paso.
   ------------------------------------------------------------ */
export const procesoInicio = {
  categoria: "Cómo trabajamos",
  titular: "De la primera llamada a la primera automatización funcionando",
  intro: "Cuatro pasos, sin sorpresas y sin contratos de doce meses. En cualquiera de ellos podéis parar.",
  pasos: [
    {
      num: "01",
      meta: "15 minutos · gratis",
      titulo: "Llamada inicial",
      texto:
        "Nos contáis cómo funciona el negocio y qué es lo que más os quema. Os decimos con honestidad si esto encaja. Si no encaja, se acaba aquí y no habéis pagado nada.",
    },
    {
      num: "02",
      meta: "3-4 días · de pago",
      titulo: "Diagnóstico y roadmap",
      texto:
        "Auditamos cómo entra un cliente, cómo se agenda, cómo se cobra y cómo os encuentran. Salís con un documento: oportunidades ordenadas por impacto y esfuerzo, riesgos y coste de cada fase.",
    },
    {
      num: "03",
      meta: "Fase a fase · precio cerrado",
      titulo: "Implementación",
      texto:
        "Se construye lo decidido, empezando por lo que más impacto tiene con menos esfuerzo. Cada fase se presupuesta y se aprueba antes de tocar nada. Nunca todo de golpe.",
    },
    {
      num: "04",
      meta: "Después de encender",
      titulo: "Ajuste y medición",
      texto:
        "Las primeras semanas siempre aparecen casos no previstos. Se afinan las respuestas, se corrigen los límites y se mide si de verdad funciona.",
    },
  ],
  callout: {
    fuerte: "Si el diagnóstico dice que no compensa automatizar,",
    texto: "lo escribimos en el informe. Preferimos perder una venta que dejaros con un sistema que no vais a usar.",
  },
};

/* ------------------------------------------------------------
   PRUEBA SOCIAL

   IMPORTANTE — LEER ANTES DE TOCAR ESTE BLOQUE:
   Aquí NO hay testimonios inventados. Nexo4Pymes es una empresa
   joven y publicar opiniones ficticias con nombre y empresa es
   publicidad engañosa (y, si alguien lo comprueba, el daño de
   reputación es mucho mayor que el beneficio).

   Mientras no haya testimonios reales firmados, esta sección
   muestra COMPROMISOS verificables, que es prueba social honesta.
   Cuando tengáis la primera opinión real:
     1. rellenad `testimonios` con { cita, nombre, cargo, empresa }
     2. la sección cambia sola de formato — el componente ya
        detecta si el array tiene contenido.
   ------------------------------------------------------------ */
export const pruebaInicio = {
  categoria: "Cómo trabajamos con vosotros",
  titular: "Lo que nos comprometemos a cumplir",
  intro:
    "Somos una empresa joven y preferimos decirlo a rellenar esta sección con opiniones de nadie. Esto es lo que sí podéis exigirnos por escrito desde el primer día.",
  compromisos: [
    {
      icono: "verificado" as const,
      titulo: "Os diremos que no si toca",
      texto: "Si automatizar no compensa en vuestro caso, va escrito en el informe. También cuando eso signifique no vender nada.",
    },
    {
      icono: "escudo" as const,
      titulo: "Nada de cajas negras",
      texto: "Todo se monta sobre vuestras cuentas y vuestras herramientas. Si un día seguís sin nosotros, no os quedáis atrapados.",
    },
    {
      icono: "documento" as const,
      titulo: "El informe es vuestro",
      texto: "Sigáis o no con la implementación, el análisis y el roadmap se quedan con vosotros. Sin letra pequeña.",
    },
    {
      icono: "reloj" as const,
      titulo: "Pocos clientes a la vez",
      texto: "Preferimos hacer bien tres proyectos que empezar diez. Las semanas de después son las que deciden si algo funciona.",
    },
  ],
  /* Vacío a propósito. Ver el bloque de comentario de arriba. */
  testimonios: [] as {
    cita: string;
    nombre: string;
    cargo: string;
    empresa: string;
  }[],
};

export const faqInicio = [
  {
    p: "No sabemos nada de tecnología. ¿Es un problema?",
    r: "Al revés: es el perfil con el que mejor trabajamos. No hay que aprender ningún programa nuevo — seguís usando lo que ya usáis. Lo montamos, lo configuramos y os enseñamos en una sesión las pocas cosas que sí cambian.",
  },
  {
    p: "¿Tenemos que cambiar de software?",
    r: "No. Nos conectamos encima de lo que ya tenéis. Si usáis Google Calendar, la cita aparece ahí exactamente igual que si la hubiera apuntado alguien del equipo. Si usáis un software sectorial concreto, miramos en el diagnóstico si se puede conectar y os decimos si compensa.",
  },
  {
    p: "¿Esto sustituye a alguien de mi equipo?",
    r: "No es la idea ni lo vendemos así. Lo que quita es la parte repetitiva — contestar veinte veces el mismo horario, recordar citas, apuntar en tres sitios — para que esa persona pueda dedicarse a lo que sí requiere un humano.",
  },
  {
    p: "¿Por qué el diagnóstico es de pago si otros lo hacen gratis?",
    r: "Porque un diagnóstico gratis no es un diagnóstico, es una llamada de venta con otro nombre. Cobrarlo nos obliga a dedicarle días de trabajo real y a entregaros un documento que sirva por sí solo, incluso si no seguís con nosotros. La llamada previa de 15 minutos, esa sí es gratis.",
  },
  {
    p: "¿Qué pasa con los datos de nuestros clientes?",
    r: "Todo se monta sobre vuestras propias cuentas: los datos siguen siendo vuestros y podéis cortar el acceso cuando queráis. Antes de empezar se firma el contrato de encargado del tratamiento que exige el RGPD, y en el diagnóstico dejamos por escrito qué información toca el sistema y cuál no toca nunca.",
  },
  {
    p: "¿Hay permanencia o cuota mensual?",
    r: "No hay permanencia. Cada fase de implementación se presupuesta y se aprueba por separado. Si en algún momento queréis parar, paráis, y lo construido se queda funcionando en vuestras cuentas.",
  },
  {
    p: "Nuestro sector no aparece en la lista. ¿Sirve igual?",
    r: "Casi siempre sí. Los sectores que mostramos son ejemplos de cómo cambia el proceso, no una lista cerrada. Si vuestro negocio atiende clientes, agenda algo o emite facturas, hay proceso que mirar. En la llamada de 15 minutos se ve enseguida.",
  },
  {
    p: "Estamos fuera de Mallorca. ¿Trabajáis en remoto?",
    r: "Sí. Todo el proceso — llamada, diagnóstico, implementación y seguimiento — se hace en remoto sin problema. Estar cerca ayuda, pero no es imprescindible.",
  },
];

export const cierreInicio = {
  titular: "Contadnos qué es lo que más tiempo os quita",
  texto:
    "15 minutos por videollamada, sin compromiso. Salís sabiendo si automatizar algo de vuestro negocio tiene sentido — aunque la respuesta sea que todavía no.",
  cta: "Agendar llamada gratis",
  finePrint: "Gratis y sin compromiso · 15 min",
  alternativa: { texto: "O escribidnos y lo vemos por escrito", href: "/contacto" },
};
