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
