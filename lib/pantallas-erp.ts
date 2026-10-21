// ---------------------------------------------------------------------------
// LAS PANTALLAS QUE SE VEN EN EL MÓVIL DE LA PORTADA
//
// Se pintan a mano en un canvas 2D y pasan a ser la pantalla del móvil 3D
// (components/deeptech/movil.tsx).
//
// NO SON CAPTURAS, Y ES A PROPÓSITO. Una captura del panel llevaría datos de
// algún cliente —y hay una norma del proyecto que lo prohíbe: en nada que se
// publique puede verse la marca para la que está hecha una demo— y además se
// quedaría vieja el día que cambie el panel. Esto imita el panel con datos
// inventados.
//
// LAS CUATRO PANTALLAS SON DE CUATRO PIEZAS DISTINTAS, no de un mismo
// programa. El panel del negocio, un pedido que entra del configurador de la
// web, un fichaje y una factura con VeriFactu. En la portada de un estudio que
// construye software a medida, un móvil que enseña cuatro pantallas de la
// MISMA app estaría diciendo «vendemos esta app», que es justo lo que se
// quitó de la portada. Enseñando cuatro piezas dice «construimos esto».
//
// CADA PANTALLA SE PINTA UNA VEZ, en su propia capa. Al pasar de una a otra
// solo se recolocan capas ya pintadas (componer()): repintar todo el texto en
// cada fotograma es lo que hace ir a tirones a un móvil de gama media.
//
// Los colores salen de las variables de app/(demo)/deeptech.css, así que si
// cambia la paleta cambia también la pantalla del móvil.
//
// Escrito a partir de lib/pantallasLoro.ts de la web de Priora, que resolvió
// antes los mismos problemas (las capas, el tamaño de la textura, la letra que
// no está cargada al pintar).
// ---------------------------------------------------------------------------

/** La pantalla, en puntos: la de un móvil de 6,1 pulgadas. */
export const ANCHO = 390;
export const ALTO = 844;
/** El radio de las esquinas de la pantalla, en puntos. */
export const RADIO = 55;

/**
 * Píxeles de textura por punto, si no se pide otra cosa. Con 2 se lee bien en
 * un móvil; en un portátil de alta densidad, donde el móvil sale grande, el
 * componente pide 3.
 */
const ESCALA = 2;

/** Dónde acaba la barra de estado y dónde empieza la de pestañas. */
const ARRIBA = 54;
const ABAJO = 764;

type IdPestana = "panel" | "pedidos" | "fichaje" | "facturas";

export interface Pantalla {
  /** El rótulo que la portada enseña mientras se ve esta pantalla. */
  nombre: string;
  /** Qué pieza de software es: lo que de verdad se está enseñando. */
  pieza: string;
  /** La nota que señala algo concreto de la pantalla. */
  nota: string;
  pestana: IdPestana;
}

/* Las cuatro, en el orden en que se pasan. Empieza por el panel porque es lo
   que un gerente reconoce de un vistazo, y acaba en la factura, que es el
   final de cualquier proceso y lo que todo el mundo quiere ver funcionando. */
export const PANTALLAS: Pantalla[] = [
  { nombre: "El panel del negocio", pieza: "Sistema de gestión", nota: "Sin cuadrar hojas a mano", pestana: "panel" },
  { nombre: "Un pedido desde la web", pieza: "Configurador web", nota: "El precio, con vuestras reglas", pestana: "pedidos" },
  { nombre: "Alguien ficha", pieza: "Control de jornada", nota: "Quién, cuándo y desde dónde", pestana: "fichaje" },
  { nombre: "La factura, sola", pieza: "Facturación VeriFactu", nota: "Sale del pedido, con su QR", pestana: "facturas" },
];

/** Un sitio de la pantalla, en puntos desde la esquina de arriba a la izquierda. */
export interface Punto {
  x: number;
  y: number;
}

export interface PantallasErp {
  /** El canvas que hace de pantalla: es la textura del móvil. */
  lienzo: HTMLCanvasElement;
  /** Lo que señala la nota en cada pantalla. */
  puntos: Punto[];
  /**
   * Pinta el paso de la pantalla `de` a la `a` (`paso` de 0 a 1). Con
   * `fundido`, la nueva aparece encima en vez de entrar por la derecha.
   */
  componer(de: number, a: number, paso: number, fundido: boolean): void;
}

/* ------------------------------------------------------------------ tema */

