export interface IAgendaItem {

  Id: number;

  Title: string;

  Description: string;

  TimeSlot: string;

  Location: string;

  AgendaType: string;

  AgendaTheme: string;

  Status: string;

  StatusTheme: string;

  SortOrder: number;

  IsActive: boolean;
}