// ---------------------------------------------------------------------------
// LA MANO QUE SUBE DESDE ABAJO Y SOSTIENE EL MÓVIL
//
// Construida con geometría, como el móvil: ni modelo descargado ni foto.
//
// POR QUÉ ES UNA SILUETA Y NO PIEL. Es una decisión, no una limitación que no
// supimos salvar. La referencia que pidió el cliente (Craftfolio) usa una
// FOTO de una mano, con luz de recorte en los dedos. Una mano de geometría
// que intenta parecer piel al lado de un móvil que sí parece real no se lee
// como «mano», se lee como «3D de los noventa», y arrastra al móvil con ella.
//
// Así que esta mano no compite: es negra, casi plana de tono, y lo único que
// se le ve es el borde iluminado por las mismas luces que recortan el móvil.
// El ojo la lee como una silueta a contraluz —que es exactamente lo que es la
// mano de la referencia debajo de la luz— y nadie le pide detalle a una
// silueta.
//
// LA POSE: palma abierta hacia arriba, dedos algo curvados y abiertos en
// abanico, con el móvil flotando justo encima. No agarrando: para que una
// mano agarre de verdad, los dedos tienen que envolver el canto y tocar el
// cristal en sitios exactos, y cualquier desajuste de un milímetro se ve como
// un dedo metido dentro del móvil. Sosteniéndolo a un dedo de distancia no
// hay nada que encajar y además queda mejor: el móvil flota, que es lo que
// hace toda la escena.
//
// Cada dedo es una cadena de grupos anidados (nudillo → falange → falange),
// como un esqueleto. Girar el primero arrastra a los demás, igual que una
// mano de verdad, y así la curvatura se dice en ángulos y no en posiciones
// calculadas a mano.
// ---------------------------------------------------------------------------
import * as THREE from "three";

/** Las medidas, en unidades de escena. El móvil mide 0,75 de ancho. */
const PALMA = { ancho: 0.84, alto: 0.72, grueso: 0.21 };
/** Radio de la base del dedo y de la punta: los dedos se estrechan. */
const DEDO_GRUESO = 0.072;
const PUNTA_GRUESA = 0.054;

/**
 * Un dedo: tres falanges encadenadas, cada una más corta y fina que la
 * anterior, y cada una girada respecto a la de antes.
 *
 * `curva` es cuánto se cierra el dedo entero (0 = estirado). Las tres
 * falanges no se doblan lo mismo: la del medio es la que más, como en una
 * mano de verdad cuando se ahueca para sostener algo.
 */
function dedo(material: THREE.Material, largo: number, curva: number, grueso = DEDO_GRUESO): THREE.Group {
  const raiz = new THREE.Group();
  const trozos = [0.42, 0.33, 0.25];
  const giros = [curva * 0.5, curva * 0.85, curva * 0.7];
  let padre = raiz;
  trozos.forEach((parte, i) => {
    const articulacion = new THREE.Group();
    articulacion.rotation.x = -giros[i]!;
    padre.add(articulacion);

    const alto = largo * parte;
    // De la base a la punta, el dedo se estrecha.
    const r0 = grueso * (1 - i * 0.12);
    const r1 = grueso * (1 - (i + 1) * 0.12);
    const radio = i === 2 ? (PUNTA_GRUESA * grueso) / DEDO_GRUESO : (r0 + r1) / 2;
    const hueso = new THREE.Mesh(new THREE.CapsuleGeometry(radio, alto * 0.72, 4, 14), material);
    hueso.position.y = alto / 2;
    articulacion.add(hueso);

    // El siguiente nudillo, en la punta de este trozo.
    const siguiente = new THREE.Group();
    siguiente.position.y = alto;
    articulacion.add(siguiente);
    padre = siguiente;
  });
  return raiz;
}

export interface Mano {
  grupo: THREE.Group;
  /** Dónde descansa el móvil, en coordenadas del grupo de la mano. */
  apoyo: THREE.Object3D;
}

/**
 * Construye la mano abierta, mirando hacia arriba, con el antebrazo saliendo
 * por abajo del encuadre.
 */
