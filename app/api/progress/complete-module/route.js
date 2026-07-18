import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { awardXP, awardBadge, createNotification, postCommunityEvent } from '@/lib/supabase/award-xp'
import { XP_REWARDS } from '@/lib/xp'
import { moduleOrder, getModule } from '@/lib/knowledge'

export async function POST(request) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
  }

  const { moduleId, score, quizTotal, perfect } = await request.json()
  if (!moduleId || !moduleOrder.includes(moduleId)) {
    return NextResponse.json({ error: 'Module invalide' }, { status: 400 })
  }

  const admin = getSupabaseAdminClient()

  const { data: existing } = await admin
    .from('module_progress')
    .select('module_id')
    .eq('user_id', user.id)
    .eq('module_id', moduleId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ alreadyCompleted: true })
  }

  const { count: priorCount } = await admin
    .from('module_progress')
    .select('module_id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  await admin.from('module_progress').insert({
    user_id: user.id,
    module_id: moduleId,
    score,
    quiz_total: quizTotal,
    perfect: Boolean(perfect),
  })

  let xpGained = XP_REWARDS.module_lesson
  if (perfect) {
    xpGained += XP_REWARDS.module_perfect_bonus
    await awardBadge(user.id, 'perfect')
  }
  const newXP = await awardXP(user.id, xpGained, `module_${moduleId}`)

  if (!priorCount) {
    await awardBadge(user.id, 'en_route')
  }
  if (moduleId === 'MELI') {
    await awardBadge(user.id, 'master_closer')
    const { data: profile } = await admin.from('profiles').select('prenom').eq('id', user.id).single()
    await postCommunityEvent(`🎉 ${profile?.prenom ?? 'Un closer'} vient de devenir Master Closer !`)
  }

  const module = getModule(moduleId)
  await createNotification(user.id, {
    type: 'felicitations',
    title: 'Module validé',
    body: `Bravo, tu as validé « ${module?.titre ?? moduleId} » (+${xpGained} XP).`,
    link: `/parcours/${moduleId.toLowerCase()}`,
  })

  const nextId = moduleOrder[moduleOrder.indexOf(moduleId) + 1]
  if (nextId) {
    const nextModule = getModule(nextId)
    await createNotification(user.id, {
      type: 'module_debloque',
      title: 'Nouveau module débloqué',
      body: `« ${nextModule?.titre ?? nextId} » est maintenant accessible.`,
      link: `/parcours/${nextId.toLowerCase()}`,
    })
  }

  return NextResponse.json({ xpGained, xp: newXP })
}
