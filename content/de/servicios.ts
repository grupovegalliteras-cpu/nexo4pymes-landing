/* Deutsche Fassung von content/servicios.ts (Anrede: Sie). */

export const navServicios = [
  { href: "#servicios", texto: "Was wir bauen" },
  { href: "#metodo", texto: "Methode" },
  { href: "#caso", texto: "Warum Analyse" },
  { href: "#como-empezar", texto: "So beginnt es" },
  { href: "#faq", texto: "Fragen" },
];

export const heroServicios = {
  volver: { texto: "← Zur Startseite", href: "/" },
  titularA: "Wir verkaufen keine Software.",
  titularB: "Zuerst prüfen wir, ob Sie sie wirklich brauchen.",
  parrafo:
    "Wir sind Nexo4Pymes, ein kleines Team auf Mallorca. Wir entwickeln individuelle digitale Lösungen für kleine Unternehmen jeder Branche: eigene CRMs, Web-Konfiguratoren und Integrationen. Hier finden Sie im Detail, was wir bauen, wie wir arbeiten und wie man anfängt.",
  cta: "Schreiben Sie uns auf WhatsApp",
  indice: [
    { href: "#servicios", texto: "Was wir bauen" },
    { href: "#central-avisos", texto: "CentralAvisos" },
    { href: "#metodo", texto: "So arbeiten wir" },
    { href: "#caso", texto: "Warum zuerst die Analyse" },
    { href: "#como-empezar", texto: "So beginnt es" },
    { href: "#faq", texto: "Fragen" },
  ],
};

export const servicios = {
  categoria: "Was wir bauen",
  titular: "Vier Softwarebausteine, und Sie beginnen mit einem",
  intro:
    "Keine vagen „digitalen Lösungen“. Das wird gebaut, mit Umfang und Grenzen. Sie müssen nicht alles beauftragen: In der Roadmap wird entschieden, was sich zuerst lohnt und in welcher Reihenfolge der Rest folgt.",
  tarjetas: [
    {
      icono: "lista" as const,
      tono: "azul" as const,
      titulo: "Individuelle CRMs und Verwaltungssysteme",
      texto: "Die Software, die Ihr Geschäft im Hintergrund steuert, gebaut nach Ihrer tatsächlichen Arbeitsweise. Keine Vorlage, an die Sie sich anpassen müssen.",
      items: [
        "Kunden, Aufträge, Angebote und Historie an einem Ort",
        "Status und Schritte sind Ihre eigenen, mit Ihren Bezeichnungen",
        "Berechtigungen pro Person: Jeder sieht, was er sehen soll",
        "Ein Dashboard mit den Geschäftszahlen, ohne Tabellen von Hand abzugleichen",
        "Ersetzt verstreute Excel-Dateien oder läuft neben ihnen, solange nötig",
      ],
    },
    {
      icono: "globo" as const,
      tono: "violeta" as const,
      titulo: "Web-Konfiguratoren und Designer",
      texto: "Ein Werkzeug in Ihrer Website, mit dem der Kunde sein Produkt anpasst, gestaltet oder kalkuliert, ohne dass ihn jemand betreuen muss.",
      items: [
        "Der Kunde wählt Maße, Oberflächen und Optionen und sieht sofort das Ergebnis",
        "Preis nach Ihren Regeln, Margen und Rabatten berechnet",
        "Visuelle Vorschau dessen, was er zusammenstellt, wenn das Produkt es erlaubt",
        "Die Anfrage kommt komplett an: kein Rätseln, was der Kunde wollte",
        "Mit der Verwaltung verbunden, das Angebot wird nie doppelt getippt",
      ],
    },
    {
      icono: "reloj" as const,
      tono: "azul" as const,
      titulo: "Zeiterfassung und Arbeitszeit",
      texto: "Jeder stempelt mit dem eigenen Handy, und die Stunden summieren sich von selbst. Für Teams, die nicht im Büro sitzen.",
      items: [
        "Kommen, Gehen und Pausen per Handy, mit Uhrzeit und Standort",
        "Stunden pro Person, Woche und Projekt, ohne Stundenzettel abzugleichen",
        "Nachvollziehbares Protokoll: wer wann und von wo gestempelt hat",
        "Verantwortliche sehen das ganze Team; jede Person nur ihre eigenen Daten",
        "Prüfen Sie es mit Ihrer Steuerberatung (Gestoría): Wir bauen das Werkzeug, wir zertifizieren nicht die Rechtskonformität",
      ],
    },
    {
      icono: "engranaje" as const,
      tono: "mint" as const,
      titulo: "Automatisierung und KI-Integrationen",
      texto: "Der Kitt zwischen den Bausteinen: Website, Verwaltungssystem und die Tools, die Sie schon nutzen. Hier kommt die KI ins Spiel, als Unterstützung des Prozesses und nicht als Produkt.",
      items: [
        "Synchronisierung zwischen Website, Verwaltung und Ihren gewohnten Tools",
        "Dokumente, die sich selbst erstellen und versenden: Angebote, Rechnungen, Lieferscheine",
        "Geplante Erinnerungen und Nachfassaktionen, damit nichts liegen bleibt",
        "Automatische Antworten auf häufige Nachrichten, bei Bedarf an einen Menschen übergeben",
        "Auslesen und Einordnen von Dokumenten, die heute jemand von Hand abtippt",
      ],
    },
  ],
};

