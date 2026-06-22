import { getSP } from "./sp";

const LIST_NAME = "ExecutiveAgenda";

export interface IAgendaItem {

  time: string;

  title: string;

  description: string;

  location: string;

  type:
    | "registration"
    | "keynote"
    | "panel"
    | "roundtable"
    | "executive";

  status:
    | "confirmed"
    | "live"
    | "pending";
}

export class AgendaSharePointService {

  public static async getAgenda():
    Promise<IAgendaItem[]> {

    try {

      const sp = getSP();

      const items = await sp.web.lists
        .getByTitle(LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "Description",
          "TimeSlot",
          "Location",
          "AgendaType",
          "Status",
          "SortOrder",
          "IsActive"
        )
        .filter("IsActive eq 1")
        .orderBy("SortOrder", true)();
      
      console.log(
  "[ExecutiveAgenda] SharePoint Items",
  items
);

      return items.map((item) => ({

        time: item.TimeSlot || "",

        title: item.Title || "",

        description:
          item.Description || "",

        location:
          item.Location || "",

        type:
          (item.AgendaType || "panel")
            .toLowerCase(),

        status:
          (item.Status || "pending")
            .toLowerCase()

      })) as IAgendaItem[];

    } catch (error) {

      console.error(
        "[ExecutiveAgenda] Service Error",
        error
      );

      return [];
    }
  }
}