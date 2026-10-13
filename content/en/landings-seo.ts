import type { LandingSlug } from "@/data/landings";
import type { TextoLanding } from "../landings-seo";

/* La versión inglesa. El lector no es un español que lee inglés: es
   alguien que lleva una empresa en Mallorca sin haber crecido con la
   Agencia Tributaria. Por eso aquí se explica qué es VeriFactu antes
   de hablar de plazos, y se dice "in Spain" donde el texto español da
   por supuesto el país. Las fechas siguen sin escribirse: salen de
   content/verifactu-estado.ts. */

export const LANDINGS_SEO: Partial<Record<LandingSlug, TextoLanding>> = {
  "facturacion-verifactu": {
    h1: ["VeriFactu", "invoicing software"],
    entradilla:
      "Invoices signed with a chained hash and the registration record Spanish tax law requires, issued from the same place where the job report is closed.",
    intro: [
      "VeriFactu has had three different deadlines. The first said 2026. Royal Decree-Law 15/2025 moved it to 2027. And on 5 October 2026 the Ministry of Finance announced moving it to October 2028 for businesses invoicing under eight million euros. That last postponement has not been published in the official gazette yet, so the 2027 dates are the ones that currently bind.",
      "After that much back and forth, almost nobody is sure what they have to do or when. But the real question for a service company in Mallorca was never the date: it is whether, when the deadline does arrive, someone will have to retype every invoice into a separate program after already entering the same data into the job report.",
    ],
    claves: [
      {
        titulo: "From job report to invoice without retyping",
        texto:
          "The technician closes the report on their phone with hours, materials and the customer's signature. The invoice comes out of that, with those lines already in place. There is no second program to copy data into, which is where the hours go and the mistakes appear.",
      },
      {
        titulo: "Chained hash and registration record, already handled",
        texto:
          "Every invoice generates its registration record with the hash linking it to the previous one, the QR code and the note that it is verifiable. That is what the regulation asks for, and it is the part you cannot improvise the month before the deadline.",
      },
      {
        titulo: "Credit notes count too",
        texto:
          "Cancelling or correcting an issued invoice is not deleting it: it generates its own chained cancellation record. This is where most systems fall short, because almost anyone covers the happy path and credit notes are not it.",
      },
    ],
    faq: [
      [
        "What is VeriFactu and who does it affect?",
        "It is the Spanish tax agency's system for making invoicing software tamper-proof. Every invoice issued leaves a signed record chained to the previous one, so none can be deleted or altered without it showing. It applies to companies and self-employed people issuing invoices in Spain, except those already under the SII regime or taxed under the regional Basque and Navarrese systems.",
      ],
      [
        "When exactly does it become mandatory?",
        "There are two answers and they should not be mixed. What is in force are the dates set by Royal Decree-Law 15/2025. On top of that, there is a postponement announced by the Ministry of Finance on 5 October 2026 that would move much of the obligation to October 2028, but it has not been published in the official gazette. Until it is, the 2027 calendar is what binds. The specific dates are in the table above, along with the last time we checked them.",
      ],
      [
        "Is there a free VeriFactu option?",
        "The tax agency offers a free application for issuing verifiable invoices. It works if you invoice rarely and by hand. It does not work if what you want is the invoice to come out of the job report you have already filled in, because it is a standalone tool that connects to nothing of yours.",
      ],
      [
        "What does it cost to adapt?",
        "If you already have invoicing software, the vendor should have adapted it: they have been required to since July 2025. If what you have is a spreadsheet or a paper pad, the cost is not VeriFactu, it is moving to invoicing with a system at all. We put it in writing before starting: what gets done, what does not, and what it costs.",
      ],
      [
        "If it gets postponed again, have I moved too early?",
        "No, because the benefit of the invoice coming out of the job report does not depend on any tax deadline. The hours saved by not typing the same thing twice are saved just the same in 2026 as in 2028. Compliance is the consequence, not the reason.",
      ],
    ],
  },

  "control-horario": {
    h1: ["Time tracking", "and clock-in software"],
    entradilla:
      "Everyone clocks in from their own phone, with the time and the place, and the record stays stored, searchable and ready to export for an inspection.",
    intro: [
      "Two things get mixed up constantly, and they are worth separating. Recording working hours has been compulsory in Spain since 12 May 2019, under article 34.9 of the Workers' Statute. Whether that record has to be digital is a different question, and today it does not: the law accepts paper, a spreadsheet or software, as long as the system is reliable, objective and accessible.",
      "The decree that would require a digital format has been announced for months and still has not been approved; it received an unfavourable opinion from the Council of State and has not appeared in the official gazette. So if someone sells you software saying digital clock-in is already required by law, they are selling you on a rule that does not exist yet. The real reason to do it is different: with technicians spread across the island, nobody can tell who filled in the paper sheet, or when.",
    ],
    claves: [
      {
        titulo: "People clock in where they work",
        texto:
          "A technician starting the day at a building in Calvià clocks in there, from their phone, without driving to the depot first. The time and location of the start and end of the shift are recorded, which is what makes the register hold up if it is ever inspected.",
      },
      {
        titulo: "Hours come from the job report, not from a guess",
        texto:
          "Because clock-ins and job reports live in the same place, each technician's hours line up with the jobs they did that day. You can see which part of the shift went to which customer without anyone reconstructing it at month end.",
      },
      {
        titulo: "Exportable the day it is asked for",
        texto:
          "The register exports per person and per period in a format you can hand over. The duty is not only to store the data: it is to keep it accessible to the worker, to their legal representatives and to the Labour Inspectorate.",
      },
    ],
    faq: [
      [
        "Is time tracking compulsory in Spain?",
        "Yes, since 12 May 2019. Article 34.9 of the Workers' Statute requires recording the start and end of each employee's working day, every day, and keeping that record for four years.",
      ],
      [
        "Is digital clock-in compulsory yet?",
        "No. The decree that would require a digital format has not been approved: the Council of State issued an unfavourable opinion and nothing has been published in the official gazette. Meanwhile the law still accepts paper or a spreadsheet, provided the system is reliable, objective and accessible. When it is approved, the draft allows six months to adapt from the moment the technical specifications are published.",
      ],
      [
        "Is a spreadsheet good enough?",
        "Legally, today, yes. In practice it collapses as soon as people work off site: a sheet filled in on Friday from memory is not a daily record, and an inspection will notice. If everyone arrives at the same place at the same time, a spreadsheet holds. If you have technicians around the island, it does not.",
      ],
      [
        "Can people clock in with a fingerprint?",
        "Effectively no. The Spanish data protection authority treats fingerprints and faces as biometric data and rules out using them for time tracking unless there is no less intrusive alternative and consent is explicit and revocable. There are simpler options that stay well clear of that.",
      ],
      [
        "What about overtime?",
        "It comes out of the same record. If the agreed day is eight hours and the register says nine and a half, the difference is already counted without anyone logging it separately. That is, in practice, why the obligation exists at all.",
      ],
    ],
  },

  "partes-de-trabajo": {
    h1: ["Job report", "app"],
    entradilla:
      "The technician closes the report on their phone with photos, materials and the customer's signature, and it reaches the office before the van pulls away.",
    intro: [
      "The problem with a paper job sheet is not the paper, it is the journey. It gets filled in at eleven in the morning in a basement in Palma and reaches the office on Friday, creased, in handwriting nobody can read, unsigned because the customer had already left. In between, four days have passed in which that repair could not be invoiced or looked up.",
      "And when the customer rings in March asking what was done on that visit back in November, the answer depends on somebody remembering. It is not a tidiness problem: the information exists somewhere it cannot be used.",
    ],
    claves: [
      {
        titulo: "The customer signs on the screen",
        texto:
          "The customer signs with a finger when the job is done and gets their PDF copy by email or WhatsApp. The report closes with that signature, its timestamp and who signed it. That is the difference between invoicing a job and arguing about it.",
      },
      {
        titulo: "Before and after photos",
        texto:
          "Photos are taken from inside the report and stay inside it, not in the technician's camera roll. When there is a disagreement about the state an installation was found in, a dated photo settles it faster than any explanation.",
      },
      {
        titulo: "Materials come off the stock",
        texto:
          "What gets logged as used on the report leaves the warehouse and lands on the invoice. Without that chain, materials get counted twice or not at all, and that is where a service company's margin quietly disappears.",
      },
    ],
    faq: [
      [
        "Does it work without signal?",
        "Yes. The report is filled in and signed on the phone even with no coverage — a basement, a unit with no signal, a property inland — and uploads itself when the phone is back on the network. That is the condition for this being useful in the field rather than only in a demo.",
      ],
      [
        "Does the customer need to install anything to sign?",
        "No. They sign on the technician's phone, with a finger, and receive the PDF by email or WhatsApp. There is no app to install and no account to create, because either one would mean half the signatures never happen.",
      ],
      [
        "Can we invoice straight from the report?",
        "Yes, and that is the main reason for the report being digital at all. The hours and materials the technician logged move onto the invoice without anyone retyping them, with VeriFactu when the time comes.",
      ],
      [
        "What happens to the paper reports we already have?",
        "They stay as they are. Nobody is going to key in two years of binders by hand, and proposing it would be selling you pointless work. You start with the new ones and the archive stays where it is in case it needs checking.",
      ],
      [
        "How many technicians make it worth it?",
        "One is enough if they work off site, because what you gain is the report arriving the same day. From three or four upwards, what you gain is knowing what each of them is doing without having to ring them.",
      ],
    ],
  },

  presupuestos: {
    h1: ["Quoting", "software"],
    entradilla:
      "Quotes built from your own rates and line items, sent by WhatsApp or email, with a notification when the customer opens them and one-click acceptance.",
    intro: [
      "In a service business, quotes get made twice: once in your head in front of the customer, and again that evening at the computer, trying to remember the measurements. The second one is where they get lost, and half the jobs you were going to win go with them.",
      "Then there is what happens after sending it. You email a PDF and the silence begins. You do not know whether they opened it, whether they are comparing prices, or whether it slipped down their inbox. A week later you ring to ask, with that awkward feeling of chasing.",
    ],
    claves: [
      {
        titulo: "The line items are yours",
        texto:
          "The catalogue of items, hourly rates and materials is your company's, not a generic template. Building a quote stops being writing and becomes choosing, which is the difference between handing it over during the visit and that same evening.",
      },
      {
        titulo: "You know when it gets opened",
        texto:
          "You get a notification when the customer opens the quote. You stop calling blind: you call the one who has looked at it three times, not the one who never opened it, who needs a different conversation entirely.",
      },
      {
        titulo: "Accepting is a button, not a reply",
        texto:
          "The customer accepts from the same link, without having to write an email saying yes. And on acceptance the quote turns into a scheduled job with its line items, instead of sitting in a folder as a filed PDF.",
      },
    ],
    faq: [
      [
        "Can the quote be made in front of the customer?",
        "That is the point. With your items and rates already loaded, it is built on the phone during the visit and sent before leaving. A quote handed over on site is accepted far more often than one that arrives three days later.",
      ],
      [
        "Does it carry our logo and terms?",
        "Yes. Logo, tax details, payment terms and validity period appear on every quote without anyone having to remember to add them.",
      ],
      [
        "What if the customer asks for changes?",
        "A new version is created and the previous one is kept. You keep the trail of what was offered first and what was finally agreed, which is exactly what is missing when a disagreement surfaces three months later.",
      ],
      [
        "Does it work for construction and refurbishment?",
        "Yes, with items grouped into chapters and quantities. It is not a civil engineering measurement package with official price databases: it is for a service or refurbishment company quoting from its own rates.",
      ],
      [
        "And from quote to invoice?",
        "Straight through. What is accepted becomes a job, the job becomes a report and the report becomes an invoice, with what was actually carried out. That is how you see the gap between quoted and spent, which is where you find out whether a type of job makes money.",
      ],
    ],
  },

  "chatbot-whatsapp": {
    h1: ["WhatsApp", "chatbot"],
    entradilla:
      "Answers the same old questions at any hour, collects the details of the job and hands over to a person the moment it matters.",
    intro: [
      "A service company in Mallorca gets the same WhatsApp message fifteen times a day: what are your hours, do you cover Andratx, how much is a service visit, can you come today. None of it needs judgement, and together it eats the morning of the person who should be organising the technicians.",
      "Then at eight in the evening a real call-out arrives and nobody is reading. By the next day that customer has already rung someone else. The problem is not being short-staffed: it is that one channel mixes what anyone could answer with what cannot wait.",
    ],
    claves: [
      {
        titulo: "Answers the repetitive, hands over the rest",
        texto:
          "Opening hours, coverage areas and how to book are answered automatically. The moment a message goes beyond that — a breakdown, a complaint, a large quote — it reaches a person with the whole conversation in front of them, not starting from scratch.",
      },
      {
        titulo: "The job arrives with its details filled in",
        texto:
          "Before handing over, it collects what always has to be asked: address, what is wrong, since when, and whether it is urgent. The work order is created with that already in place, instead of a note saying “call this gentleman” that forces the whole conversation to happen again.",
      },
      {
        titulo: "In the language they wrote in",
        texto:
          "It answers in Spanish, English or German depending on how they write to you, which in Mallorca is not a decoration: it is half the customer base of many service companies.",
      },
    ],
    faq: [
      [
        "Will the customer realise it is a bot?",
        "They are told. Trying to pass it off as a person falls apart the moment they ask something awkward, and it damages trust at the first point of contact. What a customer values at eleven at night is that someone took their call-out, not being misled about who took it.",
      ],
      [
        "Do we need the WhatsApp Business API?",
        "To do it properly, yes. It is Meta's official channel and the only one that allows automated replies without putting the number at risk. It has a per-conversation cost set by Meta's rates, which is explained to you up front and is not ours to set.",
      ],
      [
        "Do we lose our usual number?",
        "No, but it has to be decided beforehand. A number already in use with the regular WhatsApp app cannot also be on the API. It is the first conversation we have, because doing it the other way round means telling your whole customer base you have changed number.",
      ],
      [
        "Can it be switched off during office hours?",
        "Yes, and that is usually the sensible way to start: the team answers from nine to six, and the assistant takes over outside that. It lets you see where it gets things wrong before giving it the whole conversation.",
      ],
      [
        "What if it does not understand something?",
        "It hands over to a person and says so. An assistant that keeps insisting while not understanding is worse than none, so it is set to give up early and leave the message in the inbox with everything it had already collected.",
      ],
    ],
  },
};
