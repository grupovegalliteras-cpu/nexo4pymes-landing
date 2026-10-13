import Link from "@/components/i18n/Enlace";
import { MessageCircle } from "lucide-react";
import { Caustics } from "@/components/site/caustics";
import { Boton } from "@/components/ui/Boton";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal, Stagger, ItemStagger } from "@/components/motion/Reveal";
import { TarjetaGlow } from "@/components/ui/TarjetaGlow";
import { CajaIcono } from "@/components/ui/Icono";
import { IconoInstagram } from "@/components/ui/IconosRedes";
import { marca } from "@/content/marca";
import { waLink } from "@/lib/whatsapp";
import { contenido } from "@/content/i18n";
import { idiomaServidor } from "@/lib/idioma-servidor";

/* ============================================================
   SECCIONES DE /nosotros

   Van en un solo archivo a propósito: son cinco bloques cortos que
   solo usa esta página y que se leen mejor juntos que repartidos
   en cinco ficheros de treinta líneas. El criterio del proyecto es
   un archivo por componente cuando el componente se reutiliza; y
   estos no se reutilizan.
   ============================================================ */

/* ---------- HERO ----------
   Mismo fondo que el hero de /servicios y que las páginas de sector:
   agua en movimiento sobre el azul profundo, con velo para que se
   lea. Es la franja que hace que la web se vea de una pieza. Aquí va
   centrada, porque /nosotros no vende nada: se presenta. */
export function HeroNosotros() {
  const lang = idiomaServidor();
  const { heroNosotros } = contenido(lang).nosotros;
  return (
    <section id="top" className="relative overflow-hidden bg-[#041820] text-white">
      <div className="absolute inset-0">
        <Caustics />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(4_24_32/0.6),rgb(4_24_32/0.93))]" />
      </div>
      <div aria-hidden="true" className="to-bg absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent" />

      <div className="relative mx-auto max-w-[820px] px-5 pt-28 pb-16 text-center sm:px-6 sm:pt-32 sm:pb-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-white/75 uppercase">
            <span aria-hidden="true" className="anim-respirar bg-sun h-1.5 w-1.5 rounded-full" />
            {heroNosotros.categoria}
          </span>
        </Reveal>

        <Reveal retraso={0.06}>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6.6vw,3.7rem)] leading-[1.07] font-semibold tracking-[-0.03em] text-balance">
            {heroNosotros.titularA} <span className="text-[#8fd9ea]">{heroNosotros.titularB}</span>
          </h1>
        </Reveal>

        <Reveal retraso={0.12}>
          <p className="mx-auto mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-white/75 sm:text-[18px]">
            {heroNosotros.parrafo}
          </p>
        </Reveal>

        <Reveal retraso={0.18}>
          <div className="mt-8 flex justify-center">
            <a
              href={waLink("GENERAL", undefined, lang)}
              target="_blank"
              rel="noopener"
              className="vibrar inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#1faa59] px-6 text-[16px] font-semibold text-white transition hover:brightness-110 sm:h-12 sm:w-auto sm:text-[15px]"
            >
              <MessageCircle className="size-5" />
              {heroNosotros.cta}
            </a>
          </div>
          <p className="mt-4 font-mono text-[12px] tracking-[0.1em] text-white/55 uppercase">
            {heroNosotros.micro}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- HISTORIA ---------- */
