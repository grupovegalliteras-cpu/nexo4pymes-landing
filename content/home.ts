/* Copy de la portada. Reescrito para respirar en un diseño animado
   (frases más cortas, jerarquía clara), sin cambiar ningún hecho.

   OJO SEO: en esta página "clínicas veterinarias" no puede aparecer
   en el H1 ni en el title. Si compitiera con /veterinarias por esa
   búsqueda, le quitaría posiciones a la página que convierte. */

export const navHome = [
  { href: "#que-hacemos", texto: "Qué hacemos" },
  { href: "#como-trabajamos", texto: "Cómo trabajamos" },
  { href: "#que-automatizar", texto: "Qué automatizamos" },
  { href: "#preguntas-frecuentes", texto: "Preguntas" },
  { href: "/blog", texto: "Blog" },
  { href: "#contacto", texto: "Contacto" },
];

export const heroHome = {
  categoria: "Agencia de automatización con IA",
  titular: "Automatización de procesos con IA para pymes y autónomos",
  subtitulo:
    "Ayudamos a negocios pequeños a quitarse de encima el trabajo repetitivo: responder WhatsApp, gestionar citas y recordatorios, perseguir presupuestos, pedir reseñas o avisar de facturas pendientes. Antes de automatizar nada, estudiamos cómo funciona tu negocio de verdad.",
  ctaPrincipal: { texto: "Solicita una llamada informativa", href: "#contacto" },
  ctaSecundario: { texto: "Ver cómo trabajamos", href: "#como-trabajamos" },
  bullets: [
    "Primero diagnóstico, después implementación por fases",
    "No cambiamos tu programa de gestión: nos conectamos encima",
    "Hablamos en lenguaje de negocio, no en jerga técnica",
  ],
};

export const queHacemos = {
  categoria: "Qué hacemos",
  titular: "Automatizar tareas con IA, explicado sin tecnicismos",
  parrafos: [
    "En cualquier pyme hay trabajo que no da dinero pero hay que hacer igualmente: contestar el mismo mensaje veinte veces al día, confirmar citas por teléfono, perseguir presupuestos sin respuesta, reclamar facturas vencidas. Tareas pequeñas que se comen las horas de quien debería estar vendiendo.",
    "Montamos sistemas que reciben, clasifican, responden y avisan, y dejan a tu equipo lo que sí necesita una persona: decidir, atender y cerrar.",
    "La inteligencia artificial es lo que permite que ese sistema entienda el mensaje de un cliente real —con sus prisas y sus faltas de ortografía— y sepa qué hacer con él. No vendemos un programa ni te pedimos que cambies de software: trabajamos encima de lo que ya usas.",
  ],
  tarjetas: [
    {
      icono: "mensaje" as const,
      titulo: "Menos mensajes sin contestar",
      texto:
        "Las consultas que llegan fuera de horario dejan de esperar al día siguiente para tener respuesta.",
    },
    {
      icono: "agenda" as const,
      titulo: "Agenda más ordenada",
      texto:
        "Citas confirmadas y recordadas sin que nadie tenga que ir llamando uno por uno.",
    },
    {
      icono: "grafico" as const,
      titulo: "Nada se queda por el camino",
      texto:
        "Presupuestos, seguimientos y facturas pendientes dejan de depender de que alguien se acuerde.",
    },
  ],
};

export const comoTrabajamos = {
  categoria: "Cómo trabajamos",
  titular: "Dos fases: primero diagnóstico, después implementación",
  entradilla:
    "No empezamos vendiéndote una automatización concreta, porque todavía no sabemos si es la que tu negocio necesita. Trabajamos siempre en el mismo orden.",
  fases: [
    {
      etiqueta: "Fase 1 · Diagnóstico",
      titulo: "Mapeamos cómo funciona hoy tu negocio",
      texto:
        "Nos sentamos contigo y con quien hace el trabajo del día a día para dibujar el recorrido real: qué pasa desde que un cliente escribe hasta que paga y se va.",
      puntos: [
        "Cómo entran y se atienden las consultas.",
        "Cómo se gestionan citas, presupuestos y seguimientos.",
        "Qué herramientas usáis y qué información vive en cada una.",
        "Qué tareas repetitivas consumen más horas.",
        "Cuál es vuestra capacidad real de atender más trabajo.",
      ],
      cierre:
        "El resultado es un documento con los puntos de fricción, qué se puede automatizar y en qué orden. Es tuyo, aunque después no sigas con nosotros.",
    },
    {
      etiqueta: "Fase 2 · Implementación por fases",
      titulo: "Montamos lo que ha salido del diagnóstico, poco a poco",
      texto:
        "No lo automatizamos todo de golpe. Empezamos por lo que más tiempo libera con menos riesgo, lo dejamos funcionando y solo entonces pasamos al siguiente bloque. Así el negocio nunca se para.",
      puntos: [
        "Montaje conectado a las herramientas que ya usas.",
        "Periodo de prueba supervisado antes de dejarlo suelto.",
        "Formación sencilla, sin manuales de cien páginas.",
        "Ajustes y seguimiento una vez está en marcha.",
      ],
      cierre: null,
    },
  ],
};

