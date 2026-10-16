"use client";

import { useEffect, useRef, type PointerEvent as PE, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { quietoPorPreferencia } from "./decision-movimiento";

/* Micro-interacciones de la portada. Se apagan solas en pantallas
   táctiles (no hay ratón que seguir). Lo de «reducir movimiento» ya no
   las apaga: ver ./decision-movimiento.ts.
   Hubo un cursor propio y se quitó: el del sistema se entiende mejor. */

const conRaton = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
/* La portada se mueve siempre: ver ./decision-movimiento.ts, que es
   donde está el porqué y el interruptor para volver atrás. */
const sinMovimiento = () => quietoPorPreferencia();

/* ---------------- Botón magnético ----------------
   Envuelve un botón: el envoltorio se desplaza hacia el ratón y el
   contenido un poco más, como si tuviera dos capas. Al salir vuelve con un
   pequeño rebote (la transición está en CSS: .dt-magnetico). */
export function Magnetico({ children, className, fuerza = 0.32 }: { children: ReactNode; className?: string; fuerza?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const activo = useRef(false);
  useEffect(() => {
    activo.current = conRaton() && !sinMovimiento();
  }, []);
  const mover = (e: PE<HTMLSpanElement>) => {
    if (!activo.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    ref.current.style.setProperty("--mx", `${dx * fuerza}px`);
    ref.current.style.setProperty("--my", `${dy * fuerza}px`);
    ref.current.dataset.encima = "1";
  };
  const salir = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", "0px");
    ref.current.style.setProperty("--my", "0px");
    delete ref.current.dataset.encima;
  };
  return (
    <span ref={ref} onPointerMove={mover} onPointerLeave={salir} className={cn("dt-magnetico", className)}>
      {children}
    </span>
  );
}

/* ---------------- Linterna ----------------
   Se pone en el contenedor de un grupo de tarjetas .dt-foco: cada tarjeta
   recibe la posición del ratón en --x/--y y su borde se ilumina alrededor.
   Las vecinas también se iluminan un poco, que es lo que da el efecto. */
export function moverFoco(e: PE<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const tarjetas = e.currentTarget.classList.contains("dt-foco") ? [e.currentTarget] : e.currentTarget.querySelectorAll<HTMLElement>(".dt-foco");
  tarjetas.forEach((t) => {
    const r = t.getBoundingClientRect();
    t.style.setProperty("--x", `${e.clientX - r.left}px`);
    t.style.setProperty("--y", `${e.clientY - r.top}px`);
  });
}

/* ---------------- Contador ----------------
   El servidor pinta la cifra final (la ven los buscadores y quien no tenga
   JavaScript). En el navegador, si aún no está a la vista, baja a cero y
   sube con aceleración decreciente cuando aparece. */
export function Contador({ valor, duracion = 1000, retraso = 0, locale = "es", className }: { valor: number; duracion?: number; retraso?: number; locale?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || sinMovimiento()) return;
    const fmt = new Intl.NumberFormat(locale);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // ya a la vista: se queda como está
    el.textContent = fmt.format(0);
    let raf = 0;
    let t0 = 0;
    const paso = (t: number) => {
      if (!t0) t0 = t + retraso;
      const p = Math.min(1, Math.max(0, (t - t0) / duracion));
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = fmt.format(Math.round(valor * e));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor, duracion, retraso, locale]);
  return (
    <span ref={ref} className={cn("tabular", className)}>
      {new Intl.NumberFormat(locale).format(valor)}
    </span>
  );
}
