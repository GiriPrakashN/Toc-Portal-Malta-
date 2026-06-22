import { getSP } from "./sp";

import {
  ISponsor
} from "../models/ISponsor";

const LIST_NAME = "Sponsors";

export class SponsorsService {

  public static async getSponsors():
    Promise<ISponsor[]> {

    try {

      const sp = getSP();

      const items = await sp.web.lists
        .getByTitle(LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "ShortCode",
          "Tier",
          "OwnerName",
          "SponsorValue",
          "Status",
          "SortOrder",
          "isActive"
        )
        .filter("isActive eq 1")
        .orderBy("SortOrder", true)();

      console.log(
        "[Sponsors] SharePoint Items",
        items
      );

      return items as ISponsor[];

    } catch (error) {

      console.error(
        "[Sponsors] Service Error",
        error
      );

      return [];
    }
  }
}