import type { SectorId } from "@/data/sectors";
import type { TextoSector } from "@/content/sectores-seo";

/* Deutsche Fassung von content/sectores-seo.ts. Dieselbe Regel: nichts
   hier darf für zwei Branchen gleich klingen. Anrede: Sie. */

export const SECTORES_SEO: Record<SectorId, TextoSector> = {
  mantenimiento: {
    intro: [
      "Ein Wartungsbetrieb auf Mallorca lebt am Telefon: ein Hotel ohne Warmwasser mitten in der Saison, eine Wohnanlage mit stehender Druckerhöhungsanlage, ein Lokal mit ausgelöstem Hauptverteiler. Alle drei kommen gleichzeitig herein, und für den Anrufenden ist jedes davon dringend.",
      "Das Notizbuch hält durch, bis es nicht mehr durchhält. Mit zwei oder drei Technikern über die Insel verteilt scheitert es nicht am Handwerk, sondern daran, zu wissen, wer hinfährt, welches Ersatzteil er dabeihatte, ob die Kesselreparatur vom März je abgerechnet wurde und was man der Hausverwaltung vor drei Wochen am Telefon zugesagt hat.",
    ],
    claves: [
      {
        titulo: "Jede Anlage mit eigener Historie",
        texto: "Der Kessel im Technikraum, die Druckerhöhungsanlage und der Boiler im zweiten Stock sind Datensätze mit Einsatzhistorie, Fotos und QR-Code. Wer zum ersten Mal hinfährt, liest, was der Vorgänger gemacht hat.",
      },
      {
        titulo: "Druck und Warmwasser werden festgehalten",
        texto: "Netzdruck, Warmwassertemperatur und Spannung kommen per Handy in den Bericht, mit dem richtigen Bereich im Blick. Ein Wert außerhalb davon erscheint im Dashboard, ohne dass jemand den ganzen Bericht liest.",
      },
      {
        titulo: "Verträge erzeugen ihre Einsätze selbst",
        texto: "Der Vollwartungsvertrag eines Hotels hängt nicht mehr davon ab, dass sich jemand im Oktober erinnert: Die vorbeugenden Aufträge entstehen automatisch, mit der vereinbarten Reaktionszeit.",
      },
    ],
    faq: [
      [
        "Funktioniert das, wenn wir Sanitär, Elektro und Heizung zugleich machen?",
        "Ja, dafür ist es gedacht. Leistungen werden mit Preis und geschätzter Dauer hinterlegt, und die Checkliste wechselt mit der Art des Einsatzes — wer zu einer Elektrostörung fährt, sieht nicht die Schritte einer Dichtheitsprüfung.",
      ],
      [
        "Können wir Hotelanfragen außerhalb der Geschäftszeiten bearbeiten?",
        "Anrufe und WhatsApp-Nachrichten, die nachts eingehen, werden mit ihrer Dringlichkeit erfasst, und ein kritischer Fall kann sofort die zuständige Person benachrichtigen. Was kritisch ist, legen Sie fest: ein Leck in einem belegten Zimmer ist keine defekte Glühbirne.",
      ],
      [
        "Lässt sich erkennen, welche Reparatur abgerechnet wurde und welche nicht?",
        "Ja. Die Rechnung entsteht aus dem Arbeitsbericht, also erscheint ein abgeschlossener Einsatz ohne Rechnung im Dashboard als offen. Das ist das typische Loch in Wartungsbetrieben: Die Arbeit wird erledigt, das Problem gelöst, und niemand sieht es je wieder an.",
      ],
    ],
  },

  limpieza: {
    intro: [
      "Ein Reinigungsunternehmen auf Mallorca hat kein Reinigungsproblem, sondern ein Dienstplanproblem. Büros, die um sieben öffnen, Wohnanlagen, die ihre Gemeinschaftsflächen fertig haben wollen, bevor der erste Bewohner herunterkommt, und eine Bauendreinigung, die am Donnerstag hereinkommt und mit Leuten abgedeckt werden muss, die schon verplant sind.",
      "Die Dienstplan-Tabelle ist in der vierten Fassung dieser Woche, Schichttausche werden per WhatsApp vereinbart, und die Hausverwaltung ruft an, um zu fragen, ob der Eingang am Dienstag gereinigt wurde. Ja zu sagen reicht nicht: Es muss gezeigt werden.",
    ],
    claves: [
      {
        titulo: "Der Dienstplan ist keine Tabelle mehr",
        texto: "Objekte, Schichten und Personen in einem Kalender, der Überschneidungen meldet. Ein Schichtwechsel wird veröffentlicht, und jede Person sieht ihn auf dem Handy — ohne Nachrichtenkette zur Bestätigung.",
      },
      {
        titulo: "Das Foto vom Ergebnis, im Bericht",
        texto: "Sanitärbereiche aufgefüllt, Papierkörbe geleert, Böden gewischt, Griffe desinfiziert, Eingangsglas: Die Checkliste wird am Handy abgehakt, und das Abschlussfoto bleibt mit Uhrzeit am Bericht. Genau das verlangt der Kunde.",
      },
      {
        titulo: "Ein Bericht pro Objekt, ohne Handarbeit",
        texto: "Was gereinigt wurde, wann, von wem und mit welcher Desinfektionsmittel-Konzentration. Das PDF mit Ihrem Logo geht nach Abschluss automatisch raus, und die Hausverwaltung hört auf nachzufragen.",
      },
    ],
    faq: [
      [
        "Kann der Kunde sehen, dass gereinigt wurde?",
        "Ja. Jeder Einsatz endet mit abgehakter Checkliste, einem Foto des Ergebnisses und einem Zeitstempel, und das lässt sich als Bericht an die Hausverwaltung oder die Objektleitung senden. Aus einer Diskussion wird ein Blick von dreißig Sekunden.",
      ],
      [
        "Wie werden kurzfristige Schichtwechsel abgebildet?",
        "Der Dienstplan wird im Dashboard geändert, und die Änderung erscheint mit Hinweis in der App der betroffenen Person. Die Historie bleibt, sodass am Monatsende klar ist, wer was übernommen hat — ohne Rekonstruktion aus einer WhatsApp-Gruppe.",
      ],
      [
        "Eignet es sich für Bauendreinigungen, die nicht wiederkehrend sind?",
        "Ja. Vertragsleistungen und Einzelaufträge laufen nebeneinander: Eine Bauendreinigung wird als Auftrag mit Team, Stunden und Angebot geplant, ohne den Dienstplan der festen Objekte zu stören.",
      ],
    ],
  },

  piscinas: {
    intro: [
      "In einem Poolbetrieb auf Mallorca hat das Jahr zwei Hälften. In der Hochsaison sind es hundert Pools pro Woche, Routen quer über die Insel und wenige Stunden Spielraum, damit eine Villa fertig ist, bevor die Gäste eintreffen. Außerhalb der Saison sind es Saisonstarts und Grünwasser-Sanierungen.",
      "Und ein guter Teil der Eigentümer wohnt nicht hier. Sie rufen aus Deutschland oder Großbritannien an und fragen nach dem Wasser eines Hauses, das sie erst im Juni betreten — und die Antwort kann nicht lauten: „Ich sage Ihnen morgen Bescheid.“",
    ],
    claves: [
      {
        titulo: "pH und Chlor mit Sollbereich",
        texto: "Der Techniker erfasst pH, freies Chlor, Temperatur und Filterdruck am Handy, mit dem richtigen Bereich davor. Ein Wert außerhalb wird automatisch markiert und im Dashboard nach oben gezogen.",
      },
      {
        titulo: "Routen, die in der Saison halten",
        texto: "Die Karte verteilt die Stopps der Woche auf die Techniker und berechnet den kürzesten Weg. Bei hundert Pools sind gesparte Kilometer Stunden, und Stunden im Juli sind Pools, die geschafft werden oder nicht.",
      },
      {
        titulo: "Ein Bericht, den der Eigentümer versteht",
        texto: "PDF mit Ihrem Logo, die Messwerte des Tages, Fotos und Unterschrift, nach Abschluss versendet. Wer im Ausland wohnt, sieht den Zustand seines Pools ohne Anruf — und genau das senkt die Telefonlast der Saison.",
      },
    ],
    faq: [
      [
        "Lassen sich die Wasserwerte am Handy erfassen?",
        "Ja: pH, freies Chlor, Temperatur und Filterdruck kommen mit dem richtigen Sollbereich in den Bericht. Was außerhalb liegt, wird markiert, sodass ein Pool mit zu wenig Chlor nicht bis zur nächsten Woche unbemerkt bleibt.",
      ],
      [
        "Unsere Eigentümer wohnen im Ausland. Können sie den Zustand ihres Pools sehen?",
        "Der Bericht jedes Besuchs — mit Messwerten, Fotos und Unterschrift — wird bei Abschluss automatisch versendet. Wer mehr möchte, kann im Kundenportal frühere Besuche und Rechnungen einsehen, ohne im Büro anzurufen.",
      ],
      [
        "Hält das die Spitze der Hochsaison aus?",
        "Dafür ist die Routenplanung da: Die Stopps der Woche werden auf die Techniker verteilt, und die Karte berechnet den kürzesten Weg. Eine Grünwasser-Sanierung oder ein Pumpenausfall kommt als dringender Auftrag herein, ohne den übrigen Plan zu sprengen.",
      ],
    ],
  },

  climatizacion: {
    intro: [
      "Ein Klima- und Kältebetrieb auf Mallorca arbeitet nach zwei Uhren. Die des Kunden, dem im Büro heiß ist und der bis morgen warten kann. Und die der Kühlzelle eines Supermarkts, die gar nicht warten kann: Steigt sie über vier Grad, wird Ware weggeworfen.",
      "Dazu kommt der Papierkram. F-Gas-Aufzeichnungen, Füllmengen je Anlage und Berichte jeder Wartung sind Pflicht — und wenn eine Prüfung oder eine Kette mit zwanzig Filialen sie verlangt, liegen sie meist verstreut in Ordnern, E-Mails und im Transporter von irgendwem.",
    ],
    claves: [
      {
        titulo: "Drücke und Kältemittel, je Anlage",
        texto: "Hochdruck, Niederdruck, Zellentemperatur und nachgefüllte Kilogramm kommen in den Bericht am Datensatz der konkreten Anlage. Die Füllhistorie eines Rooftop-Geräts liegt nicht mehr in einem Heft.",
      },
      {
        titulo: "Mehrere Standorte für Ketten",
        texto: "Ein Kunde mit zwanzig Supermärkten ist ein Kunde mit zwanzig Standortakten, je eigener Historie und der Route dazwischen. Die Rechnung kann an die Zentrale gehen, auch wenn die Arbeit in der Filiale stattfand.",
      },
      {
        titulo: "Die Dringlichkeit, die wirklich eine ist",
        texto: "Eine Tiefkühlzelle außerhalb des Sollbereichs kann sofort die Bereitschaft benachrichtigen, während ein Büro-Split in der normalen Warteschlange bleibt. Die Regel setzen Sie — pro Kunde und pro Anlagentyp.",
      },
    ],
    faq: [
      [
        "Lassen sich die Kältemittel-Aufzeichnungen führen?",
        "Die nachgefüllten Kilogramm werden im Bericht jedes Einsatzes an der konkreten Anlage erfasst, nicht nur am Kunden, mit Datum und Techniker. Daraus entsteht die Historie je Anlage, und genau die muss vorgelegt werden können.",
      ],
      [
        "Wir arbeiten für Ketten mit vielen Filialen. Lässt sich Standort und Zahler trennen?",
        "Ja. Jeder Standort hat eigene Akte, eigene Anlagen und eigene Historie, und die Rechnung kann an die Muttergesellschaft gehen. Das ist das Modul für mehrere Standorte, gebaut für Supermärkte, Hotels und Filialisten.",
      ],
      [
        "Können wir einen Kühlzellenausfall von einer Routinewartung unterscheiden?",
        "Ja, und in der Industriekälte ist das die wichtigste Unterscheidung. Anfragen kommen mit Typ und Dringlichkeit herein, und eine ausgefallene Kühlzelle kann sofort eine Benachrichtigung auslösen, während alles andere im Plan wartet.",
      ],
    ],
  },

  jardineria: {
    intro: [
      "Ein Gartenbaubetrieb auf Mallorca verteilt Kolonnen über die halbe Insel: zweiwöchentliche Pflege in Wohnanlagen, Palmenschnitt, der mit dem Zugang abgestimmt werden muss, Grundstücksfreischnitt vor dem Sommer und eine Bewässerung, die immer am heißesten Augustwochenende ausfällt.",
      "Verloren gehen nicht die großen Aufträge, sondern die wiederkehrenden Besuche. Ein Garten, der alle vierzehn Tage dran wäre und seit fünf Wochen niemand gesehen hat. Es fällt erst auf, wenn der Kunde anruft, und dann ist es ein unangenehmes Gespräch.",
    ],
    claves: [
      {
        titulo: "Wiederkehrende Besuche entstehen selbst",
        texto: "Der Pflegevertrag erzeugt seine Aufträge, ohne dass jemand sie einträgt. Fällt ein Besuch aus, erscheint er im Dashboard als offen, statt still aus dem Kalender zu verschwinden.",
      },
      {
        titulo: "Jeder Bereich mit eigener Akte",
        texto: "Hauptgarten, Hecke, Tropfbewässerung und Eingangspalmen sind Bereiche mit eigener Historie. Tägliche Bewässerungsminuten und Rasenfläche werden festgehalten, sodass der Nächste nicht nachfragen muss.",
      },
      {
        titulo: "Kolonnen und Routen statt Nachrichten",
        texto: "Wer zu welchem Grundstück fährt und in welcher Reihenfolge, wird im Dashboard entschieden und landet auf dem Handy der Kolonne. Abgefahrene Grünabfälle und Stunden kommen in den Bericht, aus dem die Rechnung entsteht.",
      },
    ],
    faq: [
      [
        "Wie verhindern wir, dass Pflegebesuche ausfallen?",
        "Pflegeverträge erzeugen ihre Aufträge im vereinbarten Rhythmus selbst, der Besuch steht also im Kalender, ob sich jemand erinnert oder nicht. Verstreicht sein Datum ohne Abschluss, gilt er als offen statt als verloren.",
      ],
      [
        "Lässt sich die Bewässerung jedes Gartens nachhalten?",
        "Tägliche Bewässerungsminuten, Rasenfläche und abgefahrene Grünabfälle werden als Messwerte am Bereich erfasst, mit Historie. Ein Bewässerungsschaden kommt als dringender Auftrag herein und hängt am konkreten Bereich, nicht am Kunden allgemein.",
      ],
      [
        "Unsere Kolonnen wechseln. Funktioniert es trotzdem?",
        "Ja. Die Planung weist die Arbeit den Personen des jeweiligen Tages zu, und den Bericht unterschreibt, wer ihn ausführt — die Gartenhistorie bleibt vollständig, auch wenn die Kolonne wechselt. Die Zeiterfassung per Handy deckt zusätzlich die Stunden ab.",
      ],
    ],
  },

  plagas: {
    intro: [
      "In der Schädlingsbekämpfung kauft der Kunde keine Behandlung, sondern etwas zum Vorzeigen. Ein Restaurant vor der Lebensmittelkontrolle, ein Hotel im Kettenaudit oder eine Wohnanlage mit Nagerbefall braucht das Zertifikat, den Plan der Kontrollpunkte und die Prüfhistorie — und zwar in dem Moment, in dem danach gefragt wird.",
      "Der Alltag dagegen ist kleinteilig und repetitiv: zwanzig oder vierzig Kontrollpunkte je Objekt, jeder geprüft, notiert, welche Aktivität zeigen und wie viel Mittel ausgebracht wurde. Auf Papier wird das zweimal abgeschrieben und jedes dritte Mal verloren.",
    ],
    claves: [
      {
        titulo: "Kontrollpunkte, einer nach dem anderen",
        texto: "Küche und Lager, Müllraum, Kühlzelle, Keller und Außenbereich sind Punkte mit eigenem QR-Code und eigener Historie. Der Techniker prüft sie durch Scannen, und welche Aktivität zeigten, wird erfasst.",
      },
      {
        titulo: "Der HACCP-Bericht, bei Abschluss",
        texto: "Geprüfte Punkte, Punkte mit Aktivität, ausgebrachtes Mittel und Unterschrift ergeben ein PDF mit Ihrem Logo, automatisch versendet. Genau das verlangt eine Kontrolle — und es wird nicht mehr sonntags von Hand gebaut.",
      },
      {
        titulo: "Wiederkehrende Prüfungen hängen an niemandem",
        texto: "Der HACCP-Vertrag erzeugt seine Besuche im eigenen Rhythmus, und die Legionellenkontrolle behält Datum und Erinnerung. Ein abgelaufenes Zertifikat wird zu einem Problem, das man kommen sieht.",
      },
    ],
    faq: [
      [
        "Lassen sich die Zertifikate und Berichte für eine Lebensmittelkontrolle erzeugen?",
        "Der Bericht jeder Prüfung erfasst geprüfte Punkte, Punkte mit Aktivität, ausgebrachtes Mittel und Unterschrift; daraus entsteht ein PDF mit Ihrem Logo, das dem Kunden bei Abschluss zugeht. Was Ihrem eigenen Protokoll eigen ist, wird mit Ihnen eingerichtet.",
      ],
      [
        "Wie werden die Kontrollpunkte jedes Objekts geführt?",
        "Jeder Punkt ist ein Datensatz mit Ort, QR-Code und Historie, sodass der Techniker ihn durch Scannen identifiziert und nicht aus dem Gedächtnis. Die Historie je Punkt zeigt, dass die Schaben immer in derselben Etagenküche auftauchen.",
      ],
      [
        "Erinnert es an wiederkehrende Behandlungen und an Legionellen?",
        "Ja. Wiederkehrende Prüfungen entstehen aus dem Vertrag in ihrer Frequenz, und Zertifikate mit Ablaufdatum warnen vorher. Es ist derselbe Mechanismus, den das Schulungsmodul für Mitarbeiterkurse nutzt.",
      ],
    ],
  },

  solar: {
    intro: [
      "Ein Solarbetrieb auf Mallorca macht zwei Dinge, die wenig gemein haben. Auf der einen Seite Bauarbeiten: ein Hallendach, eine Pergola, eine Freiflächenanlage, mit Phasen, Material und Papierkram je Kunde. Auf der anderen die Wartung des bereits Installierten — dort liegen die wiederkehrenden Einnahmen.",
      "Und die Wartung hat ein eigenes Problem: Eine Anlage, die an Leistung verliert, meldet sich nicht. Sie produziert weiter, nur weniger, und der Kunde merkt es erst sechs Monate später auf der Stromrechnung. Dann ist das Gespräch schwierig.",
    ],
    claves: [
      {
        titulo: "Leistung und Ertrag, je Anlage",
        texto: "Tagesertrag in kWh, Leistung in Prozent und Strangspannung werden bei jeder Wartung an der Akte der Anlage erfasst. Ein Rückgang zeigt sich im Vergleich zum letzten Besuch, nicht aus dem Gedächtnis.",
      },
      {
        titulo: "Bau in Phasen, mit Fortschritt",
        texto: "Eine Eigenverbrauchsanlage ist ein langes Projekt mit Abschnitten und Material. Angebot, Fortschritt und Fotos jeder Phase bleiben in der Akte, und der Kunde kann es ohne Anruf einsehen.",
      },
      {
        titulo: "Der Papierkram, am Kunden",
        texto: "Jede Anlage behält ihre Dokumente, Fotos und Einsatzhistorie. Wenn die technische Dokumentation eines zwei Jahre alten Projekts gebraucht wird, liegt sie in der Akte und nicht auf irgendeiner Festplatte.",
      },
    ],
    faq: [
      [
        "Lässt sich erkennen, dass eine Anlage an Leistung verloren hat?",
        "Jede Wartung erfasst Ertrag, Leistung und Strangspannung an dieser Anlage, der Vergleich mit früheren Besuchen ist also direkt. Es ersetzt kein Wechselrichter-Monitoring: Gelöst wird, dass der Wert in der Kundenhistorie landet und nicht nur auf dem Bildschirm des Technikers.",
      ],
      [
        "Wir machen Bau und Wartung. Geht beides nebeneinander?",
        "Ja, und in dieser Branche ist das die Regel. Eine Eigenverbrauchsanlage läuft als Projekt mit Phasen und Material, und danach bekommt dieselbe Anlage einen Wartungsvertrag mit wiederkehrenden Besuchen. Die Historie ist dieselbe.",
      ],
      [
        "Wo liegt die Dokumentation jeder Anlage?",
        "In der Akte der Anlage: Dokumente, Baufotos, verwendetes Material und Einsatzhistorie. Das macht aus dem Wiederfinden einer zwei Jahre alten Dokumentation eine Suche statt einer Ausgrabung.",
      ],
    ],
  },

  reformas: {
    intro: [
      "Ein Renovierungsbetrieb auf Mallorca lebt mit zwei Dingen, die schlecht zusammenpassen: Baustellen über Wochen oder Monate und Angebote nach Gewerken, die sich ändern, sobald der Kunde etwas im Laden sieht. Das im März angebotene Bad ist nicht das, was im Mai gebaut wird.",
      "Und der Kunde will den Fortschritt sehen. Er fragt nicht aus Höflichkeit: Er ist aus der eigenen Wohnung ausgezogen und muss wissen, ob er nächste Woche zurückkann. Dauert die Antwort, leidet das Vertrauen früher als der Terminplan.",
    ],
    claves: [
      {
        titulo: "Angebote nach Gewerken, mit Versionen",
        texto: "Das Angebot wird versendet, geöffnet und per Handy unterschrieben, und jede Änderung wird eine neue Version. Was wann freigegeben wurde, ist keine Diskussion alter E-Mails mehr.",
      },
      {
        titulo: "Baufortschritt in Prozent und in Fotos",
        texto: "Fortschritt, verlegte Quadratmeter und Untergrundfeuchte kommen in den Bericht, mit Vorher- und Nachher-Fotos. Der Kunde sieht den Stand, ohne dass jemand eine E-Mail formulieren muss.",
      },
      {
        titulo: "Istkosten gegen Angebotspreis",
        texto: "Stunden und Material werden beim Abschluss des Berichts gebucht, die Marge dieser Küche ist also während der Bauzeit sichtbar — nicht drei Monate später, wenn nichts mehr zu ändern ist.",
      },
    ],
    faq: [
      [
        "Lassen sich Angebote nach Gewerken führen, die sich während der Bauzeit ändern?",
        "Ja. Jede Änderung erzeugt eine neue Version des Angebots, mit Hinweis, sobald der Kunde es öffnet, und Unterschrift per Handy zur Annahme. Was freigegeben wurde und wann, ist dokumentiert — das verhindert den Streit am Ende.",
      ],
      [
        "Kann der Kunde den Fortschritt seiner Renovierung verfolgen?",
        "Der Bericht jedes Arbeitstages nimmt Fortschritt in Prozent und Fotos auf, und im Kundenportal lässt sich das ohne Anruf einsehen. Bei einer Komplettsanierung, während der Kunde woanders wohnt, ist das meist der Teil, der am meisten zählt.",
      ],
      [
        "Wissen wir, ob eine Baustelle Marge bringt, bevor sie fertig ist?",
        "Ja. Stunden und Material werden beim Abschluss jedes Berichts auf den Auftrag gebucht, Istkosten gegen Angebotspreis sind also während der Ausführung sichtbar. Das ist der Unterschied zwischen Gegensteuern und Nachrechnen.",
      ],
    ],
  },
};
