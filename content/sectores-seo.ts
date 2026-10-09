import type { SectorId } from "@/data/sectors";

/* ============================================================
   TEXTO LARGO DE LAS PÁGINAS DE SECTOR

   POR QUÉ EXISTE ESTE ARCHIVO. Las ocho páginas de sector tenían unas
   330 palabras y eran tarjetas: el aviso típico, el checklist, las
   mediciones y los precios. Para una persona se entiende; para un
   buscador, una página sin prosa no responde a ninguna pregunta, y
   estas son justo las que pueden ganar «software para empresas de
   limpieza en Mallorca», que casi nadie disputa.

   LA REGLA AL ESCRIBIR AQUÍ: nada que valga igual para los ocho. Si
   una frase se puede copiar de jardinería a plagas cambiando un
   sustantivo, sobra. Lo que distingue a estas páginas es lo concreto:
   el pH y el cloro de una piscina, los registros de gases fluorados,
   el acta de la inspección sanitaria, el rendimiento de un string.
   Eso sale de data/sectors.ts, que es operativa real del sector y no
   un invento de marketing.

   Y NADA QUE NO SEA VERDAD. Los módulos que se nombran existen en
   data/modules.ts. Lo que todavía no está hecho no se promete.
   ============================================================ */

export type TextoSector = {
  /** Dos párrafos cortos. El primero es el día real; el segundo, qué se rompe. */
  intro: [string, string];
  /** Tres cosas concretas que hace el sistema en ESTE sector. */
  claves: { titulo: string; texto: string }[];
  /** Tres preguntas que hace alguien de ESTE sector, con respuesta que se lee suelta. */
  faq: [pregunta: string, respuesta: string][];
};

