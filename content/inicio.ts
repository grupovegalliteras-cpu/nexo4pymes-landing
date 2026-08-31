/* ============================================================
   COPY DE LA HOME GENERAL (/)

   SEGUNDO GIRO DE POSICIONAMIENTO. La web pasó de «agencia de IA
   y automatización de procesos» a «soluciones digitales a
   medida»: CRMs propios, configuradores de producto para la web
   y las integraciones que lo conectan todo. La IA sigue dentro,
   pero como tecnología de apoyo del software — no como el
   producto que se vende.

   QUÉ CAMBIÓ EN EL ARGUMENTO, y por qué importa al escribir aquí:

   · El enemigo ya no es «hacerlo a mano». Es el software
     genérico y rígido al que la pyme se tiene que adaptar.

   · Lo que se compra ya no son automatizaciones sueltas: son
     tres piezas de software (gestión, configurador,
     integraciones) de las que se empieza por una.

   · La vieja promesa «no cambiáis de programa, montamos encima
     de lo que ya usáis» SE CAE SOLA — ahora el programa se lo
     construimos nosotros. La tranquilidad que la sustituye es la
     PROPIEDAD: el sistema es suyo, sin licencia mensual, sin
     permanencia y sin quedar atados a nosotros.
     Si alguien vuelve a escribir «montamos encima de lo que ya
     usáis» como argumento principal, está reintroduciendo el
     posicionamiento antiguo sin darse cuenta.

   VOZ: toda la web habla de «vosotros». El hero es la única
   excepción — está en «tú» — porque su texto vino dado palabra
   por palabra. Si algún día se unifica, es solo ese bloque.

   Regla de escritura heredada del rediseño móvil: ningún bloque
   de texto corrido pasa de ~40 palabras y las tarjetas se quedan
   en título + una línea corta. Las cifras que viven en
   content/marca.ts no se repiten a mano.

   Esta página no habla de dinero, igual que /servicios: ni
   cifras, ni «gratis» salvo en el CTA, ni «de pago». Fue una
   petición explícita y aquí se aplica igual.
   ============================================================ */

export const navInicio = [
  { href: "#cambio", texto: "Qué cambia" },
  { href: "#servicios", texto: "Qué construimos" },
  { href: "#sectores", texto: "Sectores" },
  { href: "#proceso", texto: "Proceso" },
  { href: "#faq", texto: "Preguntas" },
];

export const heroInicio = {
  categoria: "Soluciones Digitales a Medida",
  /* titularA sale en blanco y titularB en degradado: el corte está
     puesto para que el degradado caiga sobre «adaptado al 100 % a
     tu negocio», que es la parte que nos diferencia. */
  titularA: "El software que tu pyme necesita,",
  titularB: "adaptado al 100% a tu negocio.",
  parrafo:
    "Diseñamos tu CRM propio, configuradores de producto web y automatizaciones integradas para que tu empresa funcione sin caos ni herramientas genéricas.",
  ctaPrincipal: "Agendar llamada gratis",
  ctaSecundario: { texto: "Ver qué construimos ↓", href: "#servicios" },
  micro: "15 min · sin compromiso · sin tarjeta",
  /* Cifras del SERVICIO, no resultados de cliente inventados. Cada
     una es verificable contra lo que ofrecemos. Sin pronombre a
     propósito: así no hay que tocarlas si algún día el hero pasa
     de «tú» a «vosotros». */
  metricas: [
    { valor: "0€", etiqueta: "La primera llamada" },
    { valor: "3-4", etiqueta: "Días de diagnóstico" },
    { valor: "100%", etiqueta: "Hecho a medida" },
  ],
};

/* Píldoras de la marquesina bajo el hero. Compromisos, no promesas
   de resultado. «El sistema es vuestro» y «Sin licencias mensuales»
   son las que sustituyen a la antigua «Sobre vuestras herramientas»:
   son la respuesta al miedo real de encargar software a medida. */
export const garantiasInicio = [
  "Sin permanencia",
  "El sistema es vuestro",
  "Sin licencias mensuales",
  "Aprobado fase a fase",
];

