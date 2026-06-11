import {
  IExecutiveStat
} from "../models/IExecutiveStats";

import {
  executiveStatsMock
} from "../data/executiveStatsMock";

export default class DashboardService {

  /*
    CURRENT:
    Mock Mode

    FUTURE:
    Live SharePoint Data
  */

  public static async getExecutiveStats():
  Promise<IExecutiveStat[]> {

    return executiveStatsMock;
  }
}