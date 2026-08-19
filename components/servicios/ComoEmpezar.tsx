import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { comoEmpezar } from "@/content/servicios";

/* Antes era PreciosServicios y enseñaba las cifras. Los importes se
   retiraron; el modelo de tres pasos se conserva porque es el que
   explica por qué el diagnóstico se cobra. Ver el comentario largo
   en content/servicios.ts.

   Las tres tarjetas ya no muestran un número sino una palabra
   ("Gratis", "Se paga", "Fase a fase"), así que el tamaño de letra
   baja de 38-42 px a 26: un texto corto en el cuerpo de un número
   quedaba desproporcionado y parecía un precio tachado. */

const pasos = [comoEmpezar.paso1, comoEmpezar.paso2, comoEmpezar.paso3] as const;

export function ComoEmpezar() {
  return (
    <Seccion id="como-empezar" tono="oscuro" ancho="ancho">
      <div className="max-w-[60ch]">
        <Antetitulo tono="oscuro">{comoEmpezar.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{comoEmpezar.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-white/62">{comoEmpezar.intro}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {pasos.map((paso, i) => {
          /* El paso 2 sigue destacado: es la decisión de compra real
             de la página, aunque ya no lleve importe. */
          const destacado = i === 1;

          return (
            <Reveal key={paso.meta} retraso={i * 0.08}>
              <TarjetaGlow
                color={destacado ? "76,125,255" : undefined}
                className={
                  destacado
                    ? "h-full border-azul/35 bg-gradient-to-br from-azul/[.1] to-violeta/[.05] shadow-[0_30px_80px_-16px_rgba(76,125,255,.35)]"
                    : "h-full"
                }
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                    destacado ? "text-[#9FB6FF]" : "text-white/50"
                  }`}
                >
                  {paso.meta}
                </span>

                <div
                  className={
                    destacado
                      ? "mt-4 bg-gradient-to-r from-white via-[#9FB6FF] to-[#D3B0FF] bg-clip-text font-titular text-[26px] font-bold text-transparent"
                      : "mt-4 font-titular text-[26px] font-bold text-[#F4F6FF]"
                  }
                >
                  {paso.destacado}
                </div>

                <p
                  className={`mt-4 text-[14.5px] leading-relaxed ${
                    destacado ? "text-white/68" : "text-white/62"
                  }`}
                >
                  {paso.texto}
                </p>
              </TarjetaGlow>
            </Reveal>
          );
        })}
      </div>

      <Reveal retraso={0.2}>
        <div className="mt-6 rounded-2xl border-l-2 border-mint/50 bg-mint/[.05] py-5 pl-6 pr-5">
          <p className="text-[15.5px] leading-relaxed text-white/72">
            <span aria-hidden="true" className="mr-2 text-mint">
              ◆
            </span>
            <strong className="font-semibold text-[#F4F6FF]">{comoEmpezar.callout.fuerte}</strong>{" "}
            {comoEmpezar.callout.texto}
          </p>
        </div>
      </Reveal>
    </Seccion>
  );
}