export const formaDeVerlo = {
  categoria: "Nuestra forma de verlo",
  // H2 deliberadamente distinto del H1 del post del blog: si se parecen,
  // las dos URLs compiten por la misma búsqueda. No los iguales.
  titular: "Automatizar un proceso que no funciona multiplica el problema",
  entradilla:
    "La automatización no arregla un proceso, lo amplifica. Coge lo que ya haces y lo hace más rápido, más veces y sin descanso. Si el proceso está bien montado, multiplicas el resultado bueno. Si está mal montado, multiplicas el problema.",
  caso: {
    titulo: "Un ejemplo en una línea",
    parrafos: [
      "Un taller automatiza la captación de citas y llena la agenda en dos semanas. Nadie miró antes cuántos coches puede atender al día: ahora hay el doble de citas y los mismos dos mecánicos.",
      "La automatización funcionó a la perfección. Por eso rompió el negocio más rápido.",
    ],
    cifras: [
      { valor: 2, sufijo: "×", etiqueta: "citas en la agenda" },
      { valor: 2, sufijo: "", etiqueta: "mecánicos, los mismos" },
      { valor: 1, sufijo: "★", etiqueta: "las reseñas que llegaron" },
    ],
  },
  cierre:
    "Por eso no vendemos automatizaciones sueltas por catálogo. A veces la conclusión del diagnóstico es que hay que ordenar algo antes de tocarlo, o que una tarea no merece la pena automatizarla. Preferimos decírtelo.",
  enlacePost: {
    href: "/blog/por-que-diagnosticar-antes-de-automatizar",
    texto:
      "por qué automatizar sin diagnosticar antes puede hundirte el negocio",
    resto: ", con el caso completo del taller y las tres formas típicas de estropearlo.",
  },
};

export const areas = {
  categoria: "Qué se puede automatizar",
  titular: "Cuatro áreas del negocio donde suele haber trabajo repetitivo",
  entradilla:
    "Los tipos de automatización que implementamos con más frecuencia. Cuáles tienen sentido en tu caso sale del diagnóstico, no de esta lista.",
  bloques: [
    {
      id: "ventas",
      icono: "cohete" as const,
      titulo: "Ventas y captación",
      tituloLargo: "Ventas y captación de clientes",
      items: [
        {
          fuerte: "Atención automática de WhatsApp:",
          texto:
            "respuesta inmediata a cualquier hora, con paso a una persona cuando hace falta.",
        },
        {
          fuerte: "Gestión y recordatorio de citas:",
          texto:
            "reservar, confirmar y reprogramar sin llamadas manuales, para reducir las ausencias.",
        },
        {
          fuerte: "Seguimiento de presupuestos sin respuesta:",
          texto:
            "avisos al cliente que pidió precio y no ha vuelto, en vez de darlo por perdido.",
        },
      ],
    },
    {
      id: "marketing",
      icono: "altavoz" as const,
      titulo: "Marketing y reputación",
      tituloLargo: "Marketing y reputación",
      items: [
        {
          fuerte: "Publicación automática en redes sociales:",
          texto: "presencia constante sin depender de que alguien se acuerde.",
        },
        {
          fuerte: "Solicitud automática de reseñas de Google:",
          texto:
            "pedir la valoración justo después de un servicio bien terminado.",
        },
      ],
    },
    {
      id: "operaciones",
      icono: "engranaje" as const,
      titulo: "Operaciones y servicio",
      tituloLargo: "Operaciones y servicio",
      items: [
        {
          fuerte: "Avisos y seguimientos post-servicio:",
          texto:
            "el mensaje de revisión o mantenimiento que hoy se manda cuando alguien tiene un rato.",
        },
        {
          fuerte: "Notificaciones internas:",
          texto:
            "que la persona correcta se entere a tiempo, sin cadenas de mensajes ni notas en papel.",
        },
        {
          fuerte: "Triaje de mensajes urgentes:",
          texto:
            "distinguir lo que puede esperar de lo que no, y avisar al momento.",
        },
      ],
    },
    {
      id: "administracion",
      icono: "documento" as const,
      titulo: "Administración y control",
      tituloLargo: "Administración y control",
      items: [
        {
          fuerte: "Recordatorios de facturas pendientes:",
          texto: "avisos de cobro que salen solos, sin tener que reclamar a mano.",
        },
        {
          fuerte: "Informes automáticos periódicos:",
          texto: "el resumen del mes en tu correo, sin montarlo cada vez.",
        },
        {
          fuerte: "Alertas de stock:",
          texto: "aviso antes de quedarte sin lo que más vendes.",
        },
      ],
    },
  ],
};

