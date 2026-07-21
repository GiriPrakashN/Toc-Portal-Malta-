import * as React from "react";

import ExecutiveStats from "../stats/ExecutiveStats";
import TeamDirectory from "../team/TeamDirectory";
import ActionsTable from "../actions/ActionsTable";
import AgendaPanel from "../agenda/AgendaPanel";
import SponsorsPanel from "../sponsors/SponsorsPanel";
import DocumentsPanel from "../documents/DocumentsPanel";
import ErrorBoundary from "../common/ErrorBoundary";

const DashboardShell = (): JSX.Element => {

  return (

  <section className="pix-dashboard-shell">

    <div className="pix-dashboard-shell__content space-y-8">

      {/* ======================================================
          EXECUTIVE STATS
      ====================================================== */}

      <section className="pix-section">

        <ErrorBoundary label="Executive Stats">

          <ExecutiveStats />

        </ErrorBoundary>

      </section>

      {/* ======================================================
          TEAM DIRECTORY
      ====================================================== */}

      <section className="pix-section">

        <ErrorBoundary label="Team Directory">

          <TeamDirectory />

        </ErrorBoundary>

      </section>

      {/* ======================================================
          ACTIONS + KEYDATES
      ====================================================== */}

      <section className="pix-section">

        <ErrorBoundary label="Actions">

          <ActionsTable />

        </ErrorBoundary>

      </section>

      {/* ======================================================
          AGENDA
      ====================================================== */}

      <section className="pix-section">

        <ErrorBoundary label="Agenda">

          <AgendaPanel />

        </ErrorBoundary>

      </section>

      {/* ======================================================
          DOCUMENTS + SPONSORS
      ====================================================== */}

      <section className="grid grid-cols-12 gap-6 items-start">

        <div className="col-span-12 xl:col-span-6">

          <ErrorBoundary label="Documents">

            <DocumentsPanel />

          </ErrorBoundary>

        </div>

        <div className="col-span-12 xl:col-span-6">

          <ErrorBoundary label="Sponsors">

            <SponsorsPanel />

          </ErrorBoundary>

        </div>

      </section>

    </div>

  </section>

);
};

export default DashboardShell;
