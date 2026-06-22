import * as React from "react";

import {
  useEffect,
  useState,
} from "react";

import {
  CalendarRange,
} from "lucide-react";

/* =========================================================
   SERVICES
========================================================= */

import AgendaService
from "../../services/AgendaService";

/* =========================================================
   MODELS
========================================================= */

import {
  IAgendaItem,
} from "../../services/agenda.service";

/* =========================================================
   MODAL
========================================================= */

import AgendaModal
from "./AgendaModal";

/* =========================================================
   COMPONENT
========================================================= */

const AgendaPanel = (): JSX.Element => {

  /* ======================================================
     STATE
  ====================================================== */

  const [agendaItems, setAgendaItems] =
    useState<IAgendaItem[]>([]);

  const [showAgendaModal, setShowAgendaModal] =
    useState(false);

  /* ======================================================
     LOAD AGENDA
  ====================================================== */

  useEffect(() => {

    const loadAgenda =
      async (): Promise<void> => {

        const response =
          await AgendaService.getAgenda();

        setAgendaItems(response);
      };

    loadAgenda();

  }, []);

  /* ======================================================
     RENDER
  ====================================================== */

  return (

    <>

      <section className="pix-agenda-panel">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="pix-ops-panel__header">

          <div className="pix-ops-panel__title-group">

            <CalendarRange
              size={16}
              color="#06b6d4"
            />

            <h2 className="pix-ops-panel__title">

              Agenda

            </h2>

            <div className="pix-open-badge">

              Live Schedule

            </div>

          </div>

          <button
            className="pix-panel-cta"
            onClick={() =>
              setShowAgendaModal(true)
            }
          >

            Open agenda →

          </button>

        </div>

        {/* ======================================================
            ROWS
        ====================================================== */}

        <div className="pix-agenda-rows">

          {agendaItems.map(
            (
              item: IAgendaItem,
              index: number
            ) => (

              <div
                key={index}
                className="pix-agenda-row"
              >

                {/* TIME */}

                <div className="pix-agenda-time">

                  {item.time}

                </div>

                {/* CONTENT */}

                <div className="pix-agenda-content">

                  <div className="pix-agenda-title-row">

                    <div
                      className={`
                        pix-agenda-status
                        pix-agenda-status--${item.status}
                      `}
                    />

                    <div className="pix-agenda-title">

                      {item.title}

                    </div>

                    <div
                      className={`
                        pix-agenda-badge
                        pix-agenda-badge--${item.type}
                      `}
                    >

                      {item.type}

                    </div>

                  </div>

                  <div className="pix-agenda-description">

                    {item.description}

                  </div>

                </div>

                {/* LOCATION */}

                <div className="pix-agenda-location">

                  <div className="pix-agenda-location__label">

                    Location

                  </div>

                  <div className="pix-agenda-location__value">

                    {item.location}

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* ======================================================
          MODAL
      ====================================================== */}

      <AgendaModal
        isOpen={showAgendaModal}
        agendaItems={agendaItems}
        onClose={() =>
          setShowAgendaModal(false)
        }
      />

    </>
  );
};

export default AgendaPanel;