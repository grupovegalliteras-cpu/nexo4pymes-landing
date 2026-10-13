import type { LandingSlug } from "@/data/landings";
import type { TextoLanding } from "../landings-seo";

/* Die deutsche Fassung. Der Leser führt einen Betrieb auf Mallorca und
   kennt die spanische Steuerverwaltung nicht von Kindesbeinen an. Also
   erst erklären, was VeriFactu überhaupt ist, dann über Fristen reden.
   Gesiezt, wie auf dem Rest der Website. Die Daten stehen weiterhin
   nicht hier, sondern in content/verifactu-estado.ts. */

export const LANDINGS_SEO: Partial<Record<LandingSlug, TextoLanding>> = {
  "facturacion-verifactu": {
    h1: ["Rechnungssoftware", "mit VeriFactu"],
    entradilla:
      "Rechnungen mit verketteter Prüfsumme und dem Meldesatz, den das spanische Finanzamt verlangt — erstellt dort, wo der Arbeitsbericht abgeschlossen wird.",
    intro: [
      "VeriFactu hat inzwischen drei Zeitpläne gehabt. Der erste nannte 2026. Das Königliche Gesetzesdekret 15/2025 verschob ihn auf 2027. Und am 5. Oktober 2026 kündigte das Finanzministerium an, ihn für Betriebe mit weniger als acht Millionen Umsatz auf Oktober 2028 zu verschieben. Diese letzte Verschiebung steht noch nicht im Gesetzblatt, verbindlich sind also weiterhin die Fristen von 2027.",
      "Nach so viel Hin und Her weiß kaum jemand noch, was wann zu tun ist. Die eigentliche Frage eines Dienstleistungsbetriebs auf Mallorca war aber nie das Datum: Sie lautet, ob am Stichtag jemand jede Rechnung erneut in ein separates Programm tippen muss, nachdem dieselben Angaben bereits im Arbeitsbericht stehen.",
    ],
    claves: [
      {
        titulo: "Vom Arbeitsbericht zur Rechnung, ohne zweites Tippen",
        texto:
          "Der Techniker schließt den Bericht am Handy ab — mit Stunden, Material und Unterschrift des Kunden. Daraus entsteht die Rechnung, die Positionen stehen bereits drin. Es gibt kein zweites Programm, in das die Daten übertragen werden müssen, und genau dort gehen sonst die Stunden verloren und entstehen die Fehler.",
      },
      {
        titulo: "Verkettete Prüfsumme und Meldesatz sind erledigt",
        texto:
          "Jede Rechnung erzeugt ihren Meldesatz mit der Prüfsumme, die sie mit der vorherigen verkettet, dazu den QR-Code und den Hinweis auf die Überprüfbarkeit. Das verlangt die Verordnung, und das ist der Teil, den man im Monat vor der Frist nicht mehr improvisiert.",
      },
      {
        titulo: "Stornorechnungen zählen ebenfalls",
        texto:
          "Eine ausgestellte Rechnung zu stornieren oder zu korrigieren heißt nicht, sie zu löschen: Es entsteht ein eigener, verketteter Stornosatz. Daran scheitern die meisten Systeme, denn den einfachen Weg deckt fast jeder ab — Stornorechnungen gehören nicht dazu.",
      },
    ],
    faq: [
      [
        "Was ist VeriFactu und wen betrifft es?",
        "Es ist das System der spanischen Steuerverwaltung, mit dem Rechnungsprogramme manipulationssicher werden. Jede ausgestellte Rechnung hinterlässt einen signierten Satz, der mit dem vorherigen verkettet ist — keine lässt sich löschen oder ändern, ohne dass es auffällt. Betroffen sind Unternehmen und Selbstständige, die in Spanien Rechnungen stellen, außer sie fallen bereits unter das SII-Verfahren oder unter das baskische beziehungsweise navarresische Steuerrecht.",
      ],
      [
        "Ab wann gilt die Pflicht genau?",
        "Es gibt zwei Antworten, die man nicht vermischen sollte. In Kraft sind die Fristen aus dem Königlichen Gesetzesdekret 15/2025. Daneben steht eine Ankündigung des Finanzministeriums vom 5. Oktober 2026, die einen Großteil der Pflichten auf Oktober 2028 verschieben würde, aber noch nicht im Gesetzblatt veröffentlicht ist. Bis dahin gilt der Zeitplan von 2027. Die konkreten Daten stehen in der Tabelle oben, zusammen mit dem Tag, an dem wir sie zuletzt geprüft haben.",
      ],
      [
        "Gibt es VeriFactu kostenlos?",
        "Die Steuerverwaltung stellt eine kostenlose Anwendung für überprüfbare Rechnungen bereit. Sie genügt, wenn Sie selten und von Hand abrechnen. Sie genügt nicht, wenn die Rechnung aus dem bereits ausgefüllten Arbeitsbericht entstehen soll, denn es ist ein Einzelwerkzeug ohne Verbindung zu Ihren übrigen Abläufen.",
      ],
      [
        "Was kostet die Umstellung?",
        "Wenn Sie bereits ein Rechnungsprogramm haben, sollte der Hersteller es angepasst haben: Dazu ist er seit Juli 2025 verpflichtet. Wenn Sie mit Tabelle oder Block arbeiten, sind die Kosten nicht die von VeriFactu, sondern die der Umstellung auf eine systematische Rechnungsstellung. Wir halten vorher schriftlich fest, was gemacht wird, was nicht und was es kostet.",
      ],
      [
        "Und wenn erneut verschoben wird — war ich dann zu früh dran?",
        "Nein, denn der Nutzen, dass die Rechnung aus dem Arbeitsbericht entsteht, hängt an keiner Frist des Finanzamts. Die Stunden, die man spart, weil nichts zweimal getippt wird, spart man 2026 genauso wie 2028. Die Rechtssicherheit ist die Folge, nicht der Anlass.",
      ],
    ],
  },

  "control-horario": {
    h1: ["Zeiterfassung", "für Betriebe"],
    entradilla:
      "Jede Person stempelt über das eigene Handy, mit Uhrzeit und Ort. Der Nachweis bleibt gespeichert, abrufbar und für eine Prüfung exportierbar.",
    intro: [
      "Zwei Dinge werden ständig vermischt, und es lohnt sich, sie zu trennen. Die Arbeitszeiterfassung ist in Spanien seit dem 12. Mai 2019 Pflicht, geregelt in Artikel 34.9 des Arbeitnehmerstatuts. Ob dieser Nachweis digital sein muss, ist eine andere Frage — und bislang muss er es nicht: Das Gesetz lässt Papier, Tabelle oder Software zu, solange das System zuverlässig, objektiv und zugänglich ist.",
      "Die Verordnung, die das digitale Format verlangen würde, ist seit Monaten angekündigt und weiterhin nicht verabschiedet; der Staatsrat gab eine ablehnende Stellungnahme ab, im Gesetzblatt steht nichts. Wer Ihnen also Software mit dem Hinweis verkauft, digitales Stempeln sei bereits gesetzlich vorgeschrieben, verkauft mit einer Regel, die es noch nicht gibt. Der eigentliche Grund ist ein anderer: Bei Technikern, die über die ganze Insel verteilt sind, weiß niemand, wer den Zettel wann ausgefüllt hat.",
    ],
    claves: [
      {
        titulo: "Gestempelt wird dort, wo gearbeitet wird",
        texto:
          "Wer den Tag an einer Wohnanlage in Calvià beginnt, stempelt dort über das Handy — ohne vorher ins Lager zu fahren. Uhrzeit und Ort von Beginn und Ende werden erfasst, und genau das macht den Nachweis prüfungsfest.",
      },
      {
        titulo: "Die Stunden kommen aus dem Bericht, nicht aus einer Schätzung",
        texto:
          "Weil Stempelung und Arbeitsbericht am selben Ort liegen, lassen sich die Stunden jedes Technikers den Aufträgen des Tages zuordnen. Man sieht, welcher Teil des Tages zu welchem Kunden gehörte, ohne dass das jemand am Monatsende rekonstruiert.",
      },
      {
        titulo: "Exportierbar an dem Tag, an dem man danach fragt",
        texto:
          "Der Nachweis lässt sich pro Person und Zeitraum in einem übergabefähigen Format ausgeben. Die Pflicht ist nicht nur, die Daten zu speichern: Sie müssen für die beschäftigte Person, ihre Vertretung und die Arbeitsinspektion zugänglich sein.",
      },
    ],
    faq: [
      [
        "Ist die Zeiterfassung in Spanien Pflicht?",
        "Ja, seit dem 12. Mai 2019. Artikel 34.9 des Arbeitnehmerstatuts verlangt, Beginn und Ende des Arbeitstags jeder beschäftigten Person täglich zu erfassen und diesen Nachweis vier Jahre aufzubewahren.",
      ],
      [
        "Ist digitales Stempeln bereits Pflicht?",
        "Nein. Die Verordnung dazu ist nicht verabschiedet: Der Staatsrat hat eine ablehnende Stellungnahme abgegeben, im Gesetzblatt ist nichts erschienen. Bis dahin lässt das Gesetz weiterhin Papier oder Tabelle zu, sofern das System zuverlässig, objektiv und zugänglich ist. Nach Verabschiedung sieht der Entwurf sechs Monate Übergangsfrist ab Veröffentlichung der technischen Vorgaben vor.",
      ],
      [
        "Reicht eine Excel-Tabelle?",
        "Rechtlich heute ja. In der Praxis bricht sie zusammen, sobald Leute außer Haus arbeiten: Eine Tabelle, die freitags aus dem Gedächtnis ausgefüllt wird, ist keine tägliche Erfassung, und das fällt bei einer Prüfung auf. Wenn alle zur selben Zeit am selben Ort erscheinen, genügt Excel. Bei Technikern auf der ganzen Insel nicht.",
      ],
      [
        "Darf man per Fingerabdruck stempeln?",
        "Praktisch nein. Die spanische Datenschutzbehörde behandelt Fingerabdruck und Gesicht als biometrische Daten und schließt sie für die Zeiterfassung aus, sofern es eine weniger eingreifende Alternative gibt — und verlangt sonst ausdrückliche, widerrufbare Einwilligung. Es gibt einfachere Wege, die dieses Feld gar nicht erst betreten.",
      ],
      [
        "Und die Überstunden?",
        "Die ergeben sich aus demselben Nachweis. Sind acht Stunden vereinbart und die Erfassung zeigt neuneinhalb, ist die Differenz bereits gezählt, ohne dass sie jemand gesondert notiert. Genau deshalb gibt es die Pflicht überhaupt.",
      ],
    ],
  },

  "partes-de-trabajo": {
    h1: ["App für", "Arbeitsberichte"],
    entradilla:
      "Der Techniker schließt den Bericht am Handy ab — mit Fotos, Material und Unterschrift des Kunden — und im Büro liegt er, bevor der Wagen losfährt.",
    intro: [
      "Das Problem am Papierbericht ist nicht das Papier, sondern der Weg. Er wird um elf Uhr in einem Keller in Palma ausgefüllt und erreicht das Büro am Freitag: zerknittert, in einer Handschrift, die niemand entziffert, ohne Unterschrift, weil der Kunde schon weg war. Dazwischen liegen vier Tage, in denen diese Reparatur weder abgerechnet noch nachgeschlagen werden konnte.",
      "Und wenn der Kunde im März anruft und fragt, was bei dem Termin im November gemacht wurde, hängt die Antwort daran, dass sich jemand erinnert. Das ist kein Ordnungsproblem: Die Information liegt an einem Ort, an dem sie nichts nützt.",
    ],
    claves: [
      {
        titulo: "Der Kunde unterschreibt auf dem Display",
        texto:
          "Der Kunde unterschreibt zum Abschluss mit dem Finger und erhält seine Kopie als PDF per E-Mail oder WhatsApp. Der Bericht wird mit dieser Unterschrift, ihrem Zeitstempel und dem Namen geschlossen. Das ist der Unterschied zwischen abrechnen und diskutieren.",
      },
      {
        titulo: "Fotos vom Vorher und Nachher",
        texto:
          "Fotos entstehen im Bericht und bleiben darin, nicht in der Galerie des Technikerhandys. Wenn über den Zustand einer Anlage gestritten wird, wiegt ein datiertes Foto schwerer als jede Erklärung.",
      },
      {
        titulo: "Material geht vom Lagerbestand ab",
        texto:
          "Was im Bericht als verbraucht erfasst wird, verlässt das Lager und landet auf der Rechnung. Ohne diese Kette wird Material doppelt oder gar nicht gebucht — und genau dort verschwindet die Marge eines Dienstleistungsbetriebs.",
      },
    ],
    faq: [
      [
        "Funktioniert das ohne Empfang?",
        "Ja. Der Bericht wird auch ohne Netz am Handy ausgefüllt und unterschrieben — im Keller, in einer Halle ohne Empfang, auf einer Finca im Landesinneren — und lädt sich hoch, sobald wieder Verbindung besteht. Das ist die Bedingung dafür, dass es im Einsatz taugt und nicht nur in der Demo.",
      ],
      [
        "Muss der Kunde etwas installieren, um zu unterschreiben?",
        "Nein. Er unterschreibt mit dem Finger auf dem Handy des Technikers und bekommt das PDF per E-Mail oder WhatsApp. Es gibt keine App und kein Konto, denn beides würde dazu führen, dass die Hälfte der Unterschriften nie zustande kommt.",
      ],
      [
        "Kann direkt aus dem Bericht abgerechnet werden?",
        "Ja, und das ist der Hauptgrund für den digitalen Bericht. Die erfassten Stunden und Materialien wandern in die Rechnung, ohne dass jemand sie erneut tippt — mit VeriFactu, sobald es so weit ist.",
      ],
      [
        "Was passiert mit unseren bisherigen Papierberichten?",
        "Die bleiben, wie sie sind. Niemand tippt zwei Jahre Ordner von Hand ab, und das vorzuschlagen hieße, Ihnen sinnlose Arbeit zu verkaufen. Begonnen wird mit den neuen; das Archiv bleibt für Nachfragen an seinem Platz.",
      ],
      [
        "Ab wie vielen Technikern lohnt sich das?",
        "Schon bei einem, wenn er auswärts arbeitet — denn der Gewinn ist, dass der Bericht noch am selben Tag ankommt. Ab drei oder vier ist der Gewinn, zu wissen, was jeder gerade tut, ohne anrufen zu müssen.",
      ],
    ],
  },

  presupuestos: {
    h1: ["Software für", "Angebote"],
    entradilla:
      "Angebote mit Ihren Positionen und Ihren Preisen, versendet per WhatsApp oder E-Mail, mit Hinweis beim Öffnen und Annahme per Klick.",
    intro: [
      "In einem Dienstleistungsbetrieb entsteht jedes Angebot zweimal: einmal im Kopf, vor Ort beim Kunden, und einmal abends am Rechner, beim Versuch, sich an die Maße zu erinnern. Das zweite Mal geht verloren — und mit ihm die Hälfte der Aufträge, die man gewonnen hätte.",
      "Dann kommt, was nach dem Versand passiert. Man schickt ein PDF, und es beginnt das Schweigen. Ob er es geöffnet hat, ob er vergleicht oder ob es im Posteingang untergegangen ist, weiß niemand. Eine Woche später ruft man an, mit diesem unangenehmen Gefühl, hinterherzulaufen.",
    ],
    claves: [
      {
        titulo: "Die Positionen sind Ihre",
        texto:
          "Der Katalog aus Positionen, Stundensätzen und Material ist der Ihres Betriebs, keine allgemeine Vorlage. Ein Angebot zu erstellen heißt dann auswählen statt schreiben — und das ist der Unterschied zwischen Übergabe beim Termin und Übergabe am selben Abend.",
      },
      {
        titulo: "Sie sehen, wann es geöffnet wird",
        texto:
          "Sie erhalten einen Hinweis, sobald der Kunde das Angebot öffnet. Schluss mit Anrufen ins Blaue: Sie rufen den an, der es dreimal angesehen hat — nicht den, der es nie geöffnet hat und ein ganz anderes Gespräch braucht.",
      },
      {
        titulo: "Annehmen ist ein Knopf, keine Antwort",
        texto:
          "Der Kunde nimmt über denselben Link an, ohne eine E-Mail mit „ja“ schreiben zu müssen. Und mit der Annahme wird aus dem Angebot ein eingeplanter Auftrag samt Positionen, statt eines abgelegten PDFs.",
      },
    ],
    faq: [
      [
        "Lässt sich das Angebot vor Ort beim Kunden erstellen?",
        "Genau darum geht es. Mit hinterlegten Positionen und Preisen entsteht es während des Termins am Handy und geht raus, bevor Sie wieder im Wagen sitzen. Ein vor Ort übergebenes Angebot wird deutlich häufiger angenommen als eines, das drei Tage später eintrifft.",
      ],
      [
        "Erscheinen unser Logo und unsere Bedingungen?",
        "Ja. Logo, Steuerdaten, Zahlungsbedingungen und Bindefrist stehen auf jedem Angebot, ohne dass jemand daran denken muss.",
      ],
      [
        "Was, wenn der Kunde Änderungen wünscht?",
        "Es entsteht eine neue Fassung, die alte bleibt erhalten. So bleibt nachvollziehbar, was zuerst angeboten und was am Ende vereinbart wurde — genau das fehlt, wenn drei Monate später eine Unstimmigkeit auftaucht.",
      ],
      [
        "Taugt das für Bau und Sanierung?",
        "Ja, mit Positionen nach Gewerken und Mengen. Es ist kein Aufmaßprogramm für den Tiefbau mit amtlichen Preisdatenbanken: Es ist für Dienstleistungs- und Sanierungsbetriebe, die mit eigenen Preisen kalkulieren.",
      ],
      [
        "Und vom Angebot zur Rechnung?",
        "Direkt. Angenommenes wird zum Auftrag, der Auftrag zum Bericht, der Bericht zur Rechnung — mit dem, was tatsächlich ausgeführt wurde. So sehen Sie die Lücke zwischen kalkuliert und verbraucht, und dort zeigt sich, ob eine Auftragsart Geld bringt.",
      ],
    ],
  },

  "chatbot-whatsapp": {
    h1: ["WhatsApp-Chatbot", "für Betriebe"],
    entradilla:
      "Beantwortet die immer gleichen Fragen rund um die Uhr, nimmt die Daten des Auftrags auf und übergibt an einen Menschen, sobald es darauf ankommt.",
    intro: [
      "Ein Dienstleistungsbetrieb auf Mallorca bekommt dieselbe WhatsApp-Nachricht fünfzehnmal am Tag: Wann haben Sie geöffnet, fahren Sie nach Andratx, was kostet eine Wartung, können Sie heute kommen. Nichts davon verlangt eine Entscheidung — zusammengenommen frisst es den Vormittag derjenigen Person, die eigentlich die Techniker einteilen sollte.",
      "Und um acht Uhr abends, wenn ein echter Notruf hereinkommt, liest niemand mit. Am nächsten Tag hat dieser Kunde längst woanders angerufen. Das Problem ist nicht zu wenig Personal: Es ist, dass ein Kanal vermischt, was jeder beantworten könnte, mit dem, was nicht warten kann.",
    ],
    claves: [
      {
        titulo: "Beantwortet das Wiederkehrende, gibt den Rest weiter",
        texto:
          "Öffnungszeiten, Einsatzgebiete und Terminvereinbarung laufen automatisch. Sobald eine Nachricht darüber hinausgeht — eine Störung, eine Beschwerde, ein größeres Angebot — landet sie bei einem Menschen, mitsamt dem bisherigen Verlauf statt bei null.",
      },
      {
        titulo: "Der Auftrag kommt mit seinen Daten an",
        texto:
          "Vor der Übergabe wird abgefragt, was ohnehin immer gefragt werden muss: Adresse, was los ist, seit wann und ob es dringend ist. Der Arbeitsauftrag entsteht damit bereits ausgefüllt — statt mit einem „diesen Herrn zurückrufen“, das dasselbe Gespräch ein zweites Mal erzwingt.",
      },
      {
        titulo: "In der Sprache, in der geschrieben wird",
        texto:
          "Es antwortet auf Spanisch, Englisch oder Deutsch, je nachdem, wie man Ihnen schreibt. Auf Mallorca ist das kein Schmuck, sondern bei vielen Dienstleistungsbetrieben die halbe Kundschaft.",
      },
    ],
    faq: [
      [
        "Merkt der Kunde, dass er mit einem Bot schreibt?",
        "Man sagt es ihm. Der Versuch, es als Mensch auszugeben, fliegt beim ersten schrägen Satz auf und beschädigt das Vertrauen ausgerechnet beim Erstkontakt. Was ein Kunde um elf Uhr nachts schätzt, ist, dass sein Anliegen aufgenommen wird — nicht, dass man ihn darüber täuscht, wer es aufnimmt.",
      ],
      [
        "Braucht man die WhatsApp Business API?",
        "Für eine saubere Lösung ja. Sie ist der offizielle Kanal von Meta und der einzige, über den automatisiert geantwortet werden darf, ohne die Nummer zu gefährden. Es fallen Kosten je Konversation nach den Tarifen von Meta an; wir erklären sie vorab und legen sie nicht fest.",
      ],
      [
        "Verlieren wir unsere bisherige Nummer?",
        "Nein, aber es muss vorher entschieden werden. Eine Nummer, die bereits in der normalen WhatsApp-App läuft, kann nicht gleichzeitig auf der API liegen. Das ist unser erstes Gespräch, denn umgekehrt müssten Sie der gesamten Kundschaft eine neue Nummer mitteilen.",
      ],
      [
        "Lässt es sich während der Bürozeiten abschalten?",
        "Ja, und am Anfang ist das meist vernünftig: Von neun bis achtzehn Uhr antwortet das Team, außerhalb übernimmt der Assistent. So sehen Sie, wo er danebenliegt, bevor Sie ihm das ganze Gespräch überlassen.",
      ],
      [
        "Was passiert, wenn er etwas nicht versteht?",
        "Er übergibt an einen Menschen und sagt das auch. Ein Assistent, der beharrlich nicht versteht, ist schlimmer als keiner — deshalb ist er so eingestellt, dass er früh aufgibt und die Nachricht mit allem Gesammelten im Posteingang hinterlässt.",
      ],
    ],
  },
};
