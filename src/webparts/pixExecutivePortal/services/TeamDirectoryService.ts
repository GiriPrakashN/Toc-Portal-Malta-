import { ITeamRegion }
from "../models/ITeamRegion";

import { regions }
from "../data/team";

export default class TeamDirectoryService {

  /* ======================================================
     GET REGIONS
  ====================================================== */

  public static async getRegions():
    Promise<ITeamRegion[]> {

    return regions
      .filter((item) => item.isActive)
      .sort(
        (a, b) =>
          a.displayOrder - b.displayOrder
      );
  }
}