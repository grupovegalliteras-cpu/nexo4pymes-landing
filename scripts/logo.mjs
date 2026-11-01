// Genera las piezas del logo a partir del original (NEXO/logo.png, fondo azul marino)
// con los colores de la marca: crema o grafito, carmesí y los dos nodos en melocotón.
// Uso: node scripts/logo.mjs ../../logo.png
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const src = process.argv[2] ?? "../../logo.png";
const out = "public/brand";
mkdirSync(out, { recursive: true });

const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const BG = [8, 16, 46];
const BLANCO = [255, 255, 255];
const MENTA = [1, 245, 197];

const NOCHE = [9, 8, 7];
const CREMA = [255, 247, 237];
const GRAFITO = [28, 33, 41];
const CARMESI = [190, 18, 60];
const MELOCOTON = [253, 186, 116];

/** Lo que no es blanco se agrupa en manchas conectadas. La mayor es el trazo de
    la N; las demás son los dos nodos con su palito, que van en otro color. */
function nodosDe(esMenta, w, h) {
  const grupo = new Int32Array(w * h).fill(-1);
  const tamanos = [];
  for (let i = 0; i < w * h; i++) {
    if (!esMenta[i] || grupo[i] >= 0) continue;
    const id = tamanos.length;
    let n = 0;
    const pila = [i];
    grupo[i] = id;
    while (pila.length) {
      const p = pila.pop();
      n++;
      const x = p % w;
      for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p - w, p + w]) {
        if (q >= 0 && q < w * h && esMenta[q] && grupo[q] < 0) {
          grupo[q] = id;
          pila.push(q);
        }
      }
    }
    tamanos.push(n);
  }
  const mayor = tamanos.indexOf(Math.max(...tamanos));
  return Uint8Array.from(grupo, (g) => (g >= 0 && g !== mayor ? 1 : 0));
}

/** Separa cada píxel en color puro (blanco o menta) + transparencia, sin halo del fondo. */
function recorte([x0, y0, x1, y1], tinta, { nodos = false } = {}) {
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const buf = Buffer.alloc(w * h * 4);
  const esMenta = new Uint8Array(w * h);
  const alfa = new Float32Array(w * h);
  const blanco = new Uint8Array(w * h);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const i = ((y + y0) * W + (x + x0)) * 3;
      const p = [data[i], data[i + 1], data[i + 2]];
      const dg = p[1] - BG[1];
      const dr = p[0] - BG[0];
      const esBlanco = dg > 0 ? dr / dg > 0.5 : false;
      const fg = esBlanco ? BLANCO : MENTA;
      const a = Math.max(0, Math.min(1, dg / (fg[1] - BG[1])));
      alfa[y * w + x] = a;
      blanco[y * w + x] = esBlanco ? 1 : 0;
      esMenta[y * w + x] = !esBlanco && a > 0.02 ? 1 : 0;
    }
  const nodo = nodos ? nodosDe(esMenta, w, h) : new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const c = blanco[i] ? tinta.blanco : nodo[i] ? tinta.nodo : tinta.menta;
    const o = i * 4;
    buf[o] = c[0];
    buf[o + 1] = c[1];
    buf[o + 2] = c[2];
    buf[o + 3] = Math.round(alfa[i] * 255);
  }
  return sharp(buf, { raw: { width: w, height: h, channels: 4 } });
}

const OSCURO = { blanco: CREMA, menta: CARMESI, nodo: MELOCOTON }; // para fondos oscuros
const CLARO = { blanco: GRAFITO, menta: CARMESI, nodo: MELOCOTON }; // para fondos claros

const MARCA = [433, 346, 820, 725];
const PALABRA = [166, 753, 1090, 889];

for (const [nombre, tinta] of [["oscuro", OSCURO], ["claro", CLARO]]) {
  await recorte(MARCA, tinta, { nodos: true }).png({ compressionLevel: 9 }).toFile(`${out}/marca-${nombre}.png`);
  // el 4 en carmesí pequeño no se lee sobre noche: en esa versión va en melocotón
  const tintaNombre = nombre === "oscuro" ? { ...tinta, menta: MELOCOTON } : tinta;
  await recorte(PALABRA, tintaNombre).resize({ height: 96 }).png({ compressionLevel: 9 }).toFile(`${out}/nombre-${nombre}.png`);
}

// icono cuadrado sobre la noche de la marca (favicon, app, vista previa)
const marca = await recorte(MARCA, OSCURO, { nodos: true }).png().toBuffer();
const iconos = {};
for (const s of [512, 192, 180, 48, 32, 16]) {
  const m = Math.round(s * (s <= 32 ? 0.86 : 0.64));
  const pieza = await sharp(marca).resize({ width: m, height: m, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  iconos[s] = await sharp({ create: { width: s, height: s, channels: 4, background: { r: NOCHE[0], g: NOCHE[1], b: NOCHE[2], alpha: 1 } } })
    .composite([{ input: pieza, gravity: "center" }])
    .png()
    .toBuffer();
}
for (const s of [512, 192, 180, 32]) writeFileSync(`${out}/icono-${s}.png`, iconos[s]);

// las mismas direcciones de siempre: Google cachea el favicon por su ruta
for (const s of [512, 180, 48, 32]) writeFileSync(`public/assets/favicon-${s}.png`, iconos[s]);
writeFileSync("public/assets/logo.png", iconos[512]);

// favicon.ico: tres PNG dentro de un contenedor ICO
const tamICO = [16, 32, 48];
const cabecera = Buffer.alloc(6 + 16 * tamICO.length);
cabecera.writeUInt16LE(1, 2);
cabecera.writeUInt16LE(tamICO.length, 4);
let desplazamiento = cabecera.length;
tamICO.forEach((s, i) => {
  const e = 6 + 16 * i;
  cabecera.writeUInt8(s, e);
  cabecera.writeUInt8(s, e + 1);
  cabecera.writeUInt16LE(1, e + 4);
  cabecera.writeUInt16LE(32, e + 6);
  cabecera.writeUInt32LE(iconos[s].length, e + 8);
  cabecera.writeUInt32LE(desplazamiento, e + 12);
  desplazamiento += iconos[s].length;
});
writeFileSync("public/favicon.ico", Buffer.concat([cabecera, ...tamICO.map((s) => iconos[s])]));
console.log("listo");
