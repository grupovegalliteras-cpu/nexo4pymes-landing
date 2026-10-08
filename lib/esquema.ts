import { marca } from "@/content/marca";
import { LOCALE, conIdioma, type Idioma } from "@/lib/i18n";

/* ============================================================
   DATOS ESTRUCTURADOS (JSON-LD)

   Para qué sirve esto. Google y los buscadores de respuestas
   (ChatGPT, Perplexity, las AI Overviews) leen el texto de la
   página, pero lo que les dice sin ambigüedad quiénes somos, dónde
   estamos y qué vendemos es este bloque. Es la diferencia entre que
   un buscador deduzca que hay una empresa en Palma y que lo sepa.

   UNA SOLA ENTIDAD DE NEGOCIO. Todas las páginas emiten el mismo
   @id (…/#business). Si se duplicara con datos distintos, Google
   vería dos empresas diferentes y repartiría la autoridad entre las
   dos. Los datos se tocan en content/marca.ts y en este archivo, en
   ningún otro sitio.

   POR QUÉ VA POR IDIOMAS. Una descripción en español dentro de una
   página alemana es una contradicción: el lang del HTML dice "de" y
   el dato estructurado dice otra cosa. Cada idioma emite su texto y
   su inLanguage.
   ============================================================ */

const ID_NEGOCIO = `${marca.dominio}/#business`;
const ID_SITIO = `${marca.dominio}/#website`;

/** Dirección absoluta de una ruta interna en un idioma. */
export function urlAbsoluta(lang: Idioma, ruta: string) {
  const r = conIdioma(lang, ruta);
  return `${marca.dominio}${r === "/" ? "/" : r}`;
}

const DESCRIPCION = {
  es: "Desarrollo de software a medida para pymes y autónomos en Mallorca: programa de gestión para empresas de servicios, CRM propios, fichaje, facturación con VeriFactu, configuradores web e integraciones. Diagnóstico primero, desarrollo por fases después.",
  en: "Custom software development for small businesses in Mallorca: management software for service companies, bespoke CRMs, time clock, VeriFactu invoicing, web configurators and integrations. Diagnosis first, phased development after.",
  de: "Individuelle Softwareentwicklung für kleine Unternehmen auf Mallorca: Branchensoftware für Dienstleister, eigene CRMs, Zeiterfassung, Rechnungen mit VeriFactu, Web-Konfiguratoren und Integrationen. Zuerst die Analyse, dann Entwicklung in Phasen.",
} as const;

const LEMA = {
  es: "Diagnóstico primero, software a medida después.",
  en: "Diagnosis first, custom software after.",
  de: "Zuerst die Analyse, dann individuelle Software.",
} as const;

const CONOCIMIENTOS = {
  es: [
    "Desarrollo de software a medida",
    "Programa de gestión para empresas de servicios",
    "CRM a medida para pymes",
    "Control de fichaje y jornada laboral",
    "Facturación electrónica y VeriFactu",
    "Configuradores de producto para la web",
    "Integración de sistemas y automatización de procesos",
    "Inteligencia artificial aplicada a pymes",
  ],
  en: [
    "Custom software development",
    "Field service management software",
    "Bespoke CRM for small businesses",
    "Time and attendance tracking",
    "Electronic invoicing and VeriFactu",
    "Web product configurators",
    "Systems integration and process automation",
    "Applied AI for small businesses",
  ],
  de: [
    "Individuelle Softwareentwicklung",
    "Branchensoftware für Dienstleister",
    "Individuelles CRM für kleine Unternehmen",
    "Zeiterfassung und Arbeitszeitnachweis",
    "Elektronische Rechnung und VeriFactu",
    "Web-Produktkonfiguratoren",
    "Systemintegration und Prozessautomatisierung",
    "Angewandte KI für kleine Unternehmen",
  ],
} as const;

/* El catálogo de servicios. Es lo que un buscador de respuestas
   necesita para contestar "¿qué hace esta empresa?" con una lista y
   no con una frase de marketing. Son los mismos de /servicios. */
