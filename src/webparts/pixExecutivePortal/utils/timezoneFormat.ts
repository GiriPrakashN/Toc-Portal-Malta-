/* =========================================================
   TIMEZONE-SAFE FORMATTING HELPERS

   SharePoint list values are free text, so a region's
   "Timezone" column can easily end up with a typo, stray
   leading/trailing space, or an unsupported IANA name
   (e.g. " America/Panama" copy-pasted with a leading
   space). Intl.DateTimeFormat throws a RangeError for any
   invalid timeZone, and because that call used to happen
   directly inside render, the error escaped React and blanked
   the entire web part instead of just the one bad card.

   These helpers:
   1. Trim the incoming value defensively.
   2. Cache which timezone strings are valid so we don't
      pay the cost of a failing Intl.DateTimeFormat
      constructor call on every render/tick.
   3. Fall back to the browser's local time zone and a
      console.warn (once per bad value) instead of throwing,
      so one bad list item can never take down the page.
========================================================= */

const validTimezoneCache = new Map<string, boolean>();

const warnedTimezones = new Set<string>();

const isValidTimezone = (
  timezone: string
): boolean => {

  const cached = validTimezoneCache.get(timezone);

  if (cached !== undefined) {
    return cached;
  }

  let isValid = false;

  try {

    // Throws a RangeError if the IANA name isn't supported.
    new Intl.DateTimeFormat(
      undefined,
      { timeZone: timezone }
    );

    isValid = true;

  } catch (error) {

    // Intentionally ignored: a thrown error here just
    // means the timezone string isn't valid, which is
    // exactly what isValid = false already communicates.
    isValid = false;
  }

  validTimezoneCache.set(timezone, isValid);

  return isValid;
};

const resolveTimezone = (
  timezone: string
): string | undefined => {

  const trimmed = (timezone || "").trim();

  if (trimmed.length > 0 && isValidTimezone(trimmed)) {
    return trimmed;
  }

  if (!warnedTimezones.has(timezone)) {

    warnedTimezones.add(timezone);

    console.warn(
      "[TeamDirectory] Invalid or missing timezone " +
      "in the TeamRegions list - falling back to " +
      "local time. Check the 'Timezone' column for:",
      JSON.stringify(timezone)
    );
  }

  // undefined -> Intl.DateTimeFormat uses the
  // browser/runtime's local time zone as a safe fallback.
  return undefined;
};

export const formatTimeSafe = (
  timezone: string,
  now: Date
): string => {

  try {

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        timeZone: resolveTimezone(timezone),
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
    ).format(now);

  } catch (error) {

    console.error(
      "[TeamDirectory] Time formatting failed",
      error
    );

    return "--:--:--";
  }
};

export const formatDateSafe = (
  timezone: string,
  now: Date
): string => {

  try {

    return new Intl.DateTimeFormat(
      "en-GB",
      {
        timeZone: resolveTimezone(timezone),
        weekday: "short",
        day: "2-digit",
        month: "short",
      }
    ).format(now);

  } catch (error) {

    console.error(
      "[TeamDirectory] Date formatting failed",
      error
    );

    return "--";
  }
};