interface Tema {
  letra: string;
  fondo: string;
  superficie: string;
  superficie2: string;
  linea: string;
  tinta: string;
  tinta2: string;
  apagado: string;
  cian: string;
  menta: string;
  violeta: string;
  urgente: string;
}

function leerTema(): Tema {
  const css = getComputedStyle(document.documentElement);
  const v = (nombre: string, respaldo: string) => css.getPropertyValue(nombre).trim() || respaldo;
  return {
    /* La letra de la web. Si el canvas pinta antes de que esté cargada, sale
       con la del sistema y ya no repinta: por eso crearPantallas() la espera. */
    letra: getComputedStyle(document.body).fontFamily || "system-ui, sans-serif",
    /* El fondo de la pantalla NO es el negro de la web (#020306). Una app a
       pantalla completa con el negro del fondo de la página se funde con él y
       el móvil deja de leerse como una pantalla encendida. Un punto por
       encima basta. */
    fondo: "#070a10",
    superficie: "#0d1119",
    superficie2: "#131925",
    linea: "rgba(255,255,255,.085)",
    tinta: "#eef2f7",
    tinta2: "#9aa6b8",
    apagado: "#5a6677",
    cian: v("--dt-cian", "#38e1ff"),
    menta: v("--dt-menta", "#2cf5b0"),
    violeta: v("--dt-violeta", "#9d7bff"),
    urgente: "#ff5d6c",
  };
}

/* ------------------------------------------------------------ utilidades */

type Lienzo = CanvasRenderingContext2D;

function capa(ancho: number, alto: number, pintar: (c: Lienzo) => void, escala = ESCALA): HTMLCanvasElement {
  const lienzo = document.createElement("canvas");
  lienzo.width = Math.round(ancho * escala);
  lienzo.height = Math.round(alto * escala);
  const c = lienzo.getContext("2d")!;
  c.scale(escala, escala);
  pintar(c);
  return lienzo;
}

function caja(c: Lienzo, x: number, y: number, ancho: number, alto: number, radio: number | number[]) {
  c.beginPath();
  c.roundRect(x, y, ancho, alto, radio);
}

function circulo(c: Lienzo, x: number, y: number, r: number) {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
}

function rellenar(c: Lienzo, color: string | CanvasGradient, alfa = 1) {
  c.globalAlpha = alfa;
  c.fillStyle = color;
  c.fill();
  c.globalAlpha = 1;
}

function trazar(c: Lienzo, color: string | CanvasGradient, grosor: number, alfa = 1) {
  c.globalAlpha = alfa;
  c.strokeStyle = color;
  c.lineWidth = grosor;
  c.stroke();
  c.globalAlpha = 1;
}

interface Estilo {
  tam?: number;
  peso?: number;
  color?: string;
  alinear?: CanvasTextAlign;
  /** Ancho máximo: lo que no cabe se corta con puntos suspensivos. */
  max?: number;
  espacio?: number;
}

function fuente(c: Lienzo, t: Tema, e: Estilo) {
  c.font = `${e.peso ?? 500} ${e.tam ?? 15}px ${t.letra}`;
  c.letterSpacing = `${e.espacio ?? 0}px`;
}

function recortar(c: Lienzo, texto: string, max: number): string {
  if (c.measureText(texto).width <= max) return texto;
  let corto = texto;
  while (corto.length > 1 && c.measureText(`${corto}…`).width > max) corto = corto.slice(0, -1);
  return `${corto.trimEnd()}…`;
}

/** Escribe una línea y devuelve lo que ocupa de ancho. */
function escribir(c: Lienzo, t: Tema, texto: string, x: number, y: number, e: Estilo = {}): number {
  fuente(c, t, e);
  c.fillStyle = e.color ?? t.tinta;
  c.textAlign = e.alinear ?? "left";
  c.textBaseline = "alphabetic";
  const cabe = e.max ? recortar(c, texto, e.max) : texto;
  c.fillText(cabe, x, y);
  const ancho = c.measureText(cabe).width;
  c.letterSpacing = "0px";
  return ancho;
}

