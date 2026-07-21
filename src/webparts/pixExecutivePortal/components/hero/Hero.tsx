import * as React from "react";
import { useEffect, useState } from "react";

import { heroConfig } from "../../config/heroConfig";
import { EventSettingsService } from "../../services/eventSettings.service";
import { IEventSettings } from "../../models/IEventSettings";

interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

/* =========================================================
   MERGE HELPER
   Falls back to the static config for any field that is
   blank / missing on the SharePoint list item, so the
   banner never renders empty text if the list isn't
   fully filled in yet.
========================================================= */

const mergeSettings = (
  settings: IEventSettings | null
) => {

  if (!settings) {
    return heroConfig;
  }

  return {
    eventName:
      settings.EventName || heroConfig.eventName,
    eventSubTitle:
      settings.EventSubTitle || heroConfig.eventSubTitle,
    eventLocation:
      settings.EventLocation || heroConfig.eventLocation,
    eventDate:
      settings.Title || heroConfig.eventDate,
    eventDateISO:
      settings.EventDate || heroConfig.eventDateISO,
    heroTitleLine1:
      settings.HeroTitleLine1 || heroConfig.heroTitleLine1,
    heroTitleLine2:
      settings.HeroTitleLine2 || heroConfig.heroTitleLine2,
    invitationLabel:
      settings.InvitationLabel || heroConfig.invitationLabel,
    eventDuration:
      settings.EventDuration || heroConfig.eventDuration,
    description:
      settings.Description || heroConfig.description,
    verticalLabel:
      heroConfig.verticalLabel,
    logoLetter:
      heroConfig.logoLetter
  };
};

const Hero = (): JSX.Element => {

  const [config, setConfig] = useState(heroConfig);

  const [timeLeft, setTimeLeft] =
    useState<ICountdown>({
      days: "0",
      hours: "00",
      minutes: "00",
      seconds: "00"
    });

  /* ======================================================
     LOAD EVENT SETTINGS FROM SHAREPOINT
  ====================================================== */

  useEffect(() => {

    const loadSettings = async () => {

      const settings =
        await EventSettingsService.getSettings();

      setConfig(mergeSettings(settings));
    };

    void loadSettings();

  }, []);

  /* ======================================================
     COUNTDOWN
  ====================================================== */

  useEffect(() => {

    const targetDate =
      new Date(config.eventDateISO).getTime();

    const tick = () => {

      const now = new Date().getTime();

      const difference =
        Math.max(targetDate - now, 0);

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
      );

      setTimeLeft({
        /* No leading-zero padding on days: 1, 12, or
           123 days should all display in full without
           being clipped by a fixed-width box. */
        days: String(days),
        hours: ("0" + hours).slice(-2),
        minutes: ("0" + minutes).slice(-2),
        seconds: ("0" + seconds).slice(-2)
      });
    };

    tick();

    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);

  }, [config.eventDateISO]);

  /* ======================================================
     META DATE (short form for the pill/meta strip)
  ====================================================== */

  const metaDate = (() => {

    const parsed = new Date(config.eventDateISO);

    if (isNaN(parsed.getTime())) {
      return config.eventDate;
    }

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    ).format(parsed).toUpperCase();

  })();

  const countdownItems = [
    {
      label: "DAYS",
      value: timeLeft.days
    },
    {
      label: "HOURS",
      value: timeLeft.hours
    },
    {
      label: "MINUTES",
      value: timeLeft.minutes
    },
    {
      label: "SECONDS",
      value: timeLeft.seconds
    }
  ];

  return (

    <section className="pix-hero">

      {/* =========================================
          TOP BAR
      ========================================= */}

      <div className="pix-hero__topbar">

        <div className="pix-hero__identity">

          <div className="pix-hero__logo">

            {config.logoLetter}

          </div>

          <div>

            <div className="pix-hero__identity-title">

              {config.eventName}

            </div>

            <div className="pix-hero__identity-subtitle">

              {config.eventSubTitle}

            </div>

          </div>

        </div>

        <div className="pix-hero__event-pill">

          {config.eventDate},
          {" "}
          {config.eventLocation}

        </div>

      </div>

      {/* =========================================
          TITLE
      ========================================= */}

      <div className="pix-hero__title-wrapper">

        <h1 className="pix-hero__title">

          <span className="pix-hero__gradient">

            {config.heroTitleLine1}

          </span>

          <br />

          <span className="pix-hero__gradient">

            {config.heroTitleLine2}

          </span>

        </h1>

      </div>

      {/* =========================================
          META STRIP
      ========================================= */}

      <div className="pix-hero__meta">

        <div className="pix-hero__meta-inner">

          <div className="pix-hero__meta-item">

            {config.eventLocation}

          </div>

          <div className="pix-hero__meta-item">

            {config.eventDuration}

          </div>

          <div className="pix-hero__meta-item">

            {metaDate}

          </div>

          <div className="pix-hero__meta-item">

            {config.invitationLabel}

          </div>

        </div>

      </div>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <p className="pix-hero__description">

        {config.description}

      </p>

      {/* =========================================
          DIVIDER
      ========================================= */}

      <div className="pix-hero__divider" />

      {/* =========================================
          COUNTDOWN
      ========================================= */}

      <div className="pix-hero__countdown-wrapper">

        {/* VERTICAL LABEL */}

        <div className="pix-hero__vertical-label">

          {config.verticalLabel}

        </div>

        {/* COUNTDOWN */}

        <div className="pix-hero__countdown">

          {countdownItems.map((item) => (

            <div
              key={item.label}
              className="pix-hero__countdown-card"
            >

              <div className="pix-hero__countdown-value">

                {item.value}

              </div>

              <div className="pix-hero__countdown-label">

                {item.label}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
};

export default Hero;