export const metodoServicios = {
  categoria: "So arbeiten wir",
  titular: "Vom ersten Gespräch bis zum laufenden System",
  intro: "Vier Schritte, ohne Überraschungen und ohne Zwölfmonatsverträge. Bei jedem können Sie aufhören.",
  pasos: [
    {
      num: "1",
      meta: "15 Minuten · Videocall oder WhatsApp",
      titulo: "Erstgespräch",
      texto:
        "Sie erzählen uns, wie Ihr Geschäft heute läuft und womit Sie täglich kämpfen. Wir sagen Ihnen ehrlich, ob das zu Ihnen passt oder nicht. Wenn nicht, endet es hier, ganz ohne Groll.",
    },
    {
      num: "2",
      meta: "3-4 Tage · schriftlich",
      titulo: "Analyse und Roadmap",
      texto:
        "Wir prüfen gründlich, wie Sie arbeiten: wie ein Kunde hereinkommt, wie ein Angebot entsteht, wo welche Daten liegen und welche Programme Sie schon haben. Am Ende steht ein Dokument mit dem Diagramm Ihrer heutigen Abläufe, der benötigten Software nach Wirkung und Aufwand geordnet, den Risiken jedes Bausteins und dem Umfang jeder Phase. Dieses Dokument gehört Ihnen, ob Sie mit uns weitermachen oder nicht.",
    },
    {
      num: "3",
      meta: "Phase für Phase · vorher freigegeben",
      titulo: "Entwicklung und Einführung",
      texto:
        "Gebaut wird, was Sie entschieden haben, beginnend mit dem Baustein mit der größten Wirkung bei geringstem Aufwand. Sie sehen das System im Verlauf arbeiten, nicht erst am Ende. Jede Phase wird vereinbart und freigegeben, bevor etwas angefasst wird.",
    },
    {
      num: "4",
      meta: "Nach dem Start",
      titulo: "Feinschliff und Begleitung",
      texto:
        "In den ersten Wochen im echten Einsatz tauchen immer Fälle auf, mit denen niemand gerechnet hat. Das System wird angepasst, Störendes behoben und wir prüfen, dass das Team es wirklich nutzt. Deshalb arbeiten wir mit wenigen Kunden gleichzeitig.",
    },
  ],
};

export const casoDiagnostico = {
  categoria: "Warum die Analyse immer zuerst kommt",
  titular: "Software auf einem kaputten Prozess kostet Sie zweimal",
  parrafos: [
    "Es ist der Fehler, den wir immer wieder sehen. Ein Betrieb führt alles an vier verschiedenen Orten — einer Tabelle, dem E-Mail-Postfach, einem Notizbuch und dem Kopf einer Person — und bestellt „ein CRM“. Bauen wir es einfach nach, entsteht ein Programm, das das alte Durcheinander nachbildet, nur jetzt mit Ihrem Namen darauf und bezahlter Entwicklungsrechnung.",
    "Deshalb kommt die Technik nicht zuerst. Zuerst schauen wir uns an, wie heute ein Kunde hereinkommt, wer was anfasst, wo etwas verloren geht und welche Teile Ihres Ablaufs es wert sind, so zu bleiben. Erst danach entscheiden wir, was gebaut, was verbunden und was nicht angefasst wird.",
  ],
  cita: "Wenn Sie keine individuelle Software brauchen, sagen wir es Ihnen. Auch das gehört zur Arbeit.",
};

