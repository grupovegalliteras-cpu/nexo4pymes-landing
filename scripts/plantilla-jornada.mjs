/* ============================================================
   GENERADOR DE LA PLANTILLA DE REGISTRO DE JORNADA (.xlsx)

   POR QUÉ ESTO EXISTE Y NO UNA LIBRERÍA. El proyecto no tiene ninguna
   dependencia de hojas de cálculo y no merece la pena añadir uno de
   esos paquetes de varios megas para generar tres archivos que casi
   nunca van a cambiar. Un .xlsx es un zip con cinco XML dentro, y eso
   cabe aquí.

   SE EJECUTA A MANO, NO EN EL BUILD:

     node scripts/plantilla-jornada.mjs

   y los archivos resultantes se commitean en public/plantillas/. Así
   el despliegue no depende de este script y la web sirve un archivo
   estático.

   LO QUE LA PLANTILLA TIENE QUE CUMPLIR, y de dónde sale: el artículo
   34.9 del Estatuto de los Trabajadores exige registro DIARIO con la
   hora de inicio y la de fin de cada persona, y conservarlo cuatro
   años. No exige medio digital ni formato alguno, así que una hoja de
   cálculo vale. Las columnas de abajo son ese mínimo más lo que hace
   falta para que el total cuadre: las pausas.

   OJO SI SE TOCA: las fórmulas se guardan SIEMPRE en inglés y con coma
   como separador de argumentos, aunque Excel las enseñe luego en
   español y con punto y coma. Si se escriben en español aquí, el
   archivo se abre con error.
   ============================================================ */

import { writeFileSync, mkdirSync } from "node:fs";
import { deflateRawSync } from "node:zlib";

/* ---------- ZIP mínimo ---------- */

const TABLA_CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = TABLA_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

/* Fecha fija en las entradas del zip: así el archivo generado dos veces
   seguidas es byte a byte el mismo y el diff de git no se llena de
   ruido. 1 de noviembre de 2026, 12:00. */
const FECHA_DOS = ((2026 - 1980) << 9) | (11 << 5) | 1;
const HORA_DOS = (12 << 11) | (0 << 5) | 0;

function zip(entradas) {
  const locales = [];
  const central = [];
  let desplazamiento = 0;

  for (const [nombre, texto] of entradas) {
    const datos = Buffer.from(texto, "utf8");
    const comprimido = deflateRawSync(datos, { level: 9 });
    const crc = crc32(datos);
    const nom = Buffer.from(nombre, "utf8");

    const cabecera = Buffer.alloc(30);
    cabecera.writeUInt32LE(0x04034b50, 0);
    cabecera.writeUInt16LE(20, 4); // versión necesaria
    cabecera.writeUInt16LE(0, 6); // sin banderas
    cabecera.writeUInt16LE(8, 8); // deflate
    cabecera.writeUInt16LE(HORA_DOS, 10);
    cabecera.writeUInt16LE(FECHA_DOS, 12);
    cabecera.writeUInt32LE(crc, 14);
    cabecera.writeUInt32LE(comprimido.length, 18);
    cabecera.writeUInt32LE(datos.length, 22);
    cabecera.writeUInt16LE(nom.length, 26);
    cabecera.writeUInt16LE(0, 28);
    locales.push(cabecera, nom, comprimido);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4); // versión del que lo creó
    dir.writeUInt16LE(20, 6);
    dir.writeUInt16LE(0, 8);
    dir.writeUInt16LE(8, 10);
    dir.writeUInt16LE(HORA_DOS, 12);
    dir.writeUInt16LE(FECHA_DOS, 14);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(comprimido.length, 20);
    dir.writeUInt32LE(datos.length, 24);
    dir.writeUInt16LE(nom.length, 28);
    dir.writeUInt16LE(0, 30); // extra
    dir.writeUInt16LE(0, 32); // comentario
    dir.writeUInt16LE(0, 34); // disco
    dir.writeUInt16LE(0, 36); // atributos internos
    dir.writeUInt32LE(0, 38); // atributos externos
    dir.writeUInt32LE(desplazamiento, 42);
    central.push(dir, nom);

    desplazamiento += cabecera.length + nom.length + comprimido.length;
  }

  const cuerpo = Buffer.concat(locales);
  const directorio = Buffer.concat(central);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(0, 4);
  fin.writeUInt16LE(0, 6);
  fin.writeUInt16LE(entradas.length, 8);
  fin.writeUInt16LE(entradas.length, 10);
  fin.writeUInt32LE(directorio.length, 12);
  fin.writeUInt32LE(cuerpo.length, 16);
  fin.writeUInt16LE(0, 20);
  return Buffer.concat([cuerpo, directorio, fin]);
}

