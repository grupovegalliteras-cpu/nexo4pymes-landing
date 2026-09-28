"use client";

import Link from "@/components/i18n/Enlace";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ModuleGroup } from "@/data/modules";
import { gruposDe, modulosDe } from "@/data/modules-i18n";
import type { SectorId } from "@/data/sectors";
import { sectorDe } from "@/data/sectors-i18n";
import { useUi } from "@/store/ui";
import { cn } from "@/lib/utils";
import { useIdioma } from "@/components/i18n/idioma";
import { Icon } from "@/components/icon";
import { ContactDock, SiteFooter, SiteNav } from "./chrome";

const TX = {
  es: { h1: "Todos los módulos", p: "Todo lo que podemos montar para tu empresa. Empiezas por un módulo y vas sumando. Cada uno se puede probar en la demo.", buscar: "Busca: fichaje, factura, WhatsApp…", aria: "Buscar módulo", disponible: "Disponible", aMedida: "A medida", pensado: "Pensado para", ver: "Verlo en la demo", nada: (q: string) => `No hay módulos que coincidan con «${q}».` },
  en: { h1: "All modules", p: "Everything we can build for your company. Start with one module and add more as you go. Each one can be tried in the demo.", buscar: "Search: time clock, invoice, WhatsApp…", aria: "Search modules", disponible: "Available", aMedida: "Custom", pensado: "Designed for", ver: "See it in the demo", nada: (q: string) => `No modules match "${q}".` },
  de: { h1: "Alle Module", p: "Alles, was wir für Ihre Firma aufbauen können. Sie beginnen mit einem Modul und ergänzen nach und nach. Jedes lässt sich in der Demo ausprobieren.", buscar: "Suche: Zeiterfassung, Rechnung, WhatsApp…", aria: "Module durchsuchen", disponible: "Verfügbar", aMedida: "Individuell", pensado: "Gedacht für", ver: "In der Demo ansehen", nada: (q: string) => `Keine Module passen zu „${q}“.` },
};

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function Servicios() {
  const lang = useIdioma();
  const tx = TX[lang];
  const grupos = gruposDe(lang);
  const modulos = modulosDe(lang);
  const [q, setQ] = useState("");
  const showEstado = useUi((s) => s.showEstado);
  const n = norm(q);
  const list = useMemo(() => modulos.filter((m) => !n || norm(`${m.nombre} ${m.descripcion}`).includes(n)), [n, modulos]);
  return (
    <div className="bg-bg text-fg">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <h1 className="font-display text-[36px] leading-tight font-semibold tracking-tight sm:text-[52px]">{tx.h1}</h1>
        <p className="mt-3 max-w-2xl text-[17px] text-fg-2">{tx.p}</p>
        <label className="relative mt-8 flex max-w-md items-center">
          <Search className="pointer-events-none absolute left-3.5 size-4 text-fg-3" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx.buscar} className="h-12 w-full rounded-xl border border-line bg-surface pr-3 pl-10 text-[16px] outline-none focus:border-brand" aria-label={tx.aria} />
        </label>
        <div className="mt-12 grid gap-14">
          {(Object.keys(grupos) as ModuleGroup[]).map((g) => {
            const mods = list.filter((m) => m.grupo === g);
            if (!mods.length) return null;
            return (
              <section key={g}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                  <h2 className="font-display text-[26px] font-semibold tracking-tight">{grupos[g].nombre}</h2>
                  <span className="text-[14px] text-fg-3">{grupos[g].lema}</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {mods.map((m, i) => (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.05 }}>
                      <Link href={`/panel/${m.id}`} className={cn("group flex h-full flex-col rounded-2xl border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-e2", m.destacado ? "border-brand/30" : "border-line")}>
                        <div className="flex items-center justify-between">
                          <span className={cn("grid size-10 place-items-center rounded-xl", m.id === "central-avisos" ? "bg-sun text-[#1d1300]" : "bg-brand-soft text-brand")}>
                            <Icon name={m.icono} className="size-5" />
                          </span>
                          {showEstado && <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-medium", m.estado === "disponible" ? "bg-ok-soft text-ok" : "bg-ai-soft text-ai")}>{m.estado === "disponible" ? tx.disponible : tx.aMedida}</span>}
                        </div>
                        <div className="mt-4 text-[16px] font-semibold">{m.nombre}</div>
                        <p className="mt-1 flex-1 text-[14px] leading-relaxed text-fg-2">{m.descripcion}</p>
                        {m.sectores !== "todos" && (
                          <div className="mt-3 text-[12px] text-fg-3">
                            {tx.pensado}: {(m.sectores as SectorId[]).map((s) => sectorDe(lang, s)?.nombre.toLowerCase()).join(", ")}
                          </div>
                        )}
                        <div className="mt-4 text-[13px] font-medium text-brand">{tx.ver}</div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
          {!list.length && <div className="py-16 text-center text-fg-3">{tx.nada(q)}</div>}
        </div>
      </main>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}
