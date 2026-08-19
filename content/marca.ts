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
  email: "grupovegalliteras@gmail.com",
  calendly: "https://calendly.com/grupovegalliteras/demo-15-minutos",
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
  razonSocial: "Nexo4Pymes Automatización, S.L. (sociedad en constitución)",
  localidad: "Mallorca",
  region: "Illes Balears",
} as const;

export const oferta = {
  ofertaActiva: true,
  precio: 150,
  precioAntiguo: "250–450€",
  plazasTotales: 3,
  plazasLibres: 3,
  duracion: "3-4 días",
} as const;
