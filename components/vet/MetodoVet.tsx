import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { metodoVet } from "@/content/vet";

export function MetodoVet() {
  return (
    <Seccion tono="oscuro" ancho="ancho">
      <Antetitulo tono="oscuro">{metodoVet.categoria}</Antetitulo>
      <TituloSeccion className="max-w-[24ch] text-[#F4F6FF]">{metodoVet.titular}</TituloSeccion>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {metodoVet.pasos.map((paso, i) => (
          <Reveal key={paso.num} retraso={i * 0.1}>
            <TarjetaGlow className="h-full">
              <span className="texto-degradado font-titular text-[15px] font-bold tracking-[0.04em]">
                {paso.num}
              </span>
              <h3 className="mt-4 text-[21px] font-semibold text-[#F4F6FF]">{paso.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/62">{paso.texto}</p>
            </TarjetaGlow>
          </Reveal>
        ))}
      </div>

      <Reveal retraso={0.3}>
        <div className="mt-6 rounded-2xl border-l-2 border-mint/50 bg-mint/[.05] py-5 pl-6 pr-5">
          <p className="text-[15.5px] leading-relaxed text-white/72">
            <span aria-hidden="true" className="mr-2 text-mint">
              ◆
            </span>
            <strong className="font-semibold text-[#F4F6FF]">{metodoVet.callout.fuerte}</strong>{" "}
            {metodoVet.callout.texto}
          </p>
        </div>
      </Reveal>
    </Seccion>
  );
}
