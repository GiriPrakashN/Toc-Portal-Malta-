import * as React from "react";

import {
  X,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

import {
  IAgendaItem,
} from "../../data/agenda";

/* =========================================================
   PROPS
========================================================= */

interface IAgendaModalProps {

  isOpen: boolean;

  agendaItems: IAgendaItem[];

  onClose: () => void;
}

/* =========================================================
   COMPONENT
========================================================= */

const AgendaModal = ({
  isOpen,
  agendaItems,
  onClose,
}: IAgendaModalProps): JSX.Element | null => {

  /* ======================================================
     FILTERED AGENDA
  ====================================================== */

  const filteredAgenda =
    React.useMemo(() => {

      return agendaItems;

    }, [agendaItems]);

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

              Executive Agenda Workspace

            </h2>

            <p className="pix-modal__subtitle">

              Full operational event schedule

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

          <div className="pix-library-workspace">

            {/* =========================================
                LEFT
            ========================================== */}

            <div className="pix-library-workspace__left">

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  TOTAL SESSIONS

                </div>

                <div className="pix-library-stat__value">

                  {agendaItems.length}

                </div>

              </div>

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  LIVE TRACKING

                </div>

                <div className="pix-library-stat__value">

                  ACTIVE

                </div>

              </div>

              <div className="pix-library-stat">

                <div className="pix-library-stat__label">

                  EXECUTIVE MODE

                </div>

                <div className="pix-library-stat__value">

                  ENABLED

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            CONTENT
        =================================================== */}

        <div className="pix-modal__table-wrapper">

          {
            filteredAgenda.map(
              (
                item: IAgendaItem,
                index: number
              ) => (

                <div
                  key={index}
                  className="pix-agenda-row"
                >

                  {/* ====================================
                      TIME
                  ===================================== */}

                  <div className="pix-agenda-time">

                    {item.time}

                  </div>

                  {/* ====================================
                      CONTENT
                  ===================================== */}

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

                  {/* ====================================
                      LOCATION
                  ===================================== */}

                  <div className="pix-agenda-location">

                    <div className="pix-agenda-location__label">

                      LOCATION

                    </div>

                    <div className="pix-agenda-location__value">

                      {item.location}

                    </div>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

    </div>
  );
};

export default AgendaModal;