export const aQuienAyudamos = {
  categoria: "A quién ayudamos",
  titular: "Automatización para pymes y autónomos de cualquier sector",
  parrafos: [
    "Trabajamos con negocios pequeños que tienen algo en común: mucho contacto directo con el cliente, una agenda que gestionar y un equipo corto que no da abasto con la parte administrativa.",
    "Nuestra especialidad son las clínicas veterinarias, el sector donde mejor conocemos el día a día. Eso no nos limita: la mecánica de fondo —cómo entra el trabajo, cómo se gestiona y dónde se atasca— se repite en todos los demás.",
  ],
  sectores: [
    "Clínicas veterinarias",
    "Clínicas y centros de salud",
    "Talleres y automoción",
    "Gestorías y asesorías",
    "Despachos profesionales",
    "Gimnasios y centros deportivos",
    "Comercio y tiendas online",
    "Belleza y estética",
    "Academias y formación",
    "Reformas e instaladores",
    "Hostelería",
  ],
  cierre:
    "Si tu sector no está en la lista, da igual: lo que analizamos es cómo entra el trabajo y dónde se atasca. Y si trabajas solo, tampoco te descartes: cada hora que un autónomo dedica a administrar es una hora que no factura.",
  cobertura:
    "Damos servicio a negocios de Mallorca y del resto de Baleares, y también en remoto al resto de España: todo el proceso, desde el diagnóstico hasta la puesta en marcha, se puede hacer por videollamada sin que tengas que dejar el negocio.",
};

export const bloqueVet = {
  // Va como H3 y no como H2 a propósito: la keyword "automatización para
  // clínicas veterinarias" debe ganarla /veterinarias, no esta página.
  titulo: "¿Tienes una clínica veterinaria?",
  parrafos: [
    "Tenemos una página hecha solo para vosotros: el WhatsApp que se satura en hora punta, las citas que se pierden, los recordatorios de vacunas y las urgencias que no pueden esperar en la cola.",
    "Ahora mismo tenemos abierta una oferta de lanzamiento del diagnóstico para las primeras clínicas que entren.",
  ],
  cta: "Ver la oferta de lanzamiento",
  nota: "Plazas limitadas",
};

