import kb from '@/lib/data/knowledge-base.json'

/**
 * Source de vérité unique pour tout le contenu pédagogique de l'app :
 * roleplays, quiz, objections, profils de prospects, défis du jour.
 * Toute génération IA (Arena, simulateur d'objections, défi du jour)
 * doit s'appuyer sur ces données — jamais sur du closing générique.
 */
export const meta = kb.meta

export const levels = kb.architecture.niveaux.map((niveau) => ({
  ...niveau,
  modules: niveau.modules.map((id) => ({ id, ...kb.modules[id] })),
}))

export const modules = kb.modules

export function getModule(id) {
  return kb.modules[id] ?? null
}

export function getLevel(id) {
  return levels.find((level) => level.id === id) ?? null
}

export function getLevelForModule(moduleId) {
  return levels.find((level) => level.modules.some((m) => m.id === moduleId)) ?? null
}

export const totalModuleCount = Object.keys(kb.modules).length

export const prospectProfiles = kb.profils_prospects

export function getProspectProfile(key) {
  return kb.profils_prospects[key] ?? null
}

export const prospectProfileKeys = Object.keys(kb.profils_prospects)

// Catalogue d'objections consolidé depuis M6 (traitement) et M6BIS (Framework Split),
// utilisé tel quel par le Simulateur d'Objections.
export const objections = Object.entries(kb.modules.M6.objections_principales).map(
  ([key, value]) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    ...value,
  })
)

export function getObjection(key) {
  return objections.find((o) => o.key === key) ?? null
}

export const framework_split = kb.modules.M6BIS.framework_split
export const postureStoique = kb.modules.M6.posture_stoique

export const dailyChallenges = kb.defi_du_jour

export function getDailyChallenge(id) {
  return dailyChallenges.find((d) => d.id === id) ?? null
}

export function getDailyChallengeForDate(date = new Date()) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 86400000
  )
  return dailyChallenges[dayOfYear % dailyChallenges.length]
}

export const bangers = kb.bangers_globaux

export function getRandomBanger() {
  return bangers[Math.floor(Math.random() * bangers.length)]
}

export default kb
