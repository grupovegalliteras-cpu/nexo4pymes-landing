/* ============================================================
   DATOS DE MARCA Y CIFRAS REALES
   Este archivo es la única fuente de verdad de los números y los
   enlaces. Ningún componente escribe un precio o un contador a
   mano: todos leen de aquí.

   OJO: los importes de `oferta` ya NO se muestran en ninguna
   página. Se retiraron de /servicios y la landing veterinaria, que
   era la otra que los enseñaba, se retiró de internet. Siguen aquí
   para no perderlos y porque `plazasLibres` sí se usa.

   AL AGOTARSE LAS PLAZAS: cambia `plazasLibres` y revisa
   `ofertaActiva`. Si `ofertaActiva` pasa a false, la mención
   desaparece sola de su único sitio: la barra flotante de
   /servicios.
   ============================================================ */

export const marca = {
  nombre: "Nexo4Pymes",
  dominio: "https://nexo4pymes.com",
  /* Email y Calendly salen de variables de entorno para poder cambiarlos
     sin tocar código ni desplegar a mano. Si la variable no existe, se usa
     el valor de aquí abajo y la web sigue funcionando igual.

     EL CORREO YA ES EL DEL DOMINIO. Sale en el aviso legal, en /contacto,
     en el pie, en los datos estructurados y en /llms.txt, todo desde aquí.

     OJO SI ALGUNA VEZ NO CAMBIA EN LA WEB: puede haber un
     NEXT_PUBLIC_CONTACT_EMAIL puesto en Vercel con el correo antiguo. La
     variable de entorno manda sobre esta línea, así que habría que
     borrarla allí o actualizarla.

     TODO(HUMANO): queda el Calendly, que sigue siendo el personal. Cuando
     exista el de Nexo4Pymes, se cambia abajo o se pone
     NEXT_PUBLIC_CALENDLY_URL en Vercel. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@nexo4pymes.com",
  calendly:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/grupovegalliteras/demo-15-minutos",

  /* WHATSAPP — EL CANAL DE CIERRE.
     Es el CTA principal de toda la web. El cliente tipo (gerente de
     pyme de servicios, con el móvil en la mano y a pie de obra) escribe
     por WhatsApp; abrir Calendly y cuadrar una videollamada con
     desconocidos es una barrera que no supera. Calendly no desaparece:
     baja a segunda opción para quien prefiera hablar.

     `whatsapp` va en formato internacional sin signos ni espacios, que
     es lo único que acepta wa.me. `whatsappVisible` es el mismo número
     escrito para leerlo (pie de página y /contacto).
     Los mensajes prefijados viven en lib/whatsapp.ts. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34661922690",
  whatsappVisible: "+34 661 92 26 90",
  /* Aquí había también `facebook`. Se retiró del sitio: la única red
     que se enlaza es Instagram.

     OJO — esto NO afecta a dos cosas que siguen dependiendo de Meta y
     que no son enlaces:
       · la etiqueta facebook-domain-verification de app/layout.tsx,
         que verifica el dominio ante Meta Business;
       · el píxel de Meta, que mide los anuncios.
     Si algún día se recupera la página de Facebook, basta con volver
     a añadir la clave aquí y el enlace en el pie y en /nosotros. */
  instagram: "https://instagram.com/nexo4pymes",

  /* FICHA DE GOOGLE BUSINESS PROFILE.
     Es la pieza que une esta web con el negocio verificado que sale en
     el mapa. En cuanto esté aquí, pasan tres cosas solas:

       · entra en el `sameAs` de los datos estructurados, que es como se
         le dice a Google «esta web y esa ficha son la misma empresa»;
       · aparece un enlace en los datos de empresa de /contacto;
       · deja de salir el aviso del build.

     POR QUÉ ESTA DIRECCIÓN Y NO LA DE «COMPARTIR». El botón de
     compartir da un share.google/… que es un acortador con parámetros
     de seguimiento y que Google puede rotar. Esta se construye con el
     identificador de sitio (place_id), que no cambia mientras exista
     la ficha, y es el formato que documenta Google para enlazar a un
     sitio concreto.

     El place_id salió del propio enlace de reseñas de abajo: al
     seguirlo, Google redirige a search.google.com/local/writereview
     con placeid=ChIJBW1Kl7WTlxIRPz17tKA2Im0. */
  googleBusiness: "https://www.google.com/maps/place/?q=place_id:ChIJBW1Kl7WTlxIRPz17tKA2Im0",

  /* Enlace directo para dejar una reseña, el que da Google en la ficha
     en «Pedir reseñas». Es el que hay que mandar a los clientes:
     cualquier otro los deja en una búsqueda y por el camino se pierde
     la mitad.

     NO SE ENSEÑA EN LA WEB Y ES A PROPÓSITO: pedir una reseña a quien
     acaba de entrar en la página no tiene sentido, y una web que la
     pide a cualquiera recoge opiniones de gente que no es cliente. Se
     manda por WhatsApp a quien ya ha trabajado con vosotros. Está aquí
     para tenerlo en un sitio y que no se pierda. */
  googleResenas: "https://g.page/r/CT89e7SgNiJtECE/review",

  /* CENTRALAVISOS — producto propio con landing aparte.
     A 19 de septiembre de 2026 centralavisos.com todavía no resuelve,
     así que se enlaza el despliegue de Vercel.
     TODO(HUMANO): cuando el dominio esté publicado, cambiar esta línea
     y ya está: la web entera enlaza desde aquí. */
  centralAvisos: "https://landing-central-avisos.vercel.app/",
  razonSocial: "Nexo4Pymes S.L. (en constitución)",
  localidad: "Mallorca",
  region: "Illes Balears",

  /* DIRECCIÓN REAL, en dos piezas a propósito: el aviso legal las
     quiere juntas en una línea y schema.org las quiere separadas
     (streetAddress / addressLocality). Partiendo de aquí no puede
     haber una dirección en la página legal y otra en los datos
     estructurados.

     EL NOMBRE DE LA CALLE LLEVA "del" porque es como la escribe la
     ficha verificada de Google: "Carrer del General Riera". Para una
     búsqueda local, que la web y la ficha digan exactamente lo mismo
     es lo que confirma que son la misma empresa; dos variantes
     parecidas son dos empresas a medias.

     EL CÓDIGO POSTAL ES 07010 Y ESTÁ CONFIRMADO. Al geocodificar para
     sacar las coordenadas, OpenStreetMap devolvía 07003 para este
     número y quedó la duda apuntada. La ficha de Google, que es el
     dato verificado, dice 07010. Queda cerrado. */
  calle: "Carrer del General Riera 64",
  codigoPostal: "07010",
  municipio: "Palma",

  /* Coordenadas del portal. No están puestas a ojo: salen de
     geocodificar la dirección de arriba en OpenStreetMap. Las usa
     lib/esquema.ts para que la ficha de empresa se ancle a Palma.
     Si cambia la dirección, hay que volver a geocodificar. */
  latitud: 39.5843,
  longitud: 2.6465,
} as const;

