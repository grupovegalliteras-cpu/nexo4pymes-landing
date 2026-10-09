import { horarioAtencion, type Dia, type TramoHorario } from "@/content/marca";
import { tr, type Idioma } from "@/lib/i18n";

/* ============================================================
   EL HORARIO, ESCRITO COMO LO ESCRIBE CADA IDIOMA

   El dato se guarda en content/marca.ts en formato máquina, porque
   es lo que piden los datos estructurados. Para la página hay que
   convertirlo en una frase, y una frase se escribe distinto en cada
   idioma: en español "Lunes a viernes", en inglés "Monday to
   Friday", en alemán "Montag bis Freitag".

   Lo que hace esto, en orden:
     1. agrupa los tramos que comparten los mismos días, para que una
        jornada partida salga como "9:00–14:00 y 15:00–18:00" en vez
        de como dos líneas que repiten los días;
     2. junta los días seguidos en un rango ("Lunes a viernes") y deja
        suelto lo que no sea seguido ("Sábado");
     3. quita el cero de delante de las horas, porque "9:00" es como
        se lee y "09:00" es como se guarda.
   ============================================================ */

const ORDEN: Dia[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const NOMBRES: Record<Idioma, Record<Dia, string>> = {
  es: {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo",
  },
  en: {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  },
  de: {
    Monday: "Montag",
    Tuesday: "Dienstag",
    Wednesday: "Mittwoch",
    Thursday: "Donnerstag",
    Friday: "Freitag",
    Saturday: "Samstag",
    Sunday: "Sonntag",
  },
};

/** "a" / "to" / "bis": el conector de un rango de días. */
const A = { es: "a", en: "to", de: "bis" };

/* El segundo día de un rango va en minúscula en español —"Lunes a
   viernes"— y en mayúscula en inglés y en alemán: en inglés los días
   de la semana son nombres propios y en alemán todos los sustantivos
   se escriben con mayúscula. "Monday to friday" está mal escrito. */
const SEGUNDO_EN_MINUSCULA = { es: true, en: false, de: false };
/** El conector de dos tramos del mismo día. */
const Y = { es: "y", en: "and", de: "und" };

/** "09:00" → "9:00". Se guarda con cero porque lo pide schema.org. */
function hora(h: string) {
  return h.replace(/^0/, "");
}

/** El día que cierra el rango, con la mayúscula que toque. */
function ultimo(nombre: string, lang: Idioma) {
  return tr(lang, SEGUNDO_EN_MINUSCULA) ? nombre.toLowerCase() : nombre;
}

/** Los días de un tramo, con los seguidos juntos en un rango. */
function dias(lista: Dia[], lang: Idioma) {
  const ordenados = ORDEN.filter((d) => lista.includes(d));
  const grupos: Dia[][] = [];
  for (const d of ordenados) {
    const ultimo = grupos[grupos.length - 1];
    const seguido = ultimo && ORDEN.indexOf(d) === ORDEN.indexOf(ultimo[ultimo.length - 1]) + 1;
    if (seguido) ultimo.push(d);
    else grupos.push([d]);
  }
  const nombres = NOMBRES[lang];
  return grupos
    .map((g) =>
      g.length === 1
        ? nombres[g[0]]
        : `${nombres[g[0]]} ${tr(lang, A)} ${ultimo(nombres[g[g.length - 1]]!, lang)}`,
    )
    .join(", ");
}

/**
 * El horario en una frase por bloque de días, o null si no hay
 * horario puesto. Null y no cadena vacía a propósito: quien lo usa
 * tiene que decidir si pinta la fila o no la pinta.
 */
export function horarioTexto(lang: Idioma): string[] | null {
  if (horarioAtencion.length === 0) return null;

  /* Un grupo por combinación de días, en el orden en que aparecen. */
  const porDias = new Map<string, TramoHorario[]>();
  for (const t of horarioAtencion) {
    const clave = ORDEN.filter((d) => t.dias.includes(d)).join("|");
    const ya = porDias.get(clave);
    if (ya) ya.push(t);
    else porDias.set(clave, [t]);
  }

  return [...porDias.entries()].map(([clave, tramos]) => {
    const horas = tramos
      .map((t) => `${hora(t.abre)}–${hora(t.cierra)}`)
      .join(` ${tr(lang, Y)} `);
    return `${dias(clave.split("|") as Dia[], lang)}: ${horas}`;
  });
}
