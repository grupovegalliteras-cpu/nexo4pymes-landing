import type { SectorId } from "@/data/sectors";
import type { TextoSector } from "@/content/sectores-seo";

/* English version of content/sectores-seo.ts. Same rule: nothing here
   may read the same for two industries. */

export const SECTORES_SEO: Record<SectorId, TextoSector> = {
  mantenimiento: {
    intro: [
      "A building maintenance company in Mallorca lives off the phone: a hotel with no hot water in the middle of the season, a residents' association with a dead booster pump, a shop with the main electrical panel tripped. All three come in at once and all three are urgent to whoever is calling.",
      "The notebook copes until it doesn't. With two or three technicians spread across the island, what fails is not the trade: it is knowing who is going, which part they had on board, whether that boiler repair back in March ever got invoiced, and what you told the property manager on the phone three weeks ago.",
    ],
    claves: [
      {
        titulo: "Every installation with its own history",
        texto: "The plant room boiler, the booster pump set and the second-floor water heater are records with their own job history, photos and QR code. A technician going for the first time reads what the last one did.",
      },
      {
        titulo: "Pressure and hot water get written down",
        texto: "Mains pressure, hot water temperature and voltage go into the job report from a phone, with the correct range on screen. A reading outside that range shows up on the dashboard without anyone reading the whole report.",
      },
      {
        titulo: "Contracts raise their own visits",
        texto: "A hotel's full maintenance contract stops depending on somebody remembering in October: preventive work orders are raised automatically, with the agreed response time attached.",
      },
    ],
    faq: [
      [
        "Does it work if we do plumbing, electrics and boilers all at once?",
        "Yes, and that is the case it was built for. Services are configured with their price and expected duration, and the checklist changes with the type of job, so a technician attending an electrical fault does not see the steps for a leak test.",
      ],
      [
        "Can we handle hotel call-outs outside working hours?",
        "Calls and WhatsApp messages arriving at night are logged with their urgency, and a critical one can notify the person on duty immediately. What counts as critical is yours to define: a leak in an occupied room is not a blown light bulb.",
      ],
      [
        "Can we tell which repairs were invoiced and which were not?",
        "Yes. The invoice comes out of the job report, so a closed job with no invoice shows on the dashboard as outstanding. It is the classic hole in maintenance companies: the work gets done, the problem gets solved and nobody looks at it again.",
      ],
    ],
  },

  limpieza: {
    intro: [
      "A cleaning company in Mallorca does not have a cleaning problem: it has a rota problem. Offices that open at seven, residential blocks that want the common areas done before the first neighbour comes down, and an end-of-build clean landing on Thursday that has to be covered with people already assigned elsewhere.",
      "The rota spreadsheet is on its fourth version of the week, shift swaps get agreed over WhatsApp, and the property manager rings to ask whether the entrance hall was cleaned on Tuesday. Saying yes is not enough: it has to be shown.",
    ],
    claves: [
      {
        titulo: "The rota stops being a spreadsheet",
        texto: "Sites, shifts and people in a calendar that flags clashes. A shift change is published and each worker sees it on their phone, with no chain of messages to confirm who is covering what.",
      },
      {
        titulo: "The photo of the result, inside the report",
        texto: "Toilets restocked, bins emptied, floors mopped, handles disinfected and entrance glass: the checklist is ticked on the phone and the final photo stays attached to the report, time-stamped. That is the proof the client asks for.",
      },
      {
        titulo: "A report per site, without assembling it by hand",
        texto: "What was cleaned, when, by whom and at what disinfectant dilution. The PDF with your branding is sent automatically on completion, and the property manager stops calling to ask.",
      },
    ],
    faq: [
      [
        "Can the client see that the work was done?",
        "Yes. Every visit closes with the checklist ticked, a photo of the result and a timestamp, and that can go out as a report to the property manager or site contact. It turns an argument about whether it was cleaned into a thirty-second look.",
      ],
      [
        "How are last-minute shift changes handled?",
        "The rota is changed on the dashboard and the change appears in the affected person's app, with a notification. The history remains, so at month end you know who covered what without reconstructing it from a WhatsApp group.",
      ],
      [
        "Does it work for end-of-build cleans, which are not recurring?",
        "Yes. Recurring contract work and one-off jobs live side by side: an end-of-build clean is planned as a job with its crew, its hours and its quote, without disturbing the rota of the regular sites.",
      ],
    ],
  },

  piscinas: {
    intro: [
      "In a pool company in Mallorca the year has two halves. In high season it is a hundred pools a week, routes crossing the island and a few hours' margin to get a villa ready before the guests walk in. Out of season it is season start-ups and green-water recoveries.",
      "And a good share of the owners do not live here. They call from Germany or the UK to ask about the water in a house they will not set foot in until June, and the answer cannot be \"I'll let you know tomorrow\".",
    ],
    claves: [
      {
        titulo: "pH and chlorine with the range on screen",
        texto: "The technician records pH, free chlorine, temperature and filter pressure from the phone, with the correct interval in front of them. A reading outside it is flagged automatically and the dashboard pushes it up the list.",
      },
      {
        titulo: "Routes that hold up in season",
        texto: "The map spreads the week's stops across technicians and works out the shortest run. With a hundred pools, the kilometres saved are hours, and hours in July are pools that get done or don't.",
      },
      {
        titulo: "A report the owner understands",
        texto: "A PDF with your branding, the day's readings, the photos and the signature, sent on completion. Owners abroad see the state of their pool without calling, and that is what cuts the season's phone traffic.",
      },
    ],
    faq: [
      [
        "Can water test results be recorded from the phone?",
        "Yes: pH, free chlorine, temperature and filter pressure go into the report with the correct range on screen. Anything outside the interval is flagged, so a pool with low chlorine does not go unnoticed until the following week.",
      ],
      [
        "Our owners live abroad. Can they see the state of their pool?",
        "The report for each visit, with readings, photos and signature, is sent automatically when the service is closed. For owners who want more, the customer portal lets them look through past visits and invoices without calling the office.",
      ],
      [
        "Does it hold up through the high-season peak?",
        "That is what route planning is for: the week's stops are shared out by technician and the map calculates the shortest run. A green-water recovery or a pump failure comes in as an urgent job without derailing the rest of the schedule.",
      ],
    ],
  },

  climatizacion: {
    intro: [
      "An HVAC company in Mallorca works to two different clocks. The one belonging to a customer sweating in an office, who can wait until tomorrow. And the one belonging to a supermarket's cold room, which cannot wait at all: if it goes above four degrees, stock gets thrown away.",
      "On top of that there is the paperwork. F-gas records, refrigerant charges per unit and preventive service reports are compulsory, and when an inspection or a twenty-site chain asks for them, they are usually spread across folders, emails and somebody's van.",
    ],
    claves: [
      {
        titulo: "Pressures and gas, per unit",
        texto: "High-side pressure, low-side pressure, cold room temperature and kilos of refrigerant added go into the report against the unit's own record. A rooftop's charge history stops living in a notebook.",
      },
      {
        titulo: "Multi-site for chains",
        texto: "A customer with twenty supermarkets is a customer with twenty site records, each with its own history and the route between them. The invoice can go to head office even though the work happened in the store.",
      },
      {
        titulo: "The urgency that really is one",
        texto: "A freezer room out of range can notify the person on duty immediately, while an office split stays in the normal queue. You set the rule, per customer and per type of equipment.",
      },
    ],
    faq: [
      [
        "Can we keep refrigerant gas records?",
        "Kilos of gas added are recorded in each job report against the specific unit rather than just the customer, with its date and technician. That is where the per-unit history comes from, which is what has to be produced on request.",
      ],
      [
        "We work for chains with many sites. Can the site be separated from the payer?",
        "Yes. Each site has its own record, equipment and history, and invoicing can be directed to the parent company. That is the multi-site module, built for supermarkets, hotels and retail chains.",
      ],
      [
        "Can we tell a cold room failure apart from a routine service?",
        "Yes, and in industrial refrigeration that is the distinction that matters most. Requests arrive with a type and an urgency, and a failed cold room can trigger an immediate notification while everything else waits its turn in the schedule.",
      ],
    ],
  },

  jardineria: {
    intro: [
      "A landscaping company in Mallorca spreads crews across half the island: fortnightly maintenance on housing estates, palm pruning that has to be coordinated with access, land clearing before summer, and irrigation that always fails on the hottest weekend in August.",
      "What gets lost is not the big jobs: it is the recurring visits. A garden due every fortnight that has gone five weeks untouched. Nobody notices until the client calls, and by then it is an uncomfortable conversation.",
    ],
    claves: [
      {
        titulo: "Recurring visits raise themselves",
        texto: "The maintenance contract generates its work orders without anyone entering them. If a visit is missed, it shows as outstanding on the dashboard instead of quietly vanishing from the calendar.",
      },
      {
        titulo: "Each area with its own record",
        texto: "Main garden, perimeter hedge, drip irrigation and entrance palms are areas with their own history. Daily watering minutes and lawn square metres get written down, so whoever goes next does not have to ask.",
      },
      {
        titulo: "Crews and routes, not messages",
        texto: "Who goes to which plot and in what order is decided on the dashboard and lands on the crew's phone. Green waste removed and hours worked go into the report, which is where the invoice comes from.",
      },
    ],
    faq: [
      [
        "How do we stop maintenance visits being missed?",
        "Maintenance contracts raise their own work orders at the agreed interval, so the visit exists in the calendar whether or not anyone remembers. If its date passes without being closed, it is marked outstanding rather than lost.",
      ],
      [
        "Can we track the irrigation of each garden?",
        "Daily watering minutes, lawn area and green waste removed are recorded as readings against the area, with their history. An irrigation failure comes in as an urgent job attached to that specific area, not to the customer in general.",
      ],
      [
        "Our crews change. Does it still work?",
        "Yes. The schedule assigns work to whoever is on that day and the report is signed by whoever does it, so the garden's history stays complete even when the crew is not always the same. Phone-based time tracking covers each person's hours as well.",
      ],
    ],
  },

  plagas: {
    intro: [
      "In pest control the customer is not buying a treatment: they are buying something to show. A restaurant facing a health inspection, a hotel in a chain audit or a residents' association with a rodent problem need the certificate, the bait station map and the inspection history, and they need it the moment it is asked for.",
      "Meanwhile the day-to-day is small and repetitive: twenty or forty control points per site, each one checked, noting which show activity and how much product was applied. Done on paper, it gets transcribed twice and lost once in every three.",
    ],
    claves: [
      {
        titulo: "Control points, one by one",
        texto: "Kitchen and store, bin room, cold room, basement and exterior are points with their own QR code and history. The technician checks them by scanning, and which ones showed activity is recorded.",
      },
      {
        titulo: "The HACCP report, on completion",
        texto: "Points checked, points with activity, product applied and signature come out as a PDF with your branding, sent automatically. It is exactly what an inspection asks for, and it stops being assembled by hand on a Sunday.",
      },
      {
        titulo: "Periodic visits depend on nobody",
        texto: "The HACCP inspection contract raises its visits at its own interval, and legionella control keeps its date and its renewal warning. An expired certificate becomes a problem you can see coming.",
      },
    ],
    faq: [
      [
        "Can it produce the certificates and reports a health inspection asks for?",
        "Each inspection report captures points checked, points with activity, product applied and signature, and from that comes a branded PDF sent to the customer on completion. Anything specific to your own protocol is configured with you.",
      ],
      [
        "How are the control points of each site handled?",
        "Every point is a record with its location, QR code and history, so the technician identifies it by scanning rather than from memory. The per-point history is what shows that the cockroaches always turn up in the same floor pantry.",
      ],
      [
        "Does it flag periodic treatments and legionella?",
        "Yes. Periodic inspections are raised from the contract at their frequency, and certificates with an expiry date warn before they lapse. It is the same mechanism the training module uses for staff courses.",
      ],
    ],
  },

  solar: {
    intro: [
      "A solar company in Mallorca does two things that have little in common. On one side, installation work: a warehouse roof, a carport, a ground-mounted array, with phases, materials and paperwork for every customer. On the other, maintaining what it already installed, which is where the recurring income is.",
      "And maintenance has a problem of its own: an installation losing performance does not announce it. It keeps producing, just less, and the customer only finds out when they look at an electricity bill six months later. By then the conversation is difficult.",
    ],
    claves: [
      {
        titulo: "Performance and output, per installation",
        texto: "Daily output in kWh, performance as a percentage and string voltage are recorded at each service against the installation's own record. A drop shows up by comparing with the previous visit, not from memory.",
      },
      {
        titulo: "Phased work, with its progress",
        texto: "A self-consumption installation is a long project with sections and materials. The quote, the progress and the photos of each phase stay in the record, and the customer can see it without calling.",
      },
      {
        titulo: "The paperwork, attached to the customer",
        texto: "Each installation keeps its documents, its photos and its intervention history. When the technical file for a two-year-old job has to be found, it is in the record and not on somebody's hard drive.",
      },
    ],
    faq: [
      [
        "Can we spot an installation that has lost performance?",
        "Each service records output, performance and string voltage against that installation, so comparing with earlier visits is direct. It does not replace inverter monitoring: what it solves is that the figure ends up in the customer's history and not only on the technician's screen.",
      ],
      [
        "We do both installation and maintenance. Do the two coexist?",
        "Yes, and in this sector that is the norm. A self-consumption installation runs as a project with its phases and materials, and afterwards that same installation moves onto a service contract with its periodic visits. The history is one and the same.",
      ],
      [
        "Where does each installation's documentation live?",
        "In the installation's record: documents, site photos, materials used and intervention history. That is what turns finding a two-year-old technical file into a search rather than an excavation.",
      ],
    ],
  },

  reformas: {
    intro: [
      "A renovation company in Mallorca lives with two things that do not sit well together: jobs that run for weeks or months, and quotes broken into sections that change every time the client sees something in a shop. The bathroom quoted in March is not the one being built in May.",
      "And the client wants to see progress. They are not asking out of politeness: they have moved out of their own home and need to know whether they can move back next week. When the answer is slow, trust goes before the schedule does.",
    ],
    claves: [
      {
        titulo: "Sectioned quotes, with versions",
        texto: "The quote is sent, opened and signed from a phone, and every change becomes a new version. Knowing what was approved and when stops being an argument conducted through old emails.",
      },
      {
        titulo: "Progress as a percentage, and in photos",
        texto: "Progress, square metres tiled and substrate moisture go into the report, with before and after photos. The client sees how it is going without anyone stopping to write them an email.",
      },
      {
        titulo: "Real cost against quoted cost",
        texto: "Hours and materials are deducted when the report is closed, so the margin on that kitchen is visible while the job is running, not three months later when nothing can be done about it.",
      },
    ],
    faq: [
      [
        "Can we handle sectioned quotes that change during the job?",
        "Yes. Each change creates a new version of the quote, with a notification when the client opens it and signature from a phone to accept it. What was approved and on what date is recorded, which is what avoids the argument at the end.",
      ],
      [
        "Can the client follow the progress of their renovation?",
        "Each day's report accepts a progress percentage and photos, and the customer portal lets them look without calling. On a full renovation, where the client is living somewhere else, it tends to be the part they appreciate most.",
      ],
      [
        "Will we know whether a job is making a margin before it finishes?",
        "Yes. Hours and materials are charged to the job as each report is closed, so real cost against quoted cost is visible while the work is running. That is the difference between correcting a slip and finding out about it once it has been invoiced.",
      ],
    ],
  },
};
