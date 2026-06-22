import * as React from "react";

import {
  useEffect,
  useState
} from "react";

import {
  ITeamRegion
} from "../../models/ITeamRegion";

import TeamDirectoryService
from "../../services/TeamDirectoryService";

import {
  teamDirectoryConfig
} from "../../config/teamDirectoryConfig";

import TeamDirectoryModal
from "./TeamDirectoryModal";

const TeamDirectory = (): JSX.Element => {

  const [regions, setRegions] =
    useState<ITeamRegion[]>([]);

  const dashboardRegions =
    regions.slice(0, 4);
  const [now, setNow] =
    useState(new Date());

  const [showFullDirectory, setShowFullDirectory] =
    useState(false);

  /* ======================================================
     LOAD REGIONS
  ====================================================== */

  useEffect(() => {

    const loadRegions = async () => {

      const response =
        await TeamDirectoryService
          .getRegions();

      setRegions(response);
    };

    loadRegions();

  }, []);

  /* ======================================================
     LIVE CLOCK
  ====================================================== */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setNow(new Date());

      }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* ======================================================
     FORMAT TIME
  ====================================================== */

  const formatTime = (
    timezone: string
  ): string => {

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
    ).format(now);
  };

  /* ======================================================
     FORMAT DATE
  ====================================================== */

  const formatDate = (
    timezone: string
  ): string => {

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        timeZone: timezone,
        weekday: "short",
        day: "2-digit",
        month: "short",
      }
    ).format(now);
  };

  return (

    <section className="pix-team-directory">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="pix-team-directory__header">

        <div className="pix-team-directory__title-group">

          <div className="pix-team-directory__title">

            <span className="pix-team-directory__icon">

  🌐

</span>

            <span>
              {teamDirectoryConfig.sectionTitle}
            </span>

          </div>

          <div className="pix-team-directory__live-pill">

            {teamDirectoryConfig.liveLabel}

          </div>

        </div>

        <button
  className="pix-team-directory__cta"
  type="button"
  onClick={() =>
    setShowFullDirectory(true)
  }
>

          {teamDirectoryConfig.ctaLabel}

        </button>

      </div>

      {/* ======================================================
          GRID
      ====================================================== */}

      <div className="pix-team-directory__grid">

        {dashboardRegions.map((region) => (

          <article
            key={region.id}
            className={`
              pix-team-card
              pix-team-card--${region.accent}
            `}
          >

            <div className="pix-team-card__code">

              {region.code}

            </div>

            <div className="pix-team-card__city">

              {region.city}

            </div>

            <div className="pix-team-card__location">

              {region.country}
              {" · "}
              {region.timezone}

            </div>

            <div className="pix-team-card__clock">

              {formatTime(region.timezone)}

            </div>

            <div className="pix-team-card__date">

              {formatDate(region.timezone)}

            </div>

            <div className="pix-team-card__members">

  <strong>
    {region.members.length}
    {" "}
    team members
  </strong>

  {" · "}

  {region.members.join(", ")}

</div>

          </article>

        ))}

      </div>

        <TeamDirectoryModal
  isOpen={showFullDirectory}
  regions={regions}
  now={now}
  onClose={() =>
    setShowFullDirectory(false)
  }
/>

    </section>
  );
};

export default TeamDirectory;