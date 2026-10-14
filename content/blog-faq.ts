/* ============================================================
   PREGUNTAS FRECUENTES DE LOS ARTÍCULOS DEL BLOG

   Están aquí y no dentro de cada .mdx por el mismo motivo que las de
   la portada (ver content/faq-portada.ts): el artículo las pinta y
   también las publica como datos estructurados, y dos copias escritas
   a mano acaban contradiciéndose el día que se cambie una.

   CÓMO SE ESCRIBE UNA RESPUESTA AQUÍ. Tiene que poder leerse suelta,
   sin la pregunta delante y sin el artículo alrededor: así es como la
   recorta una AI Overview o ChatGPT cuando la cita. Nada de «como
   decíamos arriba» ni «en el caso anterior».

   Y tiene que ser verdad aunque se lea sin contexto. Si una respuesta
   depende de la configuración de cada empresa, se dice en la propia
   respuesta.
   ============================================================ */

export type ParFaq = readonly [pregunta: string, respuesta: string];
type PorIdioma = { readonly es: readonly ParFaq[]; readonly en: readonly ParFaq[]; readonly de: readonly ParFaq[] };

export const FAQ_PRESUPUESTOS = {
  es: [
    [
      "¿Podemos automatizar los presupuestos si ahora usamos Excel?",
      "Sí, y Excel puede seguir formando parte del proceso. A veces basta con rehacer las plantillas y las fórmulas; otras conviene conectar esos datos con un CRM, un formulario web o una aplicación a medida. Tirar la hoja de cálculo no es un requisito para empezar.",
    ],
    [
      "¿Se pueden generar presupuestos desde nuestra página web?",
      "Sí. Un configurador recoge las opciones que elige el cliente, aplica las reglas de precio de la empresa y devuelve una estimación o un presupuesto completo. Hasta dónde llega depende de cuántas variantes tenga el producto o el servicio.",
    ],
    [
      "¿Qué empresas de Mallorca sacan partido a un configurador de presupuestos?",
      "Sobre todo las que calculan precios por medidas, materiales, cantidades o condiciones particulares: carpinterías, empresas de reformas, instaladores, fabricantes y empresas de mantenimiento. Si el precio sale de una visita a la obra, el configurador aporta menos.",
    ],
    [
      "¿Hay que cambiar el programa de gestión que ya usamos?",
      "No necesariamente. Antes de sustituir una herramienta conviene comprobar si se puede integrar con el resto del proceso. Cambiar de programa solo tiene sentido cuando hay una razón concreta, no porque el nuevo sea más moderno.",
    ],
    [
      "¿Cuánto tiempo se ahorra automatizando los presupuestos?",
      "Depende de cuántos presupuestos se hagan, de lo complicado que sea cada cálculo y de cuánto trabajo manual se quite. La forma honesta de saberlo es cronometrar lo que cuesta hoy preparar uno y comparar con el proceso nuevo, en vez de fiarse de un porcentaje genérico.",
    ],
  ],
  en: [
    [
      "Can we automate quotes if we currently use Excel?",
      "Yes, and Excel can stay part of the process. Sometimes it is enough to rebuild the templates and formulas; other times it is worth connecting that data to a CRM, a web form or a custom application. Throwing away the spreadsheet is not a prerequisite.",
    ],
    [
      "Can quotes be generated from our website?",
      "Yes. A configurator collects the options the customer selects, applies the company's pricing rules and returns an estimate or a full quote. How far it goes depends on how many variants the product or service has.",
    ],
    [
      "Which businesses in Mallorca benefit from a quote configurator?",
      "Mainly those that price by measurements, materials, quantities or particular conditions: joineries, renovation firms, installers, manufacturers and maintenance companies. If the price comes out of a site visit, a configurator adds less.",
    ],
    [
      "Do we have to replace the management software we already use?",
      "Not necessarily. Before replacing a tool it is worth checking whether it can be integrated with the rest of the process. Switching systems only makes sense when there is a concrete reason, not because the new one is more modern.",
    ],
    [
      "How much time does automating quotes actually save?",
      "It depends on how many quotes you produce, how complex each calculation is and how much manual work disappears. The honest way to find out is to time what preparing one costs you today and compare it with the new process, rather than trusting a generic percentage.",
    ],
  ],
  de: [
    [
      "Können wir Angebote automatisieren, wenn wir heute Excel nutzen?",
      "Ja, und Excel kann Teil des Prozesses bleiben. Manchmal genügt es, Vorlagen und Formeln neu aufzubauen; manchmal lohnt es sich, diese Daten mit einem CRM, einem Webformular oder einer individuellen Anwendung zu verbinden. Die Tabelle wegzuwerfen ist keine Voraussetzung.",
    ],
    [
      "Lassen sich Angebote über unsere Website erstellen?",
      "Ja. Ein Konfigurator nimmt die Optionen auf, die der Kunde wählt, wendet die Preisregeln des Unternehmens an und gibt eine Schätzung oder ein vollständiges Angebot aus. Wie weit er geht, hängt davon ab, wie viele Varianten das Produkt oder die Leistung hat.",
    ],
    [
      "Welche Betriebe auf Mallorca profitieren von einem Angebotskonfigurator?",
      "Vor allem solche, die nach Maßen, Materialien, Mengen oder besonderen Bedingungen kalkulieren: Schreinereien, Renovierungsbetriebe, Installateure, Hersteller und Wartungsfirmen. Entsteht der Preis erst bei der Besichtigung, bringt ein Konfigurator weniger.",
    ],
    [
      "Müssen wir die Software wechseln, die wir schon nutzen?",
      "Nicht unbedingt. Bevor man ein Werkzeug ersetzt, lohnt die Prüfung, ob es sich in den übrigen Prozess einbinden lässt. Ein Wechsel ergibt nur Sinn, wenn es einen konkreten Grund gibt — nicht, weil das Neue moderner ist.",
    ],
    [
      "Wie viel Zeit spart die Automatisierung von Angeboten?",
      "Das hängt davon ab, wie viele Angebote Sie schreiben, wie komplex jede Kalkulation ist und wie viel Handarbeit wegfällt. Ehrlich beantworten lässt sich das nur, indem Sie messen, was ein Angebot heute kostet, und es mit dem neuen Ablauf vergleichen.",
    ],
  ],
} as const satisfies PorIdioma;

