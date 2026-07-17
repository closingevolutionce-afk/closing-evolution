import { NextResponse } from 'next/server'
import { getAnthropicClient, ARENA_FEEDBACK_MODEL, describeAnthropicError } from '@/lib/anthropic'
import { buildObjectionEvalSystem, OBJECTION_EVAL_SCHEMA } from '@/lib/objection-prompts'
import { getObjection } from '@/lib/knowledge'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const { objection: objectionKey, response: closerResponse } = body

  if (!getObjection(objectionKey)) {
    return NextResponse.json({ error: 'Objection invalide.' }, { status: 400 })
  }
  if (typeof closerResponse !== 'string' || closerResponse.trim().length < 3) {
    return NextResponse.json({ error: 'Écris une réponse avant de valider.' }, { status: 400 })
  }

  const system = buildObjectionEvalSystem(objectionKey)

  try {
    const client = getAnthropicClient()
    const response = await client.messages.create({
      model: ARENA_FEEDBACK_MODEL,
      max_tokens: 1024,
      output_config: { format: { type: 'json_schema', schema: OBJECTION_EVAL_SCHEMA } },
      system,
      messages: [
        {
          role: 'user',
          content: `Réponse du closer à l'objection : « ${closerResponse.trim()} »`,
        },
      ],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    const data = JSON.parse(textBlock.text)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Objection evaluate error:', error)
    return NextResponse.json(
      { error: describeAnthropicError(error) || "L'analyse a échoué. Réessaie dans un instant." },
      { status: 502 }
    )
  }
}
