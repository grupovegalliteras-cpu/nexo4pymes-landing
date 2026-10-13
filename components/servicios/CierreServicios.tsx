import { Boton } from "@/components/ui/Boton";
import { Reveal } from "@/components/motion/Reveal";
import { marca } from "@/content/marca";
import { waLink } from "@/lib/whatsapp";
import { contenido } from "@/content/i18n";
import { idiomaServidor } from "@/lib/idioma-servidor";
import { tr } from "@/lib/i18n";

export function CierreServicios() {
  const lang = idiomaServidor();
  const { cierreServicios } = contenido(lang).servicios;
  return (
    <section className="relative overflow-hidden px-5 py-20 text-fg sm:px-8 sm:py-28">
      <div className=" absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violeta/12 blur-[120px]"
      />

      <Reveal>
        <div className="relative mx-auto max-w-[820px] rounded-panel border border-line bg-surface p-10 text-center shadow-e2 sm:p-14">
          <h2 className="text-[clamp(1.9rem,5vw,2.8rem)] font-semibold tracking-[-0.03em] text-fg">
            {cierreServicios.titular}
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-fg-2">
            {cierreServicios.texto}
          </p>
          <div className="mt-9 flex justify-center">
            <Boton href={waLink("GENERAL", undefined, lang)} externo tamano="lg" flecha magnetico variante="claro">
              {cierreServicios.cta}
            </Boton>
          </div>
          <p className="mt-4 font-mono text-[12px] text-fg-3">
            {tr(lang, { es: "Sin compromiso y sin presentación comercial · 15 minutos por videollamada", en: "No commitment and no sales pitch · 15-minute video call", de: "Unverbindlich und ohne Verkaufspräsentation · 15 Minuten per Videocall" })}
          </p>
          <p className="mt-3 text-[14px] text-fg-2">
            {cierreServicios.escribir}
            <a href={`mailto:${marca.email}`} className="text-brand underline underline-offset-4 hover:text-fg">
              {marca.email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
