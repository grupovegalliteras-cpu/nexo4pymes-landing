/* Escena WebGL del núcleo que flota en el hero de la portada.

   Cuenta el producto en una imagen: por la izquierda entra el caos (motas
   violeta que llegan en desorden, como las llamadas, los WhatsApp y los
   emails), el núcleo los ordena (una red de nodos con señales que corren
   por las sinapsis) y por la derecha sale el orden (paquetes verde menta
   en carriles paralelos, como las órdenes que llegan a cada técnico).
   Tres anillos orbitales con paquetes equidistantes rematan el aire de
   giroscopio.

   Todo se mueve en los shaders: el procesador solo actualiza un puñado de
   uniforms por fotograma. Sin postprocesado: el brillo sale de la mezcla
   aditiva y de puntos con caída suave, que es lo que mantiene los 60 fps
   en portátiles normales.

   Se carga con import() desde nucleo.tsx: three no entra en el paquete
   inicial de la portada y el titular se pinta antes que la escena. */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineSegments,
  Mesh,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

export type ControlNucleo = {
  /** Lanza una onda que recorre la red desde el centro. */
  onda: () => void;
  desmontar: () => void;
};

type Opciones = {
  /** Elemento del DOM que marca dónde va el centro del núcleo y cuánto mide. */
  ancla: HTMLElement;
  /** El hero: de él salen el progreso del scroll y la visibilidad. */
  seccion: HTMLElement;
  reducirMovimiento: boolean;
};

const COLORES = {
  cian: new Color("#38e1ff"),
  violeta: new Color("#9d7bff"),
  menta: new Color("#2cf5b0"),
};

const RADIO = 1.75; // radio de la red
const ANILLOS = [2.35, 2.78, 3.2];
const DISTANCIA_CAMARA = 10;

/* Trozo común a la red (nodos y sinapsis): las dos tienen que deformarse
   exactamente igual para que las líneas sigan unidas a sus nodos. */
const GLSL_COMUN = /* glsl */ `
  uniform float uTiempo;
  uniform float uOnda;
  uniform float uSalida;
  uniform float uAparicion;
  uniform vec2 uRaton;
  uniform float uAspecto;
  uniform float uPixel;
  uniform float uOpacidad;
  uniform vec3 uCian;
  uniform vec3 uVioleta;
  uniform vec3 uMenta;

  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }
  // frente de onda que sale del centro y se apaga al alejarse
  float ondaEn(vec3 p) {
    float d = length(p) - uOnda * 2.6;
    return exp(-d * d * 6.0) * exp(-uOnda * 0.9);
  }
  vec3 respirar(vec3 p) {
    float r = 1.0 + 0.04 * sin(uTiempo * 0.8 + p.x * 1.7 + p.y * 1.3 + p.z * 0.9);
    r += ondaEn(p) * 0.16;
    // al bajar, la red se deshace hacia fuera
    r += uSalida * uSalida * (0.5 + 2.2 * hash13(p * 17.0));
    // al cargar, cada nodo sale del centro con su propio retraso
    float ap = clamp(uAparicion * 1.7 - hash13(p * 7.0) * 0.7, 0.0, 1.0);
    ap = 1.0 - pow(1.0 - ap, 3.0);
    return p * r * ap;
  }
  // -1 en la cara de atrás, +1 en la de delante, sea cual sea la escala
  float frenteDe(vec4 mv, float radio) {
    vec4 centro = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    return clamp((mv.z - centro.z) / (length(modelViewMatrix[0].xyz) * radio), -1.0, 1.0);
  }
  float cercaRaton(vec4 clip) {
    vec2 ndc = clip.xy / clip.w;
    return smoothstep(0.34, 0.0, length((ndc - uRaton) * vec2(uAspecto, 1.0)));
  }
`;

const NODOS_VERT = /* glsl */ `
  ${GLSL_COMUN}
  attribute float aFase;
  attribute float aTam;
  varying float vBrillo;
  varying vec3 vColor;
  void main() {
    vec3 p = respirar(position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float cerca = cercaRaton(gl_Position);
    float onda = ondaEn(position);
    float titila = 0.6 + 0.4 * sin(uTiempo * (1.1 + aFase * 2.3) + aFase * 6.2831);
    // la cara de atrás de la esfera, más apagada: da volumen sin luces
    float frente = smoothstep(-1.0, 1.0, frenteDe(mv, ${RADIO.toFixed(2)}));
    vBrillo = (titila + cerca * 1.8 + onda * 1.5) * mix(0.28, 1.0, frente);
    vColor = mix(uCian, uVioleta, smoothstep(-0.9, 0.9, position.y / ${RADIO.toFixed(2)} + (aFase - 0.5) * 0.9));
    vColor = mix(vColor, uMenta, clamp(onda * 1.4, 0.0, 1.0));
    gl_PointSize = aTam * uPixel * (1.0 + cerca * 1.5 + onda * 0.8) * (62.0 / -mv.z);
  }
`;