/** Píldora de fondo tenue con texto dentro, como las etiquetas de estado. */
function pildora(c: Lienzo, t: Tema, texto: string, x: number, y: number, color: string, alineaDerecha = false) {
  fuente(c, t, { tam: 11, peso: 700 });
  const ancho = c.measureText(texto).width + 18;
  const izquierda = alineaDerecha ? x - ancho : x;
  caja(c, izquierda, y, ancho, 21, 10.5);
  rellenar(c, color, 0.14);
  escribir(c, t, texto, izquierda + 9, y + 14.5, { tam: 11, peso: 700, color });
  return ancho;
}

/* Los iconos, como trazos de canvas sobre una rejilla de 24. */
const ICONO = {
  panel: "M4 13h6v7H4v-7z M14 4h6v16h-6V4z M4 4h6v5H4V4z",
  carro: "M3 4h2.2l2.3 11h9.6l2-7.5H6.4 M9.5 19.5a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z M18 19.5a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z",
  reloj: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M12 7v5.5l3.5 2",
  recibo: "M6 3h12v18l-3-2-3 2-3-2-3 2V3z M9.5 8h5M9.5 12h5M9.5 16h3",
  check: "M5 12.5l4.5 4.5L19 7.5",
  sitio: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M14.5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z",
  globo: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  flecha: "M5 12h13M12.5 6l6 6-6 6",
  rayo: "M13 3L5 13.5h5.5L10 21l8-10.5h-5.5L13 3z",
} as const;

const trazos = new Map<string, Path2D>();
function trazo(d: string): Path2D {
  let p = trazos.get(d);
  if (!p) {
    p = new Path2D(d);
    trazos.set(d, p);
  }
  return p;
}

function icono(c: Lienzo, d: string, x: number, y: number, tam: number, color: string, grosor = 1.8) {
  c.save();
  c.translate(x, y);
  c.scale(tam / 24, tam / 24);
  c.strokeStyle = color;
  /* El grosor va en unidades ya escaladas, así que un icono pequeño sale
     con el trazo más fino. Es lo que se quiere: 1,8 a tamaño 24. */
  c.lineWidth = grosor;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.stroke(trazo(d));
  c.restore();
}

/** El símbolo de Nexo: la N con el nodo, en dos trazos. */
function simbolo(c: Lienzo, t: Tema, x: number, y: number, tam: number) {
  c.save();
  c.translate(x, y);
  c.scale(tam / 24, tam / 24);
  const degradado = c.createLinearGradient(2, 2, 22, 22);
  degradado.addColorStop(0, t.cian);
  degradado.addColorStop(1, t.menta);
  c.strokeStyle = degradado;
  c.lineWidth = 2.6;
  c.lineCap = "round";
  c.lineJoin = "round";
  c.stroke(trazo("M5 20V5l14 14V5"));
  circulo(c, 19, 5, 2.6);
  rellenar(c, t.menta);
  c.restore();
}

/** Euros con sus dos decimales, como en una factura. */
function euros(centimos: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(centimos / 100);
}

/* ------------------------------------------------------- lo de siempre */

function barraEstado(c: Lienzo, t: Tema) {
  c.fillStyle = t.fondo;
  c.fillRect(0, 0, ANCHO, ARRIBA);
  escribir(c, t, "9:41", 54, 35, { tam: 17, peso: 600, alinear: "center" });
  // La isla de la cámara.
  caja(c, ANCHO / 2 - 62, 11, 124, 36, 18);
  rellenar(c, "#000");
  // Cobertura, wifi y batería.
  for (let i = 0; i < 4; i++) {
    const alto = 4.5 + i * 2.6;
    caja(c, 289 + i * 5, 32 - alto, 3.3, alto, 1);
    rellenar(c, t.tinta);
  }
  c.lineCap = "round";
  for (const r of [6.5, 10.5]) {
    c.beginPath();
    c.arc(322, 33, r, -Math.PI * 0.75, -Math.PI * 0.25);
    trazar(c, t.tinta, 2.2);
  }
  circulo(c, 322, 31.5, 1.8);
  rellenar(c, t.tinta);
  caja(c, 337, 22.5, 25, 12.5, 3.8);
  trazar(c, t.tinta, 1, 0.45);
  caja(c, 339, 24.5, 18, 8.5, 2.2);
  rellenar(c, t.tinta);
  caja(c, 363.5, 26.5, 1.8, 4.5, 0.9);
  rellenar(c, t.tinta, 0.45);
}

const PESTANAS: { id: IdPestana; texto: string; icono: string }[] = [
  { id: "panel", texto: "Panel", icono: ICONO.panel },
  { id: "pedidos", texto: "Pedidos", icono: ICONO.carro },
  { id: "fichaje", texto: "Fichaje", icono: ICONO.reloj },
  { id: "facturas", texto: "Facturas", icono: ICONO.recibo },
];

