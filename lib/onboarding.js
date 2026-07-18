export const ONBOARDING_QUESTIONS = [
  {
    key: 'niveau_actuel',
    question: 'Quel est ton niveau actuel en closing ?',
    options: [
      { value: 'debutant', label: 'Je débute (0 appels)' },
      { value: 'quelques_appels', label: 'J\'ai quelques appels mais je close peu' },
      { value: 'regulier', label: 'Je close régulièrement mais je veux progresser' },
      { value: 'deja_bon', label: 'Je suis déjà bon mais je veux atteindre l\'élite' },
    ],
  },
  {
    key: 'type_offre',
    question: 'Sur quel type d\'offre tu closes ou tu veux closer ?',
    options: [
      { value: 'coaching', label: 'Coaching' },
      { value: 'formation', label: 'Formation en ligne' },
      { value: 'immobilier', label: 'Immobilier' },
      { value: 'business', label: 'Business et entrepreneuriat' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    key: 'challenge_principal',
    question: 'Quel est ton plus gros challenge en ce moment ?',
    options: [
      { value: 'ne_sait_pas', label: 'Je sais pas par où commencer' },
      { value: 'objections', label: 'J\'ai du mal avec les objections' },
      { value: 'discovery', label: 'Ma discovery est trop superficielle' },
      { value: 'controle_appel', label: 'Je perds le contrôle de l\'appel' },
      { value: 'closes_pas_assez', label: 'Je close pas assez souvent' },
    ],
  },
  {
    key: 'appels_semaine',
    question: 'Combien d\'appels tu fais par semaine ?',
    options: [
      { value: '0', label: '0' },
      { value: '1-3', label: '1 à 3' },
      { value: '4-7', label: '4 à 7' },
      { value: '8+', label: '8 et plus' },
    ],
  },
  {
    key: 'objectif_3_mois',
    question: 'Quel est ton objectif dans les 3 prochains mois ?',
    options: [
      { value: 'premiers_closes', label: 'Faire mes premiers closes' },
      { value: '5000', label: 'Atteindre 5000€/mois' },
      { value: '10000', label: 'Atteindre 10 000€/mois' },
      { value: 'head_of_sales', label: 'Devenir Head of Sales' },
    ],
  },
]

const CHALLENGE_FOCUS = {
  ne_sait_pas: ['M0', 'M1', 'M2'],
  objections: ['M0', 'M6', 'M6BIS'],
  discovery: ['M0', 'M5'],
  controle_appel: ['M0', 'M7', 'M6'],
  closes_pas_assez: ['M0', 'M10', 'M11'],
}

const NIVEAU_LABELS = {
  debutant: 'tu débutes',
  quelques_appels: 'tu as déjà quelques appels au compteur',
  regulier: 'tu closes déjà régulièrement',
  deja_bon: 'tu es déjà solide',
}

const OBJECTIF_LABELS = {
  premiers_closes: 'faire tes premiers closes',
  5000: 'atteindre 5000€/mois',
  10000: 'atteindre 10 000€/mois',
  head_of_sales: 'devenir Head of Sales',
}

/**
 * Le parcours reste strictement séquentiel (M0 → MELI, quiz à 100% pour débloquer
 * la suite) — cette fonction ne recommande pas de sauter des modules, elle indique
 * ceux sur lesquels porter une attention particulière une fois qu'on y arrive.
 */
export function getRecommendedPath(answers) {
  const focus = CHALLENGE_FOCUS[answers.challenge_principal] ?? ['M0']
  const path = [...focus]

  if (answers.niveau_actuel === 'deja_bon' && !path.includes('MELI')) {
    path.push('MAMB', 'M13', 'MELI')
  }

  return path
}

export function getWelcomeMessage(prenom, answers) {
  const niveau = NIVEAU_LABELS[answers.niveau_actuel] ?? ''
  const objectif = OBJECTIF_LABELS[answers.objectif_3_mois] ?? ''

  return `${prenom}, ${niveau} — et ton objectif des 3 prochains mois, c'est ${objectif}. On a construit ton parcours en conséquence : commence par M0, puis porte une attention particulière aux modules qu'on t'a mis en avant plus bas. Chaque module se débloque une fois le précédent validé à 100% — pas de raccourci, juste une vraie progression.`
}
