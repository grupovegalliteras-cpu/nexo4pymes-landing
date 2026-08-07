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
   CABECERA
   Arranca transparente sobre el hero oscuro y se vuelve sólida al
   bajar: el logo tiene que seguir legible cuando debajo hay fondo
   crema. El cambio se hace con opacidad de una capa de fondo, no
   montando y desmontando la barra.

   La misma cabecera sirve para las dos páginas; cambia la lista de
   enlaces y el CTA.
   ============================================================ */

export function Cabecera({
  enlaces,
  cta,
}: {
  enlaces: { href: string; texto: string }[];
  cta: { texto: string; href: string; externo?: boolean };
}) {
  const [bajado, setBajado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const reducido = usarMovimientoReducido();

  useEffect(() => {
    const alHacerScroll = () => setBajado(window.scrollY > 24);
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
                   focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-bottle"
      >
        Saltar al contenido
      </a>

      <header className="oscuro fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b border-white/8 bg-bottle-900/85 backdrop-blur-lg
                      transition-opacity duration-400 ${bajado ? "opacity-100" : "opacity-0"}`}
        />

        <div className="relative mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Nexo4Pymes, inicio"
            onClick={() => setMenuAbierto(false)}
          >
            <Image
              src="/assets/logo.png"
              alt=""
              width={164}
              height={160}
              priority
              className="h-9 w-auto"
            />
            <span className="font-titular text-[17px] font-semibold tracking-tight text-white">
              Nexo<span className="text-coral">4</span>Pymes
            </span>
          </Link>

          {/* whitespace-nowrap y gap corto: con los seis enlaces de la portada,
              a 1024 px la barra se partía en dos líneas. */}
          <nav aria-label="Navegación principal" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="group relative whitespace-nowrap text-[14px] text-white/75 transition-colors hover:text-white xl:text-[14.5px]"
              >
                {enlace.texto}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-mint
                             transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* El envoltorio es quien se oculta: si la clase `hidden` fuera al
                propio botón chocaría con el `inline-flex` de su clase base y
                ganaría el display equivocado. */}
            <span className="hidden sm:block">
              <Boton
                href={cta.href}
                externo={cta.externo}
                variante="principal"
                className="whitespace-nowrap px-5 py-2.5 text-[14px]"
              >
                {cta.texto}
              </Boton>
            </span>

            <button
              type="button"
              onClick={() => setMenuAbierto(true)}
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
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
            className="oscuro fixed inset-0 z-60 bg-bottle-900 lg:hidden"
            initial={reducido ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducido ? 0.001 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="malla absolute inset-0 opacity-60" aria-hidden="true" />

            <div className="relative flex items-center justify-between px-5 py-3.5">
              <span className="font-titular text-[17px] font-semibold text-white">
                Nexo<span className="text-coral">4</span>Pymes
              </span>
              <button
                type="button"
                onClick={() => setMenuAbierto(false)}
                aria-label="Cerrar menú"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              >
                <X size={19} />
              </button>
            </div>

            <nav className="relative mt-6 flex flex-col gap-1 px-5" aria-label="Navegación móvil">
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
                    className="block border-b border-white/8 py-4 font-titular text-[22px] text-white"
                  >
                    {enlace.texto}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-8">
                <Boton href={cta.href} externo={cta.externo} tamano="lg" flecha className="w-full">
                  {cta.texto}
                </Boton>
              </div>

              <a
                href={`mailto:${marca.email}`}
                className="mt-6 text-center text-[13px] text-white/50"
              >
                {marca.email}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
