export interface ISponsorItem {

  id: number;

  short: string;

  name: string;

  tier:
    | "Headline"
    | "Gold"
    | "Silver"
    | "Tech Partner";

  owner: string;

  value: string;

  status:
    | "confirmed"
    | "draft"
    | "pitched";
}

export const sponsors: ISponsorItem[] = [

  {
    id: 1,
    short: "M",
    name: "Maersk",
    tier: "Headline",
    owner: "James T.",
    value: "$250K",
    status: "confirmed",
  },

  {
    id: 2,
    short: "DW",
    name: "DP World",
    tier: "Headline",
    owner: "James T.",
    value: "$250K",
    status: "draft",
  },

  {
    id: 3,
    short: "AT",
    name: "APM Terminals",
    tier: "Gold",
    owner: "Flavio B.",
    value: "$100K",
    status: "pitched",
  },

  {
    id: 4,
    short: "PI",
    name: "PSA International",
    tier: "Gold",
    owner: "Wei L.",
    value: "$100K",
    status: "confirmed",
  },

  {
    id: 5,
    short: "POM",
    name: "Port of Melbourne",
    tier: "Silver",
    owner: "Lay G.",
    value: "$50K",
    status: "confirmed",
  },

  {
    id: 6,
    short: "IS",
    name: "IGO Solutions",
    tier: "Tech Partner",
    owner: "Jay P.",
    value: "In-kind",
    status: "confirmed",
  },
];