const PUNTO_FRAG = /* glsl */ `
  uniform float uOpacidad;
  varying float vBrillo;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 2.4) + smoothstep(0.1, 0.0, d) * 0.9;
    gl_FragColor = vec4(vColor * vBrillo, a * uOpacidad);
  }
`;

const SINAPSIS_VERT = /* glsl */ `
  ${GLSL_COMUN}
  attribute float aLado;
  attribute float aSemilla;
  attribute float aVel;
  varying float vLado;
  varying float vCabeza;
  varying float vActiva;
  varying float vBrillo;
  varying vec3 vColor;
  void main() {
    vec3 p = respirar(position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vLado = aLado;
    // la cabeza de la señal se calcula aquí, en alta precisión
    vCabeza = fract(uTiempo * aVel + aSemilla);
    vActiva = step(0.5, fract(aSemilla * 7.31));
    float frente = smoothstep(-1.0, 1.0, frenteDe(mv, ${RADIO.toFixed(2)}));
    float cerca = cercaRaton(gl_Position);
    vBrillo = mix(0.25, 1.0, frente) * (1.0 + cerca * 2.2 + ondaEn(position) * 2.0);
    vColor = mix(uCian, uVioleta, fract(aSemilla * 3.17));
  }
`;

const SINAPSIS_FRAG = /* glsl */ `
  uniform float uOpacidad;
  uniform vec3 uMenta;
  varying float vLado;
  varying float vCabeza;
  varying float vActiva;
  varying float vBrillo;
  varying vec3 vColor;
  void main() {
    float d = vLado - vCabeza;
    float pulso = smoothstep(0.16, 0.0, abs(d)) * step(d, 0.02) * vActiva;
    vec3 col = mix(vColor, uMenta, pulso * 0.6);
    float a = (0.12 + pulso * 0.95) * vBrillo;
    gl_FragColor = vec4(col, a * uOpacidad);
  }
`;

/* Corrientes: entrada (caos que cae al núcleo) y salida (orden en carriles).
   Cada partícula recorre una curva cuadrática definida por tres puntos. */
const CORRIENTE_COMUN = /* glsl */ `
  uniform float uTiempo;
  uniform float uSalida;
  uniform float uAparicion;
  uniform float uPixel;
  uniform float uCaos;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  attribute vec3 aInicio;
  attribute vec3 aControl;
  attribute vec3 aFin;
  attribute float aDesfase;
  attribute float aVel;
  attribute float aTam;
  varying float vAlfa;
  varying vec3 vColor;
  vec3 curva(float e) {
    vec3 a = mix(aInicio, aControl, e);
    vec3 b = mix(aControl, aFin, e);
    return mix(a, b, e);
  }
  vec3 recorrido(float p) {
    // la entrada acelera al caer; la salida va a ritmo constante
    float e = mix(p, p * p, uCaos);
    vec3 pos = curva(e);
    float caos = (1.0 - e) * uCaos;
    pos += caos * 0.45 * vec3(
      sin(uTiempo * 1.3 + aDesfase * 40.0),
      cos(uTiempo * 1.1 + aDesfase * 31.0),
      sin(uTiempo * 0.9 + aDesfase * 17.0)
    );
    return pos * (1.0 + uSalida * uSalida * 1.4);
  }
  float alfaEn(float p) {
    return smoothstep(0.0, 0.14, p) * smoothstep(1.0, 0.93, p) * uAparicion * (1.0 - uSalida);
  }
`;

const CORRIENTE_PUNTOS_VERT = /* glsl */ `
  ${CORRIENTE_COMUN}
  void main() {
    float p = fract(uTiempo * aVel + aDesfase);
    vec4 mv = modelViewMatrix * vec4(recorrido(p), 1.0);
    gl_Position = projectionMatrix * mv;
    float e = mix(p, p * p, uCaos);
    vAlfa = alfaEn(p) * (0.4 + e * 0.9);
    vColor = mix(uColorA, uColorB, e);
    gl_PointSize = aTam * uPixel * (0.7 + e * 0.6) * (46.0 / -mv.z);
  }
`;

