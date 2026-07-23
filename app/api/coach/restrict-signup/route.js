import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

// Enregistre un email à restreindre AVANT que la personne ne s'inscrive —
// utile pour un élève dont l'inscription n'est pas finalisée (ex. acompte
// versé). handle_new_user() applique ce niveau d'accès au lieu du défaut
// 'complet' dès la création du compte.
export async function POST(request) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non connecté.' }, { status: 401 })
  }

  const { data: caller } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (caller?.role !== 'admin') {
    return NextResponse.json({ error: 'Réservé aux coachs.' }, { status: 403 })
  }

  const { email, accessLevel } = await request.json()
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''

  if (!cleanEmail || !cleanEmail.includes('@') || !['aucun', 'apercu'].includes(accessLevel)) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const admin = getSupabaseAdminClient()
  const { error } = await admin
    .from('restricted_signups')
    .upsert({ email: cleanEmail, access_level: accessLevel, created_by: user.id })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