export const FAQ_AVISOS = {
  es: [
    [
      "¿Cómo organizamos las llamadas perdidas de la empresa?",
      "El punto de partida es un registro compartido que diga quién llamó, por qué, quién tiene que contestar y si ya se ha devuelto la llamada. Si el volumen es alto, un sistema integrado puede registrar parte de eso solo y avisar de lo que lleva demasiado tiempo abierto.",
    ],
    [
      "¿Se pueden centralizar WhatsApp, llamadas y correos en un mismo panel?",
      "Sí, con las integraciones adecuadas para cada canal. Lo que se puede conectar depende de la centralita o el servicio telefónico, de cómo esté montado el WhatsApp de la empresa y del gestor de correo. Antes de montarlo conviene decidir qué información hay que registrar de cada aviso.",
    ],
    [
      "¿CentralAvisos sirve para empresas de mantenimiento y multiservicios?",
      "Es uno de los casos para los que está pensado: empresas que reciben avisos, coordinan técnicos y necesitan saber en qué estado está cada solicitud. Encajar o no depende de cómo trabaje cada empresa y de qué canales haya que conectar.",
    ],
    [
      "¿Hay que cambiar de número de WhatsApp o de teléfono?",
      "No. CentralAvisos está pensado para que la empresa siga con su número de siempre. Lo que se puede conectar en cada caso depende del servicio telefónico contratado y de la configuración de cada canal.",
    ],
    [
      "¿Podemos saber qué incidencias siguen pendientes?",
      "Sí: un panel muestra los avisos abiertos, quién los lleva y en qué estado están. Para que ese panel sirva, el equipo tiene que registrar y actualizar la información según el proceso acordado; ninguna herramienta adivina lo que no se le cuenta.",
    ],
    [
      "¿Cuánto cuesta un sistema de gestión de avisos?",
      "CentralAvisos empieza en 89 € al mes y sin permanencia, con los datos alojados en la Unión Europea. Lo que se salga de ahí —canales poco habituales, integraciones con un sistema propio— se valora aparte, porque el trabajo no es el mismo.",
    ],
  ],
  en: [
    [
      "How do we get on top of missed calls?",
      "The starting point is a shared log recording who called, why, who has to answer and whether the call has been returned. If the volume is high, an integrated system can record part of that automatically and flag anything that has been open too long.",
    ],
    [
      "Can WhatsApp, calls and emails be brought into one panel?",
      "Yes, with the right integration for each channel. What can be connected depends on the phone system, how the company's WhatsApp is set up and the email provider. Before building it, decide what information each request needs to record.",
    ],
    [
      "Does CentralAvisos work for maintenance and multi-service companies?",
      "That is one of the cases it was designed for: companies that receive service requests, coordinate technicians and need to know the status of each one. Whether it fits depends on how the company works and which channels need connecting.",
    ],
    [
      "Do we have to change our WhatsApp number or phone number?",
      "No. CentralAvisos is designed so the company keeps the number it already has. What can be connected in each case depends on the phone service and the configuration of each channel.",
    ],
    [
      "Can we see which jobs are still open?",
      "Yes: a dashboard shows open requests, who owns them and what state they are in. For that dashboard to be worth anything, the team has to record and update information according to the agreed process; no tool guesses what nobody tells it.",
    ],
    [
      "How much does a service-request system cost?",
      "CentralAvisos starts at €89 a month with no lock-in, with data hosted in the European Union. Anything beyond that — unusual channels, integrations with an in-house system — is quoted separately, because it is not the same job.",
    ],
  ],
  de: [
    [
      "Wie bekommen wir verpasste Anrufe in den Griff?",
      "Der Anfang ist ein gemeinsames Protokoll: wer angerufen hat, weshalb, wer antworten muss und ob zurückgerufen wurde. Bei hohem Aufkommen kann ein integriertes System einen Teil davon automatisch erfassen und melden, was zu lange offen ist.",
    ],
    [
      "Lassen sich WhatsApp, Anrufe und E-Mails in einem Panel bündeln?",
      "Ja, mit der passenden Anbindung je Kanal. Was sich verbinden lässt, hängt von der Telefonanlage, der Einrichtung des Firmen-WhatsApp und dem E-Mail-Anbieter ab. Vor der Einführung sollte feststehen, welche Angaben zu jeder Anfrage erfasst werden.",
    ],
    [
      "Eignet sich CentralAvisos für Wartungs- und Multiservice-Betriebe?",
      "Das ist einer der Fälle, für die es gedacht ist: Betriebe, die Aufträge annehmen, Techniker koordinieren und den Stand jeder Anfrage kennen müssen. Ob es passt, hängt von der Arbeitsweise und den anzubindenden Kanälen ab.",
    ],
    [
      "Müssen wir unsere WhatsApp- oder Telefonnummer wechseln?",
      "Nein. CentralAvisos ist so angelegt, dass der Betrieb seine gewohnte Nummer behält. Was sich im Einzelfall anbinden lässt, hängt vom Telefondienst und der Konfiguration des jeweiligen Kanals ab.",
    ],
    [
      "Können wir sehen, welche Vorgänge noch offen sind?",
      "Ja: Ein Dashboard zeigt offene Aufträge, die zuständige Person und den Status. Damit das Dashboard etwas taugt, muss das Team die Angaben nach dem vereinbarten Ablauf erfassen und pflegen; kein Werkzeug errät, was ihm niemand sagt.",
    ],
    [
      "Was kostet ein System zur Auftragsannahme?",
      "CentralAvisos beginnt bei 89 € im Monat, ohne Mindestlaufzeit und mit Daten in der Europäischen Union. Alles darüber hinaus — ungewöhnliche Kanäle, Anbindung an ein eigenes System — wird gesondert bewertet, weil es nicht dieselbe Arbeit ist.",
    ],
  ],
} as const satisfies PorIdioma;

