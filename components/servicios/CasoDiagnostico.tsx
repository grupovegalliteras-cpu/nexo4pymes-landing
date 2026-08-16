import { Reveal } from "@/components/motion/Reveal";
import { Seccion } from "@/components/ui/Seccion";
import { casoDiagnostico } from "@/content/servicios";

export function CasoDiagnostico() {
  return (
    <Seccion id="caso" tono="oscuro" ancho="ancho">
      <Reveal>
        <div className="relative overflow-hidden rounded-[34px] border border-white/9 bg-gradient-to-br from-white/[.06] to-white/[.015] p-8 shadow-[0_30px_80px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-azul/18 blur-[90px]"
          />
          <div className="relative max-w-[70ch]">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D3B0FF]">
              {casoDiagnostico.categoria}
            </span>
            <h2 className="mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold tracking-[-0.025em] text-[#F4F6FF]">
              {casoDiagnostico.titular}
            </h2>
            {casoDiagnostico.parrafos.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-relaxed text-white/65">
                {p}
              </p>
            ))}
            <p className="mt-7 border-l-2 border-violeta/50 pl-5 text-[18px] font-medium leading-snug text-[#F4F6FF]">
              {casoDiagnostico.cita}
            </p>
          </div>
        </div>
      </Reveal>
    </Seccion>
  );
}