function barraPestanas(c: Lienzo, t: Tema, activa: IdPestana) {
  c.fillStyle = t.superficie;
  c.fillRect(0, ABAJO, ANCHO, ALTO - ABAJO);
  c.fillStyle = t.linea;
  c.fillRect(0, ABAJO, ANCHO, 1);
  const paso = ANCHO / PESTANAS.length;
  PESTANAS.forEach((p, i) => {
    const centro = paso * i + paso / 2;
    const encendida = p.id === activa;
    const color = encendida ? t.cian : t.apagado;
    icono(c, p.icono, centro - 11, ABAJO + 13, 22, color);
    escribir(c, t, p.texto, centro, ABAJO + 51, { tam: 11, peso: encendida ? 700 : 500, color, alinear: "center" });
  });
  caja(c, ANCHO / 2 - 67, ALTO - 9, 134, 5, 2.5);
  rellenar(c, t.tinta);
}

/** La cabecera de cada pantalla: el rótulo de la pieza y el título grande. */
function cabecera(c: Lienzo, t: Tema, pieza: string, titulo: string, y = 98) {
  escribir(c, t, pieza.toUpperCase(), 22, y - 22, { tam: 10.5, peso: 700, color: t.cian, espacio: 1.1 });
  escribir(c, t, titulo, 22, y + 14, { tam: 29, peso: 700, espacio: -0.6 });
}

/* ------------------------------------------------------------ pantallas */

/* 1 · EL PANEL DEL NEGOCIO
   Los números que un gerente mira por la mañana. Sin nombre de cliente en
   ningún sitio: las barras son barras y el único texto es de concepto. */
function pintarPanel(c: Lienzo, t: Tema): Punto {
  cabecera(c, t, "Sistema de gestión", "Hoy");

  // Dos cifras grandes, una al lado de la otra.
  const fichas: [string, string, string][] = [
    ["Facturado", euros(1284050), t.menta],
    ["Por cobrar", euros(412600), t.cian],
  ];
  fichas.forEach(([etiqueta, valor, color], i) => {
    const x = 22 + i * 176;
    caja(c, x, 142, 164, 86, 18);
    rellenar(c, t.superficie);
    caja(c, x, 142, 164, 86, 18);
    trazar(c, t.linea, 1);
    escribir(c, t, etiqueta, x + 16, 168, { tam: 12, peso: 600, color: t.tinta2 });
    escribir(c, t, valor, x + 16, 200, { tam: 22, peso: 700, color, max: 136 });
    escribir(c, t, i === 0 ? "Este mes" : "4 facturas", x + 16, 218, { tam: 11, peso: 500, color: t.apagado });
  });

  // Barras de las últimas semanas. Ocho, la última encendida.
  caja(c, 22, 244, 346, 158, 18);
  rellenar(c, t.superficie);
  caja(c, 22, 244, 346, 158, 18);
  trazar(c, t.linea, 1);
  escribir(c, t, "Ocho semanas", 38, 272, { tam: 13, peso: 600 });
  escribir(c, t, "+18 %", 352, 272, { tam: 12, peso: 700, color: t.menta, alinear: "right" });
  const alturas = [0.42, 0.55, 0.38, 0.66, 0.6, 0.78, 0.7, 1];
  alturas.forEach((h, i) => {
    const x = 40 + i * 40;
    const alto = 86 * h;
    caja(c, x, 372 - alto, 22, alto, 6);
    if (i === alturas.length - 1) {
      const degradado = c.createLinearGradient(0, 372 - alto, 0, 372);
      degradado.addColorStop(0, t.cian);
      degradado.addColorStop(1, t.menta);
      rellenar(c, degradado);
    } else {
      rellenar(c, t.tinta, 0.14);
    }
  });
  escribir(c, t, "L  M  X  J  V  S  D", 38, 392, { tam: 10, peso: 500, color: t.apagado });

  // Tres cosas pendientes, como una lista de tareas.
  escribir(c, t, "Pendiente", 22, 436, { tam: 13, peso: 700, color: t.tinta2 });
  const filas: [string, string, string][] = [
    ["Presupuestos sin enviar", "3", t.violeta],
    ["Partes sin firmar", "1", t.cian],
    ["Horas por validar", "12", t.menta],
  ];
  filas.forEach(([texto, numero, color], i) => {
    const y = 452 + i * 60;
    caja(c, 22, y, 346, 50, 14);
    rellenar(c, t.superficie2, 0.75);
    circulo(c, 48, y + 25, 15);
    rellenar(c, color, 0.16);
    escribir(c, t, numero, 48, y + 30, { tam: 14, peso: 800, color, alinear: "center" });
    escribir(c, t, texto, 76, y + 30, { tam: 14, peso: 600, max: 250 });
    icono(c, ICONO.flecha, 334, y + 16, 18, t.apagado, 2);
  });

  // Lo que señala la nota: la barra encendida de la semana en curso.
  return { x: 331, y: 300 };
}

