import { HelpCircle, Euro, Users, Scale } from 'lucide-react'

// Ligne parlée du prospect pour chaque objection — sert d'ouverture de l'exercice,
// pas besoin d'appel IA pour ça (l'objection elle-même vient telle quelle de la méthode).
export const objectionLines = {
  'je vais reflechir': 'Écoute, je vais y réfléchir de mon côté et je te recontacte.',
  'trop cher': 'Honnêtement, c’est trop cher pour moi en ce moment.',
  'mon conjoint': 'Je dois en parler à mon/ma conjoint(e) avant de me décider.',
  'je veux comparer': 'Je préfère comparer avec d’autres options avant de choisir.',
}

export const objectionIcons = {
  'je vais reflechir': HelpCircle,
  'trop cher': Euro,
  'mon conjoint': Users,
  'je veux comparer': Scale,
}

// Les clés de la base de connaissances contiennent des espaces — jamais utilisables
// telles quelles dans une URL (Next.js gère mal la navigation client sur un segment
// avec %20). On route donc sur un slug propre, et on résout vers la vraie clé côté serveur.
export const objectionSlugs = {
  'je vais reflechir': 'je-vais-reflechir',
  'trop cher': 'trop-cher',
  'mon conjoint': 'mon-conjoint',
  'je veux comparer': 'je-veux-comparer',
}

export const slugToObjectionKey = Object.fromEntries(
  Object.entries(objectionSlugs).map(([key, slug]) => [slug, key])
)
