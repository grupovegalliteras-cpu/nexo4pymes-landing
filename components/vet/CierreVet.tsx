import { Boton } from "@/components/ui/Boton";
import { Reveal } from "@/components/motion/Reveal";
import { cierreVet } from "@/content/vet";
import { marca } from "@/content/marca";

export function CierreVet() {
  return (
    <section className="oscuro relative overflow-hidden bg-bottle px-5 py-20 text-white sm:px-8 sm:py-28">
      <div className="malla malla-fade absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[760px] text-center">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,5.4vw,3rem)]">{cierreVet.titular}</h2>
        </Reveal>
        <Reveal retraso={0.06}>
          <p className="mx-auto mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-white/65">
            {cierreVet.texto}
          </p>
        </Reveal>
        <Reveal retraso={0.1}>
          <div className="mt-9 flex justify-center">
            <Boton href={marca.calendly} externo tamano="lg" flecha>
              {cierreVet.cta}
            </Boton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
