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

// ---------- Sauvegardes ----------
const KEEP_BACKUPS = 90;

async function readAll(store) {
  const loadAll = async (prefix) => {
    const { blobs } = await store.list({ prefix });
    const items = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
    return items.filter(Boolean);
  };
  const [poles, members, posts, events] = await Promise.all([
    store.get("poles", { type: "json" }),
    store.get("members", { type: "json" }),
    loadAll("post/"),
    loadAll("event/"),
  ]);
  return { poles: poles || DEFAULT_POLES, members: members || DEFAULT_MEMBERS, posts, events };
}

export async function makeBackup(store, backups, reason) {
  const data = await readAll(store);
  const savedAt = new Date().toISOString();
  const key = savedAt.replace(/[:.]/g, "-") + "_" + reason;
  await backups.setJSON(key, { savedAt, reason, ...data }, {
    metadata: { savedAt, reason, posts: data.posts.length, events: data.events.length },
  });
  const { blobs } = await backups.list();
  const keys = blobs.map((b) => b.key).sort();
  for (const old of keys.slice(0, Math.max(0, keys.length - KEEP_BACKUPS))) await backups.delete(old);
  return { key, savedAt, reason, posts: data.posts.length, events: data.events.length };
}

export default async (req) => {
  const code =
    (globalThis.Netlify && globalThis.Netlify.env && globalThis.Netlify.env.get("ACCESS_CODE")) ||
    process.env.ACCESS_CODE;
  if (code && req.headers.get("x-access-code") !== code) {
    return json({ error: "Code d'accès invalide" }, 401);
  }

  const store = getStore({ name: "cvcf50", consistency: "strong" });
  const backups = getStore({ name: "cvcf50-backups", consistency: "strong" });
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

    if (req.method === "GET" && res === "backups" && !id) {
      const { blobs } = await backups.list();
      const list = await Promise.all(
        blobs.map(async (b) => {
          const m = await backups.getMetadata(b.key);
          return { key: b.key, ...((m && m.metadata) || {}) };
        })
      );
      list.sort((a, b) => b.key.localeCompare(a.key));
      return json(list);
    }

    if (req.method === "GET" && res === "backups" && id) {
      const data = await backups.get(id, { type: "json" });
      if (!data) return json({ error: "Sauvegarde introuvable" }, 404);
      return new Response(JSON.stringify(data, null, 2), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "content-disposition": `attachment; filename="cvcf50-${id}.json"`,
        },
      });
    }

    if (req.method === "POST" && res === "backups") {
      return json(await makeBackup(store, backups, "manuelle"), 201);
    }

    if (req.method === "POST" && res === "restore" && id) {
      const snap = await backups.get(id, { type: "json" });
      if (!snap) return json({ error: "Sauvegarde introuvable" }, 404);
      // Filet de sécurité : on sauvegarde l'état actuel avant d'écraser
      await makeBackup(store, backups, "avant-restauration");
      for (const prefix of ["post/", "event/"]) {
        const { blobs } = await store.list({ prefix });
        for (const b of blobs) await store.delete(b.key);
      }
      await store.setJSON("poles", snap.poles || DEFAULT_POLES);
      await store.setJSON("members", snap.members || DEFAULT_MEMBERS);
      for (const p of snap.posts || []) if (p && p.id) await store.setJSON(`post/${p.id}`, p);
      for (const e of snap.events || []) if (e && e.id) await store.setJSON(`event/${e.id}`, e);
      return json({ ok: true, restored: id });
    }

    return json({ error: "Route inconnue" }, 404);
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
};

export const config = { path: "/api/*" };
