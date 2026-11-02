/* La tarjeta que se ve cuando alguien pega el enlace de /concesia en
   WhatsApp, que es justo por donde se reparte esta landing. Sin ella el
   enlace sale pelado: la dirección y nada más.

   Se ejecuta a mano —`node scripts/og-concesia.mjs`— y el resultado se
   sube al repositorio, como la plantilla de jornada. No es un paso del
   despliegue: la imagen solo cambia si cambia el titular.

   El coche es el último fotograma de la secuencia del hero, el que ya
   está en public/concesia/hero. Los colores son los de la landing:
   noche, crema, arena y melocotón. */
import { statSync } from "node:fs";
import sharp from "sharp";

const ANCHO = 1200, ALTO = 630;
const NOCHE = "#090807", CREMA = "#fff7ed", ARENA = "#b8a48f", MELOCOTON = "#fdba74";

const ANCHO_COCHE = 820, IZQUIERDA = 430;
const foto = await sharp("public/concesia/hero/2560/96.webp").resize({ width: ANCHO_COCHE }).ensureAlpha().toBuffer();
const { height: ALTO_COCHE } = await sharp(foto).metadata();

/* La foto se funde con el fondo por sus propios bordes, no con un velo
   por encima: el plató donde está el coche es gris oscuro, no negro, y
   pegado sin más sobre el negro de la tarjeta se le ve el recorte.

   Lo que `dest-in` mira de esta imagen es su transparencia, no su
   color, así que el degradado tiene que acabar en una zona vacía de
   verdad. De ahí la <mask>: dentro de ella el blanco deja ver la foto y
   el negro la borra, y el rectángulo de fuera sale ya con esa
   transparencia metida en el canal alfa. */
const difuminado = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO_COCHE}" height="${ALTO_COCHE}">
  <defs>
    <linearGradient id="izq" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <linearGradient id="arr" y1="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <linearGradient id="abj" y1="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="bordes">
      <rect width="${ANCHO_COCHE}" height="${ALTO_COCHE}" fill="#fff"/>
      <rect width="320" height="${ALTO_COCHE}" fill="url(#izq)"/>
      <rect width="${ANCHO_COCHE}" height="170" fill="url(#arr)"/>
      <rect y="${ALTO_COCHE - 170}" width="${ANCHO_COCHE}" height="170" fill="url(#abj)"/>
    </mask>
  </defs>
  <rect width="${ANCHO_COCHE}" height="${ALTO_COCHE}" fill="#fff" mask="url(#bordes)"/>
</svg>`);
const coche = await sharp(foto).composite([{ input: difuminado, blend: "dest-in" }]).png().toBuffer();

/* Bahnschrift es la condensada que hay en cualquier Windows. No es
   Barlow Semi Condensed, la de la marca, pero es de la misma familia de
   formas y aquí se lee a tamaño de miniatura, que es lo que importa. */
const texto = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <g font-family="Bahnschrift">
    <text x="72" y="170" font-size="26" font-weight="600" letter-spacing="7" fill="${MELOCOTON}">CONCESIA</text>
    <text x="72" y="258" font-size="58" font-weight="700" fill="${CREMA}">Que ningún cliente</text>
    <text x="72" y="322" font-size="58" font-weight="700" fill="${CREMA}">se te vaya por</text>
    <text x="72" y="386" font-size="58" font-weight="700" fill="${CREMA}">contestar tarde.</text>
    <text x="72" y="456" font-size="27" fill="${ARENA}">Responde por WhatsApp en menos</text>
    <text x="72" y="492" font-size="27" fill="${ARENA}">de un minuto, de día y de noche.</text>
  </g>
</svg>`);

await sharp({ create: { width: ANCHO, height: ALTO, channels: 3, background: NOCHE } })
  .composite([
    { input: coche, left: IZQUIERDA, top: Math.round((ALTO - ALTO_COCHE) / 2) },
    { input: texto, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, chromaSubsampling: "4:4:4" })
  .toFile("public/concesia/og.jpg");

console.log("public/concesia/og.jpg", `${ANCHO}x${ALTO}`, Math.round(statSync("public/concesia/og.jpg").size / 1024) + " kB");
