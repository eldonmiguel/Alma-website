// Mission fee payments for the ALMA Volunteer Hub.
// Returns ONLY the "Mission fee donation" campaign's successful payments, and only to a caller
// holding MISSION_FEES_KEY (a Netlify environment variable, never in this repo).
// The Hub's givebutter-sync function calls this hourly and matches payments to volunteers.
const CAMPAIGN = "628360"; // "Mission fee donation" (mission-fee-donation-rbzuc5)
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
export default async (req) => {
  const need = process.env.MISSION_FEES_KEY;
  if (!need || req.headers.get("x-key") !== need) return json({ error: "unauthorized" }, 401);
  const key = process.env.GIVEBUTTER_API_KEY;
  if (!key) return json({ error: "not-configured" }, 503);
  const out = [];
  let url = "https://api.givebutter.com/v1/transactions?page=1";
  for (let i = 0; url && i < 60; i++) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${key}`, Accept: "application/json" } });
    if (!r.ok) return json({ error: "upstream", status: r.status }, 502);
    const j = await r.json();
    for (const t of j.data || []) {
      if (String(t.campaign_id) !== CAMPAIGN) continue;
      if (t.status && t.status !== "succeeded") continue;
      out.push({
        id: String(t.id),
        amount: Number(t.amount ?? t.donated ?? 0),
        email: t.email || null,
        name: [t.first_name, t.last_name].filter(Boolean).join(" ") || null,
        note: t.giving_space?.message || t.message || null,
        at: t.transacted_at || t.created_at || null,
      });
    }
    url = j.links?.next || null;
  }
  return json({ campaign: CAMPAIGN, count: out.length, payments: out });
};
export const config = { path: "/api/gb-mission-fees" };
