import { Check, X } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { limitesVet } from "@/content/vet";

export function LimitesVet() {
  return (
    <Seccion tono="oscuro" ancho="ancho">
      <div className="max-w-[56ch]">
        <Antetitulo tono="oscuro">{limitesVet.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{limitesVet.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/60">{limitesVet.subtitulo}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <TarjetaGlow color="76,224,179" className="h-full border-mint/22 bg-mint/[.04]">
            <h3 className="text-[22px] font-semibold text-[#F4F6FF]">{limitesVet.siHace.titulo}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-mint/80">
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

        <Reveal retraso={0.1}>
          <TarjetaGlow color="255,107,76" className="h-full border-coral/25 bg-coral/[.04]">
            <h3 className="text-[22px] font-semibold text-[#F4F6FF]">{limitesVet.noHace.titulo}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-aviso/80">
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
