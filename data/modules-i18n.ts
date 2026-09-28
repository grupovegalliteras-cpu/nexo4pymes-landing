import type { Idioma } from "@/lib/i18n";
import { GRUPOS, MODULOS, type ModuleGroup, type Modulo } from "./modules";

/* Catálogo de módulos en inglés y alemán. El orden, los iconos y los estados salen de data/modules.ts. */

type T = Record<string, [nombre: string, descripcion: string]>;

const EN_GRUPOS: Record<ModuleGroup, { nombre: string; lema: string }> = {
  captacion: { nombre: "Enquiries and customer service", lema: "No request ends up on a sticky note." },
  clientes: { nombre: "Customers and sales", lema: "Everything about each customer, in one record." },
  operaciones: { nombre: "Operations and field work", lema: "Every technician knows what to do, where and how." },
  finanzas: { nombre: "Invoicing and finance", lema: "From job report to paid invoice without typing twice." },
  equipo: { nombre: "Team and people", lema: "Clock-ins, holidays and documents, paperless." },
  datos: { nombre: "Data, AI and automation", lema: "Know how the business is doing without asking for a report." },
};

const DE_GRUPOS: Record<ModuleGroup, { nombre: string; lema: string }> = {
  captacion: { nombre: "Anfragen und Kundenservice", lema: "Keine Anfrage landet mehr auf einem Zettel." },
  clientes: { nombre: "Kunden und Vertrieb", lema: "Alles zu jedem Kunden in einer Akte." },
  operaciones: { nombre: "Einsätze und Außendienst", lema: "Jeder Techniker weiß, was zu tun ist, wo und wie." },
  finanzas: { nombre: "Rechnungen und Finanzen", lema: "Vom Arbeitsbericht zur bezahlten Rechnung, ohne doppelt zu tippen." },
  equipo: { nombre: "Team und Personal", lema: "Zeiterfassung, Urlaub und Dokumente ohne Papier." },
  datos: { nombre: "Daten, KI und Automatisierung", lema: "Wissen, wie es der Firma geht, ohne einen Bericht anzufordern." },
};

const EN: T = {
  "central-avisos": ["Central Avisos", "Recorded and transcribed calls, WhatsApp, email and web in a single inbox. AI sorts each request by type, urgency and customer, and creates the work order in one click."],
  "asistente-atencion": ["AI customer assistant", "Answers frequent questions on WhatsApp or the web at any hour, collects the request details and hands over to a person when needed."],
  "web-reservas": ["Website and online booking", "Company website, quote request form and appointment calendar connected to your schedule."],
  recordatorios: ["Automatic customer notifications", "Visit confirmation, “the technician is on the way” message and a survey when the job is done."],
  resenas: ["Google reviews", "After a well-rated job, the customer gets an invitation to leave a review."],
  clientes: ["Customer CRM", "One record with contacts, addresses, job history, invoices, calls, documents and notes."],
  instalaciones: ["Installations and equipment", "Each customer's pools, machines, boilers or premises, with history, photos and a QR code to identify them on site."],
  embudo: ["Sales pipeline", "Opportunities on a board, scheduled follow-ups and reasons for lost deals."],
  presupuestos: ["Online quotes", "Templates and price list, sent by email or WhatsApp, notified when opened and accepted with a signature in one click."],
  contratos: ["Maintenance contracts", "Recurring preventive visits that create their own work orders, with agreed response times, renewal reminders and signing from the phone."],
  "portal-cliente": ["Customer portal", "Your customer sees their visits, reports, invoices and contracts, and opens tickets without calling."],
  "multi-centro": ["Multi-site for chains", "One customer with many sites (supermarkets, hotels, offices) and route planning between them."],
  planificacion: ["Scheduling", "Calendar per technician with drag and drop, weekly and daily views, and overlap warnings."],
  rutas: ["Optimised routes", "Map with each technician's stops and the shortest route, showing the kilometres and time you save."],
  trabajos: ["Work orders", "Statuses, priority, checklist per service type, hours, materials, photos and signature."],
  informes: ["Automatic service report", "A branded PDF with before-and-after photos, readings and signature, sent to the customer automatically when the job ends."],
  almacen: ["Stock and materials", "Stock per warehouse and per van, minimum levels and alerts, automatic deduction when the job is closed and cost per job."],
  flota: ["Vehicle fleet", "Inspections (ITV), insurance, services, mileage, fuel and assignment to technicians."],
  incidencias: ["Issues and warranties", "Complaints, rework and follow-up until closed."],
  facturacion: ["Invoicing with VeriFactu built in", "Invoice straight from the job report, with series, corrective invoices and a QR code on the invoice. Sent by email or WhatsApp."],
  recurrente: ["Recurring invoicing", "Maintenance contract fees invoice themselves: monthly, quarterly or yearly."],
  cobros: ["Payments", "Payment link by card or Bizum, SEPA direct debit batches and payment status per invoice."],
  impagos: ["Overdue invoices", "Automatic reminders at 7, 15 and 30 days, and an aged-debt dashboard."],
  gastos: ["Expenses by photo", "Photo of the receipt or supplier invoice, read automatically and sorted by category."],
  contabilidad: ["Connected accounting", "Income and expenses, bank reconciliation, estimated quarterly VAT, cash-flow forecast and everything ready for your accountant."],
  rentabilidad: ["Profitability", "Margin per customer, per service, per technician and per contract."],
  fichaje: ["Time clock", "Clock in, clock out and breaks from the phone with location, tablet mode for the office and an exportable working-time record for inspections."],
  turnos: ["Shifts and on-call", "Weekly rota visible in each worker's app."],
  vacaciones: ["Holidays and absences", "Requested from the phone, approved from the office, with a team calendar."],
  "horas-extra": ["Overtime", "Calculated from clock-ins and ready to send to your accountant."],
  nominas: ["Payslips and documents", "Upload the PDF your accountant sends and each worker receives only their own, with a notification and read receipt."],
  prevencion: ["Health and safety, training", "Protective equipment handed over with signature, courses and certificates with expiry dates and reminders."],
  comunicados: ["Internal announcements", "Messages to the whole team with read receipts."],
  chat: ["Technician and office chat", "A conversation attached to each job, with photos and location."],
  direccion: ["Management dashboard", "Invoicing, payments, jobs, productivity and requests in real time."],
  "asistente-ia": ["AI dashboard assistant", "Ask the way you talk: “how much have I invoiced Hotel Sa Roca this year?” and get the answer with a link to the data."],
  "informes-automaticos": ["Automatic reports", "Every Monday, a summary of the week in the owner's inbox."],
  automatizaciones: ["Custom automations", "Those repetitive tasks someone does by hand today stop being done by hand."],
  conexiones: ["Connected to your tools", "Accountant, bank, email, calendar and website connected to the dashboard."],
  seguridad: ["Security and permissions", "Owner, office, technician and customer roles. Each worker sees only their own data, with an activity log and data hosted in the EU."],
};

