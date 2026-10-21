# UNBOXED · Reimagining STEM Education

The registration page for **UNBOXED**, an experiential pop-up by MakerGhat with Shikshagraha
(12 December 2026, TUMO Mumbai, Shikha Academy). It implements design direction **D**: a
closed kraft box printed with a traditional classroom covers the first screen, and opening it
breaks the box apart to reveal the event details.

## Stack

| Part      | Choice                                                | Why                                                                                                 |
| --------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Framework | [Astro](https://astro.build), static output           | Ships finished HTML with under 2 KB of JavaScript: fast on phones, and link previews show the event |
| Styling   | Plain CSS with brand tokens (`src/styles/global.css`) | The design is bespoke; tokens keep colours and sizes in one place                                   |
| The box   | CSS 3D transforms, driven by `src/scripts/unbox.ts`   | No animation library                                                                                |
| Fonts     | Parkinsans, Outfit, Bungee via Astro's Fonts API      | Downloaded at build time and served from the site, with size-matched fallbacks                      |
| Images    | `astro:assets`                                        | Converted to WebP at the sizes each screen needs                                                    |
| Tests     | Playwright + axe at 5 screen sizes                    | Intro behaviour, layout, links, link preview, no-JavaScript fallback and WCAG A/AA                  |

## Running it

Requires Node 22.22 or later.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm test           # build, then the Playwright suite
npm run lint       # Prettier check (npm run format to fix)
```

The tests need a browser. On Windows, use the installed Edge with `PW_CHANNEL=msedge npm test`;
elsewhere run `npx playwright install chromium` once.

## Changing the content

**All copy, links and event details are in [`src/content/site.ts`](src/content/site.ts).**
The text comes from Tab 5 of the concept note.

- **Register link:** `links.register`, the Luma event page. All three Register buttons use it.
- **Date, time, venue:** `event`. These also feed the search-engine event data in the page head.
- **After changing the title, date or venue,** run `npm run social` to redraw `public/og.png`, the image shown when the link is shared on WhatsApp or LinkedIn.

## How the intro behaves

- While the box is closed it is the whole landing page: the page doesn't scroll and nothing below it can be reached until the box is opened. There is deliberately no Skip.
  The state lives on `<html data-intro="closed | breaking | open">`.

- It covers exactly one screen, and the box scales down on short screens so everything fits.
- It shows **once per visit** (remembered in `sessionStorage`), so someone returning to register goes straight to the details.
- It is skipped for people with **reduced motion** turned on, and for links that point into the page (`/#journey`) or use `?intro=skip`. **`?intro=show`** forces it, which is handy when reviewing.
- Without JavaScript the intro never appears and the page shows the details.
- While it is closed, the details underneath are `inert` (out of the keyboard order). Once opened, focus moves to the headline.

## Project structure

```
src/
├─ content/site.ts          All copy, links and event details
├─ layouts/Layout.astro     <head>: meta, link preview, event data, fonts, intro start state, analytics
├─ pages/index.astro        The page: sections in order
├─ components/
│  ├─ Hero.astro            Header, headline, open box, ticket; hosts the intro
│  ├─ IntroBox.astro        The closed box and its breaking animation
│  ├─ ClassroomsSection     "Walk into the classrooms of the future." (coral)
│  ├─ WhySection            "Why UNBOXED?"
│  ├─ JourneySection        "Your journey through UnboxEd": the three rooms
│  ├─ VisionSection         Vision line (green)
│  ├─ CtaSection            "Ready to unbox what's possible?" (yellow)
│  ├─ SiteFooter            Logos, licence, socials
│  ├─ LogoLockup            MakerGhat + Shikshagraha (white Shikshagraha on purple)
│  └─ UnboxedMark           The UNBOX|ED wordmark
├─ scripts/unbox.ts         Opens the box
├─ social/SocialCard.astro  The link-preview card (dev-only page at /social-card)
└─ styles/global.css        Brand tokens, reset, buttons
scripts/social.mjs          Regenerates public/og.png and public/apple-touch-icon.png
tests/landing.spec.ts       Playwright suite
```

## Deploying

The site is fully static and deploys on Vercel with no settings: import the repository and
Vercel detects Astro.

| Environment variable | Purpose                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`           | The public address, e.g. `https://unboxed.makerghat.org`. Without it, Vercel's production URL is used for link previews. |
| `PUBLIC_GA_ID`       | Optional Google Analytics 4 ID. When set, Register clicks are counted as `register_click` events.                        |

## Before launch

- Time: Tab 5 says 9 AM – 5 PM; the invite emails say 9:30 AM – 5 PM.
- Venue spelling: "Shikha Academy" here and in Tab 5, "Shiksha Academy" in the emails.
- Name styling: Tab 5 uses both UNBOXED and UnboxEd; the page follows it as written.
- Questions email: jayashree@makerghat.org; a doc comment suggests unboxed@makerghat.org.
- Photos are placeholders from the brand guide, and the Shikshagraha logo is a 500 px PNG; replace both with originals.
