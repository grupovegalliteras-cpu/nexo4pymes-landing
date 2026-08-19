import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { pruebaVet } from "@/content/vet";
import { marca } from "@/content/marca";

/* ============================================================
   LA PRUEBA — fase 3.
   Se coloca entre la secuencia y el precio: es el punto en el que
   el visitante pasa de "esto funciona" a "¿y estos quiénes son?".

   El bloque del piloto (cifras + captura real) solo se pinta cuando
   `pruebaVet.piloto` deja de ser null. Hasta entonces la sección
   enseña únicamente lo que hoy es verdad: quién responde y qué se
   compromete a hacer si la cosa no sale.
   ============================================================ */

export function PruebaVet() {
  const { piloto, firma } = pruebaVet;

  return (
    <Seccion id="prueba" tono="oscuro-hondo" ancho="ancho">
      <div className="max-w-[46ch]">
        <Antetitulo tono="oscuro">{pruebaVet.categoria}</Antetitulo>
        <TituloSeccion className="text-[#F4F6FF]">{pruebaVet.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-4 text-[16px] leading-relaxed text-white/62 sm:mt-5 sm:text-[17px]">{pruebaVet.texto}</p>
        </Reveal>
      </div>

      {/* ---------- PILOTO (aparece solo cuando haya datos reales) ---------- */}
      {piloto && (
        <Reveal retraso={0.1}>
          <div className="mt-8 grid gap-5 rounded-tarjeta border border-mint/20 bg-mint/[.04] p-5 sm:mt-10 sm:p-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h3 className="text-[18px] font-semibold text-[#F4F6FF] sm:text-[21px]">{piloto.titulo}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {piloto.cifras.map((cifra) => (
                  <div
                    key={cifra.texto}
                    className="min-w-[132px] flex-1 rounded-tarjeta border border-white/10 bg-white/[.04] px-4 py-3.5"
                  >
                    <div className="font-titular text-[26px] font-extrabold leading-none tracking-[-0.03em] text-mint">
                      {cifra.valor}
                    </div>
                    <div className="mt-2 text-[12.5px] leading-[1.35] text-white/58">{cifra.texto}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-tarjeta border border-white/10">
              <Image
                src={piloto.captura}
                alt={piloto.capturaAlt}
                width={800}
                height={600}
                sizes="(max-width: 1023px) 92vw, 380px"
                className="w-full"
              />
            </div>
          </div>
        </Reveal>
      )}

      {/* ---------- COMPROMISOS ---------- */}
      <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
        {pruebaVet.compromisos.map((c, i) => (
          <Reveal key={c.titulo} retraso={i * 0.08}>
            <div className="flex h-full gap-3.5 rounded-tarjeta border border-white/9 bg-gradient-to-br from-white/[.06] to-white/[.015] p-4 sm:block sm:p-6">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-mint sm:mb-4" aria-hidden="true" />
              <div>
                <h3 className="text-[16px] font-semibold leading-snug text-[#F4F6FF] sm:text-[17px]">{c.titulo}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/62 sm:text-[14.5px]">{c.texto}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---------- FIRMA ----------
          Sin nombre configurado, se firma con la empresa y la localidad:
          las dos cosas son ciertas y no obligan a inventar una persona. */}
      <Reveal retraso={0.28}>
        <div className="mt-6 flex items-center gap-3.5 border-t border-white/9 pt-6">
          {firma.nombre && firma.foto ? (
            <Image
              src={firma.foto}
              alt=""
              width={96}
              height={96}
              sizes="44px"
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              /* Sin degradado: el logotipo ya trae su fondo de marca. */
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full"
            >
              <Image src="/assets/logo.png" alt="" width={512} height={512} sizes="44px" className="h-full w-full object-cover" />
            </span>
          )}
          <div>
            <div className="text-[14px] font-semibold leading-tight text-[#F4F6FF]">
              {firma.nombre || marca.nombre}
            </div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/48">
              {firma.rol || `${marca.localidad} · ${marca.region}`}
            </div>
          </div>
          <p className="ml-auto hidden max-w-[34ch] text-[13.5px] leading-relaxed text-white/55 sm:block">
            {pruebaVet.firmaTexto}
          </p>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-white/55 sm:hidden">{pruebaVet.firmaTexto}</p>
      </Reveal>
    </Seccion>
  );
}