const DE: T = {
  "central-avisos": ["Central Avisos", "Aufgezeichnete und transkribierte Anrufe, WhatsApp, E-Mail und Web in einem Posteingang. Die KI ordnet jede Anfrage nach Art, Dringlichkeit und Kunde und erstellt den Auftrag mit einem Klick."],
  "asistente-atencion": ["KI-Kundenassistent", "Beantwortet häufige Fragen per WhatsApp oder Web rund um die Uhr, nimmt die Daten der Anfrage auf und übergibt bei Bedarf an einen Menschen."],
  "web-reservas": ["Website und Online-Buchung", "Firmenwebsite, Angebotsformular und Terminkalender, verbunden mit der Einsatzplanung."],
  recordatorios: ["Automatische Kundennachrichten", "Terminbestätigung, Hinweis „der Techniker ist unterwegs“ und eine Umfrage nach dem Einsatz."],
  resenas: ["Google-Bewertungen", "Nach einem gut bewerteten Einsatz erhält der Kunde eine Einladung zur Bewertung."],
  clientes: ["Kunden-CRM", "Eine Akte mit Kontakten, Adressen, Auftragshistorie, Rechnungen, Anrufen, Dokumenten und Notizen."],
  instalaciones: ["Anlagen und Geräte", "Pools, Maschinen, Heizkessel oder Räumlichkeiten jedes Kunden, mit Historie, Fotos und QR-Code zur Identifizierung vor Ort."],
  embudo: ["Vertriebspipeline", "Verkaufschancen auf einem Board, geplante Nachfassaktionen und Verlustgründe."],
  presupuestos: ["Online-Angebote", "Vorlagen und Preisliste, Versand per E-Mail oder WhatsApp, Hinweis beim Öffnen und Annahme mit Unterschrift per Klick."],
  contratos: ["Wartungsverträge", "Wiederkehrende Wartungen, die ihre Aufträge selbst erzeugen, mit vereinbarter Reaktionszeit, Verlängerungshinweis und Unterschrift per Handy."],
  "portal-cliente": ["Kundenportal", "Ihr Kunde sieht seine Termine, Berichte, Rechnungen und Verträge und meldet Anliegen, ohne anzurufen."],
  "multi-centro": ["Mehrere Standorte für Ketten", "Ein Kunde mit vielen Standorten (Supermärkte, Hotels, Büros) und Routenplanung zwischen ihnen."],
  planificacion: ["Einsatzplanung", "Kalender pro Techniker mit Drag-and-drop, Wochen- und Tagesansicht und Warnung bei Überschneidungen."],
  rutas: ["Optimierte Routen", "Karte mit den Stopps jedes Technikers und der kürzesten Route, mit gesparten Kilometern und gesparter Zeit."],
  trabajos: ["Arbeitsaufträge", "Status, Priorität, Checkliste je Leistungsart, Stunden, Material, Fotos und Unterschrift."],
  informes: ["Automatischer Einsatzbericht", "PDF mit Ihrem Logo, Vorher-Nachher-Fotos, Messwerten und Unterschrift, nach dem Einsatz automatisch an den Kunden gesendet."],
  almacen: ["Lager und Material", "Bestand pro Lager und pro Fahrzeug, Mindestmengen und Warnungen, automatische Abbuchung beim Abschluss und Kosten pro Auftrag."],
  flota: ["Fuhrpark", "TÜV (ITV), Versicherungen, Inspektionen, Kilometer, Kraftstoff und Zuordnung zu Technikern."],
  incidencias: ["Reklamationen und Garantie", "Beschwerden, Nacharbeiten und Nachverfolgung bis zum Abschluss."],
  facturacion: ["Rechnungsstellung mit integriertem VeriFactu", "Rechnung direkt aus dem Arbeitsbericht, mit Nummernkreisen, Korrekturrechnungen und QR-Code. Versand per E-Mail oder WhatsApp."],
  recurrente: ["Wiederkehrende Rechnungen", "Die Gebühren der Wartungsverträge werden automatisch abgerechnet: monatlich, vierteljährlich oder jährlich."],
  cobros: ["Zahlungen", "Zahlungslink per Karte oder Bizum, SEPA-Lastschriften und Zahlungsstatus pro Rechnung."],
  impagos: ["Offene Posten", "Automatische Erinnerungen nach 7, 15 und 30 Tagen und eine Übersicht nach Fälligkeit."],
  gastos: ["Ausgaben per Foto", "Foto vom Beleg oder der Lieferantenrechnung, automatisch ausgelesen und nach Kategorie sortiert."],
  contabilidad: ["Verbundene Buchhaltung", "Einnahmen und Ausgaben, Bankabgleich, geschätzte Umsatzsteuer des Quartals, Liquiditätsvorschau und alles bereit für Ihre Steuerberatung."],
  rentabilidad: ["Rentabilität", "Marge pro Kunde, pro Leistung, pro Techniker und pro Vertrag."],
  fichaje: ["Zeiterfassung", "Kommen, Gehen und Pausen per Handy mit Standort, Tablet-Modus fürs Büro und exportierbares Arbeitszeitprotokoll für Prüfungen."],
  turnos: ["Schichten und Bereitschaft", "Wochenplan in der App jedes Mitarbeiters sichtbar."],
  vacaciones: ["Urlaub und Abwesenheiten", "Antrag per Handy, Genehmigung im Büro und Teamkalender."],
  "horas-extra": ["Überstunden", "Aus der Zeiterfassung berechnet und bereit für die Lohnbuchhaltung."],
  nominas: ["Lohnzettel und Dokumente", "Sie laden das PDF Ihrer Steuerberatung hoch und jeder Mitarbeiter erhält nur seinen eigenen, mit Benachrichtigung und Lesebestätigung."],
  prevencion: ["Arbeitsschutz und Schulungen", "Ausgabe von Schutzausrüstung mit Unterschrift, Kurse und Zertifikate mit Ablaufdatum und Erinnerung."],
  comunicados: ["Interne Mitteilungen", "Nachrichten an das ganze Team mit Lesebestätigung."],
  chat: ["Chat Techniker und Büro", "Eine Unterhaltung zu jedem Auftrag, mit Fotos und Standort."],
  direccion: ["Geschäftsführungs-Dashboard", "Umsatz, Zahlungen, Aufträge, Produktivität und Anfragen in Echtzeit."],
  "asistente-ia": ["KI-Assistent im Dashboard", "Fragen Sie, wie Sie sprechen: „Wie viel habe ich Hotel Sa Roca dieses Jahr in Rechnung gestellt?“ und erhalten Sie die Antwort mit Link zu den Daten."],
  "informes-automaticos": ["Automatische Berichte", "Jeden Montag eine Wochenübersicht im Postfach des Inhabers."],
  automatizaciones: ["Individuelle Automatisierungen", "Die wiederkehrenden Aufgaben, die heute jemand von Hand erledigt, laufen nicht mehr von Hand."],
  conexiones: ["Anbindung Ihrer Tools", "Steuerberatung, Bank, E-Mail, Kalender und Website mit dem Dashboard verbunden."],
  seguridad: ["Sicherheit und Berechtigungen", "Rollen für Inhaber, Büro, Techniker und Kunde. Jeder sieht nur seine Daten, mit Aktivitätsprotokoll und Datenhaltung in der EU."],
};

const TABLA: Record<"en" | "de", T> = { en: EN, de: DE };

export function modulosDe(lang: Idioma): Modulo[] {
  if (lang === "es") return MODULOS;
  return MODULOS.map((m) => {
    const t = TABLA[lang][m.id];
    return t ? { ...m, nombre: t[0], descripcion: t[1] } : m;
  });
}

export function gruposDe(lang: Idioma): Record<ModuleGroup, { nombre: string; lema: string }> {
  return lang === "en" ? EN_GRUPOS : lang === "de" ? DE_GRUPOS : GRUPOS;
}

export function moduloDe(lang: Idioma, id: string): Modulo | undefined {
  return modulosDe(lang).find((m) => m.id === id);
}
