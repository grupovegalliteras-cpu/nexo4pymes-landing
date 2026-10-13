/* ============================================================
   EL ESTADO LEGAL DE VERIFACTU, EN UN SOLO SITIO

   POR QUÉ ESTE ARCHIVO EXISTE Y NO SON FRASES SUELTAS EN LA PÁGINA.
   Las fechas de VeriFactu han cambiado tres veces. El calendario
   original era 2026; el Real Decreto-ley 15/2025 lo movió a 2027; y el
   5 de octubre de 2026 Hacienda anunció llevarlo a octubre de 2028.
   Si las fechas están escritas dentro de la prosa, dentro de la FAQ y
   dentro de los datos estructurados, el día que se muevan otra vez hay
   que cazarlas por media web y alguna se queda atrás. Publicar un
   plazo fiscal equivocado en la página de quien vende software de
   facturación es peor que no tener la página.

   LA DISTINCIÓN QUE HAY QUE RESPETAR AL ESCRIBIR. Una cosa es lo que
   está EN VIGOR —publicado en el BOE— y otra lo ANUNCIADO. A fecha de
   esta comprobación, lo de octubre de 2028 es un anuncio del
   Ministerio, no una norma. La página debe decir las dos cosas y
   distinguirlas, porque es justo lo que la gente está buscando: el
   autocompletado de Google devuelve "verifactu aplazamiento",
   "verifactu aplazamiento 2028", "por que se retrasa verifactu",
   "verifactu moratoria" y "verifactu noticias hoy". La demanda nace de
   la confusión; la página gana explicándola, no repitiéndola.

   CÓMO SE ACTUALIZA. Se tocan los valores de aquí, se pone la fecha
   nueva en COMPROBADO y se despliega. Nada más.

   FUENTE PRIMARIA, siempre antes que cualquier gestoría:
   https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html
   ============================================================ */

export type EstadoNorma = "en-vigor" | "anunciado";

export type HitoVerifactu = {
  /** A quién le aplica, en la lengua del que lo busca, no en la del BOE. */
  quien: string;
  /** "YYYY-MM-DD" cuando hay día cierto; "YYYY-MM" cuando solo hay mes. */
  fecha: string;
  /** Cómo se lee en la página. Que no haya que formatear fechas en la vista. */
  fechaTexto: string;
  estado: EstadoNorma;
  /** La norma concreta. Sin esto, es un rumor con formato de dato. */
  norma: string;
};

/** Último día en que una persona miró la sede de la AEAT y lo confirmó. */
export const COMPROBADO = "2026-10-13";

export const HITOS: HitoVerifactu[] = [
  {
    quien: "Fabricantes de software de facturación",
    fecha: "2025-07-29",
    fechaTexto: "29 de julio de 2025",
    estado: "en-vigor",
    norma: "RD 1007/2023",
  },
  {
    quien: "Empresas que tributan por el Impuesto sobre Sociedades",
    fecha: "2027-01-01",
    fechaTexto: "1 de enero de 2027",
    estado: "en-vigor",
    norma: "RD-ley 15/2025",
  },
  {
    quien: "Autónomos y resto de obligados tributarios",
    fecha: "2027-07-01",
    fechaTexto: "1 de julio de 2027",
    estado: "en-vigor",
    norma: "RD-ley 15/2025",
  },
  {
    quien: "Empresas y autónomos que facturan menos de 8 M€",
    fecha: "2028-10",
    fechaTexto: "octubre de 2028",
    estado: "anunciado",
    /* Nota del Ministerio de Hacienda, no norma publicada. Mientras no
       salga en el BOE, lo que obliga son las fechas de 2027. */
    norma: "anuncio del Ministerio de Hacienda de 5 de octubre de 2026",
  },
];

/** Lo que de verdad obliga hoy. Lo anunciado no cuenta hasta el BOE. */
export const hitosEnVigor = () => HITOS.filter((h) => h.estado === "en-vigor");

/** Hay un aplazamiento anunciado sin publicar: la página debe avisarlo. */
export const hayAplazamientoAnunciado = () => HITOS.some((h) => h.estado === "anunciado");
