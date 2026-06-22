import {
  IExecutiveStat
} from "../models/IExecutiveStats";

import {
  ActionsService
} from "./actions.service";

import DocumentsService
from "./DocumentsService";

import TeamDirectoryService
from "./TeamDirectoryService";

import {
  SponsorsService
} from "./sponsors.service";

import {
  SponsorsSettingsService
} from "./sponsorsSettings.service";

export default class DashboardService {

  public static async getExecutiveStats():
    Promise<IExecutiveStat[]> {

    try {

      const [
        actions,
        documents,
        regions,
        sponsors,
        sponsorSettings
      ] = await Promise.all([

        ActionsService.getActions(),

        DocumentsService.getDocuments(),

        TeamDirectoryService.getRegions(),

        SponsorsService.getSponsors(),

        SponsorsSettingsService.getSettings()

      ]);

      /* =====================================================
         ACTIONS
      ===================================================== */

      const openActions =
        actions.filter(
          item =>
            item.Status.toLowerCase() !==
            "completed"
        );

      const overdueActions =
        openActions.filter(
          item =>
            new Date(item.DueDate) <
            new Date()
        );

      const nextWeek =
        new Date();

      nextWeek.setDate(
        nextWeek.getDate() + 7
      );

      const dueThisWeek =
        openActions.filter(item => {

          const dueDate =
            new Date(item.DueDate);

          return (
            dueDate >= new Date() &&
            dueDate <= nextWeek
          );
        });

      /* =====================================================
         DOCUMENTS
      ===================================================== */

      const documentCount =
        documents.length;

      /* =====================================================
         TEAM
      ===================================================== */

      const totalRegions =
        regions.length;

      const totalMembers =
        regions.reduce(
          (
            total,
            region
          ) =>
            total +
            region.members.length,
          0
        );

      /* =====================================================
         SPONSORS
      ===================================================== */

      const confirmedSponsors =
        sponsors.filter(
          sponsor =>
            sponsor.Status.toLowerCase() ===
            "confirmed"
        ).length;

      const sponsorTarget =
        sponsorSettings?.TotalSponsorTarget || 0;

      const sponsorPercentage =
        sponsorTarget > 0
          ? Math.round(
              (
                confirmedSponsors /
                sponsorTarget
              ) * 100
            )
          : 0;

      /* =====================================================
         RETURN
      ===================================================== */

      return [

        {
          id: 1,
          title: "Open Actions",
          value:
            openActions.length.toString(),
          subtitle:
            `${overdueActions.length} overdue • ${dueThisWeek.length} due this week`,
          icon: "📘",
          accent: "blue"
        },

        {
          id: 2,
          title: "Documents",
          value:
            documentCount.toString(),
          subtitle:
            "In PIX Executive Documents library",
          icon: "📄",
          accent: "green"
        },

        {
          id: 3,
          title: "Team Members",
          value:
            totalMembers.toString(),
          subtitle:
            `Across ${totalRegions} regions`,
          icon: "👥",
          accent: "yellow"
        },

        {
          id: 4,
          title: "Sponsors Confirmed",
          value:
            `${confirmedSponsors} / ${sponsorTarget}`,
          subtitle:
            `${sponsorPercentage}% of target`,
          icon: "🏆",
          accent: "red"
        }

      ];

    } catch (error) {

      console.error(
        "[DashboardService]",
        error
      );

      return [];
    }
  }
}