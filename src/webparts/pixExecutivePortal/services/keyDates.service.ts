import { getSP } from "./sp";

import {
  IKeyDate
} from "../models/IKeyDate";

const LIST_NAME = "KeyDates";

export class KeyDatesService {

  public static async getKeyDates():
    Promise<IKeyDate[]> {

    try {

      const sp = getSP();

      const items = await sp.web.lists
        .getByTitle(LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "EventDate",
          "Note",
          "Color",
          "SortOrder",
          "isActive"
        )
        .filter("isActive eq 1")
        .orderBy("EventDate", true)();

      /*const items = await sp.web.lists
  .getByTitle(LIST_NAME)
  .items
  .select(
    "*"
  )
  .top(1)();
      console.log(
  "[KeyDates RAW]",
  items
);

      console.log(
        "[KeyDates] SharePoint Items",
        items
      );*/

      return items as IKeyDate[];

    } catch (error) {

      console.error(
        "[KeyDates] Service Error",
        error
      );

      return [];
    }
  }
}