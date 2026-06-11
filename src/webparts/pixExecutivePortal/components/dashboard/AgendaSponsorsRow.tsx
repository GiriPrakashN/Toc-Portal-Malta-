import * as React from "react";
import DocumentsPanel from "../documents/DocumentsPanel";
import SponsorsPanel from "../sponsors/SponsorsPanel";

const AgendaSponsorsRow = () => {
  return (
    <section className="grid grid-cols-[64%_36%] gap-4 items-start">

      <DocumentsPanel />

      <SponsorsPanel />

    </section>
  );
};

export default AgendaSponsorsRow;