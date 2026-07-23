import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

// Permet à un coach (admin) de basculer un élève entre accès 'apercu'
// (acompte versé, solde en attente) et 'complet'.
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

  const { studentId, accessLevel } = await request.json()
  if (!studentId || !['apercu', 'complet'].includes(accessLevel)) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const admin = getSupabaseAdminClient()
  const { error } = await admin
    .from('profiles')
    .update({ access_level: accessLevel })
    .eq('id', studentId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
