import * as React from "react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CheckSquare,
  CalendarDays,
} from "lucide-react";

/* =========================================================
   SERVICES
========================================================= */

import {
  ActionsService,
} from "../../services/actions.service";

/* =========================================================
   MODELS
========================================================= */

import {
  IExecutiveAction,
} from "../../models/IExecutiveAction";

/* =========================================================
   STATIC DATA
========================================================= */

import {
  keyDates,
} from "../../data/keydates";


import ActionsModal from "./ActionsModal";

/* =========================================================
   PANEL CONFIGURATION
========================================================= */

const ACTIONS_PANEL_HEIGHT = 720;

const PANEL_HEADER_HEIGHT = 92;

const FILTER_SECTION_HEIGHT = 76;

const TABLE_HEADER_HEIGHT = 64;

const ROW_HEIGHT = 62;

/* =========================================================
   COMPONENT
========================================================= */

const ActionsTable = (): JSX.Element => {

  /* ======================================================
     STATE
  ====================================================== */

  const [actions, setActions] =
    useState<IExecutiveAction[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [activeFilter, setActiveFilter] =
    useState<string>("All");

  const [showFullList, setShowFullList] =
    useState<boolean>(false);

  const [visibleRowCount, setVisibleRowCount] =
    useState<number>(0);

  const tableWrapperRef =
    useRef<HTMLDivElement>(null);

  /* ======================================================
     LOAD ACTIONS FROM SHAREPOINT
  ====================================================== */

  const loadActions = async (): Promise<void> => {

    try {

      setLoading(true);

      const response =
        await ActionsService.getActions();

      setActions(response);

    } catch (error) {

      console.error(
        "[ActionsTable] Failed to load actions",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  /* ======================================================
     INITIAL LOAD
  ====================================================== */

  useEffect(() => {

    loadActions();

  }, []);

  /* ======================================================
     NORMALIZE REGION
  ====================================================== */

  const normalizeRegion = (
    value?: string
  ): string => {

    return value?.trim().toLowerCase() || "";
  };

  /* ======================================================
     DYNAMIC REGION FILTERS
  ====================================================== */

  const regionFilters =
    useMemo(() => {

      const regions =
        actions
          .map((item) => item.Region)
          .filter(Boolean);

      const uniqueRegions =
        Array.from(new Set(regions));

      return [
        "All",
        ...uniqueRegions,
      ];

    }, [actions]);

  /* ======================================================
     FILTERED ACTIONS
  ====================================================== */

  const filteredActions =
    useMemo(() => {

      if (activeFilter === "All") {

        return actions;
      }

      return actions.filter(
        (item) =>
          normalizeRegion(item.Region) ===
          normalizeRegion(activeFilter)
      );

    }, [actions, activeFilter]);

  /* ======================================================
     VISIBLE ROW CALCULATION
  ====================================================== */

  useEffect(() => {

    const availableHeight =
      ACTIONS_PANEL_HEIGHT -
      PANEL_HEADER_HEIGHT -
      FILTER_SECTION_HEIGHT -
      TABLE_HEADER_HEIGHT;

    const calculatedVisibleRows =
      Math.floor(
        availableHeight / ROW_HEIGHT
      );

    setVisibleRowCount(
      calculatedVisibleRows
    );

  }, []);

  /* ======================================================
     VISIBLE ACTIONS
  ====================================================== */

  const visibleActions =
    useMemo(() => {

      return filteredActions.slice(
        0,
        visibleRowCount
      );

    }, [
      filteredActions,
      visibleRowCount,
    ]);

  /* ======================================================
     FORMAT DATE
  ====================================================== */

  const formatDate = (
    date: string
  ): string => {

    return new Date(date)
      .toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
        }
      );
  };

  /* ======================================================
     OWNER COLOR MAPPING
  ====================================================== */

  const getOwnerColor = (
    color: string
  ): string => {

    switch (color) {

      case "Cyan":
        return "pix-owner__avatar--cyan";

      case "Lime":
        return "pix-owner__avatar--lime";

      case "Yellow":
        return "pix-owner__avatar--yellow";

      case "Red":
        return "pix-owner__avatar--red";

      case "Purple":
        return "pix-owner__avatar--purple";

      case "Black":
        return "pix-owner__avatar--black";

      default:
        return "pix-owner__avatar--cyan";
    }
  };

  /* ======================================================
     LOADING STATE
  ====================================================== */

  if (loading) {

    return (

      <section className="pix-actions-layout">

        <div
          className="
            pix-ops-panel
            pix-actions-panel
          "
        >

          <div
            style={{
              padding: "40px",
            }}
          >

            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#666666",
              }}
            >

              Loading executive actions...

            </p>

          </div>

        </div>

      </section>
    );
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (

    <>

      <section className="pix-actions-layout">

        {/* ====================================================
            ACTIONS PANEL
        ===================================================== */}

        <div
          className="
            pix-ops-panel
            pix-actions-panel
          "
        >

          {/* ==================================================
              HEADER
          =================================================== */}

          <div className="pix-ops-panel__header">

            <div className="pix-ops-panel__title-group">

              <CheckSquare
                size={16}
                color="#22c55e"
              />

              <h2 className="pix-ops-panel__title">

                Actions Tracker

              </h2>

              <div className="pix-open-badge">

                {filteredActions.length} Open

              </div>

            </div>

            <button
              className="pix-panel-cta"
              onClick={() => {

                setShowFullList(true);

                console.log(
                  "[ActionsTable] Open Full List clicked"
                );
              }}
            >

              Open full list →

            </button>

          </div>

          {/* ==================================================
              FILTERS
          =================================================== */}

          <div className="pix-actions-filters">

            {regionFilters.map((filter) => (

              <button
                key={filter}
                className={`
                  pix-filter-button
                  ${
                    activeFilter === filter
                      ? "pix-filter-button--active"
                      : ""
                  }
                `}
                onClick={() =>
                  setActiveFilter(filter)
                }
              >

                {filter}

              </button>

            ))}

          </div>

          {/* ==================================================
              TABLE CONTAINER
          =================================================== */}

          <div
            ref={tableWrapperRef}
            className="pix-actions-table-wrapper"
          >

            <table className="pix-actions-table">

              <thead>

                <tr>

                  <th>Task</th>

                  <th>Owner</th>

                  <th>Region</th>

                  <th>Due</th>

                  <th>Priority</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {visibleActions.map(
                  (
                    item: IExecutiveAction
                  ) => (

                    <tr key={item.Id}>

                      {/* TASK */}

                      <td>

                        <div className="pix-action-task">

                          {item.Title}

                        </div>

                      </td>

                      {/* OWNER */}

                      <td>

                        <div className="pix-owner">

                          <div
                            className={`
                              pix-owner__avatar
                              ${getOwnerColor(item.OwnerColor)}
                            `}
                          >

                            {item.OwnerInitials}

                          </div>

                          <div className="pix-owner__name">

                            {item.OwnerName}

                          </div>

                        </div>

                      </td>

                      {/* REGION */}

                      <td>

                        <div className="pix-action-region">

                          {item.Region}

                        </div>

                      </td>

                      {/* DUE DATE */}

                      <td>

                        <div className="pix-action-due">

                          {formatDate(item.DueDate)}

                        </div>

                      </td>

                      {/* PRIORITY */}

                      <td>

                        <div
                          className={`
                            pix-chip
                            pix-chip--${item.Priority.toLowerCase()}
                          `}
                        >

                          {item.Priority}

                        </div>

                      </td>

                      {/* STATUS */}

                      <td>

                        <div
                          className={`
                            pix-chip
                            pix-chip--${item.Status.toLowerCase()
                              .replace(/\s/g, "-")}
                          `}
                        >

                          {item.Status}

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* ====================================================
            KEY DATES PANEL
        ===================================================== */}

        <div
          className="
            pix-ops-panel
            pix-keydates
            pix-keydates-panel
          "
        >

          {/* ==================================================
              HEADER
          =================================================== */}

          <div className="pix-ops-panel__title-group">

            <CalendarDays
              size={16}
              color="#8b5cf6"
            />

            <h2 className="pix-ops-panel__title">

              Key Dates

            </h2>

          </div>

          {/* ==================================================
              TIMELINE
          =================================================== */}

          <div className="pix-timeline">

            {keyDates.map((item, index) => (

              <div
                key={index}
                className="pix-timeline__item"
              >

                <div
                  className="pix-timeline__dot"
                  style={{
                    background:
                      item.color,
                  }}
                />

                <div className="pix-timeline__date">

                  {item.date}

                </div>

                <div className="pix-timeline__title">

                  {item.title}

                </div>

                <div className="pix-timeline__note">

                  {item.note}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================
          FULL LIST PLACEHOLDER WINDOW
      ===================================================== */}

      <ActionsModal
  isOpen={showFullList}
  actions={actions}
  onClose={() =>
    setShowFullList(false)
  }
/>

    </>
  );
};

export default ActionsTable;