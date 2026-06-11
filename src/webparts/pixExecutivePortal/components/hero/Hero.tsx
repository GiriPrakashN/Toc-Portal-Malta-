import * as React from "react";
import { useEffect, useState } from "react";

import { heroConfig } from "../../config/heroConfig";

interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const Hero = (): JSX.Element => {

  const targetDate =
    new Date(heroConfig.eventDateISO).getTime();

  const [timeLeft, setTimeLeft] =
    useState<ICountdown>({
      days: "000",
      hours: "00",
      minutes: "00",
      seconds: "00"
    });

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date().getTime();

      const difference =
        targetDate - now;

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
        days: ("00" + days).slice(-3),
        hours: ("0" + hours).slice(-2),
        minutes: ("0" + minutes).slice(-2),
        seconds: ("0" + seconds).slice(-2)
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [targetDate]);

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

            {heroConfig.logoLetter}

          </div>

          <div>

            <div className="pix-hero__identity-title">

              {heroConfig.eventName}

            </div>

            <div className="pix-hero__identity-subtitle">

              {heroConfig.eventSubTitle}

            </div>

          </div>

        </div>

        <div className="pix-hero__event-pill">

          {heroConfig.eventDate},
          {" "}
          {heroConfig.eventLocation}

        </div>

      </div>

      {/* =========================================
          TITLE
      ========================================= */}

      <div className="pix-hero__title-wrapper">

        <h1 className="pix-hero__title">

          <span className="pix-hero__gradient">

            {heroConfig.heroTitleLine1}

          </span>

          <br />

          <span className="pix-hero__gradient">

            {heroConfig.heroTitleLine2}

          </span>

        </h1>

      </div>

      {/* =========================================
          META STRIP
      ========================================= */}

      <div className="pix-hero__meta">

        <div className="pix-hero__meta-inner">

          <div className="pix-hero__meta-item">

            {heroConfig.eventLocation}

          </div>

          <div className="pix-hero__meta-item">

            {heroConfig.eventDuration}

          </div>

          <div className="pix-hero__meta-item">

            8 OCT 2026

          </div>

          <div className="pix-hero__meta-item">

            {heroConfig.invitationLabel}

          </div>

        </div>

      </div>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <p className="pix-hero__description">

        {heroConfig.description}

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

          {heroConfig.verticalLabel}

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