import { getSP } from "./sp";

import {
  ISponsorSettings
} from "../models/ISponsorSettings";

const LIST_NAME =
  "SponsorsSettings";

export class SponsorsSettingsService {

  public static async getSettings():
    Promise<ISponsorSettings | null> {

    try {

      const sp = getSP();

      const items = await sp.web.lists
        .getByTitle(LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "TotalSponsorTarget",
          "RevenueTarget",
          "IsActive"
        )
        .filter("IsActive eq 1")
        .top(1)();

      console.log(
        "[SponsorsSettings]",
        items
      );

      if (
        !items ||
        items.length === 0
      ) {

        return null;
      }

      return items[0] as ISponsorSettings;

    } catch (error) {

      console.error(
        "[SponsorsSettings] Error",
        error
      );

      return null;
    }
  }
}