export const faqHome = [
  {
    p: "¿Cuánto cuesta automatizar los procesos de una pyme?",
    r: "Depende de dos cosas: cuántos procesos se automatizan y lo enredados que estén. Trabajamos en dos partes separadas. El diagnóstico tiene un precio cerrado que se sabe desde el principio, y la implementación se presupuesta por fases, de forma que apruebas cada bloque antes de que empiece. No hay sorpresas a mitad de proyecto ni hace falta comprometerse con todo el plan de golpe: puedes parar después del diagnóstico o después de cualquier fase.",
  },
  {
    p: "¿Cuánto se tarda en poner en marcha una automatización?",
    r: "El diagnóstico es lo más rápido: unas pocas sesiones de trabajo contigo y con tu equipo, más el tiempo de analizarlo y redactarlo. La implementación va por fases y cada fase se pone en marcha por separado, así que empiezas a notar el efecto de las primeras automatizaciones mientras las siguientes todavía se están montando. Las automatizaciones sencillas están funcionando en cuestión de semanas; las que dependen de conectar varios sistemas o de reordenar un proceso interno llevan más. En el diagnóstico te damos plazos concretos para tu caso.",
  },
  {
    p: "¿Tengo que cambiar el software que uso ahora?",
    r: "No. Partimos de la base de que tu programa de gestión, tu agenda y tus herramientas se quedan como están. Nos conectamos por encima de lo que ya tienes para que la información fluya entre sistemas y las tareas repetitivas se hagan solas. Cambiar de software es caro, lento y obliga a reaprender a todo el equipo; solo tiene sentido cuando la herramienta actual es el problema, y en ese caso te lo diríamos en el diagnóstico como una recomendación, no como una condición para trabajar contigo.",
  },
  {
    p: "¿Sirve la automatización para negocios muy pequeños o para autónomos?",
    r: "Sí, y a menudo es donde más se nota. En un negocio de una o dos personas no hay a quién delegar: el mismo que atiende es el que agenda, el que factura y el que persigue los cobros. Automatizar ahí no sustituye a nadie, libera al dueño de tareas que no dan dinero. La diferencia con una empresa grande es el alcance: en un negocio pequeño se empieza con dos o tres automatizaciones bien elegidas, no con un proyecto enorme.",
  },
  {
    p: "¿Qué pasa si no sé nada de tecnología?",
    r: "Es lo normal entre nuestros clientes y no supone ningún problema. Tú aportas lo que sabes de tu negocio y nosotros ponemos la parte técnica. En el diagnóstico te preguntamos por cómo trabajas, no por sistemas ni programas. Y cuando algo se pone en marcha, dejamos formación sencilla para las personas que lo van a usar. Si una solución requiere que tu equipo se convierta en informático, está mal diseñada.",
  },
  {
    p: "¿Es seguro? ¿Qué pasa con los datos de mis clientes?",
    r: "Los datos de tus clientes siguen siendo tuyos y solo se usan para el fin para el que los recogiste. Trabajamos conforme al RGPD y a la normativa española de protección de datos, firmamos acuerdo de confidencialidad y contrato de encargado del tratamiento cuando es necesario, y limitamos los accesos a lo mínimo imprescindible para que la automatización funcione. Cualquier sistema que montemos queda documentado: qué información toca, dónde se guarda y quién puede verla.",
  },
  {
    p: "¿Voy a perder el trato personal con mis clientes?",
    r: "No es el objetivo. Automatizamos lo que ningún cliente valora que hagas a mano: confirmar una hora, recordar una cita, avisar de que su pedido está listo o responder a las preguntas de siempre. Lo que sí requiere trato humano —una consulta delicada, una queja, una venta importante— se deriva a una persona. Bien planteado, la automatización te devuelve tiempo para dedicarlo justamente al trato personal.",
  },
  {
    p: "¿Y si el diagnóstico concluye que no merece la pena automatizar?",
    r: "Te lo decimos. Puede pasar que un proceso haya que ordenarlo antes de automatizarlo, o que el volumen de una tarea sea tan bajo que el coste no se justifique. Si es el caso, te quedas igualmente con el mapa de tu negocio y con las recomendaciones de qué mejorar y en qué orden, aunque no contrates la implementación. Preferimos eso a venderte algo que no vas a rentabilizar.",
  },
];

export const blogHome = {
  categoria: "Blog",
  titular: "Automatización para pymes, explicada sin tecnicismos",
  entradilla:
    "Artículos sobre qué se puede automatizar en un negocio pequeño, en qué orden conviene hacerlo y qué errores salen caros.",
  publicado: {
    etiqueta: "Diagnóstico previo · 5 min",
    titulo: "Por qué automatizar sin diagnosticar antes puede hundirte el negocio",
    resumen:
      "La automatización no arregla un proceso, lo amplifica. El caso del taller que se llenó la agenda y acabó perdiendo clientes, las tres formas típicas de estropearlo y cuándo la respuesta correcta es no automatizar.",
    href: "/blog/por-que-diagnosticar-antes-de-automatizar",
  },
  proximos: [
    "Qué es un diagnóstico de procesos y qué te llevas de él",
    "Cómo automatizar la atención de WhatsApp en un negocio pequeño",
    "Recordatorios de citas automáticos: cómo reducir las ausencias",
  ],
};

export const contacto = {
  categoria: "Contacto",
  titular: "¿Quieres saber qué se podría automatizar en tu negocio?",
  entradilla:
    "Escríbenos y hablamos sin compromiso. Nos cuentas cómo funciona tu negocio y te decimos con franqueza si vemos margen de mejora. Si no lo vemos, también te lo diremos.",
  campos: {
    nombre: { etiqueta: "Nombre y negocio", placeholder: "Ana García · Taller García" },
    contacto: {
      etiqueta: "Email o teléfono de contacto",
      placeholder: "ana@tallergarcia.es",
    },
    mensaje: {
      etiqueta: "¿Qué tarea te está quitando más tiempo?",
      placeholder:
        "Contesto WhatsApp todo el día y se me acumulan los presupuestos sin seguimiento...",
    },
  },
  boton: "Solicitar una llamada informativa",
};