export const SECTORES_SEO: Record<SectorId, TextoSector> = {
  mantenimiento: {
    intro: [
      "Una empresa de mantenimiento multiservicio en Mallorca vive del teléfono: un hotel que se queda sin agua caliente en plena temporada, una comunidad con el grupo de presión parado, un local con el cuadro eléctrico saltado. Las tres entran a la vez y las tres son urgentes para quien llama.",
      "El cuaderno aguanta hasta que deja de aguantar. Con dos o tres técnicos repartidos por la isla, lo que falla no es el oficio: es saber quién va, qué pieza llevaba, si se cobró aquella reparación de la caldera de marzo y qué le dijimos al administrador por teléfono hace tres semanas.",
    ],
    claves: [
      {
        titulo: "Cada instalación con su historial",
        texto: "La caldera de la sala técnica, el grupo de presión y el termo de la planta 2 son fichas con su historial de intervenciones, sus fotos y su QR. El técnico que va por primera vez lee lo que hizo el que fue antes.",
      },
      {
        titulo: "La presión y el ACS quedan apuntadas",
        texto: "Presión de red, temperatura de agua caliente y tensión se anotan en el parte desde el móvil, con el rango correcto delante. Una lectura fuera de rango se ve en el panel sin tener que leer el parte entero.",
      },
      {
        titulo: "Los contratos generan sus propias visitas",
        texto: "El mantenimiento integral de un hotel deja de depender de que alguien se acuerde en octubre: las órdenes de trabajo preventivas salen solas con su tiempo de respuesta pactado.",
      },
    ],
    faq: [
      [
        "¿Sirve si hacemos fontanería, electricidad y calderas a la vez?",
        "Sí, y es el caso para el que está pensado. Los servicios se configuran con su precio y su duración estimada, y el checklist cambia según el tipo de intervención, así que un técnico que va a una avería eléctrica no ve los pasos de una prueba de estanqueidad.",
      ],
      [
        "¿Podemos atender avisos de hoteles fuera de horario?",
        "Las llamadas y los WhatsApp que entran de noche quedan registrados con su urgencia, y el aviso crítico puede notificar al responsable en el momento. Lo que decide qué es crítico lo ponéis vosotros: no es lo mismo una fuga en una habitación ocupada que una bombilla fundida.",
      ],
      [
        "¿Se puede saber qué reparación se cobró y cuál no?",
        "Sí. La factura sale del parte de trabajo, así que una intervención cerrada y sin facturar aparece en el panel como pendiente. Es el agujero típico de las empresas de mantenimiento: el trabajo se hace, se resuelve y nadie vuelve a mirarlo.",
      ],
    ],
  },

  limpieza: {
    intro: [
      "Una empresa de limpieza en Mallorca no tiene un problema de limpiar: tiene un problema de cuadrante. Oficinas que abren a las siete, comunidades que quieren las zonas comunes hechas antes de que baje el primer vecino, y un fin de obra que entra el jueves y hay que cubrir con la gente que ya estaba asignada a otra cosa.",
      "El Excel del cuadrante va por la cuarta versión de la semana, los cambios de turno se acuerdan por WhatsApp y el administrador de fincas llama para preguntar si el martes se limpió el portal. Responder que sí no vale: hay que demostrarlo.",
    ],
    claves: [
      {
        titulo: "El cuadrante deja de ser un Excel",
        texto: "Centros, turnos y personas en un calendario que avisa de los solapes. El cambio de turno se publica y cada trabajador lo ve en su móvil, sin cadenas de mensajes para confirmar quién cubre qué.",
      },
      {
        titulo: "La foto del resultado, en el parte",
        texto: "Aseos repuestos, papeleras, suelos, pomos desinfectados y cristales de entrada: el checklist se marca en el móvil y la foto final se queda pegada al parte, con su hora. Es la prueba que pide el cliente.",
      },
      {
        titulo: "Un informe por centro, sin montarlo a mano",
        texto: "Qué se limpió, cuándo, quién y con qué dilución de desinfectante. El PDF con vuestra marca se envía solo al terminar, y el administrador deja de llamar para preguntarlo.",
      },
    ],
    faq: [
      [
        "¿Puede el cliente ver que se ha limpiado?",
        "Sí. Cada servicio cierra con el checklist marcado, la foto del resultado y la hora, y eso se puede enviar como informe al administrador o al responsable del centro. Es lo que convierte una discusión sobre si se limpió o no en una consulta de treinta segundos.",
      ],
      [
        "¿Cómo se gestionan los cambios de turno de última hora?",
        "El cuadrante se modifica en el panel y el cambio aparece en la app de la persona afectada, con aviso. El historial queda, así que a fin de mes se sabe quién cubrió qué sin reconstruirlo desde el grupo de WhatsApp.",
      ],
      [
        "¿Sirve para limpiezas de fin de obra, que no son periódicas?",
        "Sí. Conviven los servicios recurrentes de contrato con los puntuales: una limpieza de fin de obra se planifica como un trabajo con su equipo, sus horas y su presupuesto, sin romper el cuadrante de los centros fijos.",
      ],
    ],
  },

  piscinas: {
    intro: [
      "En una empresa de piscinas de Mallorca, el año tiene dos mitades. En temporada alta son cien piscinas por semana, con rutas que cruzan la isla y un margen de horas para que la villa esté lista antes de que entren los clientes. Fuera de temporada, puestas en marcha y recuperaciones de agua verde.",
      "Y buena parte de los propietarios no vive aquí. Llaman desde Alemania o Reino Unido para preguntar cómo está el agua de una casa que no pisan hasta junio, y la respuesta no puede ser «mañana le digo».",
    ],
    claves: [
      {
        titulo: "pH y cloro con su rango delante",
        texto: "El técnico apunta pH, cloro libre, temperatura y presión del filtro desde el móvil, con el intervalo correcto a la vista. Una lectura fuera de rango se marca sola y el panel la sube arriba.",
      },
      {
        titulo: "Rutas que cuadran en temporada",
        texto: "El mapa reparte las paradas de la semana por técnico y calcula el recorrido más corto. Con cien piscinas, los kilómetros que se ahorran son horas, y las horas en julio son piscinas que entran o no entran.",
      },
      {
        titulo: "El informe que el propietario entiende",
        texto: "PDF con vuestra marca, las lecturas del día, las fotos y la firma, enviado al terminar. Quien vive fuera ve el agua de su piscina sin llamar, y eso es lo que reduce las llamadas de temporada.",
      },
    ],
    faq: [
      [
        "¿Se pueden registrar las analíticas del agua desde el móvil?",
        "Sí: pH, cloro libre, temperatura y presión del filtro se apuntan en el parte con su rango correcto delante. El sistema marca lo que se sale del intervalo, de modo que una piscina con el cloro bajo no pasa desapercibida hasta la semana siguiente.",
      ],
      [
        "Nuestros propietarios viven fuera. ¿Pueden ver el estado de su piscina?",
        "El informe de cada visita, con lecturas, fotos y firma, se envía automáticamente al terminar el servicio. Para quien quiera más, el portal del cliente deja consultar el histórico de visitas y facturas sin llamar a la oficina.",
      ],
      [
        "¿Aguanta el pico de temporada alta?",
        "Es para lo que sirve la planificación por rutas: las paradas de la semana se reparten por técnico y el mapa calcula el recorrido más corto. Una recuperación de agua verde o una avería de depuradora entran como trabajo urgente sin descolocar el resto del cuadrante.",
      ],
    ],
  },

  climatizacion: {
    intro: [
      "Una empresa de climatización en Mallorca trabaja con dos relojes distintos. El del cliente que pasa calor en una oficina, que puede esperar a mañana. Y el de una cámara frigorífica de un supermercado, que no puede esperar nada: si sube de cuatro grados hay género que se tira.",
      "Encima está el papeleo. Los registros de gases fluorados, las cargas por equipo y los partes de cada revisión preventiva son obligatorios, y cuando los pide una inspección o una cadena con veinte centros, suelen estar repartidos entre carpetas, correos y la furgoneta de alguien.",
    ],
    claves: [
      {
        titulo: "Las presiones y el gas, por equipo",
        texto: "Presión de alta, de baja, temperatura de cámara y kilos de gas añadido se anotan en el parte sobre la ficha del equipo. El histórico de cargas de un rooftop deja de estar en una libreta.",
      },
      {
        titulo: "Multi-centro para cadenas",
        texto: "Un cliente con veinte supermercados es un cliente con veinte fichas de centro, su propio histórico y la ruta entre ellos. La factura puede ir a la central aunque el trabajo se haga en la tienda.",
      },
      {
        titulo: "La urgencia que de verdad lo es",
        texto: "Una cámara de congelación fuera de rango puede avisar al responsable en el momento, mientras un split de oficina se queda en la lista normal. La regla la ponéis vosotros, por cliente y por tipo de equipo.",
      },
    ],
    faq: [
      [
        "¿Se pueden llevar los registros de gases refrigerantes?",
        "Los kilos de gas añadido se registran en el parte de cada intervención, asociados al equipo concreto y no solo al cliente, con su fecha y su técnico. De ahí sale el histórico por equipo, que es lo que hay que poder enseñar.",
      ],
      [
        "Trabajamos para cadenas con muchos centros. ¿Se puede separar el centro de quien paga?",
        "Sí. Cada centro tiene su ficha, sus equipos y su historial, y la facturación puede dirigirse a la empresa matriz. Es el módulo multi-centro, pensado justo para supermercados, hoteles y cadenas de tiendas.",
      ],
      [
        "¿Podemos distinguir una avería de cámara de una revisión normal?",
        "Sí, y es la diferencia que más importa en frío industrial. Los avisos entran con tipo y urgencia, y una cámara frigorífica parada puede disparar una notificación inmediata al responsable mientras el resto espera turno en la planificación.",
      ],
    ],
  },

  jardineria: {
    intro: [
      "Una empresa de jardinería en Mallorca reparte cuadrillas por media isla: mantenimientos quincenales en urbanizaciones, podas de palmera que hay que coordinar con el acceso, desbroces de parcela antes del verano y riegos que siempre fallan el fin de semana más caluroso de agosto.",
      "Lo que se pierde no son trabajos grandes: son las visitas periódicas. Un jardín que tocaba cada quince días y lleva cinco semanas sin pisar. Nadie lo nota hasta que llama el cliente, y entonces ya es una conversación incómoda.",
    ],
    claves: [
      {
        titulo: "Las visitas periódicas salen solas",
        texto: "El contrato de mantenimiento genera sus órdenes de trabajo sin que nadie las apunte. Si una visita se salta, aparece como pendiente en el panel en vez de desaparecer del calendario.",
      },
      {
        titulo: "Cada zona, con lo suyo",
        texto: "Jardín principal, seto perimetral, riego por goteo y palmeras de entrada son zonas con su historial. Los minutos de riego diario y los metros de césped quedan apuntados, y el siguiente que vaya no tiene que preguntar.",
      },
      {
        titulo: "Cuadrillas y rutas, no mensajes",
        texto: "Quién va a qué parcela y en qué orden se decide en el panel y llega al móvil de la cuadrilla. Los restos retirados y las horas se apuntan en el parte, que es de donde sale la factura.",
      },
    ],
    faq: [
      [
        "¿Cómo evitamos que se salten las visitas de mantenimiento?",
        "Los contratos de mantenimiento generan sus propias órdenes de trabajo con la periodicidad pactada, así que la visita existe en el calendario aunque nadie se acuerde. Si pasa su fecha sin cerrarse, queda marcada como pendiente en lugar de perderse.",
      ],
      [
        "¿Se puede llevar el control de los riegos de cada jardín?",
        "Los minutos de riego diario, la superficie de césped y los restos retirados se anotan como mediciones de la zona, con su historial. Una avería de riego entra como trabajo urgente y queda asociada a la zona concreta, no al cliente en general.",
      ],
      [
        "Trabajamos con cuadrillas que cambian. ¿Sirve igual?",
        "Sí. La planificación asigna el trabajo a las personas de cada día y el parte lo firma quien lo hace, así que el historial del jardín queda completo aunque la cuadrilla no sea siempre la misma. El fichaje por móvil cubre además las horas de cada uno.",
      ],
    ],
  },

  plagas: {
    intro: [
      "En control de plagas, el cliente no compra un tratamiento: compra poder enseñar un papel. Un restaurante con inspección sanitaria, un hotel con auditoría de cadena o una comunidad con un problema de roedores necesitan el certificado, el plano de puntos de control y el histórico de revisiones, y lo necesitan en el momento en que se lo piden.",
      "Mientras tanto, la operativa es menuda y repetitiva: veinte o cuarenta puntos por local, revisión de cada uno, anotar cuáles tienen actividad y cuánto producto se aplicó. Hecho en papel, se transcribe dos veces y se pierde una de cada tres.",
    ],
    claves: [
      {
        titulo: "Los puntos de control, uno a uno",
        texto: "Cocina y almacén, cuarto de basuras, cámara de frío, sótano y exterior son puntos con su QR y su historial. El técnico los revisa escaneando, y queda registrado cuáles tenían actividad.",
      },
      {
        titulo: "El informe APPCC, al terminar",
        texto: "Puntos revisados, puntos con actividad, producto aplicado y firma salen en un PDF con vuestra marca, enviado automáticamente. Es exactamente lo que pide una inspección, y deja de montarse a mano el domingo.",
      },
      {
        titulo: "Las revisiones periódicas no dependen de nadie",
        texto: "El contrato de revisión APPCC genera sus visitas con su periodicidad, y el control de legionela queda con su fecha y su aviso de renovación. Un certificado caducado es un problema que se ve venir.",
      },
    ],
    faq: [
      [
        "¿Se pueden generar los certificados e informes que pide una inspección sanitaria?",
        "El parte de cada revisión recoge puntos revisados, puntos con actividad, producto aplicado y firma, y de ahí sale un informe en PDF con vuestra marca que se envía al cliente al terminar. Lo que sea específico de vuestro protocolo se configura con vosotros.",
      ],
      [
        "¿Cómo se llevan los puntos de control de cada local?",
        "Cada punto es una ficha con su ubicación, su QR y su historial, de modo que el técnico lo identifica escaneando y no por memoria. El histórico por punto es lo que permite ver que las cucarachas siempre aparecen en el mismo office de planta.",
      ],
      [
        "¿Avisa de los tratamientos periódicos y de la legionela?",
        "Sí. Las revisiones periódicas se generan desde el contrato con su frecuencia, y los certificados con fecha de caducidad avisan antes de vencer. Es el mismo mecanismo que usa el módulo de formación para los cursos del personal.",
      ],
    ],
  },

  solar: {
    intro: [
      "Una empresa de instalaciones solares en Mallorca hace dos cosas que se parecen poco. Por un lado, obras: una cubierta de nave, una pérgola, una planta en suelo, con fases, materiales y papeleo por cada cliente. Por otro, mantenimiento de lo que ya instaló, que es donde está el ingreso recurrente.",
      "Y el mantenimiento tiene un problema propio: una instalación que baja de rendimiento no avisa. Sigue produciendo, solo que menos, y el cliente no se entera hasta que mira la factura de la luz seis meses después. Para entonces la conversación ya es difícil.",
    ],
    claves: [
      {
        titulo: "Rendimiento y producción, por instalación",
        texto: "Producción del día en kWh, rendimiento en porcentaje y tensión de string se anotan en cada revisión sobre la ficha de la instalación. Una caída se ve comparando con la visita anterior, no con la memoria.",
      },
      {
        titulo: "La obra por fases, con su avance",
        texto: "Una instalación de autoconsumo es un proyecto largo con capítulos y materiales. El presupuesto, el avance y las fotos de cada fase quedan en la ficha, y el cliente puede verlo sin llamar.",
      },
      {
        titulo: "El papeleo, pegado al cliente",
        texto: "Cada instalación guarda sus documentos, sus fotos y su histórico de intervenciones. Cuando hay que recuperar la memoria técnica de una obra de hace dos años, está en la ficha y no en un disco duro.",
      },
    ],
    faq: [
      [
        "¿Se puede detectar que una instalación ha bajado de rendimiento?",
        "Cada revisión anota producción, rendimiento y tensión de string sobre la ficha de esa instalación, así que la comparación con visitas anteriores es directa. No sustituye a la monitorización del inversor: lo que resuelve es que ese dato quede en el histórico del cliente y no solo en la pantalla del técnico.",
      ],
      [
        "Hacemos obra y mantenimiento. ¿Conviven los dos?",
        "Sí, y es lo habitual en este sector. Una instalación de autoconsumo se lleva como proyecto con sus fases y su material, y después esa misma instalación pasa a tener contrato de revisión con sus visitas periódicas. El historial es el mismo.",
      ],
      [
        "¿Dónde queda la documentación de cada instalación?",
        "En la ficha de la instalación: documentos, fotos de obra, materiales empleados e histórico de intervenciones. Es lo que hace que recuperar una memoria técnica de hace dos años sea una búsqueda y no una excavación.",
      ],
    ],
  },

  reformas: {
    intro: [
      "Una empresa de reformas en Mallorca convive con dos cosas que no se llevan bien: obras que duran semanas o meses, y presupuestos por capítulos que cambian cada vez que el cliente ve algo en una tienda. La reforma de un baño que se presupuestó en marzo no es la que se está ejecutando en mayo.",
      "Y el cliente quiere ver el avance. No pregunta por educación: ha dejado de vivir en su casa y necesita saber si la semana que viene puede volver. Cuando la respuesta tarda, la confianza se resiente antes que el plazo.",
    ],
    claves: [
      {
        titulo: "Presupuestos por capítulos, con versiones",
        texto: "El presupuesto se envía, se abre y se firma desde el móvil, y cada cambio queda como una versión nueva. Saber qué se aprobó y cuándo deja de ser una discusión de correos.",
      },
      {
        titulo: "El avance de obra, en porcentaje y en fotos",
        texto: "Avance, metros alicatados y humedad del soporte se apuntan en el parte, con fotos de antes y después. El cliente ve cómo va sin que haya que pararse a redactarle un correo.",
      },
      {
        titulo: "El coste real frente al presupuestado",
        texto: "Horas y material se descuentan al cerrar el parte, así que el margen de esa cocina se ve mientras la obra está en marcha, no tres meses después cuando ya no se puede corregir.",
      },
    ],
    faq: [
      [
        "¿Se pueden llevar presupuestos por capítulos que cambian durante la obra?",
        "Sí. Cada modificación genera una versión nueva del presupuesto, con aviso cuando el cliente lo abre y firma desde el móvil para aceptarlo. Lo que se aprobó y en qué fecha queda registrado, que es lo que evita la discusión al final.",
      ],
      [
        "¿Puede el cliente seguir el avance de su reforma?",
        "El parte de cada jornada admite porcentaje de avance y fotos, y el portal del cliente deja consultarlo sin llamar. Para una reforma integral, en la que el cliente está fuera de su casa, suele ser lo que más se agradece.",
      ],
      [
        "¿Sabremos si una obra está dando margen antes de terminarla?",
        "Sí. Las horas y el material se imputan al cerrar cada parte, así que el coste real frente al presupuestado se ve con la obra en marcha. Es la diferencia entre corregir una desviación y enterarse de ella cuando ya está cobrada.",
      ],
    ],
  },
};