const CORRIENTE_PUNTOS_FRAG = /* glsl */ `
  varying float vAlfa;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 2.0);
    gl_FragColor = vec4(vColor, a * vAlfa);
  }
`;

const CORRIENTE_COLA_VERT = /* glsl */ `
  ${CORRIENTE_COMUN}
  attribute float aCola;
  varying float vCola;
  void main() {
    float p = fract(uTiempo * aVel + aDesfase);
    float pc = max(p - aCola * 0.03, 0.0);
    vec4 mv = modelViewMatrix * vec4(recorrido(pc), 1.0);
    gl_Position = projectionMatrix * mv;
    vCola = aCola;
    vAlfa = alfaEn(p) * 0.8;
    vColor = mix(uColorA, uColorB, mix(p, p * p, uCaos));
  }
`;

const CORRIENTE_COLA_FRAG = /* glsl */ `
  varying float vAlfa;
  varying float vCola;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, vAlfa * (1.0 - vCola));
  }
`;

/* Paquetes de los anillos: se colocan en el plano XY de su anillo y el
   Object3D padre lo inclina y lo hace girar. */
const ANILLO_VERT = /* glsl */ `
  uniform float uTiempo;
  uniform float uPixel;
  uniform float uSalida;
  uniform float uAparicion;
  attribute float aIndice;
  attribute float aRadio;
  attribute float aVel;
  varying float vAlfa;
  void main() {
    float ang = 6.28318 * (aIndice + uTiempo * aVel);
    vec3 p = vec3(cos(ang), sin(ang), 0.0) * aRadio * (1.0 + uSalida * 0.8);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vec4 centro = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float frente = (mv.z - centro.z) / (length(modelViewMatrix[0].xyz) * aRadio);
    vAlfa = (0.25 + 0.6 * smoothstep(-1.0, 1.0, frente)) * uAparicion * (1.0 - uSalida);
    gl_PointSize = uPixel * 2.1 * (30.0 / -mv.z);
  }
`;

const ANILLO_FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlfa;
  void main() {
    vec2 c = abs(gl_PointCoord - 0.5);
    // paquete cuadrado con borde suave: se lee como dato, no como estrella
    float a = smoothstep(0.5, 0.3, max(c.x, c.y));
    gl_FragColor = vec4(uColor, a * vAlfa);
  }
`;

const GUIA_VERT = /* glsl */ `
  uniform float uSalida;
  attribute float aAlfa;
  varying float vAlfa;
  void main() {
    vAlfa = aAlfa;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * (1.0 + uSalida * 0.8), 1.0);
  }
`;

const GUIA_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensidad;
  varying float vAlfa;
  void main() {
    gl_FragColor = vec4(uColor, vAlfa * uIntensidad);
  }
`;

/* Halo: un plano que siempre mira a la cámara, con caída gaussiana. */
const HALO_VERT = /* glsl */ `
  uniform float uEscala;
  varying vec2 vUv;
  void main() {
    vUv = uv - 0.5;
    vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    mv.xy += position.xy * uEscala * length(modelViewMatrix[0].xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const HALO_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensidad;
  uniform float uDureza;
  varying vec2 vUv;
  void main() {
    float d = length(vUv) * 2.0;
    float a = exp(-d * d * uDureza) * smoothstep(1.0, 0.7, d);
    gl_FragColor = vec4(mix(uColorA, uColorB, d), a * uIntensidad);
  }
`;

const ESTRELLAS_VERT = /* glsl */ `
  uniform float uTiempo;
  uniform float uPixel;
  uniform float uOpacidad;
  attribute float aFase;
  varying float vAlfa;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlfa = (0.35 + 0.65 * (0.5 + 0.5 * sin(uTiempo * (0.6 + aFase * 1.6) + aFase * 40.0))) * uOpacidad;
    gl_PointSize = uPixel * (1.0 + aFase * 1.8);
  }
`;

const ESTRELLAS_FRAG = /* glsl */ `
  varying float vAlfa;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    gl_FragColor = vec4(vec3(0.78, 0.86, 1.0), smoothstep(0.5, 0.1, d) * vAlfa * 0.7);
  }
`;

/* ---------------------------------------------------------------- */

