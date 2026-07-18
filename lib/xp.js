export const XP_REWARDS = {
  module_lesson: 50,
  module_perfect_bonus: 100,
  roleplay_played: 75,
  roleplay_high_score_bonus: 50,
  defi_du_jour: 60,
  daily_login: 20,
  streak_7_bonus: 200,
}

export const LEVELS = [
  { key: 'rookie', label: 'Rookie Closer', min: 0, max: 500 },
  { key: 'junior', label: 'Closer Junior', min: 500, max: 1500 },
  { key: 'confirme', label: 'Closer Confirmé', min: 1500, max: 3500 },
  { key: 'elite', label: 'Closer Élite', min: 3500, max: 7000 },
  { key: 'master', label: 'Master Closer', min: 7000, max: Infinity },
]

export function getLevelForXP(xp) {
  return LEVELS.find((l) => xp >= l.min && xp < l.max) ?? LEVELS[LEVELS.length - 1]
}

export function getLevelProgress(xp) {
  const level = getLevelForXP(xp)
  const nextLevel = LEVELS[LEVELS.indexOf(level) + 1] ?? null
  const span = level.max === Infinity ? 1 : level.max - level.min
  const percent = level.max === Infinity ? 100 : Math.min(100, Math.round(((xp - level.min) / span) * 100))
  return { level, nextLevel, percent }
}
