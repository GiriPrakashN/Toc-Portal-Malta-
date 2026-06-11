export interface ITeamRegion {

  id: number;

  code: string;

  city: string;

  country: string;

  timezone: string;

  accent: "cyan" | "lime" | "amber" | "red";

  members: string[];

  displayOrder: number;

  isActive: boolean;
}