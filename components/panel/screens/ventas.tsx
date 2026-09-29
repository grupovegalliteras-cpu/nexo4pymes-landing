"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Eye, FileSignature, Mail, MessageCircle, PenLine, Plus, Send, Wrench } from "lucide-react";
import { useState } from "react";
import { useDemo, useSector } from "@/store/demo";
import { useMaps } from "@/lib/hooks";
import { cn, fmt, isoDay } from "@/lib/utils";
import { Badge, Button, Card, DataTable, Drawer, type Tone } from "@/components/ui";
import { Signature } from "@/components/photo";
import type { Opportunity, Quote } from "@/data/types";
import { PageHeader } from "../shell";
import { usePanelNav } from "../nav";
import { trad, tradf } from "@/lib/t";

/* ---------------- Embudo ---------------- */
const ETAPAS: { id: Opportunity["etapa"]; label: string; tone: Tone }[] = [
  { id: "nuevo", label: trad("Nuevo contacto"), tone: "neutral" },
  { id: "contactado", label: trad("Contactado"), tone: "info" },
  { id: "presupuesto", label: trad("Presupuesto enviado"), tone: "brand" },
  { id: "negociacion", label: trad("Negociación"), tone: "sun" },
  { id: "ganado", label: trad("Ganado"), tone: "ok" },
  { id: "perdido", label: trad("Perdido"), tone: "bad" },
];

