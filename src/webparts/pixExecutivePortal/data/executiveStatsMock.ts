import { IExecutiveStat }
from "../models/IExecutiveStats";

export const executiveStatsMock:
IExecutiveStat[] = [

  {
    id: 1,
    title: "Open Actions",
    value: "23",
    subtitle: "4 overdue • 8 due this week",
    icon: "📘",
    accent: "blue"
  },

  {
    id: 2,
    title: "Documents",
    value: "147",
    subtitle: "In PIX 2026 Documents library",
    icon: "📄",
    accent: "green"
  },

  {
    id: 3,
    title: "Team Members",
    value: "18",
    subtitle: "Across 4 regions",
    icon: "👥",
    accent: "yellow"
  },

  {
    id: 4,
    title: "Sponsors Confirmed",
    value: "9 / 24",
    subtitle: "38% of target",
    icon: "🏆",
    accent: "red"
  }
];