import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Client Supabase pour Server Components / Route Handlers — respecte la
// session de l'utilisateur connecté (RLS appliqué comme côté client).
export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // appelé depuis un Server Component — le middleware gère déjà le refresh
          }
        },
      },
    }
  )
}
