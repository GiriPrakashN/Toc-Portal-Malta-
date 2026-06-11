import {
  IDocumentItem,
} from "../models/IDocumentItem";

export const documents:
IDocumentItem[] = [

  {
    id: 1,

    title: "Executive Agenda v12",

    fileName: "ExecutiveAgenda.pdf",

    fileType: "pdf",

    fileUrl: "#",

    modified:
      new Date().toISOString(),

    modifiedBy: "James Porter",

    approvalStatus: "Approved",
  },

  {
    id: 2,

    title: "Sponsor Contracts",

    fileName: "SponsorContracts.docx",

    fileType: "docx",

    fileUrl: "#",

    modified:
      new Date().toISOString(),

    modifiedBy: "Maria Chen",

    approvalStatus: "Pending",
  },

  {
    id: 3,

    title: "Travel Coordination",

    fileName: "Travel.xlsx",

    fileType: "xlsx",

    fileUrl: "#",

    modified:
      new Date().toISOString(),

    modifiedBy: "Carlos Mendes",

    approvalStatus: "Active",
  },
];