/* 2 · UN PEDIDO QUE ENTRA DEL CONFIGURADOR DE LA WEB
   La pieza que menos gente entiende de las cuatro, así que la pantalla tiene
   que contar sola de dónde viene: el rótulo dice «Desde la web» y el desglose
   enseña que el precio lo ha calculado el configurador, no una persona. */
function pintarPedido(c: Lienzo, t: Tema): Punto {
  cabecera(c, t, "Configurador web", "Pedido nuevo");

  // De dónde viene y cuándo.
  caja(c, 22, 140, 346, 56, 16);
  rellenar(c, t.violeta, 0.1);
  caja(c, 22, 140, 346, 56, 16);
  trazar(c, t.violeta, 1, 0.3);
  icono(c, ICONO.globo, 40, 156, 24, t.violeta);
  escribir(c, t, "Desde la web, hace 2 minutos", 76, 164, { tam: 13.5, peso: 700, color: t.tinta });
  escribir(c, t, "Montado por el cliente, sin atenderle nadie", 76, 183, { tam: 12, peso: 500, color: t.tinta2, max: 276 });

  // Lo que ha configurado.
  escribir(c, t, "Lo que ha pedido", 22, 230, { tam: 13, peso: 700, color: t.tinta2 });
  const opciones: [string, string][] = [
    ["Medidas", "3,20 × 2,40 m"],
    ["Acabado", "Lacado blanco"],
    ["Montaje", "Incluido"],
  ];
  caja(c, 22, 244, 346, 128, 18);
  rellenar(c, t.superficie);
  caja(c, 22, 244, 346, 128, 18);
  trazar(c, t.linea, 1);
  opciones.forEach(([etiqueta, valor], i) => {
    const y = 276 + i * 38;
    escribir(c, t, etiqueta, 40, y, { tam: 13.5, peso: 500, color: t.tinta2 });
    escribir(c, t, valor, 350, y, { tam: 13.5, peso: 600, alinear: "right", max: 190 });
    if (i < opciones.length - 1) {
      c.fillStyle = t.linea;
      c.fillRect(40, y + 13, 310, 1);
    }
  });

  // El precio, calculado con sus reglas. Es lo que señala la nota.
  caja(c, 22, 388, 346, 104, 18);
  const fondo = c.createLinearGradient(22, 388, 368, 492);
  fondo.addColorStop(0, "rgba(56,225,255,.14)");
  fondo.addColorStop(1, "rgba(44,245,176,.08)");
  rellenar(c, fondo);
  caja(c, 22, 388, 346, 104, 18);
  trazar(c, t.cian, 1, 0.35);
  escribir(c, t, "Precio calculado", 40, 416, { tam: 12.5, peso: 600, color: t.tinta2 });
  escribir(c, t, euros(248750), 40, 456, { tam: 34, peso: 800, espacio: -1 });
  escribir(c, t, "IVA incluido · tarifa de distribuidor · −8 %", 40, 478, { tam: 11.5, peso: 500, color: t.tinta2, max: 300 });
  icono(c, ICONO.rayo, 326, 408, 22, t.menta);

  // Qué pasa ahora.
  caja(c, 22, 508, 346, 54, 14);
  rellenar(c, t.superficie2, 0.75);
  icono(c, ICONO.check, 44, 524, 20, t.menta, 2.2);
  escribir(c, t, "Presupuesto creado en la gestión", 76, 532, { tam: 13.5, peso: 600, color: t.tinta, max: 268 });
  escribir(c, t, "Sin que nadie lo vuelva a teclear", 76, 550, { tam: 11.5, peso: 500, color: t.apagado, max: 268 });

  // Botón de siempre, abajo.
  caja(c, 22, 582, 346, 54, 16);
  const boton = c.createLinearGradient(22, 582, 368, 636);
  boton.addColorStop(0, t.cian);
  boton.addColorStop(1, t.menta);
  rellenar(c, boton);
  escribir(c, t, "Enviar al cliente", ANCHO / 2, 616, { tam: 15.5, peso: 700, color: "#04121a", alinear: "center" });

  return { x: 196, y: 440 };
}

