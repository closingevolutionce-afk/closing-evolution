# Closing Evolution

Application web premium pour une formation francophone de closing commercial —
roleplay IA en temps réel, simulateur d'objections, parcours de formation gamifié
et dashboard de progression.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — design system sombre, vert émeraude (`#4ade80`)
- **Framer Motion** — animations
- **lucide-react** — icônes
- API **Anthropic** (`claude-sonnet-4-6`) pour les interactions IA (roleplay,
  objections, feedback)

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
  content.js          # contenu statique de la landing (features, niveaux...)
  utils.js            # helpers (cn/clsx)
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
2. ⏳ Arena du Roleplay — conversation IA temps réel + scoring
3. ⏳ Simulateur d'Objections
4. ⏳ Parcours de Formation (modules, quiz, badges)
5. ⏳ Dashboard personnel (progression, classement, streak)
6. ⏳ Défi du Jour
