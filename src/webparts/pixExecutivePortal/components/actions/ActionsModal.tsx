import * as React from "react";

import {
  useMemo,
  useState,
} from "react";

import {
  Search,
  X,
} from "lucide-react";

/* =========================================================
   MODELS
========================================================= */

import {
  IExecutiveAction,
} from "../../models/IExecutiveAction";

/* =========================================================
   PROPS
========================================================= */

interface IActionsModalProps {

  isOpen: boolean;

  actions: IExecutiveAction[];

  onClose: () => void;
}

/* =========================================================
   COMPONENT
========================================================= */

const ActionsModal = ({
  isOpen,
  actions,
  onClose,
}: IActionsModalProps): JSX.Element | null => {

  /* ======================================================
     STATE
  ====================================================== */

  const [searchText, setSearchText] =
    useState<string>("");

  const [activeRegion, setActiveRegion] =
    useState<string>("All");

  /* ======================================================
     NORMALIZE
  ====================================================== */

  const normalize = (
    value?: string
  ): string => {

    return value?.trim().toLowerCase() || "";
  };

  /* ======================================================
     DYNAMIC REGIONS
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

      return actions.filter((item) => {

        const matchesRegion =
          activeRegion === "All"
            ? true
            : normalize(item.Region) ===
              normalize(activeRegion);

        const matchesSearch =
          searchText.length === 0
            ? true
            : (
                item.Title +
                item.OwnerName +
                item.Region +
                item.Status +
                item.Priority
              )
                .toLowerCase()
                .includes(
                  searchText.toLowerCase()
                );

        return (
          matchesRegion &&
          matchesSearch
        );
      });

    }, [
      actions,
      activeRegion,
      searchText,
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
          year: "numeric",
        }
      );
  };

  /* ======================================================
     OWNER COLORS
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

              Executive Actions Workspace

            </h2>

            <p className="pix-modal__subtitle">

              Full operational actions management

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

          {/* SEARCH */}

          <div className="pix-modal-search">

            <Search size={16} className="pix-modal-search__icon" />

            <input
              type="text"
              placeholder="Search actions, owners, regions..."
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
            />

          </div>

          {/* FILTERS */}

          <div className="pix-modal-filters">

            {regionFilters.map(
              (region) => (

                <button
                  key={region}
                  className={`
                    pix-filter-button
                    ${
                      activeRegion ===
                      region
                        ? "pix-filter-button--active"
                        : ""
                    }
                  `}
                  onClick={() =>
                    setActiveRegion(region)
                  }
                >

                  {region}

                </button>

              )
            )}

          </div>

        </div>

        {/* ==================================================
            TABLE
        =================================================== */}

        <div className="pix-modal__table-wrapper">

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

              {filteredActions.map(
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

                    {/* DUE */}

                    <td>

                      <div className="pix-action-due">

                        {formatDate(
                          item.DueDate
                        )}

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

    </div>
  );
};

export default ActionsModal;