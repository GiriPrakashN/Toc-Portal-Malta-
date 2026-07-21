import { getSP } from "./sp";

import {
  IEventSettings
} from "../models/IEventSettings";

const LIST_NAME =
  "EventSettings";

export class EventSettingsService {

  public static async getSettings():
    Promise<IEventSettings | null> {

    try {

      const sp = getSP();

      const items = await sp.web.lists
        .getByTitle(LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "EventName",
          "EventSubTitle",
          "EventLocation",
          "EventDate",
          "HeroTitleLine1",
          "HeroTitleLine2",
          "InvitationLabel",
          "EventDuration",
          "Description",
          "IsActive"
        )
        .filter("IsActive eq 1")
        .top(1)();

      console.log(
        "[EventSettings] SharePoint Items",
        items
      );

      if (
        !items ||
        items.length === 0
      ) {

        return null;
      }

      return items[0] as IEventSettings;

    } catch (error) {

      console.error(
        "[EventSettings] Service Error",
        error
      );

      return null;
    }
  }
}
