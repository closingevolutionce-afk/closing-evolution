# Closing Evolution

Application web premium pour une formation francophone de closing commercial —
roleplay IA en temps réel, simulateur d'objections, parcours de formation gamifié
et dashboard de progression.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS** — design system sombre, vert émeraude (`#4ade80`)
- **Framer Motion** — animations
- **lucide-react** — icônes
- API **Anthropic** (`claude-sonnet-4-6`) pour les interactions IA (roleplay,
  objections, feedback)

## Source de vérité pédagogique

Tout le contenu métier de l'app (roleplays, quiz, objections, profils de
prospects, défis du jour) est basé sur **la méthode Closing Evolution**,
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

## Structure du projet

```
app/
  layout.js          # layout racine, fonts (Sora + Inter), metadata
  page.js             # page d'accueil
  globals.css         # design tokens & utilitaires globaux
components/
  ui/                 # primitives réutilisables (Button, Badge, GlowCard...)
  landing/            # sections de la page d'accueil
lib/
  data/knowledge-base.json  # source de vérité pédagogique (voir ci-dessus)
  knowledge.js        # accesseurs sur la base de connaissances
  content.js           # contenu statique de la landing (features, niveaux...)
  utils.js             # helpers (cn/clsx)
```

## Design system

- **Fond** : quasi-noir (`ink`), cartes en verre dépoli (`.glass`)
- **Couleur principale** : vert émeraude `#4ade80` (glows, CTA, accents)
- **Typographie** : Sora (titres) + Inter (texte courant)
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
2. ✅ Base de connaissances Closing Evolution intégrée (`lib/knowledge.js`)
3. ⏳ Arena du Roleplay — conversation IA temps réel + scoring
4. ⏳ Simulateur d'Objections
5. ⏳ Parcours de Formation (modules, quiz, badges)
6. ⏳ Dashboard personnel (progression, classement, streak)
7. ⏳ Défi du Jour
