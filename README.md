# CVCF · 50 ans : tableau de bord du comité

Une page web partagée. Chaque responsable de domaine y publie son point d'avancement,
et un calendrier rassemble les jalons, les dates de reporting (le 1er et le 15) et les échéances.

## Mise en ligne sur Netlify (gratuit)

L'appli a besoin d'un petit serveur (une « fonction » Netlify) pour enregistrer les données.
Le simple glisser-déposer de Netlify Drop ne l'installe pas : il faut passer par GitHub
ou par l'outil en ligne de commande de Netlify.

### Option A : par GitHub (la plus simple à maintenir)
1. Crée un dépôt GitHub et mets-y le contenu de ce dossier.
2. Sur app.netlify.com : « Add new site » → « Import an existing project » → choisis le dépôt.
   Laisse les réglages par défaut : le fichier netlify.toml s'en charge.
3. Dans « Site configuration » → « Environment variables », ajoute
   `ACCESS_CODE` = le code que tu donneras au comité (par ex. `cerfvolant1977`).
4. Relance un déploiement (« Deploys » → « Trigger deploy »).

### Option B : en ligne de commande
```
npm install
npx netlify-cli login
npx netlify-cli init          # crée le site
npx netlify-cli env:set ACCESS_CODE "ton-code"
npx netlify-cli deploy --build --prod
```

## Utilisation
- Chacun ouvre l'adresse du site, va dans **Réglages**, saisit son nom et le code d'accès.
- **Publier mon point** : choisir le domaine, le statut (dans les clous, vigilance, bloqué)
  et écrire. Le détail (blocages, budget engagé, prochaine échéance) est facultatif.
- **Tableau de bord** : un domaine s'affiche « reporting attendu » s'il n'a rien publié depuis 15 jours.
- **Calendrier** : un clic sur un jour permet d'ajouter une date.
- **Réglages** : ajouter ou retirer des membres du comité (préchargés : Bruno Claes, Sylvie Claes,
  Gérard Vauchamp, Jean-Paul Arnould, Pierre Lesage), attribuer chaque domaine à un responsable, renommer ou ajouter des domaines, exporter une sauvegarde.

Les données sont stockées dans Netlify Blobs, inclus dans l'offre gratuite.
Ouvert directement depuis le disque, sans serveur, l'appli fonctionne en **mode démo** :
les données restent alors dans le navigateur.
