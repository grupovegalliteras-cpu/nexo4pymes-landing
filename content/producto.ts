/* ============================================================
   EL PRODUCTO — ÚNICA FUENTE DE VERDAD

   Desde noviembre de 2026 Nexo4Pymes vende UNA cosa: un empleado de
   IA que atiende el WhatsApp del negocio. Todo lo demás (fichaje,
   facturas, informes) es algo que ese empleado hace, no un producto
   suelto con su propia página.

   POR QUÉ CAMBIÓ. El catálogo anterior (5 módulos, 8 sectores, 7
   artículos, 104 páginas indexadas) dio 0 clics comerciales en 90
   días medidos en Search Console. Los 61 clics del trimestre eran
   búsquedas de la marca a la portada. El experimento se corrió y
   salió que no.

   POR QUÉ «EMPLEADO» Y NO «RECEPCIONISTA». Es la misma herramienta,
   pero cambia contra qué la compara el cliente: un recepcionista
   virtual se compara con otro software y topa en 100 €; un empleado
   se compara con una nómina y el techo es otro.

   LOS PRECIOS SON HIPÓTESIS. Ninguno está validado con un cliente
   que haya pagado. El de 39 € solo tiene sentido si el alta es
   automática: si hay que configurarlo a mano, cada cliente de 39 €
   tarda más de un año en pagar la tarde que costó.
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
    id: "recepcion",
    nombre: "Recepción",
    para: "Para el que no quiere perder llamadas ni arriesgar nada.",
    precio: 39,
    alta: 0,
    conversaciones: 150,
    incluye: [
      "Contesta el WhatsApp del negocio las 24 horas",
      "Responde las dudas de siempre: horarios, precios, zona, qué hacéis",
      "Recoge nombre, teléfono y qué necesita",
      "Te avisa a ti, y distinto si es urgente",
      "Se configura solo: rellenas una ficha y funciona",
    ],
  },
  {
    id: "agenda",
    nombre: "Agenda",
    para: "Para el que vive de las citas y pierde la mitad por no contestar a tiempo.",
    precio: 149,
    alta: 290,
    conversaciones: 600,
    destacado: true,
    etiqueta: "El que recomendamos",
    incluye: [
      "Todo lo de Recepción",
      "Apunta la cita en tu calendario, sin llamadas de ida y vuelta",
      "Recuerda la visita el día antes y persigue a quien no contesta",
      "Pide la reseña cuando el trabajo ya está hecho",
      "Lo dejamos montado nosotros con tus datos y tu forma de hablar",
    ],
  },
  {
    id: "empleado",
    nombre: "Empleado",
    para: "Para el que quiere quitarse la administración de encima, no solo el teléfono.",
    precio: 290,
    alta: 490,
    conversaciones: 2000,
    incluye: [
      "Todo lo de Agenda",
      "Persigue los presupuestos hasta que el cliente decide",
      "Fichaje por WhatsApp: tu equipo entra y sale escribiendo",
      "Le mandas la foto del ticket y la guarda ordenada para tu gestor",
      "Informe semanal de lo que ha pasado y lo que se ha quedado por el camino",
    ],
  },
];

/* FICHAJE VA EN EL PLAN DE ARRIBA Y NO EN SU PROPIA PÁGINA.
   De 75 términos medidos en Google Tendencias, «fichaje» fue de las
   pocas cosas que crecen (+126 %) y pesa tanto como «crm». Es
   obligación legal, es un sello de hora en una base de datos y no
   tiene riesgo fiscal. Es la puerta de conversación, no el producto.

   Y LOS TICKETS SE CAPTURAN, NO SE CONTABILIZAN. Nosotros los
   guardamos ordenados; quien los contabiliza es su gestor. En
   cuanto se cruza esa línea hay responsabilidad fiscal y soporte
   infinito, que es justo lo contrario del plan. */

/** El plan que se anuncia en los vídeos: el más barato. */
export const PLAN_GANCHO = PLANES[0];
/** El plan que sostiene el negocio. */
export const PLAN_PRINCIPAL = PLANES.find((p) => p.destacado) ?? PLANES[1];

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
