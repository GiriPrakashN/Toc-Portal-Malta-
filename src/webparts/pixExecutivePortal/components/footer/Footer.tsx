import * as React from "react";
import { useEffect, useState } from "react";

import { heroConfig } from "../../config/heroConfig";
import { EventSettingsService } from "../../services/eventSettings.service";

const Footer = (): JSX.Element => {

  const [eventDateISO, setEventDateISO] =
    useState(heroConfig.eventDateISO);

  const [lastRefreshed, setLastRefreshed] =
    useState(new Date());

  /* ======================================================
     LOAD EVENT DATE (kept in sync with the hero banner)
  ====================================================== */

  useEffect(() => {

    const loadSettings = async (): Promise<void> => {

      const settings =
        await EventSettingsService.getSettings();

      if (settings && settings.EventDate) {
        setEventDateISO(settings.EventDate);
      }
    };

    void loadSettings();

  }, []);

  /* ======================================================
     LIVE "LAST REFRESHED" CLOCK
  ====================================================== */

  useEffect(() => {

    const timer = setInterval(() => {

      setLastRefreshed(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const formattedEventDate = (() => {

    const parsed = new Date(eventDateISO);

    if (isNaN(parsed.getTime())) {
      return heroConfig.eventDate;
    }

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    ).format(parsed);

  })();

  const formattedRefreshTime =
    new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }
    ).format(lastRefreshed);

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
          {" "}
          {formattedEventDate} · Malta

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
            {formattedRefreshTime}

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
