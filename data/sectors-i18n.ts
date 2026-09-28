import type { Idioma } from "@/lib/i18n";
import { SECTORES, type Sector, type SectorId } from "./sectors";

/* ============================================================
   SECTORES EN INGLÉS Y ALEMÁN
   Solo el texto: precios, tiempos, referencias, colores y rangos de
   medición salen de data/sectors.ts. Cada lista va en el mismo orden
   que en español (servicio 0 = servicio 0, línea 2 = línea 2…).
   Los nombres propios (empresas, clientes, personas, pueblos) no se
   traducen: son de Mallorca.
   ============================================================ */

type Textos = {
  nombre: string;
  lema: string;
  dolor: string;
  instalacion: { tipo: string; plural: string; nombres: string[] };
  servicios: string[];
  checklist: string[];
  mediciones: string[];
  material: string[];
  contrato: string;
  llamada: { instalacionNombre: string; resumen: string; lineas: string[] };
  avisos: { resumen: string; lineas: string[] }[];
};

const EN: Record<SectorId, Textos> = {
  mantenimiento: {
    nombre: "Building maintenance",
    lema: "Plumbing, electrics and boilers",
    dolor: "Hotels and residents' associations calling at all hours, and a notebook that can't keep up.",
    instalacion: { tipo: "Installation", plural: "Installations", nombres: ["Plant room boiler", "Main electrical panel", "Booster pump set", "Water heater, 2nd floor", "Sump pump", "Hot water, guest rooms"] },
    servicios: ["Plumbing repair", "Boiler service", "Electrical fault", "Preventive maintenance", "Water heater replacement"],
    checklist: ["Find the source of the fault", "Shut off supply to the area", "Repair or replace the part", "Leak test", "Clean the work area", "Explain the work to the customer"],
    mediciones: ["Mains pressure", "Hot water temperature", "Voltage"],
    material: ["Flexible hose 30 cm", "Ball valve 1/2\"", "Low-profile shower trap", "Sanitary silicone", "Circuit breaker 16 A", "Cable 2.5 mm²", "Universal thermocouple", "PTFE tape"],
    contrato: "Full maintenance",
    llamada: {
      instalacionNombre: "Bathroom, room 214",
      resumen: "Water leaking under the shower tray in room 214, with guests checking in at 2 pm.",
      lineas: [
        "Mantenimientos Llevant, good morning, Marga speaking.",
        "Hi Marga, it's Carmen from reception at Hotel Sa Roca, in Calvià.",
        "We've got a leak in the bathroom of room 214. Water is coming out under the shower tray and it's already reaching the corridor.",
        "OK, have you turned off the room's stopcock?",
        "Yes, but guests are checking in at two and we need the room ready.",
        "Understood, I'm sending a technician right now. You'll get a message when they're on their way.",
      ],
    },
    avisos: [
      { resumen: "No power in the kitchen area, the RCD trips when the oven is switched on.", lineas: ["Hi, at the restaurant the RCD trips every time we switch on the oven.", "We're fully booked tonight, can you come today?"] },
      { resumen: "The building's boiler shows an error and there's no hot water in block B.", lineas: ["I'm calling from the residents' association, the boiler has been showing error E133 since this morning.", "Does it affect the whole building?", "Only block B, block A is fine."] },
      { resumen: "Asks for a quote to replace the 80-litre water heater at their home.", lineas: ["I'd like to replace the 80-litre electric water heater, it's 12 years old. Could you send me a price?"] },
      { resumen: "Asks when the next contract visit is due.", lineas: ["Good morning, when is our next preventive maintenance visit?"] },
      { resumen: "The tap repaired last week is dripping again.", lineas: ["The staff-room tap you fixed on Tuesday is dripping again.", "I'm very sorry, we'll log it under warranty and send the same technician."] },
    ],
  },
  limpieza: {
    nombre: "Cleaning",
    lema: "Offices, residential buildings and post-construction",
    dolor: "Rotas in Excel, shift changes over WhatsApp and clients asking for proof the cleaning was done.",
    instalacion: { tipo: "Site", plural: "Sites", nombres: ["Offices, 1st floor", "Common areas", "Reception and toilets", "Waiting room", "Changing rooms", "Entrance and stairs"] },
    servicios: ["Regular cleaning", "Post-construction cleaning", "Window cleaning", "Floor polishing", "Common area disinfection"],
    checklist: ["Toilets cleaned and restocked", "Bins emptied", "Floors mopped", "Surfaces and handles disinfected", "Entrance glass", "Photo of the result"],
    mediciones: ["Area cleaned", "Disinfectant dilution"],
    material: ["Chlorine disinfectant 5 L", "Paper hand towels", "Bin bags 100 L", "Neutral floor cleaner 5 L", "Microfibre cloths", "Glass cleaner 5 L", "Hand soap 5 L"],
    contrato: "Regular cleaning",
    llamada: {
      instalacionNombre: "Surgeries and waiting room",
      resumen: "They need the waiting room and two surgeries disinfected before opening tomorrow at 8 am.",
      lineas: [
        "Netbrill Neteja, Marga speaking.",
        "Hi, it's Laura from Clínica Dental Llevant, in Manacor.",
        "The painters were here today and left the waiting room and two surgeries covered in dust.",
        "We open at eight tomorrow with patients booked. Could you come this afternoon?",
        "Yes, we'll send someone this afternoon and send you photos of the result when they finish.",
      ],
    },
    avisos: [
      { resumen: "The 2nd-floor toilets weren't restocked on Thursday.", lineas: ["On Thursday the toilet paper on the second floor wasn't restocked."] },
      { resumen: "Post-construction cleaning of a 180 m² shop unit in Palma.", lineas: ["We've just finished work on a 180 m² shop unit in Palma. We need a price for the final clean."] },
      { resumen: "Asks whether exterior windows can be added to the contract.", lineas: ["Could you include the exterior windows once a month?"] },
      { resumen: "Minor flooding in the entrance hall, needs drying and disinfecting today.", lineas: ["A pipe has burst in the entrance hall and there's water all over the floor.", "We'll send someone to dry and disinfect as soon as it's fixed."] },
      { resumen: "Polishing the hotel lobby floor before the season.", lineas: ["Before the season opens we'd like the marble in the lobby polished."] },
    ],
  },
  piscinas: {
    nombre: "Pools",
    lema: "Pool maintenance for private and holiday villas",
    dolor: "High season, a hundred pools a week and owners who live abroad and want to see how the water looks.",
    instalacion: { tipo: "Pool", plural: "Pools", nombres: ["Main pool", "Children's pool", "Outdoor jacuzzi", "Infinity pool", "Indoor pool"] },
    servicios: ["Weekly maintenance", "Green water recovery", "Season start-up", "Pump repair", "Filter sand replacement"],
    checklist: ["Clean skimmers and baskets", "Vacuum the floor", "Brush walls and waterline", "Backwash the filter", "Test and adjust pH and chlorine", "Check pump and timer"],
    mediciones: ["pH", "Free chlorine", "Temperature", "Filter pressure"],
    material: ["Chlorine granules 5 kg", "pH reducer 8 kg", "Slow chlorine tablets 5 kg", "Algaecide 5 L", "Flocculant 5 L", "Silica sand 25 kg", "Skimmer basket"],
    contrato: "Seasonal maintenance",
    llamada: {
      instalacionNombre: "Main pool",
      resumen: "Green water in the villa's pool, with guests arriving on Friday.",
      lineas: [
        "Aigua Clara Piscines, Marga speaking.",
        "Hi, it's Tomeu, I manage Villa Es Pinaret, in Alcúdia.",
        "After the storm at the weekend the pool water has turned green.",
        "A family of six arrives on Friday and it has to look perfect.",
        "A technician will treat it today and we'll send you the report with photos and the pH when they finish.",
      ],
    },
    avisos: [
      { resumen: "The pump is noisy and not suctioning, villa occupied.", lineas: ["The pump is making a strange noise and not suctioning. We have guests until Sunday."] },
      { resumen: "Season start-up for a villa in Sóller.", lineas: ["I need the pool at my house in Sóller ready for May."] },
      { resumen: "The owner, who lives abroad, asks for the latest pH and chlorine readings.", lineas: ["Hi, I'm the owner of Villa Sa Talaia. Could you send me this week's water readings?"] },
      { resumen: "Leaves on the pool floor the day after the service.", lineas: ["You came yesterday but today the floor is covered in leaves.", "There was a strong tramuntana wind, we'll come back tomorrow at no charge."] },
      { resumen: "The filter is losing pressure and the water is cloudy.", lineas: ["The filter gauge is reading very low and the water is cloudy."] },
    ],
  },
  climatizacion: {
    nombre: "HVAC and refrigeration",
    lema: "Air conditioning, commercial refrigeration and cold rooms",
    dolor: "Chains with twenty sites, cold rooms that can't fail and refrigerant logs nobody can find.",
    instalacion: { tipo: "Unit", plural: "Units", nombres: ["Cold room", "Split unit, main hall", "Rooftop chiller", "Cassette unit, reception", "Freezer room", "Rooftop unit, sales floor"] },
    servicios: ["Refrigeration fault repair", "Preventive maintenance", "Refrigerant recharge", "Split unit installation", "Filter and coil cleaning"],
    checklist: ["Check operating temperatures", "Measure high and low pressures", "Check for leaks with a detector", "Clean filters and coils", "Check condensate drains", "Log refrigerant in the register"],
    mediciones: ["High-side pressure", "Low-side pressure", "Cold room temperature", "Refrigerant added"],
    material: ["R-32 refrigerant, 9 kg cylinder", "R-448A refrigerant", "Filter drier", "Capacitor 35 µF", "High-pressure switch", "Copper pipe 3/8\"", "Coil cleaner"],
    contrato: "Refrigeration and HVAC maintenance",
    llamada: {
      instalacionNombre: "Cold room, Inca store",
      resumen: "The cold room at the Inca store reads 9 °C, with fresh produce inside.",
      lineas: [
        "Clima Tramuntana, Marga speaking.",
        "Good morning, it's Andreu from maintenance at Supermercats Illa Fresca.",
        "The fresh-produce cold room at the Inca store is at nine degrees and rising.",
        "We have meat and dairy in there; if it isn't fixed in two hours we'll have to throw it out.",
        "We're sending the nearest technician now. You'll see in your portal when they arrive.",
      ],
    },
    avisos: [
      { resumen: "The air conditioning on the Manacor sales floor isn't cooling.", lineas: ["At the Manacor store the air conditioning isn't cooling and it's 29 degrees inside."] },
      { resumen: "Installing three split units in offices in Palma.", lineas: ["We'd like air conditioning in three offices at our premises in Palma."] },
      { resumen: "They need last year's refrigerant log for an audit.", lineas: ["Could you send us last year's refrigerant log for all the stores?"] },
      { resumen: "Water dripping from the cassette unit in the hotel reception.", lineas: ["Water is dripping from the ceiling unit in reception."] },
      { resumen: "The temperature alarm in the freezer room has gone off again.", lineas: ["The alarm on the freezer room in Marratxí has gone off again."] },
    ],
  },
  jardineria: {
    nombre: "Gardening",
    lema: "Garden maintenance, pruning and irrigation",
    dolor: "Crews spread across the island, irrigation that fails in August and regular visits that get forgotten.",
    instalacion: { tipo: "Area", plural: "Areas", nombres: ["Main garden", "Lawn", "Boundary hedge", "Drip irrigation", "Entrance palm trees", "Vegetable garden and fruit trees"] },
    servicios: ["Garden maintenance", "Palm tree pruning", "Irrigation repair", "Plot clearance", "Plant health treatment"],
    checklist: ["Mow the lawn and edge the borders", "Trim hedges", "Check controller and drippers", "Remove green waste", "Check palm trees (red palm weevil)", "Photo of the result"],
    mediciones: ["Lawn area", "Daily watering", "Waste removed"],
    material: ["Pressure-compensating dripper", "PE pipe 16 mm", "Solenoid valve 1\"", "Granular fertiliser 25 kg", "Red palm weevil treatment", "Strimmer line"],
    contrato: "Garden maintenance",
    llamada: {
      instalacionNombre: "Irrigation, entrance area",
      resumen: "The automatic irrigation at the entrance hasn't come on for three days and the lawn is drying out.",
      lineas: [
        "Verd Mallorca, Marga speaking.",
        "Hi, it's Francesca, chair of the Jardins de Sóller residents' association.",
        "The irrigation in the entrance area hasn't come on since Monday and in this heat the lawn is burning.",
        "It's probably the solenoid valve. We'll send someone today.",
      ],
    },
    avisos: [
      { resumen: "A palm tree by the hotel pool with drooping fronds, possible red palm weevil.", lineas: ["One of the palm trees by the pool has drooping fronds in the centre. Weevil?"] },
      { resumen: "Clearing a 2,000 m² plot in Llucmajor.", lineas: ["I need a plot of about 2,000 m² in Llucmajor cleared before the summer."] },
      { resumen: "Asks whether the visit day can move to Thursdays.", lineas: ["Would it be possible to come on Thursdays instead of Mondays?"] },
      { resumen: "Pruning waste left behind in the car park.", lineas: ["Pruning waste has been left in the residents' car park."] },
    ],
  },
  plagas: {
    nombre: "Pest control",
    lema: "Insect control, rodent control and legionella",
    dolor: "Restaurants and hotels facing health inspections that want certificates and bait-station maps on the spot.",
    instalacion: { tipo: "Control point", plural: "Control points", nombres: ["Kitchen and storeroom", "Bin store", "Cold room", "Outdoor area", "Basement", "Floor pantry"] },
    servicios: ["Insect treatment", "Rodent control inspection", "Intensive treatment", "Legionella control", "Periodic HACCP inspection"],
    checklist: ["Inspect control points", "Replace consumed bait", "Apply approved treatment", "Mark the treated area", "Record products and doses", "Hand over the certificate"],
    mediciones: ["Points inspected", "Points with activity", "Product applied"],
    material: ["Cockroach gel", "Rodenticide block bait", "Tamper-resistant bait station", "Microencapsulated insecticide", "Sticky trap", "Warning labels"],
    contrato: "HACCP pest control",
    llamada: {
      instalacionNombre: "Kitchen and storeroom",
      resumen: "Cockroaches in the restaurant kitchen, with a health inspection next week.",
      lineas: [
        "Plagues Illa, Marga speaking.",
        "Hi, it's Jaume from Restaurante Es Moll Vell, in Alcúdia.",
        "Last night we saw cockroaches in the kitchen, behind the hobs.",
        "We have a health inspection next week and I need the certificate.",
        "We'll do an intensive treatment today and leave the certificate in your portal.",
      ],
    },
    avisos: [
      { resumen: "Rodent droppings in the supermarket storeroom.", lineas: ["We've found mouse droppings in the shop's storeroom."] },
      { resumen: "They need the bait-station map and certificates for the audit.", lineas: ["We need the bait-station map and this year's certificates for Thursday's audit."] },
      { resumen: "Legionella control for a 120-room hotel.", lineas: ["We'd like a price for the hotel's annual legionella control."] },
      { resumen: "Ants still appearing after the treatment.", lineas: ["Since Tuesday's treatment ants are still coming out on the terrace."] },
    ],
  },
  solar: {
    nombre: "Solar installations",
    lema: "Solar self-consumption and maintenance",
    dolor: "Projects in phases, systems losing output without anyone noticing and paperwork for every customer.",
    instalacion: { tipo: "PV system", plural: "PV systems", nombres: ["Warehouse roof", "Solar pergola", "House roof", "Ground-mounted array", "Car park canopy"] },
    servicios: ["Performance check", "Panel cleaning", "Inverter repair", "Self-consumption installation", "Battery installation"],
    checklist: ["Visual inspection of panels", "Check inverter and alarms", "Thermal imaging of strings", "Tighten connections", "Compare output with expected", "Performance report"],
    mediciones: ["Today's output", "Performance", "String voltage"],
    material: ["Panel 450 W", "MC4 connector (pair)", "Solar cable 6 mm²", "String fuse 15 A", "Flush-mount frame", "Surge protector"],
    contrato: "Solar PV maintenance",
    llamada: {
      instalacionNombre: "Stable roof",
      resumen: "The system has been producing half its output for a week and the inverter shows an alarm.",
      lineas: [
        "Sol de Migjorn, Marga speaking.",
        "Hi, it's Miquel from Agroturismo Can Vidal, in Sóller.",
        "Since last week the panels are producing half as much and the inverter has a red light.",
        "It could be a string down. We'll send a technician and email you the performance report.",
      ],
    },
    avisos: [
      { resumen: "Self-consumption for a 600 m² warehouse in Marratxí.", lineas: ["We have a 600 m² warehouse in Marratxí and want to install solar panels."] },
      { resumen: "Adding batteries to a home system in Llucmajor.", lineas: ["I've had panels for two years, how much would it cost to add batteries?"] },
      { resumen: "Asks for the production report for the last quarter.", lineas: ["Could you send me last quarter's production?"] },
      { resumen: "The hotel's inverter shut down after a storm.", lineas: ["Since the storm the inverter is completely off."] },
    ],
  },
  reformas: {
    nombre: "Renovations",
    lema: "Full renovations, bathrooms and kitchens",
    dolor: "Long projects, itemised quotes that change every week and clients who want to see progress.",
    instalacion: { tipo: "Project", plural: "Projects", nombres: ["Main bathroom renovation", "Full kitchen", "Full flat renovation", "Terrace and roof", "Shop unit"] },
    servicios: ["Site visit and measuring", "Bathroom renovation", "Kitchen renovation", "Small repair", "Terrace waterproofing"],
    checklist: ["Review the plan for this stage", "Protect common areas", "Carry out today's phase", "Progress photos", "Clean up and remove rubble", "Note pending materials"],
    mediciones: ["Project progress", "Area tiled", "Substrate moisture"],
    material: ["C2 tile adhesive 25 kg", "Tile 30x60", "Plasterboard 13 mm", "Liquid waterproofing 20 kg", "Multilayer pipe 16 mm", "Rubble bag"],
    contrato: "Building maintenance",
    llamada: {
      instalacionNombre: "Shared roof terrace",
      resumen: "Water seeping from the shared roof terrace into the penthouse; they want a visit and a waterproofing quote.",
      lineas: [
        "Reformes Ponent, Marga speaking.",
        "Hi, it's Pere, the property manager for the building at Passeig Mallorca 40, in Palma.",
        "With the rain, water has come in from the roof terrace into the penthouse and the neighbour has stains on the ceiling.",
        "We'd like a visit and a quote to waterproof it before the autumn.",
        "We'll send a technician to measure and you'll get an itemised quote to sign online.",
      ],
    },
    avisos: [
      { resumen: "Kitchen renovation in a flat in Manacor.", lineas: ["We'd like to renovate the kitchen of a flat in Manacor, about 12 m²."] },
      { resumen: "Replacing a bathtub with a shower tray in a house in Inca.", lineas: ["I'd like to replace the bathtub with a shower tray. When can you come and have a look?"] },
      { resumen: "A tile in the renovated bathroom sounds hollow.", lineas: ["One tile in the new bathroom sounds hollow when you step on it."] },
      { resumen: "Asks what stage their project is at and when it will finish.", lineas: ["What stage is our project at? Are we still on track for the planned finish date?"] },
    ],
  },
};

