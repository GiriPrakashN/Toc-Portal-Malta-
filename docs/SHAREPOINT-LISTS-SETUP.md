# SharePoint List Setup Guide

This project now reads three pieces of content from SharePoint lists instead of
hardcoded values:

1. **EventSettings** — powers the hero banner (date, location, countdown, titles)
2. **TeamRegions** — the six regional office cards
3. **TeamMembers** — the people shown inside each region card / the "View all" modal

All three follow the exact same pattern already used by the `Sponsors`,
`SponsorsSettings`, and `KeyDates` lists in this solution (see
`src/webparts/pixExecutivePortal/services/`). If any list is missing, empty, or
the request fails, the web part automatically falls back to safe default values
— so the site never breaks or shows blank data while you're setting the lists up.

Create these lists on **the same SharePoint site** the web part is deployed to.

---

## 1. EventSettings list

**Site Contents → New → List → Blank list**
Name: `EventSettings`

| Column (internal name must match) | Type            | Notes |
|---|---|---|
| `Title`            | Single line of text | Short display date shown in the top pill, e.g. `25TH FEBRUARY 2026` |
| `EventName`        | Single line of text | e.g. `PORTS INNOVATION` |
| `EventSubTitle`    | Single line of text | e.g. `EXCHANGE · TEAM HUB` |
| `EventLocation`    | Single line of text | e.g. `MALTA` |
| `EventDate`        | **Date and Time** (include time) | The real countdown target, e.g. `25/02/2026 09:00`. This is what drives the countdown timer. |
| `HeroTitleLine1`   | Single line of text | e.g. `BREAKING` |
| `HeroTitleLine2`   | Single line of text | e.g. `THE MOULD` |
| `InvitationLabel`  | Single line of text | e.g. `BY INVITATION ONLY` |
| `EventDuration`    | Single line of text | e.g. `ONE DAY` |
| `Description`      | Multiple lines of text (plain text, not enhanced rich text) | The paragraph under the headline |
| `IsActive`         | Yes/No (checkbox) | Only the row with `IsActive = Yes` is used. Keep just **one** active row at a time. |

**Add one item** with:
- Title: `25TH FEBRUARY 2026`
- EventDate: `25/02/2026 09:00`
- EventLocation: `MALTA`
- IsActive: `Yes`
- (fill in the rest as shown above)

That's it — the banner and the countdown will read live from this row. To change
the date next year, just edit this one item; no code changes needed.

---

## 2. TeamRegions list

**Site Contents → New → List → Blank list**
Name: `TeamRegions`

| Column | Type | Notes |
|---|---|---|
| `Title`         | Single line of text | Full country name, used to match members — e.g. `United Kingdom`. **Must exactly match** the `Region` value you enter on each TeamMembers item. |
| `Code`          | Single line of text | 2-letter code shown on the card, e.g. `GB` |
| `City`          | Single line of text | e.g. `LONDON` (cards are sorted alphabetically by this field) |
| `Country`       | Single line of text | e.g. `United Kingdom` |
| `Timezone`      | Single line of text | IANA timezone, e.g. `Europe/London` (used for the live clock) |
| `Accent`        | Choice: `cyan`, `lime`, `amber`, `red` | Card accent color |
| `DisplayOrder`  | Number | Admin ordering (the UI itself sorts alphabetically by City, but keep this for your own reference/other views) |
| `IsActive`      | Yes/No | Only active rows appear |

**Add six items:**

| Title | Code | City | Country | Timezone | Accent | DisplayOrder |
|---|---|---|---|---|---|---|
| United Kingdom | GB | LONDON | United Kingdom | Europe/London | cyan | 1 |
| United Arab Emirates | AE | ABU DHABI | United Arab Emirates | Asia/Dubai | amber | 2 |
| Panamá | PA | PANAMÁ | Panamá | America/Panama | lime | 3 |
| Australia | AU | MELBOURNE | Australia | Australia/Melbourne | red | 4 |
| Indonesia | ID | JAKARTA | Indonesia | Asia/Jakarta | cyan | 5 |
| India | IN | INDIA | India | Asia/Kolkata | lime | 6 |

All rows: `IsActive = Yes`.

---