export const FAQ_VERIFACTU = {
  es: [
    [
      "¿Cuándo es obligatorio VeriFactu?",
      "Para las empresas que tributan por el Impuesto sobre Sociedades, el 1 de enero de 2027; para autónomos y el resto de obligados, el 1 de julio de 2027, según el Real Decreto-ley 15/2025. El 5 de octubre de 2026 el Ministerio de Hacienda anunció retrasarlo a octubre de 2028 para quien factura menos de ocho millones de euros, pero ese aplazamiento no está publicado en el BOE: hasta que lo esté, las fechas que obligan son las de 2027.",
    ],
    [
      "¿VeriFactu obliga a enviar todas las facturas a Hacienda?",
      "Solo si se elige esa modalidad. El Reglamento (RD 1007/2023) permite dos: remitir cada registro de facturación a la Agencia Tributaria en el momento de emitirlo, que es la modalidad llamada VERI*FACTU, o conservarlo firmado y encadenado en el propio sistema, a disposición de la Agencia si lo reclama. La segunda exige además que los registros estén firmados electrónicamente.",
    ],
    [
      "¿Me vale el Excel donde hago las facturas ahora?",
      "No. El Reglamento exige que el programa genere un registro de facturación por cada factura, lo encadene con el anterior mediante una huella digital y no permita borrar ni alterar nada sin dejar rastro. Una hoja de cálculo no hace nada de eso, y además el fabricante del programa tiene que emitir una declaración responsable de que cumple, cosa que nadie puede emitir sobre una hoja propia.",
    ],
    [
      "¿Qué pasa si emito pocas facturas al año?",
      "La obligación no depende del número de facturas. Depende de quién sea el obligado tributario y de la fecha que le corresponda. Un autónomo que emite doce facturas al año está igual de obligado que una empresa que emite mil, y tiene exactamente el mismo plazo.",
    ],
    [
      "¿Tengo que cambiar de programa de facturación?",
      "Solo si el que usáis no va a adaptarse. Lo primero es preguntarle a vuestro proveedor actual, por escrito, si va a emitir la declaración responsable y en qué fecha tendrá la versión lista. Si la respuesta es clara y creíble, no hay nada que hacer. Si no contesta o contesta con vaguedades, ahí es donde conviene empezar a mirar alternativas, y con tiempo.",
    ],
    [
      "¿Qué es el registro de alta de una factura?",
      "Es el apunte que el programa genera en el momento de emitir una factura y que recoge sus datos esenciales junto con la huella digital que lo enlaza con el registro anterior. Esa cadena es lo que permite demostrar que no se ha borrado ni modificado ninguna factura por el camino: si falta un eslabón, se nota.",
    ],
  ],
  en: [
    [
      "When does VeriFactu become mandatory?",
      "For companies paying Spanish corporate income tax, on 1 January 2027; for the self-employed and other taxpayers, on 1 July 2027, under Royal Decree-Law 15/2025. On 5 October 2026 the Spanish Ministry of Finance announced a delay to October 2028 for those invoicing under eight million euros, but that postponement has not been published in the official gazette: until it is, the 2027 dates are the ones that bind.",
    ],
    [
      "Does VeriFactu mean sending every invoice to the tax agency?",
      "Only if you choose that mode. The regulation (RD 1007/2023) allows two: sending each invoicing record to the tax agency as it is issued, which is the mode called VERI*FACTU, or keeping it signed and chained within your own system, available to the agency on request. The second also requires the records to be electronically signed.",
    ],
    [
      "Can I keep using the spreadsheet I invoice with now?",
      "No. The regulation requires the software to generate an invoicing record for every invoice, chain it to the previous one with a digital fingerprint, and make it impossible to delete or alter anything without leaving a trace. A spreadsheet does none of that, and the software maker also has to issue a formal declaration of compliance, which nobody can issue about a spreadsheet of your own.",
    ],
    [
      "What if I only issue a few invoices a year?",
      "The obligation does not depend on how many invoices you issue. It depends on who the taxpayer is and which date applies to them. A sole trader issuing twelve invoices a year is as bound as a company issuing a thousand, with exactly the same deadline.",
    ],
    [
      "Do I have to change invoicing software?",
      "Only if the one you use is not going to adapt. The first step is to ask your current provider, in writing, whether they will issue the declaration of compliance and when the ready version will be available. If the answer is clear and credible, there is nothing to do. If they do not reply, or reply vaguely, that is when it is worth looking at alternatives, with time to spare.",
    ],
    [
      "What is an invoice registration record?",
      "It is the entry the software creates the moment an invoice is issued, holding its essential data together with the digital fingerprint that links it to the previous record. That chain is what proves no invoice has been deleted or altered along the way: a missing link shows.",
    ],
  ],
  de: [
    [
      "Ab wann ist VeriFactu Pflicht?",
      "Für körperschaftsteuerpflichtige Unternehmen ab dem 1. Januar 2027, für Selbstständige und übrige Steuerpflichtige ab dem 1. Juli 2027, nach dem Königlichen Gesetzesdekret 15/2025. Am 5. Oktober 2026 kündigte das spanische Finanzministerium eine Verschiebung auf Oktober 2028 für alle mit weniger als acht Millionen Euro Umsatz an; diese Verschiebung ist jedoch nicht im Gesetzblatt veröffentlicht. Bis dahin gelten die Fristen von 2027.",
    ],
    [
      "Müssen mit VeriFactu alle Rechnungen an die Steuerbehörde gehen?",
      "Nur wenn Sie diese Variante wählen. Die Verordnung (RD 1007/2023) lässt zwei zu: jeden Rechnungsdatensatz im Moment der Ausstellung an die Steuerverwaltung zu senden, das ist die Variante VERI*FACTU, oder ihn signiert und verkettet im eigenen System aufzubewahren, abrufbar für die Behörde. Die zweite verlangt zusätzlich die elektronische Signatur der Datensätze.",
    ],
    [
      "Reicht die Tabelle, mit der ich jetzt Rechnungen schreibe?",
      "Nein. Die Verordnung verlangt, dass die Software zu jeder Rechnung einen Datensatz erzeugt, ihn über einen digitalen Fingerabdruck mit dem vorherigen verkettet und kein spurloses Löschen oder Ändern zulässt. Eine Tabellenkalkulation leistet nichts davon, und der Softwarehersteller muss zudem eine Konformitätserklärung abgeben, die niemand über eine eigene Tabelle abgeben kann.",
    ],
    [
      "Was, wenn ich nur wenige Rechnungen im Jahr schreibe?",
      "Die Pflicht hängt nicht von der Zahl der Rechnungen ab, sondern davon, wer der Steuerpflichtige ist und welches Datum für ihn gilt. Ein Selbstständiger mit zwölf Rechnungen im Jahr ist genauso gebunden wie ein Unternehmen mit tausend, und zwar mit derselben Frist.",
    ],
    [
      "Muss ich die Rechnungssoftware wechseln?",
      "Nur wenn die bisherige sich nicht anpasst. Fragen Sie zuerst Ihren jetzigen Anbieter schriftlich, ob er die Konformitätserklärung abgeben wird und wann die fertige Version vorliegt. Ist die Antwort klar und glaubwürdig, gibt es nichts zu tun. Bleibt sie aus oder bleibt sie vage, lohnt es sich, rechtzeitig Alternativen anzusehen.",
    ],
    [
      "Was ist ein Rechnungsdatensatz?",
      "Es ist der Eintrag, den die Software im Moment der Rechnungsstellung erzeugt. Er enthält die wesentlichen Daten der Rechnung und den digitalen Fingerabdruck, der ihn mit dem vorherigen Eintrag verkettet. Diese Kette belegt, dass unterwegs keine Rechnung gelöscht oder geändert wurde: ein fehlendes Glied fällt auf.",
    ],
  ],
} as const satisfies PorIdioma;

