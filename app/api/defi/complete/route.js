import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { awardXP, awardBadge } from '@/lib/supabase/award-xp'
import { XP_REWARDS } from '@/lib/xp'
import { requireFullAccess } from '@/lib/require-full-access'

function toDateStr(date) {
  return date.toISOString().slice(0, 10)
}

export async function POST(request) {
  const access = await requireFullAccess()
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status })
  }
  const { user } = access

  const { defiId } = await request.json()
  const admin = getSupabaseAdminClient()
  const today = toDateStr(new Date())

  const { data: profile } = await admin
    .from('profiles')
    .select('last_defi_date, defi_streak')
    .eq('id', user.id)
    .single()

  if (profile?.last_defi_date === today) {
    return NextResponse.json({ alreadyDone: true, streak: profile.defi_streak })
  }

  const yesterday = toDateStr(new Date(Date.now() - 86400000))
  const streak = profile?.last_defi_date === yesterday ? (profile.defi_streak ?? 0) + 1 : 1

  await admin
    .from('defi_completions')
    .insert({ user_id: user.id, defi_id: defiId ?? 0, completed_on: today })

  await admin
    .from('profiles')
    .update({ defi_streak: streak, last_defi_date: today })
    .eq('id', user.id)

  const newXP = await awardXP(user.id, XP_REWARDS.defi_du_jour, 'defi_du_jour')

  if (streak >= 7 && streak % 7 === 0) {
    await awardBadge(user.id, 'weekly_champion')
  }

  return NextResponse.json({ streak, xpGained: XP_REWARDS.defi_du_jour, xp: newXP })
}
