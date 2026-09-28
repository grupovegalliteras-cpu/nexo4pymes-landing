import { clsx, type ClassValue } from "clsx";
import { LOCALE, type Idioma } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Generador pseudoaleatorio determinista (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int: (min: number, max: number) => Math.floor(next() * (max - min + 1)) + min,
    pick: <T,>(arr: readonly T[]) => arr[Math.floor(next() * arr.length)],
    chance: (p: number) => next() < p,
    shuffle: <T,>(arr: T[]) => {
      const c = [...arr];
      for (let i = c.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [c[i], c[j]] = [c[j], c[i]];
      }
      return c;
    },
  };
}
export type Rng = ReturnType<typeof rng>;

export function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Formatos de números, euros, fechas y tiempos en el idioma de la página. */
function crearFmt(lang: Idioma) {
  const loc = LOCALE[lang];
  const eur = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR" });
  const eur0 = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const num = new Intl.NumberFormat(loc);
  const sep = lang === "de" ? "." : "/";
  const dia = new Intl.DateTimeFormat(loc, { weekday: "long" });
  const diaLargo = new Intl.DateTimeFormat(loc, { weekday: "long", day: "numeric", month: "long" });
  const mes = new Intl.DateTimeFormat(loc, { month: "long", year: "numeric" });
  const hace = {
    es: { ahora: "ahora", min: (m: number) => `hace ${m} min`, h: (h: number) => `hace ${h} h`, ayer: "ayer", dias: (d: number) => `hace ${d} días` },
    en: { ahora: "now", min: (m: number) => `${m} min ago`, h: (h: number) => `${h} h ago`, ayer: "yesterday", dias: (d: number) => `${d} days ago` },
    de: { ahora: "jetzt", min: (m: number) => `vor ${m} Min.`, h: (h: number) => `vor ${h} Std.`, ayer: "gestern", dias: (d: number) => `vor ${d} Tagen` },
  }[lang];
  const minTxt = lang === "de" ? "Min." : "min";
  const hTxt = lang === "de" ? "Std." : "h";
  return {
    lang,
    eur: (n: number) => eur.format(n),
    eur0: (n: number) => eur0.format(n),
    num: (n: number, d = 0) => new Intl.NumberFormat(loc, { maximumFractionDigits: d, minimumFractionDigits: d }).format(n),
    int: (n: number) => num.format(Math.round(n)),
    /** dd/mm/aaaa (en alemán dd.mm.aaaa) */
    date: (iso: string | number | Date) => {
      const d = new Date(iso);
      return `${String(d.getDate()).padStart(2, "0")}${sep}${String(d.getMonth() + 1).padStart(2, "0")}${sep}${d.getFullYear()}`;
    },
    dateShort: (iso: string | number | Date) => {
      const d = new Date(iso);
      return `${String(d.getDate()).padStart(2, "0")}${sep}${String(d.getMonth() + 1).padStart(2, "0")}${lang === "de" ? "." : ""}`;
    },
    time: (iso: string | number | Date) => {
      const d = new Date(iso);
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    },
    dayName: (iso: string | number | Date) => dia.format(new Date(iso)),
    dayLong: (iso: string | number | Date) => diaLargo.format(new Date(iso)),
    monthName: (iso: string | number | Date) => mes.format(new Date(iso)),
    ago: (ts: number, now = Date.now()) => {
      const s = Math.max(0, Math.round((now - ts) / 1000));
      if (s < 45) return hace.ahora;
      const m = Math.round(s / 60);
      if (m < 60) return hace.min(m);
      const h = Math.round(m / 60);
      if (h < 24) return hace.h(h);
      const d = Math.round(h / 24);
      if (d === 1) return hace.ayer;
      return hace.dias(d);
    },
    dur: (min: number) => {
      const h = Math.floor(min / 60);
      const m = Math.round(min % 60);
      if (!h) return `${m} ${minTxt}`;
      return m ? `${h} ${hTxt} ${m} ${minTxt}` : `${h} ${hTxt}`;
    },
    clock: (ms: number) => {
      const s = Math.max(0, Math.floor(ms / 1000));
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const ss = s % 60;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    },
  };
}
export type Fmt = ReturnType<typeof crearFmt>;

const FMTS: Record<Idioma, Fmt> = { es: crearFmt("es"), en: crearFmt("en"), de: crearFmt("de") };

/** Formatos para un idioma concreto. En componentes de cliente, mejor useFmt(). */
export function fmtDe(lang: Idioma): Fmt {
  return FMTS[lang];
}

/** Formatos en español (lo que no depende del idioma de la página). */
export const fmt = FMTS.es;

export function isoDay(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDays(d: Date, n: number) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

export function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la = (a.lat * Math.PI) / 180;
  const lb = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la) * Math.cos(lb) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
