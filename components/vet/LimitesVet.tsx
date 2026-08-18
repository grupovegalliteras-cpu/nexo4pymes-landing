"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { limitesVet } from "@/content/vet";

/* ============================================================
   LOS LÍMITES
   FASE 2: las dos listas se apilaban en móvil (1.244 px) y para
   comparar "sí hace" con "no hace" había que recordar la primera
   mientras se leía la segunda — justo lo contrario de lo que hace
   un contraste.

   En móvil pasan a un conmutador: se ve una lista cada vez y el
   contraste lo hace el propio gesto de cambiar de pestaña. A partir
   de md vuelven las dos tarjetas en paralelo, que ahí sí funcionan.

   Accesibilidad: botones reales con aria-pressed y aria-controls. En
   md las dos listas están siempre visibles, así que el estado del
   conmutador deja de importar.
   ============================================================ */

type Lado = "si" | "no";

export function LimitesVet() {
  const [lado, setLado] = useState<Lado>("si");

  const boton = (valor: Lado, activo: string) =>
    `flex-1 rounded-full px-3 py-3 text-[13.5px] font-semibold transition-colors duration-200 ${
      lado === valor ? activo : "text-white/58"
    }`;

  return (
    <Seccion tono="oscuro" ancho="ancho">
      <div className="max-w-[56ch]">
        <Antetitulo tono="oscuro">{limitesVet.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{limitesVet.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/60 sm:text-[17px]">{limitesVet.subtitulo}</p>
        </Reveal>
      </div>

      {/* Conmutador: solo móvil y tablet pequeña. */}
      <div className="mt-8 flex gap-1 rounded-full border border-white/12 bg-white/[.04] p-1 md:hidden">
        <button
          type="button"
          onClick={() => setLado("si")}
          aria-pressed={lado === "si"}
          aria-controls="limites-si"
          className={boton("si", "border border-mint/34 bg-mint/16 text-[#8FEBD3]")}
        >
          {limitesVet.siHace.titulo}
        </button>
        <button
          type="button"
          onClick={() => setLado("no")}
          aria-pressed={lado === "no"}
          aria-controls="limites-no"
          className={boton("no", "border border-coral/34 bg-coral/14 text-aviso")}
        >
          {limitesVet.noHace.titulo}
        </button>
      </div>

      <div className="mt-4 grid gap-5 md:mt-12 md:grid-cols-2">
        <Reveal id="limites-si" className={lado === "si" ? "" : "hidden md:block"}>
          <TarjetaGlow color="76,224,179" className="h-full border-mint/22 bg-mint/[.04]">
            {/* El título ya lo dice el conmutador en móvil. */}
            <h3 className="hidden text-[22px] font-semibold text-[#F4F6FF] md:block">{limitesVet.siHace.titulo}</h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-mint/80 md:mt-1">
              {limitesVet.siHace.caption}
            </p>
            <ul className="mt-5 space-y-3.5">
              {limitesVet.siHace.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/72">
                  <Check size={16} strokeWidth={3} className="mt-1 shrink-0 text-mint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </TarjetaGlow>
        </Reveal>

        <Reveal id="limites-no" retraso={0.1} className={lado === "no" ? "" : "hidden md:block"}>
          <TarjetaGlow color="255,107,76" className="h-full border-coral/25 bg-coral/[.04]">
            <h3 className="hidden text-[22px] font-semibold text-[#F4F6FF] md:block">{limitesVet.noHace.titulo}</h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-aviso/80 md:mt-1">
              {limitesVet.noHace.caption}
            </p>
            <ul className="mt-5 space-y-3.5">
              {limitesVet.noHace.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/72">
                  <X size={16} strokeWidth={3} className="mt-1 shrink-0 text-aviso" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </TarjetaGlow>
        </Reveal>
      </div>
    </Seccion>
  );
}
