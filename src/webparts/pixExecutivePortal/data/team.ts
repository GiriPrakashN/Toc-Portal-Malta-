import { ITeamRegion } from "../models/ITeamRegion";

/* =========================================================
   FALLBACK / SEED DATA

   Used only when the TeamRegions / TeamMembers SharePoint
   lists are unavailable (not yet created, or the request
   fails). Once the lists exist, TeamDirectoryService pulls
   live data from SharePoint instead of this file.
========================================================= */

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
      { name: "Vanessa Sawyerr", email: "vanessa@getstuffdoneuk.com" },
    ],
  },

  {
    id: 2,
    code: "AE",
    city: "ABU DHABI",
    country: "United Arab Emirates",
    timezone: "Asia/Dubai",
    accent: "amber",
    displayOrder: 2,
    isActive: true,
    members: [
      { name: "Nisha Vyas", email: "beawesome108@gmail.com" },
    ],
  },

  {
    id: 3,
    code: "PA",
    city: "PANAMÁ",
    country: "Panamá",
    timezone: "America/Panama",
    accent: "lime",
    displayOrder: 3,
    isActive: true,
    members: [
      { name: "David Taylor", email: "david@apexmaritimeadvisors.com" },
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
      { name: "Jay Pandya" },
    ],
  },

  {
    id: 5,
    code: "ID",
    city: "JAKARTA",
    country: "Indonesia",
    timezone: "Asia/Jakarta",
    accent: "cyan",
    displayOrder: 5,
    isActive: true,
    members: [
      { name: "Jon Arnup", email: "jon.arnup@trentgo.com" },
    ],
  },

  {
    id: 6,
    code: "IN",
    city: "INDIA",
    country: "India",
    timezone: "Asia/Kolkata",
    accent: "lime",
    displayOrder: 6,
    isActive: true,
    members: [
      { name: "Rajan" },
    ],
  },
];
