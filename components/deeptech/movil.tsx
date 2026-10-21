"use client";

// ---------------------------------------------------------------------------
// EL MÓVIL DE LA PORTADA: UN ERP FUNCIONANDO, EN UNA MANO
//
// Es lo que hace concreta la portada. En vez de contar que construimos
// software, se enseña: un móvil (canto de metal, cristal, botones, las cámaras
// detrás) que llega desde abajo dando la vuelta y se queda flotando sobre una
// mano abierta, con cuatro pantallas de cuatro piezas distintas pasando en su
// pantalla (lib/pantallas-erp.ts).
//
// No se descarga ningún modelo ni ninguna imagen: el móvil y la mano se
// construyen con geometría y los reflejos salen de RoomEnvironment, un estudio
// de fotografía que Three genera al momento.
//
// Dónde va y cuánto ocupa lo decide el CSS: el componente encaja el conjunto
// en la caja `hueco` que le pasan, sea cual sea el ancho de la pantalla.
//
// Three pesa, así que el móvil se monta por pasos y con la página ya pintada
// (ver montar()): de golpe era una tarea larga en la que la página no respondía
// al dedo. Sin WebGL no se monta nada y la portada se lee igual.
//
// PORTADO de components/MovilLoro.tsx de la web de Priora, que resolvió antes
// el móvil, la entrada y los problemas de rendimiento. Lo nuevo aquí es la
// mano (./mano.ts), la paleta y las pantallas.
//
// EL MOVIMIENTO NO PREGUNTA POR «MOVIMIENTO REDUCIDO», pregunta a
// ./decision-movimiento.ts, como todo lo que anima en esta portada. Hoy esa
// función dice que no hay que quedarse quieto para nadie; el porqué y cómo
// revertirlo están escritos allí.
// ---------------------------------------------------------------------------
import { useEffect, useRef, type RefObject } from "react";
import { quietoPorPreferencia } from "./decision-movimiento";
import { ALTO, ANCHO, PANTALLAS } from "@/lib/pantallas-erp";

