import { getSupabaseAdminClient } from '@/lib/supabase/admin'

/**
 * Attribue de l'XP à un élève et journalise l'événement — usage serveur
 * uniquement (routes API de confiance). Retourne le nouveau total d'XP.
 */
export async function awardXP(userId, amount, reason) {
  if (!amount) return null
  const admin = getSupabaseAdminClient()
  await admin.from('xp_events').insert({ user_id: userId, amount, reason })
  const { data, error } = await admin.rpc('increment_xp', { uid: userId, amount })
  if (error) throw error
  return data
}

/**
 * Attribue un badge s'il n'est pas déjà obtenu. Ne fait rien en silence si
 * le badge est déjà présent (contrainte primary key sur user_badges).
 */
export async function awardBadge(userId, slug) {
  const admin = getSupabaseAdminClient()
  const { error } = await admin
    .from('user_badges')
    .insert({ user_id: userId, badge_slug: slug })
  if (error && error.code !== '23505') throw error // 23505 = déjà obtenu, on ignore
}

export async function createNotification(userId, { type, title, body, link }) {
  const admin = getSupabaseAdminClient()
  await admin.from('notifications').insert({ user_id: userId, type, title, body, link })
}

export async function postCommunityEvent(message) {
  const admin = getSupabaseAdminClient()
  await admin.from('community_feed').insert({ message })
}