/* ============================================================
   HORARIO DE ATENCIÓN

   Va aparte del objeto `marca` por una razón técnica: `marca` lleva
   `as const` y eso congela el array vacío en un tipo que no admite
   tramos. Aquí se declara con su tipo y se puede rellenar sin pelear
   con TypeScript.

   De aquí salen dos cosas y solo estas dos:
     · `openingHoursSpecification` en los datos estructurados
       (lib/esquema.ts);
     · la fila "Horario" de /contacto, ya traducida (lib/horario.ts).

   TIENE QUE DECIR LO MISMO QUE LA FICHA DE GOOGLE. No es una
   recomendación de estilo: cuando la ficha verificada y el sitio
   oficial de la misma empresa publican horarios distintos, el dato
   deja de ser fiable para Google y pierde fuerza en los dos sitios.

   Los días van con el nombre inglés que pide schema.org, que es
   además el formato que la documentación de Google usa en sus
   ejemplos de negocio local. Las horas, en 24 h y "HH:MM".

   Un tramo por cada bloque de días con el mismo horario. Si hay
   pausa al mediodía, son dos tramos de los mismos días:

     { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
       abre: "09:00", cierra: "14:00" },
     { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
       abre: "15:00", cierra: "18:00" },

   TODO(HUMANO): copiar aquí el horario que publica la ficha.
   ============================================================ */
