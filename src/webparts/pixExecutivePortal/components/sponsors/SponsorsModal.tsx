import * as React from "react";

import {
  useMemo,
  useState
} from "react";

import {
  X
} from "lucide-react";

import {
  ISponsor
} from "../../models/ISponsor";

interface ISponsorsModalProps {

  isOpen: boolean;

  sponsors: ISponsor[];

  onClose: () => void;
}

const SponsorsModal = ({
  isOpen,
  sponsors,
  onClose
}: ISponsorsModalProps): JSX.Element | null => {

  const [activeStatus, setActiveStatus] =
    useState<string>("All");

  /* ======================================================
     TEMP TARGET VALUE
     Replace later from SponsorsSettings list
  ====================================================== */

  const revenueTarget = 1800000;

  /* ======================================================
     STATUS FILTERS
  ====================================================== */

  const statusFilters =
    useMemo(() => {

      const statuses =
        sponsors.map(
          (item) => item.Status
        );

      return [
        "All",
        ...Array.from(
          new Set(statuses)
        )
      ];

    }, [sponsors]);

  /* ======================================================
     FILTERED SPONSORS
  ====================================================== */

  const filteredSponsors =
    useMemo(() => {

      return sponsors.filter(
        (item) =>
          activeStatus === "All"
            ? true
            : item.Status === activeStatus
      );

    }, [
      sponsors,
      activeStatus
    ]);

  /* ======================================================
     KPI CALCULATIONS
  ====================================================== */

  const confirmedSponsors =
    sponsors.filter(
      (item) =>
        item.Status.toLowerCase() ===
        "confirmed"
    ).length;

  const confirmedRevenue =
    sponsors
      .filter(
        (item) =>
          item.Status.toLowerCase() ===
          "confirmed"
      )
      .reduce(
        (
          total,
          item
        ) =>
          total +
          Number(
            item.SponsorValue || 0
          ),
        0
      );

  const percentage =
    revenueTarget > 0
      ? Math.round(
          (
            confirmedRevenue /
            revenueTarget
          ) * 100
        )
      : 0;

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

        <div className="pix-modal__header">

          <div>

            <h2 className="pix-modal__title">

              Sponsors Workspace

            </h2>

            <p className="pix-modal__subtitle">

              Full sponsorship tracker

            </p>

          </div>

          <button
            className="pix-modal__close"
            onClick={onClose}
          >

            <X size={18} />

          </button>

        </div>

        <div className="pix-modal__toolbar">

          <div className="pix-library-workspace">

            <div className="pix-library-workspace__left">

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  TOTAL SPONSORS

                </div>

                <div className="pix-library-stat__value">

                  {sponsors.length}

                </div>

              </div>

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  CONFIRMED

                </div>

                <div className="pix-library-stat__value">

                  {confirmedSponsors}

                </div>

              </div>

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  REVENUE

                </div>

                <div className="pix-library-stat__value">

                  $
                  {confirmedRevenue.toLocaleString()}

                </div>

              </div>

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  TARGET ACHIEVED

                </div>

                <div className="pix-library-stat__value">

                  {percentage}%

                </div>

              </div>

            </div>

          </div>

          <div className="pix-modal-filters">

            {statusFilters.map(
              (status) => (

                <button
                  key={status}
                  className={`
                    pix-filter-button
                    ${
                      activeStatus === status
                        ? "pix-filter-button--active"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setActiveStatus(status)
                  }
                >

                  {status}

                </button>

              )
            )}

          </div>

        </div>

        <div className="pix-modal__table-wrapper">

          <table
            className="pix-sponsors-table"
          >

            <thead>

              <tr>

                <th>Sponsor</th>

                <th>Tier</th>

                <th>Owner</th>

                <th>Value</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredSponsors.map(
                (sponsor) => (

                  <tr
                    key={sponsor.Id}
                  >

                    <td>

                      <div className="pix-sponsor">

                        <div className="pix-sponsor__avatar">

                          {
                            sponsor.ShortCode
                          }

                        </div>

                        <div>

                          <div className="pix-sponsor__name">

                            {
                              sponsor.Title
                            }

                          </div>

                          <div className="pix-sponsor__owner">

                            {
                              sponsor.OwnerName
                            }

                          </div>

                        </div>

                      </div>

                    </td>

                    <td>

                      <div className="pix-sponsor-tier">

                        {
                          sponsor.Tier
                        }

                      </div>

                    </td>

                    <td>

                      <div className="pix-action-region">

                        {
                          sponsor.OwnerName
                        }

                      </div>

                    </td>

                    <td>

                      <div className="pix-sponsor-value">

                        $
                        {
                          Number(
                            sponsor.SponsorValue || 0
                          ).toLocaleString()
                        }

                      </div>

                    </td>

                    <td>

                      <div
                        className={`
                          pix-sponsor-status
                          pix-sponsor-status--${sponsor.Status.toLowerCase()}
                        `}
                      >

                        {
                          sponsor.Status
                        }

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default SponsorsModal;