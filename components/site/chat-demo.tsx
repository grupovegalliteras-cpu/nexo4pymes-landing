"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Transition } from "motion/react";
import { quietoPorPreferencia } from "@/lib/movimiento";

/* ============================================================
   LA CONVERSACIÓN QUE SE ESCRIBE SOLA

   POR QUÉ EXISTE. Miré las webs de la competencia en Mallorca y en
   España: ninguna enseña el producto funcionando. Ni vídeo, ni
   demo, ni capturas. Todas ponen etiquetas estáticas tipo «Canal:
   WhatsApp · Conectado a: tu agenda» y piden una llamada.

   Enseñar la conversación escribiéndose sola es lo más parecido a
   un vídeo que podemos tener hoy, no hay que grabar nada, y es lo
   único que contesta de verdad a «¿esto qué es?» en tres segundos.

   SE RENDERIZA ENTERA Y DESPUÉS SE ANIMA. El servidor manda los
   seis mensajes y el cliente los esconde al montar para irlos
   sacando. Así, si el JavaScript no llega o falla, se ve la
   conversación completa en vez de un móvil vacío: justo al revés
   que si empezáramos en blanco y fuéramos añadiendo.

   CÓMO SE MUEVE (06/11/2026). Antes cada burbuja aparecía con un
   fundido y las de arriba subían de golpe. Ahora se mueve como en
   un móvil de verdad:
   - Cada burbuja sale de la esquina de su lado (la del cliente
     desde abajo a la izquierda, la de Nexo desde abajo a la
     derecha), que es de donde sale en WhatsApp.
   - Las de arriba suben deslizándose, no a saltos.
   - Los tres puntitos de «escribiendo» están en el mismo sitio en
     el que aparece después el mensaje, así que se ve que el
     mensaje sale de ahí.
   - Al terminar, la conversación entera se desvanece y vuelve a
     empezar, en vez de vaciarse de golpe.
   Los muelles van sin rebote: aquí nadie ha lanzado nada con el
   dedo, así que no tiene sentido que nada se pase de su sitio.

   SE MUEVE TAMBIÉN CON «MOVIMIENTO REDUCIDO» (10/11/2026). Antes
   no: bastaba con que el sistema pidiera menos movimiento para que
   esto se rindiera en la primera línea del efecto y dejara los seis
   mensajes puestos y quietos. En Windows eso ocurre casi siempre sin
   que nadie lo haya pedido, así que el hero —lo único de la web que
   enseña el producto funcionando, y la única razón por la que esto
   existe— era un pantallazo. El porqué de la decisión y cómo
   revertirla, en lib/movimiento.ts.
   ============================================================ */

export type Mensaje = { de: "cliente" | "nexo"; texto: string; hora: string };

/** Muelle sin rebote, rápido: lo de las burbujas que aparecen y se recolocan. */
const MUELLE: Transition = { type: "spring", bounce: 0, duration: 0.42 };

/** Lo que tarda en «escribirse» cada mensaje, según su largo. */
function pausa(m: Mensaje) {
  return m.de === "nexo" ? Math.min(2600, 900 + m.texto.length * 22) : 1100;
}

const BURBUJA = {
  cliente: "max-w-[82%] self-start rounded-2xl rounded-bl-md bg-surface-3 px-3.5 py-2.5",
  nexo: "max-w-[82%] self-end rounded-2xl rounded-br-md bg-carmesi/90 px-3.5 py-2.5 text-crema",
};

export function ChatDemo({ mensajes }: { mensajes: Mensaje[] }) {
  /* Arranca con todos visibles: es lo que ve quien no tiene JS y lo
     que se pinta en el primer fotograma. El efecto lo recorta. */
  const [visibles, setVisibles] = useState(mensajes.length);
  const [escribiendo, setEscribiendo] = useState(false);
  const [fundido, setFundido] = useState(false);
  const [animado, setAnimado] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const quieto = quietoPorPreferencia();

  useEffect(() => {
    if (quietoPorPreferencia()) return;

    let cancelado = false;
    setVisibles(0);
    setAnimado(true);

    const esperar = (ms: number, hacer: () => void) => {
      temporizador.current = setTimeout(() => {
        if (!cancelado) hacer();
      }, ms);
    };

    const siguiente = (i: number) => {
      if (i >= mensajes.length) {
        /* Al acabar, se queda un rato quieta, se desvanece entera y
           vuelve a empezar: quien llega a mitad también la ve entera. */
        esperar(5200, () => {
          setFundido(true);
          esperar(420, () => {
            setVisibles(0);
            setFundido(false);
            esperar(500, () => siguiente(0));
          });
        });
        return;
      }
      const m = mensajes[i];
      setEscribiendo(m.de === "nexo");
      esperar(pausa(m), () => {
        setEscribiendo(false);
        setVisibles(i + 1);
        esperar(420, () => siguiente(i + 1));
      });
    };

    esperar(700, () => siguiente(0));
    return () => {
      cancelado = true;
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, [mensajes]);

  return (
    <motion.ol
      className="flex min-h-[316px] flex-col justify-end gap-2 overflow-hidden px-3 py-4"
      aria-label="Ejemplo de conversación"
      animate={{ opacity: fundido ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Solo se pintan las que ya han salido. En el HTML del servidor
          salen todas (visibles empieza en el total) y sin animación de
          entrada (animado empieza en false), así que sin JS se ve
          la conversación entera y quieta. */}
      {mensajes.slice(0, visibles).map((m, i) => (
          <motion.li
            key={i}
            layout={quieto ? false : "position"}
            /* La burbuja crece desde la esquina de la que sale, como en
               WhatsApp: abajo a la izquierda o abajo a la derecha. */
            style={{ transformOrigin: m.de === "cliente" ? "0% 100%" : "100% 100%" }}
            initial={animado ? { opacity: 0, scale: 0.9, y: 6 } : false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={MUELLE}
            className={BURBUJA[m.de]}
          >
            <p className="text-[13.5px] leading-[1.45]">{m.texto}</p>
            <span
              className={
                m.de === "cliente"
                  ? "mt-1 block text-right text-[10.5px] text-fg-3 tabular-nums"
                  : "mt-1 block text-right text-[10.5px] text-crema/70 tabular-nums"
              }
            >
              {m.hora}
            </span>
          </motion.li>
      ))}

      {/* Los tres puntitos de «está escribiendo». Solo cuando toca a
          Nexo: que el cliente «escriba» no aporta nada. */}
      {escribiendo ? (
        <motion.li
          layout={quieto ? false : "position"}
          className="flex max-w-[82%] gap-1 self-end rounded-2xl rounded-br-md bg-carmesi/90 px-4 py-3.5"
          style={{ transformOrigin: "100% 100%" }}
          initial={{ opacity: 0, scale: 0.9, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={MUELLE}
          aria-hidden="true"
        >
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="size-1.5 animate-bounce rounded-full bg-crema/80"
              style={{ animationDelay: `${n * 0.16}s`, animationDuration: "1s" }}
            />
          ))}
        </motion.li>
      ) : null}
    </motion.ol>
  );
}
