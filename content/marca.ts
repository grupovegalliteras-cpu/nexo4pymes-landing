/* ============================================================
   DATOS DE MARCA Y CIFRAS REALES
   Este archivo es la única fuente de verdad de los números y los
   enlaces. Ningún componente escribe un precio o un contador a
   mano: todos leen de aquí.

   AL AGOTARSE LAS PLAZAS: cambia `plazasLibres` y revisa
   `ofertaActiva`. Si `ofertaActiva` pasa a false, hay que quitar
   la mención a la oferta del hero de /veterinarias y del bloque
   veterinario de la portada.
   ============================================================ */

export const marca = {
  nombre: "Nexo4Pymes",
  dominio: "https://nexo4pymes.com",
  email: "grupovegalliteras@gmail.com",
  calendly: "https://calendly.com/grupovegalliteras/demo-15-minutos",
  instagram: "https://instagram.com/nexo4pymes",
  facebook: "https://facebook.com/nexo4pymes",
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
