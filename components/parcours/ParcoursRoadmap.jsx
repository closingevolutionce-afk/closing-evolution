'use client'

import { Flame, GraduationCap, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import MessageOfDay from '@/components/mindset/MessageOfDay'
import ModuleCard from '@/components/parcours/ModuleCard'
import { levels, totalModuleCount } from '@/lib/knowledge'
import { getLevelStats, isModuleUnlocked, useProgress } from '@/lib/progress'
import { useStreak } from '@/lib/streak'

const LEVEL_ACCENT = {
  fondations: 'text-volt',
  pratique: 'text-coral',
  elite: 'text-amber',
}

export default function ParcoursRoadmap() {
  const { completed, rank } = useProgress()
  const streak = useStreak()

  const totalDone = Object.keys(completed).length
  const totalPercent = totalModuleCount ? Math.round((totalDone / totalModuleCount) * 100) : 0

  return (
    <>
      <Container className="relative">
        <Badge icon={GraduationCap}>Parcours de Formation</Badge>
        <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
          20 modules pour devenir un <span className="gradient-text">closer d'élite</span>.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-muted">
          Fondations, pratique avancée, élite : progresse module par module, valide chaque quiz à
          100% et débloque la suite. Tout ce qu'il faut pour fermer comme un pro en 3 mois.
        </p>

        <MessageOfDay className="mt-8 max-w-xl" />

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-ink-border bg-ink-100/60 px-5 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-coral/15 text-coral">
              <Flame size={18} />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-mist-dim">Série en cours</p>
              <p className="font-display text-sm font-bold text-white">
                {streak} {streak > 1 ? 'jours' : 'jour'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-ink-border bg-ink-100/60 px-5 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-volt/15 text-volt">
              <Trophy size={18} />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-mist-dim">Rang actuel</p>
              <p className="font-display text-sm font-bold text-white">{rank ?? 'Aucun rang'}</p>
            </div>
          </div>

          <div className="flex min-w-[220px] flex-1 flex-col justify-center rounded-lg border border-ink-border bg-ink-100/60 px-5 py-3.5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-mist-dim">
              <span>Progression totale</span>
              <span>
                {totalDone}/{totalModuleCount}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-200">
              <div
                className="h-full rounded-full bg-volt-gradient transition-all duration-700"
                style={{ width: `${totalPercent}%` }}
              />
            </div>
          </div>
        </div>
      </Container>

      {levels.map((level, levelIndex) => {
        const stats = getLevelStats(level, completed)
        return (
          <Container key={level.id} className="relative mt-20">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink-border pb-6">
              <div>
                <span
                  className={`font-display text-xs font-bold italic uppercase tracking-[0.25em] ${LEVEL_ACCENT[level.id]}`}
                >
                  {level.nom}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {level.id === 'fondations' && 'Poser les bases'}
                  {level.id === 'pratique' && "Passer à l'action"}
                  {level.id === 'elite' && 'Viser le sommet'}
                </h2>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-xs font-medium text-mist-dim">
                  {stats.done}/{stats.total} modules
                </span>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-ink-200">
                  <div
                    className="h-full rounded-full bg-volt-gradient transition-all duration-700"
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {level.modules.map((moduleData, i) => (
                <ModuleCard
                  key={moduleData.id}
                  moduleData={moduleData}
                  unlocked={isModuleUnlocked(moduleData.id, completed)}
                  done={Boolean(completed[moduleData.id])}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </Container>
        )
      })}
    </>
  )
}
