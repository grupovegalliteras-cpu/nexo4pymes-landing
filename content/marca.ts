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
  /* Email y Calendly salen de variables de entorno para poder pasar
     del correo personal al del dominio sin tocar código ni desplegar
     a mano. Si la variable no existe, se usa el valor de siempre y la
     web sigue funcionando igual.

     TODO(HUMANO): crear contacto@nexo4pymes.com y el Calendly de
     Nexo4Pymes, y rellenar NEXT_PUBLIC_CONTACT_EMAIL y
     NEXT_PUBLIC_CALENDLY_URL en Vercel. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "grupovegalliteras@gmail.com",
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

  /* CENTRALAVISOS — producto propio con landing aparte.
     A 19 de septiembre de 2026 centralavisos.com todavía no resuelve,
     así que se enlaza el despliegue de Vercel.
     TODO(HUMANO): cuando el dominio esté publicado, cambiar esta línea
     y ya está: la web entera enlaza desde aquí. */
  centralAvisos: "https://landing-central-avisos.vercel.app/",
  razonSocial: "Nexo4Pymes S.L. (en constitución)",
  localidad: "Mallorca",
  region: "Illes Balears",
} as const;

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

  /* TODO(HUMANO): nombre y apellidos completos del titular, tal y
     como figuran en el DNI. Sin esto el aviso legal está incompleto. */
  titular: "TODO(HUMANO): nombre y apellidos del titular",

  nombreComercial: "Nexo4Pymes",

  /* NIF provisional del titular mientras no haya CIF de la sociedad. */
  identificacion: "43479075J",
  etiquetaIdentificacion: "NIF",

  /* TODO(HUMANO): domicilio completo a efectos de notificaciones
     (calle, número, código postal y municipio). */
  domicilio: "TODO(HUMANO): domicilio completo",

  /* Vacío a propósito: no hay inscripción hasta que exista la S.L. */
  registroMercantil: "",

  /* Fecha de la última revisión del texto legal. Actualízala cuando
     cambies algo de fondo, no por una coma. */
  ultimaRevision: "19 de septiembre de 2026",
} as const;

export const oferta = {
  ofertaActiva: true,
  precio: 150,
  precioAntiguo: "250–450€",
  plazasTotales: 3,
  plazasLibres: 3,
  duracion: "3-4 días",
} as const;