const aleatorio = (a: number, b: number) => a + Math.random() * (b - a);
function direccionAleatoria(v = new Vector3()) {
  const u = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return v.set(Math.cos(t) * s, u, Math.sin(t) * s);
}

function material(vertexShader: string, fragmentShader: string, uniforms: Record<string, { value: unknown }>) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: AdditiveBlending,
  });
}

/* La red: nodos en una cáscara de Fibonacci (orden) más un relleno interior
   (volumen), unidos a sus vecinos más cercanos. */
function crearRed(n: number) {
  const pos = new Float32Array(n * 3);
  const fase = new Float32Array(n);
  const tam = new Float32Array(n);
  const enCascara = Math.floor(n * 0.62);
  const aureo = Math.PI * (3 - Math.sqrt(5));
  const v = new Vector3();
  for (let i = 0; i < n; i++) {
    if (i < enCascara) {
      const y = 1 - (i / (enCascara - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = aureo * i;
      v.set(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(RADIO * aleatorio(0.96, 1.04));
    } else {
      direccionAleatoria(v).multiplyScalar(RADIO * Math.sqrt(Math.random()) * 0.82);
    }
    v.toArray(pos, i * 3);
    fase[i] = Math.random();
    // unos pocos nodos grandes hacen de concentradores
    tam[i] = Math.random() < 0.045 ? aleatorio(2.4, 3.2) : aleatorio(0.7, 1.5);
  }

  // vecinos: los 3 más cercanos dentro de un radio, más enlaces largos entre concentradores
  const aristas: number[] = [];
  const maxD2 = 0.44 * 0.44;
  for (let i = 0; i < n; i++) {
    const cand: [number, number][] = [];
    const ix = pos[i * 3], iy = pos[i * 3 + 1], iz = pos[i * 3 + 2];
    for (let j = i + 1; j < n; j++) {
      const dx = pos[j * 3] - ix, dy = pos[j * 3 + 1] - iy, dz = pos[j * 3 + 2] - iz;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < maxD2) cand.push([d2, j]);
      else if (tam[i] > 2 && tam[j] > 2 && d2 < 4.8 && Math.random() < 0.5) aristas.push(i, j);
    }
    cand.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < Math.min(3, cand.length); k++) aristas.push(i, cand[k][1]);
  }

  const nodos = new BufferGeometry();
  nodos.setAttribute("position", new BufferAttribute(pos, 3));
  nodos.setAttribute("aFase", new BufferAttribute(fase, 1));
  nodos.setAttribute("aTam", new BufferAttribute(tam, 1));

  const nA = aristas.length / 2;
  const lp = new Float32Array(nA * 6);
  const lado = new Float32Array(nA * 2);
  const semilla = new Float32Array(nA * 2);
  const vel = new Float32Array(nA * 2);
  for (let e = 0; e < nA; e++) {
    const a = aristas[e * 2], b = aristas[e * 2 + 1];
    lp.set(pos.subarray(a * 3, a * 3 + 3), e * 6);
    lp.set(pos.subarray(b * 3, b * 3 + 3), e * 6 + 3);
    lado[e * 2] = 0;
    lado[e * 2 + 1] = 1;
    const s = Math.random();
    const vv = aleatorio(0.25, 0.7);
    semilla[e * 2] = semilla[e * 2 + 1] = s;
    vel[e * 2] = vel[e * 2 + 1] = vv;
  }
  const sinapsis = new BufferGeometry();
  sinapsis.setAttribute("position", new BufferAttribute(lp, 3));
  sinapsis.setAttribute("aLado", new BufferAttribute(lado, 1));
  sinapsis.setAttribute("aSemilla", new BufferAttribute(semilla, 1));
  sinapsis.setAttribute("aVel", new BufferAttribute(vel, 1));
  return { nodos, sinapsis };
}

type Tramo = { inicio: Vector3; control: Vector3; fin: Vector3; desfase: number; vel: number; tam: number };

/* Con los tramos se montan dos geometrías: la cabeza (puntos) y la cola (líneas). */
function crearCorriente(tramos: Tramo[]) {
  const n = tramos.length;
  const cab = new BufferGeometry();
  const cola = new BufferGeometry();
  const campos = ["aInicio", "aControl", "aFin"] as const;
  const dato = { aInicio: "inicio", aControl: "control", aFin: "fin" } as const;
  for (const c of campos) {
    const a1 = new Float32Array(n * 3);
    const a2 = new Float32Array(n * 6);
    tramos.forEach((t, i) => {
      t[dato[c]].toArray(a1, i * 3);
      t[dato[c]].toArray(a2, i * 6);
      t[dato[c]].toArray(a2, i * 6 + 3);
    });
    cab.setAttribute(c, new BufferAttribute(a1, 3));
    cola.setAttribute(c, new BufferAttribute(a2, 3));
  }
  for (const [c, k] of [["aDesfase", "desfase"], ["aVel", "vel"], ["aTam", "tam"]] as const) {
    const a1 = new Float32Array(n);
    const a2 = new Float32Array(n * 2);
    tramos.forEach((t, i) => {
      a1[i] = t[k];
      a2[i * 2] = a2[i * 2 + 1] = t[k];
    });
    cab.setAttribute(c, new BufferAttribute(a1, 1));
    cola.setAttribute(c, new BufferAttribute(a2, 1));
  }
  const colaAttr = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) colaAttr[i * 2 + 1] = 1;
  cola.setAttribute("aCola", new BufferAttribute(colaAttr, 1));
  // three cuenta los vértices por "position": basta con una copia del inicio
  cab.setAttribute("position", cab.getAttribute("aInicio"));
  cola.setAttribute("position", cola.getAttribute("aInicio"));
  return { cab, cola };
}

