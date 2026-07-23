import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

// Vérifie que l'appelant est connecté et a l'accès complet (pas 'apercu').
// Les pages sont déjà protégées par le middleware, mais /api/arena et
// /api/objections sont hors de son périmètre (streaming/perf) — sans ce
// garde-fou, un accès limité pourrait quand même déclencher des appels IA
// facturés en appelant l'API directement.
export async function requireFullAccess() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { ok: false, status: 401, error: 'Non connecté.' }
  }

  const admin = getSupabaseAdminClient()
  const { data: profile } = await admin
    .from('profiles')
    .select('access_level')
    .eq('id', user.id)
    .single()

  if (profile?.access_level && profile.access_level !== 'complet') {
    return {
      ok: false,
      status: 403,
      error: "Cette fonctionnalité se débloque une fois l'inscription finalisée.",
    }
  }

  return { ok: true, user }
}
