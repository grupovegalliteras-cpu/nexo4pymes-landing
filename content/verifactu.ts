import type { Idioma } from "@/lib/i18n";

/* ============================================================
   /verifactu — LA PUERTA NACIONAL

   POR QUÉ ESTA PÁGINA EXISTE Y NO BASTABA CON /obligaciones.
   La medición de noviembre de 2026 dejó dos cosas claras. Una: de
   2.410 consultas que Google autocompleta en nuestro nicho, UNA lleva
   topónimo. El modificador local, que sostenía casi todos los títulos
   de la web, no se teclea. Dos: /obligaciones llevaba tres meses con
   CERO impresiones, no por el contenido —que es el correcto— sino
   porque su título va a por «qué obliga a una empresa en España», una
   frase que nadie escribe. Lo que se escribe es «verifactu cuando
   entra en vigor», «verifactu aplazamiento 2028», «verifactu es
   obligatorio» y «verifactu y factura electronica es lo mismo».

   EL REPARTO, PARA NO CANIBALIZAR. /obligaciones se queda de HUB: las
   tres normas, una al lado de la otra, para quien aún no sabe qué le
   toca. Esta es la página PROFUNDA de una sola: para quien ya sabe la
   palabra y quiere la fecha. Y /modulos/facturacion-verifactu es la
   comercial, para quien ya busca programa. Tres intenciones, tres
   páginas, y cada una con su término principal. Si alguna vez las tres
   empiezan a salir por la misma consulta, sobra una.

   POR QUÉ SE GANA. El top 10 de «verifactu aplazamiento 2028» son
   gestorías y informáticas pequeñas, no Holded ni Wolters Kluwer: es
   alcanzable. Y se les gana con lo único que ninguna hace: separar lo
   PUBLICADO EN EL BOE de lo ANUNCIADO, con la fecha en que se miró.
   Hacienda ha movido este calendario tres veces; cada vez que lo mueva,
   esta página es la que estará bien.

   LAS FECHAS NO SE ESCRIBEN AQUÍ. Salen de content/verifactu-estado.ts.
   Aquí se habla de la obligación sin números, para que el texto siga
   siendo cierto cuando el calendario vuelva a moverse.

   LAS CIFRAS DE SANCIÓN SÍ, y van con su artículo delante, porque son
   el dato que todo el sector cuenta mal. Leídas en el texto consolidado
   de la Ley 58/2003 el 3 de noviembre de 2026.
   ============================================================ */

export type Texto = Record<Idioma, string>;

export type SeccionVerifactu = {
  id: string;
  titulo: Texto;
  parrafos: Texto[];
  /** La frase que alguien copia y pega a un compañero. Va destacada. */
  destacado?: Texto;
};

/* ------------------------------------------------------------------
   LAS SANCIONES, QUE ES DONDE TODO EL MUNDO SE EQUIVOCA

   Medio sector escribe «multa de 50.000 € por no tener VeriFactu». El
   artículo 201 bis de la Ley General Tributaria no dice eso. Dice que
   se sanciona LA TENENCIA de sistemas que, debiendo estar certificados
   por disposición reglamentaria, no lo estén, o de dispositivos
   certificados que se hayan alterado. No es una multa por llegar tarde:
   es una multa por usar un programa manipulado o sin certificar.

   La distinción importa porque es la diferencia entre asustar y
   informar, y porque quien la lee bien entiende que el riesgo no está
   en la fecha sino en con qué factura.
   ------------------------------------------------------------------ */
