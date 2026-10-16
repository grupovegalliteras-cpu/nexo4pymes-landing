"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { usarMovimientoReducido, usarPantallaAncha } from "@/components/motion/usarMovimiento";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   PRIMITIVAS DE ANIMACIÓN
   Todo el sitio entra por aquí. Un único punto decide qué pasa
   con prefers-reduced-motion: si está activo, los elementos
   aparecen sin desplazarse (opacidad instantánea) en vez de
   quedarse invisibles.

   Se anima solo transform y opacity: son las dos propiedades que
   el navegador compone en GPU sin recalcular layout.
   ============================================================ */

export const SALIDA = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   CON MOVIMIENTO REDUCIDO SE FUNDE, NO SE SALTA

   Antes, con movimiento reducido, la duración bajaba a 0,001 s: el
   elemento aparecía de golpe. Es lo que hacía que en Mac y en móvil
   se vieran las entradas y en ningún PC: macOS pide «reducir
   movimiento» solo si alguien lo activa en Accesibilidad, mientras
   que Windows enciende esa misma señal con un interruptor general de
   efectos que se apaga por rendimiento, y que en muchos equipos viene
   apagado de fábrica.

   Lo que hay que quitar es el MOVIMIENTO —desplazamiento, escala—,
   que es lo que marea a quien tiene un trastorno vestibular. Un
   fundido de opacidad no mueve nada, así que se queda. Quien pidió
   movimiento reducido no ve desplazarse un solo píxel; quien tiene
   Windows con los efectos apagados deja de ver una web que aparece de
   golpe.

   Medio segundo: suficiente para percibirlo, corto para no estorbar
   a quien va con prisa. El equivalente en CSS está en el bloque
   prefers-reduced-motion de app/(demo)/globals.css. */
export const FUNDIDO_SIN_MOVIMIENTO = 0.5;

type Direccion = "arriba" | "abajo" | "izquierda" | "derecha" | "escala";

/* EL RECORRIDO DEPENDE DEL TAMAÑO DE PANTALLA, y no es un capricho.

   Estos valores se acortaron en su día (22 → 12 px, 0,62 → 0,38 s)
   con un motivo bueno: en móvil, donde el pulgar va rápido y cada
   sección entra detrás de la anterior, una entrada larga no se lee
   como elegancia, se lee como que la página va lenta.

   Lo que no se vio es que el mismo recorrido de 12 px en un monitor
   de 2560 px no se ve. La animación corre, pero no la percibe nadie:
   es un 0,5 % del ancho de la pantalla. Así que a partir de 1024 px
   se recupera el recorrido largo, y por debajo se queda corto. */
function desplazamiento(direccion: Direccion, ancha: boolean) {
  const y = ancha ? 28 : 12;
  const x = ancha ? 34 : 18;
  switch (direccion) {
    case "abajo":
      return { y: -y, x: 0, scale: 1 };
    case "izquierda":
      return { y: 0, x: -x, scale: 1 };
    case "derecha":
      return { y: 0, x, scale: 1 };
    case "escala":
      return { y: ancha ? 18 : 8, x: 0, scale: ancha ? 0.94 : 0.97 };
    default:
      return { y, x: 0, scale: 1 };
  }
}

