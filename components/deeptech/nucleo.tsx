"use client";

import { useEffect, useRef, type RefObject } from "react";
import { quietoPorPreferencia } from "./decision-movimiento";
import type { ControlNucleo } from "./nucleo-escena";

/** Lienzo WebGL del hero. Three se descarga aparte, cuando el titular ya está
    pintado. Si el navegador no tiene WebGL, se queda el fondo de CSS (rejilla
    y luz) y la portada se ve igual de bien, solo que quieta.

    `ancla` marca dónde va el núcleo y cuánto mide; `seccion` es el hero.
    `control` recibe el mando para lanzar ondas desde fuera (el registro de
    eventos lo hace en cada aviso nuevo). */
export function Nucleo({
  ancla,
  seccion,
  control,
}: {
  ancla: RefObject<HTMLElement | null>;
  seccion: RefObject<HTMLElement | null>;
  control?: RefObject<ControlNucleo | null>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !ancla.current || !seccion.current) return;
    let mando: ControlNucleo | undefined;
    let cancelado = false;
    /* Decisión de producto: la portada se mueve siempre. El porqué,
       y cómo revertirlo, en ./decision-movimiento.ts */
    const reducirMovimiento = quietoPorPreferencia();
    import("./nucleo-escena")
      .then(({ montarNucleo }) => {
        if (cancelado || !ancla.current || !seccion.current) return;
        try {
          mando = montarNucleo(canvas, { ancla: ancla.current, seccion: seccion.current, reducirMovimiento });
          if (control) control.current = mando;
          canvas.dataset.listo = "1";
        } catch {
          // sin WebGL: el fondo de CSS hace de escena
        }
      })
      .catch(() => {});
    return () => {
      cancelado = true;
      if (control) control.current = null;
      mando?.desmontar();
    };
  }, [ancla, seccion, control]);
  return <canvas ref={ref} className="dt-lienzo" aria-hidden="true" />;
}
