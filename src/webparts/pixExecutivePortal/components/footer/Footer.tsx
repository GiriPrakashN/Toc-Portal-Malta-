import * as React from "react";

const Footer = (): JSX.Element => {

  return (

    <footer className="pix-footer">

      {/* ======================================================
          TOP GRADIENT
      ====================================================== */}

      <div className="pix-footer__gradient" />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="pix-footer__content">

        {/* ======================================================
            TITLE
        ====================================================== */}

        <div className="pix-footer__title">

          Ports Innovation Exchange · Breaking The Mould ·
          8 Oct 2026 · Malta

        </div>

        {/* ======================================================
            DESCRIPTION
        ====================================================== */}

        <div className="pix-footer__description">

          Data sourced from SharePoint operational lists:
          Actions,
          Key Dates,
          Agenda,
          Sponsors,
          Team Directory,
          and PIX 2026 Documents Library.

        </div>

        {/* ======================================================
            BOTTOM
        ====================================================== */}

        <div className="pix-footer__bottom">

          {/* LEFT */}

          <div className="pix-footer__refresh">

            Last refreshed:
            {" "}
            9:22:52 AM

          </div>

          {/* RIGHT */}

          <div className="pix-footer__governance">

            <div className="pix-footer__pill">

              SharePoint Online

            </div>

            <div className="pix-footer__pill">

              Live Operational Data

            </div>

            <button className="pix-footer__link">

              Open site root →

            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;