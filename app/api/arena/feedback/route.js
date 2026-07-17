import { NextResponse } from 'next/server'
import { getAnthropicClient, ARENA_FEEDBACK_MODEL } from '@/lib/anthropic'
import { ARENA_FEEDBACK_SYSTEM, ARENA_FEEDBACK_SCHEMA, getPersonaName } from '@/lib/arena-prompts'
import { prospectProfileKeys } from '@/lib/knowledge'

export async function POST(request) {
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
  if (!Array.isArray(messages) || messages.length < 2) {
    return NextResponse.json(
      { error: "L'appel est trop court pour être analysé." },
      { status: 400 }
    )
  }

  const transcript = messages
    .map((m) => `${m.role === 'user' ? 'CLOSER' : 'PROSPECT'} : ${m.content}`)
    .join('\n')

  try {
    const client = getAnthropicClient()
    const response = await client.messages.create({
      model: ARENA_FEEDBACK_MODEL,
      max_tokens: 2048,
      output_config: { format: { type: 'json_schema', schema: ARENA_FEEDBACK_SCHEMA } },
      system: ARENA_FEEDBACK_SYSTEM,
      messages: [
        {
          role: 'user',
          content: `Voici la transcription de l'appel face à un prospect "${getPersonaName(profile)}" :\n\n${transcript}`,
        },
      ],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const data = JSON.parse(textBlock.text)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Arena feedback error:', error)
    return NextResponse.json(
      { error: "L'analyse a échoué. Réessaie dans un instant." },
      { status: 502 }
    )
  }
}
