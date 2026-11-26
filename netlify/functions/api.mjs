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

// BEGIN_TASKS
const DEFAULT_TASKS = [{"id": "t001", "pole": "pilotage", "title": "Fixer l'ambition : fête interne, festival grand public ou rassemblement international", "due": "2026-12-03", "order": 0}, {"id": "t002", "pole": "pilotage", "title": "Définir les publics visés : membres, clubs français, invités étrangers, grand public, scolaires, élus", "due": "2026-12-03", "order": 1}, {"id": "t003", "pole": "pilotage", "title": "Arrêter le format du week-end (ex. samedi vol + soirée des 50 ans, dimanche festival ouvert à tous)", "due": "2026-12-03", "order": 2}, {"id": "t004", "pole": "pilotage", "title": "Fixer les objectifs chiffrés : participants, cerfs-volants, visiteurs, retombées presse", "due": "2026-12-03", "order": 3}, {"id": "t005", "pole": "pilotage", "title": "Nommer le chef de projet", "due": "2026-12-03", "order": 4}, {"id": "t006", "pole": "pilotage", "title": "Nommer un responsable pour chaque domaine et le saisir dans les Réglages", "due": "2026-12-03", "order": 5}, {"id": "t007", "pole": "pilotage", "title": "Fixer les règles de décision : à partir de quel montant une dépense doit être validée, et par qui", "due": "2026-12-03", "order": 6}, {"id": "t008", "pole": "pilotage", "title": "Valider le calendrier général et les jalons", "due": "2026-12-03", "order": 7}, {"id": "t009", "pole": "pilotage", "title": "Fixer la date de la première fiche de reporting (15 décembre)", "due": "2026-12-03", "order": 8}, {"id": "t010", "pole": "pilotage", "title": "Diffuser le compte rendu de la réunion du 3 décembre", "due": "2026-12-10", "order": 9}, {"id": "t011", "pole": "pilotage", "title": "Mettre en place le dossier partagé (courriers, devis, conventions, photos)", "due": "2026-12-15", "order": 10}, {"id": "t012", "pole": "pilotage", "title": "Organiser la visio de reporting du 1er et du 15 (30 min max) et envoyer les liens", "due": "2026-12-15", "order": 11}, {"id": "t013", "pole": "pilotage", "title": "Point d'étape : lieu arrêté et budget validé", "due": "2027-01-31", "order": 12}, {"id": "t014", "pole": "pilotage", "title": "Point d'étape : subventions déposées, conventions signées", "due": "2027-02-28", "order": 13}, {"id": "t015", "pole": "pilotage", "title": "Point d'étape : partenaires bouclés, programme fixé, inscriptions ouvertes", "due": "2027-03-31", "order": 14}, {"id": "t016", "pole": "pilotage", "title": "Point d'étape : dossier préfecture, assurances, logistique détaillée", "due": "2027-04-30", "order": 15}, {"id": "t017", "pole": "pilotage", "title": "Réunion de coordination finale avec tous les responsables (J-7)", "due": "2027-05-15", "order": 16}, {"id": "t018", "pole": "pilotage", "title": "Désigner le PC organisation et la chaîne de décision pendant le week-end", "due": "2027-05-15", "order": 17}, {"id": "t019", "pole": "pilotage", "title": "Organiser la réunion de bilan", "due": "2027-06-30", "order": 18}, {"id": "t020", "pole": "pilotage", "title": "Remercier partenaires, collectivités, bénévoles et participants", "due": "2027-06-30", "order": 19}, {"id": "t021", "pole": "finances", "title": "Voter le budget spécial du CVCF pour les 50 ans (en plus des 20 000 € de fonds propres)", "due": "2026-12-03", "order": 0}, {"id": "t022", "pole": "finances", "title": "Préparer le modèle de budget prévisionnel par poste (dépenses / recettes)", "due": "2026-12-15", "order": 1}, {"id": "t023", "pole": "finances", "title": "Chiffrer : location du site et de la salle", "due": "2027-01-31", "order": 2}, {"id": "t024", "pole": "finances", "title": "Chiffrer : équipements (barnums, sono, électricité, toilettes)", "due": "2027-01-31", "order": 3}, {"id": "t025", "pole": "finances", "title": "Chiffrer : déplacements et hébergement des invités", "due": "2027-01-31", "order": 4}, {"id": "t026", "pole": "finances", "title": "Chiffrer : soirée anniversaire", "due": "2027-01-31", "order": 5}, {"id": "t027", "pole": "finances", "title": "Chiffrer : exposition historique", "due": "2027-01-31", "order": 6}, {"id": "t028", "pole": "finances", "title": "Chiffrer : communication (identité, impression, web)", "due": "2027-01-31", "order": 7}, {"id": "t029", "pole": "finances", "title": "Chiffrer : assurances", "due": "2027-01-31", "order": 8}, {"id": "t030", "pole": "finances", "title": "Chiffrer : poste de secours", "due": "2027-01-31", "order": 9}, {"id": "t031", "pole": "finances", "title": "Chiffrer : cadeaux et souvenirs (pin's, médaille, timbre…)", "due": "2027-01-31", "order": 10}, {"id": "t032", "pole": "finances", "title": "Chiffrer : droits d'huissier si tentative de record", "due": "2027-01-31", "order": 11}, {"id": "t033", "pole": "finances", "title": "Prévoir une ligne d'imprévus (10 %)", "due": "2027-01-31", "order": 12}, {"id": "t034", "pole": "finances", "title": "Valoriser les apports en nature de la commune dans le budget", "due": "2027-01-31", "order": 13}, {"id": "t035", "pole": "finances", "title": "Préparer trois scénarios de budget (bas, moyen, haut) et ce qu'on sacrifie dans chacun", "due": "2027-01-31", "order": 14}, {"id": "t036", "pole": "finances", "title": "Faire valider le budget prévisionnel", "due": "2027-01-31", "order": 15}, {"id": "t037", "pole": "finances", "title": "Établir le plan de trésorerie : qui avance l'argent en attendant les subventions", "due": "2027-02-28", "order": 16}, {"id": "t038", "pole": "finances", "title": "Fixer les tarifs participants : forfait d'inscription, repas, soirée", "due": "2027-02-28", "order": 17}, {"id": "t039", "pole": "finances", "title": "Prévoir les recettes annexes : buvette, objets dérivés, livre anniversaire", "due": "2027-02-28", "order": 18}, {"id": "t040", "pole": "finances", "title": "Organiser l'encaissement des inscriptions (en ligne / sur place)", "due": "2027-03-31", "order": 19}, {"id": "t041", "pole": "finances", "title": "Mettre à jour les dépenses engagées à chaque reporting", "due": "", "order": 20}, {"id": "t042", "pole": "finances", "title": "Préparer la caisse et le fonds de caisse pour le week-end", "due": "2027-05-15", "order": 21}, {"id": "t043", "pole": "finances", "title": "Rassembler les factures et justificatifs pour les financeurs", "due": "2027-06-30", "order": 22}, {"id": "t044", "pole": "finances", "title": "Clôturer les comptes de l'événement et présenter le bilan financier", "due": "2027-06-30", "order": 23}, {"id": "t045", "pole": "partenariats", "title": "Vérifier que le CVCF peut délivrer des reçus fiscaux (intérêt général), sinon demander un rescrit", "due": "2026-12-15", "order": 0}, {"id": "t046", "pole": "partenariats", "title": "Rédiger le dossier commun : histoire du club, projet, chiffres attendus, budget, contreparties", "due": "2026-12-15", "order": 1}, {"id": "t047", "pole": "partenariats", "title": "Définir les contreparties par niveau (or, argent, bronze) : visibilité, places à la soirée, cerf-volant aux couleurs, photo aérienne", "due": "2026-12-15", "order": 2}, {"id": "t048", "pole": "partenariats", "title": "Établir la liste des cibles avec un interlocuteur unique par entreprise", "due": "2026-12-10", "order": 3}, {"id": "t049", "pole": "partenariats", "title": "Envoyer le dossier à l'Armée de l'air", "due": "2026-12-15", "order": 4}, {"id": "t050", "pole": "partenariats", "title": "Envoyer le dossier à TotalEnergies", "due": "2026-12-15", "order": 5}, {"id": "t051", "pole": "partenariats", "title": "Envoyer le dossier au Musée de l'Air", "due": "2026-12-15", "order": 6}, {"id": "t052", "pole": "partenariats", "title": "Envoyer le dossier à Airbus", "due": "2026-12-15", "order": 7}, {"id": "t053", "pole": "partenariats", "title": "Repérer les calendriers et formulaires de dépôt du Département et de la Région", "due": "2026-12-15", "order": 8}, {"id": "t054", "pole": "partenariats", "title": "Démarcher les banques régionales (une fois le lieu connu)", "due": "2027-02-28", "order": 9}, {"id": "t055", "pole": "partenariats", "title": "Démarcher Décathlon", "due": "2027-02-28", "order": 10}, {"id": "t056", "pole": "partenariats", "title": "Démarcher les fabricants de cerfs-volants", "due": "2027-02-28", "order": 11}, {"id": "t057", "pole": "partenariats", "title": "Solliciter l'office de tourisme et l'agglomération (communication, hébergement)", "due": "2027-02-28", "order": 12}, {"id": "t058", "pole": "partenariats", "title": "Déposer la demande de subvention au Département", "due": "2027-02-28", "order": 13}, {"id": "t059", "pole": "partenariats", "title": "Déposer la demande de subvention à la Région", "due": "2027-02-28", "order": 14}, {"id": "t060", "pole": "partenariats", "title": "Relancer les entreprises sollicitées sans réponse", "due": "2027-01-31", "order": 15}, {"id": "t061", "pole": "partenariats", "title": "Signer les conventions de mécénat et de sponsoring", "due": "2027-03-31", "order": 16}, {"id": "t062", "pole": "partenariats", "title": "Boucler la liste des partenaires et la transmettre à la communication (logos)", "due": "2027-03-31", "order": 17}, {"id": "t063", "pole": "partenariats", "title": "Préparer l'accueil des partenaires pendant le week-end (places, visibilité)", "due": "2027-05-15", "order": 18}, {"id": "t064", "pole": "partenariats", "title": "Envoyer bilan, photos et justificatifs aux financeurs", "due": "2027-06-30", "order": 19}, {"id": "t065", "pole": "lieu", "title": "Valider la grille de critères de choix du lieu", "due": "2026-12-03", "order": 0}, {"id": "t066", "pole": "lieu", "title": "Valider la liste courte : Châtelaillon, La Turballe, Trouville, Notre-Dame-de-Monts", "due": "2026-12-03", "order": 1}, {"id": "t067", "pole": "lieu", "title": "Désigner qui écrit à chaque maire", "due": "2026-12-03", "order": 2}, {"id": "t068", "pole": "lieu", "title": "Rédiger le courrier type aux maires", "due": "2026-12-10", "order": 3}, {"id": "t069", "pole": "lieu", "title": "Envoyer les courriers aux mairies", "due": "2026-12-15", "order": 4}, {"id": "t070", "pole": "lieu", "title": "Vérifier pour chaque site le régime de vent en mai et l'orientation de la plage", "due": "2027-01-31", "order": 5}, {"id": "t071", "pole": "lieu", "title": "Vérifier les marées (coefficients, horaires) des 22-23 mai 2027", "due": "2027-01-31", "order": 6}, {"id": "t072", "pole": "lieu", "title": "Vérifier la surface de vol et d'accueil du public, selon la marée", "due": "2027-01-31", "order": 7}, {"id": "t073", "pole": "lieu", "title": "Vérifier la hauteur de vol autorisée près des aéroports (La Rochelle, Deauville, La Baule) auprès de la DGAC", "due": "2027-01-31", "order": 8}, {"id": "t074", "pole": "lieu", "title": "Vérifier les zones de nidification et Natura 2000 sur chaque plage", "due": "2027-01-31", "order": 9}, {"id": "t075", "pole": "lieu", "title": "Recenser ce que chaque mairie apporte en nature : terrain, services techniques, salle, sécurité, communication", "due": "2027-01-31", "order": 10}, {"id": "t076", "pole": "lieu", "title": "Vérifier la salle pour la soirée et l'exposition", "due": "2027-01-31", "order": 11}, {"id": "t077", "pole": "lieu", "title": "Vérifier l'accès en train et en voiture, et le parking", "due": "2027-01-31", "order": 12}, {"id": "t078", "pole": "lieu", "title": "Vérifier l'hébergement disponible autour de chaque site (VVF de La Turballe…)", "due": "2027-01-31", "order": 13}, {"id": "t079", "pole": "lieu", "title": "Vérifier les événements concurrents à cette période (articulation avec le festival de Châtelaillon)", "due": "2027-01-31", "order": 14}, {"id": "t080", "pole": "lieu", "title": "Remplir le tableau comparatif des sites", "due": "2027-01-31", "order": 15}, {"id": "t081", "pole": "lieu", "title": "Organiser la visite technique des sites finalistes", "due": "2027-01-31", "order": 16}, {"id": "t082", "pole": "lieu", "title": "Arrêter le lieu", "due": "2027-01-31", "order": 17}, {"id": "t083", "pole": "lieu", "title": "Signer la convention avec la commune", "due": "2027-02-28", "order": 18}, {"id": "t084", "pole": "lieu", "title": "Obtenir les arrêtés municipaux : occupation de la plage, circulation, stationnement", "due": "2027-04-30", "order": 19}, {"id": "t085", "pole": "lieu", "title": "Établir le plan du site : zones de vol, public, stands, secours, parking", "due": "2027-04-30", "order": 20}, {"id": "t086", "pole": "lieu", "title": "Revérifier météo et marées à J-7", "due": "2027-05-15", "order": 21}, {"id": "t087", "pole": "lieu", "title": "Faire l'état des lieux du site avant et après l'événement", "due": "2027-05-21", "order": 22}, {"id": "t088", "pole": "programme", "title": "Esquisser le programme général du week-end", "due": "2027-01-31", "order": 0}, {"id": "t089", "pole": "programme", "title": "Concevoir le vol collectif d'ouverture", "due": "2027-02-28", "order": 1}, {"id": "t090", "pole": "programme", "title": "Créer un cerf-volant « 50 » ou une pièce géante pour l'anniversaire : qui le fabrique, quand", "due": "2027-02-28", "order": 2}, {"id": "t091", "pole": "programme", "title": "Choisir le record à tenter (nombre de cerfs-volants en vol, longueur de train…)", "due": "2027-01-31", "order": 3}, {"id": "t092", "pole": "programme", "title": "Vérifier le record existant et fixer le protocole", "due": "2027-02-28", "order": 4}, {"id": "t093", "pole": "programme", "title": "Décider de la validation : huissier ou Guinness", "due": "2027-02-28", "order": 5}, {"id": "t094", "pole": "programme", "title": "Programmer les démonstrations de pilotage acrobatique et de ballets", "due": "2027-03-31", "order": 6}, {"id": "t095", "pole": "programme", "title": "Organiser les combats de rokkakus", "due": "2027-03-31", "order": 7}, {"id": "t096", "pole": "programme", "title": "Organiser un vol de nuit avec cerfs-volants lumineux", "due": "2027-03-31", "order": 8}, {"id": "t097", "pole": "programme", "title": "Préparer la photo aérienne de groupe des 50 ans par cerf-volant (KAP)", "due": "2027-03-31", "order": 9}, {"id": "t098", "pole": "programme", "title": "Organiser les ateliers de construction pour enfants", "due": "2027-03-31", "order": 10}, {"id": "t099", "pole": "programme", "title": "Contacter les écoles pour les ateliers et scolaires", "due": "2027-02-28", "order": 11}, {"id": "t100", "pole": "programme", "title": "Organiser un concours (règlement, jury, prix)", "due": "2027-03-31", "order": 12}, {"id": "t101", "pole": "programme", "title": "Inviter les cervolistes et équipes internationales", "due": "2027-02-28", "order": 13}, {"id": "t102", "pole": "programme", "title": "Prévoir le plan B sans vent : exposition, cerfs-volants d'intérieur, projections", "due": "2027-03-31", "order": 14}, {"id": "t103", "pole": "programme", "title": "Fixer le programme heure par heure", "due": "2027-03-31", "order": 15}, {"id": "t104", "pole": "programme", "title": "Désigner un speaker / animateur pour le week-end", "due": "2027-03-31", "order": 16}, {"id": "t105", "pole": "programme", "title": "Préparer le matériel du record et des ateliers", "due": "2027-04-30", "order": 17}, {"id": "t106", "pole": "histoire", "title": "Désigner qui rassemble les archives et fixer la date limite", "due": "2026-12-03", "order": 0}, {"id": "t107", "pole": "histoire", "title": "Inventorier les archives : photos, documents, numéros du Lucane, objets", "due": "2027-01-31", "order": 1}, {"id": "t108", "pole": "histoire", "title": "Retrouver les archives papier des débuts du club", "due": "2027-01-31", "order": 2}, {"id": "t109", "pole": "histoire", "title": "Numériser les archives", "due": "2027-03-31", "order": 3}, {"id": "t110", "pole": "histoire", "title": "Récupérer les anciens sites web via la Wayback Machine", "due": "2027-02-28", "order": 4}, {"id": "t111", "pole": "histoire", "title": "Recueillir les témoignages des fondateurs et des anciens présidents", "due": "2027-03-31", "order": 5}, {"id": "t112", "pole": "histoire", "title": "Établir la frise chronologique des 50 ans", "due": "2027-02-28", "order": 6}, {"id": "t113", "pole": "histoire", "title": "Sélectionner les cerfs-volants emblématiques à exposer et contacter leurs propriétaires", "due": "2027-03-31", "order": 7}, {"id": "t114", "pole": "histoire", "title": "Concevoir l'exposition des 50 ans (scénographie, panneaux)", "due": "2027-03-31", "order": 8}, {"id": "t115", "pole": "histoire", "title": "Décider : numéro spécial du Lucane ou livre anniversaire", "due": "2027-01-31", "order": 9}, {"id": "t116", "pole": "histoire", "title": "Rédiger et mettre en page le numéro spécial ou le livre", "due": "2027-04-30", "order": 10}, {"id": "t117", "pole": "histoire", "title": "Réaliser le film ou le diaporama", "due": "2027-04-30", "order": 11}, {"id": "t118", "pole": "histoire", "title": "Préparer l'hommage aux disparus", "due": "2027-04-30", "order": 12}, {"id": "t119", "pole": "histoire", "title": "Choisir et commander les souvenirs : timbre personnalisé, pin's, médaille", "due": "2027-03-31", "order": 13}, {"id": "t120", "pole": "histoire", "title": "Imprimer les supports de l'exposition", "due": "2027-04-30", "order": 14}, {"id": "t121", "pole": "histoire", "title": "Monter et démonter l'exposition (équipe, horaires)", "due": "2027-05-15", "order": 15}, {"id": "t122", "pole": "intendance", "title": "Négocier la convention d'hébergement avec le VVF ou les hôtels", "due": "2027-02-28", "order": 0}, {"id": "t123", "pole": "intendance", "title": "Établir la liste des campings et hôtels à proximité", "due": "2027-02-28", "order": 1}, {"id": "t124", "pole": "intendance", "title": "Obtenir un tarif négocié pour les membres", "due": "2027-02-28", "order": 2}, {"id": "t125", "pole": "intendance", "title": "Choisir le traiteur et la salle du banquet du samedi soir", "due": "2027-03-31", "order": 3}, {"id": "t126", "pole": "intendance", "title": "Recenser les régimes alimentaires", "due": "2027-04-30", "order": 4}, {"id": "t127", "pole": "intendance", "title": "Organiser les repas du midi", "due": "2027-04-30", "order": 5}, {"id": "t128", "pole": "intendance", "title": "Organiser les repas des bénévoles", "due": "2027-04-30", "order": 6}, {"id": "t129", "pole": "intendance", "title": "Organiser les navettes depuis la gare", "due": "2027-04-30", "order": 7}, {"id": "t130", "pole": "intendance", "title": "Organiser le parking et le covoiturage", "due": "2027-04-30", "order": 8}, {"id": "t131", "pole": "intendance", "title": "Organiser le transport du matériel", "due": "2027-04-30", "order": 9}, {"id": "t132", "pole": "intendance", "title": "Inventorier et réserver le matériel : barnums, mâts, sono, signalétique", "due": "2027-04-30", "order": 10}, {"id": "t133", "pole": "intendance", "title": "Prévoir l'électricité et les toilettes sur le site", "due": "2027-04-30", "order": 11}, {"id": "t134", "pole": "intendance", "title": "Prévoir le stockage des cerfs-volants sur place", "due": "2027-04-30", "order": 12}, {"id": "t135", "pole": "intendance", "title": "Établir la logistique détaillée (qui, quoi, où, quand)", "due": "2027-04-30", "order": 13}, {"id": "t136", "pole": "intendance", "title": "Confirmer les effectifs au traiteur et à l'hébergement", "due": "2027-05-15", "order": 14}, {"id": "t137", "pole": "intendance", "title": "Organiser le montage et le démontage du site", "due": "2027-05-15", "order": 15}, {"id": "t138", "pole": "securite", "title": "Décider de la procédure d'annulation météo et de qui la déclenche", "due": "2026-12-03", "order": 0}, {"id": "t139", "pole": "securite", "title": "Faire valider la hauteur de vol maximale par l'aviation civile (DGAC)", "due": "2027-02-28", "order": 1}, {"id": "t140", "pole": "securite", "title": "Vérifier les contraintes environnementales (Natura 2000, nidification)", "due": "2027-01-31", "order": 2}, {"id": "t141", "pole": "securite", "title": "Déclarer la manifestation en mairie", "due": "2027-02-28", "order": 3}, {"id": "t142", "pole": "securite", "title": "Déposer le dossier de sécurité en préfecture si la fréquentation le demande", "due": "2027-04-30", "order": 4}, {"id": "t143", "pole": "securite", "title": "Souscrire l'assurance responsabilité civile de l'organisateur", "due": "2027-04-30", "order": 5}, {"id": "t144", "pole": "securite", "title": "Vérifier que les participants sont couverts par une assurance", "due": "2027-04-30", "order": 6}, {"id": "t145", "pole": "securite", "title": "Réserver le poste de secours", "due": "2027-04-30", "order": 7}, {"id": "t146", "pole": "securite", "title": "Demander la licence temporaire de buvette", "due": "2027-04-30", "order": 8}, {"id": "t147", "pole": "securite", "title": "Faire la déclaration SACEM s'il y a de la musique", "due": "2027-04-30", "order": 9}, {"id": "t148", "pole": "securite", "title": "Établir le plan de sécurité : séparation zones de vol / public, distances, balisage", "due": "2027-04-30", "order": 10}, {"id": "t149", "pole": "securite", "title": "Rédiger les consignes de sécurité pour les pilotes", "due": "2027-04-30", "order": 11}, {"id": "t150", "pole": "securite", "title": "Briefer les équipes sur la sécurité et les numéros d'urgence", "due": "2027-05-15", "order": 12}, {"id": "t151", "pole": "com", "title": "Annoncer la date aux membres pour qu'ils la bloquent", "due": "2026-12-15", "order": 0}, {"id": "t152", "pole": "com", "title": "Créer l'identité visuelle des 50 ans (logo)", "due": "2027-01-31", "order": 1}, {"id": "t153", "pole": "com", "title": "Réaliser l'affiche", "due": "2027-02-28", "order": 2}, {"id": "t154", "pole": "com", "title": "Créer la page web des 50 ans", "due": "2027-02-28", "order": 3}, {"id": "t155", "pole": "com", "title": "Mettre en place les inscriptions en ligne", "due": "2027-03-31", "order": 4}, {"id": "t156", "pole": "com", "title": "Établir le calendrier de publication sur les réseaux sociaux", "due": "2027-02-28", "order": 5}, {"id": "t157", "pole": "com", "title": "Rédiger le dossier de presse", "due": "2027-03-31", "order": 6}, {"id": "t158", "pole": "com", "title": "Envoyer le communiqué de presse", "due": "2027-04-30", "order": 7}, {"id": "t159", "pole": "com", "title": "Nouer un partenariat avec un média (presse régionale, radio locale)", "due": "2027-03-31", "order": 8}, {"id": "t160", "pole": "com", "title": "Informer les clubs étrangers (version anglaise)", "due": "2027-02-28", "order": 9}, {"id": "t161", "pole": "com", "title": "Organiser la couverture photo et vidéo : qui, quoi", "due": "2027-04-30", "order": 10}, {"id": "t162", "pole": "com", "title": "Imprimer les supports : affiches, flyers, banderoles, signalétique", "due": "2027-04-30", "order": 11}, {"id": "t163", "pole": "com", "title": "Inviter la presse sur place", "due": "2027-05-15", "order": 12}, {"id": "t164", "pole": "com", "title": "Publier le compte rendu, les photos et l'article dans le Lucane", "due": "2027-06-30", "order": 13}, {"id": "t165", "pole": "benevoles", "title": "Envoyer les invitations aux membres", "due": "2026-12-15", "order": 0}, {"id": "t166", "pole": "benevoles", "title": "Fixer les conditions d'inscription et le montant du forfait", "due": "2027-02-28", "order": 1}, {"id": "t167", "pole": "benevoles", "title": "Inviter les clubs français et étrangers", "due": "2027-02-28", "order": 2}, {"id": "t168", "pole": "benevoles", "title": "Inviter les invités d'honneur et les élus", "due": "2027-03-31", "order": 3}, {"id": "t169", "pole": "benevoles", "title": "Ouvrir les inscriptions", "due": "2027-03-31", "order": 4}, {"id": "t170", "pole": "benevoles", "title": "Suivre les inscriptions et relancer", "due": "2027-04-30", "order": 5}, {"id": "t171", "pole": "benevoles", "title": "Estimer le nombre de bénévoles nécessaires", "due": "2027-02-28", "order": 6}, {"id": "t172", "pole": "benevoles", "title": "Recruter les bénévoles", "due": "2027-03-31", "order": 7}, {"id": "t173", "pole": "benevoles", "title": "Établir le planning des bénévoles", "due": "2027-04-30", "order": 8}, {"id": "t174", "pole": "benevoles", "title": "Commander les tenues des bénévoles", "due": "2027-04-30", "order": 9}, {"id": "t175", "pole": "benevoles", "title": "Préparer l'accueil : badges, kit de bienvenue, point d'information", "due": "2027-04-30", "order": 10}, {"id": "t176", "pole": "benevoles", "title": "Briefer les bénévoles", "due": "2027-05-15", "order": 11}];
// END_TASKS

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
  await seedTasks(store);
  const [poles, members, posts, events, tasks, meetings] = await Promise.all([
    store.get("poles", { type: "json" }),
    store.get("members", { type: "json" }),
    loadAll("post/"),
    loadAll("event/"),
    loadAll("task/"),
    loadAll("meeting/"),
  ]);
  return { poles: poles || DEFAULT_POLES, members: members || DEFAULT_MEMBERS, posts, events, tasks, meetings };
}

