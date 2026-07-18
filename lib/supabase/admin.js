import { createClient } from '@supabase/supabase-js'

let client

/**
 * Client Supabase avec la clé service_role — contourne le RLS.
 * Usage strictement serveur (routes API de confiance : attribution XP,
 * actions coach, etc.). Ne jamais importer depuis un composant client.
 */
export function getSupabaseAdminClient() {
  if (!client) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error(
        'SUPABASE_SERVICE_ROLE_KEY manquante — ajoute-la dans .env.local (voir .env.example).'
      )
    }
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
  }
  return client
}
