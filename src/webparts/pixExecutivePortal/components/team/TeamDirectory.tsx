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

import {
  formatTimeSafe,
  formatDateSafe
} from "../../utils/timezoneFormat";

const TeamDirectory = (): JSX.Element => {

  const [regions, setRegions] =
    useState<ITeamRegion[]>([]);

  /* All active regions are shown in the dashboard row
     (currently 6). TeamDirectoryService already returns
     them pre-sorted alphabetically by city. */
  const dashboardRegions = regions;

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

    void loadRegions();

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
     FORMAT TIME / DATE (crash-proof: falls back instead
     of throwing if a region's Timezone value is invalid)
  ====================================================== */

  const formatTime = (
    timezone: string
  ): string =>
    formatTimeSafe(timezone, now);

  const formatDate = (
    timezone: string
  ): string =>
    formatDateSafe(timezone, now);

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
    team {region.members.length === 1 ? "member" : "members"}
  </strong>

  {region.members.length > 0 && (

    <div className="pix-team-card__members-list">

      {region.members.map((member) => (

        member.email ? (

          <a
            key={member.name}
            href={`mailto:${member.email}`}
            className="pix-team-card__member-link"
            title={member.email}
          >
            {member.name}
          </a>

        ) : (

          <span
            key={member.name}
            className="pix-team-card__member-link pix-team-card__member-link--plain"
          >
            {member.name}
          </span>
        )

      ))}

    </div>
  )}

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
