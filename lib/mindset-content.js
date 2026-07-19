import { BadgeCheck, BookOpen, Compass, DoorOpen, Flame, HeartHandshake, Scale, Sparkles, Users, Zap } from 'lucide-react'

export const coreBeliefs = [
  {
    title: 'Je suis légitime',
    description: "Tu n'as pas besoin de permission pour aider quelqu'un à changer de trajectoire.",
    icon: BadgeCheck,
  },
  {
    title: "J'aide vraiment",
    description:
      "Ce que tu vends n'est pas un produit — c'est une transformation que la personne en face ne se donnera pas seule.",
    icon: HeartHandshake,
  },
  {
    title: 'Le prix est juste',
    description:
      'La valeur que tu apportes dépasse largement ce que tu factures. Le prix n’est jamais le vrai sujet.',
    icon: Scale,
  },
  {
    title: 'Le prospect mérite ce changement',
    description: "Il a le droit de vivre la vie qu'il est venu chercher sur cet appel.",
    icon: Sparkles,
  },
  {
    title: "Je contrôle l'appel",
    description: 'Toi tu poses les questions, lui il répond. C’est toi qui mènes, jamais l’inverse.',
    icon: Compass,
  },
  {
    title: 'La décision maintenant est la meilleure',
    description: 'Attendre ne rend jamais une décision plus facile — ça la rend juste plus tardive.',
    icon: Zap,
  },
]

export const weeklyPillars = [
  { title: 'Entourage', description: 'Qui tu fréquentes façonne qui tu deviens.', icon: Users },
  { title: 'Apprentissage', description: 'Une compétence de plus chaque semaine, sans exception.', icon: BookOpen },
  { title: 'Opportunités', description: 'Dire oui à ce qui te pousse hors de ta zone connue.', icon: DoorOpen },
  { title: 'Inconfort volontaire', description: 'Le seul chemin vers la version suivante de toi.', icon: Flame },
]
