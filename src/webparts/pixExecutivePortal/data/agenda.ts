export interface IAgendaItem {

  time: string;

  title: string;

  description: string;

  location: string;

  type:
    | "registration"
    | "keynote"
    | "panel"
    | "roundtable"
    | "executive";

  status:
    | "confirmed"
    | "live"
    | "pending";
}

export const agenda: IAgendaItem[] = [

  {
    time: "08:30",
    title: "Delegate Registration",
    description:
      "Arrival, accreditation and networking breakfast.",
    location: "Main Hall",
    type: "registration",
    status: "confirmed",
  },

  {
    time: "09:00",
    title: "Opening Keynote",
    description:
      "Breaking the Mould — reshaping the future of ports.",
    location: "Grand Stage",
    type: "keynote",
    status: "live",
  },

  {
    time: "11:00",
    title: "Global Trade Panel",
    description:
      "Economic pressures and geopolitical transformation.",
    location: "Conference A",
    type: "panel",
    status: "confirmed",
  },

  {
    time: "14:00",
    title: "Innovation Roundtable",
    description:
      "AI, automation and next-generation terminal systems.",
    location: "Strategy Hub",
    type: "roundtable",
    status: "pending",
  },

  {
    time: "17:30",
    title: "Executive Closing Session",
    description:
      "Leadership alignment and strategic announcements.",
    location: "Executive Lounge",
    type: "executive",
    status: "confirmed",
  },
];