export function Embudo() {
  const opps = useDemo((s) => s.opportunities);
  const move = useDemo((s) => s.moveOpportunity);
  const [over, setOver] = useState<string | null>(null);
  const abiertas = opps.filter((o) => o.etapa !== "ganado" && o.etapa !== "perdido");
  return (
    <div className="pb-8">
      <PageHeader id="embudo" />
      <div className="mb-4 flex flex-wrap gap-6 px-4 text-[13px] sm:px-6">
        <div>
          <span className="text-fg-3">{trad("En juego")}{" "}</span>
          <span className="font-display text-lg font-semibold tabular">{fmt.eur0(abiertas.reduce((s, o) => s + o.importe, 0))}</span>
        </div>
        <div>
          <span className="text-fg-3">{trad("Ganado este trimestre")}{" "}</span>
          <span className="font-display text-lg font-semibold tabular text-ok">{fmt.eur0(opps.filter((o) => o.etapa === "ganado").reduce((s, o) => s + o.importe, 0))}</span>
        </div>
        <div>
          <span className="text-fg-3">{trad("Tasa de cierre")}{" "}</span>
          <span className="font-display text-lg font-semibold tabular">
            {fmt.num((opps.filter((o) => o.etapa === "ganado").length / Math.max(1, opps.filter((o) => o.etapa === "ganado" || o.etapa === "perdido").length)) * 100, 0)} %
          </span>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 scroll-thin sm:px-6">
        {ETAPAS.map((e) => {
          const list = opps.filter((o) => o.etapa === e.id);
          return (
            <div
              key={e.id}
              onDragOver={(ev) => {
                ev.preventDefault();
                setOver(e.id);
              }}
              onDragLeave={() => setOver(null)}
              onDrop={(ev) => {
                ev.preventDefault();
                setOver(null);
                const id = ev.dataTransfer.getData("text/opp");
                if (id) move(id, e.id);
              }}
              className={cn("flex w-64 shrink-0 flex-col rounded-xl bg-surface-2/70 p-2 transition-colors", over === e.id && "bg-brand-soft outline-2 outline-dashed outline-brand")}
            >
              <div className="flex items-center justify-between px-1.5 py-1.5">
                <Badge tone={e.tone}>{trad(e.label)}</Badge>
                <span className="text-xs text-fg-3 tabular">{fmt.eur0(list.reduce((s, o) => s + o.importe, 0))}</span>
              </div>
              <div className="grid gap-2">
                <AnimatePresence>
                  {list.map((o) => (
                    <motion.div key={o.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <div draggable onDragStart={(ev) => ev.dataTransfer.setData("text/opp", o.id)} className="cursor-grab rounded-lg border border-line bg-surface p-3 shadow-e1 active:cursor-grabbing">
                        <div className="text-[13px] font-semibold">{trad(o.empresa)}</div>
                        <div className="text-xs text-fg-2">{trad(o.nombre)}</div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="font-medium tabular">{fmt.eur0(o.importe)}</span>
                          <span className="text-fg-3">{trad(o.origen)}</span>
                        </div>
                        {o.motivoPerdida ? (
                          <div className="mt-2 rounded bg-bad-soft px-2 py-1 text-[11px] text-bad">{trad(o.motivoPerdida)}</div>
                        ) : o.etapa !== "ganado" ? (
                          <div className="mt-2 text-[11px] text-fg-3">{trad("Seguimiento")}{" "}{o.proximo === isoDay(new Date()) ? trad("hoy") : fmt.date(o.proximo)}</div>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
      <p className="px-4 text-xs text-fg-3 sm:px-6">{trad("Arrastra las tarjetas entre columnas.")}</p>
    </div>
  );
}

/* ---------------- Presupuestos ---------------- */
const Q_TONE: Record<Quote["estado"], [string, Tone]> = {
  borrador: ["Borrador", "neutral"],
  enviado: ["Enviado", "info"],
  visto: ["Visto por el cliente", "sun"],
  aceptado: ["Aceptado y firmado", "ok"],
  rechazado: ["Rechazado", "bad"],
};

export function Presupuestos() {
  const quotes = useDemo((s) => s.quotes);
  const lastChange = useDemo((s) => s.lastChange);
  const maps = useMaps();
  const [open, setOpen] = useState<string>();
  return (
    <div className="pb-8">
      <PageHeader id="presupuestos" />
      <div className="grid gap-4 px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {(["enviado", "visto", "aceptado", "rechazado"] as const).map((e) => (
            <Card key={e} className="p-3.5">
              <Badge tone={Q_TONE[e][1]}>{trad(Q_TONE[e][0])}</Badge>
              <div className="mt-2 font-display text-xl font-semibold tabular">{fmt.eur0(quotes.filter((q) => q.estado === e).reduce((s, q) => s + q.importe, 0))}</div>
              <div className="text-[11px] text-fg-3">{trad(quotes.filter((q) => q.estado === e).length)}{" "}{trad("presupuestos")}</div>
            </Card>
          ))}
        </div>
        <Card className="overflow-hidden">
          <DataTable
            rows={quotes}
            rowKey={(q) => q.id}
            onRowClick={(q) => setOpen(q.id)}
            flashIds={lastChange?.ids}
            flashTs={lastChange?.ts}
            search={(q) => `${q.numero} ${maps.client[q.clientId]?.nombre} ${q.titulo}`}
            filters={[{ label: trad("Todos"), fn: () => true }, ...(Object.keys(Q_TONE) as Quote["estado"][]).map((k) => ({ label: Q_TONE[k][0], fn: (q: Quote) => q.estado === k }))]}
            columns={[
              { key: "n", header: trad("Número"), cell: (q) => <span className="font-medium tabular">{trad(q.numero)}</span>, sort: (q) => q.numero },
              { key: "c", header: trad("Cliente"), cell: (q) => <div><div className="font-medium">{trad(maps.client[q.clientId]?.nombre)}</div><div className="text-xs text-fg-3">{trad(q.titulo)}</div></div> },
              { key: "f", header: trad("Fecha"), cell: (q) => <span className="tabular">{fmt.date(q.fecha)}</span>, sort: (q) => q.fecha, hideSm: true },
              { key: "e", header: trad("Estado"), cell: (q) => <span className="flex items-center gap-1.5"><Badge tone={Q_TONE[q.estado][1]}>{trad(Q_TONE[q.estado][0])}</Badge>{q.vistoEn && <span className="text-[11px] text-fg-3">{fmt.ago(q.vistoEn)}</span>}</span> },
              { key: "i", header: trad("Importe"), cell: (q) => <span className="tabular">{fmt.eur(q.importe)}</span>, sort: (q) => q.importe, align: "right" },
            ]}
          />
        </Card>
      </div>
      <QuoteDrawer id={open} onClose={() => setOpen(undefined)} />
    </div>
  );
}

function QuoteDrawer({ id, onClose }: { id?: string; onClose: () => void }) {
  const q = useDemo((s) => s.quotes.find((x) => x.id === id));
  const accept = useDemo((s) => s.acceptQuote);
  const send = useDemo((s) => s.sendQuote);
  const sector = useSector();
  const maps = useMaps();
  const { go } = usePanelNav();
  const [firmando, setFirmando] = useState(false);
  if (!q) return <Drawer open={false} onClose={onClose} title="">{null}</Drawer>;
  const c = maps.client[q.clientId];
  const serv = sector.servicios.find((s) => s.nombre === q.titulo) ?? sector.servicios[0];
  const lineas = [
    { c: q.titulo, i: Math.round(q.importe * 0.72) },
    { c: "Material según catálogo", i: Math.round(q.importe * 0.2) },
    { c: "Desplazamiento y gestión de residuos", i: q.importe - Math.round(q.importe * 0.72) - Math.round(q.importe * 0.2) },
  ];
  return (
    <Drawer open={!!id} onClose={() => { setFirmando(false); onClose(); }} title={<span className="flex items-center gap-2">{q.numero} <Badge tone={Q_TONE[q.estado][1]}>{Q_TONE[q.estado][0]}</Badge></span>} width={560}>
      <div className="grid gap-4 p-5">
        <div className="rounded-xl border border-line bg-white p-5 text-[#0c1a22]">
          <div className="text-[11px] text-[#7a8893]">{trad("Presupuesto para")}</div>
          <div className="font-semibold">{trad(c.nombre)}</div>
          <div className="mt-4 font-display text-lg font-semibold">{trad(q.titulo)}</div>
          <div className="text-xs text-[#465661]">{trad("Duración estimada")}{" "}{fmt.dur(serv.min)}. Válido 30 días.</div>
          <div className="mt-4 grid gap-1.5 text-[13px]">
            {lineas.map((l) => (
              <div key={l.c} className="flex justify-between border-b border-[#eef2f4] pb-1.5">
                <span>{trad(l.c)}</span>
                <span className="tabular">{fmt.eur(l.i)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 font-semibold">
              <span>{trad("Total sin IVA")}</span>
              <span className="tabular">{fmt.eur(q.importe)}</span>
            </div>
          </div>
          {q.estado === "aceptado" && (
            <div className="mt-4 flex items-end justify-between rounded-lg bg-[#e1f3ea] p-3">
              <div className="text-xs text-[#13845a]">
                <div className="font-semibold">{trad("Aceptado con firma")}</div>
                {trad(c.contacto)}
              </div>
              <Signature name={c.contacto} className="h-10 w-28 text-[#0c1a22]" />
            </div>
          )}
        </div>
        {q.estado === "borrador" && (
          <div className="grid grid-cols-2 gap-2">
            <Button variant="primary" onClick={() => send(q.id)}>
              <MessageCircle className="size-4" />{" "}{trad("Enviar por WhatsApp")}
            </Button>
            <Button variant="secondary" onClick={() => send(q.id)}>
              <Mail className="size-4" />{" "}{trad("Enviar por email")}
            </Button>
          </div>
        )}
        {(q.estado === "enviado" || q.estado === "visto") && (
          <div className="grid gap-2 rounded-xl border border-dashed border-line-strong p-3">
            <div className="flex items-center gap-2 text-xs text-fg-2">
              <Eye className="size-3.5" /> {q.vistoEn ? tradf("El cliente lo abrió {0}. Te avisamos al momento.", fmt.ago(q.vistoEn)) : trad("Te avisaremos cuando el cliente lo abra.")}
            </div>
            {!firmando ? (
              <Button variant="secondary" onClick={() => setFirmando(true)}>
                <PenLine className="size-4" />{" "}{trad("Simular firma del cliente")}
              </Button>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-2">
                <div className="grid h-24 place-items-center rounded-lg border border-line bg-surface">
                  <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.2 }}>
                    <Signature name={c.contacto} />
                  </motion.div>
                </div>
                <Button
                  variant="primary"
                  onClick={() => {
                    accept(q.id);
                    setFirmando(false);
                  }}
                >
                  <Check className="size-4" />{" "}{trad("Aceptar presupuesto")}
                </Button>
              </motion.div>
            )}
          </div>
        )}
        {q.estado === "aceptado" && (
          <Button variant="primary" onClick={() => go("planificacion")}>
            <Wrench className="size-4" />{" "}{trad("Convertir en trabajo y planificar")}
          </Button>
        )}
      </div>
    </Drawer>
  );
}

/* ---------------- Contratos ---------------- */
export function Contratos() {
  const contracts = useDemo((s) => s.contracts);
  const sign = useDemo((s) => s.signContract);
  const lastChange = useDemo((s) => s.lastChange);
  const maps = useMaps();
  const [sel, setSel] = useState<string>();
  const k = contracts.find((x) => x.id === sel);
  const [signing, setSigning] = useState(false);
  return (
    <div className="pb-8">
      <PageHeader id="contratos" actions={<Button size="sm" variant="primary" onClick={() => setSel(contracts.find((c) => c.estado === "pendiente-firma")?.id)}><Plus className="size-3.5" />{" "}{trad("Nuevo contrato")}</Button>} />
      <div className="px-4 sm:px-6">
        <Card className="overflow-hidden">
          <DataTable
            rows={contracts}
            rowKey={(c) => c.id}
            onRowClick={(c) => setSel(c.id)}
            flashIds={lastChange?.ids}
            flashTs={lastChange?.ts}
            filters={[
              { label: trad("Todos"), fn: () => true },
              { label: trad("Por renovar"), fn: (c) => c.estado === "por-renovar" },
              { label: trad("Pendiente de firma"), fn: (c) => c.estado === "pendiente-firma" },
            ]}
            columns={[
              { key: "c", header: trad("Cliente"), cell: (c) => <div><div className="font-medium">{trad(maps.client[c.clientId]?.nombre)}</div><div className="text-xs text-fg-3">{trad(c.nombre)}</div></div>, sort: (c) => maps.client[c.clientId]?.nombre ?? "" },
              { key: "v", header: trad("Visitas al año"), cell: (c) => <span className="tabular">{trad(c.visitasAnio)}</span>, align: "right", hideSm: true },
              { key: "r", header: trad("Respuesta"), cell: (c) => `${c.respuestaHoras} h`, hideSm: true },
              { key: "q", header: trad("Cuota"), cell: (c) => <span className="tabular">{fmt.eur(c.cuota)} <span className="text-fg-3">{trad(c.periodicidad)}</span></span>, sort: (c) => c.cuota },
              { key: "n", header: trad("Renovación"), cell: (c) => <span className="tabular">{fmt.date(c.renovacion)}</span>, sort: (c) => c.renovacion },
              { key: "e", header: trad("Estado"), cell: (c) => <Badge tone={c.estado === "activo" ? "ok" : c.estado === "por-renovar" ? "warn" : "sun"}>{c.estado === "activo" ? trad("Activo") : c.estado === "por-renovar" ? trad("Por renovar") : trad("Pendiente de firma")}</Badge> },
            ]}
          />
        </Card>
        <p className="mt-3 text-xs text-fg-3">{trad("Los contratos activos crean solos sus órdenes de trabajo preventivas y sus facturas recurrentes.")}</p>
      </div>
      <Drawer open={!!k} onClose={() => { setSel(undefined); setSigning(false); }} title={k ? trad(maps.client[k.clientId]?.nombre) : ""}>
        {k && (
          <div className="grid gap-4 p-5">
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              {[
                ["Servicio", k.nombre],
                ["Cuota", `${fmt.eur(k.cuota)} ${k.periodicidad}`],
                ["Visitas preventivas", tradf("{0} al año", k.visitasAnio)],
                ["Tiempo de respuesta", tradf("{0} horas", k.respuestaHoras)],
                ["Inicio", fmt.date(k.inicio)],
                ["Renovación", fmt.date(k.renovacion)],
              ].map(([a, b]) => (
                <div key={a} className="rounded-lg bg-surface-2 px-3 py-2">
                  <div className="text-[11px] text-fg-3">{trad(a)}</div>
                  <div className="font-medium">{trad(b)}</div>
                </div>
              ))}
            </div>
            {k.estado === "pendiente-firma" ? (
              <div className="grid gap-3 rounded-xl border border-dashed border-line-strong p-4">
                <div className="flex items-center gap-2 text-[13px]">
                  <Send className="size-4 text-brand" />{" "}{trad("Enviado al móvil de")}{" "}{trad(maps.client[k.clientId]?.contacto)}
                </div>
                {!signing ? (
                  <Button variant="secondary" onClick={() => setSigning(true)}>
                    <FileSignature className="size-4" />{" "}{trad("Simular firma desde el móvil")}
                  </Button>
                ) : (
                  <>
                    <div className="grid h-24 place-items-center rounded-lg border border-line bg-surface">
                      <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.2 }}>
                        <Signature name={maps.client[k.clientId]?.contacto ?? ""} />
                      </motion.div>
                    </div>
                    <Button variant="primary" onClick={() => { sign(k.id); setSigning(false); }}>
                      <Check className="size-4" />{" "}{trad("Confirmar firma")}
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-ok-soft px-3 py-2 text-[13px] text-ok">
                <Check className="size-4" />{" "}{trad("Firmado el")}{" "}{fmt.date(k.firmado ?? k.inicio)}. {k.estado === "por-renovar" && "Se avisará al cliente 30 días antes de renovar."}
              </div>
            )}
            <div>
              <div className="mb-2 text-[13px] font-semibold">{trad("Próximas visitas que se generarán solas")}</div>
              <div className="grid gap-1.5">
                {[1, 2, 3].map((n) => {
                  const d = new Date();
                  d.setMonth(d.getMonth() + Math.round((12 / k.visitasAnio) * n));
                  return (
                    <div key={n} className="flex justify-between rounded-lg border border-line px-3 py-2 text-[13px]">
                      <span>{trad("Revisión preventiva")}{" "}{trad(n)}</span>
                      <span className="tabular text-fg-3">{fmt.date(d)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
