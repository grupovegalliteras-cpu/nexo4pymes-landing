"use client";

import { Boton } from "@/components/ui/Boton";
import { Reveal } from "@/components/motion/Reveal";
import { PanelFlujo } from "@/components/inicio/PanelFlujo";
import { heroInicio } from "@/content/inicio";
import { marca } from "@/content/marca";

/* ============================================================
   HERO DE LA HOME GENERAL

   Sustituye a HeroVet, que hablaba de clínicas. Dos diferencias
   de fondo respecto a aquel:

   · El visual ya no es una foto. Las dos capturas que hay en
     public/assets son de un WhatsApp veterinario, así que en una
     home sectorial-agnóstica mentirían. En su lugar va un panel
     de flujo animado (PanelFlujo): sirve para cualquier sector,
     pesa unos pocos KB en vez de 200 y no arrastra el LCP.

   · Las métricas son del SERVICIO (precio de la llamada, días de
     diagnóstico, disponibilidad), no resultados de cliente. No
     tenemos casos publicables todavía y no se inventan.

   El id="top" lo lee CtaMovil para saber cuándo el hero ha salido
   de pantalla; si se renombra, hay que tocarlo también allí.
   ============================================================ */

export function HeroInicio() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        {/* ---------- COLUMNA DE TEXTO ---------- */}
        <div>
          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.04]
                         px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/75"
            >
              <span aria-hidden="true" className="anim-respirar h-1.5 w-1.5 rounded-full bg-mint" />
              {heroInicio.categoria}
            </span>
          </Reveal>

          <Reveal retraso={0.06}>
            <h1 className="mt-5 text-[clamp(2.3rem,7.4vw,4.15rem)] text-white">
              {heroInicio.titularA}{" "}
              <span className="texto-degradado">{heroInicio.titularB}</span>
            </h1>
          </Reveal>

          <Reveal retraso={0.12}>
            <p className="mt-5 max-w-[54ch] text-[16.5px] leading-relaxed text-white/70 sm:text-[18px]">
              {heroInicio.parrafo}
            </p>
          </Reveal>

          <Reveal retraso={0.18}>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Boton
                href={marca.calendly}
                externo
                tamano="lg"
                flecha
                magnetico
                className="w-full font-titular font-semibold sm:w-auto"
              >
                {heroInicio.ctaPrincipal}
              </Boton>
              <Boton
                href={heroInicio.ctaSecundario.href}
                variante="secundario"
                tamano="lg"
                className="w-full sm:w-auto"
              >
                {heroInicio.ctaSecundario.texto}
              </Boton>
            </div>
          </Reveal>

          <Reveal retraso={0.24}>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-white/45">
              {heroInicio.micro}
            </p>
          </Reveal>

          {/* Métricas del servicio. Tres columnas también en móvil: son
              cifras cortas y apiladas robarían una pantalla entera. */}
          <Reveal retraso={0.3}>
            <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-white/8 pt-6 sm:mt-10 sm:gap-5">
              {heroInicio.metricas.map((metrica) => (
                /* flex-col-reverse: en el marcado va primero el término
                   (la etiqueta) y después la definición (la cifra), que
                   es el orden que exige una <dl> y el que leen los
                   lectores de pantalla. Visualmente se invierte, porque
                   la cifra es lo que engancha la mirada.

                   Antes esto era un <dt class="sr-only"> con la etiqueta
                   repetida dentro del <dd>: se anunciaba dos veces. */
                <div key={metrica.etiqueta} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-[12px] leading-snug text-white/50 sm:text-[13px]">
                    {metrica.etiqueta}
                  </dt>
                  <dd className="font-titular text-[26px] font-bold leading-none text-white sm:text-[32px]">
                    {metrica.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ---------- VISUAL ---------- */}
        <Reveal direccion="escala" retraso={0.16}>
          <PanelFlujo />
        </Reveal>
      </div>
    </section>
  );
}
