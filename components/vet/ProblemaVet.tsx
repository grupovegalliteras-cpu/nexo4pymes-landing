import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaHover } from "@/components/ui/TarjetaHover";
import { problemaVet } from "@/content/vet";

/* Los tres dolores. Icono en coral y no en teal: aquí se habla de lo
   que duele, no de lo que se ofrece. */

export function ProblemaVet() {
  return (
    <Seccion tono="claro">
      <div className="max-w-[24ch]">
        <Antetitulo>{problemaVet.categoria}</Antetitulo>
        <TituloSeccion>{problemaVet.titular}</TituloSeccion>
      </div>

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-3" intervalo={0.1}>
        {problemaVet.puntos.map((punto) => (
          <ItemStagger key={punto.titulo}>
            <TarjetaHover className="h-full">
              <CajaIcono nombre={punto.icono} tono="coral" />
              <h3 className="mt-5 text-[19px] text-bottle">{punto.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-suave">{punto.texto}</p>
            </TarjetaHover>
          </ItemStagger>
        ))}
      </Stagger>

      <Reveal retraso={0.08}>
        <p className="mx-auto mt-12 max-w-[46ch] text-center font-titular text-[20px] leading-snug text-bottle sm:text-[24px]">
          {problemaVet.cierre}
        </p>
      </Reveal>
    </Seccion>
  );
}