export const FAQ_CONTROL_HORARIO = {
  es: [
    [
      "¿Es obligatorio el control horario en España?",
      "Sí, desde el 12 de mayo de 2019. El artículo 34.9 del Estatuto de los Trabajadores, en la redacción que le dio el Real Decreto-ley 8/2019, obliga a toda empresa a registrar diariamente la jornada de cada persona trabajadora, con la hora de inicio y la de fin. No depende del tamaño de la empresa ni del sector.",
    ],
    [
      "¿Hay que fichar obligatoriamente de forma digital?",
      "No. La ley obliga a registrar la jornada, pero no impone el medio: un registro en papel firmado es válido si recoge lo que exige la norma y se conserva. Se ha tramitado un reglamento para exigir el registro digital y accesible en remoto, pero recibió dictamen desfavorable del Consejo de Estado y no está publicado en el BOE. Hasta que lo esté, el papel sigue siendo legal.",
    ],
    [
      "¿Cuánto tiempo hay que guardar los registros de jornada?",
      "Cuatro años. Durante ese tiempo la empresa tiene que mantenerlos a disposición de las personas trabajadoras, de sus representantes legales y de la Inspección de Trabajo y Seguridad Social.",
    ],
    [
      "¿Tienen que fichar los trabajadores que van de obra en obra?",
      "Sí. La obligación es de la empresa y alcanza a toda la plantilla, trabaje donde trabaje. Lo que cambia en el trabajo de campo no es si hay que registrar, sino cómo: ahí es donde el fichaje desde el móvil resuelve lo que una máquina en la oficina no puede, porque nadie pasa por la oficina.",
    ],
    [
      "¿Se puede exigir la ubicación al fichar?",
      "Se puede registrar la ubicación en el momento del fichaje si es proporcionada para la finalidad y se informa con claridad, pero no cabe un seguimiento continuo de la persona durante la jornada. La diferencia está en el punto concreto frente al rastro permanente, y conviene dejarla escrita en la información que se entrega a la plantilla.",
    ],
    [
      "¿El registro de jornada sirve para controlar las horas extra?",
      "Es justamente para lo que se creó. El registro diario es la prueba de cuántas horas se han hecho por encima de la jornada pactada, y es lo que permite que se paguen o se compensen. Sin registro, esa discusión se queda en la palabra de cada parte.",
    ],
  ],
  en: [
    [
      "Is time tracking mandatory in Spain?",
      "Yes, since 12 May 2019. Article 34.9 of the Workers' Statute, as worded by Royal Decree-Law 8/2019, requires every company to record each worker's day, with its start and end time. It does not depend on company size or sector.",
    ],
    [
      "Does clocking in have to be digital?",
      "No. The law requires the day to be recorded, but does not impose the means: a signed paper record is valid if it holds what the rule requires and is kept. A regulation requiring digital records accessible remotely has been drafted, but it received an unfavourable opinion from the Council of State and has not been published in the official gazette. Until it is, paper remains legal.",
    ],
    [
      "How long do time records have to be kept?",
      "Four years. During that time the company has to keep them available to the workers, to their legal representatives and to the Labour and Social Security Inspectorate.",
    ],
    [
      "Do workers who move between sites have to clock in?",
      "Yes. The obligation is the company's and covers the whole workforce, wherever they work. What changes in field work is not whether to record, but how: that is where clocking in from a phone solves what a terminal in the office cannot, because nobody passes through the office.",
    ],
    [
      "Can location be required when clocking in?",
      "Location can be recorded at the moment of clocking in if it is proportionate to the purpose and clearly disclosed, but continuous tracking of a person through the working day is not acceptable. The difference is between a single point and a permanent trail, and it is worth stating it in the notice given to staff.",
    ],
    [
      "Does the time record help with overtime?",
      "That is exactly what it was created for. The daily record is the evidence of how many hours were worked beyond the agreed day, and it is what allows them to be paid or compensated. Without a record, that discussion comes down to one side's word against the other's.",
    ],
  ],
  de: [
    [
      "Ist die Arbeitszeiterfassung in Spanien Pflicht?",
      "Ja, seit dem 12. Mai 2019. Artikel 34.9 des Arbeitnehmerstatuts in der Fassung des Königlichen Gesetzesdekrets 8/2019 verpflichtet jedes Unternehmen, den Arbeitstag jeder beschäftigten Person täglich mit Beginn und Ende zu erfassen. Das hängt weder von der Unternehmensgröße noch von der Branche ab.",
    ],
    [
      "Muss digital gestempelt werden?",
      "Nein. Das Gesetz verlangt die Erfassung, schreibt aber kein Mittel vor: eine unterschriebene Papieraufzeichnung ist gültig, wenn sie das Verlangte enthält und aufbewahrt wird. Eine Verordnung zur digitalen und aus der Ferne abrufbaren Erfassung wurde entworfen, erhielt jedoch ein ablehnendes Gutachten des Staatsrats und ist nicht im Gesetzblatt veröffentlicht. Bis dahin bleibt Papier zulässig.",
    ],
    [
      "Wie lange müssen die Aufzeichnungen aufbewahrt werden?",
      "Vier Jahre. In dieser Zeit muss das Unternehmen sie den Beschäftigten, ihren gesetzlichen Vertretungen und der Arbeits- und Sozialversicherungsinspektion zur Verfügung halten.",
    ],
    [
      "Müssen auch Beschäftigte im Außendienst stempeln?",
      "Ja. Die Pflicht trifft das Unternehmen und gilt für die gesamte Belegschaft, gleich wo sie arbeitet. Im Außendienst ändert sich nicht das Ob, sondern das Wie: Genau dort löst das Stempeln per Handy, was ein Terminal im Büro nicht kann, weil niemand im Büro vorbeikommt.",
    ],
    [
      "Darf beim Stempeln der Standort verlangt werden?",
      "Der Standort darf im Moment des Stempelns erfasst werden, wenn das für den Zweck verhältnismäßig ist und klar darüber informiert wird; eine fortlaufende Ortung der Person während des Arbeitstages ist nicht zulässig. Der Unterschied liegt zwischen einem einzelnen Punkt und einer dauerhaften Spur, und er gehört schriftlich in die Information an die Belegschaft.",
    ],
    [
      "Hilft die Zeiterfassung bei Überstunden?",
      "Dafür wurde sie geschaffen. Die tägliche Aufzeichnung belegt, wie viele Stunden über die vereinbarte Arbeitszeit hinaus geleistet wurden, und erst das ermöglicht Bezahlung oder Ausgleich. Ohne Aufzeichnung steht Aussage gegen Aussage.",
    ],
  ],
} as const satisfies PorIdioma;