/* ------------------------------------------------------------
   ANTES / DESPUÉS — el "problema vs solución".
   Se pintan como dos columnas comparadas en escritorio y como un
   conmutador de dos estados en móvil. Los pares están alineados
   por índice: antes[i] y despues[i] hablan de lo mismo.
   ------------------------------------------------------------ */
export const antesDespues = {
  categoria: "Antes y después",
  titular: "El mismo negocio, dos formas de funcionar",
  intro:
    "No cambia lo que vendéis ni quién lo vende. Cambia si la herramienta se adapta a vuestra forma de trabajar, o si sois vosotros los que os adaptáis a ella.",
  antes: {
    etiqueta: "Hoy, sin software a medida",
    resumen: "Os adaptáis vosotros al programa",
    filas: [
      {
        titulo: "El software manda",
        texto: "Pagáis una licencia por un programa rígido y acabáis trabajando como él quiere, no como necesitáis.",
      },
      {
        titulo: "Los datos, repartidos en Excels",
        texto: "Un archivo para cada cosa, versiones que no cuadran y nadie sabe cuál es el bueno.",
      },
      {
        titulo: "Los presupuestos se montan a mano",
        texto: "Buscar precios, calcular, escribir el PDF y enviarlo. Cada uno otra vez desde cero.",
      },
      {
        titulo: "Cada herramienta va por su lado",
        texto: "Lo que se apunta en una no llega a la otra. Alguien lo vuelve a teclear.",
      },
      {
        titulo: "Lo que os hace distintos no cabe",
        texto: "Vuestra forma propia de trabajar se acaba haciendo fuera del programa, en notas sueltas.",
      },
    ],
  },
  despues: {
    etiqueta: "Con nuestras soluciones a medida",
    resumen: "El sistema se adapta a cómo trabajáis vosotros",
    filas: [
      {
        titulo: "El software se adapta a vosotros",
        texto: "Se construye sobre vuestro proceso real. Si vuestra forma de trabajar es peculiar, el sistema la entiende.",
      },
      {
        titulo: "Un único sitio, un único dato",
        texto: "Clientes, pedidos e historial centralizados. El número que sale es el número que hay.",
      },
      {
        titulo: "El cliente cotiza solo en vuestra web",
        texto: "Elige, configura y ve el precio al momento, con vuestras reglas y vuestros márgenes.",
      },
      {
        titulo: "Todo sincronizado sin teclear",
        texto: "Lo que entra por la web aparece en la gestión. Sin copiar y pegar entre programas.",
      },
      {
        titulo: "Vuestro modo de trabajar, dentro",
        texto: "Lo que os diferencia deja de ser una excepción manual y pasa a estar en el sistema.",
      },
    ],
  },
  nota: "No se construye todo de golpe: en el diagnóstico se decide qué pieza compensa primero y cuál puede esperar.",
};

/* ------------------------------------------------------------
   LOS TRES PILARES — módulos de la home. La versión larga y
   detallada vive en /servicios; aquí solo el titular de cada uno.

   Eran seis tarjetas de automatización (atención al cliente,
   citas, facturación, leads, datos, presencia online). Con el
   giro pasan a ser TRES piezas de software. Aquello no se ha
   perdido: la mayoría vive ahora dentro del pilar 3, que es
   donde le corresponde estar cuando la IA es soporte y no
   producto.

   Tres tarjetas encajan en una fila exacta en escritorio
   (lg:grid-cols-3). Si algún día se añade una cuarta, quedará
   sola en la segunda fila: mejor cinco o seis que cuatro.
   ------------------------------------------------------------ */