export const comoEmpezar = {
  categoria: "So beginnt es",
  titular: "Drei Wege zu starten, und der erste dauert fünfzehn Minuten",
  intro:
    "Eine Geschichte, auf der ganzen Website dieselbe: Zuerst sprechen wir, dann analysieren wir Ihre Arbeitsweise und geben sie Ihnen schriftlich, und erst dann wird gebaut. Immer Phase für Phase, und Sie entscheiden, wie weit es geht.",
  paso1: {
    meta: "Schritt 1 · Das Gespräch",
    destacado: "15 Minuten",
    texto: "Ein kurzer Videocall, unverbindlich und ohne Verkaufspräsentation. Es geht darum zu sehen, ob wir zusammenpassen — und manchmal lautet die Antwort nein.",
  },
  paso2: {
    meta: "Schritt 2 · Die Analyse",
    destacado: "Schriftlich",
    texto:
      "Eine vollständige Analyse Ihrer Arbeitsweise und eine priorisierte Roadmap, als Dokument geliefert: welche Software Sie brauchen, was warten kann und was sich nicht lohnt. Eine echte Analyse, kein verkapptes Verkaufsgespräch.",
  },
  paso3: {
    meta: "Schritt 3 · Optional",
    destacado: "Phase für Phase",
    texto:
      "Jeder Baustein der Roadmap wird vor dem Start einzeln freigegeben. Sie sehen das System im Verlauf arbeiten und entscheiden, wie weit es geht und wann Schluss ist, ohne Bindung und ohne Mindestlaufzeit.",
  },
  callout: {
    fuerte: "Und wenn Sie nicht weitermachen:",
    texto: "Das Analysedokument gehört trotzdem Ihnen, mit der vollständigen Analyse und der Roadmap. Sie können es selbst umsetzen oder damit zu wem auch immer gehen.",
  },
};

export const avisosServicios = {
  categoria: "Eigenes Produkt · in Zusammenarbeit mit Multiservicios Mallorca",
  titular: "Und etwas, das schon fertig ist: CentralAvisos",
  parrafo:
    "Alles oben wird individuell gebaut und beginnt mit einer Analyse. CentralAvisos nicht: Es ist unser eigenes Produkt und funktioniert bereits. Es sammelt Ihre Anrufe, WhatsApp-Nachrichten, E-Mails und das Website-Formular und ordnet sie nach Dringlichkeit in einem Dashboard, das Büro und Techniker sehen.",
  nota: "Wenn Ihnen genau das fehlt, brauchen Sie weder Analyse noch Projekt: buchen, und es läuft.",
  ctaPrincipal: "Schreiben Sie uns AVISOS auf WhatsApp",
  ctaSecundario: "So funktioniert es",
};

export const faqServicios = [
  {
    p: "Wir verstehen nichts von Technik. Ist das ein Problem?",
    r: "Im Gegenteil: Mit diesem Profil arbeiten wir am besten. Sie bringen das Wissen über Ihr Geschäft ein, wir machen daraus Software. Sie müssen nicht verstehen, wie es innen gebaut ist, und das System wird mit einer Einführung für das Team übergeben.",
  },
  {
    p: "Wir haben schon ein Programm. Müssen wir es wegwerfen?",
    r: "Nicht unbedingt, das wird in der Analyse entschieden. Manchmal fehlt nur ein Baustein, der sich mit dem Vorhandenen verbindet; manchmal ist das aktuelle Programm genau das Problem und ein Ersatz lohnt sich. Was wir nicht tun: einfach annehmen, dass alles ausgetauscht werden muss.",
  },
  {
    p: "Gehört die Software Ihnen oder uns?",
    r: "Ihnen. Code und Datenbank liegen in Ihren Konten, und Sie können sie jederzeit mitnehmen, auch an dem Tag, an dem Sie mit jemand anderem arbeiten. Es gibt keine monatliche Lizenz und keine Plattform von uns, die man nicht verlassen kann: Sie beauftragen eine Entwicklung, Sie mieten keinen Platz.",
  },
  {
    p: "Gibt es eine Mindestlaufzeit oder Bindung?",
    r: "Keine. Jede Phase wird einzeln vereinbart und freigegeben, und Sie entscheiden, ob es eine nächste gibt. Wenn Sie aufhören möchten, hören Sie auf, und das Gebaute läuft in Ihren Konten weiter. Die spätere Wartung ist optional und ebenfalls kündbar.",
  },
  {
    p: "Wir sind nicht auf Mallorca. Arbeiten Sie aus der Ferne?",
    r: "Ja. Der ganze Ablauf — Gespräch, Analyse, Entwicklung und Begleitung — funktioniert problemlos aus der Ferne. Nähe hilft, ist aber nicht nötig.",
  },
  {
    p: "Wie lange dauert das alles?",
    r: "Die Analyse liegt 3–4 Tage nach dem ersten Treffen vor. Die Entwicklung hängt von den gewählten Phasen ab, und genau deshalb arbeiten wir in Phasen: Der erste Baustein soll innerhalb von Wochen laufen, nicht Monaten. Keine Halbjahresprojekte, bevor Sie das erste Ergebnis sehen.",
  },
];

export const cierreServicios = {
  titular: "Erzählen Sie uns, wie Sie heute arbeiten",
  texto: "15 Minuten per Videocall, unverbindlich. Danach wissen Sie, ob Ihr Betrieb eigene Software braucht — auch wenn die Antwort lautet: noch nicht.",
  cta: "Schreiben Sie uns auf WhatsApp",
  escribir: "Lieber schriftlich? ",
};
