import Link from "next/link";
import { Boton } from "@/components/ui/Boton";
import { Reveal } from "@/components/motion/Reveal";
import { cierreInicio } from "@/content/inicio";
import { marca } from "@/content/marca";

/* Bloque de cierre de la home. Dos salidas: agendar (la principal) y
   escribir, para quien no quiere una videollamada todavía — que en
   B2B es bastante gente y antes no tenía dónde ir.

   id="cierre": CtaMovil lo usa para esconder la barra flotante en
   cuanto este bloque asoma y no repetir el mismo botón dos veces. */
export function CierreInicio() {
  return (
    <section id="cierre" className="relative overflow-hidden px-5 py-14 text-white sm:px-8 sm:py-28">
      <div className="malla malla-fade absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2
                   -translate-y-1/2 rounded-full bg-violeta/12 blur-[120px]"
      />

      <Reveal>
        <div
          className="relative mx-auto max-w-[820px] rounded-panel border border-white/9
                     bg-gradient-to-br from-white/[.06] to-white/[.015] p-8 text-center backdrop-blur-xl
                     shadow-[0_50px_130px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.1)] sm:p-14"
        >
          <h2 className="text-[clamp(1.9rem,5vw,2.8rem)] font-semibold tracking-[-0.03em] text-[#F4F6FF]">
            {cierreInicio.titular}
          </h2>

          <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-white/65">
            {cierreInicio.texto}
          </p>

          <div className="mt-9 flex justify-center">
            <Boton
              href={marca.calendly}
              externo
              tamano="lg"
              flecha
              magnetico
              variante="claro"
              className="w-full sm:w-auto"
            >
              {cierreInicio.cta}
            </Boton>
          </div>

          <p className="mt-4 font-mono text-[12px] text-white/45">{cierreInicio.finePrint}</p>

          <p className="mt-6 border-t border-white/8 pt-5 text-[14.5px] text-white/55">
            <Link
              href={cierreInicio.alternativa.href}
              className="inline-flex min-h-[44px] items-center text-azul underline-offset-4 hover:underline"
            >
              {cierreInicio.alternativa.texto} →
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
