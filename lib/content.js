import { Swords, ShieldAlert, Map, LineChart, Flame } from 'lucide-react'

export const features = [
  {
    icon: Swords,
    title: 'Arena du Roleplay',
    tag: 'IA temps réel',
    description:
      'Affronte un prospect émotionnel, analytique, résistant ou le boss final. L’IA garde une vraie personnalité du début à la fin et ne lâche rien facilement.',
    bullets: [
      'Conversation vocale ou texte en temps réel',
      'Score /100 + feedback en 5 points',
      'Relecture phrase par phrase de l’appel',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Simulateur d’Objections',
    tag: 'Entraînement ciblé',
    description:
      '« Je vais réfléchir », « c’est trop cher », « je dois en parler à mon conjoint »... Réponds et l’IA évalue si tu as trouvé la vraie objection derrière.',
    bullets: [
      '5 objections classiques, infiniment rejouables',
      'Détection du framework attendu',
      'Feedback immédiat sur le rythme de ta réponse',
    ],
  },
  {
    icon: Map,
    title: 'Parcours de Formation',
    tag: '3 niveaux, 15+ modules',
    description:
      'Fondations, Pratique Avancée, Élite. Chaque module se débloque après validation d’un quiz. Progression visuelle, badges et niveaux à la clé.',
    bullets: [
      'Closer Junior → Closer Confirmé → Élite → Master',
      'Quiz obligatoire à chaque étape',
      'Modules bonus pour aller plus loin',
    ],
  },
  {
    icon: LineChart,
    title: 'Dashboard Personnel',
    tag: 'Data-driven',
    description:
      'Ton taux de closing semaine par semaine, tes objections les plus ratées, ton classement anonyme face aux autres membres.',
    bullets: [
      'Courbe de progression hebdomadaire',
      'Streak de connexion façon Duolingo',
      'Classement pour créer de l’émulation',
    ],
  },
  {
    icon: Flame,
    title: 'Le Défi du Jour',
    tag: '5 minutes / jour',
    description:
      'Une micro-situation chaque jour : objection surprise, prospect difficile, question de mindset. De quoi tenir l’habitude sans y passer des heures.',
    bullets: [
      'Nouveau défi chaque matin',
      'Classement hebdomadaire',
      'Maintient ta streak active',
    ],
  },
]

export const levels = [
  {
    tier: 'Fondations',
    range: 'M0 → M3',
    title: 'Poser les bases',
    description: 'Mindset, structure d’appel, écoute active, premières prises de parole.',
    rank: 'Closer Junior',
  },
  {
    tier: 'Pratique Avancée',
    range: 'M4 → M10',
    title: 'Construire ton style',
    description: 'Découverte en profondeur, gestion des objections, techniques de closing.',
    rank: 'Closer Confirmé',
  },
  {
    tier: 'Élite',
    range: 'M11 → M15+',
    title: 'Dominer chaque appel',
    description: 'Négociation avancée, deals complexes, modules bonus, mentorat par les pairs.',
    rank: 'Master Closer',
  },
]

export const steps = [
  {
    number: '01',
    title: 'Choisis ton adversaire',
    description: 'Entre dans l’Arena et sélectionne le type de prospect ou l’objection à travailler.',
  },
  {
    number: '02',
    title: 'Closes en conditions réelles',
    description: 'L’IA joue un vrai prospect, avec ses objections, ses doutes, sa personnalité.',
  },
  {
    number: '03',
    title: 'Reçois ton feedback',
    description: 'Score sur 100, analyse en 5 points, et les phrases exactes à améliorer.',
  },
  {
    number: '04',
    title: 'Progresse chaque jour',
    description: 'Débloque des modules, monte de niveau, garde ta streak, grimpe au classement.',
  },
]

export const testimonials = [
  {
    quote:
      'J’ai fait plus de progrès en 3 semaines sur Closing Evolution qu’en 6 mois d’appels réels. L’IA ne me laisse rien passer.',
    name: 'Yanis B.',
    role: 'Closer indépendant',
  },
  {
    quote:
      'Le simulateur d’objections m’a fait comprendre que je répondais toujours trop vite. Mon taux de closing a pris +18% en un mois.',
    name: 'Camille R.',
    role: 'Closer High-Ticket',
  },
  {
    quote:
      'Le défi du jour, c’est devenu un réflexe. 5 minutes le matin et je suis dans le bain avant mes appels.',
    name: 'Malik T.',
    role: 'Setter → Closer',
  },
]

export const stats = [
  { value: 2400, suffix: '+', label: 'Closers formés' },
  { value: 41000, suffix: '+', label: 'Roleplays complétés' },
  { value: 23, suffix: '%', label: 'Taux de closing moyen gagné', prefix: '+' },
  { value: 15, suffix: '', label: 'Modules de formation' },
]
