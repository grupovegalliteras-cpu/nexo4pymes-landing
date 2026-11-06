/* ============================================================
   EL PRODUCTO — ÚNICA FUENTE DE VERDAD

   Desde noviembre de 2026 Nexo4Pymes vende UNA cosa: un empleado de
   IA que atiende el WhatsApp de un negocio de servicios. Todo lo
   demás (fichaje, tickets, reactivación) es algo que ese empleado
   hace, no un producto suelto con su propia página.

   POR QUÉ CAMBIÓ. El catálogo anterior (5 módulos, 8 sectores, 7
   artículos, 104 páginas indexadas) dio 0 clics comerciales en 90
   días medidos en Search Console. Los 61 clics del trimestre eran
   búsquedas de la marca a la portada.

   6 DE NOVIEMBRE DE 2026 — LAS DOS VERSIONES, FUNDIDAS.
   Jaume escribió su definición del producto por su lado y aquí
   estaba la mía. Esto es el resultado de juntarlas:

     · Los nombres y los dos planes de arriba son los suyos
       (Atiende / Agenda / Cierra, 169 y 290 €), que están puestos
       sabiendo lo que cuesta montar uno.
     · El plan de entrada baja a 39 €, que es cosa del anuncio y no
       del margen: el canal es Meta, nadie busca esto, y «desde
       39 €» frena el scroll donde «desde 89 €» no.
     · El nicho se cierra a los oficios de urgencia. Fuera clínicas,
       peluquerías y despachos, que había abierto yo.
     · Entra el protocolo de urgencia, que es de Jaume y es lo mejor
       de todo el producto.
     · Entra fichaje arriba, por los datos de demanda.

   LOS PRECIOS SIGUEN SIN VALIDAR. Ninguno. El de 39 € además solo
   tiene sentido si el alta es automática: con alta manual, ese
   cliente tarda más de un año en pagar la tarde que costó.
   ============================================================ */

export type Plan = {
  id: string;
  nombre: string;
  /** Para quién es, en una línea. */
  para: string;
  precio: number;
  /** Alta única. 0 = se configura solo, sin alta. */
  alta: number;
  /** Conversaciones al mes incluidas. */
  conversaciones: number;
  /** Lo que hace, en orden de importancia. */
  incluye: string[];
  destacado?: boolean;
  /** Etiqueta sobre la tarjeta destacada. */
  etiqueta?: string;
};

export const PLANES: Plan[] = [
  {
    id: "atiende",
    nombre: "Atiende",
    para: "Para el que no quiere perder un aviso ni arriesgar nada.",
    precio: 39,
    alta: 0,
    conversaciones: 150,
    incluye: [
      "Contesta el WhatsApp del negocio las 24 horas",
      "Protocolo de urgencia: corta el agua, avisa al de guardia, 112 si huele a gas",
      "Responde las dudas de siempre: zona, horarios, precios, qué hacéis",
      "Recoge nombre, teléfono, dirección y qué necesita",
      "Se configura solo: rellenas la ficha de tu negocio y funciona",
    ],
  },
  {
    id: "agenda",
    nombre: "Agenda",
    para: "Para el que vive de las visitas y pierde la mitad por no contestar a tiempo.",
    precio: 169,
    alta: 290,
    conversaciones: 600,
    destacado: true,
    etiqueta: "El que recomendamos",
    incluye: [
      "Todo lo de Atiende",
      "Ofrece dos o tres horas de tu agenda y apunta la visita",
      "Recuerda la visita el día antes, y la cambia o la anula si hace falta",
      "Persigue al que no contesta: a los 3 y a los 7 días, nunca de noche ni en domingo",
      "Lo montamos nosotros con tus datos y tu forma de hablar",
    ],
  },
  {
    id: "cierra",
    nombre: "Cierra",
    para: "Para el que quiere quitarse la administración de encima, no solo el teléfono.",
    precio: 290,
    alta: 490,
    conversaciones: 2000,
    incluye: [
      "Todo lo de Agenda",
      "Persigue los presupuestos hasta que el cliente decide",
      "Reactivación de clientes antiguos incluida",
      "Fichaje por WhatsApp: tu equipo escribe «entro» y «salgo»",
      "Le mandas la foto del ticket y la guarda ordenada para tu gestor",
    ],
  },
];

