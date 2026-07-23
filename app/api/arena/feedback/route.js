import { NextResponse } from 'next/server'
import { getAnthropicClient, ARENA_FEEDBACK_MODEL, describeAnthropicError } from '@/lib/anthropic'
import { ARENA_FEEDBACK_SYSTEM, ARENA_FEEDBACK_SCHEMA, getPersonaName } from '@/lib/arena-prompts'
import { prospectProfileKeys } from '@/lib/knowledge'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { awardXP, awardBadge, createNotification } from '@/lib/supabase/award-xp'
import { XP_REWARDS } from '@/lib/xp'
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

    try {
      const supabase = await getSupabaseServerClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const admin = getSupabaseAdminClient()
        const { count: priorCount } = await admin
          .from('roleplay_sessions')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)

        await admin.from('roleplay_sessions').insert({
          user_id: user.id,
          profile_key: profile,
          score: data.score,
          feedback: data,
        })

        let xpGained = XP_REWARDS.roleplay_played
        if (data.score >= 80) xpGained += XP_REWARDS.roleplay_high_score_bonus
        await awardXP(user.id, xpGained, `roleplay_${profile}`)

        if (!priorCount) await awardBadge(user.id, 'dans_larene')
        if (data.score >= 90) {
          await awardBadge(user.id, 'sharp_closer')
          await createNotification(user.id, {
            type: 'felicitations',
            title: 'Score exceptionnel',
            body: `${data.score}/100 face à ${getPersonaName(profile)} — badge Sharp Closer débloqué.`,
            link: '/arena',
          })
        }
      }
    } catch (recordError) {
      // Ne bloque jamais l'affichage du feedback si l'enregistrement échoue.
      console.error('Arena session recording error:', recordError)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Arena feedback error:', error)
    return NextResponse.json(
      { error: describeAnthropicError(error) || "L'analyse a échoué. Réessaie dans un instant." },
      { status: 502 }
    )
  }
}
