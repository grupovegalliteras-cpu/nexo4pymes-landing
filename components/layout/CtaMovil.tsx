"use client";

import { useEffect, useState } from "react";
import { usarMovimientoReducido } from "@/components/motion/usarMovimiento";
import { AnimatePresence, motion } from "framer-motion";

/* Barra de acción fija en móvil. Aparece cuando el hero ya ha salido
   de pantalla: antes de eso el CTA del hero está a la vista y esto
   solo taparía contenido.

   Se oculta al llegar al pie para no solapar el formulario/enlaces. */
export function CtaMovil({
  texto,
  href,
  externo = false,
  nota,
}: {
  texto: string;
  href: string;
  externo?: boolean;
  nota?: string;
}) {
  const [visible, setVisible] = useState(false);
  const reducido = usarMovimientoReducido();

  useEffect(() => {
    const alScroll = () => {
      const y = window.scrollY;
      const alturaTotal = document.body.scrollHeight - window.innerHeight;
      setVisible(y > window.innerHeight * 0.85 && y < alturaTotal - 320);
    };
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducido ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducido ? 0 : 24 }}
          transition={{ duration: reducido ? 0.001 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-bottle-900/92 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 backdrop-blur-lg sm:hidden"
        >
          <a
            href={href}
            target={externo ? "_blank" : undefined}
            rel={externo ? "noopener" : undefined}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(232,98,58,.9)]"
          >
            {texto} <span aria-hidden="true">→</span>
          </a>
          {nota && (
            <p className="mt-1.5 text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/45">
              {nota}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