/* 3 · EL FICHAJE
   La pantalla más simple de las cuatro a propósito: es la que usa alguien de
   pie, con una mano, a las siete de la mañana. Un botón enorme y poco más.

   OJO CON LAS PALABRAS, que esto es terreno legal: aquí no dice «homologado»
   ni «cumple la ley». Lo que se afirma es que el registro es trazable, que es
   lo que se puede sostener. */
function pintarFichaje(c: Lienzo, t: Tema): Punto {
  cabecera(c, t, "Control de jornada", "Fichaje");

  // El reloj grande con el anillo de la jornada.
  const cx = ANCHO / 2;
  const cy = 300;
  c.beginPath();
  c.arc(cx, cy, 88, 0, Math.PI * 2);
  trazar(c, t.tinta, 7, 0.08);
  c.beginPath();
  c.arc(cx, cy, 88, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.72);
  c.lineCap = "round";
  const anillo = c.createLinearGradient(cx - 88, cy - 88, cx + 88, cy + 88);
  anillo.addColorStop(0, t.cian);
  anillo.addColorStop(1, t.menta);
  trazar(c, anillo, 7);
  escribir(c, t, "6 h 12 min", cx, cy + 4, { tam: 30, peso: 800, alinear: "center", espacio: -0.8 });
  escribir(c, t, "trabajadas hoy", cx, cy + 28, { tam: 12.5, peso: 500, color: t.tinta2, alinear: "center" });

  // Entrada, pausa y sitio: lo que queda registrado.
  const lineas: [string, string, string][] = [
    ["Entrada", "7:58", t.menta],
    ["Pausa", "11:00 · 20 min", t.tinta2],
    ["Desde", "Palma, Son Castelló", t.tinta2],
  ];
  lineas.forEach(([etiqueta, valor, color], i) => {
    const y = 424 + i * 46;
    escribir(c, t, etiqueta, 40, y, { tam: 13, peso: 500, color: t.apagado });
    escribir(c, t, valor, 350, y, { tam: 13.5, peso: 600, color, alinear: "right", max: 210 });
    c.fillStyle = t.linea;
    c.fillRect(40, y + 15, 310, 1);
  });
  icono(c, ICONO.sitio, 22, 504, 16, t.apagado, 2);

  // El botón grande de salir.
  caja(c, 22, 578, 346, 62, 18);
  rellenar(c, t.urgente, 0.14);
  caja(c, 22, 578, 346, 62, 18);
  trazar(c, t.urgente, 1, 0.4);
  escribir(c, t, "Fichar salida", ANCHO / 2, 616, { tam: 16, peso: 700, color: t.urgente, alinear: "center" });

  // Lo que señala la nota: la línea de dónde se fichó.
  return { x: 300, y: 516 };
}

/* 4 · LA FACTURA CON VERIFACTU
   Lo que todo el mundo pide ver. El QR está pintado como un QR de verdad
   (módulos aleatorios con sus tres esquinas), no como un cuadrado gris: a este
   tamaño se nota muchísimo la diferencia.

   El QR no codifica nada. Es una pantalla de ejemplo, y un QR que llevara a
   algún sitio sería un enlace que alguien podría escanear desde la portada. */
