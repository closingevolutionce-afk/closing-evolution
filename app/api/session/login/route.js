import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { awardXP, awardBadge } from '@/lib/supabase/award-xp'
import { XP_REWARDS } from '@/lib/xp'

function toDateStr(date) {
  return date.toISOString().slice(0, 10)
}

export async function POST() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
  }

  const admin = getSupabaseAdminClient()
  const today = toDateStr(new Date())

  const { data: profile } = await admin
    .from('profiles')
    .select('last_login_date, login_streak, login_count')
    .eq('id', user.id)
    .single()

  if (profile?.last_login_date === today) {
    return NextResponse.json({ streak: profile.login_streak, alreadyRecorded: true })
  }

  const yesterday = toDateStr(new Date(Date.now() - 86400000))
  const streak = profile?.last_login_date === yesterday ? (profile.login_streak ?? 0) + 1 : 1

  await admin
    .from('profiles')
    .update({
      login_streak: streak,
      last_login_date: today,
      login_count: (profile?.login_count ?? 0) + 1,
    })
    .eq('id', user.id)

  let newXP = await awardXP(user.id, XP_REWARDS.daily_login, 'daily_login')

  if (streak >= 7 && streak % 7 === 0) {
    newXP = await awardXP(user.id, XP_REWARDS.streak_7_bonus, 'streak_7_bonus')
    await awardBadge(user.id, 'unstoppable')
  }

  return NextResponse.json({ streak, xp: newXP })
}