export function Reveal({
  children,
  direccion = "arriba",
  retraso = 0,
  duracion = 0.38,
  className,
  id,
  as = "div",
}: {
  children: ReactNode;
  direccion?: Direccion;
  retraso?: number;
  duracion?: number;
  className?: string;
  /* Para que quien envuelve pueda apuntar aquí con aria-controls. */
  id?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const reducido = usarMovimientoReducido();
  const ancha = usarPantallaAncha();
  const d = desplazamiento(direccion, ancha);
  const Componente = motion[as];

  /* ============================================================
     RED DE SEGURIDAD: UN TEXTO INVISIBLE ES PEOR QUE UNO QUIETO

     Esto entraba con `whileInView`, que deja el elemento en
     opacidad 0 hasta que el observador de intersección avisa de que
     está a la vista. El problema es qué pasa cuando ese aviso no
     llega nunca, porque entonces el contenido no se queda sin
     animar: se queda sin aparecer.

     QUE CONSTE: esto es una precaución, no el parche de un fallo
     observado. No he visto esta web quedarse en blanco por este
     motivo. Lo que sí es cierto es que una pestaña abierta en
     segundo plano (enlace con el botón central, pestañas
     restauradas al arrancar el navegador) tiene los observadores
     congelados, y que un fallo así sería silencioso: nadie reporta
     media página en blanco, simplemente se va. Veinte líneas por
     cubrirlo parecen baratas.

     Así que a los 900 ms se comprueba a mano si el elemento está en
     pantalla y, si lo está y el observador no ha dicho nada, se
     muestra igual. Solo rescata lo que de verdad se ve: lo que está
     más abajo sigue esperando su turno y conserva su animación al
     hacer scroll. Y se vuelve a comprobar cuando la pestaña pasa a
     primer plano, que es cuando esto suele destaparse.
     ============================================================ */
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.25, margin: "0px 0px -60px 0px" });
  const [rescatado, setRescatado] = useState(false);

  useEffect(() => {
    if (rescatado) return;
    const comprobar = () => {
      const el = ref.current;
      if (!el) return;
      const caja = el.getBoundingClientRect();
      if (caja.top < window.innerHeight && caja.bottom > 0) setRescatado(true);
    };
    const reloj = setTimeout(comprobar, 900);
    document.addEventListener("visibilitychange", comprobar);
    return () => {
      clearTimeout(reloj);
      document.removeEventListener("visibilitychange", comprobar);
    };
  }, [rescatado]);

  const mostrar = enVista || rescatado;

  /* VA CON VARIANTES Y NO CON `initial` SUELTO, y la diferencia no es
     de estilo. `initial` solo se aplica al montar, y el dato de si la
     pantalla es ancha no existe en ese momento: se resuelve en el
     primer efecto, para no romper la hidratación. Con `initial`, el
     elemento se quedaba con el recorrido corto de móvil aunque luego
     supiéramos que es un monitor, así que el arreglo de arriba no
     habría servido de nada.

     Las variantes se releen en cada render, así que cuando llega el
     dato el estado oculto se actualiza. Y como el elemento está en
     opacidad 0 mientras tanto, ese reajuste no se ve. */
  const variantes: Variants = {
    /* duration 0 en el estado oculto: cuando se resuelve lo de la
       pantalla ancha, el recorrido pasa de 12 a 28 px, y eso es un
       cambio de postura, no una animación. Sin esto se interpolaría
       (invisible, porque la opacidad es 0, pero gastando trabajo). */
    oculto: reducido
      ? { opacity: 0, transition: { duration: 0 } }
      : { opacity: 0, ...d, transition: { duration: 0 } },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: reducido ? FUNDIDO_SIN_MOVIMIENTO : ancha ? duracion * 1.5 : duracion,
        delay: reducido ? 0 : retraso,
        ease: SALIDA,
      },
    },
  };

  return (
    <Componente
      ref={ref as React.Ref<never>}
      id={id}
      className={className}
      variants={variantes}
      initial="oculto"
      animate={mostrar ? "visible" : "oculto"}
    >
      {children}
    </Componente>
  );
}

/* Contenedor que escalona a sus hijos directos <ItemStagger>. */
export function Stagger({
  children,
  className,
  intervalo = 0.08,
  retraso = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  intervalo?: number;
  retraso?: number;
  as?: "div" | "ul" | "section";
}) {
  const reducido = usarMovimientoReducido();
  const ancha = usarPantallaAncha();
  const Componente = motion[as];

  /* La misma red de seguridad que en Reveal, por el mismo motivo:
     si el contenedor no llega a "visible", sus hijos se quedan todos
     en opacidad 0 y desaparece la sección entera de golpe. */
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -60px 0px" });
  const [rescatado, setRescatado] = useState(false);

  useEffect(() => {
    if (rescatado) return;
    const comprobar = () => {
      const el = ref.current;
      if (!el) return;
      const caja = el.getBoundingClientRect();
      if (caja.top < window.innerHeight && caja.bottom > 0) setRescatado(true);
    };
    const reloj = setTimeout(comprobar, 900);
    document.addEventListener("visibilitychange", comprobar);
    return () => {
      clearTimeout(reloj);
      document.removeEventListener("visibilitychange", comprobar);
    };
  }, [rescatado]);

  const variantes: Variants = {
    oculto: {},
    visible: {
      transition: {
        /* En pantalla grande el escalonado también se nota más: con
           80 ms entre tarjetas en un monitor ancho entran casi a la
           vez y el efecto se pierde. */
        staggerChildren: reducido ? 0 : ancha ? intervalo * 1.4 : intervalo,
        delayChildren: reducido ? 0 : retraso,
      },
    },
  };

  return (
    <Componente
      ref={ref as React.Ref<never>}
      className={className}
      variants={variantes}
      initial="oculto"
      animate={enVista || rescatado ? "visible" : "oculto"}
    >
      {children}
    </Componente>
  );
}

export function ItemStagger({
  children,
  className,
  direccion = "arriba",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direccion?: Direccion;
  as?: "div" | "li" | "article" | "span";
}) {
  const reducido = usarMovimientoReducido();
  const ancha = usarPantallaAncha();
  const d = desplazamiento(direccion, ancha);
  const Componente = motion[as];

  const variantes: Variants = {
    oculto: reducido ? { opacity: 0 } : { opacity: 0, ...d },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: reducido ? FUNDIDO_SIN_MOVIMIENTO : ancha ? 0.6 : 0.4, ease: SALIDA },
    },
  };

  return (
    <Componente className={className} variants={variantes}>
      {children}
    </Componente>
  );
}
