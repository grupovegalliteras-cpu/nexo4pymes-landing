import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { IconoFacebook, IconoInstagram } from "@/components/ui/IconosRedes";
import { quienesSomos } from "@/content/servicios";
import { marca } from "@/content/marca";

export function QuienesSomos() {
  return (
    <Seccion id="nosotros" tono="oscuro-hondo" ancho="ancho">
      <Antetitulo tono="oscuro">{quienesSomos.categoria}</Antetitulo>
      <TituloSeccion className="text-[#F4F6FF]">{quienesSomos.titular}</TituloSeccion>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <Reveal>
          <div className="max-w-[62ch]">
            {quienesSomos.parrafos.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-relaxed text-white/65 first:mt-0">
                {p}
              </p>
            ))}

            <div className="mt-7 flex gap-3">
              <a
                href={marca.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram de Nexo4Pymes"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
              >
                <IconoInstagram size={17} />
              </a>
              <a
                href={marca.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook de Nexo4Pymes"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
              >
                <IconoFacebook size={17} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {quienesSomos.valores.map((valor, i) => (
            <Reveal key={valor.titulo} retraso={i * 0.07} direccion="derecha">
              <TarjetaGlow className="h-full">
                <h3 className="text-[17px] font-semibold text-[#F4F6FF]">{valor.titulo}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/62">{valor.texto}</p>
              </TarjetaGlow>
            </Reveal>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
