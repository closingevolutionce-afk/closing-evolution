import Anthropic from '@anthropic-ai/sdk'

let client = null

export function getAnthropicClient() {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error(
        'ANTHROPIC_API_KEY manquante — ajoute-la dans .env.local (voir .env.example).'
      )
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return client
}

// Modèle le moins cher pour la conversation elle-même (beaucoup d'allers-retours) —
// la qualité importe surtout pour la note finale, pas pour chaque réplique du prospect.
export const ARENA_CHAT_MODEL = 'claude-haiku-4-5'

// Modèle le plus précis pour l'analyse de fin d'appel — un seul appel par session,
// où la qualité du coaching compte plus que le coût.
export const ARENA_FEEDBACK_MODEL = 'claude-sonnet-5'

// Traduit les erreurs Anthropic les plus courantes en messages actionnables en
// français, plutôt qu'un message générique qui ne dit pas quoi faire.
export function describeAnthropicError(error) {
  const message = error?.message || ''
  if (message.includes('credit balance is too low')) {
    return "Le compte Anthropic n'a plus de crédit — va dans Plans & Billing sur console.anthropic.com pour en ajouter."
  }
  if (error?.status === 401) {
    return "La clé API Anthropic est invalide ou manquante — vérifie ANTHROPIC_API_KEY dans .env.local."
  }
  if (error?.status === 429) {
    return "Trop de demandes en même temps — réessaie dans quelques secondes."
  }
  return null
}
