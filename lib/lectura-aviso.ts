import { MUNICIPIOS } from "@/data/seed";
import type { Sector } from "@/data/sectors";

/* ---------- Lectura de un aviso escrito por el visitante ----------
   Reglas sencillas y deterministas: suficiente para enseñar el flujo con cualquier texto.
   Entiende español, inglés y alemán a la vez (un cliente puede escribir en cualquiera).
   Todo se compara sin tildes ni diéresis: «gäste» se busca como «gaste». */

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");

/** Pueblos que no están en el mapa de la demo, llevados a la zona más cercana. */
const ALIAS: Record<string, string> = {
  andratx: "Calvià", "santa ponsa": "Calvià", magaluf: "Calvià", portals: "Calvià", palmanova: "Calvià", bendinat: "Calvià", "port d'andratx": "Calvià", "puerto de andratx": "Calvià",
  pollensa: "Alcúdia", pollenca: "Alcúdia", "can picafort": "Alcúdia", muro: "Alcúdia",
  "sa pobla": "Inca", binissalem: "Inca", lloseta: "Inca", selva: "Inca",
  "cala millor": "Manacor", "porto cristo": "Manacor", felanitx: "Manacor", "cala d'or": "Manacor", arta: "Manacor", capdepera: "Manacor", "cala ratjada": "Manacor",
  arenal: "Llucmajor", campos: "Llucmajor", santanyi: "Llucmajor", "colonia de sant jordi": "Llucmajor",
  deia: "Sóller", valldemossa: "Sóller", fornalutx: "Sóller",
  bunyola: "Marratxí", "santa maria": "Marratxí", "pont d'inca": "Marratxí",
  "son ferriol": "Palma", "playa de palma": "Palma", "es molinar": "Palma", portixol: "Palma",
};

/** Palabras del oficio que no salen en el nombre del servicio: [en el mensaje, en el nombre del servicio]. */
const SINONIMOS: [RegExp, RegExp][] = [
  [/fuga|gotea|grifo|tuberi|atasc|cisterna|desague|leak|drip|tap\b|pipe|toilet|leck|tropf|wasserhahn|rohr|verstopf/, /fontaner|plumbing|sanitar/],
  [/caldera|agua caliente|calefacc|boiler|hot water|heating|heizkessel|kessel|warmwasser|heizung/, /caldera|boiler|kessel/],
  [/diferencial|enchufe|sin luz|cuadro electrico|salta la luz|rcd|trips|socket|no power|fuse box|fi-schalter|steckdose|kein strom|sicherung/, /electric|elektr/],
  [/termo\b|water heater|boiler 80|warmwasserboiler/, /termo|water heater|boiler/],
  [/cucarach|hormig|insect|chinche|avispa|cockroach|ants?\b|bed ?bug|wasp|kakerlak|schabe|ameise|wanze|wespe/, /desinsect|choque|insect|intensive|insekt|intensiv/],
  [/rata|raton|roedor|excrement|\brats?\b|mice|mouse|rodent|dropping|ratte|maus|mause|nager|kot\b/, /desratiz|rodent|nager/],
  [/riego|aspersor|goteo|programador|irrigation|sprinkler|bewasser|sprenger|tropfer/, /riego|irrigation|bewasser/],
  [/palmera|picudo|palm tree|weevil|palme|palmrussler/, /palmera|palm/],
  [/maleza|hierba alta|parcela|desbroz|overgrown|clearance|clear a plot|gestrupp|roden|grundstuck/, /desbroce|clearance|rodung/],
  [/no enfria|camara|grados|congelad|not cooling|cold room|freezer|degrees|kuhlt nicht|kuhlraum|tiefkuhl|grad\b/, /frio|refrigeration|kalte/],
  [/fuga de gas|recargar gas|alarma de la camara|refrigerant|gas recharge|kaltemittel/, /gas|refrigerant|kaltemittel/],
  [/split|aire acondicionado|poner aire|air con|klimaanlage/, /split/],
  [/verde|green|grun/, /verde|green|grun/],
  [/depuradora|no aspira|pump|not suction|pumpe|saugt nicht/, /depuradora|pump|pumpe/],
  [/polvo|pintores|fin de obra|dust|painters|builders|after the works|staub|maler|bauend/, /obra|construction|bauend/],
  [/cristal|ventana|window|glass|fenster|glas/, /cristal|window|glas/],
  [/inversor|luz roja|producen|inverter|red light|producing|wechselrichter|rotes licht|produzier/, /inversor|inverter|wechselrichter/],
  [/bateria|batter|speicher/, /bateria|batter/],
  [/baldosa|persiana|suena hueca|pequeno arreglo|tile|hollow|small repair|fliese|hohl|kleinreparatur/, /puntual|small repair|kleinreparatur/],
  [/terraza|filtra|gotera|terrace|roof|seeping|dachterrasse|undicht|eindring/, /impermeab|terrace|terrassen/],
];

