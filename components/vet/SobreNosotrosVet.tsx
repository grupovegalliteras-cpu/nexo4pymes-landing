import { IconoFacebook, IconoInstagram } from "@/components/ui/IconosRedes";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { sobreNosotrosVet } from "@/content/vet";
import { marca } from "@/content/marca";

export function SobreNosotrosVet() {
  return (
    <Seccion id="sobre-nosotros" tono="claro" ancho="medido">
      <Antetitulo>{sobreNosotrosVet.categoria}</Antetitulo>
      <TituloSeccion>{sobreNosotrosVet.titular}</TituloSeccion>

      <Reveal retraso={0.06}>
        <p className="mt-6 text-[16.5px] leading-relaxed text-suave">{sobreNosotrosVet.texto}</p>
      </Reveal>

      {/* [FOTO PENDIENTE: foto real del equipo o de la clínica, horizontal.
          Hasta tenerla no se pone ninguna imagen: una de stock aquí sería
          exactamente lo contrario de "equipo pequeño, de Mallorca". */}

      <Reveal retraso={0.1}>
        <div className="mt-8 flex gap-3">
          <a
            href={marca.instagram}
            target="_blank"
            rel="noopener"
            aria-label="Instagram de Nexo4Pymes"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-linea text-suave transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal"
          >
            <IconoInstagram size={18} />
          </a>
          <a
            href={marca.facebook}
            target="_blank"
            rel="noopener"
            aria-label="Facebook de Nexo4Pymes"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-linea text-suave transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:text-teal"
          >
            <IconoFacebook size={18} />
          </a>
        </div>
      </Reveal>
    </Seccion>
  );
}
