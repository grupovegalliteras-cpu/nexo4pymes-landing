import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { ItemStagger, Reveal, Stagger } from "@/components/motion/Reveal";
import { CajaIcono } from "@/components/ui/Icono";
import { TarjetaHover } from "@/components/ui/TarjetaHover";
import { queHacemos } from "@/content/home";

export function QueHacemos() {
  return (
    <Seccion id="que-hacemos" tono="claro">
      <div className="max-w-[62ch]">
        <Antetitulo>{queHacemos.categoria}</Antetitulo>
        <TituloSeccion>{queHacemos.titular}</TituloSeccion>

        <div className="mt-6 space-y-4">
          {queHacemos.parrafos.map((parrafo, i) => (
            <Reveal key={i} retraso={0.05 * i}>
              <p className="text-[16.5px] leading-relaxed text-suave">
                {i === 1 ? (
                  <>
                    <strong className="font-medium text-bottle">
                      Nuestro trabajo es que ocurran solas.
                    </strong>{" "}
                    {parrafo}
                  </>
                ) : (
                  parrafo
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bento: la primera tarjeta ocupa dos columnas en escritorio para
          romper la simetría y marcar jerarquía. */}
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" intervalo={0.1}>
        {queHacemos.tarjetas.map((tarjeta, i) => (
          <ItemStagger key={tarjeta.titulo} className={i === 0 ? "lg:col-span-1" : ""}>
            <TarjetaHover className="h-full">
              <CajaIcono nombre={tarjeta.icono} />
              <h3 className="mt-5 text-[19px] text-bottle">{tarjeta.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-suave">{tarjeta.texto}</p>
            </TarjetaHover>
          </ItemStagger>
        ))}
      </Stagger>
    </Seccion>
  );
}
