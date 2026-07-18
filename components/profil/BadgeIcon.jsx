import { Award, Crown, Flag, Flame, Sparkles, Swords, Target, Trophy, Zap } from 'lucide-react'

const ICONS = {
  swords: Swords,
  flag: Flag,
  target: Target,
  flame: Flame,
  trophy: Trophy,
  crown: Crown,
  zap: Zap,
  sparkles: Sparkles,
  award: Award,
}

export default function BadgeIcon({ icon, size = 20 }) {
  const Icon = ICONS[icon] ?? Award
  return <Icon size={size} />
}
