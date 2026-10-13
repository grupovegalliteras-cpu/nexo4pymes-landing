import { Reveal } from "@/components/motion/Reveal";
import { Seccion } from "@/components/ui/Seccion";
import { contenido } from "@/content/i18n";
import { idiomaServidor } from "@/lib/idioma-servidor";

export function CasoDiagnostico() {
  const lang = idiomaServidor();
  const { casoDiagnostico } = contenido(lang).servicios;
  return (
    <Seccion id="caso" tono="oscuro" ancho="ancho">
      <Reveal>
        <div className="relative overflow-hidden rounded-panel border border-line bg-surface p-8 shadow-e2 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-soft blur-[90px]"
          />
          <div className="relative max-w-[70ch]">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D3B0FF]">
              {casoDiagnostico.categoria}
            </span>
            <h2 className="mt-4 text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold tracking-[-0.025em] text-fg">
              {casoDiagnostico.titular}
            </h2>
            {casoDiagnostico.parrafos.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-relaxed text-fg-2">
                {p}
              </p>
            ))}
            <p className="mt-7 border-l-2 border-violeta/50 pl-5 text-[18px] font-medium leading-snug text-fg">
              {casoDiagnostico.cita}
            </p>
          </div>
        </div>
      </Reveal>
    </Seccion>
  );
}
