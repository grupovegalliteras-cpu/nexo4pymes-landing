"use client";

import { useEffect, useRef, useState } from "react";

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

   CON prefers-reduced-motion NO SE ANIMA NADA. Se queda la
   conversación entera, que es el estado final de todas formas.
   ============================================================ */

export type Mensaje = { de: "cliente" | "nexo"; texto: string; hora: string };

/** Lo que tarda en «escribirse» cada mensaje, según su largo. */
function pausa(m: Mensaje) {
  return m.de === "nexo" ? Math.min(2600, 900 + m.texto.length * 22) : 1100;
}

export function ChatDemo({ mensajes }: { mensajes: Mensaje[] }) {
  /* Arranca con todos visibles: es lo que ve quien no tiene JS y lo
     que se pinta en el primer fotograma. El efecto lo recorta. */
  const [visibles, setVisibles] = useState(mensajes.length);
  const [escribiendo, setEscribiendo] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelado = false;
    setVisibles(0);

    const siguiente = (i: number) => {
      if (cancelado) return;
      if (i >= mensajes.length) {
        /* Al acabar, se queda un rato quieta y vuelve a empezar: quien
           llega a mitad de la conversación también la ve entera. */
        temporizador.current = setTimeout(() => siguiente(-1), 5200);
        return;
      }
      if (i < 0) {
        setVisibles(0);
        temporizador.current = setTimeout(() => siguiente(0), 500);
        return;
      }
      const m = mensajes[i];
      setEscribiendo(m.de === "nexo");
      temporizador.current = setTimeout(() => {
        if (cancelado) return;
        setEscribiendo(false);
        setVisibles(i + 1);
        temporizador.current = setTimeout(() => siguiente(i + 1), 420);
      }, pausa(m));
    };

    temporizador.current = setTimeout(() => siguiente(0), 700);
    return () => {
      cancelado = true;
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, [mensajes]);

  return (
    <ol
      className="flex min-h-[316px] flex-col justify-end gap-2 px-3 py-4"
      aria-label="Ejemplo de conversación"
    >
      {mensajes.map((m, i) => (
        <li
          key={i}
          aria-hidden={i >= visibles ? "true" : undefined}
          className={[
            i >= visibles ? "pointer-events-none h-0 overflow-hidden opacity-0" : "opacity-100",
            "transition-opacity duration-300 motion-reduce:transition-none",
            m.de === "cliente"
              ? "max-w-[82%] self-start rounded-2xl rounded-bl-md bg-surface-3 px-3.5 py-2.5"
              : "max-w-[82%] self-end rounded-2xl rounded-br-md bg-carmesi/90 px-3.5 py-2.5 text-crema",
          ].join(" ")}
        >
          <p className="text-[13.5px] leading-[1.45]">{m.texto}</p>
          <span
            className={
              m.de === "cliente"
                ? "mt-1 block text-right text-[10.5px] text-fg-3"
                : "mt-1 block text-right text-[10.5px] text-crema/70"
            }
          >
            {m.hora}
          </span>
        </li>
      ))}

      {/* Los tres puntitos de «está escribiendo». Solo cuando toca a
          Nexo: que el cliente «escriba» no aporta nada. */}
      {escribiendo ? (
        <li className="flex max-w-[82%] gap-1 self-end rounded-2xl rounded-br-md bg-carmesi/90 px-4 py-3.5" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="size-1.5 animate-bounce rounded-full bg-crema/80"
              style={{ animationDelay: `${n * 0.16}s`, animationDuration: "1s" }}
            />
          ))}
        </li>
      ) : null}
    </ol>
  );
}
