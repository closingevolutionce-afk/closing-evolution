import data from '@/lib/data/interactive-content.json'

/**
 * Contenu interactif complémentaire à la base de connaissances principale :
 * flashcards de révision, mises en situation, défis du jour et citations mindset.
 */

export function getFlashcards(moduleId) {
  return data.flash_cards[moduleId] ?? []
}

export const situations = data.situations

export function getSituationsForModule(moduleId) {
  return situations.filter((s) => s.module === moduleId)
}

export const dailyChallenges = data.defis_du_jour

export function getChallengeForDate(date = new Date()) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 86400000
  )
  return dailyChallenges[dayOfYear % dailyChallenges.length]
}

export const citations = data.citations_mindset

export function getCitationForDate(date = new Date()) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 86400000
  )
  return citations[dayOfYear % citations.length]
}