function pintarFactura(c: Lienzo, t: Tema): Punto {
  cabecera(c, t, "Facturación", "Factura");

  // La ficha de la factura.
  caja(c, 22, 140, 346, 212, 20);
  rellenar(c, t.superficie);
  caja(c, 22, 140, 346, 212, 20);
  trazar(c, t.linea, 1);

  escribir(c, t, "F-2026/0412", 40, 178, { tam: 19, peso: 700 });
  pildora(c, t, "COBRADA", 350, 162, t.menta, true);
  escribir(c, t, "Sale del pedido de la web", 40, 200, { tam: 12, peso: 500, color: t.tinta2, max: 290 });

  c.fillStyle = t.linea;
  c.fillRect(40, 220, 310, 1);

  const importes: [string, string, boolean][] = [
    ["Base imponible", euros(205578), false],
    ["IVA 21 %", euros(43172), false],
    ["Total", euros(248750), true],
  ];
  importes.forEach(([etiqueta, valor, fuerte], i) => {
    const y = 250 + i * 34;
    escribir(c, t, etiqueta, 40, y, { tam: fuerte ? 15 : 13, peso: fuerte ? 700 : 500, color: fuerte ? t.tinta : t.tinta2 });
    escribir(c, t, valor, 350, y, {
      tam: fuerte ? 19 : 13.5,
      peso: fuerte ? 800 : 600,
      color: fuerte ? t.menta : t.tinta,
      alinear: "right",
    });
  });

  // El sello de VeriFactu con su QR. Es lo que señala la nota.
  caja(c, 22, 370, 346, 152, 20);
  rellenar(c, t.superficie2, 0.8);
  caja(c, 22, 370, 346, 152, 20);
  trazar(c, t.cian, 1, 0.25);

  // El QR: 21 módulos de lado, como un QR pequeño de verdad.
  const qx = 44;
  const qy = 392;
  const lado = 108;
  const modulos = 21;
  const m = lado / modulos;
  caja(c, qx - 6, qy - 6, lado + 12, lado + 12, 8);
  rellenar(c, "#ffffff");
  /* Mismo dibujo en cada carga: un generador con semilla, no Math.random. Un
     QR que cambia en cada recarga se nota si alguien mira dos veces. */
  let semilla = 20261021;
  const siguiente = () => {
    semilla = (semilla * 1664525 + 1013904223) % 4294967296;
    return semilla / 4294967296;
  };
  const esquina = (fx: number, fy: number) =>
    (fx < 7 && fy < 7) || (fx >= modulos - 7 && fy < 7) || (fx < 7 && fy >= modulos - 7);
  c.fillStyle = "#000000";
  for (let fy = 0; fy < modulos; fy++) {
    for (let fx = 0; fx < modulos; fx++) {
      if (esquina(fx, fy)) continue;
      if (siguiente() > 0.52) c.fillRect(qx + fx * m, qy + fy * m, m, m);
    }
  }
  // Las tres esquinas de referencia, que son lo que hace que parezca un QR.
  for (const [ex, ey] of [
    [0, 0],
    [modulos - 7, 0],
    [0, modulos - 7],
  ] as const) {
    c.fillStyle = "#000000";
    c.fillRect(qx + ex * m, qy + ey * m, 7 * m, 7 * m);
    c.fillStyle = "#ffffff";
    c.fillRect(qx + (ex + 1) * m, qy + (ey + 1) * m, 5 * m, 5 * m);
    c.fillStyle = "#000000";
    c.fillRect(qx + (ex + 2) * m, qy + (ey + 2) * m, 3 * m, 3 * m);
  }

  escribir(c, t, "VeriFactu", 176, 412, { tam: 15, peso: 700, color: t.cian });
  escribir(c, t, "Registro enviado a la", 176, 436, { tam: 12, peso: 500, color: t.tinta2, max: 180 });
  escribir(c, t, "Agencia Tributaria", 176, 453, { tam: 12, peso: 500, color: t.tinta2, max: 180 });
  escribir(c, t, "Huella", 176, 482, { tam: 10.5, peso: 600, color: t.apagado, espacio: 0.8 });
  escribir(c, t, "4F2A·9C71·BE03", 176, 500, { tam: 12.5, peso: 600, color: t.tinta, max: 180 });

  // Cómo se envió.
  caja(c, 22, 538, 346, 54, 14);
  rellenar(c, t.menta, 0.1);
  icono(c, ICONO.check, 44, 554, 20, t.menta, 2.2);
  escribir(c, t, "Enviada y pagada por Bizum", 76, 562, { tam: 13.5, peso: 600, max: 268 });
  escribir(c, t, "El cliente pagó desde el enlace", 76, 580, { tam: 11.5, peso: 500, color: t.apagado, max: 268 });

  return { x: 98, y: 446 };
}

/* --------------------------------------------------------------- montaje */

