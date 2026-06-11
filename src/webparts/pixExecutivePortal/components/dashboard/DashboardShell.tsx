import * as React from "react";

import ExecutiveStats from "../stats/ExecutiveStats";
import TeamDirectory from "../team/TeamDirectory";
import ActionsTable from "../actions/ActionsTable";
import AgendaPanel from "../agenda/AgendaPanel";
import SponsorsPanel from "../sponsors/SponsorsPanel";
import DocumentsPanel from "../documents/DocumentsPanel";

const DashboardShell = (): JSX.Element => {

  return (

  <section className="pix-dashboard-shell">

    <div className="pix-dashboard-shell__content space-y-8">

      {/* ======================================================
          EXECUTIVE STATS
      ====================================================== */}

      <section className="pix-section">

        <ExecutiveStats />

      </section>

      {/* ======================================================
          TEAM DIRECTORY
      ====================================================== */}

      <section className="pix-section">

        <TeamDirectory />

      </section>

      {/* ======================================================
          ACTIONS + KEYDATES
      ====================================================== */}

      <section className="pix-section">

        <ActionsTable />

      </section>

      {/* ======================================================
          AGENDA
      ====================================================== */}

      <section className="pix-section">

        <AgendaPanel />

      </section>

      {/* ======================================================
          DOCUMENTS + SPONSORS
      ====================================================== */}

      <section className="grid grid-cols-12 gap-6 items-start">

        <div className="col-span-12 xl:col-span-6">

          <DocumentsPanel />

        </div>

        <div className="col-span-12 xl:col-span-6">

          <SponsorsPanel />

        </div>

      </section>

    </div>

  </section>

);
};

export default DashboardShell;