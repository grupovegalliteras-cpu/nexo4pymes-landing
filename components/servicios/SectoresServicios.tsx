import Link from "next/link";
import { Antetitulo, Seccion, TituloSeccion } from "@/components/ui/Seccion";
import { Reveal } from "@/components/motion/Reveal";
import { sectoresDe } from "@/data/sectors-i18n";
import { idiomaServidor } from "@/lib/idioma-servidor";
import { tr } from "@/lib/i18n";

/* ============================================================
   LOS OCHO OFICIOS, ENLAZADOS DESDE /servicios

   POR QUÉ EXISTE ESTA SECCIÓN. Cuando el rediseño adelgazó
   /servicios, los sectores se fueron a la portada y aquí no quedó
   ninguno. El contenido estaba bien movido —esta página habla de
   servicio, no de oficios— pero se perdió algo que no era contenido:
   los enlaces.

   El resultado, medido el 9 de octubre de 2026 en el sitio en vivo:
   /servicios enlazaba a cero páginas de sector. Era un callejón sin
   salida. Las ocho páginas de oficio dependían de un solo enlace
   desde la portada, y cinco de ellas seguían sin indexar en Google
   con el estado "detectada: actualmente sin indexar", que es la
   forma educada de decir "la he visto y no me ha parecido
   importante". Un enlace más desde la página que Google considera
   comercial cambia esa cuenta.

   QUÉ NO ES. No es volver a meter los sectores en esta página. Es
   una fila de enlaces con el lema de cada oficio: lo justo para que
   alguien que viene de "software a medida Mallorca" vea que hay algo
   escrito específicamente para lo suyo, y para que el rastreador
   tenga por dónde seguir.

   El lema sale de data/sectors-i18n.ts, que es el mismo sitio del
   que salen las páginas de sector. Si cambia allí, cambia aquí.
   ============================================================ */

const TX = {
  es: {
    categoria: "Por oficio",
    titular: "Hay una página para lo vuestro",
    intro:
      "Un instalador de climatización y una empresa de plagas no tienen el mismo problema, aunque los dos manden técnicos a domicilio. Cada una de estas páginas cuenta cómo queda el sistema para ese oficio concreto: qué se mide, qué se firma y qué se factura.",
  },
  en: {
    categoria: "By trade",
    titular: "There's a page for your line of work",
    intro:
      "An air-conditioning installer and a pest-control company don't share the same problem, even though both send technicians to customers' premises. Each of these pages explains how the system ends up looking for that specific trade: what gets measured, what gets signed and what gets invoiced.",
  },
  de: {
    categoria: "Nach Branche",
    titular: "Für Ihr Gewerbe gibt es eine eigene Seite",
    intro:
      "Ein Klimatechnik-Betrieb und ein Schädlingsbekämpfer haben nicht dasselbe Problem, auch wenn beide Techniker zum Kunden schicken. Jede dieser Seiten zeigt, wie das System für genau dieses Gewerbe aussieht: was gemessen, was unterschrieben und was abgerechnet wird.",
  },
};

export function SectoresServicios() {
  const lang = idiomaServidor();
  const t = tr(lang, TX);
  const sectores = sectoresDe(lang);

  return (
    <Seccion id="sectores" tono="alt" ancho="ancho">
      <div className="max-w-[60ch]">
        <Antetitulo>{t.categoria}</Antetitulo>
        <TituloSeccion>{t.titular}</TituloSeccion>
        <Reveal retraso={0.06}>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/70">{t.intro}</p>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sectores.map((s, i) => (
          <Reveal key={s.id} as="li" retraso={Math.min(i, 4) * 0.05}>
            <Link
              href={`/sectores/${s.id}`}
              className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-4 transition-colors hover:border-teal/40 hover:bg-white"
            >
              <span className="text-[15.5px] font-semibold text-ink group-hover:text-teal">{s.nombre}</span>
              {/* El lema, no el nombre repetido: es la única línea que
                  distingue un enlace de otro para quien decide si
                  merece la pena entrar. */}
              <span className="mt-1 text-[14px] leading-snug text-ink/60">{s.lema}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Seccion>
  );
}
