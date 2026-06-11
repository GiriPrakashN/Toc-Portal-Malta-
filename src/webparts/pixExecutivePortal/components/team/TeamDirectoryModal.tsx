import * as React from "react";

import {
  useMemo,
  useState,
} from "react";

import {
  Globe,
  Search,
  X,
} from "lucide-react";

/* =========================================================
   MODELS
========================================================= */

import {
  ITeamRegion,
} from "../../models/ITeamRegion";

/* =========================================================
   PROPS
========================================================= */

interface ITeamDirectoryModalProps {

  isOpen: boolean;

  regions: ITeamRegion[];

  now: Date;

  onClose: () => void;
}

/* =========================================================
   COMPONENT
========================================================= */

const TeamDirectoryModal = ({
  isOpen,
  regions,
  now,
  onClose,
}: ITeamDirectoryModalProps): JSX.Element | null => {

  /* ======================================================
     STATE
  ====================================================== */

  const [searchText, setSearchText] =
    useState<string>("");

  /* ======================================================
     SEARCH FILTER
  ====================================================== */

  const filteredRegions =
    useMemo(() => {

      return regions.filter((region) => {

        if (!searchText) {

          return true;
        }

        return (
          (
            region.city +
            region.country +
            region.code +
            region.members.join(" ")
          )
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            )
        );
      });

    }, [regions, searchText]);

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

  /* ======================================================
     CLOSED
  ====================================================== */

  if (!isOpen) {

    return null;
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (

    <div className="pix-modal-overlay">

      <div className="pix-modal">

        {/* ==================================================
            HEADER
        =================================================== */}

        <div className="pix-modal__header">

          <div>

            <h2 className="pix-modal__title">

              Global Team Workspace

            </h2>

            <p className="pix-modal__subtitle">

              Real-time regional team operations

            </p>

          </div>

          <button
            className="pix-modal__close"
            onClick={onClose}
          >

            <X size={18} />

          </button>

        </div>

        {/* ==================================================
            TOOLBAR
        =================================================== */}

        <div className="pix-modal__toolbar">

          <div className="pix-modal-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="
                Search regions,
                countries,
                members...
              "
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* ==================================================
            GRID
        =================================================== */}

        <div className="pix-team-modal-grid">

          {filteredRegions.map((region) => (

            <article
              key={region.id}
              className={`
                pix-team-card
                pix-team-card--${region.accent}
              `}
            >

              <div className="pix-team-modal-card__top">

                <div className="pix-team-card__code">

                  {region.code}

                </div>

                <div className="pix-team-modal-card__icon">

                  <Globe size={18} />

                </div>

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

              <div className="pix-team-modal-members">

                <div className="pix-team-modal-members__title">

                  Team Members

                </div>

                <div className="pix-team-modal-members__list">

                  {region.members.map((member) => (

                    <div
                      key={member}
                      className="
                        pix-team-modal-member
                      "
                    >

                      {member}

                    </div>

                  ))}

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>

    </div>
  );
};

export default TeamDirectoryModal;