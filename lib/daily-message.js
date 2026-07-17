import { bangers } from '@/lib/knowledge'

const encouragements = [
  "Un appel raté n'est pas un échec — c'est une donnée. Note-la, ajuste, recommence.",
  'La confiance ne précède pas l’action. Elle la suit.',
  "Le closer moyen espère que ça se passe bien. Toi, tu t'y prépares.",
  'Chaque objection que tu entends est une question à laquelle tu n’as pas encore répondu assez tôt.',
  'Tu ne perds jamais un deal en posant une question de trop — tu en perds en n’en posant pas assez.',
  "Aujourd'hui, un seul appel bien mené vaut plus que dix appels bâclés.",
  'Le silence après ta question fait plus de travail que la question elle-même.',
  'Personne ne devient closer d’élite en évitant les appels difficiles.',
  'Ta discipline du matin décide de ta performance de l’après-midi.',
  "L'échec d'aujourd'hui est juste le brouillon du closing de demain.",
  'Tu n’as pas besoin de te sentir prêt. Tu as besoin de décrocher.',
  'Le prospect ne se souvient pas de ton script — il se souvient de comment tu l’as fait se sentir compris.',
  'Progresser, c’est choisir l’inconfort avant qu’il ne te soit imposé.',
  'Un bon closer n’argumente pas plus fort — il questionne mieux.',
  'La régularité bat le talent quand le talent ne montre pas.',
  'Ce n’est pas le prospect qui décide si tu es légitime. C’est toi.',
]

const messages = [...bangers, ...encouragements]

export function getMessageOfTheDay(date = new Date()) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000)
  return messages[dayOfYear % messages.length]
}
