import type { LandingSlug } from "@/data/landings";

/* ============================================================
   TEXTO LARGO DE LAS LANDINGS DE MÓDULO

   LA REGLA, HEREDADA DE sectores-seo.ts: nada que valga igual para
   cualquier otra landing, y nada que no sea verdad. Si una frase se
   puede copiar de "control horario" a "presupuestos" cambiando un
   sustantivo, sobra. Lo que hace que estas páginas ganen es lo
   concreto: el hash encadenado de VeriFactu, el registro de alta, la
   geolocalización del fichaje. Eso no lo tiene la competencia porque
   requiere haberlo implementado.

   POR QUÉ ESTAS CINCO Y NO CUARENTA: está explicado en data/landings.ts
   con la medición que lo decidió.

   LAS FECHAS NO SE ESCRIBEN AQUÍ. Van en content/verifactu-estado.ts,
   que es el único sitio donde se tocan. Aquí se habla de la obligación
   sin poner números, para que el texto siga siendo cierto cuando
   Hacienda vuelva a mover el calendario — que lo ha movido tres veces.
   ============================================================ */

export type TextoLanding = {
  /* EL H1 VA EN DOS PARTES porque el hero del sitio pinta la segunda
     línea en cian (#8fd9ea), como en la portada. Las dos van dentro
     del mismo <h1>, así que para el buscador sigue siendo un titular
     entero; el corte es solo visual. Cada idioma elige dónde parte:
     en alemán el orden de la frase no cae en el mismo sitio que en
     castellano, y partir por el mismo número de palabras quedaría mal.
     Contiene literalmente lo que la gente escribe en el buscador. */
  h1: [string, string];
  /** Una línea bajo el H1. Lo que hace el producto, sin adjetivos. */
  entradilla: string;
  /** Dos párrafos: el primero es la situación real; el segundo, qué se rompe. */
  intro: [string, string];
  /** Tres cosas concretas que hace el sistema en ESTE módulo. */
  claves: { titulo: string; texto: string }[];
  /** Las preguntas que la gente teclea de verdad, con respuesta que se lee suelta. */
  faq: [pregunta: string, respuesta: string][];
};

