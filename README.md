# ALMA website

The published files for aloveformissionsabroad.netlify.app (hosted on Netlify).

This repository IS the live site's source of truth: every push to `main` publishes on Netlify.
See CLAUDE.md for the rules. Don't publish from the old Astro project.

## Note (Nov 27, 2026)
Some pages were edited directly in this repo (not in the Astro source): Volunteer Hub links now
point to https://hub.aloveformissionsabroad.com, the old-Hub sync notes were removed from
/volunteers and /board, and repeated copy was trimmed on /give, /about and /stories (EN + ES).
Before publishing again from the Astro source, copy these changes into it, or they will be lost.
Also Nov 27: /sponsor now redirects to /give#sponsor (duplicate page removed), the Give page
hero video uses the 720p file, and cache headers moved to _headers (photos and videos are cached
for a week, so give a replaced photo a new file name).