const SERVICIOS = {
  es: [
    ["Diagnóstico digital", "Dos o tres días mirando cómo trabajáis de verdad, y un informe con qué automatizar, qué no y en qué orden."],
    ["Programa de gestión para empresas de servicios", "Panel de oficina y app para los técnicos: avisos, órdenes de trabajo, rutas, partes con foto y firma, y facturación."],
    ["CRM a medida", "Clientes, instalaciones, presupuestos y contratos de mantenimiento en un sistema hecho para vuestra forma de trabajar."],
    ["Fichaje y control de jornada", "Entrada, salida y pausas desde el móvil, con registro de jornada exportable para inspección."],
    ["Configuradores de producto para la web", "El cliente arma su producto con sus variantes y recibe el precio al momento."],
    ["Integraciones y automatizaciones", "Conectar la web, el banco, la gestoría y el correo para que el dato se teclee una sola vez."],
  ],
  en: [
    ["Digital diagnosis", "Two or three days watching how you actually work, and a report on what to automate, what not to, and in what order."],
    ["Field service management software", "Office dashboard and technician app: service requests, work orders, routes, job reports with photo and signature, and invoicing."],
    ["Bespoke CRM", "Customers, installations, quotes and maintenance contracts in a system built around the way you work."],
    ["Time clock and attendance", "Clock in, clock out and breaks from a phone, with an exportable record for labour inspection."],
    ["Web product configurators", "Your customer builds their product with its variants and gets the price straight away."],
    ["Integrations and automation", "Connecting the website, the bank, the accountant and email so data is typed once."],
  ],
  de: [
    ["Digitale Analyse", "Zwei oder drei Tage, in denen wir sehen, wie Sie wirklich arbeiten, und ein Bericht darüber, was automatisiert werden sollte, was nicht und in welcher Reihenfolge."],
    ["Branchensoftware für Dienstleister", "Büro-Dashboard und Techniker-App: Aufträge, Arbeitsscheine, Routen, Berichte mit Foto und Unterschrift und Rechnungsstellung."],
    ["Individuelles CRM", "Kunden, Anlagen, Angebote und Wartungsverträge in einem System, das zu Ihrer Arbeitsweise passt."],
    ["Zeiterfassung", "Kommen, Gehen und Pausen per Handy, mit exportierbarem Nachweis für die Arbeitsaufsicht."],
    ["Web-Produktkonfiguratoren", "Ihr Kunde stellt sein Produkt mit allen Varianten zusammen und erhält den Preis sofort."],
    ["Integrationen und Automatisierung", "Website, Bank, Steuerberatung und E-Mail verbinden, damit Daten nur einmal eingegeben werden."],
  ],
} as const;

/** La empresa. Misma entidad en todas las páginas, texto en el idioma de la página. */
export function esquemaNegocio(lang: Idioma) {
  return {
    "@type": "ProfessionalService",
    "@id": ID_NEGOCIO,
    name: marca.nombre,
    legalName: marca.razonSocial,
    alternateName: "Nexo 4 Pymes",
    description: DESCRIPCION[lang],
    slogan: LEMA[lang],
    url: urlAbsoluta(lang, "/"),
    email: marca.email,
    logo: `${marca.dominio}/assets/logo.png`,
    image: [`${marca.dominio}/assets/og-nexo4pymes.jpg`, `${marca.dominio}/assets/logo.png`],
    /* La dirección era solo "Mallorca, Illes Balears": para Google eso
       es una isla, no un domicilio. Con calle y municipio reales la
       ficha puede aspirar a resultados locales de Palma, que es donde
       está el cliente que nos puede contratar. */
    address: {
      "@type": "PostalAddress",
      streetAddress: marca.calle,
      postalCode: marca.codigoPostal,
      addressLocality: marca.municipio,
      addressRegion: marca.region,
      addressCountry: "ES",
    },
    /* Coordenadas del portal, geocodificadas con OpenStreetMap: no
       están puestas a ojo. Anclan la ficha a Palma y no a "Baleares"
       en general. */
    geo: { "@type": "GeoCoordinates", latitude: marca.latitud, longitude: marca.longitud },
    /* El mismo número que el botón de WhatsApp de toda la web, en
       formato internacional, que es el que pide schema.org. */
    telephone: `+${marca.whatsapp}`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+${marca.whatsapp}`,
        email: marca.email,
        contactType: "sales",
        areaServed: "ES",
        availableLanguage: ["es", "en", "de"],
      },
    ],
    /* De dentro a fuera: el municipio donde estamos, la isla como la
       nombra el cliente, la comunidad y el país. Sin Palma explícito,
       "software a medida Palma" no tiene a qué agarrarse. */
    areaServed: [
      { "@type": "City", name: "Palma de Mallorca" },
      { "@type": "Place", name: "Mallorca" },
      { "@type": "AdministrativeArea", name: "Illes Balears" },
      { "@type": "Country", name: "España" },
    ],
    /* Somos dos. Decirlo es un dato de entidad, no una modestia:
       separa a Nexo4Pymes de las consultoras de cincuenta personas
       con las que comparte resultados de búsqueda. */
    numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
    founder: [
      { "@type": "Person", name: "Alejandro Vega" },
      { "@type": "Person", name: "Jaume Lliteras" },
    ],
    /* Banda de precio genérica. schema.org no admite "depende del
       proyecto", y sin este campo la prueba de resultados
       enriquecidos lo marca como recomendado que falta. */
    priceRange: "€€",
    currenciesAccepted: "EUR",
    knowsLanguage: ["es", "en", "de"],
    knowsAbout: CONOCIMIENTOS[lang],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: marca.nombre,
      itemListElement: SERVICIOS[lang].map(([nombre, descripcion]) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: nombre,
          description: descripcion,
          provider: { "@id": ID_NEGOCIO },
          areaServed: { "@type": "Place", name: "Mallorca" },
        },
      })),
    },
    /* sameAs le dice a Google qué perfiles son de esta misma empresa.
       Solo Instagram: el perfil de Facebook ya no se enlaza, y listar
       aquí una página que no reconocemos en la web sería incoherente. */
    sameAs: [marca.instagram],
  };
}

/** El sitio como entidad. De aquí saca Google el nombre del sitio que enseña en los resultados. */
export function esquemaSitio(lang: Idioma) {
  return {
    "@type": "WebSite",
    "@id": ID_SITIO,
    url: urlAbsoluta(lang, "/"),
    name: marca.nombre,
    alternateName: "Nexo 4 Pymes",
    description: DESCRIPCION[lang],
    publisher: { "@id": ID_NEGOCIO },
    inLanguage: LOCALE[lang],
  };
}

/** Lo que va en todas las páginas: la empresa y el sitio, en un solo bloque. */
export function grafoBase(lang: Idioma, extra: object[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [esquemaNegocio(lang), esquemaSitio(lang), ...extra],
  };
}

/** Envuelve en un bloque JSON-LD lo que una página añade a lo que ya pone el layout. */
export function grafoPagina(items: object[]) {
  return { "@context": "https://schema.org", "@graph": items };
}

/** Migas de pan. Le dicen al buscador dónde encaja la página dentro del sitio. */
export function esquemaMigas(lang: Idioma, pasos: { nombre: string; ruta?: string }[]) {
  const inicio = { es: "Inicio", en: "Home", de: "Start" }[lang];
  const todos = [{ nombre: inicio, ruta: "/" }, ...pasos];
  return {
    "@type": "BreadcrumbList",
    "@id": `${urlAbsoluta(lang, pasos[pasos.length - 1]?.ruta ?? "/")}#migas`,
    itemListElement: todos.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nombre,
      /* El último escalón no lleva item: es la página en la que ya
         estás y Google pide que se omita. */
      ...(i < todos.length - 1 && p.ruta ? { item: urlAbsoluta(lang, p.ruta) } : {}),
    })),
  };
}

