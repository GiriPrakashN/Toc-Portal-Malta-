import { ITeamRegion }
from "../models/ITeamRegion";

export const regions: ITeamRegion[] = [

  {
    id: 1,
    code: "GB",
    city: "LONDON",
    country: "United Kingdom",
    timezone: "Europe/London",
    accent: "cyan",
    displayOrder: 1,
    isActive: true,
    members: [
      "James T.",
      "Priya K.",
      "Mark H.",
      "Sarah O.",
      "Daniel W.",
    ],
  },

  {
    id: 2,
    code: "PA",
    city: "PANAMÁ",
    country: "Panamá",
    timezone: "America/Panama",
    accent: "lime",
    displayOrder: 2,
    isActive: true,
    members: [
      "Flavio B.",
      "Aldo F.",
      "Alfredo R.",
      "María G.",
    ],
  },

  {
    id: 3,
    code: "SG",
    city: "SINGAPORE",
    country: "Singapore",
    timezone: "Asia/Singapore",
    accent: "amber",
    displayOrder: 3,
    isActive: true,
    members: [
      "Wei L.",
      "Rajan S.",
      "Mei C.",
      "Arjun P.",
    ],
  },

  {
    id: 4,
    code: "AU",
    city: "MELBOURNE",
    country: "Australia",
    timezone: "Australia/Melbourne",
    accent: "red",
    displayOrder: 4,
    isActive: true,
    members: [
      "Jay P.",
      "Lay G.",
      "Philippa M.",
      "Sam K.",
      "Mike R.",
    ],
  },
];