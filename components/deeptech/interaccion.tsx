"use client";

import { useEffect, useRef, useState, type PointerEvent as PE, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Micro-interacciones de la portada. Todas se apagan solas en pantallas
   táctiles (no hay ratón que seguir) y con «reducir movimiento». */

const conRaton = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const sinMovimiento = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Cursor propio ----------------
   Un punto que va pegado al ratón y un aro que lo sigue con inercia. El aro
   cambia de forma según lo que tenga debajo:
     · enlaces y botones  → se hincha y se tiñe
     · [data-cursor="3d"] → retícula de cuatro esquinas, con su etiqueta
     · campos de texto    → desaparece y vuelve el cursor del sistema
     · [data-cursor="nativo"] (el panel incrustado) → igual que los campos */
export function Cursor() {
  const aro = useRef<HTMLDivElement>(null);
  const punto = useRef<HTMLDivElement>(null);
  const etiqueta = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!conRaton()) return;
    const html = document.documentElement;
    html.classList.add("dt-cursor-activo");
    const el = aro.current!;
    const pt = punto.current!;
    const lag = sinMovimiento() ? 1 : 0.2;
    let x = -100, y = -100, ax = -100, ay = -100;
    let raf = 0;
    let estado = "";

    const bucle = () => {
      ax += (x - ax) * lag;
      ay += (y - ay) * lag;
      el.style.transform = `translate3d(${ax}px, ${ay}px, 0)`;
      pt.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // se para solo cuando el aro ya ha alcanzado al ratón
      raf = Math.abs(x - ax) + Math.abs(y - ay) > 0.1 ? requestAnimationFrame(bucle) : 0;
    };
    const fijarEstado = (nuevo: string, texto = "") => {
      if (nuevo !== estado) {
        estado = nuevo;
        el.dataset.estado = pt.dataset.estado = nuevo;
      }
      if (etiqueta.current && etiqueta.current.textContent !== texto) etiqueta.current.textContent = texto;
    };
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      if (!t?.closest(".deeptech")) fijarEstado("oculto");
      else if (t.closest('input, textarea, select, [contenteditable="true"], [data-cursor="nativo"]')) fijarEstado("oculto");
      else {
        const zona = t.closest<HTMLElement>("[data-cursor]");
        if (zona?.dataset.cursor === "3d" && !t.closest("a, button, [role=button], label")) fijarEstado("3d", zona.dataset.cursorTexto ?? "");
        else if (t.closest("a, button, [role=button], label, summary")) fijarEstado("enlace");
        else fijarEstado("normal");
      }
      if (!raf) raf = requestAnimationFrame(bucle);
    };
    const bajar = () => el.classList.add("pulsado");
    const subir = () => el.classList.remove("pulsado");
    const fuera = () => fijarEstado("oculto");
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerdown", bajar);
    window.addEventListener("pointerup", subir);
    html.addEventListener("pointerleave", fuera);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("dt-cursor-activo");
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerdown", bajar);
      window.removeEventListener("pointerup", subir);
      html.removeEventListener("pointerleave", fuera);
    };
  }, []);
  return (
    <div aria-hidden="true" className="dt-cursor">
      <div ref={aro} className="dt-cursor-aro" data-estado="oculto">
        <i className="dt-esq" />
        <span ref={etiqueta} className="dt-cursor-etiqueta" />
      </div>
      <div ref={punto} className="dt-cursor-punto" data-estado="oculto" />
    </div>
  );
}

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
export function Contador({ valor, duracion = 1800, retraso = 0, locale = "es", className }: { valor: number; duracion?: number; retraso?: number; locale?: string; className?: string }) {
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

/* ---------------- Texto que se descifra ----------------
   Cada vez que cambia el texto, las letras pasan por glifos al azar antes
   de asentarse, de izquierda a derecha. */
const GLIFOS = "01<>/\\_-=+*#░▒▓";
export function Descifrar({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inicial] = useState(texto);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (sinMovimiento()) {
      el.textContent = texto;
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 650;
    const paso = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const fijas = Math.floor(texto.length * p);
      let s = texto.slice(0, fijas);
      for (let i = fijas; i < texto.length; i++) s += texto[i] === " " ? " " : GLIFOS[(Math.random() * GLIFOS.length) | 0];
      el.textContent = s;
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [texto]);
  return (
    <span ref={ref} className={className}>
      {inicial}
    </span>
  );
}
