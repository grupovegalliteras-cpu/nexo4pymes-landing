import { Reveal } from "@/components/motion/Reveal";
import { Seccion } from "@/components/ui/Seccion";
import { Boton } from "@/components/ui/Boton";
import { gateServicios } from "@/content/vet";

export function GateServicios() {
  return (
    <Seccion tono="oscuro" ancho="ancho">
      <Reveal>
        <div className="flex flex-col gap-8 rounded-panel border border-white/9 bg-gradient-to-br from-white/[.055] to-white/[.012] p-8 shadow-[0_28px_70px_rgba(0,0,0,.42)] backdrop-blur-xl sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[54ch]">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9FB6FF]">
              {gateServicios.categoria}
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-0.02em] text-[#F4F6FF]">
              {gateServicios.titular}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-white/62">{gateServicios.texto}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {gateServicios.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/[.03] px-3.5 py-1.5 font-mono text-[11px] text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Boton href="/servicios" tamano="lg" flecha magnetico className="shrink-0">
            {gateServicios.cta}
          </Boton>
        </div>
      </Reveal>
    </Seccion>
  );
}
