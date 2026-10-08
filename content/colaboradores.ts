/* ============================================================
   EMPRESAS COLABORADORAS

   Para qué está esta sección. Un estudio de dos personas tiene un
   problema de credibilidad que no se arregla escribiendo mejor: el
   visitante no sabe si detrás hay alguien. Decir con quién se
   trabaja, con nombre y enlace comprobable, es lo único que lo
   resuelve sin inventar nada.

   Y arregla una incoherencia que ya estaba: la web dice en dos sitios
   que CentralAvisos es «en colaboración con Multiservicios Mallorca»
   y en ninguno decía quiénes son.

   REGLA: aquí solo va una empresa con la que haya una relación real y
   que se pueda comprobar desde fuera. Una lista de logos que no
   llevan a ninguna parte resta credibilidad en vez de sumarla, y para
   un buscador es una sección de enlaces sin contenido.

   SI LA RELACIÓN ES PAGADA (afiliación, comisión), el enlace tiene que
   llevar rel="sponsored". Los que están aquí no lo son.

   `texto` vacío = la tarjeta sale con el nombre y el papel, sin
   descripción. Es a propósito: mejor corto que inventado.
   ============================================================ */

export type Colaborador = {
  nombre: string;
  /** Vacío mientras no se confirme. Sin web, la tarjeta no es un enlace. */
  web: string;
  papel: { es: string; en: string; de: string };
  texto: { es: string; en: string; de: string };
};

export const colaboradores: Colaborador[] = [
  {
    nombre: "Multiservicios Mallorca",
    web: "https://multiserviciosmallorca.es",
    papel: {
      es: "Socios en CentralAvisos",
      en: "Partners on CentralAvisos",
      de: "Partner bei CentralAvisos",
    },
    texto: {
      es: "Reformas y servicios para viviendas y negocios en Mallorca. CentralAvisos, nuestro producto para recoger avisos por teléfono y WhatsApp, se desarrolla en colaboración con ellos.",
      en: "Repairs and property services for homes and businesses in Mallorca. CentralAvisos, our product for handling enquiries by phone and WhatsApp, is built in partnership with them.",
      de: "Renovierungen und Hausdienstleistungen für Wohnungen und Betriebe auf Mallorca. CentralAvisos, unser Produkt für Anfragen per Telefon und WhatsApp, entsteht in Zusammenarbeit mit ihnen.",
    },
  },
  {
    nombre: "Conexia",
    /* TODO(HUMANO): la dirección de su web. No la pongo a ojo: hay varias
       empresas llamadas Conexia en otros países y enlazar a la que no es
       sería peor que no enlazar. */
    web: "",
    papel: { es: "Partner tecnológico", en: "Technology partner", de: "Technologiepartner" },
    /* TODO(HUMANO): una frase de qué hacen y en qué colaboramos, como la
       de arriba. Hasta entonces la tarjeta sale con el nombre y el papel:
       es lo único que puedo afirmar sin inventármelo. */
    texto: { es: "", en: "", de: "" },
  },
];

export const textosColaboradores = {
  es: {
    categoria: "Empresas colaboradoras",
    titulo: "No trabajamos solos",
    entradilla:
      "Somos dos, y eso es lo que nos permite trataros de tú a tú. Cuando un proyecto pide más manos o más oficio, lo hacemos con quien ya conocemos.",
  },
  en: {
    categoria: "Who we work with",
    titulo: "We don't work alone",
    entradilla:
      "There are two of us, which is what lets us deal with you directly. When a project needs more hands or more trade knowledge, we bring in people we already work with.",
  },
  de: {
    categoria: "Partnerunternehmen",
    titulo: "Wir arbeiten nicht allein",
    entradilla:
      "Wir sind zwei, und genau deshalb haben Sie es direkt mit uns zu tun. Wenn ein Projekt mehr Hände oder mehr Fachwissen braucht, holen wir Partner dazu, die wir kennen.",
  },
} as const;