export const FAQ_PARTES = {
  es: [
    [
      "¿Qué tiene que llevar un parte de trabajo?",
      "Quién lo hizo y cuándo, dónde, qué se hizo, cuánto tiempo llevó, qué materiales se emplearon y la conformidad del cliente. Con eso se puede facturar sin volver a preguntar nada. Lo que falte en el parte es una llamada a la oficina más tarde, siempre.",
    ],
    [
      "¿Tiene validez la firma del cliente en el móvil?",
      "Una firma recogida en pantalla sirve como prueba de conformidad con el trabajo realizado, que es para lo que se usa aquí. Gana fuerza cuanto mejor se identifique quién firmó y cuándo: por eso el parte guarda el nombre, la fecha y la hora junto al trazo, y no solo la imagen de la firma.",
    ],
    [
      "¿Funciona la app sin cobertura?",
      "Debe funcionar, porque medio Mallorca tiene mala cobertura en sótanos, azoteas y fincas de interior. El parte se rellena en el móvil aunque no haya red y se sincroniza cuando vuelve. Si una app exige conexión para cerrar un parte, acabará rellenándose en el coche o en casa, que es justo lo que se quería evitar.",
    ],
    [
      "¿Cómo se consigue que los técnicos la usen?",
      "Haciendo que les ahorre trabajo el primer día, no que se lo añada. Si rellenar el parte en el móvil lleva menos que escribirlo en papel y además les evita volver a la oficina o repetirlo por teléfono, se usa sola. Si es un formulario largo con campos que no sirven para nada, no hay formación que lo arregle.",
    ],
    [
      "¿Se puede facturar directamente desde el parte?",
      "Sí, y es donde está casi toda la ganancia. Las horas y los materiales del parte pasan a la factura sin teclearlos otra vez. Eso quita el paso en el que se pierden materiales sin cobrar y se retrasan las facturas una semana.",
    ],
    [
      "¿Y si cada cliente quiere su propio formato de parte?",
      "Es lo normal en mantenimiento con contrato: cada comunidad o cada hotel pide lo suyo. Se resuelve con plantillas distintas de parte, no con un parte genérico que luego alguien reescribe. El técnico ve los campos que toquen a ese cliente y nada más.",
    ],
  ],
  en: [
    [
      "What does a job report need to contain?",
      "Who did it and when, where, what was done, how long it took, what materials were used, and the customer's sign-off. With that you can invoice without asking anything again. Whatever is missing from the report becomes a phone call to the office later, every time.",
    ],
    [
      "Is a signature captured on a phone valid?",
      "A signature captured on screen works as evidence that the customer agreed the work was done, which is what it is used for here. It carries more weight the better you can identify who signed and when: that is why the report stores the name, date and time alongside the stroke, not just the image of the signature.",
    ],
    [
      "Does the app work without a signal?",
      "It has to, because half of Mallorca has poor coverage in basements, on rooftops and inland. The report is filled in on the phone with no network and syncs when the signal returns. An app that needs a connection to close a report will end up being filled in from the van or at home, which is exactly what you were trying to avoid.",
    ],
    [
      "How do you get technicians to actually use it?",
      "By saving them work on day one, not adding to it. If filling in the report on the phone takes less than writing it on paper, and saves them a trip back to the office or repeating it over the phone, it gets used on its own. If it is a long form with fields nobody needs, no amount of training fixes it.",
    ],
    [
      "Can you invoice straight from the job report?",
      "Yes, and that is where nearly all the gain is. Hours and materials move from the report to the invoice without being typed again. That removes the step where uncharged materials go missing and invoices slip by a week.",
    ],
    [
      "What if every customer wants their own report format?",
      "That is normal in contract maintenance: every building or hotel asks for its own. The answer is different report templates, not one generic report somebody rewrites afterwards. The technician sees the fields that apply to that customer and nothing else.",
    ],
  ],
  de: [
    [
      "Was muss ein Arbeitsbericht enthalten?",
      "Wer ihn wann ausgeführt hat, wo, was getan wurde, wie lange es gedauert hat, welches Material verwendet wurde und die Bestätigung des Kunden. Damit lässt sich abrechnen, ohne noch einmal nachzufragen. Was im Bericht fehlt, wird später immer zu einem Anruf im Büro.",
    ],
    [
      "Ist eine auf dem Handy erfasste Unterschrift gültig?",
      "Eine auf dem Bildschirm erfasste Unterschrift dient als Nachweis, dass der Kunde die ausgeführte Arbeit bestätigt hat, und genau dafür wird sie hier verwendet. Sie wiegt umso schwerer, je besser nachvollziehbar ist, wer wann unterschrieben hat: Deshalb speichert der Bericht Name, Datum und Uhrzeit neben dem Schriftzug, nicht nur das Bild der Unterschrift.",
    ],
    [
      "Funktioniert die App ohne Empfang?",
      "Sie muss es, denn auf halb Mallorca ist der Empfang in Kellern, auf Dächern und im Inselinneren schlecht. Der Bericht wird auch ohne Netz auf dem Handy ausgefüllt und synchronisiert sich, sobald wieder Empfang da ist. Eine App, die zum Abschließen eine Verbindung braucht, wird am Ende im Auto oder zu Hause ausgefüllt — genau das sollte vermieden werden.",
    ],
    [
      "Wie bringt man die Techniker dazu, sie zu nutzen?",
      "Indem sie ihnen vom ersten Tag an Arbeit spart statt welche hinzuzufügen. Dauert der Bericht auf dem Handy weniger lang als auf Papier und erspart er die Rückfahrt ins Büro oder das Wiederholen am Telefon, nutzt er sich von selbst. Ist er ein langes Formular mit Feldern, die niemand braucht, hilft keine Schulung.",
    ],
    [
      "Kann man direkt aus dem Bericht abrechnen?",
      "Ja, und darin liegt fast der ganze Gewinn. Stunden und Material wandern aus dem Bericht in die Rechnung, ohne erneut getippt zu werden. Damit entfällt der Schritt, in dem unberechnetes Material verloren geht und Rechnungen eine Woche liegen bleiben.",
    ],
    [
      "Und wenn jeder Kunde sein eigenes Berichtsformat will?",
      "Das ist in der Vertragswartung normal: Jede Eigentümergemeinschaft und jedes Hotel will das Eigene. Die Lösung sind verschiedene Berichtsvorlagen, nicht ein allgemeiner Bericht, den hinterher jemand umschreibt. Der Techniker sieht die Felder, die zu diesem Kunden gehören, und sonst nichts.",
    ],
  ],
} as const satisfies PorIdioma;
