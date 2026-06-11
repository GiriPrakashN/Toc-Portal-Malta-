import * as React from "react";

import {
  BriefcaseBusiness
} from "lucide-react";

import {
  sponsors,
  ISponsorItem
} from "../../data/sponsors";

const SponsorsPanel = (): JSX.Element => {

  return (

    <section className="pix-sponsors-panel">

      {/* ======================================================
          HEADER
      ====================================================== */}

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

            4 Confirmed

          </div>

        </div>

        <button className="pix-panel-cta">

          Full tracker →

        </button>

      </div>

      {/* ======================================================
          KPI BAR
      ====================================================== */}

      <div
        style={{
          padding:
            "18px 20px 20px",
          borderBottom:
            "1px solid rgba(15,23,42,0.06)",
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
              "#666666",
          }}
        >

          <div>

            <strong
              style={{
                color:
                  "#111111",
              }}
            >

              4 of 24

            </strong>

            {" "}
            confirmed ·

            <strong
              style={{
                color:
                  "#111111",
              }}
            >

              {" "}
              $400K

            </strong>

            {" "}
            of

            <strong
              style={{
                color:
                  "#111111",
              }}
            >

              {" "}
              $1.8M

            </strong>

            {" "}
            target

          </div>

          <div
            style={{
              fontWeight:
                800,
              color:
                "#06b6d4",
            }}
          >

            22%

          </div>

        </div>

        {/* PROGRESS */}

        <div
          style={{
            height:
              "8px",
            overflow:
              "hidden",
            borderRadius:
              "999px",
            background:
              "rgba(15,23,42,0.08)",
          }}
        >

          <div
            style={{
              width:
                "22%",
              height:
                "100%",
              borderRadius:
                "999px",
              background:
                "linear-gradient(90deg,#22d3ee,#a3e635,#fb7185)",
            }}
          />

        </div>

      </div>

      {/* ======================================================
          TABLE
      ====================================================== */}

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
            (
              sponsor: ISponsorItem
            ) => (

              <tr key={sponsor.id}>

                {/* SPONSOR */}

                <td>

                  <div className="pix-sponsor">

                    <div className="pix-sponsor__avatar">

                      {sponsor.short}

                    </div>

                    <div>

                      <div className="pix-sponsor__name">

                        {sponsor.name}

                      </div>

                      <div className="pix-sponsor__owner">

                        {sponsor.owner}

                      </div>

                    </div>

                  </div>

                </td>

                {/* TIER */}

                <td>

                  <div className="pix-sponsor-tier">

                    {sponsor.tier}

                  </div>

                </td>

                {/* OWNER */}

                <td>

                  <div className="pix-action-region">

                    {sponsor.owner}

                  </div>

                </td>

                {/* VALUE */}

                <td>

                  <div className="pix-sponsor-value">

                    {sponsor.value}

                  </div>

                </td>

                {/* STATUS */}

                <td>

                  <div
                    className={`
                      pix-sponsor-status
                      pix-sponsor-status--${sponsor.status}
                    `}
                  >

                    {sponsor.status}

                  </div>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </section>
  );
};

export default SponsorsPanel;