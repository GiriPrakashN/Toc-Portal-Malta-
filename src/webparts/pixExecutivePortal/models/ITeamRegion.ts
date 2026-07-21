export interface ITeamMember {

  name: string;

  email?: string;
}

export interface ITeamRegion {

  id: number;

  code: string;

  city: string;

  country: string;

  timezone: string;

  accent: "cyan" | "lime" | "amber" | "red";

  members: ITeamMember[];

  displayOrder: number;

  isActive: boolean;
}