export const SANCIONES: { importe: string; a: Texto; unidad: Texto }[] = [
  {
    importe: "150.000 €",
    a: {
      es: "Fabricar, producir o comercializar un programa que permita borrar o retocar lo ya facturado",
      en: "Making, producing or selling software that allows issued invoices to be deleted or altered",
      de: "Herstellen, Produzieren oder Vertreiben von Software, mit der bereits erstellte Rechnungen gelöscht oder verändert werden können",
    },
    unidad: {
      es: "por cada ejercicio con ventas y por cada tipo de programa",
      en: "per financial year with sales and per type of program",
      de: "je Geschäftsjahr mit Verkäufen und je Programmtyp",
    },
  },
  {
    importe: "1.000 €",
    a: {
      es: "Comercializar un sistema sin el certificado, cuando el reglamento lo exija",
      en: "Selling a system without the certificate, where the regulation requires one",
      de: "Vertrieb eines Systems ohne Zertifikat, wo die Verordnung es verlangt",
    },
    unidad: {
      es: "por cada sistema comercializado sin él",
      en: "per system sold without it",
      de: "je ohne Zertifikat vertriebenes System",
    },
  },
  {
    importe: "50.000 €",
    a: {
      es: "Tener un sistema que debiendo estar certificado no lo está, o uno certificado que se ha alterado",
      en: "Holding a system that should be certified and is not, or a certified one that has been tampered with",
      de: "Betrieb eines Systems, das zertifiziert sein müsste und es nicht ist, oder eines manipulierten zertifizierten Systems",
    },
    unidad: { es: "por cada ejercicio", en: "per financial year", de: "je Geschäftsjahr" },
  },
];

