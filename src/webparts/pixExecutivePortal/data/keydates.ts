export interface IKeyDate {

  date: string;

  title: string;

  note: string;

  color:
    | "#a3e635"
    | "#111111"
    | "#fb7185";
}

export const keyDates: IKeyDate[] = [

  {
    date: "22 APR 2026",
    title: "Hub launched",
    note: "Team site live to all regions.",
    color: "#a3e635",
  },

  {
    date: "30 APR 2026",
    title: "Sponsor Tier 1 sign-off",
    note: "Headline + gold sponsors confirmed.",
    color: "#111111",
  },

  {
    date: "15 MAY 2026",
    title: "Invitations issued",
    note: "Full delegate invitation list sent.",
    color: "#111111",
  },

  {
    date: "30 JUN 2026",
    title: "Agenda locked",
    note: "All keynotes, panels and debates signed off.",
    color: "#fb7185",
  },

  {
    date: "15 SEPT 2026",
    title: "Final RSVPs",
    note: "Travel cutoff 20 Sep.",
    color: "#111111",
  },

  {
    date: "8 OCT 2026",
    title: "Conference opens · Malta",
    note:
      "Opening debate “Fractured Forecasts” — 09:00 CEST.",
    color: "#fb7185",
  },
];