const RE_URGENTE =
  /urgent|fuga|gotea|inund|no funciona|no va\b|no enciende|no arranca|no enfria|sin luz|sin agua|no hay agua|se sale|humo|roto|rota|averi|hoy|ahora|ya mismo|esta noche|cuanto antes|huesped|clientes? (estan|llegan)|llega una familia|verde|parad|subiendo|cucarach|\bratas?\b|raton|excrement|apagad|auditori|inspecc|agua por|asap|as soon as|leak|flood|not working|doesn'?t work|won'?t (start|turn on)|no power|no water|smoke|broken|today|right now|tonight|guests|green|stopped|rising|cockroach|\bmice\b|mouse|dropping|switched off|audit|inspection|dringend|sofort|leck|undicht|uberschwemm|funktioniert nicht|geht nicht|kein strom|kein wasser|rauch|kaputt|heute|jetzt|heute abend|gaste|grun|kakerlak|ratte|mause|ausgefallen|kontrolle|prufung/;
const RE_PRESUPUESTO = /precio|presupuesto|cuanto (cuesta|vale|costaria|me cobr)|tarifa|\bquote\b|quotation|\bprice\b|how much|estimate|angebot|\bpreis|was kostet|kostenvoranschlag/;
const RE_QUEJA =
  /otra vez|vuelve a|de nuevo|queja|no vinieron|no vino|mal hecho|sigue igual|siguen saliendo|se han quedado|again|complain|still (there|coming|not)|didn'?t (come|turn up)|left behind|not done properly|schon wieder|wieder|beschwer|reklam|immer noch|nicht gekommen|liegen (gelassen|noch)/;
const RE_PROBLEMA =
  /problema|no (funciona|va|sale|salta|enciende|enfria|aspira|carga)|ruido|olor|mancha|atasc|fall|cae agua|entrado agua|la mitad|luz roja|turbi|caid|hueca|restos|hormig|plaga|bicho|problem|noise|smell|stain|blocked|fault|dripping|cloudy|drooping|hollow|\bants?\b|pest|isn'?t|not (coming|working)|gerausch|geruch|fleck|verstopft|storung|trub|hangen|hohl|ameise|schadling|nicht/;
const RE_SALUDO = /^(hola|buen[oa]s|soy |llamo |le escribo|te escribo|hi\b|hello|good (morning|afternoon|evening)|it'?s |this is|i'?m |hallo|guten (morgen|tag|abend)|hier ist|ich bin)/i;

export type Lectura = {
  tipo: "avería" | "presupuesto" | "queja" | "consulta";
  urgencia: "alta" | "media" | "baja";
  servicio: { nombre: string; precio: number; min: number };
  municipio: string;
  municipioDicho: boolean;
  resumen: string;
};

export function leer(texto: string, sector: Sector): Lectura {
  const t = norm(texto);
  const urg = RE_URGENTE.test(t);
  const tipo: Lectura["tipo"] = RE_PRESUPUESTO.test(t) ? "presupuesto" : RE_QUEJA.test(t) ? "queja" : urg || RE_PROBLEMA.test(t) ? "avería" : "consulta";
  const urgencia: Lectura["urgencia"] = urg && tipo !== "presupuesto" ? "alta" : tipo === "queja" || tipo === "avería" ? "media" : "baja";

  // servicio: el nombre del catálogo pesa mucho; los avisos de ejemplo del sector, poco (comparten palabras genéricas)
  const palabras = (s: string) => norm(s).split(/[^a-zñ0-9]+/).filter((w) => w.length > 3).map((w) => w.slice(0, 5));
  const msg = new Set(palabras(texto));
  const puntos = sector.servicios.map((s) => palabras(s.nombre).filter((w) => msg.has(w)).length * 5);
  SINONIMOS.forEach(([enMensaje, enServicio]) => {
    if (!enMensaje.test(t)) return;
    sector.servicios.forEach((s, i) => {
      if (enServicio.test(norm(s.nombre))) puntos[i] += 8;
    });
  });
  sector.avisos.forEach((a) => {
    const txt = a.lineas.map((l) => l[1]).join(" ") + " " + a.resumen;
    puntos[a.servicio] += Math.min(2, new Set(palabras(txt).filter((w) => msg.has(w))).size * 0.5);
  });
  const max = Math.max(...puntos);
  const idx = max === 0 ? (tipo === "presupuesto" ? sector.servicios.length - 1 : 0) : puntos.indexOf(max);

  let municipio = "";
  for (const m of Object.keys(MUNICIPIOS)) if (t.includes(norm(m))) municipio = m;
  if (!municipio) for (const [a, m] of Object.entries(ALIAS)) if (t.includes(a)) municipio = m;

  // la frase con el problema, no el saludo ni la presentación
  const limpio = texto.replace(/\s+/g, " ").trim();
  const frases = limpio.split(/(?<=[.!?])\s+/);
  const frase = frases.find((f) => !RE_SALUDO.test(f) && f.length > 15) ?? frases[0] ?? limpio;
  const resumen = frase.length > 90 ? frase.slice(0, 87).trimEnd() + "…" : frase;

  return { tipo, urgencia, servicio: sector.servicios[idx], municipio: municipio || "Palma", municipioDicho: !!municipio, resumen };
}
