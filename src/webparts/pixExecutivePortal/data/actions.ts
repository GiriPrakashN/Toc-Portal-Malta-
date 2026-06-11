export interface IActionItem {

  id: number;

  task: string;

  owner: string;

  initials: string;

  ownerAccent:
    | "cyan"
    | "lime"
    | "amber"
    | "red"
    | "purple"
    | "dark";

  region: string;

  due: string;

  priority:
    | "critical"
    | "high"
    | "medium"
    | "low";

  status:
    | "in-progress"
    | "pending"
    | "completed"
    | "blocked";
}

export const actions: IActionItem[] = [

  {
    id: 1,
    task: "Finalize keynote speaker approvals",
    owner: "James Porter",
    initials: "JP",
    ownerAccent: "cyan",
    region: "London",
    due: "22 Apr",
    priority: "critical",
    status: "in-progress",
  },

  {
    id: 2,
    task: "Sponsor agreement legal review",
    owner: "Maria Chen",
    initials: "MC",
    ownerAccent: "lime",
    region: "Panamá",
    due: "25 Apr",
    priority: "high",
    status: "pending",
  },

  {
    id: 3,
    task: "Travel logistics for delegates",
    owner: "Carlos Mendes",
    initials: "CM",
    ownerAccent: "amber",
    region: "Singapore",
    due: "28 Apr",
    priority: "medium",
    status: "completed",
  },

  {
    id: 4,
    task: "Finalize breakout session agenda",
    owner: "Sophie Williams",
    initials: "SW",
    ownerAccent: "red",
    region: "Melbourne",
    due: "30 Apr",
    priority: "critical",
    status: "in-progress",
  },

  {
    id: 5,
    task: "Confirm media and press partnerships",
    owner: "Daniel Lee",
    initials: "DL",
    ownerAccent: "purple",
    region: "London",
    due: "02 May",
    priority: "high",
    status: "pending",
  },

  {
    id: 6,
    task: "Venue AV infrastructure testing",
    owner: "Aldo Fernandez",
    initials: "AF",
    ownerAccent: "dark",
    region: "Panamá",
    due: "08 May",
    priority: "medium",
    status: "completed",
  },
];