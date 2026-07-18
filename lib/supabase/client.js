'use client'

import { createBrowserClient } from '@supabase/ssr'

let client

// .trim() en défense contre un espace/retour à la ligne collé par erreur
// dans les variables d'environnement (ex. copier-coller depuis un tableau
// de bord) — évite l'erreur fetch "non ISO-8859-1 code point".
export function getSupabaseBrowserClient() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    )
  }
  return client
}
