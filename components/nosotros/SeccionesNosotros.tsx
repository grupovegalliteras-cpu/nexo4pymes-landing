import Link from "next/link";
import { Boton } from "@/components/ui/Boton";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal, Stagger, ItemStagger } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { CajaIcono } from "@/components/ui/Icono";
import { IconoInstagram } from "@/components/ui/IconosRedes";
import { cierreNosotros, enfoquePyme, heroNosotros, historia, valores } from "@/content/nosotros";
import { marca } from "@/content/marca";

/* ============================================================
   SECCIONES DE /nosotros

   Van en un solo archivo a propósito: son cinco bloques cortos que
   solo usa esta página y que se leen mejor juntos que repartidos
   en cinco ficheros de treinta líneas. El criterio del proyecto es
   un archivo por componente cuando el componente se reutiliza; y
   estos no se reutilizan.
   ============================================================ */

/* ---------- HERO ---------- */
export function HeroNosotros() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
      <div className="relative mx-auto max-w-[820px] text-center">
        <Reveal>
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.04]
                       px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/75"
          >
            <span aria-hidden="true" className="anim-respirar h-1.5 w-1.5 rounded-full bg-mint" />
            {heroNosotros.categoria}
          </span>
        </Reveal>

        <Reveal retraso={0.06}>
          <h1 className="mt-5 text-[clamp(2.2rem,6.6vw,3.8rem)] text-white">
            {heroNosotros.titularA} <span className="texto-degradado">{heroNosotros.titularB}</span>
          </h1>
        </Reveal>

        <Reveal retraso={0.12}>
          <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-white/70 sm:text-[18px]">
            {heroNosotros.parrafo}
          </p>
        </Reveal>

        <Reveal retraso={0.18}>
          <div className="mt-8 flex justify-center">
            <Boton
              href={marca.calendly}
              externo
              tamano="lg"
              flecha
              magnetico
              className="w-full font-titular font-semibold sm:w-auto"
            >
              {heroNosotros.cta}
            </Boton>
          </div>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-white/45">
            {heroNosotros.micro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- HISTORIA ---------- */
export function Historia() {
  return (
    <Seccion id="historia" tono="oscuro" ancho="ancho">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <div>
          <Antetitulo tono="oscuro">{historia.categoria}</Antetitulo>
          <TituloSeccion className="text-[#F4F6FF]">{historia.titular}</TituloSeccion>

          <Reveal retraso={0.08}>
            <div className="mt-6 max-w-[62ch]">
              {historia.parrafos.map((p) => (
                <p key={p} className="mt-5 text-[16px] leading-relaxed text-white/65 first:mt-0">
                  {p}
                </p>
              ))}
            </div>

            {/* Solo Instagram. El icono de Facebook se retiró del sitio. */}
            <div className="mt-7 flex gap-3">
              <a
                href={marca.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram de Nexo4Pymes"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-azul/50 hover:text-azul"
              >
                <IconoInstagram size={17} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Hechos comprobables. No hay cifras de facturación ni número de
            clientes: hasta que sean públicas y ciertas, no se ponen. */}
        <Reveal direccion="derecha" retraso={0.1}>
          <dl className="flex flex-col gap-4">
            {historia.hechos.map((hecho) => (
              <div
                key={hecho.etiqueta}
                className="rounded-panel border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.015] px-5 py-5"
              >
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mint">
                  {hecho.etiqueta}
                </dt>
                <dd className="mt-2 font-titular text-[26px] font-bold leading-none text-white sm:text-[30px]">
                  {hecho.valor}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Seccion>
  );
}

/* ---------- VALORES ---------- */
export function Valores() {
  return (
    <Seccion id="valores" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[62ch]">
        <Antetitulo tono="oscuro">{valores.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{valores.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-white/65 sm:text-[17.5px]">{valores.intro}</p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
        {valores.lista.map((valor) => (
          <ItemStagger key={valor.titulo} as="article">
            <TarjetaGlow className="h-full">
              <CajaIcono nombre={valor.icono} tono="mint" />
              <h3 className="mt-4 text-[19px] text-white sm:text-[20px]">{valor.titulo}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/62">{valor.texto}</p>
            </TarjetaGlow>
          </ItemStagger>
        ))}
      </Stagger>
    </Seccion>
  );
}

/* ---------- ENFOQUE PYME ---------- */
export function EnfoquePyme() {
  return (
    <Seccion id="enfoque" tono="oscuro" ancho="ancho">
      <div className="max-w-[62ch]">
        <Antetitulo tono="oscuro">{enfoquePyme.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{enfoquePyme.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <div className="mt-6">
            {enfoquePyme.parrafos.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-relaxed text-white/65 first:mt-0 sm:text-[17px]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-2">
        {enfoquePyme.contraste.map((columna, i) => (
          <Reveal key={columna.etiqueta} direccion={i === 0 ? "izquierda" : "derecha"}>
            <div
              className={`h-full rounded-panel border p-6 sm:p-7 ${
                columna.bien
                  ? "border-mint/22 bg-gradient-to-b from-mint/[.07] to-transparent"
                  : "border-white/9 bg-white/[.02]"
              }`}
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] ${
                  columna.bien
                    ? "border-mint/30 bg-mint/10 text-mint"
                    : "border-white/12 bg-white/[.04] text-white/55"
                }`}
              >
                <span aria-hidden="true">{columna.bien ? "✓" : "✕"}</span>
                {columna.etiqueta}
              </span>

              <ul className="mt-5 space-y-3">
                {columna.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-1 w-1 shrink-0 rounded-full ${columna.bien ? "bg-mint" : "bg-white/35"}`}
                    />
                    <span
                      className={`text-[14.5px] leading-snug ${columna.bien ? "text-white/80" : "text-white/55"}`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}

/* ---------- CIERRE ---------- */
export function CierreNosotros() {
  return (
    <section id="cierre" className="relative overflow-hidden px-5 py-14 text-white sm:px-8 sm:py-28">
      <div className="malla malla-fade absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2
                   -translate-y-1/2 rounded-full bg-azul/12 blur-[120px]"
      />

      <Reveal>
        <div
          className="relative mx-auto max-w-[820px] rounded-panel border border-white/9
                     bg-gradient-to-br from-white/[.06] to-white/[.015] p-8 text-center backdrop-blur-xl
                     shadow-[0_50px_130px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.1)] sm:p-14"
        >
          <h2 className="text-[clamp(1.9rem,5vw,2.8rem)] font-semibold tracking-[-0.03em] text-[#F4F6FF]">
            {cierreNosotros.titular}
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-white/65">
            {cierreNosotros.texto}
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
              {cierreNosotros.cta}
            </Boton>
          </div>

          <p className="mt-4 font-mono text-[12px] text-white/45">{cierreNosotros.finePrint}</p>

          <p className="mt-6 border-t border-white/8 pt-5 text-[14.5px] text-white/55">
            <Link
              href={cierreNosotros.alternativa.href}
              className="inline-flex min-h-[44px] items-center text-azul underline-offset-4 hover:underline"
            >
              {cierreNosotros.alternativa.texto} →
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