export async function crearPantallas(escala = ESCALA): Promise<PantallasErp> {
  const t = leerTema();
  // Sin la letra cargada, el canvas pinta con la del sistema y ya no repinta.
  try {
    await document.fonts.load(`700 16px ${t.letra}`);
    await document.fonts.load(`800 30px ${t.letra}`);
  } catch {
    // Se pinta con la que haya.
  }

  const puntos: Punto[] = [];
  const contenido = [pintarPanel, pintarPedido, pintarFichaje, pintarFactura].map((pintar) =>
    capa(
      ANCHO,
      ABAJO - ARRIBA,
      (c) => {
        // Opaca: al pasar de pantalla, la nueva tapa a la vieja.
        c.fillStyle = t.fondo;
        c.fillRect(0, 0, ANCHO, ABAJO - ARRIBA);
        c.translate(0, -ARRIBA);
        puntos.push(pintar(c, t));
      },
      escala,
    ),
  );

  const estado = capa(ANCHO, ARRIBA, (c) => barraEstado(c, t), escala);
  const pestanas = new Map<IdPestana, HTMLCanvasElement>();
  for (const { pestana } of PANTALLAS) {
    if (pestanas.has(pestana)) continue;
    pestanas.set(
      pestana,
      capa(
        ANCHO,
        ALTO - ABAJO,
        (c) => {
          c.translate(0, -ABAJO);
          barraPestanas(c, t, pestana);
        },
        escala,
      ),
    );
  }

  const lienzo = document.createElement("canvas");
  lienzo.width = ANCHO * escala;
  lienzo.height = ALTO * escala;
  const c = lienzo.getContext("2d")!;
  c.scale(escala, escala);

  function componer(de: number, a: number, paso: number, fundido: boolean) {
    const alto = ABAJO - ARRIBA;
    const nueva = contenido[a]!;
    const vieja = contenido[de]!;
    c.fillStyle = t.fondo;
    c.fillRect(0, 0, ANCHO, ALTO);
    if (paso >= 1 || de === a) {
      c.drawImage(nueva, 0, ARRIBA, ANCHO, alto);
    } else if (fundido) {
      c.drawImage(vieja, 0, ARRIBA, ANCHO, alto);
      c.globalAlpha = paso;
      c.drawImage(nueva, 0, ARRIBA, ANCHO, alto);
      c.globalAlpha = 1;
    } else {
      // Como en un móvil de verdad: la nueva entra por la derecha y la vieja
      // se aparta un poco y se oscurece debajo.
      const x = ANCHO * (1 - paso);
      c.drawImage(vieja, -ANCHO * 0.3 * paso, ARRIBA, ANCHO, alto);
      c.fillStyle = `rgba(0,0,0,${0.5 * paso})`;
      c.fillRect(0, ARRIBA, ANCHO, alto);
      const sombra = c.createLinearGradient(x - 18, 0, x, 0);
      sombra.addColorStop(0, "rgba(0,0,0,0)");
      sombra.addColorStop(1, "rgba(0,0,0,.45)");
      c.fillStyle = sombra;
      c.fillRect(x - 18, ARRIBA, 18, alto);
      c.drawImage(nueva, x, ARRIBA, ANCHO, alto);
    }
    c.drawImage(pestanas.get(PANTALLAS[paso < 0.5 ? de : a]!.pestana)!, 0, ABAJO, ANCHO, ALTO - ABAJO);
    c.drawImage(estado, 0, 0, ANCHO, ARRIBA);
  }

  componer(0, 0, 1, false);
  return { lienzo, puntos, componer };
}

/**
 * La espalda del móvil: cristal mate oscuro con el símbolo de Nexo grabado.
 *
 * Se ve durante la entrada, mientras el móvil se da la vuelta. Es un segundo
 * escaso, pero es el segundo en el que alguien decide si esto está hecho con
 * cuidado o no.
 */
export function pintarEspalda(): HTMLCanvasElement {
  const t = leerTema();
  const ancho = 512;
  const alto = Math.round((ancho * ALTO) / ANCHO);
  return capa(
    ancho,
    alto,
    (c) => {
      const fondo = c.createLinearGradient(0, 0, ancho, alto);
      fondo.addColorStop(0, "#161b24");
      fondo.addColorStop(0.5, "#0d1118");
      fondo.addColorStop(1, "#1a2029");
      c.fillStyle = fondo;
      c.fillRect(0, 0, ancho, alto);
      c.save();
      c.globalAlpha = 0.5;
      c.translate(ancho / 2 - 54, alto / 2 - 54);
      simbolo(c, t, 0, 0, 108);
      c.restore();
    },
    1,
  );
}