function tramosEntrada(n: number, movil: boolean): Tramo[] {
  const sesgo = movil ? new Vector3(0, 0.35, -0.7) : new Vector3(-1.35, 0.08, -0.45);
  const out: Tramo[] = [];
  const d = new Vector3();
  for (let i = 0; i < n; i++) {
    direccionAleatoria(d).add(sesgo).normalize();
    d.z = Math.min(d.z, 0.2);
    const inicio = d.clone().multiplyScalar(aleatorio(7.5, 13));
    const fin = direccionAleatoria(new Vector3()).multiplyScalar(RADIO * 0.97);
    const control = inicio.clone().add(fin).multiplyScalar(0.5).add(direccionAleatoria(new Vector3()).multiplyScalar(aleatorio(1.5, 3.6)));
    out.push({ inicio, control, fin, desfase: Math.random(), vel: aleatorio(0.045, 0.1), tam: aleatorio(0.8, 1.8) });
  }
  return out;
}

/* Carriles de salida: en escritorio, hacia la derecha; en móvil, a los dos
   lados (debajo va el texto). Paquetes equidistantes: así se lee el orden. */
function tramosSalida(movil: boolean) {
  const carriles = 6;
  const porCarril = 12;
  const out: Tramo[] = [];
  const guias: Vector3[][] = [];
  for (let c = 0; c < carriles; c++) {
    const lado = movil ? (c % 2 ? -1 : 1) : 1;
    const fila = movil ? Math.floor(c / 2) - 1 : c - (carriles - 1) / 2;
    const y = fila * (movil ? 0.55 : 0.42) - (movil ? 0.2 : 0.35);
    const inicio = new Vector3(lado * RADIO * 0.95, y * 0.55, 0.15);
    const fin = new Vector3(lado * 14, y * 2.6 - (movil ? 0 : 1.2), -1.5);
    const control = new Vector3(lado * 5.2, y * 1.2, 0.6);
    const vel = 0.085;
    for (let k = 0; k < porCarril; k++) out.push({ inicio, control, fin, desfase: k / porCarril + c * 0.031, vel, tam: 2.3 });
    const g: Vector3[] = [];
    for (let s = 0; s <= 40; s++) {
      const e = s / 40;
      const a = inicio.clone().lerp(control, e);
      const b = control.clone().lerp(fin, e);
      g.push(a.lerp(b, e));
    }
    guias.push(g);
  }
  return { tramos: out, guias };
}

