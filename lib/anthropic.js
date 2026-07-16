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

export const ARENA_MODEL = 'claude-sonnet-5'