/* Google retiró los resultados enriquecidos de preguntas frecuentes
   en mayo de 2026, así que esto ya no pinta un acordeón en el
   buscador. Se mantiene porque el marcado sigue siendo válido y es lo
   que convierte una pregunta visible de la página en una pregunta con
   respuesta identificable para ChatGPT, Perplexity y las AI
   Overviews, que es donde está el tráfico que ya no hace clic. */
export function esquemaFaq(preguntas: { p: string; r: string }[], id: string, lang?: Idioma) {
  return {
    "@type": "FAQPage",
    "@id": id,
    ...(lang ? { inLanguage: LOCALE[lang] } : {}),
    mainEntity: preguntas.map((item) => ({
      "@type": "Question",
      name: item.p,
      acceptedAnswer: { "@type": "Answer", text: item.r },
    })),
  };
}

/** Una página de sector, como servicio con ámbito local. */
export function esquemaServicio({
  lang,
  nombre,
  descripcion,
  ruta,
}: {
  lang: Idioma;
  nombre: string;
  descripcion: string;
  ruta: string;
}) {
  return {
    "@type": "Service",
    "@id": `${urlAbsoluta(lang, ruta)}#servicio`,
    name: nombre,
    description: descripcion,
    serviceType: nombre,
    url: urlAbsoluta(lang, ruta),
    provider: { "@id": ID_NEGOCIO },
    areaServed: [
      { "@type": "Place", name: "Mallorca" },
      { "@type": "AdministrativeArea", name: "Illes Balears" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: urlAbsoluta(lang, ruta),
      servicePhone: { "@type": "ContactPoint", telephone: `+${marca.whatsapp}` },
    },
  };
}

/* Un artículo necesita tres cosas para que un buscador de respuestas
   lo cite: quién lo escribe, cuándo y de dónde sale. Los autores van
   como personas con nombre y no como "la empresa": una firma humana
   es lo que separa un artículo de una nota de prensa. */
export function esquemaArticulo({
  lang,
  titulo,
  descripcion,
  url,
  fecha,
  actualizado,
}: {
  lang: Idioma;
  titulo: string;
  descripcion: string;
  url: string;
  fecha: string;
  actualizado?: string;
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${url}#articulo`,
    headline: titulo,
    description: descripcion,
    url,
    inLanguage: LOCALE[lang],
    datePublished: fecha,
    dateModified: actualizado ?? fecha,
    image: `${marca.dominio}/assets/og-nexo4pymes.jpg`,
    author: [
      { "@type": "Person", name: "Alejandro Vega", worksFor: { "@id": ID_NEGOCIO } },
      { "@type": "Person", name: "Jaume Lliteras", worksFor: { "@id": ID_NEGOCIO } },
    ],
    publisher: { "@id": ID_NEGOCIO },
    isPartOf: { "@id": ID_SITIO },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