const DE: Record<SectorId, Textos> = {
  mantenimiento: {
    nombre: "Gebäudetechnik",
    lema: "Sanitär, Elektrik und Heizkessel",
    dolor: "Hotels und Eigentümergemeinschaften, die rund um die Uhr anrufen, und ein Notizbuch, das nicht mehr mitkommt.",
    instalacion: { tipo: "Anlage", plural: "Anlagen", nombres: ["Heizkessel Technikraum", "Hauptverteiler", "Druckerhöhungsanlage", "Warmwasserboiler 2. OG", "Tauchpumpe", "Warmwasser Gästezimmer"] },
    servicios: ["Sanitärreparatur", "Kesselwartung", "Elektrische Störung", "Vorbeugende Wartung", "Boileraustausch"],
    checklist: ["Ursache der Störung finden", "Versorgung im Bereich abstellen", "Teil reparieren oder ersetzen", "Dichtheitsprüfung", "Arbeitsbereich reinigen", "Arbeiten dem Kunden erklären"],
    mediciones: ["Netzdruck", "Warmwassertemperatur", "Spannung"],
    material: ["Flexschlauch 30 cm", "Kugelhahn 1/2\"", "Flacher Duschablauf", "Sanitärsilikon", "Leitungsschutzschalter 16 A", "Kabel 2,5 mm²", "Universal-Thermoelement", "Teflonband"],
    contrato: "Komplettwartung",
    llamada: {
      instalacionNombre: "Bad Zimmer 214",
      resumen: "Wasser tritt unter der Duschtasse in Zimmer 214 aus, Gäste reisen um 14 Uhr an.",
      lineas: [
        "Mantenimientos Llevant, guten Morgen, Sie sprechen mit Marga.",
        "Hallo Marga, hier ist Carmen von der Rezeption im Hotel Sa Roca in Calvià.",
        "Wir haben ein Leck im Bad von Zimmer 214. Unter der Duschtasse kommt Wasser raus und es läuft schon in den Flur.",
        "Gut, haben Sie das Absperrventil im Zimmer zugedreht?",
        "Ja, aber um zwei reisen Gäste an und wir brauchen das Zimmer fertig.",
        "Verstanden, ich schicke sofort einen Techniker. Sie bekommen eine Nachricht, sobald er unterwegs ist.",
      ],
    },
    avisos: [
      { resumen: "Kein Strom in der Küche, der FI-Schalter fliegt beim Einschalten des Ofens raus.", lineas: ["Hallo, im Restaurant fliegt jedes Mal der FI-Schalter raus, wenn wir den Ofen einschalten.", "Heute Abend sind wir ausgebucht, könnt ihr heute noch kommen?"] },
      { resumen: "Der Heizkessel der Gemeinschaft zeigt einen Fehler, in Block B gibt es kein Warmwasser.", lineas: ["Ich rufe von der Eigentümergemeinschaft an, der Kessel zeigt seit heute Morgen den Fehler E133.", "Betrifft es das ganze Gebäude?", "Nur Block B, Block A funktioniert."] },
      { resumen: "Bittet um ein Angebot für den Austausch des 80-Liter-Boilers in seiner Wohnung.", lineas: ["Ich möchte den 80-Liter-Elektroboiler austauschen, er ist schon 12 Jahre alt. Könnt ihr mir einen Preis schicken?"] },
      { resumen: "Fragt, wann die nächste Wartung laut Vertrag fällig ist.", lineas: ["Guten Morgen, wann ist unser nächster Wartungstermin?"] },
      { resumen: "Der letzte Woche reparierte Wasserhahn tropft wieder.", lineas: ["Der Wasserhahn in der Teeküche, den ihr am Dienstag repariert habt, tropft wieder.", "Das tut mir sehr leid, wir nehmen es als Garantiefall auf und schicken denselben Techniker."] },
    ],
  },
  limpieza: {
    nombre: "Reinigung",
    lema: "Büros, Wohnanlagen und Bauendreinigung",
    dolor: "Dienstpläne in Excel, Schichttausch per WhatsApp und Kunden, die einen Nachweis wollen, dass gereinigt wurde.",
    instalacion: { tipo: "Objekt", plural: "Objekte", nombres: ["Büros 1. OG", "Gemeinschaftsflächen", "Empfang und WCs", "Wartezimmer", "Umkleiden", "Eingang und Treppenhaus"] },
    servicios: ["Unterhaltsreinigung", "Bauendreinigung", "Glasreinigung", "Bodenpolitur", "Desinfektion der Gemeinschaftsflächen"],
    checklist: ["WCs gereinigt und aufgefüllt", "Mülleimer geleert", "Böden gewischt", "Flächen und Griffe desinfiziert", "Glas am Eingang", "Foto vom Ergebnis"],
    mediciones: ["Gereinigte Fläche", "Verdünnung Desinfektionsmittel"],
    material: ["Chlor-Desinfektionsmittel 5 L", "Papierhandtücher", "Müllsäcke 100 L", "Neutralreiniger 5 L", "Mikrofasertücher", "Glasreiniger 5 L", "Handseife 5 L"],
    contrato: "Regelmäßige Reinigung",
    llamada: {
      instalacionNombre: "Behandlungsräume und Wartezimmer",
      resumen: "Wartezimmer und zwei Behandlungsräume müssen vor der Öffnung morgen um 8 Uhr desinfiziert werden.",
      lineas: [
        "Netbrill Neteja, Sie sprechen mit Marga.",
        "Hallo, hier ist Laura von der Clínica Dental Llevant in Manacor.",
        "Heute waren die Maler da und haben das Wartezimmer und zwei Behandlungsräume voller Staub hinterlassen.",
        "Morgen um acht haben wir Patienten. Könnt ihr heute Nachmittag kommen?",
        "Ja, wir schicken heute Nachmittag jemanden und senden Ihnen danach Fotos vom Ergebnis.",
      ],
    },
    avisos: [
      { resumen: "Die WCs im 2. OG wurden am Donnerstag nicht aufgefüllt.", lineas: ["Am Donnerstag wurde im zweiten Stock kein Toilettenpapier nachgefüllt."] },
      { resumen: "Bauendreinigung eines 180 m² großen Ladenlokals in Palma.", lineas: ["Wir haben die Arbeiten in einem 180 m² großen Ladenlokal in Palma abgeschlossen. Wir brauchen einen Preis für die Endreinigung."] },
      { resumen: "Fragt, ob die Außenfenster in den Vertrag aufgenommen werden können.", lineas: ["Könntet ihr einmal im Monat auch die Außenfenster machen?"] },
      { resumen: "Leichte Überschwemmung im Eingang, muss heute getrocknet und desinfiziert werden.", lineas: ["Im Eingang ist ein Rohr geplatzt und der ganze Boden steht unter Wasser.", "Wir schicken jemanden zum Trocknen und Desinfizieren, sobald es repariert ist."] },
      { resumen: "Politur des Hotelfoyers vor Saisonbeginn.", lineas: ["Vor Saisonbeginn möchten wir den Marmor im Foyer polieren lassen."] },
    ],
  },
  piscinas: {
    nombre: "Pools",
    lema: "Poolpflege für Privat- und Ferienvillen",
    dolor: "Hochsaison, hundert Pools pro Woche und Eigentümer im Ausland, die sehen wollen, wie das Wasser aussieht.",
    instalacion: { tipo: "Pool", plural: "Pools", nombres: ["Hauptpool", "Kinderbecken", "Außen-Whirlpool", "Infinity-Pool", "Hallenbad"] },
    servicios: ["Wöchentliche Pflege", "Grünes Wasser sanieren", "Saisonstart", "Pumpenreparatur", "Filtersand wechseln"],
    checklist: ["Skimmer und Körbe reinigen", "Boden absaugen", "Wände und Wasserlinie bürsten", "Filter rückspülen", "pH und Chlor messen und einstellen", "Pumpe und Zeitschaltuhr prüfen"],
    mediciones: ["pH", "Freies Chlor", "Temperatur", "Filterdruck"],
    material: ["Chlorgranulat 5 kg", "pH-Minus 8 kg", "Langzeit-Chlortabletten 5 kg", "Algizid 5 L", "Flockungsmittel 5 L", "Filtersand 25 kg", "Skimmerkorb"],
    contrato: "Saisonpflege",
    llamada: {
      instalacionNombre: "Hauptpool",
      resumen: "Grünes Wasser im Pool der Villa, am Freitag reisen Gäste an.",
      lineas: [
        "Aigua Clara Piscines, Sie sprechen mit Marga.",
        "Hallo, hier ist Tomeu, ich verwalte die Villa Es Pinaret in Alcúdia.",
        "Nach dem Sturm am Wochenende ist das Poolwasser grün geworden.",
        "Am Freitag kommt eine sechsköpfige Familie und der Pool muss perfekt aussehen.",
        "Heute noch behandelt ihn ein Techniker, und danach schicken wir Ihnen den Bericht mit Fotos und pH-Wert.",
      ],
    },
    avisos: [
      { resumen: "Die Pumpe macht Geräusche und saugt nicht, Villa belegt.", lineas: ["Die Pumpe macht ein komisches Geräusch und saugt nicht. Wir haben bis Sonntag Gäste."] },
      { resumen: "Saisonstart für eine Villa in Sóller.", lineas: ["Ich brauche den Pool meines Hauses in Sóller fertig für Mai."] },
      { resumen: "Der Eigentümer im Ausland bittet um die aktuellen pH- und Chlorwerte.", lineas: ["Hallo, ich bin der Eigentümer der Villa Sa Talaia. Könnt ihr mir die Wasserwerte dieser Woche schicken?"] },
      { resumen: "Blätter am Beckenboden am Tag nach der Pflege.", lineas: ["Ihr wart gestern da, aber heute ist der Boden voller Blätter.", "Es gab starken Tramuntana-Wind, wir kommen morgen kostenlos vorbei."] },
      { resumen: "Der Filter verliert Druck und das Wasser ist trüb.", lineas: ["Das Manometer am Filter zeigt sehr wenig an und das Wasser ist trüb."] },
    ],
  },
  climatizacion: {
    nombre: "Klima- und Kältetechnik",
    lema: "Klimaanlagen, Gewerbekälte und Kühlräume",
    dolor: "Ketten mit zwanzig Filialen, Kühlräume, die nicht ausfallen dürfen, und Kältemittelprotokolle, die niemand findet.",
    instalacion: { tipo: "Gerät", plural: "Geräte", nombres: ["Kühlraum", "Split-Gerät Hauptsaal", "Kaltwassersatz Dach", "Kassettengerät Empfang", "Tiefkühlraum", "Rooftop-Gerät Verkaufsfläche"] },
    servicios: ["Reparatur Kältestörung", "Vorbeugende Wartung", "Kältemittel nachfüllen", "Split-Klimaanlage installieren", "Filter und Wärmetauscher reinigen"],
    checklist: ["Betriebstemperaturen prüfen", "Hoch- und Niederdruck messen", "Mit Lecksuchgerät prüfen", "Filter und Wärmetauscher reinigen", "Kondensatabläufe prüfen", "Kältemittel im Logbuch eintragen"],
    mediciones: ["Hochdruck", "Niederdruck", "Kühlraumtemperatur", "Nachgefülltes Kältemittel"],
    material: ["Kältemittel R-32, Flasche 9 kg", "Kältemittel R-448A", "Filtertrockner", "Kondensator 35 µF", "Hochdruckschalter", "Kupferrohr 3/8\"", "Wärmetauscherreiniger"],
    contrato: "Wartung Kälte und Klima",
    llamada: {
      instalacionNombre: "Kühlraum, Filiale Inca",
      resumen: "Der Kühlraum der Filiale in Inca zeigt 9 °C, mit Frischware darin.",
      lineas: [
        "Clima Tramuntana, Sie sprechen mit Marga.",
        "Guten Morgen, hier ist Andreu von der Haustechnik der Supermercats Illa Fresca.",
        "Der Frischekühlraum in der Filiale Inca hat neun Grad und es wird wärmer.",
        "Wir haben Fleisch und Milchprodukte drin; wenn es in zwei Stunden nicht repariert ist, müssen wir alles wegwerfen.",
        "Wir schicken sofort den nächstgelegenen Techniker. In Ihrem Portal sehen Sie, wann er ankommt.",
      ],
    },
    avisos: [
      { resumen: "Die Klimaanlage auf der Verkaufsfläche in Manacor kühlt nicht.", lineas: ["In der Filiale Manacor kühlt die Klimaanlage nicht, wir haben 29 Grad."] },
      { resumen: "Installation von drei Split-Geräten in Büros in Palma.", lineas: ["Wir möchten in drei Büros unserer Niederlassung in Palma eine Klimaanlage."] },
      { resumen: "Benötigen das Kältemittelprotokoll des letzten Jahres für ein Audit.", lineas: ["Könnt ihr uns das Kältemittelprotokoll aller Filialen vom letzten Jahr schicken?"] },
      { resumen: "Aus dem Kassettengerät an der Hotelrezeption tropft Wasser.", lineas: ["Aus dem Deckengerät am Empfang tropft Wasser."] },
      { resumen: "Der Temperaturalarm im Tiefkühlraum schlägt wieder an.", lineas: ["Der Alarm am Tiefkühlraum in Marratxí geht schon wieder los."] },
    ],
  },
  jardineria: {
    nombre: "Gartenpflege",
    lema: "Gartenpflege, Baumschnitt und Bewässerung",
    dolor: "Teams über die ganze Insel verteilt, Bewässerungen, die im August ausfallen, und regelmäßige Besuche, die vergessen werden.",
    instalacion: { tipo: "Bereich", plural: "Bereiche", nombres: ["Hauptgarten", "Rasenfläche", "Grundstückshecke", "Tropfbewässerung", "Palmen am Eingang", "Gemüsegarten und Obstbäume"] },
    servicios: ["Gartenpflege", "Palmenschnitt", "Reparatur der Bewässerung", "Grundstücksrodung", "Pflanzenschutzbehandlung"],
    checklist: ["Rasen mähen und Kanten schneiden", "Hecken schneiden", "Steuergerät und Tropfer prüfen", "Grünschnitt entsorgen", "Palmen prüfen (Roter Palmrüssler)", "Foto vom Ergebnis"],
    mediciones: ["Rasenfläche", "Tägliche Bewässerung", "Entsorgter Grünschnitt"],
    material: ["Druckkompensierender Tropfer", "PE-Rohr 16 mm", "Magnetventil 1\"", "Granulatdünger 25 kg", "Mittel gegen Palmrüssler", "Mähfaden"],
    contrato: "Gartenpflege",
    llamada: {
      instalacionNombre: "Bewässerung Eingangsbereich",
      resumen: "Die automatische Bewässerung am Eingang springt seit drei Tagen nicht an und der Rasen vertrocknet.",
      lineas: [
        "Verd Mallorca, Sie sprechen mit Marga.",
        "Hallo, hier ist Francesca, die Vorsitzende der Eigentümergemeinschaft Jardins de Sóller.",
        "Die Bewässerung im Eingangsbereich springt seit Montag nicht an und bei dieser Hitze verbrennt der Rasen.",
        "Wahrscheinlich ist es das Magnetventil. Wir schicken heute noch jemanden.",
      ],
    },
    avisos: [
      { resumen: "Eine Palme am Hotelpool mit hängenden Wedeln, möglicherweise Palmrüssler.", lineas: ["Bei einer Palme am Pool hängen die Wedel in der Mitte herunter. Palmrüssler?"] },
      { resumen: "Rodung eines 2.000 m² großen Grundstücks in Llucmajor.", lineas: ["Ich muss vor dem Sommer ein Grundstück von etwa 2.000 m² in Llucmajor roden lassen."] },
      { resumen: "Fragt, ob der Besuchstag auf Donnerstag verlegt werden kann.", lineas: ["Wäre es möglich, donnerstags statt montags zu kommen?"] },
      { resumen: "Schnittreste auf dem Parkplatz liegen gelassen.", lineas: ["Auf dem Parkplatz der Gemeinschaft liegen noch Schnittreste."] },
    ],
  },
  plagas: {
    nombre: "Schädlingsbekämpfung",
    lema: "Insekten, Nager und Legionellen",
    dolor: "Restaurants und Hotels mit Hygienekontrollen, die sofort Zertifikate und Köderpläne verlangen.",
    instalacion: { tipo: "Kontrollpunkt", plural: "Kontrollpunkte", nombres: ["Küche und Lager", "Müllraum", "Kühlraum", "Außenbereich", "Keller", "Etagenoffice"] },
    servicios: ["Insektenbekämpfung", "Kontrolle Nagerbekämpfung", "Intensivbehandlung", "Legionellenkontrolle", "Regelmäßige HACCP-Kontrolle"],
    checklist: ["Kontrollpunkte prüfen", "Verbrauchte Köder ersetzen", "Zugelassene Behandlung anwenden", "Behandelten Bereich kennzeichnen", "Mittel und Dosis dokumentieren", "Zertifikat übergeben"],
    mediciones: ["Geprüfte Punkte", "Punkte mit Befall", "Ausgebrachtes Mittel"],
    material: ["Schabengel", "Nagerköderblock", "Sicherheits-Köderstation", "Mikroverkapseltes Insektizid", "Klebefalle", "Warnetiketten"],
    contrato: "HACCP-Schädlingsbekämpfung",
    llamada: {
      instalacionNombre: "Küche und Lager",
      resumen: "Kakerlaken in der Restaurantküche, nächste Woche ist Hygienekontrolle.",
      lineas: [
        "Plagues Illa, Sie sprechen mit Marga.",
        "Hallo, hier ist Jaume vom Restaurante Es Moll Vell in Alcúdia.",
        "Gestern Abend haben wir Kakerlaken in der Küche gesehen, hinter dem Herd.",
        "Nächste Woche haben wir eine Hygienekontrolle und ich brauche das Zertifikat.",
        "Wir machen heute eine Intensivbehandlung und stellen Ihnen das Zertifikat ins Portal.",
      ],
    },
    avisos: [
      { resumen: "Nagerkot im Lager des Supermarkts.", lineas: ["Wir haben Mäusekot im Lager des Ladens gefunden."] },
      { resumen: "Benötigen Köderplan und Zertifikate für das Audit.", lineas: ["Wir brauchen den Köderplan und die Zertifikate dieses Jahres für das Audit am Donnerstag."] },
      { resumen: "Legionellenkontrolle für ein Hotel mit 120 Zimmern.", lineas: ["Wir hätten gern einen Preis für die jährliche Legionellenkontrolle des Hotels."] },
      { resumen: "Nach der Behandlung tauchen weiterhin Ameisen auf.", lineas: ["Seit der Behandlung am Dienstag kommen auf der Terrasse immer noch Ameisen heraus."] },
    ],
  },
  solar: {
    nombre: "Solaranlagen",
    lema: "Photovoltaik-Eigenverbrauch und Wartung",
    dolor: "Projekte in Bauabschnitten, Anlagen, deren Leistung unbemerkt sinkt, und Papierkram für jeden Kunden.",
    instalacion: { tipo: "PV-Anlage", plural: "PV-Anlagen", nombres: ["Hallendach", "Solarpergola", "Wohnhausdach", "Freiflächenanlage", "Carport-Überdachung"] },
    servicios: ["Leistungsprüfung", "Modulreinigung", "Wechselrichterreparatur", "Eigenverbrauchsanlage", "Batteriespeicher installieren"],
    checklist: ["Sichtprüfung der Module", "Wechselrichter und Alarme prüfen", "Thermografie der Strings", "Verbindungen nachziehen", "Ertrag mit Sollwert vergleichen", "Leistungsbericht"],
    mediciones: ["Tagesertrag", "Leistung", "Stringspannung"],
    material: ["Modul 450 W", "MC4-Stecker (Paar)", "Solarkabel 6 mm²", "Stringsicherung 15 A", "Aufdach-Montagesystem", "Überspannungsschutz"],
    contrato: "Photovoltaik-Wartung",
    llamada: {
      instalacionNombre: "Stalldach",
      resumen: "Die Anlage produziert seit einer Woche nur die Hälfte und der Wechselrichter zeigt einen Alarm.",
      lineas: [
        "Sol de Migjorn, Sie sprechen mit Marga.",
        "Hallo, hier ist Miquel vom Agroturismo Can Vidal in Sóller.",
        "Seit letzter Woche produzieren die Module nur die Hälfte und am Wechselrichter leuchtet ein rotes Licht.",
        "Vermutlich ist ein String ausgefallen. Wir schicken einen Techniker und senden Ihnen den Leistungsbericht.",
      ],
    },
    avisos: [
      { resumen: "Eigenverbrauchsanlage für eine 600 m² große Halle in Marratxí.", lineas: ["Wir haben eine 600 m² große Halle in Marratxí und möchten Solarmodule installieren."] },
      { resumen: "Batteriespeicher für eine Hausanlage in Llucmajor nachrüsten.", lineas: ["Ich habe seit zwei Jahren Module, was würde es kosten, Batterien nachzurüsten?"] },
      { resumen: "Bittet um den Ertragsbericht des letzten Quartals.", lineas: ["Könnt ihr mir den Ertrag des letzten Quartals schicken?"] },
      { resumen: "Der Wechselrichter des Hotels ist nach einem Sturm ausgefallen.", lineas: ["Seit dem Sturm ist der Wechselrichter komplett aus."] },
    ],
  },
  reformas: {
    nombre: "Renovierungen",
    lema: "Komplettsanierungen, Bäder und Küchen",
    dolor: "Lange Baustellen, Angebote nach Gewerken, die sich jede Woche ändern, und Kunden, die den Fortschritt sehen wollen.",
    instalacion: { tipo: "Baustelle", plural: "Baustellen", nombres: ["Sanierung Hauptbad", "Komplette Küche", "Komplettsanierung Wohnung", "Terrasse und Dach", "Ladenlokal"] },
    servicios: ["Besichtigung und Aufmaß", "Badsanierung", "Küchensanierung", "Kleinreparatur", "Terrassenabdichtung"],
    checklist: ["Planung des Bauabschnitts prüfen", "Gemeinschaftsflächen schützen", "Tagesabschnitt ausführen", "Fortschrittsfotos", "Reinigen und Schutt entsorgen", "Fehlendes Material notieren"],
    mediciones: ["Baufortschritt", "Geflieste Fläche", "Untergrundfeuchte"],
    material: ["Fliesenkleber C2 25 kg", "Fliese 30x60", "Gipskartonplatte 13 mm", "Flüssigabdichtung 20 kg", "Mehrschichtverbundrohr 16 mm", "Schuttsack"],
    contrato: "Gebäudewartung",
    llamada: {
      instalacionNombre: "Gemeinschaftsdachterrasse",
      resumen: "Wasser dringt von der Dachterrasse in die Penthousewohnung; gewünscht sind Besichtigung und Abdichtungsangebot.",
      lineas: [
        "Reformes Ponent, Sie sprechen mit Marga.",
        "Hallo, hier ist Pere, der Verwalter der Eigentümergemeinschaft Passeig Mallorca 40 in Palma.",
        "Bei dem Regen ist Wasser von der Dachterrasse in die Penthousewohnung eingedrungen, der Nachbar hat Flecken an der Decke.",
        "Wir möchten vor dem Herbst eine Besichtigung und ein Angebot für die Abdichtung.",
        "Wir schicken einen Techniker zum Aufmaß, und Sie bekommen ein Angebot nach Gewerken zur Online-Unterschrift.",
      ],
    },
    avisos: [
      { resumen: "Küchensanierung in einer Wohnung in Manacor.", lineas: ["Wir möchten die Küche einer Wohnung in Manacor sanieren, etwa 12 m²."] },
      { resumen: "Badewanne gegen Duschtasse tauschen in einem Haus in Inca.", lineas: ["Ich möchte die Badewanne gegen eine Duschtasse tauschen. Wann könnt ihr euch das ansehen?"] },
      { resumen: "Eine Fliese im sanierten Bad klingt hohl.", lineas: ["Eine Fliese im neuen Bad klingt hohl, wenn man darauf tritt."] },
      { resumen: "Fragt, in welcher Bauphase das Projekt ist und wann es fertig wird.", lineas: ["In welcher Phase ist unsere Baustelle? Bleibt es beim geplanten Fertigstellungstermin?"] },
    ],
  },
};

