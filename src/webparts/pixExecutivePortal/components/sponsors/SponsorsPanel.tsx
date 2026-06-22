import * as React from "react";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  BriefcaseBusiness
} from "lucide-react";

import {
  ISponsor
} from "../../models/ISponsor";

import {
  ISponsorSettings
} from "../../models/ISponsorSettings";

import {
  SponsorsService
} from "../../services/sponsors.service";

import {
  SponsorsSettingsService
} from "../../services/sponsorsSettings.service";

import SponsorsModal
from "./SponsorsModal";

const SponsorsPanel = (): JSX.Element => {

  const [sponsors, setSponsors] =
    useState<ISponsor[]>([]);

  const [settings, setSettings] =
    useState<ISponsorSettings | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [showModal, setShowModal] =
    useState<boolean>(false);

  useEffect(() => {

    const loadData =
      async (): Promise<void> => {

        try {

          setLoading(true);

          const [
            sponsorsResponse,
            settingsResponse
          ] = await Promise.all([
            SponsorsService.getSponsors(),
            SponsorsSettingsService.getSettings()
          ]);

          setSponsors(
            sponsorsResponse
          );

          setSettings(
            settingsResponse
          );

        } catch (error) {

          console.error(
            "[SponsorsPanel]",
            error
          );

        } finally {

          setLoading(false);
        }
      };

    loadData();

  }, []);

  const confirmedSponsors =
    useMemo(() => {

      return sponsors.filter(
        (item) =>
          item.Status
            .toLowerCase() ===
          "confirmed"
      ).length;

    }, [sponsors]);

  const revenueAchieved =
    useMemo(() => {

      return sponsors
        .filter(
          (item) =>
            item.Status
              .toLowerCase() ===
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

    }, [sponsors]);

  const percentageAchieved =
    useMemo(() => {

      if (
        !settings ||
        !settings.RevenueTarget
      ) {

        return 0;
      }

      return Math.round(
        (
          revenueAchieved /
          settings.RevenueTarget
        ) * 100
      );

    }, [
      revenueAchieved,
      settings
    ]);

  const progressWidth =
    `${Math.min(
      percentageAchieved,
      100
    )}%`;

  if (loading) {

    return (

      <section
        className="pix-sponsors-panel"
      >

        <div
          style={{
            padding: "40px"
          }}
        >

          Loading sponsors...

        </div>

      </section>
    );
  }

  return (

    <>

      <section className="pix-sponsors-panel">

        {/* HEADER */}

        <div className="pix-ops-panel__header">

          <div className="pix-ops-panel__title-group">

            <BriefcaseBusiness
              size={16}
              color="#8b5cf6"
            />

            <h2 className="pix-ops-panel__title">

              Sponsors

            </h2>

            <div className="pix-open-badge">

              {confirmedSponsors}
              {" "}
              Confirmed

            </div>

          </div>

          <button
            className="pix-panel-cta"
            onClick={() =>
              setShowModal(true)
            }
          >

            Full tracker →

          </button>

        </div>

        {/* KPI */}

        <div
          style={{
            padding:
              "18px 20px 20px",
            borderBottom:
              "1px solid rgba(15,23,42,0.06)"
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              gap: "12px",
              marginBottom:
                "12px",
              fontSize:
                "12px",
              color:
                "#666666"
            }}
          >

            <div>

              <strong
                style={{
                  color:
                    "#111111"
                }}
              >

                {confirmedSponsors}
                {" of "}
                {
                  settings?.TotalSponsorTarget ?? 0
                }

              </strong>

              {" "}
              confirmed ·

              <strong
                style={{
                  color:
                    "#111111"
                }}
              >

                {" $"}
                {
                  revenueAchieved.toLocaleString()
                }

              </strong>

              {" "}
              of

              <strong
                style={{
                  color:
                    "#111111"
                }}
              >

                {" $"}
                {
                  settings?.RevenueTarget
                    ?.toLocaleString()
                }

              </strong>

              {" "}
              target

            </div>

            <div
              style={{
                fontWeight:
                  800,
                color:
                  "#06b6d4"
              }}
            >

              {percentageAchieved}%

            </div>

          </div>

          <div
            style={{
              height: "8px",
              overflow:
                "hidden",
              borderRadius:
                "999px",
              background:
                "rgba(15,23,42,0.08)"
            }}
          >

            <div
              style={{
                width:
                  progressWidth,
                height:
                  "100%",
                borderRadius:
                  "999px",
                background:
                  "linear-gradient(90deg,#22d3ee,#a3e635,#fb7185)"
              }}
            />

          </div>

        </div>

        {/* TABLE */}

        <table className="pix-sponsors-table">

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

            {sponsors.map(
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
                        sponsor.SponsorValue
                          .toLocaleString()
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

      </section>

      <SponsorsModal
        isOpen={showModal}
        sponsors={sponsors}
        onClose={() =>
          setShowModal(false)
        }
      />

    </>
  );
};

export default SponsorsPanel;