/* FICHAJE VA EN EL PLAN DE ARRIBA Y NO EN SU PROPIA PÁGINA.
   De 75 términos medidos en Google Tendencias, «fichaje» fue de las
   pocas cosas que crecen (+126 %) y pesa tanto como «crm». Es
   obligación legal, es un sello de hora en una base de datos y no
   tiene riesgo fiscal.

   Y LOS TICKETS SE CAPTURAN, NO SE CONTABILIZAN. Nosotros los
   guardamos ordenados; quien los contabiliza es su gestor. En
   cuanto se cruza esa línea hay responsabilidad fiscal y soporte
   infinito, que es justo lo contrario del plan.

   LOS COBROS LLEVAN TOPE: dos recordatorios y el tercero lo manda
   el dueño a mano. Reclamar dinero por WhatsApp toca la relación
   más delicada que tiene nuestro cliente con el suyo. */

/** El plan que se anuncia en los vídeos: el más barato. */
export const PLAN_GANCHO = PLANES[0];
/** El plan que sostiene el negocio. */
export const PLAN_PRINCIPAL = PLANES.find((p) => p.destacado) ?? PLANES[1];

/* ============================================================
   LA REACTIVACIÓN — EL SEGUNDO INGRESO

   Idea de Jaume, y de las mejores: al cliente no le cuesta nada por
   adelantado, monetiza una lista que ya tiene muerta en un Excel y
   es el «sí» más fácil de conseguir.
   ============================================================ */

export const REACTIVACION = {
  nombre: "Reactivación de clientes antiguos",
  para: "Para quien tiene clientes que repiten: revisiones, mantenimientos, limpiezas.",
  explicacion:
    "Escribimos a sus clientes antiguos («hace un año de la revisión de tu caldera, ¿te la hacemos?») y el asistente contesta y apunta las visitas.",
  /** Se paga por resultado, no por mes. */
  minimoPorVisita: 20,
  maximoPorVisita: 30,
  /** En qué planes se paga aparte; en el de arriba va incluida. */
  incluidaEn: "cierra",
} as const;

/* ============================================================
   LA AYUDA DEL GOVERN — LÍNIA 3.1

   Verificado el 6 de noviembre de 2026 contra el texto consolidado
   de la convocatoria (versión de 26/02/2026) y la ficha del trámite
   6064112 de la Seu Electrònica del Govern de les Illes Balears.

   NO INVENTAR NADA AQUÍ. Es dinero público con plazo: si la web
   dice algo que la convocatoria no dice, el cliente se queda sin
   ayuda y nosotros con el problema.
   ============================================================ */

export const AYUDA = {
  nombre: "Línia 3.1 — digitalització en la gestió empresarial i màrqueting digital",
  organismo: "Govern de les Illes Balears",
  fondo: "FEDER 2021-2027",
  tramite: "6064112",
  fichaOficial: "https://www.caib.es/seucaib/es/201/empreses/tramites/tramite/6064112/",

  /** Porcentaje del gasto que cubre. */
  porcentaje: 100,
  importeMinimo: 1800,
  importeMaximo: 6000,

  /** Plazo de la anualidad 2027. */
  abre: "2026-12-01",
  cierra: "2027-01-05",
  abreTexto: "1 de diciembre de 2026",
  cierraTexto: "5 de enero de 2027",

  /** Se resuelve por orden de entrada hasta agotar crédito. */
  porOrdenDeEntrada: true,

  /** Lo que la convocatoria nombra por su nombre y nosotros hacemos. */
  cubre: [
    "Digitalizar y optimizar la gestión de la relación con los clientes (CRM)",
    "Implantar inteligencia artificial",
    "Automatizar procesos de forma inteligente",
    "Digitalizar o automatizar procesos de negocio",
    "Análisis de datos para mejorar la toma de decisiones",
    "Plan de marketing digital",
  ],

  /** Las condiciones que hay que contar antes, no después. */
  condiciones: [
    "La empresa tiene que tener domicilio fiscal y centro de trabajo en Baleares.",
    "Quedan fuera los CNAE 45, 46 y 47: venta y reparación de vehículos, comercio mayorista y comercio minorista.",
    "No entra lo que ya pagó el Kit Digital.",
    "Solo cuenta el gasto hecho después de presentar la solicitud. Primero se pide, después se contrata.",
    "Se resuelve por orden de entrada hasta que se acaba el crédito.",
  ],
} as const;

/** ¿Llega este plan al mínimo de 1.800 € con el primer año por delante? */
export function entraEnLaAyuda(plan: Plan): boolean {
  return plan.alta + plan.precio * 12 >= AYUDA.importeMinimo;
}

/** Lo que costaría el primer año completo de un plan (alta + 12 meses). */
export function primerAno(plan: Plan): number {
  return plan.alta + plan.precio * 12;
}
