import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { servicios } from "@/content/servicios";

const GLOW: Record<string, string> = {
  azul: "76,125,255",
  violeta: "176,107,245",
  mint: "76,224,179",
};

export function ServiciosGrid() {
  return (
    <Seccion id="servicios" tono="oscuro" ancho="ancho">
      <div className="max-w-[60ch]">
        <Antetitulo tono="oscuro">{servicios.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{servicios.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/62">{servicios.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.tarjetas.map((tarjeta, i) => (
          <Reveal key={tarjeta.titulo} retraso={(i % 3) * 0.08}>
            <TarjetaGlow color={GLOW[tarjeta.tono]} className="h-full">
              <CajaIcono nombre={tarjeta.icono} tono={tarjeta.tono} />
              <h3 className="mt-5 text-[20px] font-semibold text-[#F4F6FF]">{tarjeta.titulo}</h3>

              {tarjeta.badge && (
                <span className="mt-2 inline-flex items-center rounded-full border border-mint/28 bg-mint/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mint">
                  {tarjeta.badge}
                </span>
              )}

              {tarjeta.texto && <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{tarjeta.texto}</p>}

              <ul className="mt-4 space-y-2.5">
                {tarjeta.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-white/62">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
