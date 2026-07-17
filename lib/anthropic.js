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
