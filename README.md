# 🍊 La Méthode Pamplemousse — Outil Closers

Formulaire interne + dashboard pour les 6 closers.

---

## 🚀 Déploiement en 3 étapes

### Étape 1 — Créer la base Supabase (5 min)

1. Va sur [supabase.com](https://supabase.com) → **New Project**
2. Nomme le projet `pamplemousse` → note le mot de passe DB
3. Une fois le projet créé : **SQL Editor** → **New Query**
4. Colle le contenu de `supabase-schema.sql` → **Run**
5. Va dans **Project Settings** → **API** → copie :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Étape 2 — Déployer sur Vercel (2 min)

1. Va sur [vercel.com](https://vercel.com) → **Add New Project**
2. Importe ce repo GitHub
3. Dans **Environment Variables**, ajoute :
   - `NEXT_PUBLIC_SUPABASE_URL` = l'URL Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = la clé anon
4. Clique **Deploy** → attends 1-2 min

### Étape 3 — C'est prêt ✅

- **Formulaire closers** : `https://votre-app.vercel.app/`
- **Dashboard** : `https://votre-app.vercel.app/dashboard`
- **Mot de passe dashboard** : `pamplemousse2024`

---

## 🛠 Dev local

```bash
cp .env.example .env.local
# Remplis les variables Supabase

npm install
npm run dev
# → http://localhost:3000
```

---

## 📊 Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| Formulaire 30 questions | 6 sections, sliders, boutons toggle |
| Dashboard protégé | Mot de passe : `pamplemousse2024` |
| Graphique maturité | Chaud/Tiède/Froid en donut |
| Graphique freins | Financier, peur, temps, conjoint |
| Graphique closers | Appels par closer |
| Fiches individuelles | Vue détaillée par prospect |
| Export CSV | Toutes les données en un clic |
| Recherche & filtres | Par prospect, closer, maturité |