export const serviciosInicio = {
  categoria: "Qué construimos",
  titular: "Tres piezas, y se empieza por una",
  intro:
    "Nada de «soluciones digitales». Esto es lo que se construye, en concreto. No hace falta encargar las tres: en el roadmap se decide cuál compensa primero y en qué orden van las demás.",
  tarjetas: [
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "CRMs y sistemas de gestión a medida",
      texto:
        "Un sistema construido sobre vuestra operativa real, no un programa genérico al que haya que adaptarse.",
      metrica: "Se acaban los Excels sueltos y el software rígido",
    },
    {
      icono: "globo" as const,
      tono: "violeta" as const,
      titulo: "Configuradores y diseñadores web",
      texto:
        "Una herramienta en vuestra web para que el cliente personalice, diseñe o cotice su producto en tiempo real.",
      metrica: "El cliente se hace el presupuesto solo, a cualquier hora",
    },
    {
      icono: "engranaje" as const,
      tono: "mint" as const,
      titulo: "Automatización e integraciones con IA",
      texto:
        "Conectamos el sistema, la web y las herramientas que ya usáis para que el trabajo repetitivo desaparezca.",
      metrica: "Un dato se teclea una vez y llega a todas partes",
    },
  ],
  pie: {
    texto: "Cada pieza, explicada con su alcance y sus límites",
    enlace: { texto: "Ver el detalle de servicios", href: "/servicios" },
  },
};

/* ------------------------------------------------------------
   SECTORES — el selector interactivo.

   Ningún sector tiene ya página propia: son casos de uso, no
   páginas. Si alguno vuelve a tenerla, hay un comentario en
   SelectorSectores.tsx con lo que hay que reponer.

   Con el giro, `automatizaciones` ya no lista automatizaciones
   sueltas: lista QUÉ SE CONSTRUYE en ese sector. El nombre de la
   clave se conserva para no tocar el componente, pero el
   contenido es software.
   ------------------------------------------------------------ */
export const sectoresInicio = {
  categoria: "A quién ayudamos",
  titular: "El mismo enfoque, construido para vuestro sector",
  intro:
    "Lo que hay que construir cambia mucho de un negocio a otro. El método para decidirlo, no. Elegid el que más se parezca al vuestro.",
  sectores: [
    {
      id: "profesionales",
      icono: "documento" as const,
      nombre: "Servicios profesionales",
      ejemplos: "Asesorías, despachos, consultoras, arquitectura",
      dolor:
        "Expedientes repartidos entre carpetas, hojas de cálculo y correos. El software del sector obliga a trabajar a su manera.",
      automatizaciones: [
        "Gestor de expedientes y clientes montado sobre vuestro flujo real",
        "Portal para que el cliente suba su documentación sin perseguirle",
        "Avisos de vencimientos y renovaciones antes de que lleguen",
      ],
      resultado: "El equipo dedica su tiempo al criterio, no a perseguir papeles.",
    },
    {
      id: "comercio",
      icono: "globo" as const,
      nombre: "Comercio y retail",
      ejemplos: "Tiendas, distribuidores, ecommerce, mayoristas",
      dolor:
        "Catálogos con mil variantes que ninguna plantilla de tienda soporta, y presupuestos que se calculan a mano uno a uno.",
      automatizaciones: [
        "Configurador de producto en la web, con vuestras reglas y márgenes",
        "Sistema de pedidos y clientes conectado al catálogo",
        "Sincronización de stock y precios entre la web y la gestión",
      ],
      resultado: "El cliente configura y cotiza solo, también fuera de horario.",
    },
    {
      id: "salud",
      icono: "escudo" as const,
      nombre: "Salud y bienestar",
      ejemplos: "Fisioterapia, dental, psicología, estética, nutrición",
      dolor:
        "Una agenda por un lado, las fichas por otro y los bonos de sesiones apuntados en papel. Nada se habla entre sí.",
      automatizaciones: [
        "Ficha de paciente y agenda en un mismo sistema, hecho a vuestro flujo",
        "Reserva y cambio de cita desde la web, sin pasar por recepción",
        "Control de bonos, sesiones y seguimientos, sin llevar la cuenta a mano",
      ],
      resultado: "Menos huecos vacíos y una recepción que puede atender a quien tiene delante.",
      nota: "Los historiales clínicos quedan siempre fuera de lo que gestiona la IA.",
    },
    {
      id: "veterinarias",
      icono: "vacuna" as const,
      nombre: "Clínicas veterinarias",
      ejemplos: "Clínicas, hospitales veterinarios, centros de referencia",
      dolor:
        "El programa de gestión cubre lo clínico pero no lo demás, y el WhatsApp acaba absorbiendo citas, dudas y pedidos.",
      automatizaciones: [
        "Fichas de paciente y propietario conectadas con la agenda",
        "Reserva online de cita y de revisión, integrada con el calendario",
        "Avisos de vacunas y desparasitaciones con reserva en el mismo mensaje",
      ],
      resultado: "Ingresos recurrentes que dejan de perderse por no avisar a tiempo.",
    },
    {
      id: "logistica",
      icono: "mapa" as const,
      nombre: "Logística y transporte",
      ejemplos: "Transportistas, última milla, almacenes, mudanzas",
      dolor:
        "Rutas y partes en papel o en Excel, y media jornada contestando «¿dónde está mi pedido?» por teléfono.",
      automatizaciones: [
        "Panel de expediciones y rutas ajustado a vuestra operativa",
        "Seguimiento en la web para que el cliente lo consulte solo",
        "Partes, albaranes e incidencias que se registran sin papel",
      ],
      resultado: "Menos llamadas entrantes y trazabilidad sin trabajo extra.",
    },
    {
      id: "oficios",
      icono: "herramienta" as const,
      nombre: "Oficios y servicios a domicilio",
      ejemplos: "Reformas, instaladores, talleres, mantenimiento",
      dolor:
        "Cada presupuesto se calcula desde cero y se pierde en el correo. Las visitas se cuadran a base de llamadas perdidas.",
      automatizaciones: [
        "Calculadora de presupuestos en la web, con vuestros precios y medidas",
        "Sistema de obras y visitas: quién va, cuándo y en qué estado está",
        "Presupuesto enviado con seguimiento automático a los días",
      ],
      resultado: "Menos desplazamientos en balde y presupuestos que se cierran.",
    },
  ],
};

