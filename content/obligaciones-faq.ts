import type { ParFaq } from "@/content/blog-faq";

/* ============================================================
   PREGUNTAS DE /obligaciones

   LA REGLA DE ORO, la misma que en content/blog-faq.ts: cada respuesta
   tiene que poder leerse suelta, sin la pregunta delante y sin la
   página alrededor, porque así es como la recorta una AI Overview o
   ChatGPT cuando la cita.

   Y UNA SEGUNDA REGLA QUE SOLO APLICA AQUÍ: ninguna respuesta lleva una
   cifra, una fecha o un artículo que no se haya leído en el BOE. No en
   una gestoría, no en un blog de un competidor, no de memoria. Toda la
   ventaja de esta página frente a las mil que hay sobre lo mismo es que
   no se equivoca; el día que se equivoque una vez, no sirve para nada.

   LO QUE SE HA DEJADO FUERA A PROPÓSITO: las cuantías de las sanciones.
   El régimen está en el artículo 201 bis de la Ley General Tributaria,
   y eso se dice; los importes no se han podido leer en el consolidado
   del BOE y por tanto no se publican. Si alguien los verifica, se
   añaden aquí con su cita.
   ============================================================ */

type PorIdioma = { readonly es: readonly ParFaq[]; readonly en: readonly ParFaq[]; readonly de: readonly ParFaq[] };

