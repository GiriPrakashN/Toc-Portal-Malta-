import { getSP } from "./sp";

import {
  ITeamRegion,
  ITeamMember
} from "../models/ITeamRegion";

import {
  ISPTeamRegion
} from "../models/ISPTeamRegion";

import {
  ISPTeamMember
} from "../models/ISPTeamMember";

import { regions as fallbackRegions } from "../data/team";

const REGIONS_LIST_NAME = "TeamRegions";
const MEMBERS_LIST_NAME = "TeamMembers";

const VALID_ACCENTS = ["cyan", "lime", "amber", "red"];

export default class TeamDirectoryService {

  /* ======================================================
     GET REGIONS
     Pulls regions from the "TeamRegions" list and members
     from the "TeamMembers" list, joins them on the Region
     text column, and returns the combined, alphabetically
     sorted (by city) result. Falls back to local seed data
     if either list is missing or empty.
  ====================================================== */

  public static async getRegions():
    Promise<ITeamRegion[]> {

    try {

      const sp = getSP();

      const [spRegions, spMembers] = await Promise.all([

        sp.web.lists
          .getByTitle(REGIONS_LIST_NAME)
          .items
          .select(
            "Id",
            "Title",
            "Code",
            "City",
            "Country",
            "Timezone",
            "Accent",
            "DisplayOrder",
            "IsActive"
          )
          .filter("IsActive eq 1")
          .orderBy("DisplayOrder", true)() as Promise<ISPTeamRegion[]>,

        sp.web.lists
          .getByTitle(MEMBERS_LIST_NAME)
          .items
          .select(
            "Id",
            "Title",
            "Email",
            "Region",
            "SortOrder",
            "IsActive"
          )
          .filter("IsActive eq 1")
          .orderBy("SortOrder", true)() as Promise<ISPTeamMember[]>

      ]);

      console.log(
        "[TeamDirectory] SharePoint Regions",
        spRegions
      );

      console.log(
        "[TeamDirectory] SharePoint Members",
        spMembers
      );

      if (!spRegions || spRegions.length === 0) {

        return TeamDirectoryService.sortAlphabetically(
          fallbackRegions
        );
      }

      const mapped: ITeamRegion[] = spRegions.map(
        (region) => {

          const members: ITeamMember[] = (spMembers || [])
            .filter(
              (member) =>
                member.Region === region.Title
            )
            .map(
              (member) => ({
                name: member.Title,
                email: member.Email || undefined
              })
            );

          const accent =
            VALID_ACCENTS.indexOf(region.Accent) > -1
              ? (region.Accent as ITeamRegion["accent"])
              : "cyan";

          return {
            id: region.Id,
            code: region.Code,
            city: region.City,
            country: region.Country,
            timezone: region.Timezone,
            accent,
            displayOrder: region.DisplayOrder,
            isActive: region.IsActive,
            members
          };
        }
      );

      return TeamDirectoryService.sortAlphabetically(
        mapped
      );

    } catch (error) {

      console.error(
        "[TeamDirectory] Service Error",
        error
      );

      return TeamDirectoryService.sortAlphabetically(
        fallbackRegions
      );
    }
  }

  /* ======================================================
     SORT ALPHABETICALLY BY CITY
  ====================================================== */

  private static sortAlphabetically(
    items: ITeamRegion[]
  ): ITeamRegion[] {

    return [...items].sort(
      (a, b) =>
        a.city.localeCompare(b.city)
    );
  }
}