/* ------------------------------------------------------------
   PROCESO — cuatro pasos. Versión corta del método de /servicios,
   que tiene cinco: aquí "roadmap" va dentro de "diagnóstico"
   porque es el entregable del mismo paso.

   Los `meta` describen duración y formato, nunca dinero.
   ------------------------------------------------------------ */
export const procesoInicio = {
  categoria: "Cómo trabajamos",
  titular: "De la primera llamada al sistema funcionando",
  intro: "Cuatro pasos, sin sorpresas y sin contratos de doce meses. En cualquiera de ellos podéis parar.",
  pasos: [
    {
      num: "01",
      meta: "15 minutos · gratis",
      titulo: "Llamada inicial",
      texto:
        "Nos contáis cómo funciona el negocio y con qué peleáis cada día. Os decimos con honestidad si esto encaja. Si no encaja, se acaba aquí.",
    },
    {
      num: "02",
      meta: "3-4 días · por escrito",
      titulo: "Diagnóstico y roadmap",
      texto:
        "Analizamos vuestros procesos y os entregamos un documento: qué software hace falta de verdad, ordenado por impacto y esfuerzo, con los riesgos y el alcance de cada fase.",
    },
    {
      num: "03",
      meta: "Fase a fase · aprobado antes de empezar",
      titulo: "Desarrollo e implementación",
      texto:
        "Se construye lo decidido, empezando por la pieza que más impacto tiene con menos esfuerzo. Cada fase se aprueba antes de tocar nada. Nunca todo de golpe.",
    },
    {
      num: "04",
      meta: "Después de arrancar",
      titulo: "Ajuste y acompañamiento",
      texto:
        "Las primeras semanas con el sistema en marcha siempre aparecen casos no previstos. Se afinan, se corrigen y se mide si de verdad funciona.",
    },
  ],
  callout: {
    fuerte: "Si el diagnóstico dice que no hace falta construir nada,",
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
      texto:
        "Si construir software no compensa en vuestro caso, va escrito en el informe. También cuando eso signifique no vender nada.",
    },
    {
      /* Este compromiso cambió con el giro. Antes decía «todo se monta
         sobre vuestras herramientas»; eso ya no aplica cuando la
         herramienta la construimos nosotros. La tranquilidad ahora es
         la propiedad: es el miedo número uno al encargar software a
         medida y hay que contestarlo de frente. */
      icono: "escudo" as const,
      titulo: "El sistema es vuestro",
      texto:
        "El código y los datos se quedan en vuestras cuentas, sin licencia mensual. Si un día seguís sin nosotros, os lo lleváis y punto.",
    },
    {
      icono: "documento" as const,
      titulo: "El informe es vuestro",
      texto:
        "Sigáis o no con el desarrollo, el análisis y el roadmap se quedan con vosotros. Sin letra pequeña.",
    },
    {
      icono: "reloj" as const,
      titulo: "Pocos clientes a la vez",
      texto:
        "Preferimos hacer bien tres proyectos que empezar diez. Las semanas de después son las que deciden si algo funciona.",
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
    r: "Al revés: es el perfil con el que mejor trabajamos. Vosotros ponéis el conocimiento del negocio y nosotros lo convertimos en software. No hay que entender cómo está hecho por dentro, igual que no hace falta saber de motores para conducir.",
  },
  {
    p: "Ya tenemos un programa. ¿Hay que tirarlo?",
    r: "No necesariamente, y esto se decide en el diagnóstico. A veces lo que falta es una pieza que se conecta con lo que ya tenéis; otras, el programa actual es justo el problema y sale más a cuenta sustituirlo. Lo que no hacemos es dar por hecho que hay que cambiarlo todo.",
  },
  {
    p: "¿El software es nuestro o vuestro?",
    r: "Vuestro. El código y la base de datos viven en vuestras cuentas y os los podéis llevar cuando queráis, incluido el día que decidáis trabajar con otro. No hay licencia mensual por usarlo ni una plataforma nuestra de la que no se pueda salir: encargáis un desarrollo, no alquiláis un sitio.",
  },
  {
    p: "¿Esto sustituye a alguien de mi equipo?",
    r: "No es la idea ni lo vendemos así. Lo que quita es la parte repetitiva — teclear lo mismo en tres sitios, montar el presupuesto número catorce, buscar en qué Excel estaba el dato — para que esa persona pueda dedicarse a lo que sí requiere un humano.",
  },
  {
    p: "¿Qué pasa con los datos de nuestros clientes?",
    r: "El sistema se despliega en vuestras propias cuentas: los datos son vuestros y podéis cortar el acceso cuando queráis. Antes de empezar se firma el contrato de encargado del tratamiento que exige el RGPD, y en el diagnóstico dejamos por escrito qué información toca el sistema y cuál no toca nunca.",
  },
  {
    p: "¿Hay permanencia o cuota mensual?",
    r: "No hay permanencia. Cada fase se acuerda y se aprueba por separado, y decidís vosotros si hay una siguiente. Si queréis parar, paráis, y lo construido se queda funcionando en vuestras cuentas. El mantenimiento posterior, si lo queréis, se contrata aparte y también se puede dejar.",
  },
  {
    p: "Nuestro sector no aparece en la lista. ¿Sirve igual?",
    r: "Casi siempre sí. Los sectores que mostramos son ejemplos de qué se construye en cada caso, no una lista cerrada. Si vuestro negocio gestiona clientes, prepara presupuestos o lleva un catálogo con variantes, hay algo que mirar. En la llamada de 15 minutos se ve enseguida.",
  },
  {
    p: "Estamos fuera de Mallorca. ¿Trabajáis en remoto?",
    r: "Sí. Todo el proceso — llamada, diagnóstico, desarrollo y acompañamiento — se hace en remoto sin problema. Estar cerca ayuda, pero no es imprescindible.",
  },
];

export const cierreInicio = {
  titular: "Contadnos cómo trabajáis hoy",
  texto:
    "15 minutos por videollamada, sin compromiso. Salís sabiendo si vuestro negocio necesita software propio — aunque la respuesta sea que todavía no.",
  cta: "Agendar llamada gratis",
  finePrint: "Gratis y sin compromiso · 15 min",
  alternativa: { texto: "O escribidnos y lo vemos por escrito", href: "/contacto" },
};