/** Unidades de material que cambian de idioma (las técnicas, como m² o kg, no). */
const UNIDADES: Record<"en" | "de", Record<string, string>> = {
  en: { ud: "pc", garrafa: "drum", caja: "box", rollo: "roll", pack: "pack", bote: "tub", saco: "bag", jeringa: "syringe", par: "pair", kit: "kit" },
  de: { ud: "Stk.", garrafa: "Kanister", caja: "Karton", rollo: "Rolle", pack: "Pack", bote: "Dose", saco: "Sack", jeringa: "Spritze", par: "Paar", kit: "Set" },
};

function traducir(base: Sector, t: Textos, lang: "en" | "de"): Sector {
  return {
    ...base,
    nombre: t.nombre,
    lema: t.lema,
    dolor: t.dolor,
    instalacion: t.instalacion,
    servicios: base.servicios.map((s, i) => ({ ...s, nombre: t.servicios[i] ?? s.nombre })),
    checklist: t.checklist,
    mediciones: base.mediciones.map((m, i) => ({ ...m, nombre: t.mediciones[i] ?? m.nombre })),
    material: base.material.map((m, i) => ({ ...m, nombre: t.material[i] ?? m.nombre, unidad: UNIDADES[lang][m.unidad] ?? m.unidad })),
    contrato: { ...base.contrato, nombre: t.contrato },
    llamada: {
      ...base.llamada,
      instalacionNombre: t.llamada.instalacionNombre,
      resumen: t.llamada.resumen,
      lineas: base.llamada.lineas.map(([q, x], i) => [q, t.llamada.lineas[i] ?? x]),
    },
    avisos: base.avisos.map((a, i) => ({
      ...a,
      resumen: t.avisos[i]?.resumen ?? a.resumen,
      lineas: a.lineas.map(([q, x], j) => [q, t.avisos[i]?.lineas[j] ?? x]),
    })),
  };
}

export const SECTORES_I18N: Record<Idioma, Sector[]> = {
  es: SECTORES,
  en: SECTORES.map((s) => traducir(s, EN[s.id], "en")),
  de: SECTORES.map((s) => traducir(s, DE[s.id], "de")),
};

const POR_ID: Record<Idioma, Record<SectorId, Sector>> = {
  es: Object.fromEntries(SECTORES_I18N.es.map((s) => [s.id, s])) as Record<SectorId, Sector>,
  en: Object.fromEntries(SECTORES_I18N.en.map((s) => [s.id, s])) as Record<SectorId, Sector>,
  de: Object.fromEntries(SECTORES_I18N.de.map((s) => [s.id, s])) as Record<SectorId, Sector>,
};

export function sectoresDe(lang: Idioma): Sector[] {
  return SECTORES_I18N[lang];
}

export function sectorDe(lang: Idioma, id: SectorId): Sector {
  return POR_ID[lang][id];
}
