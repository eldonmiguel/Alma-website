// The Bell: returns ONLY { raised, goal, donors } for the Giving Tuesday campaign.
// Needs a Netlify environment variable GIVEBUTTER_API_KEY (never in the repo or the browser).
// Without the key it answers 503 and the page shows its static copy (no made-up numbers).
const CAMPAIGN = "801018"; // "Make a donation to ALMA" (make-a-donation-to-alma-m5gr1b)
const json = (body, status = 200, cache = "no-store") =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": cache } });
export default async () => {
  const key = process.env.GIVEBUTTER_API_KEY;
  if (!key) return json({ error: "not-configured" }, 503);
  try {
    const r = await fetch(`https://api.givebutter.com/v1/campaigns/${CAMPAIGN}`, { headers: { Authorization: `Bearer ${key}`, Accept: "application/json" } });
    if (!r.ok) return json({ error: "upstream" }, 502);
    const j = await r.json();
    const c = j && j.data ? j.data : j;
    const raised = Number(c.raised), goal = Number(c.goal);
    if (!Number.isFinite(raised)) return json({ error: "shape" }, 502);
    return json({ raised, goal: Number.isFinite(goal) ? goal : null, donors: Number(c.donors ?? c.donors_count ?? 0) || 0 }, 200, "public, max-age=30");
  } catch { return json({ error: "fetch" }, 502); }
};
export const config = { path: "/api/gt-total" };
