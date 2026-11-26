// Sauvegarde automatique quotidienne (fonction planifiée Netlify, offre gratuite).
// Tourne chaque jour à 12:00 UTC (2 h du matin à Tahiti, 13 h en France l'hiver).
// Conserve les 90 dernières sauvegardes.

import { getStore } from "@netlify/blobs";
import { makeBackup } from "./api.mjs";

export default async () => {
  const store = getStore({ name: "cvcf50", consistency: "strong" });
  const backups = getStore({ name: "cvcf50-backups", consistency: "strong" });
  const r = await makeBackup(store, backups, "auto");
  console.log("Sauvegarde effectuée :", r.key, r.posts, "points,", r.events, "dates");
};

export const config = { schedule: "0 12 * * *" };
