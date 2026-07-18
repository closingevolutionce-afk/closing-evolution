import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

// Promeut le compte courant en 'admin' si son email figure dans ADMIN_EMAILS.
// Appelé juste après l'inscription — évite de coder les emails en dur en SQL.
export async function POST() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non connecté' }, { status: 401 })
  }

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

  if (!adminEmails.includes(user.email.toLowerCase())) {
    return NextResponse.json({ promoted: false })
  }

  const admin = getSupabaseAdminClient()
  await admin.from('profiles').update({ role: 'admin' }).eq('id', user.id)

  return NextResponse.json({ promoted: true })
}