export type Dia = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type TramoHorario = {
  dias: Dia[];
  /** Hora de apertura en formato 24 h, "HH:MM". */
  abre: string;
  /** Hora de cierre en formato 24 h, "HH:MM". */
  cierra: string;
};

export const horarioAtencion: TramoHorario[] = [];

/* ============================================================
   DATOS LEGALES — ÚNICO SITIO DONDE SE TOCAN

   Antes estaban escritos a mano dentro de app/legal/page.tsx, con
   cinco `[PENDIENTE]` publicados en internet. Ahora están aquí y la
   página los lee. Cambiar un dato es cambiar una línea de este
   archivo.

   POR QUÉ FIGURA UN NIF DE PERSONA Y NO UN CIF DE EMPRESA:
   la S.L. está en constitución, así que todavía no tiene CIF. Hasta
   que el Registro Mercantil lo asigne, quien responde legalmente de
   esta web es la persona física, y la ley (LSSI-CE, art. 10) exige
   publicar sus datos identificativos. No es un apaño: es lo correcto
   mientras la sociedad no exista.

   CUANDO LLEGUE EL CIF: cambia `tipoTitular` a "sociedad", pon el CIF
   en `identificacion`, rellena `registroMercantil` y quita el
   "(en constitución)" de `razonSocial` arriba. La página se actualiza
   sola.

   `marcadorPendiente` es el texto que busca el aviso del build: si
   aparece en algún campo, `npm run build` avisa en producción en vez
   de publicarlo en silencio. Ver lib/legal.ts.
   ============================================================ */
export const marcadorPendiente = "TODO(HUMANO)";

export const datosLegales = {
  /* "persona" mientras la S.L. no tenga CIF; "sociedad" después. */
  tipoTitular: "persona" as "persona" | "sociedad",

  /* Los dos socios de la sociedad en constitución. Mientras no haya
     CIF, el NIF que se publica debajo es el de uno de ellos: el que
     responde del sitio a efectos del artículo 10 de la LSSI-CE. */
  titular: "Alejandro Vega y Jaume Lliteras",

  nombreComercial: "Nexo4Pymes",

  /* NIF provisional del titular mientras no haya CIF de la sociedad. */
  identificacion: "43479075J",
  etiquetaIdentificacion: "NIF",

  /* Domicilio a efectos de notificaciones. Se compone de la dirección
     de arriba; la página le añade sola la región y el país. */
  domicilio: `${marca.calle}, ${marca.codigoPostal} ${marca.municipio}`,

  /* Vacío a propósito: no hay inscripción hasta que exista la S.L. */
  registroMercantil: "",

  /* Fecha de la última revisión del texto legal. Actualízala cuando
     cambies algo de fondo, no por una coma. */
  ultimaRevision: "19 de septiembre de 2026",
  /* La misma fecha en formato ISO, para escribirla en inglés y alemán. Cámbiala a la vez que la de arriba. */
  ultimaRevisionISO: "2026-09-19",
} as const;

export const oferta = {
  ofertaActiva: true,
  precio: 150,
  precioAntiguo: "250–450€",
  plazasTotales: 3,
  plazasLibres: 3,
  duracion: "3-4 días",
} as const;
