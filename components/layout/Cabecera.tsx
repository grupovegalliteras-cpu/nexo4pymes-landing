"use client";

import { useEffect, useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Boton } from "@/components/ui/Boton";
import { marca } from "@/content/marca";

/* ============================================================
   CABECERA — REDISEÑO
   Fija y translúcida desde el principio (todo el sitio es oscuro
   ahora, no hace falta esperar al scroll para ser legible). Al bajar
   se vuelve algo más opaca y el borde inferior se marca más, para
   distinguirla del contenido que pasa por debajo.

   `enlacePill` es el enlace cruzado entre home y /servicios
   ("Servicios ↗" / "← Veterinarias"): va aparte de los enlaces
   normales, con su propio borde, para que se note que lleva a otra
   página.
   ============================================================ */

export function Cabecera({
  enlaces,
  cta,
  enlacePill,
}: {
  enlaces: { href: string; texto: string }[];
  cta: { texto: string; href: string; externo?: boolean };
  enlacePill?: { href: string; texto: string; textoMovil?: string };
}) {
  const [bajado, setBajado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const reducido = usarMovimientoReducido();

  useEffect(() => {
    const alHacerScroll = () => setBajado(window.scrollY > 20);
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  // Con el menú abierto el fondo no debe poder desplazarse.
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100
                   focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-bottle-900"
      >
        Saltar al contenido
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-400 ${
            bajado ? "border-white/10 bg-bottle/78" : "border-white/4 bg-bottle/45"
          }`}
        />

        <div className="relative mx-auto flex max-w-[1180px] items-center gap-3 px-5 py-3.5 sm:px-8">
          <Link
            href="/"
            className="mr-auto flex items-center gap-2.5"
            aria-label="Nexo4Pymes, inicio"
            onClick={() => setMenuAbierto(false)}
          >
            <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[11px] bg-gradient-to-br from-azul to-violeta shadow-[0_6px_22px_rgba(76,125,255,.4),inset_0_1px_0_rgba(255,255,255,.35)]">
              <Image src="/assets/logo.png" alt="" width={164} height={160} priority className="h-full w-full object-cover" />
            </span>
            <span className="font-titular text-[17px] font-bold tracking-tight text-white">
              Nexo<span className="texto-degradado">4</span>Pymes
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="rounded-full px-3.5 py-2 text-[14px] text-white/70 transition-colors duration-200 hover:bg-white/6 hover:text-white"
              >
                {enlace.texto}
              </Link>
            ))}
            {enlacePill && (
              <Link
                href={enlacePill.href}
                className="ml-2 rounded-full border border-white/14 bg-white/[.03] px-4 py-2 text-[14px] text-white/85 transition-colors duration-200 hover:border-azul/50 hover:bg-azul/12 hover:text-white"
              >
                {enlacePill.texto}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Boton
                href={cta.href}
                externo={cta.externo}
                variante="principal"
                magnetico
                className="whitespace-nowrap px-5 py-2.5 text-[13.5px] font-titular font-semibold"
              >
                {cta.texto}
              </Boton>
            </span>

            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/4 text-white lg:hidden"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- MENÚ MÓVIL ---------- */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className="fixed inset-0 z-60 flex flex-col bg-bottle/95 p-5 backdrop-blur-2xl lg:hidden"
            initial={reducido ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducido ? 0.001 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="malla absolute inset-0 opacity-60" aria-hidden="true" />

            <div className="relative mb-5 flex items-center justify-between">
              <span className="font-titular text-[18px] font-bold text-white">
                Nexo<span className="texto-degradado">4</span>Pymes
              </span>
              <button
                type="button"
                onClick={() => setMenuAbierto(false)}
                aria-label="Cerrar menú"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/4 text-white"
              >
                <X size={19} />
              </button>
            </div>

            <nav className="relative mt-2 flex flex-col gap-1" aria-label="Navegación móvil">
              {enlaces.map((enlace, i) => (
                <motion.div
                  key={enlace.href}
                  initial={reducido ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducido ? 0 : 0.06 + i * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                    className="block border-b border-white/8 py-4 font-titular text-[21px] font-semibold text-white"
                  >
                    {enlace.texto}
                  </Link>
                </motion.div>
              ))}

              {enlacePill && (
                <motion.div
                  initial={reducido ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reducido ? 0 : 0.06 + enlaces.length * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={enlacePill.href}
                    onClick={() => setMenuAbierto(false)}
                    className="block py-4 font-titular text-[21px] font-semibold text-azul"
                  >
                    {enlacePill.textoMovil ?? enlacePill.texto}
                  </Link>
                </motion.div>
              )}

              <div className="mt-6">
                <Boton href={cta.href} externo={cta.externo} tamano="lg" flecha className="w-full">
                  {cta.texto}
                </Boton>
              </div>

              <a href={`mailto:${marca.email}`} className="mt-6 text-center text-[13px] text-white/50">
                {marca.email}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