export const SECCIONES: SeccionVerifactu[] = [
  {
    id: "aplazamiento",
    titulo: {
      es: "¿Está aplazado a 2028?",
      en: "Has it been postponed to 2028?",
      de: "Ist es auf 2028 verschoben?",
    },
    parrafos: [
      {
        es: "Anunciado sí, publicado no. El 5 de octubre de 2026 el Ministerio de Hacienda sacó una nota informativa diciendo que pensaba llevar a octubre de 2028 los plazos que quedan pendientes, para que coincidan con la factura electrónica obligatoria. Una nota del Ministerio no es una norma.",
        en: "Announced yes, published no. On 5 October 2026 the Spanish Treasury put out a note saying it intended to move the remaining deadlines to October 2028, so they line up with mandatory e-invoicing. A ministry note is not a law.",
        de: "Angekündigt ja, veröffentlicht nein. Am 5. Oktober 2026 teilte das spanische Finanzministerium mit, es wolle die noch offenen Fristen auf Oktober 2028 verschieben, damit sie mit der verpflichtenden E-Rechnung zusammenfallen. Eine Mitteilung des Ministeriums ist kein Gesetz.",
      },
      {
        es: "Mientras no salga en el BOE una disposición que cambie la disposición final cuarta del Real Decreto 1007/2023, lo que obliga son las fechas de 2027. Eso es lo que dice hoy el texto consolidado, y es lo que hay que mirar antes de creerse a nadie.",
        en: "Until a provision amending the fourth final provision of Royal Decree 1007/2023 appears in the official gazette, the 2027 dates are what binds you. That is what the consolidated text says today, and that is what to check before believing anyone.",
        de: "Solange im Gesetzblatt keine Bestimmung erscheint, die die vierte Schlussbestimmung des Königlichen Dekrets 1007/2023 ändert, gelten die Fristen von 2027. Das sagt der konsolidierte Text heute, und das ist zu prüfen, bevor man irgendjemandem glaubt.",
      },
    ],
    destacado: {
      es: "Planificar con la fecha anunciada y no con la publicada es apostar a que un anuncio del Ministerio acabe en el BOE antes de 2027. Puede pasar. No ha pasado todavía.",
      en: "Planning around the announced date instead of the published one is betting that a ministry note reaches the gazette before 2027. It may. It has not yet.",
      de: "Mit dem angekündigten statt dem veröffentlichten Datum zu planen heißt darauf zu wetten, dass eine Ministeriumsnotiz vor 2027 im Gesetzblatt landet. Möglich. Bisher nicht geschehen.",
    },
  },
  {
    id: "que-es",
    titulo: {
      es: "Qué obliga exactamente",
      en: "What it actually requires",
      de: "Was genau verlangt wird",
    },
    parrafos: [
      {
        es: "VeriFactu no os obliga a enviar las facturas a Hacienda. Obliga a que el programa con el que facturáis firme cada factura y encadene su huella con la de la anterior, de modo que una factura emitida no se pueda borrar ni retocar sin que se note. Cada factura lleva además un código QR, y el programa guarda un registro de alta por cada una.",
        en: "VeriFactu does not require you to send your invoices to the tax agency. It requires the software you invoice with to sign every invoice and chain its hash to the previous one, so an issued invoice cannot be deleted or altered without it showing. Each invoice also carries a QR code, and the software keeps an issue record for every one of them.",
        de: "VeriFactu verlangt nicht, dass Sie Ihre Rechnungen an die Steuerverwaltung senden. Es verlangt, dass Ihre Rechnungssoftware jede Rechnung signiert und ihren Hash mit dem der vorherigen verkettet, sodass eine erstellte Rechnung nicht unbemerkt gelöscht oder verändert werden kann. Jede Rechnung trägt zudem einen QR-Code, und die Software führt zu jeder einen Ausstellungsdatensatz.",
      },
      {
        es: "Hay dos maneras de cumplir. En modo «VeriFactu», el programa manda cada registro a la Agencia Tributaria en el momento de emitir. En modo «no VeriFactu», no lo manda, pero entonces los registros tienen que quedar firmados y conservados con requisitos más estrictos. Las dos son legales; la primera es la que quita papeleo.",
        en: "There are two ways to comply. In «VeriFactu» mode the software sends each record to the tax agency as the invoice is issued. In «non-VeriFactu» mode it does not, but then the records must be signed and kept under stricter requirements. Both are legal; the first is the one that removes paperwork.",
        de: "Es gibt zwei Wege der Erfüllung. Im «VeriFactu»-Modus sendet die Software jeden Datensatz beim Ausstellen an die Steuerverwaltung. Im «Nicht-VeriFactu»-Modus nicht, dafür müssen die Datensätze signiert und unter strengeren Auflagen aufbewahrt werden. Beides ist zulässig; das erste spart Papierkram.",
      },
    ],
    destacado: {
      es: "No os obliga a cambiar de programa: obliga a que el programa cumpla. Si el vuestro se adapta, no hay nada que comprar. Preguntádselo por escrito a vuestro proveedor antes de contratar nada con nadie.",
      en: "It does not force you to change software: it forces the software to comply. If yours adapts, there is nothing to buy. Ask your current provider in writing before signing anything with anyone.",
      de: "Sie müssen nicht die Software wechseln: die Software muss die Vorgaben erfüllen. Passt Ihre sich an, gibt es nichts zu kaufen. Fragen Sie Ihren Anbieter schriftlich, bevor Sie irgendwo unterschreiben.",
    },
  },
  {
    id: "factura-electronica",
    titulo: {
      es: "VeriFactu y factura electrónica no son lo mismo",
      en: "VeriFactu and e-invoicing are not the same thing",
      de: "VeriFactu und E-Rechnung sind nicht dasselbe",
    },
    parrafos: [
      {
        es: "Se confunden a diario y son dos normas distintas, con dos reglamentos distintos y dos calendarios distintos. VeriFactu va de cómo se emite la factura: que no se pueda manipular. La factura electrónica entre empresas va de en qué formato viaja: un fichero estructurado que la máquina del otro lado lee sola.",
        en: "They get mixed up daily and they are two separate rules, with two separate regulations and two separate timetables. VeriFactu is about how an invoice is issued: that it cannot be tampered with. Business-to-business e-invoicing is about the format it travels in: a structured file the other side's software reads by itself.",
        de: "Sie werden täglich verwechselt und sind zwei verschiedene Vorschriften, mit zwei Verordnungen und zwei Zeitplänen. Bei VeriFactu geht es darum, wie eine Rechnung erstellt wird: unmanipulierbar. Bei der E-Rechnung zwischen Unternehmen geht es um das Format: eine strukturierte Datei, die die Software der Gegenseite selbst liest.",
      },
      {
        es: "Se pueden tener las dos cosas mal por separado. Un programa puede cumplir VeriFactu y seguir mandando PDF por correo, que no es factura electrónica. Y al revés. El anuncio de octubre de 2028 existe precisamente para juntar las dos fechas en los negocios pequeños, que es la señal de que hasta en Hacienda saben que llevarlas por separado era un lío.",
        en: "You can get each one wrong independently. Software can comply with VeriFactu and still email PDFs, which are not electronic invoices. And the other way round. The October 2028 announcement exists precisely to bring the two dates together for small businesses, which tells you even the Treasury knows running them separately was a mess.",
        de: "Man kann beides unabhängig voneinander falsch machen. Software kann VeriFactu erfüllen und trotzdem PDFs per E-Mail verschicken, die keine E-Rechnungen sind. Und umgekehrt. Die Ankündigung für Oktober 2028 existiert gerade deshalb, um beide Fristen für kleine Betriebe zusammenzuführen — ein Eingeständnis, dass die Trennung unübersichtlich war.",
      },
    ],
    destacado: {
      es: "Un PDF por correo no es una factura electrónica, por mucho que lleve QR y cumpla VeriFactu. Son dos obligaciones que hay que mirar por separado.",
      en: "A PDF by email is not an electronic invoice, however many QR codes it carries and however well it complies with VeriFactu. They are two duties to check separately.",
      de: "Ein PDF per E-Mail ist keine E-Rechnung, auch mit QR-Code und VeriFactu-konform. Es sind zwei Pflichten, die getrennt zu prüfen sind.",
    },
  },
  {
    id: "que-hacer",
    titulo: {
      es: "Qué conviene hacer ahora",
      en: "What is worth doing now",
      de: "Was jetzt sinnvoll ist",
    },
    parrafos: [
      {
        es: "Preguntar al proveedor de vuestro programa de facturación, por escrito, si va a cumplir y en qué fecha lo tendrá. Si la respuesta es vaga o no llega, eso ya es una respuesta. Si el programa es una hoja de cálculo o un talonario, no hay proveedor a quien preguntar y el cambio hay que planificarlo con tiempo, no en diciembre de 2026.",
        en: "Ask whoever provides your invoicing software, in writing, whether it will comply and by what date. If the answer is vague or never comes, that is an answer in itself. If your invoicing is a spreadsheet or a paper book, there is no provider to ask and the change needs planning with time, not in December 2026.",
        de: "Fragen Sie den Anbieter Ihrer Rechnungssoftware schriftlich, ob er die Vorgaben erfüllen wird und zu welchem Datum. Bleibt die Antwort vage oder aus, ist auch das eine Antwort. Ist Ihre Fakturierung eine Tabelle oder ein Rechnungsblock, gibt es keinen Anbieter zu fragen, und der Wechsel braucht Vorlauf — nicht erst im Dezember 2026.",
      },
      {
        es: "Lo que no conviene es contratar con prisa por una fecha que todavía puede moverse, ni dejarlo del todo porque se ha anunciado un aplazamiento. Las dos cosas salen caras: la primera en dinero, la segunda en diciembre.",
        en: "What is not worth doing is signing in a hurry over a date that may still move, or dropping it entirely because a postponement was announced. Both cost you: the first in money, the second in December.",
        de: "Nicht sinnvoll ist es, wegen eines noch beweglichen Datums überstürzt abzuschließen — oder die Sache ganz liegen zu lassen, weil eine Verschiebung angekündigt wurde. Beides kostet: das eine Geld, das andere Nerven im Dezember.",
      },
    ],
  },
];

