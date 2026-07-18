// Diagnostic pour repérer un caractère hors ISO-8859-1 collé par erreur
// dans une variable d'environnement NEXT_PUBLIC_* (casse fréquente : collage
// depuis un tableau de bord qui introduit un caractère invisible).
export function findInvalidHeaderChar(label, value) {
  if (!value) return `${label} est vide ou absente.`
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i)
    if (code > 255) {
      const char = value[i]
      return `${label} contient un caractère invalide à la position ${i} : "${char}" (code U+${code.toString(16).toUpperCase().padStart(4, '0')}). Longueur totale : ${value.length}.`
    }
  }
  return `${label} semble propre (longueur ${value.length}, aucun caractère hors ISO-8859-1).`
}

export function diagnoseSupabaseEnv() {
  return [
    findInvalidHeaderChar('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    findInvalidHeaderChar('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  ].join(' | ')
}
