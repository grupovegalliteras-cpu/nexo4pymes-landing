"use client";

import { motion } from "motion/react";
import { Building2, CalendarDays, Download, FileText, Mail, MapPin, Phone, Plus, QrCode, Receipt, StickyNote, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDemo, useSector } from "@/store/demo";
import { useUi } from "@/store/ui";
import { useMaps } from "@/lib/hooks";
import { cn, fmt, isoDay } from "@/lib/utils";
import { Avatar, Badge, Button, Card, CardHeader, DataTable, Drawer, Field, InvoiceStatusBadge, JobStatusBadge, Modal, Segmented, inputCls } from "@/components/ui";
import { MallorcaMap } from "@/components/mallorca-map";
import { FakePhoto } from "@/components/photo";
import type { Client } from "@/data/types";
import { BrandMark, PageHeader } from "../shell";
import { usePanelNav } from "../nav";
import { CANAL } from "./avisos";
import { QrSvg } from "./finanzas";
import { trad, tradf } from "@/lib/t";

export function Clientes() {
  const clients = useDemo((s) => s.clients);
  const invoices = useDemo((s) => s.invoices);
  const jobs = useDemo((s) => s.jobs);
  const contracts = useDemo((s) => s.contracts);
  const focus = useUi((s) => s.panelFocus);
  const [open, setOpen] = useState<string | undefined>(focus && clients.some((c) => c.id === focus) ? focus : undefined);
  const [nuevo, setNuevo] = useState(false);
  useEffect(() => {
    if (focus && clients.some((c) => c.id === focus)) setOpen(focus);
  }, [focus, clients]);
  const year = String(new Date().getFullYear());
  const stats = useMemo(() => {
    const m: Record<string, { fact: number; trabajos: number }> = {};
    clients.forEach((c) => (m[c.id] = { fact: 0, trabajos: 0 }));
    invoices.forEach((i) => i.estado !== "borrador" && i.fecha.startsWith(year) && m[i.clientId] && (m[i.clientId].fact += i.total));
    jobs.forEach((j) => m[j.clientId] && m[j.clientId].trabajos++);
    return m;
  }, [clients, invoices, jobs, year]);

  return (
    <div className="pb-8">
      <PageHeader id="clientes" actions={<Button size="sm" variant="primary" onClick={() => setNuevo(true)}><Plus className="size-3.5" />{" "}{trad("Nuevo cliente")}</Button>} />
      <NuevoCliente open={nuevo} onClose={() => setNuevo(false)} onCreated={(id) => { setNuevo(false); setOpen(id); }} />
      <div className="px-4 sm:px-6">
        <Card className="overflow-hidden">
          <DataTable
            rows={clients}
            rowKey={(c) => c.id}
            onRowClick={(c) => setOpen(c.id)}
            search={(c) => `${c.nombre} ${c.municipio} ${c.contacto} ${c.cif}`}
            placeholder={trad("Buscar por nombre, municipio o contacto")}
            defaultSort={{ key: "f", dir: -1 }}
            filters={[
              { label: trad("Todos"), fn: () => true },
              { label: trad("Con contrato"), fn: (c) => contracts.some((k) => k.clientId === c.id) },
              { label: trad("Turísticos"), fn: (c) => c.etiquetas.includes("Turístico") },
              { label: trad("Comunidades"), fn: (c) => c.tipo === "Comunidad" },
            ]}
            columns={[
              {
                key: "n",
                header: trad("Cliente"),
                cell: (c) => (
                  <div className="flex items-center gap-2.5">
                    <Avatar name={c.nombre} color="var(--text-2)" size={28} />
                    <div className="min-w-0">
                      <div className="truncate font-medium">{trad(c.nombre)}</div>
                      <div className="truncate text-xs text-fg-3">{trad(c.tipo)}</div>
                    </div>
                  </div>
                ),
                sort: (c) => c.nombre,
              },
              { key: "m", header: trad("Municipio"), cell: (c) => c.municipio, sort: (c) => c.municipio },
              { key: "c", header: trad("Contacto"), cell: (c) => <div><div>{trad(c.contacto)}</div><div className="text-xs text-fg-3 tabular">{trad(c.telefono)}</div></div>, hideSm: true },
              { key: "k", header: trad("Contrato"), cell: (c) => (contracts.some((k) => k.clientId === c.id) ? <Badge tone="brand">{trad("Mantenimiento")}</Badge> : <span className="text-fg-3">{trad("No")}</span>), hideSm: true },
              { key: "t", header: trad("Trabajos"), cell: (c) => <span className="tabular">{trad(stats[c.id]?.trabajos)}</span>, sort: (c) => stats[c.id]?.trabajos ?? 0, align: "right" },
              { key: "f", header: tradf("Facturado {0}", year), cell: (c) => <span className="tabular font-medium">{fmt.eur0(stats[c.id]?.fact ?? 0)}</span>, sort: (c) => stats[c.id]?.fact ?? 0, align: "right" },
            ]}
          />
        </Card>
      </div>
      <ClientDrawer id={open} onClose={() => setOpen(undefined)} />
    </div>
  );
}

