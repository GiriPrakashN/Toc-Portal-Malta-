import { getSP } from "./sp";

import { IExecutiveAction } from "../models/IExecutiveAction";

const LIST_NAME = "ExecutiveActions";

export class ActionsService {

  /**
   * =========================================================
   * GET EXECUTIVE ACTIONS
   * =========================================================
   * Production-grade SharePoint retrieval
   * - Uses select() for performance
   * - Uses filter() for active records only
   * - Uses orderBy() for controlled rendering
   * =========================================================
   */

  public static async getActions(): Promise<IExecutiveAction[]> {

    try {

      const sp = getSP();

      const items = await sp.web.lists
        .getByTitle(LIST_NAME)
        .items
        .select(
          "Id",
          "Title",
          "OwnerName",
          "OwnerInitials",
          "OwnerColor",
          "Region",
          "DueDate",
          "Priority",
          "Status",
          "SortOrder",
          "isActive"
        )
        .filter("isActive eq 1")
        .orderBy("SortOrder", true)();

      console.log(
        "[ExecutiveActions] SharePoint Items",
        items
      );

      return items as IExecutiveAction[];

    } catch (error) {

      console.error(
        "[ExecutiveActions] Service Error",
        error
      );

      return [];
    }
  }
}