/* Las preguntas son las que Google autocompleta de verdad, medidas el
   3 de noviembre de 2026, no las que nos gustaría que preguntaran. Las
   respuestas van completas en el HTML y a la vista: sin acordeón, para
   que un modelo de lenguaje las pueda citar. */
export const FAQ_VERIFACTU: Record<Idioma, [pregunta: string, respuesta: string][]> = {
  es: [
    [
      "¿Cuándo entra en vigor VeriFactu?",
      "Para las empresas que tributan por el Impuesto sobre Sociedades, antes del 1 de enero de 2027. Para los autónomos y el resto de obligados tributarios, antes del 1 de julio de 2027. Son las fechas de la disposición final cuarta del Real Decreto 1007/2023 en su texto consolidado. Hay anunciado un aplazamiento a octubre de 2028 que no está publicado.",
    ],
    [
      "¿Es obligatorio VeriFactu?",
      "Sí, pero no para todo el mundo a la vez ni de la forma en que suele contarse. Lo obligatorio es que el sistema informático con el que facturáis cumpla el reglamento. Enviar los registros a la Agencia Tributaria en el momento —el modo VeriFactu propiamente dicho— es voluntario: la alternativa es conservarlos firmados con requisitos más estrictos.",
    ],
    [
      "¿Verifactu y factura electrónica es lo mismo?",
      "No. VeriFactu regula cómo se emite la factura para que no pueda manipularse. La factura electrónica entre empresas regula el formato en que la factura viaja hasta el cliente. Son dos reglamentos distintos con calendarios distintos, y se puede incumplir uno cumpliendo el otro.",
    ],
    [
      "¿Quién está exento de VeriFactu?",
      "Quedan fuera quienes ya llevan el Suministro Inmediato de Información (SII), los que facturan en territorios forales con su propio sistema y las operaciones por las que no hay obligación de expedir factura. Estar en módulos no exime por sí solo: lo que importa es si tenéis que emitir factura.",
    ],
    [
      "¿Me multan si no tengo VeriFactu el 1 de enero de 2027?",
      "La sanción de 50.000 € por ejercicio del artículo 201 bis de la Ley General Tributaria castiga tener un sistema que debiendo estar certificado no lo está, o uno certificado que se ha alterado. No es una multa automática por llegar tarde a una fecha. Dicho esto, facturar con un sistema que no cumple es exactamente el supuesto que describe el artículo.",
    ],
    [
      "¿Puedo seguir facturando con Excel?",
      "Una hoja de cálculo no puede cumplir el reglamento: no firma, no encadena huellas y permite retocar lo ya emitido. Lo que sí sigue siendo legal es el talonario en papel en los casos en que se admite factura en papel, pero en cuanto se emite con un sistema informático, ese sistema tiene que cumplir.",
    ],
  ],
  en: [
    [
      "When does VeriFactu come into force?",
      "For companies paying Spanish corporate income tax, before 1 January 2027. For the self-employed and all other taxpayers, before 1 July 2027. Those are the dates in the fourth final provision of Royal Decree 1007/2023 as consolidated. A postponement to October 2028 has been announced but not published.",
    ],
    [
      "Is VeriFactu compulsory?",
      "Yes, but not for everyone at once and not in the way it is usually told. What is compulsory is that the system you invoice with complies with the regulation. Sending the records to the tax agency as you issue — VeriFactu mode proper — is voluntary: the alternative is keeping them signed under stricter requirements.",
    ],
    [
      "Are VeriFactu and e-invoicing the same thing?",
      "No. VeriFactu governs how an invoice is issued so it cannot be tampered with. Business-to-business e-invoicing governs the format the invoice travels in to reach the customer. Two separate regulations with separate timetables, and you can breach one while complying with the other.",
    ],
    [
      "Who is exempt from VeriFactu?",
      "Those already on the immediate supply of information regime (SII), those invoicing in the foral territories under their own system, and transactions with no duty to issue an invoice. Being on a simplified tax regime does not exempt you by itself: what matters is whether you have to issue invoices.",
    ],
    [
      "Will I be fined if I do not have VeriFactu by 1 January 2027?",
      "The €50,000 per financial year penalty in article 201 bis of the General Tax Act punishes holding a system that should be certified and is not, or a certified one that has been tampered with. It is not an automatic fine for missing a date. That said, invoicing with a non-compliant system is precisely the situation the article describes.",
    ],
    [
      "Can I keep invoicing with Excel?",
      "A spreadsheet cannot meet the regulation: it does not sign, it does not chain hashes and it lets you alter what has already been issued. Paper invoice books remain legal where paper invoices are allowed, but the moment you issue from a computer system, that system has to comply.",
    ],
  ],
  de: [
    [
      "Wann tritt VeriFactu in Kraft?",
      "Für körperschaftsteuerpflichtige Unternehmen vor dem 1. Januar 2027. Für Selbstständige und übrige Steuerpflichtige vor dem 1. Juli 2027. Das sind die Fristen der vierten Schlussbestimmung des Königlichen Dekrets 1007/2023 in der konsolidierten Fassung. Eine Verschiebung auf Oktober 2028 ist angekündigt, aber nicht veröffentlicht.",
    ],
    [
      "Ist VeriFactu verpflichtend?",
      "Ja, aber nicht für alle gleichzeitig und nicht so, wie es meist dargestellt wird. Verpflichtend ist, dass das System, mit dem Sie fakturieren, die Verordnung erfüllt. Die Datensätze beim Ausstellen an die Steuerverwaltung zu senden — der eigentliche VeriFactu-Modus — ist freiwillig: die Alternative ist, sie signiert und unter strengeren Auflagen aufzubewahren.",
    ],
    [
      "Sind VeriFactu und E-Rechnung dasselbe?",
      "Nein. VeriFactu regelt, wie eine Rechnung erstellt wird, damit sie nicht manipulierbar ist. Die E-Rechnung zwischen Unternehmen regelt das Format, in dem die Rechnung zum Kunden gelangt. Zwei getrennte Verordnungen mit getrennten Fristen — man kann die eine verletzen und die andere erfüllen.",
    ],
    [
      "Wer ist von VeriFactu befreit?",
      "Wer bereits am Sofortmeldeverfahren SII teilnimmt, wer in den Foralgebieten nach deren eigenem System fakturiert, und Umsätze ohne Rechnungsstellungspflicht. Eine pauschale Besteuerung befreit für sich genommen nicht: entscheidend ist, ob Sie Rechnungen ausstellen müssen.",
    ],
    [
      "Werde ich bestraft, wenn ich am 1. Januar 2027 kein VeriFactu habe?",
      "Die Geldbuße von 50.000 € je Geschäftsjahr nach Artikel 201 bis des Allgemeinen Steuergesetzes ahndet den Betrieb eines Systems, das zertifiziert sein müsste und es nicht ist, oder eines manipulierten zertifizierten Systems. Sie ist keine automatische Strafe für ein verpasstes Datum. Allerdings ist das Fakturieren mit einem nicht konformen System genau der im Artikel beschriebene Fall.",
    ],
    [
      "Kann ich weiter mit Excel fakturieren?",
      "Eine Tabellenkalkulation kann die Verordnung nicht erfüllen: sie signiert nicht, verkettet keine Hashes und lässt Änderungen an bereits Ausgestelltem zu. Papierrechnungsblöcke bleiben zulässig, wo Papierrechnungen erlaubt sind; sobald Sie aber aus einem IT-System heraus ausstellen, muss dieses System die Vorgaben erfüllen.",
    ],
  ],
};

/* Las mismas fuentes que /obligaciones para VeriFactu, más la Ley
   General Tributaria, que aquí hace falta porque esta página sí da las
   cifras de sanción. */
export const FUENTES_VERIFACTU = [
  {
    nombre: "RD 1007/2023, de 5 de diciembre (texto consolidado)",
    boe: "BOE-A-2023-24840",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840",
  },
  {
    nombre: "RD-ley 15/2025, de 2 de diciembre",
    boe: "BOE-A-2025-24446",
    url: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-24446",
  },
  {
    nombre: "Ley 58/2003, General Tributaria, art. 201 bis (texto consolidado)",
    boe: "BOE-A-2003-23186",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186",
  },
  {
    nombre: "Sede electrónica de la AEAT: sistemas informáticos de facturación",
    boe: "AEAT",
    url: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html",
  },
] as const;
