import { NextResponse } from 'next/server'
import { getAnthropicClient, ARENA_CHAT_MODEL, describeAnthropicError } from '@/lib/anthropic'
import { buildArenaSystemPrompt } from '@/lib/arena-prompts'
import { prospectProfileKeys } from '@/lib/knowledge'
import { ARENA_MAX_MESSAGES } from '@/lib/arena-constants'
import { requireFullAccess } from '@/lib/require-full-access'

export async function POST(request) {
  const access = await requireFullAccess()
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const { profile, messages } = body

  if (!prospectProfileKeys.includes(profile)) {
    return NextResponse.json({ error: 'Profil de prospect invalide.' }, { status: 400 })
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Aucun message fourni.' }, { status: 400 })
  }
  if (messages.length > ARENA_MAX_MESSAGES) {
    return NextResponse.json(
      { error: 'Cet appel a atteint sa durée maximale. Termine-le pour voir ton feedback.', limitReached: true },
      { status: 400 }
    )
  }

  const system = buildArenaSystemPrompt(profile)

  try {
    const client = getAnthropicClient()
    const response = await client.messages.create({
      model: ARENA_CHAT_MODEL,
      max_tokens: 400,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    return NextResponse.json({ reply: textBlock?.text ?? '' })
  } catch (error) {
    console.error('Arena chat error:', error)
    return NextResponse.json(
      { error: describeAnthropicError(error) || "L'IA n'a pas pu répondre. Réessaie dans un instant." },
      { status: 502 }
    )
  }
}
