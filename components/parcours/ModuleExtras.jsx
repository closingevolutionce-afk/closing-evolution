import { Quote } from 'lucide-react'

function Block({ eyebrow, title, children }) {
  return (
    <div className="mt-10">
      {eyebrow && (
        <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
          {eyebrow}
        </p>
      )}
      {title && <h3 className="mt-1.5 font-display text-lg font-bold text-white">{title}</h3>}
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Steps({ items }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-volt/10 text-xs font-bold text-volt">
            {i + 1}
          </span>
          {item.replace(/^\d+\.\s*/, '')}
        </li>
      ))}
    </ol>
  )
}

function Cards({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
          <h4 className="font-display text-sm font-bold text-white">{item.title}</h4>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-mist-muted">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function QuoteBlock({ text }) {
  return (
    <div className="rounded-lg border border-ink-border bg-ink-100/60 p-5">
      <Quote size={18} className="text-volt/50" />
      <p className="mt-3 text-sm italic leading-relaxed text-mist">« {text} »</p>
    </div>
  )
}

function ScriptCard({ label, text }) {
  return (
    <div className="rounded-lg border border-volt/25 bg-volt/5 p-5">
      <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
        {label}
      </p>
      <p className="mt-2 text-sm italic leading-relaxed text-mist">« {text} »</p>
    </div>
  )
}

export default function ModuleExtras({ id, module: m }) {
  switch (id) {
    case 'M1':
      return (
        <Block eyebrow="DISC × Closing" title="Les 4 profils">
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(m.disc).map(([letter, profile]) => (
              <div key={letter} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-volt-gradient font-display text-sm font-bold text-white">
                    {letter}
                  </span>
                  <h4 className="font-display text-sm font-bold text-white">{profile.nom}</h4>
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-mist-dim">
                  {profile.traits.join(' · ')}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{profile.approche}</p>
              </div>
            ))}
          </div>
        </Block>
      )

    case 'M4':
      return (
        <Block eyebrow="Scripts" title="Cadrage d'ouverture">
          <div className="grid gap-4 sm:grid-cols-2">
            <ScriptCard label="Ouverture" text={m.scripts.ouverture} />
            <ScriptCard label="Question d'ouverture" text={m.scripts.question_ouverture} />
          </div>
        </Block>
      )

    case 'M5':
      return (
        <>
          <Block eyebrow="Discovery" title="La chaîne des maillons">
            <p className="text-sm leading-relaxed text-mist-muted">{m.chaine_maillons.definition}</p>
            <div className="mt-5 flex flex-col gap-3">
              {m.chaine_maillons.exemple.map((step) => (
                <div key={step.maillon} className="flex gap-3 rounded-lg border border-ink-border bg-ink-50/60 p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-volt/10 text-xs font-bold text-volt">
                    {step.maillon}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm text-mist-muted">
                      <span className="text-mist-dim">Prospect : </span>« {step.prospect} »
                    </p>
                    <p className="text-sm text-white">
                      <span className="text-mist-dim">Closer : </span>« {step.closer} »
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm italic text-volt">{m.chaine_maillons.regle}</p>
          </Block>
          <Block title="Les 3 niveaux de douleur">
            <div className="grid gap-4 sm:grid-cols-3">
              {m.niveaux_douleur.map((n) => (
                <div key={n.niveau} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                  <span className="font-display text-xs font-bold italic text-volt">
                    Niveau {n.niveau}
                  </span>
                  <h4 className="mt-1 font-display text-sm font-bold text-white">{n.nom}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-mist-muted">{n.description}</p>
                  <p className="mt-2 text-xs italic text-mist-dim">Ex : {n.exemple}</p>
                </div>
              ))}
            </div>
          </Block>
        </>
      )

    case 'M6':
      return (
        <>
          <Block eyebrow="Objections" title="Les objections principales">
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(m.objections_principales).map(([key, o]) => (
                <div key={key} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                  <h4 className="font-display text-sm font-bold capitalize text-white">
                    « {key} »
                  </h4>
                  <p className="mt-2 text-xs uppercase tracking-wide text-volt">
                    {o.vraie_objection}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist-muted">{o.traitement}</p>
                </div>
              ))}
            </div>
          </Block>
          <Block title="Posture stoïque">
            <p className="text-sm leading-relaxed text-mist-muted">{m.posture_stoique.definition}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {m.posture_stoique.regles.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm text-mist">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                  {r}
                </li>
              ))}
            </ul>
          </Block>
        </>
      )

    case 'M6BIS': {
      const fs = m.framework_split
      return (
        <>
          <Block eyebrow="Framework Split" title={fs.question_split}>
            <p className="text-sm leading-relaxed text-mist-muted">{fs.definition}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <h4 className="font-display text-sm font-bold text-white">Cas 1 — Logistique</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{fs.cas_1_logistique.signal}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{fs.cas_1_logistique.traitement}</p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <h4 className="font-display text-sm font-bold text-white">Cas 2 — Peur</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{fs.cas_2_peur.signal}</p>
                <p className="mt-2 text-sm italic text-volt">{fs.cas_2_peur.second_split}</p>
              </div>
            </div>
            <p className="mt-4 text-sm italic text-volt">{fs.regle_or}</p>
          </Block>
          <Block title="Follow-up si non">
            <ul className="flex flex-col gap-2.5">
              {m.followup_non.exemples.map((ex) => (
                <li key={ex} className="rounded-lg border border-ink-border bg-ink-50/60 px-4 py-3 text-sm italic text-mist">
                  « {ex} »
                </li>
              ))}
            </ul>
          </Block>
        </>
      )
    }

    case 'M8':
      return (
        <Block eyebrow="Débrief" title="Les 6 erreurs du closer moyen">
          <ul className="flex flex-col gap-2.5">
            {m.six_erreurs.map((e, i) => (
              <li key={e} className="flex gap-3 rounded-lg border border-ink-border bg-ink-50/60 p-4 text-sm text-mist">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-coral/10 text-xs font-bold text-coral">
                  {i + 1}
                </span>
                {e}
              </li>
            ))}
          </ul>
        </Block>
      )

    case 'M10':
      return (
        <Block eyebrow="Protocole" title="Pre-call (15 minutes)">
          <Steps items={m.protocole_precall} />
        </Block>
      )

    case 'MS':
      return (
        <Block eyebrow="Setting" title="Les 3 CS">
          <Cards
            items={[
              { title: 'Situation actuelle', description: m.trois_cs.situation_actuelle },
              { title: 'Situation désirée', description: m.trois_cs.situation_desiree },
              { title: 'Obstacle', description: m.trois_cs.obstacle },
            ]}
          />
        </Block>
      )

    case 'M11':
      return (
        <Block eyebrow="Après l'appel" title="Message post-call">
          <p className="text-sm leading-relaxed text-mist-muted">{m.message_postcall.regle}</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {m.message_postcall.exemples.map((ex) => (
              <QuoteBlock key={ex} text={ex} />
            ))}
          </div>
          <p className="mt-4 text-xs uppercase tracking-wide text-mist-dim">
            Interdit : {m.message_postcall.interdit.join(' · ')}
          </p>
        </Block>
      )

    case 'M12':
      return (
        <Block eyebrow="Liberté financière" title="Les 3 stades">
          <div className="grid gap-4 sm:grid-cols-3">
            {m.stades_liberte.map((s) => (
              <div key={s.stade} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <span className="font-display text-xs font-bold italic text-volt">
                  Stade {s.stade}
                </span>
                <h4 className="mt-1 font-display text-sm font-bold text-white">{s.nom}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{s.definition}</p>
              </div>
            ))}
          </div>
        </Block>
      )

    case 'M13':
      return (
        <>
          <Block eyebrow="Lecture du prospect" title="Les 3 profils">
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(m.profils).map(([key, p]) => (
                <div key={key} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                  <h4 className="font-display text-sm font-bold capitalize text-white">{key}</h4>
                  <p className="mt-2 text-xs uppercase tracking-wide text-mist-dim">
                    {p.signaux[0]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist-muted">Levier : {p.levier}</p>
                </div>
              ))}
            </div>
          </Block>
          <Block title="Toward vs Away">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-volt/25 bg-volt/5 p-5">
                <h4 className="font-display text-sm font-bold text-volt">Toward</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                  {m.toward_away.toward.approche}
                </p>
              </div>
              <div className="rounded-lg border border-coral/25 bg-coral/5 p-5">
                <h4 className="font-display text-sm font-bold text-coral">Away</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                  {m.toward_away.away.approche}
                </p>
              </div>
            </div>
          </Block>
        </>
      )

    case 'MAMB':
      return (
        <Block eyebrow="Ambition" title="Méthode de chiffrage">
          <Steps items={m.methode_chiffrage} />
        </Block>
      )

    case 'MELI':
      return (
        <>
          <Block eyebrow="Frameworks US" title="SPIN · JOLT · Formule de confiance">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <h4 className="font-display text-sm font-bold text-white">SPIN Selling</h4>
                <p className="mt-2 text-xs text-mist-dim">{m.frameworks.SPIN.source}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">{m.frameworks.SPIN.regle}</p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <h4 className="font-display text-sm font-bold text-white">Jolt Effect</h4>
                <p className="mt-2 text-xs text-mist-dim">{m.frameworks.JOLT.contexte}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                  {m.frameworks.JOLT.fomu_vs_fomo.fomu}
                </p>
              </div>
              <div className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                <h4 className="font-display text-sm font-bold text-white">Formule de confiance</h4>
                <p className="mt-2 text-xs text-mist-dim">{m.frameworks.formule_confiance.source}</p>
                <p className="mt-2 text-sm italic text-volt">{m.frameworks.formule_confiance.formule}</p>
              </div>
            </div>
          </Block>
          <Block title="Techniques (Chris Voss & co)">
            <Cards
              items={[
                { title: 'Miroir', description: m.techniques.miroir.definition },
                { title: 'Labelling', description: m.techniques.labelling.definition },
                { title: 'Aide-moi à comprendre', description: m.techniques.aide_moi_comprendre.definition },
                { title: 'Présuppositions', description: m.techniques.presuppositions.definition },
              ]}
            />
          </Block>
        </>
      )

    default:
      return null
  }
}