export function construirMano(): Mano {
  const grupo = new THREE.Group();

  /* El material: casi negro, bastante rugoso y nada metálico. Lo poco que se
     ve sale de las luces de recorte de la escena, que son las mismas que
     perfilan el canto del móvil — por eso la mano y el móvil parecen estar en
     el mismo sitio y no pegados el uno al lado del otro.

     Probado con un negro puro (#000): desaparecía del todo contra el fondo y
     el móvil parecía flotar solo. Hace falta que tenga algo de tono para que
     el recorte tenga de dónde salir. */
  const piel = new THREE.MeshStandardMaterial({
    color: "#0b0f16",
    roughness: 0.78,
    metalness: 0.08,
  });

  // La palma: una caja redondeada, un poco más ancha arriba (los nudillos)
  // que abajo (la muñeca).
  const palma = new THREE.Mesh(
    new THREE.CapsuleGeometry(PALMA.grueso / 2, PALMA.alto - PALMA.grueso, 6, 20),
    piel,
  );
  palma.scale.set((PALMA.ancho / PALMA.grueso) * 0.92, 1, 1);
  grupo.add(palma);

  // El canto de la mano, por el lado del meñique: lo que hace que la palma no
  // parezca un churro. Una segunda cápsula más fina, pegada al lado.
  const canto = new THREE.Mesh(new THREE.CapsuleGeometry(PALMA.grueso * 0.44, PALMA.alto * 0.72, 5, 16), piel);
  canto.position.set(-PALMA.ancho * 0.42, -PALMA.alto * 0.06, 0);
  grupo.add(canto);

  /* Los cuatro dedos. Separados en abanico y curvados de forma desigual: el
     índice casi estirado, el corazón y el anular algo más cerrados, el
     meñique el que más. Una mano con los cuatro dedos iguales se ve falsa al
     instante aunque nadie sepa decir por qué. */
  const nudillos = new THREE.Group();
  nudillos.position.y = PALMA.alto / 2 - 0.02;
  grupo.add(nudillos);

  /* MÁS CERRADOS Y MÁS CORTOS QUE LA PRIMERA VERSIÓN. Con los dedos casi
     estirados y bien abiertos, la silueta salía larga y simétrica y se leía
     como un maniquí, no como una mano. Una mano que sostiene algo tiene los
     dedos recogidos, desiguales y bastante escorzados desde delante: eso es
     lo que hacen `curva` (cuánto se cierra cada uno) y el giro hacia atrás
     de los nudillos. */
  const dedos: { x: number; largo: number; curva: number; abre: number; grueso: number }[] = [
    { x: 0.285, largo: 0.6, curva: 0.62, abre: -0.13, grueso: 0.073 },
    { x: 0.1, largo: 0.66, curva: 0.7, abre: -0.03, grueso: 0.076 },
    { x: -0.09, largo: 0.62, curva: 0.78, abre: 0.06, grueso: 0.071 },
    { x: -0.265, largo: 0.5, curva: 0.9, abre: 0.17, grueso: 0.06 },
  ];
  for (const d of dedos) {
    const articulacion = dedo(piel, d.largo, d.curva, d.grueso);
    articulacion.position.set(d.x, 0, 0);
    // `abre` separa los dedos en abanico; el giro en x los echa hacia atrás,
    // que es lo que hace que la mano se vea ahuecada y no plana.
    articulacion.rotation.z = d.abre;
    articulacion.rotation.x = -0.3;
    nudillos.add(articulacion);
  }

  /* El pulgar sale del lado del índice, más abajo y girado casi en
     perpendicular: es lo que convierte una pala con cuatro palos en una mano. */
  const pulgar = dedo(piel, 0.5, 0.5, 0.085);
  pulgar.position.set(PALMA.ancho * 0.4, -PALMA.alto * 0.1, 0.06);
  pulgar.rotation.set(-0.6, 0.25, -1.05);
  grupo.add(pulgar);

  /* La muñeca y el antebrazo, que se van hacia abajo y hacia atrás y salen
     del encuadre. No hace falta que acabe en ningún sitio: el velo de abajo
     de la portada se lo come. */
  const muneca = new THREE.Mesh(new THREE.CapsuleGeometry(PALMA.grueso * 0.52, 0.3, 5, 16), piel);
  muneca.position.set(0, -PALMA.alto * 0.56, -0.02);
  grupo.add(muneca);

  const brazo = new THREE.Mesh(new THREE.CylinderGeometry(PALMA.grueso * 0.62, PALMA.grueso * 0.86, 1.6, 20, 1, true), piel);
  brazo.position.set(0, -PALMA.alto * 0.5 - 0.84, -0.16);
  brazo.rotation.x = 0.22;
  grupo.add(brazo);

  /* Dónde se queda el móvil: encima de la palma, a un dedo de distancia, y
     algo adelantado hacia las puntas (una mano que sostiene algo no lo tiene
     en el centro geométrico, lo tiene donde se apoya). */
  const apoyo = new THREE.Object3D();
  apoyo.position.set(0, PALMA.alto * 0.34, PALMA.grueso * 0.5 + 0.2);
  grupo.add(apoyo);

  return { grupo, apoyo };
}
