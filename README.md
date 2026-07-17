# Cercle Élite Closing

Application web premium pour une formation francophone de closing commercial —
roleplay IA en temps réel, simulateur d'objections, parcours de formation gamifié
et dashboard de progression.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS** — design system "Voltage" : noir indigo + dégradé violet/corail (`#8a5cf6` / `#ff6b5b`)
- **Framer Motion** — animations
- **lucide-react** — icônes
- API **Anthropic** pour les interactions IA — `claude-haiku-4-5` pour la
  conversation de roleplay (beaucoup d'allers-retours, coût à maîtriser),
  `claude-sonnet-5` pour l'analyse de fin d'appel (un seul appel, qualité
  prioritaire)

## Source de vérité pédagogique

Tout le contenu métier de l'app (roleplays, quiz, objections, profils de
prospects, défis du jour) est basé sur **la méthode Cercle Élite Closing**
(anciennement « Closing Evolution » dans les données brutes),
pas sur du closing générique.

- `lib/data/knowledge-base.json` — base de connaissances brute : les 20
  modules (M0 à MELI) répartis sur 3 niveaux, les 4 profils de prospects
  (émotionnel, analytique, résistant, boss final), le catalogue
  d'objections avec leur vraie cause (argent/peur) et traitement, le
  Framework Split, les défis du jour et les quiz de chaque module.
- `lib/knowledge.js` — couche d'accès (`getModule`, `getObjection`,
  `getProspectProfile`, `getDailyChallengeForDate`, `getRandomBanger`...)
  à utiliser par toute fonctionnalité IA ou pédagogique. **Ne jamais
  hardcoder des objections, profils ou frameworks génériques ailleurs** —
  toujours passer par ce module.

Les prompts système de l'Arena, du Simulateur d'Objections et du Défi du
Jour devront injecter les données pertinentes de `lib/knowledge.js`
(module courant, profil de prospect, objection ciblée, framework attendu)
pour que l'IA reste fidèle à la méthode.

## Coûts API et garde-fous

Phase pilote (5 élèves) : plafond de dépense fixé à 10 €/mois côté console
Anthropic (Settings → Spending limits). Deux protections côté code, en plus
du plafond de compte :

- `lib/anthropic.js` sépare le modèle utilisé pour le chat (`claude-haiku-4-5`,
  moins cher, beaucoup d'appels par session) de celui pour le feedback
  (`claude-sonnet-5`, un seul appel par session, la qualité prime).
- `lib/arena-constants.js` (`ARENA_MAX_MESSAGES`) plafonne chaque session de
  roleplay à 20 messages, contrôlé côté serveur (`app/api/arena/chat/route.js`)
  et reflété côté UI (`components/arena/ArenaChat.jsx`) pour désactiver
  l'input avant que la limite serveur ne rejette la requête.

Quand les comptes élèves existeront, prévoir un quota par élève plutôt qu'un
plafond global.

## Structure du projet

```
app/
  layout.js          # layout racine, fonts (Syne + Inter), metadata
  page.js             # page d'accueil
  globals.css         # design tokens & utilitaires globaux
components/
  ui/                 # primitives réutilisables (Button, Badge, GlowCard...)
  landing/            # sections de la page d'accueil
lib/
  data/knowledge-base.json  # source de vérité pédagogique (voir ci-dessus)
  knowledge.js        # accesseurs sur la base de connaissances
  content.js           # contenu statique de la landing (features, niveaux...)
  anthropic.js         # client API Anthropic (serveur uniquement)
  arena-prompts.js     # prompts système de l'Arena (persona prospect + feedback)
  utils.js             # helpers (cn/clsx)
app/api/arena/
  chat/route.js        # tour de roleplay (le prospect IA répond)
  feedback/route.js    # analyse de fin d'appel (score + feedback structuré)
```

## Design system — Voltage

- **Fond** : noir à dominante indigo (`ink`), cartes en verre dépoli (`.glass`)
- **Couleurs principales** : violet `#8a5cf6` (`volt`) et corail `#ff6b5b` (`coral`),
  combinés en dégradé sur les CTA, logos et accents (`bg-volt-gradient`)
- **Typographie** : Syne (titres, gras/italique) + Inter (texte courant)
- **Formes** : angulaires (rayons de bordure resserrés dans `tailwind.config.js`),
  boutons et badges en italique/majuscules pour l'énergie de la marque
- **Animations** : fade-up au scroll, float, glow au survol, compteurs animés

## Dev local

```bash
cp .env.example .env.local
# Ajoute ta clé ANTHROPIC_API_KEY

npm install
npm run dev
# → http://localhost:3000
```

## Roadmap (fonctionnalité par fonctionnalité)

1. ✅ Structure du projet, design system, page d'accueil
2. ✅ Base de connaissances Cercle Élite Closing intégrée (`lib/knowledge.js`)
3. ✅ Arena du Roleplay — conversation IA temps réel + scoring (`/arena`)
4. ✅ Mindset (`/mindset`) + Message du jour (`components/mindset/MessageOfDay.jsx`)
5. ⏳ Simulateur d'Objections
6. ⏳ Parcours de Formation (modules, quiz, badges)
7. ⏳ Dashboard personnel (progression, classement, streak)
8. ⏳ Défi du Jour

Le "Message du jour" s'affiche dans l'app (Arena, Mindset) mais n'envoie pas
de vraie notification push sur le téléphone — ça demande des comptes élèves
+ un service d'envoi, pas encore construits.

Pas encore construit : comptes élèves, hébergement vidéo des modules, paiement,
emails/notifications automatiques (le plan pour remplacer Systeme.io — voir
discussion).
