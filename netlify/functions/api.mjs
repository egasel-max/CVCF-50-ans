// API du tableau de bord « CVCF · 50 ans »
// Stockage : Netlify Blobs (inclus dans l'offre gratuite).
// Protection : variable d'environnement ACCESS_CODE (code partagé du comité).

import { getStore } from "@netlify/blobs";

const DEFAULT_POLES = [
  { id: "pilotage", name: "Pilotage & coordination", lead: "" },
  { id: "finances", name: "Finances & trésorerie", lead: "" },
  { id: "partenariats", name: "Partenariats, mécénat, subventions", lead: "" },
  { id: "lieu", name: "Lieu & collectivités", lead: "" },
  { id: "programme", name: "Programme, animations, records", lead: "" },
  { id: "histoire", name: "Volet historique & expo", lead: "" },
  { id: "intendance", name: "Intendance : hébergement, repas, transports", lead: "" },
  { id: "securite", name: "Sécurité & réglementaire", lead: "" },
  { id: "com", name: "Communication", lead: "" },
  { id: "benevoles", name: "Bénévoles & accueil", lead: "" },
];

const DEFAULT_MEMBERS = ["Bruno Claes", "Sylvie Claes", "Gérard Vauchamp", "Jean-Paul Arnould", "Pierre Lesage"];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const str = (v, max = 5000) => (typeof v === "string" ? v.slice(0, max) : "");
const isoDate = (v) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "");

function cleanPost(b) {
  return {
    pole: str(b.pole, 40),
    author: str(b.author, 80),
    status: ["ok", "warn", "block"].includes(b.status) ? b.status : "ok",
    text: str(b.text, 8000),
    issues: str(b.issues, 4000),
    budget: Number.isFinite(Number(b.budget)) && b.budget !== "" && b.budget !== null ? Number(b.budget) : null,
    deadline: isoDate(b.deadline),
    deadlineLabel: str(b.deadlineLabel, 200),
  };
}

function cleanEvent(b) {
  return {
    date: isoDate(b.date),
    endDate: isoDate(b.endDate),
    title: str(b.title, 200),
    pole: str(b.pole, 40),
    author: str(b.author, 80),
    note: str(b.note, 1000),
  };
}

export default async (req) => {
  const code =
    (globalThis.Netlify && globalThis.Netlify.env && globalThis.Netlify.env.get("ACCESS_CODE")) ||
    process.env.ACCESS_CODE;
  if (code && req.headers.get("x-access-code") !== code) {
    return json({ error: "Code d'accès invalide" }, 401);
  }

  const store = getStore({ name: "cvcf50", consistency: "strong" });
  const url = new URL(req.url);
  const [res, id] = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);

  const loadAll = async (prefix) => {
    const { blobs } = await store.list({ prefix });
    const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
    return items.filter(Boolean);
  };

  try {
    if (req.method === "GET" && res === "data") {
      const [poles, members, posts, events] = await Promise.all([
        store.get("poles", { type: "json" }),
        store.get("members", { type: "json" }),
        loadAll("post/"),
        loadAll("event/"),
      ]);
      return json({ poles: poles || DEFAULT_POLES, members: members || DEFAULT_MEMBERS, posts, events });
    }

    if (req.method === "POST" && res === "posts") {
      const item = { ...cleanPost(await req.json()), id: uid(), createdAt: new Date().toISOString() };
      if (!item.pole || !item.text.trim()) return json({ error: "Domaine et texte obligatoires" }, 400);
      await store.setJSON(`post/${item.id}`, item);
      return json(item, 201);
    }

    if (req.method === "POST" && res === "events") {
      const item = { ...cleanEvent(await req.json()), id: uid(), createdAt: new Date().toISOString() };
      if (!item.date || !item.title.trim()) return json({ error: "Date et intitulé obligatoires" }, 400);
      await store.setJSON(`event/${item.id}`, item);
      return json(item, 201);
    }

    if (req.method === "DELETE" && (res === "posts" || res === "events") && id) {
      await store.delete(`${res === "posts" ? "post" : "event"}/${id}`);
      return json({ ok: true });
    }

    if (req.method === "PUT" && res === "poles") {
      const body = await req.json();
      if (!Array.isArray(body)) return json({ error: "Format invalide" }, 400);
      const poles = body.slice(0, 30).map((p) => ({
        id: str(p.id, 40) || uid(),
        name: str(p.name, 120),
        lead: str(p.lead, 120),
      }));
      await store.setJSON("poles", poles);
      return json(poles);
    }

    if (req.method === "PUT" && res === "members") {
      const body = await req.json();
      if (!Array.isArray(body)) return json({ error: "Format invalide" }, 400);
      const members = [...new Set(body.map((m) => str(m, 80).trim()).filter(Boolean))].slice(0, 100);
      await store.setJSON("members", members);
      return json(members);
    }

    return json({ error: "Route inconnue" }, 404);
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
};

export const config = { path: "/api/*" };