export function MovilErp({
  pantalla,
  nota,
  hueco,
  className = "",
}: {
  /** Cuál de PANTALLAS se ve. */
  pantalla: number;
  /** El texto del punto que señala algo de la pantalla. */
  nota: string;
  /** La caja donde tiene que caber el móvil. */
  hueco: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const punto = useRef<HTMLDivElement>(null);
  const texto = useRef<HTMLSpanElement>(null);
  const irA = useRef<(indice: number) => void>(() => {});
  /* La última pantalla pedida: la escena se monta un poco después que la
     portada, y si el rótulo ya ha pasado de pantalla, empieza en esa. */
  const pedida = useRef(pantalla);

  useEffect(() => {
    const canvas = lienzo.current;
    const marca = punto.current;
    const etiqueta = texto.current;
    const caja = hueco.current;
    if (!canvas || !marca || !etiqueta || !caja) return;

    const reducido = quietoPorPreferencia();
    let vivo = true;
    let desmontar = () => {};

    async function montar() {
      const [THREE, { RoomEnvironment }, { RoundedBoxGeometry }, { GLTFLoader }, { gsap }, pantallasMod] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
          import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("gsap"),
          import("@/lib/pantallas-erp"),
        ]);
      if (!vivo) return;
      await ceder();
      if (!vivo) return;

      /* ------------------------------------------------- medidas del móvil
         Manda la pantalla (sus proporciones son las de lib/pantallas-erp.ts)
         y el resto se le pone alrededor: el borde negro del cristal y el
         canto de metal. */
      const PANTALLA_ALTO = 1.46;
      const PANTALLA_ANCHO = (PANTALLA_ALTO * ANCHO) / ALTO;
      const PANTALLA_RADIO = (pantallasMod.RADIO / ANCHO) * PANTALLA_ANCHO;
      const BORDE = 0.026;
      const CANTO = 0.017;
      const ANCHO_M = PANTALLA_ANCHO + 2 * (BORDE + CANTO);
      const ALTO_M = PANTALLA_ALTO + 2 * (BORDE + CANTO);
      const RADIO_M = PANTALLA_RADIO + BORDE + CANTO;
      const GROSOR = 0.08;

      /* La pose de reposo. Menos inclinada que la del móvil suelto de Priora:
         ahí el móvil flotaba en el aire y una diagonal marcada quedaba bien,
         pero sobre una palma abierta un móvil muy girado se lee como que se
         está cayendo. Lo justo para que se vea el canto y no parezca una foto
         pegada. */
      const POSE = { x: -0.1, y: -0.32, z: 0.16 };

      function rectanguloRedondo(ancho: number, alto: number, radio: number) {
        const x = -ancho / 2;
        const y = -alto / 2;
        const r = Math.min(radio, ancho / 2, alto / 2);
        const forma = new THREE.Shape();
        forma.moveTo(x + r, y);
        forma.lineTo(x + ancho - r, y);
        forma.absarc(x + ancho - r, y + r, r, -Math.PI / 2, 0, false);
        forma.lineTo(x + ancho, y + alto - r);
        forma.absarc(x + ancho - r, y + alto - r, r, 0, Math.PI / 2, false);
        forma.lineTo(x + r, y + alto);
        forma.absarc(x + r, y + alto - r, r, Math.PI / 2, Math.PI, false);
        forma.lineTo(x, y + r);
        forma.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
        return forma;
      }

      /** Una placa plana redondeada, con la textura de 0 a 1 de lado a lado. */
      function placa(ancho: number, alto: number, radio: number) {
        const geometria = new THREE.ShapeGeometry(rectanguloRedondo(ancho, alto, radio), 24);
        const posicion = geometria.getAttribute("position");
        const uv = geometria.getAttribute("uv");
        for (let i = 0; i < posicion.count; i++) {
          uv.setXY(i, posicion.getX(i) / ancho + 0.5, posicion.getY(i) / alto + 0.5);
        }
        uv.needsUpdate = true;
        return geometria;
      }

      /** Una mancha redonda y difusa, para la sombra y la luz del suelo. */
      function mancha(rgb: string) {
        const l = document.createElement("canvas");
        l.width = 128;
        l.height = 128;
        const c = l.getContext("2d")!;
        const d = c.createRadialGradient(64, 64, 0, 64, 64, 64);
        d.addColorStop(0, `rgba(${rgb},.9)`);
        d.addColorStop(0.45, `rgba(${rgb},.42)`);
        d.addColorStop(1, `rgba(${rgb},0)`);
        c.fillStyle = d;
        c.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(l);
      }

      /** La franja de brillo del cristal, de arriba a la izquierda abajo a la derecha. */
      function texturaBrillo() {
        const l = document.createElement("canvas");
        l.width = 128;
        l.height = 256;
        const c = l.getContext("2d")!;
        const d = c.createLinearGradient(0, 0, 128, 256);
        d.addColorStop(0, "rgba(255,255,255,0)");
        d.addColorStop(0.34, "rgba(255,255,255,0)");
        d.addColorStop(0.42, "rgba(255,255,255,.075)");
        d.addColorStop(0.52, "rgba(255,255,255,.025)");
        d.addColorStop(0.6, "rgba(255,255,255,0)");
        d.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = d;
        c.fillRect(0, 0, 128, 256);
        const textura = new THREE.CanvasTexture(l);
        textura.colorSpace = THREE.SRGBColorSpace;
        return textura;
      }

      let render: import("three").WebGLRenderer;
      try {
        /* Sin suavizado de bordes en pantallas de 2x o más: ahí el diente de
           sierra no se ve, y suavizar a 3x es pintar cuatro veces cada píxel. */
        render = new THREE.WebGLRenderer({
          canvas: canvas!,
          antialias: window.devicePixelRatio < 2,
          alpha: true,
          powerPreference: "high-performance",
        });
      } catch {
        // Sin WebGL (aceleración apagada, escritorio remoto…): no hay móvil y
        // la portada se lee igual sin él.
        return;
      }

      /* Tantos píxeles como tenga la pantalla de verdad, hasta 3: con un tope
         de 2, en los móviles de ahora el lienzo se estira y sale borroso. Y
         nunca menos de 1,5: pintar de más y dejar que el navegador lo encoja
         suaviza los cantos y la letra. */
      const proporcion = () => Math.min(Math.max(window.devicePixelRatio, 1.5), 3);
      render.setPixelRatio(proporcion());
      render.toneMapping = THREE.NeutralToneMapping;
      render.debug.checkShaderErrors = process.env.NODE_ENV !== "production";

      const escena = new THREE.Scene();
      const camara = new THREE.PerspectiveCamera(24, 1, 1, 30);
      camara.position.set(0, 0, 8);
      escena.environmentIntensity = 0.85;
      let entorno: import("three").WebGLRenderTarget | null = null;

      const css = getComputedStyle(document.documentElement);
      const colorCss = (nombre: string, respaldo: string) =>
        new THREE.Color(css.getPropertyValue(nombre).trim() || respaldo);
      const CIAN = colorCss("--dt-cian", "#38e1ff");
      const MENTA = colorCss("--dt-menta", "#2cf5b0");

      /* Las luces. La clave viene de arriba a la izquierda, como el haz de la
         portada. Los dos contraluces son los que hacen el trabajo de verdad:
         recortan el canto del móvil Y el borde de la mano contra el fondo
         negro, y son lo único que se le ve a la mano. Si algún día la mano
         deja de verse, es aquí donde hay que mirar. */
      const clave = new THREE.DirectionalLight("#ffffff", 1.5);
      clave.position.set(-2.5, 6, 5);
      const contraluz = new THREE.DirectionalLight(CIAN, 5.5);
      contraluz.position.set(5, 1.5, -4);
      const lateral = new THREE.DirectionalLight(MENTA, 2.2);
      lateral.position.set(-5, -1, -2.5);
      escena.add(clave, contraluz, lateral);

      /* ------------------------------------------------------------ móvil */
      const metal = new THREE.MeshPhysicalMaterial({
        color: "#5d636c",
        metalness: 1,
        roughness: 0.3,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
      });
      const negro = new THREE.MeshPhysicalMaterial({
        color: "#030304",
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      });
      const texturaEspalda = new THREE.CanvasTexture(pantallasMod.pintarEspalda());
      texturaEspalda.colorSpace = THREE.SRGBColorSpace;
      const mate = new THREE.MeshPhysicalMaterial({
        map: texturaEspalda,
        roughness: 0.42,
        metalness: 0.1,
        clearcoat: 0.7,
        clearcoatRoughness: 0.32,
      });

      const movil = new THREE.Group();
      const cara = { ancho: ANCHO_M - 2 * CANTO, alto: ALTO_M - 2 * CANTO, radio: RADIO_M - CANTO };
      const cuerpo = new THREE.ExtrudeGeometry(rectanguloRedondo(cara.ancho, cara.alto, cara.radio), {
        depth: GROSOR - 2 * CANTO,
        bevelEnabled: true,
        bevelThickness: CANTO,
        bevelSize: CANTO,
        bevelSegments: 6,
        curveSegments: 32,
      });
      cuerpo.translate(0, 0, -(GROSOR - 2 * CANTO) / 2);
      movil.add(new THREE.Mesh(cuerpo, [negro, metal]));

      /* Delante, el cristal negro y, dentro, la pantalla encendida.

         La pantalla NO recibe luz ni reflejos: se pinta tal cual, con los
         colores exactos de la app. Probado lo otro en Priora: el reflejo del
         estudio, por flojo que fuera, subía el negro del fondo a un gris
         neblinoso y aplastaba las tarjetas. El cristal lo pone el brillo. */
      const frente = new THREE.Mesh(placa(cara.ancho, cara.alto, cara.radio), negro);
      frente.position.z = GROSOR / 2 + 0.0005;
      const materialPantalla = new THREE.MeshBasicMaterial({ color: "#000000", toneMapped: false });
      /* Al encoger una textura, la tarjeta gráfica pinta una copia más pequeña
         y borrosa (mipmap) y la letra se ve blanda. Este sesgo le hace usar la
         copia grande un poco más; con más, la letra parpadea al moverse. */
      materialPantalla.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <map_fragment>",
          `#ifdef USE_MAP
            diffuseColor *= texture2D( map, vMapUv, -0.6 );
          #endif`,
        );
      };
      const pantallaMesh = new THREE.Mesh(placa(PANTALLA_ANCHO, PANTALLA_ALTO, PANTALLA_RADIO), materialPantalla);
      pantallaMesh.position.z = GROSOR / 2 + 0.001;
      const brillo = new THREE.Mesh(
        placa(PANTALLA_ANCHO, PANTALLA_ALTO, PANTALLA_RADIO),
        new THREE.MeshBasicMaterial({ map: texturaBrillo(), transparent: true, depthWrite: false, toneMapped: false }),
      );
      brillo.position.z = GROSOR / 2 + 0.0015;

      // Detrás, cristal mate con el símbolo, y las cámaras.
      const trasera = new THREE.Mesh(placa(cara.ancho, cara.alto, cara.radio), mate);
      trasera.rotation.y = Math.PI;
      trasera.position.z = -GROSOR / 2 - 0.0005;
      const camaras = new THREE.Group();
      const isla = new THREE.ExtrudeGeometry(rectanguloRedondo(0.27, 0.27, 0.075), {
        depth: 0.006,
        bevelEnabled: true,
        bevelThickness: 0.004,
        bevelSize: 0.004,
        bevelSegments: 3,
        curveSegments: 20,
      });
      camaras.add(new THREE.Mesh(isla, mate));
      for (const [x, y] of [
        [-0.062, 0.062],
        [-0.062, -0.062],
        [0.064, 0],
      ] as const) {
        const aro = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.016, 32), metal);
        aro.rotation.x = Math.PI / 2;
        aro.position.set(x, y, 0.012);
        const lente = new THREE.Mesh(new THREE.CylinderGeometry(0.037, 0.037, 0.018, 32), negro);
        lente.rotation.x = Math.PI / 2;
        lente.position.set(x, y, 0.014);
        camaras.add(aro, lente);
      }
      camaras.rotation.y = Math.PI;
      camaras.position.set(ANCHO_M / 2 - 0.19, ALTO_M / 2 - 0.19, -GROSOR / 2);

      // Los botones del canto.
      for (const [lado, altura, largo] of [
        [-1, 0.47, 0.07],
        [-1, 0.33, 0.12],
        [-1, 0.18, 0.12],
        [1, 0.27, 0.19],
      ] as const) {
        const boton = new THREE.Mesh(new RoundedBoxGeometry(0.014, largo, 0.034, 2, 0.006), metal);
        boton.position.set(lado * (ANCHO_M / 2 + 0.002), altura, 0);
        movil.add(boton);
      }
      movil.add(frente, pantallaMesh, brillo, trasera, camaras);
      escena.add(movil);

      /* -------------------------------------------------------------- mano
         LA MANO ES UN MODELO, NO GEOMETRÍA ESCRITA AQUÍ. La primera versión
         la construía con cápsulas sueltas —un cilindro por falange— y se veía
         exactamente a lo que era: tubos separados, sin carne entre los dedos
         y con bolas por nudillos. Ahora sale de Blender
         (herramientas/mano-blender.py), donde el modificador Skin le pone
         carne alrededor de un esqueleto conectado: hay palma de verdad entre
         los dedos y las articulaciones son continuas.

         Ese script es la fuente; public/modelos/mano.glb es lo que se
         publica. Para cambiar la pose se toca el script y se vuelve a
         ejecutar, no se edita el .glb.

         La mano va dentro de una envoltura cuyo origen es el punto donde se
         apoya el móvil, que viene marcado en el propio modelo con un vacío
         llamado «apoyo». Así la portada coloca la envoltura donde quiere que
         esté el móvil y la mano se acomoda sola debajo. */
      const envolturaMano = new THREE.Group();
      escena.add(envolturaMano);
      /* Se ESPERA a que cargue antes de seguir, en vez de añadirla cuando
         llegue. Si llega tarde, la entrada ya ha pasado y la mano aparece de
         golpe debajo del móvil, que es peor que no tenerla. Esperar aquí la
         mete en el mismo compilado de shaders que el resto y entra con la
         animación, como una pieza más. Si falla, el móvil flota solo. */
      try {
        const glb = await new GLTFLoader().loadAsync("/modelos/mano.glb");
        if (!vivo) return;
        const grupo = glb.scene;
        /* Inclinada hacia atrás: desde la cámara los dedos quedan escorzados
           y la mano se lee como una mano que viene hacia ti, no como una
           silueta plana recortada. */
        grupo.rotation.set(0.42, -0.16, POSE.z * 0.8);
        /* El modelo está en medidas de mano de verdad (la palma mide unos 9
           cm); la escena trabaja con el móvil midiendo 1,5 de alto. */
        grupo.scale.setScalar(7.4);
        envolturaMano.add(grupo);

        const apoyo = grupo.getObjectByName("apoyo");
        grupo.updateMatrixWorld(true);
        if (apoyo) {
          const sitioApoyo = new THREE.Vector3();
          apoyo.getWorldPosition(sitioApoyo);
          grupo.position.sub(sitioApoyo);
          apoyo.visible = false;
        }
      } catch {
        // Sin mano: el móvil flota solo y la portada se sostiene igual.
      }

      /* En el suelo, la luz de la pantalla y encima la sombra: es lo que hace
         que el conjunto parezca estar en un sitio y no pegado al fondo. */
      const materialLuz = new THREE.MeshBasicMaterial({
        map: mancha("255,255,255"),
        color: CIAN,
        transparent: true,
        depthWrite: false,
      });
      const luz = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialLuz);
      luz.renderOrder = -2;
      const materialSombra = new THREE.MeshBasicMaterial({
        map: mancha("0,0,0"),
        transparent: true,
        depthWrite: false,
      });
      const sombra = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialSombra);
      sombra.renderOrder = -1;
      escena.add(luz, sombra);

      /* ------------------------------------------------- encajar en la caja */
      const coseno = Math.cos(POSE.z);
      const seno = Math.abs(Math.sin(POSE.z));
      const altoGirado = coseno * ALTO_M + seno * ANCHO_M;
      const anchoGirado = seno * ALTO_M + coseno * ANCHO_M;
      const base = { x: 0, y: 0, escala: 1, unidad: 1 };
      const tamano = { ancho: 1, alto: 1, izquierda: 0 };
      function encajar() {
        const lienzoCaja = canvas!.getBoundingClientRect();
        const huecoCaja = caja!.getBoundingClientRect();
        if (!lienzoCaja.width || !lienzoCaja.height) return;
        tamano.ancho = lienzoCaja.width;
        tamano.alto = lienzoCaja.height;
        tamano.izquierda = lienzoCaja.left;
        render.setPixelRatio(proporcion());
        render.setSize(lienzoCaja.width, lienzoCaja.height, false);
        camara.aspect = lienzoCaja.width / lienzoCaja.height;
        camara.updateProjectionMatrix();
        const altoVisible = 2 * Math.tan(THREE.MathUtils.degToRad(camara.fov / 2)) * camara.position.z;
        const unidad = lienzoCaja.height / altoVisible;
        base.x = (huecoCaja.left + huecoCaja.width / 2 - (lienzoCaja.left + lienzoCaja.width / 2)) / unidad;
        base.y = -(huecoCaja.top + huecoCaja.height / 2 - (lienzoCaja.top + lienzoCaja.height / 2)) / unidad;
        base.escala = Math.min(huecoCaja.height / unidad / altoGirado, huecoCaja.width / unidad / anchoGirado);
        base.unidad = unidad;
      }
      encajar();
      const observaTamano = new ResizeObserver(encajar);
      observaTamano.observe(canvas!);
      observaTamano.observe(caja!);

      let visible = true;
      const observaVista = new IntersectionObserver(([e]) => {
        visible = Boolean(e?.isIntersecting);
      });
      observaVista.observe(canvas!);

      /* El ratón inclina el conjunto, solo con ratón de verdad: con el dedo no
         hay «pasar por encima». Sin medir nada en cada movimiento: medir el
         lienzo obligaría a recalcular los estilos de la página 60 veces por
         segundo. */
      const objetivo = { x: 0, y: 0 };
      const raton = { x: 0, y: 0 };
      function alMover(e: PointerEvent) {
        objetivo.x = THREE.MathUtils.clamp(((e.clientX - tamano.izquierda) / tamano.ancho) * 2 - 1, -1, 1);
        objetivo.y = THREE.MathUtils.clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
      }
      if (!reducido && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("pointermove", alMover, { passive: true });
      }

      // Lo que mueven la entrada y los cambios de pantalla.
      const anim = { giro: 0, subida: 0, escala: 1, sombra: 1, empuje: 0, mano: 0 };
      const estado = { de: pedida.current, a: pedida.current, paso: 1 };
      let pantallas: Awaited<ReturnType<typeof pantallasMod.crearPantallas>> | null = null;
      let textura: import("three").CanvasTexture | null = null;
      let sucio = true;
      let notaLista = false;
      const ensuciar = () => {
        sucio = true;
      };

      function cambiar(indice: number) {
        if (!pantallas) {
          estado.de = indice;
          estado.a = indice;
          return;
        }
        if (indice === estado.a) return;
        gsap.killTweensOf(estado);
        estado.de = estado.paso < 0.5 ? estado.de : estado.a;
        estado.a = indice;
        estado.paso = 0;
        notaLista = false;
        sucio = true;
        gsap.to(estado, {
          paso: 1,
          duration: reducido ? 0.5 : 0.75,
          ease: reducido ? "power1.inOut" : "power3.inOut",
          onUpdate: ensuciar,
          onComplete: () => {
            estado.de = indice;
            sucio = true;
            notaLista = true;
          },
        });
        // Un empujoncito, como si lo hubieras tocado.
        if (!reducido) gsap.fromTo(anim, { empuje: 0 }, { empuje: 1, duration: 1.1, ease: "power2.out" });
      }
      irA.current = cambiar;

      /* La nota sigue al punto de la pantalla, esté como esté girado el móvil. */
      const sitio = new THREE.Vector3();
      const normal = new THREE.Vector3();
      const hacia = new THREE.Vector3();
      let lado = "";
      let opacidad = "";
      /* El ancho de la etiqueta, medido solo cuando cambia. Leer offsetWidth
         en cada fotograma, justo después de mover el punto, obliga al
         navegador a recolocar la página entera 60 veces por segundo. */
      let anchoEtiqueta = etiqueta!.offsetWidth;
      const observaEtiqueta = new ResizeObserver(([e]) => {
        anchoEtiqueta = e?.borderBoxSize?.[0]?.inlineSize ?? etiqueta!.offsetWidth;
      });
      observaEtiqueta.observe(etiqueta!);
      function colocarNota() {
        const p = pantallas?.puntos[estado.a];
        if (!p) return;
        sitio.set((p.x / ANCHO - 0.5) * PANTALLA_ANCHO, (0.5 - p.y / ALTO) * PANTALLA_ALTO, 0.002);
        pantallaMesh.localToWorld(sitio);
        normal.set(0, 0, 1).transformDirection(pantallaMesh.matrixWorld);
        hacia.subVectors(camara.position, sitio).normalize();
        const deCara = normal.dot(hacia) > 0.3;
        sitio.project(camara);
        const x = ((sitio.x + 1) / 2) * tamano.ancho;
        const y = ((1 - sitio.y) / 2) * tamano.alto;
        marca!.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        const ver = notaLista && deCara ? "1" : "0";
        if (ver !== opacidad) {
          marca!.style.opacity = ver;
          opacidad = ver;
        }
        /* La etiqueta va a un lado del punto si cabe entera y, si no cabe a
           ninguno, debajo y metida en la pantalla. Con holgura, para que no
           salte de un lado a otro mientras el móvil flota. */
        const ancho = anchoEtiqueta;
        const cabe = (l: string, holgura: number) =>
          l === "izquierda"
            ? x - 44 - ancho >= 8 - holgura
            : l === "derecha"
              ? x + 44 + ancho <= tamano.ancho - 8 + holgura
              : false;
        if (!cabe(lado, 6) && !(lado === "abajo" && !cabe("izquierda", -6) && !cabe("derecha", -6))) {
          lado = cabe("derecha", 0) ? "derecha" : cabe("izquierda", 0) ? "izquierda" : "abajo";
          marca!.dataset.lado = lado;
        }
        if (lado === "abajo") {
          const izquierda = THREE.MathUtils.clamp(x - ancho / 2, 8, tamano.ancho - 8 - ancho) - x;
          marca!.style.setProperty("--nota-x", `${izquierda.toFixed(1)}px`);
        }
      }

      const reloj = new THREE.Timer();
      let cuadro = 0;
      function pintar(ms?: number) {
        cuadro = requestAnimationFrame(pintar);
        if (!visible || document.hidden || !pantallas || !textura) return;
        reloj.update(ms);
        const t = reloj.getElapsed();
        if (sucio) {
          pantallas.componer(estado.de, estado.a, estado.paso, reducido);
          textura.needsUpdate = true;
          sucio = false;
        }

        raton.x += (objetivo.x - raton.x) * 0.05;
        raton.y += (objetivo.y - raton.y) * 0.05;
        const flota = reducido ? 0.3 : 1;
        const arriba = Math.sin(t * 1.05) * 0.03 * flota;

        movil.position.set(base.x, base.y + arriba + anim.subida, 0);
        movil.rotation.set(
          POSE.x + raton.y * 0.14 + Math.sin(t * 0.7) * 0.022 * flota,
          POSE.y + anim.giro + raton.x * 0.2 + Math.sin(t * 0.5) * 0.035 * flota + Math.sin(anim.empuje * Math.PI) * 0.08,
          POSE.z + Math.sin(t * 0.6) * 0.013 * flota,
        );
        movil.scale.setScalar(base.escala * anim.escala);

        /* La mano va a lo suyo: sube con la entrada, respira más despacio que
           el móvil y se inclina con el ratón la mitad. Que no vayan
           exactamente igual es lo que hace que parezcan dos cosas y no un
           bloque. */
        envolturaMano.position.set(
          base.x,
          base.y + anim.mano + Math.sin(t * 0.72) * 0.016 * flota,
          0,
        );
        envolturaMano.rotation.set(raton.y * 0.05, raton.x * 0.09, Math.sin(t * 0.44) * 0.01 * flota);
        /* Un pelo más pequeña que el móvil. Una mano abierta ocupa, con los
           dedos separados, bastante más ancho que la palma, y a la misma
           escala el conjunto se leía como una mano enorme con un móvil
           pequeño dentro. */
        envolturaMano.scale.setScalar(base.escala * 0.88);

        /* La sombra, en el suelo: más pequeña y clara cuanto más sube el
           móvil. A la misma profundidad que él: más atrás, la perspectiva la
           metía debajo y no se veía. */
        const suelo = base.y - altoGirado * base.escala * 0.5 - 0.1 * base.escala;
        const presencia = Math.max(0, anim.sombra);
        sombra.position.set(base.x + 0.06 * base.escala, suelo, 0);
        sombra.scale.set(anchoGirado * base.escala * (1.1 - arriba * 2), 0.22 * base.escala, 1);
        materialSombra.opacity = 0.75 * presencia * (1 - arriba * 4);
        luz.position.set(base.x + 0.06 * base.escala, suelo - 0.02 * base.escala, 0);
        luz.scale.set(anchoGirado * base.escala * 1.3, 0.5 * base.escala, 1);
        materialLuz.opacity = 0.2 * presencia;

        render.render(escena, camara);
        colocarNota();
      }

      desmontar = () => {
        cancelAnimationFrame(cuadro);
        gsap.killTweensOf([anim, estado, canvas]);
        window.removeEventListener("pointermove", alMover);
        observaTamano.disconnect();
        observaVista.disconnect();
        observaEtiqueta.disconnect();
        irA.current = () => {};
        escena.traverse((objeto) => {
          if (!(objeto instanceof THREE.Mesh)) return;
          objeto.geometry.dispose();
          for (const material of [objeto.material].flat()) {
            for (const valor of Object.values(material)) if (valor instanceof THREE.Texture) valor.dispose();
            material.dispose();
          }
        });
        entorno?.dispose();
        render.dispose();
      };

      /* Paso 2: el estudio de fotografía de los reflejos. A 128 y no a 256: en
         un canto de metal con algo de rugosidad no se nota, y es la cuarta
         parte de trabajo. */
      await ceder();
      if (!vivo) return;
      const generador = new THREE.PMREMGenerator(render);
      const sala = new RoomEnvironment();
      entorno = generador.fromScene(sala, 0.04, 0.1, 100, { size: 128 });
      sala.dispose();
      generador.dispose();
      escena.environment = entorno.texture;

      /* Paso 3: las pantallas, con los píxeles que de verdad va a ocupar la
         pantalla del móvil. */
      await ceder();
      if (!vivo) return;
      const pixelesPantalla = PANTALLA_ANCHO * base.escala * base.unidad * render.getPixelRatio();
      const p = await pantallasMod.crearPantallas(pixelesPantalla > ANCHO * 1.8 ? 3 : 2);
      if (!vivo) return;
      pantallas = p;
      textura = new THREE.CanvasTexture(p.lienzo);
      textura.colorSpace = THREE.SRGBColorSpace;
      textura.anisotropy = render.capabilities.getMaxAnisotropy();
      materialPantalla.map = textura;
      materialPantalla.color.set("#ffffff");
      materialPantalla.needsUpdate = true;
      p.componer(estado.de, estado.a, estado.paso, reducido);
      sucio = false;

      /* Paso 4: los shaders, compilados en paralelo antes del primer
         fotograma. Sin esto los compila ese fotograma y la página se queda
         parada; las texturas, subidas también antes. */
      await render.compileAsync(escena, camara);
      if (!vivo) return;
      render.initTexture(textura);
      render.initTexture(texturaEspalda);
      await ceder();
      if (!vivo) return;

      /* Y ya: la mano sube desde abajo y el móvil llega detrás dando la
         vuelta —entra enseñando la espalda— y se posa encima. La mano sale
         antes y llega antes: si los dos aparecen a la vez, parece que el
         móvil empuja a la mano en lugar de caer en ella. */
      pintar();
      const entrada = gsap.timeline({ onComplete: () => (notaLista = true) });
      entrada.to(canvas, { opacity: 1, duration: reducido ? 1.2 : 0.6, ease: "power1.out" }, 0);
      if (!reducido) {
        entrada
          .fromTo(anim, { mano: -1.5 }, { mano: 0, duration: 1.9, ease: "expo.out" }, 0)
          .fromTo(anim, { subida: -1.25 }, { subida: 0, duration: 2, ease: "expo.out" }, 0.22)
          .fromTo(anim, { giro: Math.PI }, { giro: 0, duration: 2.3, ease: "expo.inOut" }, 0.3)
          .fromTo(anim, { escala: 0.86 }, { escala: 1, duration: 2.3, ease: "expo.out" }, 0.22)
          .fromTo(anim, { sombra: 0 }, { sombra: 1, duration: 1.6, ease: "power2.out" }, 0.7);
      }
    }

    montar().catch(() => {
      // Sin móvil: la portada se lee igual sin él.
    });

    return () => {
      vivo = false;
      desmontar();
    };
  }, [hueco]);

  useEffect(() => {
    pedida.current = pantalla;
    irA.current(pantalla);
  }, [pantalla]);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={lienzo} className="absolute inset-0 h-full w-full opacity-0" />
      {/* El punto y su nota: los coloca el bucle de arriba, fotograma a fotograma. */}
      <div
        ref={punto}
        data-lado="derecha"
        className="group pointer-events-none absolute top-0 left-0 opacity-0 transition-opacity duration-500 will-change-transform"
      >
        <span className="dt-latido absolute -top-[7px] -left-[7px] size-3.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,.16),0_0_18px_rgba(255,255,255,.55)]" />
        <span className="absolute top-0 h-px w-7 from-white/0 to-white/70 group-data-[lado=abajo]:top-2 group-data-[lado=abajo]:left-0 group-data-[lado=abajo]:h-3 group-data-[lado=abajo]:w-px group-data-[lado=abajo]:bg-gradient-to-t group-data-[lado=derecha]:left-3 group-data-[lado=derecha]:bg-gradient-to-l group-data-[lado=izquierda]:right-3 group-data-[lado=izquierda]:bg-gradient-to-r" />
        <span
          ref={texto}
          className="absolute top-0 -translate-y-1/2 rounded-full border border-white/15 bg-[#0b0c0f]/90 px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-fg shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)] group-data-[lado=abajo]:top-5 group-data-[lado=abajo]:left-[var(--nota-x)] group-data-[lado=abajo]:translate-y-0 group-data-[lado=derecha]:left-10 group-data-[lado=izquierda]:right-10"
        >
          {nota}
        </span>
      </div>
    </div>
  );
}

/**
 * Deja al navegador pintar y atender al dedo antes de seguir: cuando esté
 * libre, o como mucho en 400 ms.
 */
function ceder(): Promise<void> {
  return new Promise((seguir) => {
    if ("requestIdleCallback" in window) requestIdleCallback(() => seguir(), { timeout: 400 });
    else setTimeout(seguir, 30);
  });
}

export { PANTALLAS };