export function Historia() {
  const lang = idiomaServidor();
  const { historia } = contenido(lang).nosotros;
  return (
    <Seccion id="historia" tono="oscuro" ancho="ancho">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <div>
          <Antetitulo tono="oscuro">{historia.categoria}</Antetitulo>
          <TituloSeccion className="text-fg">{historia.titular}</TituloSeccion>

          <Reveal retraso={0.08}>
            <div className="mt-6 max-w-[62ch]">
              {historia.parrafos.map((p) => (
                <p key={p} className="mt-5 text-[16px] leading-relaxed text-fg-2 first:mt-0">
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
                aria-label="Instagram Nexo4Pymes"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-brand/40 hover:text-brand"
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
                className="rounded-panel border border-line bg-surface px-5 py-5"
              >
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-brand">
                  {hecho.etiqueta}
                </dt>
                <dd className="mt-2 font-display text-[26px] font-bold leading-none text-fg sm:text-[30px]">
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
  const lang = idiomaServidor();
  const { valores } = contenido(lang).nosotros;
  return (
    <Seccion id="valores" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[62ch]">
        <Antetitulo tono="oscuro">{valores.categoria}</Antetitulo>
        <TituloSeccion className="text-fg">{valores.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-2 sm:text-[17.5px]">{valores.intro}</p>
        </Reveal>
      </div>

      <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
        {valores.lista.map((valor) => (
          <ItemStagger key={valor.titulo} as="article">
            <TarjetaGlow className="h-full">
              <CajaIcono nombre={valor.icono} tono="mint" />
              <h3 className="mt-4 text-[19px] text-fg sm:text-[20px]">{valor.titulo}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-2">{valor.texto}</p>
            </TarjetaGlow>
          </ItemStagger>
        ))}
      </Stagger>
    </Seccion>
  );
}

/* ---------- ENFOQUE PYME ---------- */
export function EnfoquePyme() {
  const lang = idiomaServidor();
  const { enfoquePyme } = contenido(lang).nosotros;
  return (
    <Seccion id="enfoque" tono="oscuro" ancho="ancho">
      <div className="max-w-[62ch]">
        <Antetitulo tono="oscuro">{enfoquePyme.categoria}</Antetitulo>
        <TituloSeccion className="text-fg">{enfoquePyme.titular}</TituloSeccion>
        <Reveal retraso={0.08}>
          <div className="mt-6">
            {enfoquePyme.parrafos.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-relaxed text-fg-2 first:mt-0 sm:text-[17px]">
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
                  ? "border-brand/30 bg-gradient-to-b from-mint/[.07] to-transparent"
                  : "border-line bg-surface-2"
              }`}
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] ${
                  columna.bien
                    ? "border-brand/30 bg-brand/50 text-brand"
                    : "border-line bg-surface-2 text-fg-2"
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
                      className={`mt-2 h-1 w-1 shrink-0 rounded-full ${columna.bien ? "bg-brand" : "bg-surface-2"}`}
                    />
                    <span
                      className={`text-[14.5px] leading-snug ${columna.bien ? "text-fg" : "text-fg-2"}`}
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
  const lang = idiomaServidor();
  const { cierreNosotros } = contenido(lang).nosotros;
  return (
    <section id="cierre" className="relative overflow-hidden px-5 py-14 text-fg sm:px-8 sm:py-28">
      <div className=" absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2
                   -translate-y-1/2 rounded-full bg-brand-soft blur-[120px]"
      />

      <Reveal>
        <div
          className="relative mx-auto max-w-[820px] rounded-panel border border-line
                     bg-surface p-8 text-center
                     shadow-e2 sm:p-14"
        >
          <h2 className="text-[clamp(1.9rem,5vw,2.8rem)] font-semibold tracking-[-0.03em] text-fg">
            {cierreNosotros.titular}
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-fg-2">
            {cierreNosotros.texto}
          </p>

          <div className="mt-9 flex justify-center">
            <Boton
              href={waLink("GENERAL", undefined, lang)}
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

          <p className="mt-4 font-mono text-[12px] text-fg-3">{cierreNosotros.finePrint}</p>

          <p className="mt-6 border-t border-line pt-5 text-[14.5px] text-fg-2">
            <Link
              href={cierreNosotros.alternativa.href}
              className="inline-flex min-h-[44px] items-center text-brand underline-offset-4 hover:underline"
            >
              {cierreNosotros.alternativa.texto} →
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