// Charge la feuille de route par défaut une seule fois (ensuite, chacun l'édite librement)
async function seedTasks(store) {
  if (await store.get("tasks-seeded")) return;
  const now = new Date().toISOString();
  for (let i = 0; i < DEFAULT_TASKS.length; i += 25) {
    await Promise.all(
      DEFAULT_TASKS.slice(i, i + 25).map((t) =>
        store.setJSON(`task/${t.id}`, { ...t, done: false, doneBy: "", doneAt: "", createdAt: now })
      )
    );
  }
  await store.setJSON("tasks-seeded", { at: now });
}

export async function makeBackup(store, backups, reason) {
  const data = await readAll(store);
  const savedAt = new Date().toISOString();
  const key = savedAt.replace(/[:.]/g, "-") + "_" + reason;
  await backups.setJSON(key, { savedAt, reason, ...data }, {
    metadata: { savedAt, reason, posts: data.posts.length, events: data.events.length, tasks: data.tasks.length, done: data.tasks.filter((t) => t.done).length, meetings: data.meetings.length },
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
      return json(await readAll(store));
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

    if (req.method === "POST" && res === "tasks") {
      const b = await req.json();
      const item = {
        id: uid(), pole: str(b.pole, 40), title: str(b.title, 500).trim(), due: isoDate(b.due),
        order: Number.isFinite(Number(b.order)) ? Number(b.order) : 999,
        done: false, doneBy: "", doneAt: "", createdBy: str(b.author, 80), createdAt: new Date().toISOString(),
        source: str(b.source, 160), sourceMeeting: str(b.sourceMeeting, 40),
      };
      if (!item.pole || !item.title) return json({ error: "Domaine et intitulé obligatoires" }, 400);
      await store.setJSON(`task/${item.id}`, item);
      return json(item, 201);
    }

    if (req.method === "PATCH" && res === "tasks" && id) {
      const cur = await store.get(`task/${id}`, { type: "json" });
      if (!cur) return json({ error: "Tâche introuvable" }, 404);
      const b = await req.json();
      const next = { ...cur };
      if (typeof b.title === "string" && b.title.trim()) next.title = str(b.title, 500).trim();
      if (typeof b.due === "string") next.due = isoDate(b.due);
      if (typeof b.pole === "string" && b.pole) next.pole = str(b.pole, 40);
      if (typeof b.done === "boolean") {
        next.done = b.done;
        next.doneBy = b.done ? str(b.author, 80) : "";
        next.doneAt = b.done ? new Date().toISOString() : "";
      }
      next.updatedAt = new Date().toISOString();
      await store.setJSON(`task/${id}`, next);
      return json(next);
    }

    if (req.method === "POST" && res === "meetings") {
      const raw = await req.text();
      if (raw.length > 300000) return json({ error: "PV trop volumineux" }, 413);
      const b = JSON.parse(raw);
      const item = { ...b, id: uid(), status: "draft", createdAt: new Date().toISOString() };
      if (!isoDate(item.date)) return json({ error: "Date obligatoire" }, 400);
      await store.setJSON(`meeting/${item.id}`, item);
      return json(item, 201);
    }

    if (req.method === "PUT" && res === "meetings" && id) {
      const cur = await store.get(`meeting/${id}`, { type: "json" });
      if (!cur) return json({ error: "Réunion introuvable" }, 404);
      const raw = await req.text();
      if (raw.length > 300000) return json({ error: "PV trop volumineux" }, 413);
      const b = JSON.parse(raw);
      if (cur.status === "final" && b.status !== "draft") {
        return json({ error: "Ce PV est validé : rouvre-le avant de le modifier" }, 409);
      }
      const next = { ...b, id, createdAt: cur.createdAt, updatedAt: new Date().toISOString() };
      if (!isoDate(next.date)) return json({ error: "Date obligatoire" }, 400);
      await store.setJSON(`meeting/${id}`, next);
      return json(next);
    }

    if (req.method === "DELETE" && (res === "posts" || res === "events" || res === "tasks" || res === "meetings") && id) {
      await store.delete(`${({ posts: "post", events: "event", tasks: "task", meetings: "meeting" })[res]}/${id}`);
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
      for (const prefix of ["post/", "event/", "task/", "meeting/"]) {
        const { blobs } = await store.list({ prefix });
        await Promise.all(blobs.map((b) => store.delete(b.key)));
      }
      await store.setJSON("poles", snap.poles || DEFAULT_POLES);
      await store.setJSON("members", snap.members || DEFAULT_MEMBERS);
      const writes = [
        ...(snap.posts || []).filter((p) => p && p.id).map((p) => [`post/${p.id}`, p]),
        ...(snap.events || []).filter((e) => e && e.id).map((e) => [`event/${e.id}`, e]),
        ...(snap.tasks || []).filter((t) => t && t.id).map((t) => [`task/${t.id}`, t]),
        ...(snap.meetings || []).filter((m) => m && m.id).map((m) => [`meeting/${m.id}`, m]),
      ];
      for (let i = 0; i < writes.length; i += 25) {
        await Promise.all(writes.slice(i, i + 25).map(([k, v]) => store.setJSON(k, v)));
      }
      await store.setJSON("tasks-seeded", { at: new Date().toISOString(), restored: id });
      return json({ ok: true, restored: id });
    }

    return json({ error: "Route inconnue" }, 404);
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
};

export const config = { path: "/api/*" };