## 3. TeamMembers list

**Site Contents → New → List → Blank list**
Name: `TeamMembers`

| Column | Type | Notes |
|---|---|---|
| `Title`      | Single line of text | Person's full name, e.g. `Vanessa Sawyerr` |
| `Email`      | Single line of text (or "Person" if you'd rather pick from AD — see note below) | Used to build the `mailto:` link on their name |
| `Region`     | Single line of text | **Must exactly match** the `Title` of the matching TeamRegions item, e.g. `United Kingdom` |
| `SortOrder`  | Number | Order within a region if you add more than one person per region |
| `IsActive`   | Yes/No | Only active rows appear |

**Add six items:**

| Title | Email | Region | SortOrder |
|---|---|---|---|
| Vanessa Sawyerr | vanessa@getstuffdoneuk.com | United Kingdom | 1 |
| Nisha Vyas | beawesome108@gmail.com | United Arab Emirates | 1 |
| David Taylor | david@apexmaritimeadvisors.com | Panamá | 1 |
| Jay Pandya | *(leave blank — no email supplied)* | Australia | 1 |
| Jon Arnup | jon.arnup@trentgo.com | Indonesia | 1 |
| Rajan | *(leave blank — no email supplied)* | India | 1 |

> **Note on `Email` as a "Person or Group" column instead:** if you'd prefer to
> pick real Entra ID / AD accounts instead of typing an email as plain text, you
> can change `Email` to a "Person or Group" column. If you do that, update
> `services/TeamDirectoryService.ts` to read `member.Email.EMail` (or
> `member.Email.Title`) instead of `member.Email` directly, and add `"Email/EMail"`
> to the `.select()` call. The plain-text version above is simpler and works
> out of the box with the code exactly as shipped.

To add another team member later, just add a new row to `TeamMembers` with the
matching `Region` value — no code or grid changes are needed, and the card layout
already handles any number of members per region.

---

## Permissions

Give the app's SharePoint context (i.e. whatever account/app the web part runs
under — typically "Everyone" with Read access on these three lists is enough,
since the web part only reads, never writes, list data) read access to all three
lists. No special app permissions are required beyond normal SPFx list read
access already used by `Sponsors`/`KeyDates` in this solution.

## Verifying it worked

1. Open the page with the web part on it.
2. Open the browser console (F12).
3. You should see log lines like:
   - `[EventSettings] SharePoint Items [...]`
   - `[TeamDirectory] SharePoint Regions [...]`
   - `[TeamDirectory] SharePoint Members [...]`
4. If a list is missing or empty, the web part logs an error/empty result but
   keeps working using the built-in fallback values — it will never show a
   blank or broken section.

---

## Troubleshooting: "the whole page went blank after I added an item"

This was an actual bug and has been fixed, but it's worth understanding so it
never surprises you again:

**What was happening:** the `Timezone` column on `TeamRegions` is free text.
A single mistyped or stray-whitespace value (e.g. a leading space before
`America/Panama`, or a typo like `Europe/Londonn`) made the browser's date
formatter throw an error. That error used to escape straight out of React and
unmount the *entire* web part — so the whole page appeared to "vanish" the
moment that one bad row got fetched, even though every other list was fine.

**What's fixed now:**
- Every timezone value is validated and trimmed before use. An invalid one
  now just falls back to your browser's local time for that one card and logs
  a clear warning in the console (`[TeamDirectory] Invalid or missing
  timezone...`) — it no longer throws.
- Every dashboard section (Hero, Team Directory, Actions, Agenda, Documents,
  Sponsors, Footer) is now wrapped in an error boundary. If something
  unexpected ever does go wrong in one section again, only that section shows
  a small "couldn't load" message — the rest of the page keeps working
  normally.

**If you still see a bad time on a card:** open the console and look for the
`[TeamDirectory] Invalid or missing timezone` warning — it prints the exact
value that failed. Go to the `TeamRegions` list, open that item, and re-type
the `Timezone` column value cleanly (no leading/trailing spaces), e.g.
`America/Panama`, `Europe/London`, `Asia/Dubai`, `Asia/Kolkata`,
`Asia/Jakarta`, `Australia/Melbourne`.