export const LANDINGS_SEO: Partial<Record<LandingSlug, TextoLanding>> = {
  "facturacion-verifactu": {
    h1: ["Software de facturación con", "VeriFactu"],
    entradilla:
      "Facturas firmadas con huella encadenada y registro de alta en el formato que exige Hacienda, emitidas desde el mismo sitio donde se cierra el parte de trabajo.",
    intro: [
      "VeriFactu lleva tres calendarios distintos. El primero decía 2026. El Real Decreto-ley 15/2025 lo movió a 2027. Y el 5 de octubre de 2026 el Ministerio de Hacienda anunció llevarlo a octubre de 2028 para quien factura menos de ocho millones. Ese último aplazamiento todavía no está publicado en el BOE, así que lo que obliga hoy siguen siendo las fechas de 2027.",
      "El efecto de tanto vaivén es que casi nadie sabe ya qué tiene que hacer ni cuándo. Y mientras tanto la pregunta real de una empresa de servicios de Mallorca no es cuál es la fecha: es si el día que llegue va a tener que volver a teclear cada factura en un programa aparte, después de haber metido ya los datos en el parte de trabajo.",
    ],
    claves: [
      {
        titulo: "Del parte a la factura sin volver a teclear",
        texto:
          "El técnico cierra el parte en el móvil con las horas, los materiales y la firma del cliente. La factura sale de ahí con esos conceptos ya puestos. No hay un segundo programa al que pasar los datos a mano, que es donde se pierden las horas y aparecen los errores.",
      },
      {
        titulo: "La huella encadenada y el registro de alta, hechos",
        texto:
          "Cada factura genera su registro de alta con el hash que enlaza con la anterior, el código QR y la mención de que es verificable. Es lo que pide el Reglamento, y es la parte que no se puede improvisar el mes antes de la fecha.",
      },
      {
        titulo: "Las facturas rectificativas también cuentan",
        texto:
          "Anular o corregir una factura emitida no es borrarla: genera su propio registro de anulación encadenado. Es el punto donde más sistemas fallan, porque el camino feliz lo cubre casi cualquiera y el de las rectificativas no.",
      },
    ],
    faq: [
      [
        "¿Qué es VeriFactu y a quién afecta?",
        "Es el sistema de la Agencia Tributaria para que los programas de facturación no se puedan manipular. Cada factura emitida deja un registro firmado y encadenado con la anterior, de forma que no se puede borrar ni alterar una sin que se note. Afecta a empresas y autónomos que emitan facturas, salvo quienes ya están en el SII o tributan en régimen foral.",
      ],
      [
        "¿Cuándo es obligatorio exactamente?",
        "Hay dos respuestas y conviene no mezclarlas. Lo que está en vigor son las fechas del Real Decreto-ley 15/2025. Lo que hay además es un aplazamiento anunciado por Hacienda el 5 de octubre de 2026 que llevaría buena parte de las obligaciones a octubre de 2028, pero que no se ha publicado en el BOE. Hasta que se publique, lo que obliga es el calendario de 2027. Las fechas concretas están en la tabla de arriba, con la última vez que las comprobamos.",
      ],
      [
        "¿Hay algún VeriFactu gratis?",
        "La Agencia Tributaria ofrece una aplicación gratuita para emitir facturas verificables. Sirve si facturáis poco y a mano. No sirve si lo que queréis es que la factura salga del parte de trabajo que ya habéis rellenado, porque es una herramienta suelta que no se conecta con nada de lo vuestro.",
      ],
      [
        "¿Cuánto cuesta adaptarse?",
        "Si ya tenéis un programa de facturación, el fabricante debería haberlo adaptado: están obligados desde julio de 2025. Si lo que tenéis es Excel o un talonario, el coste no es el de VeriFactu, es el de pasar a facturar con un sistema. Nosotros lo decimos por escrito antes de empezar: qué se hace, qué no y cuánto cuesta.",
      ],
      [
        "Si se vuelve a aplazar, ¿me he adelantado para nada?",
        "No, porque la ventaja de que la factura salga del parte no depende de ninguna fecha de Hacienda. Las horas que se ahorran de no teclear dos veces se ahorran igual en 2026 que en 2028. El cumplimiento es la consecuencia, no el motivo.",
      ],
    ],
  },

  "control-horario": {
    h1: ["Control horario", "y fichaje"],
    entradilla:
      "Cada persona ficha desde su móvil, con la hora y el lugar, y el registro queda guardado, consultable y exportable para una inspección.",
    intro: [
      "Conviene separar dos cosas que casi todo el mundo mezcla. Registrar la jornada es obligatorio en España desde el 12 de mayo de 2019, por el artículo 34.9 del Estatuto de los Trabajadores. Que ese registro tenga que ser digital es otra cosa, y a día de hoy no lo es: la ley admite papel, hoja de cálculo o programa, siempre que el sistema sea fiable, objetivo y accesible.",
      "El real decreto que obligaría al formato digital lleva meses anunciado y sigue sin aprobarse; recibió un dictamen desfavorable del Consejo de Estado y no ha salido en el BOE. Así que si alguien os vende un programa diciendo que «ya es obligatorio por ley fichar digitalmente», os está vendiendo con una norma que todavía no existe. El motivo para hacerlo es otro: con los técnicos repartidos por la isla, la hoja de papel no se sabe quién la rellenó ni cuándo.",
    ],
    claves: [
      {
        titulo: "Se ficha donde se trabaja, no en la oficina",
        texto:
          "El técnico que empieza el día en una comunidad de Calvià ficha allí, desde su móvil, sin pasar antes por el almacén. Queda la hora y la ubicación de la entrada y de la salida, que es lo que convierte el registro en algo que se sostiene ante una inspección.",
      },
      {
        titulo: "Las horas salen del parte, no de una estimación",
        texto:
          "Como el fichaje y el parte de trabajo viven en el mismo sitio, las horas de cada técnico se cruzan solas con los trabajos de ese día. Se ve qué parte de la jornada fue a cada cliente sin que nadie tenga que reconstruirlo a final de mes.",
      },
      {
        titulo: "Exportable el día que lo pidan",
        texto:
          "El registro se saca por persona y por periodo en un formato que se puede entregar. La obligación no es solo guardar los datos: es tenerlos accesibles para la persona trabajadora, para su representación legal y para la Inspección de Trabajo.",
      },
    ],
    faq: [
      [
        "¿Es obligatorio el control horario?",
        "Sí, desde el 12 de mayo de 2019. El artículo 34.9 del Estatuto de los Trabajadores obliga a registrar cada día el inicio y el final de la jornada de cada persona de plantilla, y a conservar ese registro cuatro años.",
      ],
      [
        "¿Y el fichaje digital, es obligatorio ya?",
        "No. El real decreto que exigiría el formato digital sigue sin aprobarse: el Consejo de Estado emitió un dictamen desfavorable y no se ha publicado en el BOE. Mientras tanto la ley sigue admitiendo papel o una hoja de cálculo, con la condición de que el sistema sea fiable, objetivo y accesible. Cuando se apruebe, el borrador prevé un plazo de adaptación de seis meses desde que salgan las especificaciones técnicas.",
      ],
      [
        "¿Vale una hoja de Excel?",
        "Legalmente, hoy sí. En la práctica se cae sola en cuanto hay gente fuera de la oficina: una hoja que se rellena a final de semana desde la memoria no es un registro diario, y eso sí lo mira una inspección. Si todo el mundo entra y sale del mismo sitio a la misma hora, el Excel aguanta. Si tenéis técnicos por la isla, no.",
      ],
      [
        "¿Se puede fichar con la huella dactilar?",
        "Prácticamente no. La Agencia Española de Protección de Datos considera que la huella y la cara son datos biométricos y descarta su uso para el control horario salvo que no exista ninguna alternativa menos invasiva y haya consentimiento explícito y revocable. Para fichar hay opciones más simples que no entran en ese terreno.",
      ],
      [
        "¿Y las horas extra?",
        "Salen del mismo registro. Si la jornada pactada son ocho horas y el registro dice nueve y media, la diferencia está contada sin que nadie la apunte aparte. Esa es, en la práctica, la razón por la que existe la obligación.",
      ],
    ],
  },

  "partes-de-trabajo": {
    h1: ["App de", "partes de trabajo"],
    entradilla:
      "El técnico cierra el parte en el móvil con fotos, materiales y la firma del cliente, y en la oficina está antes de que arranque el coche.",
    intro: [
      "El parte en papel tiene un problema que no es el papel: es el viaje. Se rellena a las once de la mañana en un sótano de Palma y llega a la oficina el viernes, arrugado, con una letra que nadie descifra y sin la firma porque el cliente no estaba. Entre medias han pasado cuatro días en los que esa reparación no se podía facturar ni consultar.",
      "Y cuando el cliente llama en marzo preguntando qué se hizo en aquella visita de noviembre, la respuesta depende de que alguien se acuerde. No es un problema de orden: es que la información existe en un sitio donde no sirve para nada.",
    ],
    claves: [
      {
        titulo: "Firma del cliente en la pantalla",
        texto:
          "El cliente firma con el dedo al terminar y recibe su copia en PDF por correo o WhatsApp. El parte queda cerrado con esa firma, su hora y quién lo firmó. Es la diferencia entre poder cobrar un trabajo y discutirlo.",
      },
      {
        titulo: "Fotos del antes y del después",
        texto:
          "La foto se hace desde el parte y se queda dentro de él, no en el carrete del móvil del técnico. Cuando hay discusión sobre el estado en que se encontró una instalación, la foto con su fecha vale más que cualquier explicación.",
      },
      {
        titulo: "Los materiales se descuentan del almacén",
        texto:
          "Lo que se anota como gastado en el parte sale del stock y entra en la factura. Sin esa cadena, el material se apunta dos veces o no se apunta ninguna, que es donde se evapora el margen de una empresa de servicios.",
      },
    ],
    faq: [
      [
        "¿Funciona sin cobertura?",
        "Sí. El parte se rellena y se firma en el móvil aunque no haya línea —en un sótano, en un local sin cobertura, en una finca del interior— y se sube solo cuando el teléfono vuelve a tener red. Es la condición de que esto sirva en campo y no solo en la demo.",
      ],
      [
        "¿El cliente tiene que instalar algo para firmar?",
        "No. Firma en el móvil del técnico, con el dedo, y recibe el PDF por correo o WhatsApp. No hay aplicación que instalar ni cuenta que crear, porque cualquiera de las dos cosas haría que la mitad de las firmas no se consiguieran.",
      ],
      [
        "¿Se puede facturar directamente desde el parte?",
        "Sí, y es el motivo principal de que el parte sea digital. Las horas y los materiales que el técnico ha anotado pasan a la factura sin que nadie los vuelva a teclear, con VeriFactu cuando toque.",
      ],
      [
        "¿Qué pasa con los partes que ya tenemos en papel?",
        "Se quedan como están. Nadie va a pasar a mano dos años de archivadores, y proponerlo sería venderos trabajo inútil. Se arranca con los nuevos y el histórico sigue donde está por si hace falta consultarlo.",
      ],
      [
        "¿Cuántos técnicos hacen falta para que compense?",
        "Con uno solo ya compensa si trabaja fuera, porque lo que se gana es que el parte llegue el mismo día. A partir de tres o cuatro, lo que se gana es saber qué está haciendo cada uno sin llamarle.",
      ],
    ],
  },

  presupuestos: {
    h1: ["Software de", "presupuestos"],
    entradilla:
      "Presupuestos con tus precios y tus partidas, enviados por WhatsApp o correo, con aviso cuando el cliente los abre y aceptación con un clic.",
    intro: [
      "En una empresa de servicios los presupuestos se hacen dos veces: una en la cabeza, delante del cliente, y otra por la noche en casa, delante del ordenador, intentando acordarse de las medidas. La segunda vez es la que se pierde, y con ella la mitad de los trabajos que se iban a cerrar.",
      "Luego está lo que pasa después de enviarlo. Se manda un PDF y empieza el silencio. No se sabe si lo abrió, si lo está comparando o si se le fue de la bandeja. A la semana se llama preguntando, con esa incomodidad de parecer que se persigue al cliente.",
    ],
    claves: [
      {
        titulo: "Las partidas son las vuestras",
        texto:
          "El catálogo de conceptos, precios por hora y materiales es el de vuestra empresa, no una plantilla genérica. Hacer un presupuesto deja de ser escribir y pasa a ser elegir, que es la diferencia entre entregarlo en la visita o esa misma noche.",
      },
      {
        titulo: "Se sabe cuándo lo abre",
        texto:
          "Llega un aviso cuando el cliente abre el presupuesto. Dejáis de llamar a ciegas: se llama a quien lo ha mirado tres veces y no a quien ni lo ha abierto, que necesita otra conversación distinta.",
      },
      {
        titulo: "Aceptar es un botón, no una respuesta",
        texto:
          "El cliente acepta desde el mismo enlace, sin tener que redactar un correo diciendo que sí. Y al aceptarse, el presupuesto genera el trabajo planificado con sus partidas, en vez de quedarse como un PDF archivado.",
      },
    ],
    faq: [
      [
        "¿Se puede hacer el presupuesto delante del cliente?",
        "Esa es la idea. Con las partidas y los precios ya cargados, se monta en el móvil durante la visita y se envía antes de salir. Un presupuesto entregado en la visita se acepta mucho más que uno que llega tres días después.",
      ],
      [
        "¿Lleva nuestro logotipo y nuestras condiciones?",
        "Sí. Logotipo, datos fiscales, condiciones de pago y validez de la oferta salen en todos los presupuestos sin tener que acordarse de ponerlos.",
      ],
      [
        "¿Qué pasa si el cliente pide cambios?",
        "Se hace una versión nueva que conserva la anterior. Queda el rastro de qué se ofreció primero y qué se acordó al final, que es justo lo que falta cuando aparece una discusión tres meses después.",
      ],
      [
        "¿Sirve para obra y reformas?",
        "Sí, con partidas por capítulos y mediciones. No es un programa de mediciones de obra civil con bases de precios oficiales: es para el presupuesto de una empresa de servicios o de reformas que trabaja con sus propios precios.",
      ],
      [
        "¿Y del presupuesto a la factura?",
        "Directo. Lo aceptado se convierte en trabajo, el trabajo en parte y el parte en factura, con lo que de verdad se ejecutó. Así se ve la diferencia entre lo presupuestado y lo gastado, que es donde se descubre si un tipo de trabajo da dinero o no.",
      ],
    ],
  },

  "chatbot-whatsapp": {
    h1: ["Chatbot de", "WhatsApp"],
    entradilla:
      "Responde las preguntas de siempre a cualquier hora, recoge los datos del aviso y pasa a una persona en cuanto hace falta.",
    intro: [
      "Una empresa de servicios en Mallorca recibe por WhatsApp lo mismo quince veces al día: a qué hora abrís, si vais a Andratx, cuánto cuesta una revisión, si podéis pasar hoy. Son mensajes que no requieren criterio y que, sumados, se comen la mañana de quien debería estar organizando a los técnicos.",
      "Y a las ocho de la tarde, cuando entra un aviso de verdad, no hay nadie leyendo. Al día siguiente ese cliente ya ha llamado a otro. El problema no es la falta de personal: es que el mismo canal mezcla lo que cualquiera puede contestar con lo que no puede esperar.",
    ],
    claves: [
      {
        titulo: "Contesta lo repetido, deriva lo que importa",
        texto:
          "Horarios, zonas de cobertura y cómo pedir cita se responden solos. En cuanto el mensaje se sale de ahí —una avería, una queja, un presupuesto grande— pasa a una persona con la conversación entera delante, no empezando de cero.",
      },
      {
        titulo: "El aviso entra ya con sus datos",
        texto:
          "Antes de derivar, recoge lo que siempre hay que preguntar: dirección, qué pasa, desde cuándo y si hay urgencia. La orden de trabajo se crea con eso ya puesto, en vez de con un «llamar a este señor» que obliga a repetir la conversación.",
      },
      {
        titulo: "En el idioma del que escribe",
        texto:
          "Responde en castellano, inglés o alemán según en qué os escriban, que en Mallorca no es un adorno: es la mitad de los clientes de muchas empresas de servicios.",
      },
    ],
    faq: [
      [
        "¿El cliente nota que habla con un bot?",
        "Se le dice. Intentar colarlo como persona sale mal en cuanto pregunta algo torcido, y además deteriora la confianza justo en el primer contacto. Lo que valora un cliente a las once de la noche es que alguien recoja su aviso, no que le engañen sobre quién lo recoge.",
      ],
      [
        "¿Hace falta la API de WhatsApp Business?",
        "Para hacerlo bien, sí. Es el canal oficial de Meta, el único que permite responder de forma automática sin arriesgar el número. Tiene coste por conversación según las tarifas de Meta, que se os explica antes de empezar y no lo ponemos nosotros.",
      ],
      [
        "¿Perdemos nuestro número de siempre?",
        "No, pero hay que decidirlo antes. Un número que ya usa la aplicación normal de WhatsApp no puede estar a la vez en la API. Es la primera conversación que tenemos, porque hacerlo al revés obliga a avisar a toda la cartera de clientes de un cambio de número.",
      ],
      [
        "¿Se puede desactivar en horario de oficina?",
        "Sí, y suele ser lo sensato al principio: de nueve a seis contesta el equipo, y fuera de ese horario entra el asistente. Así se ve en qué se equivoca antes de darle toda la conversación.",
      ],
      [
        "¿Qué pasa si no entiende algo?",
        "Lo pasa a una persona y lo dice. Un asistente que insiste en no entender es peor que no tener ninguno, así que está puesto para rendirse pronto y dejar el mensaje en la bandeja con todo lo que llevaba recogido.",
      ],
    ],
  },
};