function geometriaGuias(polilineas: Vector3[][], cerradas: boolean) {
  const pos: number[] = [];
  const alfa: number[] = [];
  for (const pl of polilineas) {
    const n = pl.length;
    const tope = cerradas ? n : n - 1;
    for (let i = 0; i < tope; i++) {
      const a = pl[i], b = pl[(i + 1) % n];
      pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      // las abiertas se desvanecen hacia el final
      alfa.push(cerradas ? 1 : 1 - i / n, cerradas ? 1 : 1 - (i + 1) / n);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute("aAlfa", new BufferAttribute(new Float32Array(alfa), 1));
  return g;
}

/* ---------------------------------------------------------------- */

export function montarNucleo(canvas: HTMLCanvasElement, { ancla, seccion, reducirMovimiento }: Opciones): ControlNucleo {
  const movil = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  const dprMax = Math.min(window.devicePixelRatio || 1, movil ? 1.25 : 1.5);
  let dpr = dprMax;
  renderer.setPixelRatio(dpr);

  const escena = new Scene();
  const camara = new PerspectiveCamera(38, 1, 0.1, 120);
  camara.position.set(0, 0, DISTANCIA_CAMARA);

  // uniforms compartidos por referencia entre todos los materiales
  const u = {
    uTiempo: { value: 0 },
    uOnda: { value: 99 },
    uSalida: { value: 0 },
    uAparicion: { value: reducirMovimiento ? 1 : 0 },
    uRaton: { value: new Vector2(9, 9) },
    uAspecto: { value: 1 },
    uPixel: { value: dpr },
    uOpacidad: { value: 1 },
    uCian: { value: COLORES.cian },
    uVioleta: { value: COLORES.violeta },
    uMenta: { value: COLORES.menta },
  };

  const mundo = new Group();
  const nucleo = new Group();
  escena.add(mundo);
  mundo.add(nucleo);
  nucleo.rotation.set(0.35, 0, 0.12);

  const desechables: { dispose: () => void }[] = [];
  const add = <T extends Object3D>(o: T, padre: Object3D = mundo) => {
    o.frustumCulled = false;
    padre.add(o);
    const m = o as unknown as { geometry?: BufferGeometry; material?: ShaderMaterial };
    if (m.geometry) desechables.push(m.geometry);
    if (m.material) desechables.push(m.material);
    return o;
  };

  // halo de fondo y núcleo caliente
  const plano = new PlaneGeometry(1, 1);
  add(new Mesh(plano, material(HALO_VERT, HALO_FRAG, { uEscala: { value: 9.5 }, uColorA: { value: new Color("#2a7dff") }, uColorB: { value: COLORES.violeta }, uIntensidad: { value: 0.32 }, uDureza: { value: 4.5 } })));
  add(new Mesh(plano.clone(), material(HALO_VERT, HALO_FRAG, { uEscala: { value: 2.4 }, uColorA: { value: new Color("#e8fdff") }, uColorB: { value: COLORES.cian }, uIntensidad: { value: 0.55 }, uDureza: { value: 9 } })));

  // la red
  const red = crearRed(movil ? 420 : 760);
  add(new LineSegments(red.sinapsis, material(SINAPSIS_VERT, SINAPSIS_FRAG, u)), nucleo);
  add(new Points(red.nodos, material(NODOS_VERT, PUNTO_FRAG, u)), nucleo);

  // anillos orbitales
  const inclinaciones = [
    [1.15, 0.2, 0],
    [1.45, -0.55, 0.4],
    [0.75, 0.75, -0.3],
  ];
  const anillos: { o: Object3D; giro: number }[] = [];
  ANILLOS.forEach((radio, k) => {
    const o = new Object3D();
    o.rotation.set(inclinaciones[k][0], inclinaciones[k][1], inclinaciones[k][2]);
    mundo.add(o);
    const circ: Vector3[] = [];
    for (let s = 0; s < 160; s++) {
      const t = (s / 160) * Math.PI * 2;
      circ.push(new Vector3(Math.cos(t) * radio, Math.sin(t) * radio, 0));
    }
    add(new LineSegments(geometriaGuias([circ], true), material(GUIA_VERT, GUIA_FRAG, { uSalida: u.uSalida, uColor: { value: k === 1 ? COLORES.violeta : COLORES.cian }, uIntensidad: { value: 0.2 } })), o);
    const n = [18, 26, 34][k];
    const g = new BufferGeometry();
    const idx = new Float32Array(n), rad = new Float32Array(n), vel = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      idx[i] = i / n;
      rad[i] = radio;
      vel[i] = [0.05, -0.035, 0.026][k];
    }
    g.setAttribute("position", new BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute("aIndice", new BufferAttribute(idx, 1));
    g.setAttribute("aRadio", new BufferAttribute(rad, 1));
    g.setAttribute("aVel", new BufferAttribute(vel, 1));
    add(new Points(g, material(ANILLO_VERT, ANILLO_FRAG, { uTiempo: u.uTiempo, uPixel: u.uPixel, uSalida: u.uSalida, uAparicion: u.uAparicion, uColor: { value: k === 1 ? COLORES.violeta : COLORES.menta } })), o);
    anillos.push({ o, giro: [0.04, -0.03, 0.022][k] });
  });

  // corriente de entrada (caos)
  const entrada = crearCorriente(tramosEntrada(movil ? 420 : 900, movil));
  const uEntrada = { ...u, uCaos: { value: 1 }, uColorA: { value: COLORES.violeta }, uColorB: { value: COLORES.cian } };
  add(new LineSegments(entrada.cola, material(CORRIENTE_COLA_VERT, CORRIENTE_COLA_FRAG, uEntrada)));
  add(new Points(entrada.cab, material(CORRIENTE_PUNTOS_VERT, CORRIENTE_PUNTOS_FRAG, uEntrada)));

  // carriles de salida (orden)
  const salida = tramosSalida(movil);
  const corrSalida = crearCorriente(salida.tramos);
  const uSalidaC = { ...u, uCaos: { value: 0 }, uColorA: { value: COLORES.menta }, uColorB: { value: COLORES.menta } };
  add(new LineSegments(geometriaGuias(salida.guias, false), material(GUIA_VERT, GUIA_FRAG, { uSalida: u.uSalida, uColor: { value: COLORES.menta }, uIntensidad: { value: 0.16 } })));
  add(new LineSegments(corrSalida.cola, material(CORRIENTE_COLA_VERT, CORRIENTE_COLA_FRAG, uSalidaC)));
  add(new Points(corrSalida.cab, material(CORRIENTE_PUNTOS_VERT, CORRIENTE_PUNTOS_FRAG, uSalidaC)));

  // estrellas lejanas, fuera del mundo: solo se mueven con la cámara
  const nE = movil ? 200 : 500;
  const ep = new Float32Array(nE * 3);
  const ef = new Float32Array(nE);
  for (let i = 0; i < nE; i++) {
    ep[i * 3] = aleatorio(-42, 42);
    ep[i * 3 + 1] = aleatorio(-26, 26);
    ep[i * 3 + 2] = aleatorio(-45, -12);
    ef[i] = Math.random();
  }
  const ge = new BufferGeometry();
  ge.setAttribute("position", new BufferAttribute(ep, 3));
  ge.setAttribute("aFase", new BufferAttribute(ef, 1));
  add(new Points(ge, material(ESTRELLAS_VERT, ESTRELLAS_FRAG, { uTiempo: u.uTiempo, uPixel: u.uPixel, uOpacidad: u.uOpacidad })), escena);

  /* ---------- medidas: el núcleo se centra en el ancla del DOM ---------- */
  const medir = () => {
    const r = canvas.getBoundingClientRect();
    const w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camara.aspect = w / h;
    const a = ancla.getBoundingClientRect();
    const ax = a.left + a.width / 2 - r.left;
    const ay = a.top + a.height / 2 - r.top;
    // desplazamiento de lente: el núcleo se ve de frente aunque no esté en el centro
    camara.setViewOffset(w, h, w / 2 - ax, h / 2 - ay, w, h);
    const alturaVisible = 2 * DISTANCIA_CAMARA * Math.tan(((camara.fov * Math.PI) / 180) / 2);
    const pxPorUnidad = h / alturaVisible;
    mundo.scale.setScalar(Math.max(40, Math.min(a.width, a.height)) * 0.49 / (ANILLOS[2] * pxPorUnidad));
    camara.updateProjectionMatrix();
    u.uAspecto.value = w / h;
  };
  medir();

  /* ---------- entrada del usuario ---------- */
  const raton = { x: 0, y: 0, nx: 9, ny: 9, activo: false };
  const alMover = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    raton.x = (e.clientX / window.innerWidth) * 2 - 1;
    raton.y = -((e.clientY / window.innerHeight) * 2 - 1);
    const r = canvas.getBoundingClientRect();
    raton.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    raton.ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    raton.activo = true;
  };
  const alSalir = () => {
    raton.activo = false;
    raton.x = raton.y = 0;
  };
  let tiempo = 0;
  let ultimaOnda = -99;
  const onda = () => {
    ultimaOnda = tiempo;
  };
  const alPulsar = (e: PointerEvent) => {
    const t = e.target as Element | null;
    if (t?.closest("a, button, input, textarea, select, label, [data-no-onda]")) return;
    onda();
  };
  window.addEventListener("pointermove", alMover, { passive: true });
  document.documentElement.addEventListener("pointerleave", alSalir);
  seccion.addEventListener("pointerdown", alPulsar);

  const ro = new ResizeObserver(() => {
    medir();
    if (!corriendo) pintar(0);
  });
  ro.observe(seccion);
  ro.observe(ancla);

  /* ---------- bucle ---------- */
  let visible = true;
  let corriendo = false;
  let raf = 0;
  let previo = performance.now();
  let rotY = 0;
  const suave = { x: 0, y: 0, nx: 9, ny: 9 };
  let muestras = 0;
  let acumulado = 0;

  const pintar = (dt: number) => {
    tiempo += dt;
    u.uTiempo.value = tiempo % 3600;
    u.uOnda.value = tiempo - ultimaOnda;
    if (!reducirMovimiento) u.uAparicion.value = Math.min(1, u.uAparicion.value + dt / 2.2);

    // progreso del scroll fuera del hero
    const rs = seccion.getBoundingClientRect();
    const prog = Math.min(1, Math.max(0, -rs.top / Math.max(1, rs.height)));
    u.uSalida.value = prog;
    u.uOpacidad.value = 1 - Math.max(0, (prog - 0.55) / 0.45);

    // paralaje con inercia
    const k = 1 - Math.pow(0.0025, dt);
    suave.x += (raton.x - suave.x) * k;
    suave.y += (raton.y - suave.y) * k;
    const ko = 1 - Math.pow(0.0001, dt);
    suave.nx += ((raton.activo ? raton.nx : 9) - suave.nx) * ko;
    suave.ny += ((raton.activo ? raton.ny : 9) - suave.ny) * ko;
    u.uRaton.value.set(suave.nx, suave.ny);

    const vaiven = movil && !reducirMovimiento ? Math.sin(tiempo * 0.3) * 0.25 : 0;
    camara.position.x = suave.x * 0.7 + vaiven;
    camara.position.y = suave.y * 0.45 + prog * 0.6;
    camara.position.z = DISTANCIA_CAMARA + prog * 2.5;
    camara.lookAt(0, 0, 0);
    mundo.rotation.y = suave.x * 0.32;
    mundo.rotation.x = -suave.y * 0.22;

    if (!reducirMovimiento) rotY += dt * 0.07;
    nucleo.rotation.y = rotY;
    for (const a of anillos) a.o.rotation.z += reducirMovimiento ? 0 : dt * a.giro;
    const ap = u.uAparicion.value;
    const e = 1 - Math.pow(1 - ap, 3);
    for (const a of anillos) a.o.scale.setScalar(0.6 + 0.4 * e);

    renderer.render(escena, camara);
  };

  const fotograma = (ahora: number) => {
    raf = requestAnimationFrame(fotograma);
    const dt = Math.min(0.05, (ahora - previo) / 1000);
    previo = ahora;
    pintar(dt);
    // calidad adaptable: si el equipo no llega a ~55 fps, menos píxeles
    acumulado += dt;
    if (++muestras === 60) {
      if (acumulado / muestras > 1 / 55 && dpr > 0.75) {
        dpr = Math.max(0.75, dpr - 0.25);
        renderer.setPixelRatio(dpr);
        u.uPixel.value = dpr;
        medir();
      }
      muestras = 0;
      acumulado = 0;
    }
  };

  const arrancar = () => {
    if (corriendo || reducirMovimiento) return;
    corriendo = true;
    previo = performance.now();
    raf = requestAnimationFrame(fotograma);
  };
  const parar = () => {
    corriendo = false;
    cancelAnimationFrame(raf);
  };
  const decidir = () => (visible && !document.hidden ? arrancar() : parar());

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    decidir();
  });
  io.observe(seccion);
  document.addEventListener("visibilitychange", decidir);

  const alPerder = (e: Event) => {
    e.preventDefault();
    parar();
  };
  canvas.addEventListener("webglcontextlost", alPerder);

  if (reducirMovimiento) {
    // con «reducir movimiento», una sola imagen quieta, ya montada
    tiempo = 4;
    pintar(0);
  } else {
    pintar(0);
    arrancar();
  }

  return {
    onda,
    desmontar() {
      parar();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", alMover);
      document.documentElement.removeEventListener("pointerleave", alSalir);
      seccion.removeEventListener("pointerdown", alPulsar);
      document.removeEventListener("visibilitychange", decidir);
      canvas.removeEventListener("webglcontextlost", alPerder);
      desechables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
