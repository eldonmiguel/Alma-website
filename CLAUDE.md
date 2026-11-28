# ALMA website (aloveformissionsabroad.com): rules for any chat

**This repo is the source of truth for the live website.** Netlify site `aloveformissionsabroad`
(id 47e0cd0c-fff6-426e-9fad-8ca90b2c06b7) publishes `main` automatically about a minute after a push.

## How to change the site
1. Edit the files here directly. The HTML is pre-built and minified, so use exact find-and-replace.
2. Every page has a Spanish twin under `es/`; change both.
3. Commit and push to `main`, then open the live page to check it.

## Never
- Never deploy by drag-and-drop or with the Netlify CLI to this site; publish only by pushing here.
- Never rebuild or publish from the old Astro project (the older "ALMA website" project chat). It's out of
  date and would wipe the flyers, Hub links, payments function and page cleanup.
- Never put keys or passwords in this repo. It's public.

## What lives where
- `_redirects`: Hub shortcuts (/hub/go goes to hub.aloveformissionsabroad.com), live PDF flyers (/flyers/*),
  /sponsor goes to /give#sponsor, and the old missions and flyer pages.
- `_headers`: caching. Photos and videos are cached for a week, so give a replaced photo a new file name.
- `netlify/functions/gt-total.mjs`: Giving Tuesday counter (env GIVEBUTTER_API_KEY).
- `netlify/functions/gb-mission-fees.mjs`: mission fee payments for the Hub (env MISSION_FEES_KEY).
- Forms: `volunteer-signup` is sent to the Hub by an outgoing webhook to the Supabase function website-signup;
  `contact` and `patrocinadores-guatemala` email mike@aacda.com.
- Flyers: PDFs are generated live from the Hub's missions by the Supabase `flyer` function (English only).
  Photos are in `img/flyer/`, and the source code is in the Hub repo.
- Volunteer Hub: separate repo `eldonmiguel/alma-volunteer-hub` (hub.aloveformissionsabroad.com).

## Brand and facts
- Turquoise #07B2AF is the main color, with pink #E74280 as the accent. Don't use navy in new materials.
- ALMA was founded by Mike Oswald and Dra. Vicky Loza. A Love For Missions Abroad Inc., 501(c)(3), EIN 83-2378971.
- Givebutter: general giving is make-a-donation-to-alma-m5gr1b; mission fees are mission-fee-donation-rbzuc5.