/* ---------- Las piezas del .xlsx ---------- */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`;

const RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;

const WB_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;

/* Estilos: 0 normal · 1 cabecera · 2 fecha · 3 hora · 4 número 2 dec.
   Los formatos 14 (dd/mm/yyyy) y 20 (h:mm) son de los que trae Excel de
   fábrica, así que no hace falta declararlos. */
const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1F3A4D"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFD0D0D0"/></left><right style="thin"><color rgb="FFD0D0D0"/></right><top style="thin"><color rgb="FFD0D0D0"/></top><bottom style="thin"><color rgb="FFD0D0D0"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="14" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/><xf numFmtId="20" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/></cellXfs></styleSheet>`;

const wbXml = (hoja) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${esc(hoja)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;

/* 200 filas vacías ya formateadas: suficiente para un mes de una
   plantilla pequeña, y con la fórmula puesta para que el total salga
   solo en cuanto se escriben las dos horas. */
const FILAS = 200;

function sheetXml(cabeceras) {
  const col = (i) => String.fromCharCode(65 + i); // A..G, de sobra
  const filas = [];

  const celdasCab = cabeceras
    .map((h, i) => `<c r="${col(i)}1" s="1" t="inlineStr"><is><t>${esc(h)}</t></is></c>`)
    .join("");
  filas.push(`<row r="1" ht="30" customHeight="1">${celdasCab}</row>`);

  for (let n = 2; n <= FILAS + 1; n++) {
    /* IF(OR(...)) vacío mientras no haya datos: una columna de ceros
       en una plantilla en blanco da la sensación de que ya hay algo
       apuntado, y en un registro de jornada eso es justo lo que no
       conviene. */
    const formula = `IF(OR(C${n}="",D${n}=""),"",(D${n}-C${n})*24-IF(E${n}="",0,E${n})/60)`;
    filas.push(
      `<row r="${n}">` +
        `<c r="A${n}" s="2"/>` +
        `<c r="B${n}" s="0"/>` +
        `<c r="C${n}" s="3"/>` +
        `<c r="D${n}" s="3"/>` +
        `<c r="E${n}" s="0"/>` +
        `<c r="F${n}" s="4"><f>${esc(formula)}</f></c>` +
        `<c r="G${n}" s="0"/>` +
        `</row>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols><col min="1" max="1" width="12" customWidth="1"/><col min="2" max="2" width="26" customWidth="1"/><col min="3" max="4" width="14" customWidth="1"/><col min="5" max="5" width="13" customWidth="1"/><col min="6" max="6" width="13" customWidth="1"/><col min="7" max="7" width="34" customWidth="1"/></cols><sheetData>${filas.join("")}</sheetData></worksheet>`;
}

/* ---------- Los tres idiomas ---------- */

const IDIOMAS = {
  es: {
    archivo: "registro-de-jornada-nexo4pymes-es.xlsx",
    hoja: "Registro de jornada",
    cabeceras: ["Fecha", "Persona trabajadora", "Hora de entrada", "Hora de salida", "Pausas (min)", "Horas del día", "Observaciones"],
  },
  en: {
    archivo: "registro-de-jornada-nexo4pymes-en.xlsx",
    hoja: "Working time record",
    cabeceras: ["Date", "Employee", "Start time", "End time", "Breaks (min)", "Hours worked", "Notes"],
  },
  de: {
    archivo: "registro-de-jornada-nexo4pymes-de.xlsx",
    hoja: "Arbeitszeiterfassung",
    cabeceras: ["Datum", "Beschäftigte Person", "Beginn", "Ende", "Pausen (Min.)", "Stunden am Tag", "Anmerkungen"],
  },
};

mkdirSync("public/plantillas", { recursive: true });

for (const [lang, cfg] of Object.entries(IDIOMAS)) {
  const buf = zip([
    ["[Content_Types].xml", CONTENT_TYPES],
    ["_rels/.rels", RELS],
    ["xl/workbook.xml", wbXml(cfg.hoja)],
    ["xl/_rels/workbook.xml.rels", WB_RELS],
    ["xl/styles.xml", STYLES],
    ["xl/worksheets/sheet1.xml", sheetXml(cfg.cabeceras)],
  ]);
  writeFileSync(`public/plantillas/${cfg.archivo}`, buf);
  console.log(`${lang}: public/plantillas/${cfg.archivo} (${buf.length} bytes)`);
}