function NuevoCliente({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: (id: string) => void }) {
  const add = useDemo((s) => s.addClient);
  const [f, setF] = useState({ nombre: "", tipo: "Comunidad", municipio: "Palma", contacto: "", telefono: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  return (
    <Modal open={open} onClose={onClose} label={trad("Nuevo cliente")}>
      <form
        className="grid gap-3 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!f.nombre.trim()) return;
          onCreated(add({ ...f, nombre: f.nombre.trim() }));
          setF({ nombre: "", tipo: "Comunidad", municipio: "Palma", contacto: "", telefono: "" });
        }}
      >
        <div className="font-display text-lg font-semibold">{trad("Nuevo cliente")}</div>
        <Field label={trad("Nombre")}>
          <input className={inputCls} value={f.nombre} onChange={set("nombre")} placeholder={trad("Comunidad Es Molinar 8")} autoFocus />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={trad("Tipo")}>
            <select className={inputCls} value={f.tipo} onChange={set("tipo")}>
              {["Comunidad", "Hotel", "Villa", "Oficinas", "Restaurante", "Clínica", "Supermercado"].map((t) => (
                <option key={t}>{trad(t)}</option>
              ))}
            </select>
          </Field>
          <Field label={trad("Municipio")}>
            <select className={inputCls} value={f.municipio} onChange={set("municipio")}>
              {["Palma", "Calvià", "Marratxí", "Inca", "Manacor", "Alcúdia", "Sóller", "Llucmajor"].map((t) => (
                <option key={t}>{trad(t)}</option>
              ))}
            </select>
          </Field>
          <Field label={trad("Persona de contacto")}>
            <input className={inputCls} value={f.contacto} onChange={set("contacto")} />
          </Field>
          <Field label={trad("Teléfono")}>
            <input className={inputCls} value={f.telefono} onChange={set("telefono")} inputMode="tel" />
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>
            {trad("Cancelar")}
          </Button>
          <Button type="submit" variant="primary" disabled={!f.nombre.trim()}>
            {trad("Crear cliente")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function ClientDrawer({ id, onClose }: { id?: string; onClose: () => void }) {
  const c = useDemo((s) => s.clients.find((x) => x.id === id));
  const jobs = useDemo((s) => s.jobs);
  const invoices = useDemo((s) => s.invoices);
  const avisos = useDemo((s) => s.avisos);
  const installations = useDemo((s) => s.installations);
  const contracts = useDemo((s) => s.contracts);
  const sector = useSector();
  const maps = useMaps();
  const { go } = usePanelNav();
  const [tab, setTab] = useState<"resumen" | "trabajos" | "facturas" | "llamadas" | "instalaciones" | "docs">("resumen");
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState<string[]>([]);
  if (!c) return <Drawer open={false} onClose={onClose} title="">{null}</Drawer>;
  const cj = jobs.filter((j) => j.clientId === c.id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const ci = invoices.filter((i) => i.clientId === c.id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const ca = avisos.filter((a) => a.clientId === c.id);
  const cinst = installations.filter((i) => i.clientId === c.id);
  const k = contracts.find((x) => x.clientId === c.id);
  const year = String(new Date().getFullYear());
  const fact = ci.filter((i) => i.estado !== "borrador" && i.fecha.startsWith(year)).reduce((s, i) => s + i.total, 0);
  const pend = ci.filter((i) => i.estado === "emitida" || i.estado === "vencida").reduce((s, i) => s + i.total, 0);

  return (
    <Drawer open={!!id} onClose={onClose} title={trad(c.nombre)} width={640}>
      <div className="grid gap-4 p-5">
        <div className="flex items-start gap-3">
          <Avatar name={c.nombre} color="var(--text-2)" size={44} />
          <div className="min-w-0 flex-1">
            <div className="font-display text-lg font-semibold">{trad(c.nombre)}</div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge>{trad(c.tipo)}</Badge>
              {c.etiquetas.map((e) => (
                <Badge key={e} tone="brand">{trad(e)}</Badge>
              ))}
              {c.centros > 1 && <Badge tone="ai">{trad(c.centros)}{" "}{trad("centros")}</Badge>}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            [tradf("Facturado {0}", year), fmt.eur0(fact)],
            ["Pendiente", fmt.eur0(pend)],
            ["Trabajos", String(cj.length)],
          ].map(([k2, v]) => (
            <div key={k2} className="rounded-lg bg-surface-2 px-3 py-2">
              <div className="text-[11px] text-fg-3">{trad(k2)}</div>
              <div className="font-display text-lg font-semibold tabular">{trad(v)}</div>
            </div>
          ))}
        </div>
        <div className="-mx-1 overflow-x-auto no-scrollbar">
          <Segmented
            value={tab}
            onChange={setTab}
            size="xs"
            options={[
              { value: "resumen", label: trad("Resumen") },
              { value: "trabajos", label: tradf("Trabajos {0}", cj.length) },
              { value: "facturas", label: tradf("Facturas {0}", ci.length) },
              { value: "llamadas", label: tradf("Llamadas {0}", ca.length) },
              { value: "instalaciones", label: `${sector.instalacion.plural} ${cinst.length}` },
              { value: "docs", label: trad("Documentos") },
            ]}
          />
        </div>
        {tab === "resumen" && (
          <div className="grid gap-3">
            <div className="grid gap-2 rounded-xl border border-line p-3 text-[13px]">
              <div className="flex items-center gap-2"><MapPin className="size-3.5 text-fg-3" />{trad(c.direccion)}</div>
              <div className="flex items-center gap-2"><Phone className="size-3.5 text-fg-3" />{trad(c.contacto)}, {trad(c.telefono)}</div>
              <div className="flex items-center gap-2"><Mail className="size-3.5 text-fg-3" />{trad(c.email)}</div>
              <div className="flex items-center gap-2"><FileText className="size-3.5 text-fg-3" />{trad("CIF")}{" "}{trad(c.cif)}{trad(", cliente desde")}{" "}{fmt.date(c.desde)}</div>
            </div>
            <div className="overflow-hidden rounded-xl border border-line">
              <MallorcaMap className="h-40" markers={[{ id: c.id, kind: "client", lat: c.lat, lon: c.lon, n: 1, label: c.nombre }]} fit={[{ lat: c.lat + 0.08, lon: c.lon + 0.1 }, { lat: c.lat - 0.08, lon: c.lon - 0.1 }]} showTowns />
            </div>
            {k && (
              <button onClick={() => go("contratos")} className="flex items-center gap-3 rounded-xl bg-brand-soft/60 p-3 text-left">
                <CalendarDays className="size-4 text-brand" />
                <div className="text-[13px]">
                  <div className="font-medium">{trad(k.nombre)}</div>
                  <div className="text-xs text-fg-2">
                    {fmt.eur(k.cuota)} {trad(k.periodicidad)}{trad(", respuesta en")}{" "}{trad(k.respuestaHoras)}{" "}{trad("h, renovación")}{" "}{fmt.date(k.renovacion)}
                  </div>
                </div>
              </button>
            )}
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-fg-2">
                <StickyNote className="size-3.5" />{" "}{trad("Notas")}
              </div>
              {c.notas && <div className="mb-1.5 rounded-lg bg-warn-soft px-3 py-2 text-[13px] text-warn">{trad(c.notas)}</div>}
              {notas.map((n, i) => (
                <div key={i} className="mb-1.5 rounded-lg bg-surface-2 px-3 py-2 text-[13px]">{trad(n)}</div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nota.trim()) setNotas((x) => [...x, nota.trim()]);
                  setNota("");
                }}
              >
                <input value={nota} onChange={(e) => setNota(e.target.value)} placeholder={trad("Añadir una nota interna")} className={inputCls} aria-label={trad("Nota")} />
              </form>
            </div>
          </div>
        )}
        {tab === "trabajos" && (
          <div className="divide-y divide-line/70 rounded-xl border border-line">
            {cj.slice(0, 25).map((j) => (
              <button key={j.id} onClick={() => go("trabajos", j.id)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-surface-2">
                <Wrench className="size-3.5 text-fg-3" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{trad(j.codigo)} {trad(j.titulo)}</div>
                  <div className="text-[11px] text-fg-3">{fmt.date(j.fecha)}, {j.techId ? trad(maps.tech[j.techId].nombre) : trad("sin asignar")}</div>
                </div>
                <JobStatusBadge s={j.estado} />
              </button>
            ))}
          </div>
        )}
        {tab === "facturas" && (
          <div className="divide-y divide-line/70 rounded-xl border border-line">
            {ci.slice(0, 25).map((i) => (
              <button key={i.id} onClick={() => go("facturacion", i.id)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-surface-2">
                <Receipt className="size-3.5 text-fg-3" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium tabular">{trad(i.numero)}</div>
                  <div className="text-[11px] text-fg-3">{fmt.date(i.fecha)}</div>
                </div>
                <InvoiceStatusBadge s={i.estado} />
                <span className="tabular w-20 text-right text-[13px]">{fmt.eur(i.total)}</span>
              </button>
            ))}
          </div>
        )}
        {tab === "llamadas" && (
          <div className="grid gap-2">
            {ca.map((a) => {
              const C = CANAL[a.canal];
              return (
                <button key={a.id} onClick={() => go("central-avisos", a.id)} className="flex items-start gap-3 rounded-xl border border-line p-3 text-left hover:bg-surface-2">
                  <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg", C.cls)}>
                    <C.icon className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px]">{trad(a.resumen)}</div>
                    <div className="text-[11px] text-fg-3">{fmt.date(a.recibido)}{" "}{trad("a las")}{" "}{fmt.time(a.recibido)}, {trad(a.contacto)}</div>
                  </div>
                </button>
              );
            })}
            {!ca.length && <div className="py-6 text-center text-sm text-fg-3">{trad("Sin conversaciones registradas")}</div>}
          </div>
        )}
        {tab === "instalaciones" && (
          <div className="grid gap-2 sm:grid-cols-2">
            {cinst.map((i) => (
              <div key={i.id} className="flex gap-3 rounded-xl border border-line p-3">
                <QrSvg text={`https://nexo4pymes.com/demo?equipo=${i.codigo}`} className="size-14 shrink-0 rounded" />
                <div className="min-w-0 text-[13px]">
                  <div className="font-medium">{trad(i.nombre)}</div>
                  <div className="text-[11px] text-fg-3">{trad(i.marca)}{trad(", código")}{" "}{trad(i.codigo)}</div>
                  <div className="text-[11px] text-fg-3">{trad("Última revisión")}{" "}{fmt.date(i.ultimaRevision)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "docs" && (
          <div className="grid gap-2">
            {["Contrato de mantenimiento firmado.pdf", "Certificado de la instalación.pdf", "Plano de accesos.pdf", "Último informe de servicio.pdf"].map((d) => (
              <div key={d} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2">
                <FileText className="size-4 text-bad" />
                <span className="flex-1 text-[13px]">{trad(d)}</span>
                <Download className="size-4 text-fg-3" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
}

/* ---------------- Instalaciones ---------------- */
export function Instalaciones() {
  const installations = useDemo((s) => s.installations);
  const jobs = useDemo((s) => s.jobs);
  const sector = useSector();
  const maps = useMaps();
  const [sel, setSel] = useState<string>();
  const i = installations.find((x) => x.id === sel);
  return (
    <div className="pb-8">
      <PageHeader id="instalaciones" title={trad(sector.instalacion.plural)} desc={tradf("Cada {0} de cada cliente con su historial, fotos y un código QR que el técnico escanea en campo.", sector.instalacion.tipo.toLowerCase())} />
      <div className="px-4 sm:px-6">
        <Card className="overflow-hidden">
          <DataTable
            rows={installations}
            rowKey={(x) => x.id}
            onRowClick={(x) => setSel(x.id)}
            search={(x) => `${x.nombre} ${x.codigo} ${maps.client[x.clientId]?.nombre} ${x.marca}`}
            placeholder={trad("Buscar por código, cliente o marca")}
            filters={[
              { label: trad("Todas"), fn: () => true },
              { label: trad("Revisar"), fn: (x) => x.estado !== "ok" },
            ]}
            columns={[
              { key: "q", header: "", cell: () => <QrCode className="size-4 text-fg-3" />, className: "w-8" },
              { key: "n", header: sector.instalacion.tipo, cell: (x) => <div><div className="font-medium">{trad(x.nombre)}</div><div className="text-xs text-fg-3 tabular">{trad(x.codigo)}</div></div>, sort: (x) => x.nombre },
              { key: "c", header: trad("Cliente"), cell: (x) => maps.client[x.clientId]?.nombre, sort: (x) => maps.client[x.clientId]?.nombre ?? "" },
              { key: "m", header: trad("Marca"), cell: (x) => x.marca, hideSm: true },
              { key: "r", header: trad("Última revisión"), cell: (x) => <span className="tabular">{fmt.date(x.ultimaRevision)}</span>, sort: (x) => x.ultimaRevision },
              { key: "e", header: trad("Estado"), cell: (x) => <Badge tone={x.estado === "ok" ? "ok" : x.estado === "revisar" ? "warn" : "bad"}>{x.estado === "ok" ? trad("Correcto") : x.estado === "revisar" ? trad("Revisar") : trad("Averiada")}</Badge> },
            ]}
          />
        </Card>
      </div>
      <Drawer open={!!i} onClose={() => setSel(undefined)} title={trad(i?.nombre) ?? ""}>
        {i && (
          <div className="grid gap-4 p-5">
            <div className="flex gap-4">
              <QrSvg text={`https://nexo4pymes.com/demo?equipo=${i.codigo}`} className="size-28 shrink-0 rounded-lg border border-line" />
              <div className="grid content-start gap-1 text-[13px]">
                <div className="font-display text-lg font-semibold">{trad(i.nombre)}</div>
                <div className="text-fg-2">{trad(maps.client[i.clientId]?.nombre)}</div>
                <div className="text-fg-3">{trad(i.marca)}{trad(", instalada el")}{" "}{fmt.date(i.instalada)}</div>
                <div className="text-fg-3">{trad("Código")}{" "}{trad(i.codigo)}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((k) => (
                <FakePhoto key={k} seed={i.id + k} after={k > 0} tint={sector.color} className="aspect-square" stamp={fmt.dateShort(i.ultimaRevision)} />
              ))}
            </div>
            <div>
              <div className="mb-2 text-[13px] font-semibold">{trad("Historial de intervenciones")}</div>
              <div className="grid gap-1.5">
                {jobs
                  .filter((j) => j.installationId === i.id)
                  .slice(-8)
                  .reverse()
                  .map((j) => (
                    <div key={j.id} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 text-[13px]">
                      <span>{trad(j.titulo)}</span>
                      <span className="text-xs text-fg-3">{fmt.date(j.fecha)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

/* ---------------- Portal del cliente ---------------- */
export function PortalCliente() {
  const clients = useDemo((s) => s.clients);
  const jobs = useDemo((s) => s.jobs);
  const invoices = useDemo((s) => s.invoices);
  const contracts = useDemo((s) => s.contracts);
  const createIncidencia = useDemo((s) => s.createIncidencia);
  const sector = useSector();
  const [cid, setCid] = useState(clients[0]?.id);
  const [sent, setSent] = useState(false);
  const [txt, setTxt] = useState("");
  const c = clients.find((x) => x.id === cid)!;
  const hoy = isoDay(new Date());
  const prox = jobs.filter((j) => j.clientId === cid && j.fecha >= hoy).slice(0, 3);
  const pasados = jobs.filter((j) => j.clientId === cid && j.informe).slice(-3).reverse();
  const inv = invoices.filter((i) => i.clientId === cid && i.estado !== "borrador").slice(-4).reverse();
  const k = contracts.find((x) => x.clientId === cid);
  return (
    <div className="pb-8">
      <PageHeader
        id="portal-cliente"
        actions={
          <select className={cn(inputCls, "w-64")} value={cid} onChange={(e) => setCid(e.target.value)} aria-label={trad("Ver portal como")}>
            {clients.map((x) => (
              <option key={x.id} value={x.id}>
                {trad("Ver como")}{" "}{trad(x.nombre)}
              </option>
            ))}
          </select>
        }
      />
      <div className="px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-line bg-bg shadow-e2">
          <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2 text-xs text-fg-3">
            <span className="flex gap-1">
              <span className="size-2.5 rounded-full bg-bad/60" />
              <span className="size-2.5 rounded-full bg-sun/60" />
              <span className="size-2.5 rounded-full bg-ok/60" />
            </span>
            <span className="ml-2 rounded-md bg-surface-2 px-2 py-0.5">{trad("clientes.")}{sector.empresaCorta.toLowerCase().replace(/\s/g, "")}.es</span>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <BrandMark size={34} />
              <div>
                <div className="text-sm font-semibold">{trad("Hola,")}{" "}{trad(c.contacto.split(" ")[0])}</div>
                <div className="text-xs text-fg-3">{trad(c.nombre)}</div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <Card className="p-4">
                <div className="text-[13px] font-semibold">{trad("Próximas visitas")}</div>
                <div className="mt-2 grid gap-2">
                  {prox.map((j) => (
                    <div key={j.id} className="rounded-lg bg-surface-2 px-3 py-2 text-[13px]">
                      <div className="font-medium">{trad(j.titulo)}</div>
                      <div className="text-xs text-fg-3">{fmt.dayLong(j.fecha)}, {trad(j.hora)}</div>
                    </div>
                  ))}
                  {!prox.length && <div className="text-xs text-fg-3">{trad("Sin visitas programadas")}</div>}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-[13px] font-semibold">{trad("Informes de servicio")}</div>
                <div className="mt-2 grid gap-2">
                  {pasados.map((j) => (
                    <div key={j.id} className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-[13px]">
                      <FileText className="size-4 text-bad" />
                      <span className="flex-1">{trad(j.titulo)}</span>
                      <span className="text-xs text-fg-3">{fmt.dateShort(j.fecha)}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-[13px] font-semibold">{trad("Facturas")}</div>
                <div className="mt-2 grid gap-2">
                  {inv.map((i) => (
                    <div key={i.id} className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-[13px]">
                      <span className="flex-1 tabular">{trad(i.numero)}</span>
                      <InvoiceStatusBadge s={i.estado} />
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4 lg:col-span-2">
                <div className="text-[13px] font-semibold">{trad("Abrir una incidencia")}</div>
                {sent ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-lg bg-ok-soft px-3 py-2 text-[13px] text-ok">
                    {trad("Recibido. Ya aparece en la bandeja de la oficina.")}
                  </motion.div>
                ) : (
                  <form
                    className="mt-2 flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      createIncidencia(c.id, txt.trim() || "Incidencia abierta desde el portal");
                      setSent(true);
                    }}
                  >
                    <input className={inputCls} value={txt} onChange={(e) => setTxt(e.target.value)} placeholder={trad("Cuéntanos qué pasa")} aria-label={trad("Incidencia")} />
                    <Button variant="primary" type="submit">{trad("Enviar")}</Button>
                  </form>
                )}
              </Card>
              <Card className="p-4">
                <div className="text-[13px] font-semibold">{trad("Tu contrato")}</div>
                {k ? (
                  <div className="mt-2 text-[13px] text-fg-2">
                    {trad(k.nombre)}
                    <div className="text-xs text-fg-3">{trad("Renovación")}{" "}{fmt.date(k.renovacion)}{trad(", respuesta en")}{" "}{trad(k.respuestaHoras)} h</div>
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-fg-3">{trad("Sin contrato de mantenimiento")}</div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Multi-centro ---------------- */
export function MultiCentro() {
  const clients = useDemo((s) => s.clients);
  const jobs = useDemo((s) => s.jobs);
  const multi = clients.filter((c) => c.centros > 1);
  const [cid, setCid] = useState(multi[0]?.id);
  const c = clients.find((x) => x.id === cid) as Client | undefined;
  const centros = useMemo(() => {
    if (!c) return [];
    const names = ["Palma, Son Oliva", "Inca, centro", "Manacor, Sa Torre", "Marratxí, Pont d'Inca", "Llucmajor, Plaça", "Alcúdia, Port"];
    const pos = [[39.585, 2.655], [39.72, 2.91], [39.57, 3.205], [39.615, 2.745], [39.49, 2.89], [39.84, 3.1]];
    return Array.from({ length: c.centros }, (_, i) => ({ id: `${c.id}-${i}`, nombre: names[i % names.length], lat: pos[i % pos.length][0], lon: pos[i % pos.length][1], visitas: jobs.filter((j) => j.clientId === c.id).length % 7 + i + 2, estado: i === 1 ? "Aviso abierto" : "Al día" }));
  }, [c, jobs]);
  return (
    <div className="pb-8">
      <PageHeader
        id="multi-centro"
        actions={
          <select className={cn(inputCls, "w-64")} value={cid} onChange={(e) => setCid(e.target.value)} aria-label={trad("Cliente")}>
            {multi.map((x) => (
              <option key={x.id} value={x.id}>
                {trad(x.nombre)} ({trad(x.centros)}{" "}{trad("centros)")}
              </option>
            ))}
          </select>
        }
      />
      <div className="grid gap-4 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Card className="overflow-hidden">
          <CardHeader title={trad(c?.nombre) ?? ""} sub={trad("Todos sus centros con su estado y visitas del trimestre")} />
          <div className="divide-y divide-line/70">
            {centros.map((x, i) => (
              <div key={x.id} className="flex items-center gap-3 px-4 py-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-brand text-[11px] font-bold text-brand-ink">{i + 1}</span>
                <Building2 className="size-4 text-fg-3" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium">{trad(x.nombre)}</div>
                  <div className="text-[11px] text-fg-3">{trad(x.visitas)}{" "}{trad("visitas este trimestre")}</div>
                </div>
                <Badge tone={x.estado === "Al día" ? "ok" : "sun"}>{trad(x.estado)}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <MallorcaMap className="h-[380px]" markers={centros.map((x, i) => ({ id: x.id, kind: "job" as const, lat: x.lat, lon: x.lon, n: i + 1, active: x.estado !== "Al día" }))} routes={[{ id: "r", color: "var(--brand)", points: centros, dashed: false }]} />
        </Card>
      </div>
    </div>
  );
}
