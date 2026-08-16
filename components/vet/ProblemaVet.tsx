import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { problemaVet } from "@/content/vet";

const TONOS = ["azul", "violeta", "mint"] as const;
const GLOW = ["76,125,255", "176,107,245", "76,224,179"];

export function ProblemaVet() {
  return (
    <Seccion id="problema" tono="oscuro" ancho="ancho">
      <div className="max-w-[22ch]">
        <Antetitulo tono="oscuro">{problemaVet.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{problemaVet.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-white/60">
            {problemaVet.subtitulo}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-6">
        {problemaVet.tarjetas.map((tarjeta, i) => (
          <Reveal key={tarjeta.titulo} retraso={i * 0.08} className={i === 2 ? "sm:col-span-2" : "sm:col-span-3"}>
            <TarjetaGlow color={GLOW[i]} className="h-full">
              <CajaIcono nombre={tarjeta.icono} tono={TONOS[i]} />
              <h3 className="mt-5 text-[21px] text-[#F4F6FF]">{tarjeta.titulo}</h3>
              <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-white/60">{tarjeta.texto}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-coral/28 bg-coral/10 px-3.5 py-2 font-mono text-[11.5px] text-aviso">
                {tarjeta.coste}
              </div>
            </TarjetaGlow>
          </Reveal>
        ))}

        <Reveal retraso={0.32} className="sm:col-span-4">
          <TarjetaGlow
            color="255,255,255"
            className="flex h-full items-center border-azul/22 bg-gradient-to-br from-azul/16 via-violeta/10 to-white/2"
          >
            <p className="max-w-[26ch] font-titular text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-snug text-[#F4F6FF]">
              {problemaVet.destacado}
            </p>
          </TarjetaGlow>
        </Reveal>
      </div>
    </Seccion>
  );
}