export const FAQ_OBLIGACIONES = {
  es: [
    [
      "¿Es obligatoria ya la factura electrónica entre empresas?",
      "Todavía no, pero el reloj ya corre. El Real Decreto 238/2026 dejó los plazos colgando de una orden ministerial, y esa orden —la Orden HAC/1028/2026— entró en vigor el 6 de octubre de 2026. Desde ese día cuentan doce meses para las empresas que superaron los 8 millones de euros de volumen de operaciones el año anterior, es decir el 6 de octubre de 2027, y veinticuatro meses para todos los demás, incluidos autónomos: el 6 de octubre de 2028.",
    ],
    [
      "¿Un PDF enviado por correo cuenta como factura electrónica?",
      "No. La factura electrónica obligatoria es un fichero estructurado que el programa de quien la recibe lee por su cuenta, sin que nadie teclee nada. Un PDF es una imagen de una factura para que la lea una persona. Durante los doce primeros meses, las empresas de más de 8 millones de euros tienen que acompañar la factura electrónica de un PDF legible, pero el PDF acompaña: no sustituye.",
    ],
    [
      "¿VeriFactu y la factura electrónica son lo mismo?",
      "No, y confundirlos es el error más caro de los dos. VeriFactu va de cómo se emite la factura: obliga a que el programa la firme y encadene su huella para que no se pueda borrar ni retocar después. La factura electrónica va de cómo viaja: obliga a que llegue al cliente en un formato que su programa entienda solo. Son dos normas distintas, con dos calendarios distintos, y hay que cumplir las dos.",
    ],
    [
      "¿Hay que cambiar de programa de facturación?",
      "No necesariamente. Lo que obliga VeriFactu es que el programa cumpla, no que sea uno nuevo. Muchos fabricantes están adaptando el suyo, porque a ellos la norma les obliga desde el 29 de julio de 2025. Lo que conviene es preguntar a vuestro proveedor dos cosas por escrito: si la versión que tenéis contratada va a cumplir, y si la adaptación entra en el mantenimiento o se paga aparte.",
    ],
    [
      "¿Es obligatorio fichar con una aplicación?",
      "No. Registrar la jornada de cada persona es obligatorio desde el 12 de mayo de 2019, pero la ley no dice cómo: el papel sigue siendo válido mientras el registro sea diario, fiable y se conserve cuatro años. Hay un proyecto de real decreto que obligaría a que el registro sea digital y consultable a distancia, pero a 1 de noviembre de 2026 no está publicado en el BOE y por tanto no obliga.",
    ],
    [
      "¿Por qué tantas fuentes dicen que el fichaje digital ya es obligatorio?",
      "Porque la mayoría de las páginas que explican el registro horario las escribe alguien que vende una aplicación de fichaje. El proyecto de real decreto lleva en tramitación desde 2025 y durante 2026 se han anunciado varias fechas de aprobación que no se han cumplido. Mientras el texto no salga en el Boletín Oficial del Estado, lo que obliga sigue siendo el artículo 34.9 del Estatuto de los Trabajadores, que no exige medio digital.",
    ],
    [
      "¿Qué pasa si no se cumple?",
      "La Ley General Tributaria tiene un régimen sancionador propio para los sistemas informáticos de facturación, en su artículo 201 bis, que castiga tanto tener o usar sistemas que no cumplan como fabricarlos o venderlos. En el registro de jornada, la falta del registro es una infracción en materia de relaciones laborales y la vigila la Inspección de Trabajo. Las cuantías dependen del caso y conviene confirmarlas con vuestra asesoría.",
    ],
    [
      "Somos una empresa pequeña de Mallorca, ¿por dónde empezamos?",
      "Por preguntar a quien ya os vende el programa, antes de comprar nada. Si factura con software, escribidle al proveedor y pedid por escrito si cumple VeriFactu y qué piensa hacer con la factura electrónica. Si facturáis con Excel o con plantillas de Word, ahí sí hay que montar algo antes de 2027. Y si lo que lleváis a mano son los partes y las horas, eso no lo obliga ninguna norma: se cambia cuando compense, no por miedo.",
    ],
  ],
  en: [
    [
      "Is business-to-business e-invoicing already mandatory in Spain?",
      "Not yet, but the clock is running. Royal Decree 238/2026 left the deadlines hanging on a ministerial order, and that order — Orden HAC/1028/2026 — came into force on 6 October 2026. From that date, businesses whose turnover exceeded €8 million the previous year have twelve months, so 6 October 2027, and everyone else, self-employed included, has twenty-four months: 6 October 2028.",
    ],
    [
      "Does a PDF sent by email count as an electronic invoice?",
      "No. A mandatory electronic invoice is a structured file that the recipient's software reads by itself, with nobody typing anything. A PDF is a picture of an invoice for a person to read. For the first twelve months, businesses over €8 million must send a legible PDF alongside the electronic invoice, but the PDF accompanies it: it does not replace it.",
    ],
    [
      "Are VeriFactu and e-invoicing the same thing?",
      "No, and mixing them up is the costlier of the two mistakes. VeriFactu is about how an invoice is issued: the software has to sign it and chain its hash so it cannot be deleted or altered afterwards. E-invoicing is about how it travels: it has to reach the customer in a format their software understands on its own. Two separate rules, two separate timetables, and both have to be met.",
    ],
    [
      "Do we have to change our invoicing software?",
      "Not necessarily. VeriFactu requires the software to comply, not that it be new. Most vendors are adapting theirs, because the rule has bound them since 29 July 2025. What is worth doing is asking your provider two things in writing: whether the version you pay for will comply, and whether the upgrade is covered by your maintenance contract or billed separately.",
    ],
    [
      "Is a time-clock app mandatory in Spain?",
      "No. Recording each employee's hours has been mandatory since 12 May 2019, but the law does not say how: paper remains valid as long as the record is daily, reliable and kept for four years. A draft royal decree would require records to be digital and remotely accessible, but as of 1 November 2026 it has not been published in the official gazette, so it does not bind.",
    ],
    [
      "Why do so many sources say digital time tracking is already mandatory?",
      "Because most pages explaining Spanish time-recording rules are written by someone selling a time-clock app. The draft royal decree has been in process since 2025, and several approval dates announced during 2026 came and went. Until the text appears in the official gazette, what binds is article 34.9 of the Workers' Statute, which does not require a digital medium.",
    ],
    [
      "What happens if we do not comply?",
      "Spain's General Tax Act has its own penalty regime for invoicing software, in article 201 bis, covering both holding or using non-compliant systems and producing or selling them. For working-time records, a missing register is an offence in employment law and the Labour Inspectorate enforces it. The amounts depend on the case and are worth confirming with your accountant.",
    ],
    [
      "We are a small business in Mallorca. Where do we start?",
      "By asking whoever already sells you the software, before buying anything. If you invoice with a program, write to the vendor and ask in writing whether it meets VeriFactu and what the plan is for e-invoicing. If you invoice with Excel or Word templates, that is where something does have to be built before 2027. And if what you still do by hand is job reports and hours, no rule forces that: change it when it pays off, not out of fear.",
    ],
  ],
  de: [
    [
      "Ist die elektronische Rechnung zwischen Unternehmen in Spanien schon Pflicht?",
      "Noch nicht, aber die Frist läuft. Das Königliche Dekret 238/2026 machte die Fristen von einer Ministerialverordnung abhängig, und diese Verordnung — Orden HAC/1028/2026 — trat am 6. Oktober 2026 in Kraft. Ab diesem Tag gelten zwölf Monate für Betriebe, deren Umsatz im Vorjahr 8 Millionen Euro überstieg, also der 6. Oktober 2027, und vierundzwanzig Monate für alle übrigen, auch Selbstständige: der 6. Oktober 2028.",
    ],
    [
      "Gilt ein per E-Mail verschicktes PDF als elektronische Rechnung?",
      "Nein. Die verpflichtende elektronische Rechnung ist eine strukturierte Datei, die die Software des Empfängers selbst liest, ohne dass jemand etwas eintippt. Ein PDF ist ein Abbild einer Rechnung für einen Menschen. In den ersten zwölf Monaten müssen Betriebe über 8 Millionen Euro ein lesbares PDF beilegen, aber das PDF begleitet die Rechnung: es ersetzt sie nicht.",
    ],
    [
      "Sind VeriFactu und die elektronische Rechnung dasselbe?",
      "Nein, und sie zu verwechseln ist der teurere der beiden Fehler. Bei VeriFactu geht es darum, wie eine Rechnung erstellt wird: die Software muss sie signieren und ihren Hash verketten, damit sie nachträglich nicht gelöscht oder verändert werden kann. Bei der elektronischen Rechnung geht es darum, wie sie übermittelt wird: in einem Format, das die Software des Kunden allein versteht. Zwei Vorschriften, zwei Zeitpläne, beide sind einzuhalten.",
    ],
    [
      "Müssen wir unsere Rechnungssoftware wechseln?",
      "Nicht zwingend. VeriFactu verlangt, dass die Software die Vorgaben erfüllt, nicht dass sie neu ist. Die meisten Hersteller passen ihre Produkte an, denn für sie gilt die Pflicht seit dem 29. Juli 2025. Sinnvoll ist, den Anbieter zwei Dinge schriftlich zu fragen: ob die von Ihnen gebuchte Version die Vorgaben erfüllt und ob die Anpassung im Wartungsvertrag enthalten ist oder getrennt berechnet wird.",
    ],
    [
      "Ist eine Zeiterfassungs-App in Spanien Pflicht?",
      "Nein. Die Erfassung der Arbeitszeit jeder beschäftigten Person ist seit dem 12. Mai 2019 Pflicht, das Gesetz schreibt aber keine Form vor: Papier bleibt zulässig, solange täglich, verlässlich erfasst und vier Jahre aufbewahrt wird. Ein Entwurf eines Königlichen Dekrets würde eine digitale, aus der Ferne einsehbare Erfassung verlangen, ist aber zum 1. November 2026 nicht im Gesetzblatt veröffentlicht und gilt daher nicht.",
    ],
    [
      "Warum behaupten so viele Quellen, die digitale Zeiterfassung sei bereits Pflicht?",
      "Weil die meisten Seiten zur spanischen Zeiterfassung von jemandem stammen, der eine Zeiterfassungs-App verkauft. Der Entwurf des Königlichen Dekrets ist seit 2025 im Verfahren, und mehrere für 2026 angekündigte Termine verstrichen folgenlos. Solange der Text nicht im Gesetzblatt steht, gilt Artikel 34.9 des Arbeitnehmerstatuts, der kein digitales Medium verlangt.",
    ],
    [
      "Was passiert, wenn wir die Vorgaben nicht erfüllen?",
      "Das spanische Abgabengesetz hat in Artikel 201 bis ein eigenes Sanktionsregime für Rechnungssoftware, das sowohl das Vorhalten und Nutzen nicht konformer Systeme als auch deren Herstellung und Vertrieb erfasst. Bei der Arbeitszeiterfassung ist ein fehlendes Register ein arbeitsrechtlicher Verstoß, den die Arbeitsinspektion verfolgt. Die Höhe hängt vom Einzelfall ab und sollte mit der Steuerberatung geklärt werden.",
    ],
    [
      "Wir sind ein kleiner Betrieb auf Mallorca. Womit fangen wir an?",
      "Damit, den bisherigen Softwareanbieter zu fragen, bevor Sie etwas kaufen. Wenn Sie mit einem Programm fakturieren, lassen Sie sich schriftlich bestätigen, ob es VeriFactu erfüllt und was für die elektronische Rechnung geplant ist. Wenn Sie mit Excel oder Word-Vorlagen fakturieren, muss dort vor 2027 etwas aufgebaut werden. Und wenn Sie Arbeitsberichte und Stunden von Hand führen: das verlangt keine Vorschrift — das ändert man, wenn es sich lohnt, nicht aus Angst.",
    ],
  ],
} as const satisfies PorIdioma;
