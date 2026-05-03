import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const INITIAL_FORM = {
  // Section 1
  prenom_prospect: '',
  age: '',
  situation_familiale: '',
  metier_actuel: '',
  anciennete: '',
  statut: '',
  revenus_mensuels: '',
  bilan_competences: '',
  duree_reflexion: '',
  // Section 2
  raison_rdv: '',
  idee_reconversion: '',
  niveau_souffrance: 5,
  reaction_entourage: '',
  // Section 3
  frein_commence_maintenant: '',
  attente_future: '',
  frein_principal: '',
  details_financier: '',
  influence_decision: '',
  // Section 4
  projection_1_an: '',
  emotion_dominante: '',
  date_importante: '',
  succes_reconversion: '',
  // Section 5
  accroche_methode: '',
  hesitation_methode: '',
  comparaison_offres: '',
  prix_en_tete: '',
  reaction_prix: '',
  // Section 6
  vrai_frein: '',
  niveau_maturite: '',
  urgence_naturelle: '',
  manque_signature: '',
  prenom_closer: '',
  prochaine_action: '',
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(value === opt.value ? '' : opt.value)}
          className={`toggle-btn ${value === opt.value ? 'toggle-btn-active' : 'toggle-btn-inactive'}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function RadioGroup({ options, value, onChange, name }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            value === opt.value
              ? 'border-[#E8613A] bg-[#E8613A]'
              : 'border-[#D4C4B8] group-hover:border-[#E8613A]'
          }`}>
            {value === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span className="text-sm font-medium text-[#3D2B1F]">{opt.label}</span>
        </label>
      ))}
    </div>
  )
}

export default function FormPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const set = (field) => (e) => {
    const val = e && e.target ? e.target.value : e
    setForm((f) => ({ ...f, [field]: val }))
    if (field === 'niveau_souffrance') {
      const pct = ((val - 1) / 9) * 100
      e.target.style.setProperty('--range-progress', `${pct}%`)
    }
  }

  const setDirect = (field, val) => setForm((f) => ({ ...f, [field]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur serveur')
      }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setSubmitted(false)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <>
        <Head><title>Fiche Appel — La Méthode Pamplemousse</title></Head>
        <div className="min-h-screen bg-[#FDF6EE] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-[#F5E8D8] text-center max-w-md w-full">
            <div className="text-6xl mb-4">🍊</div>
            <h2 className="text-2xl font-bold text-[#1C1410] mb-2">Fiche enregistrée !</h2>
            <p className="text-[#6B5548] mb-8">L&apos;appel a bien été sauvegardé dans le dashboard.</p>
            <button onClick={handleReset} className="btn-primary w-full">
              Nouvel appel
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Fiche Appel — La Méthode Pamplemousse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#FDF6EE]">
        {/* Header */}
        <header className="bg-[#1C1410] text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍊</span>
              <div>
                <h1 className="font-bold text-base leading-tight">La Méthode Pamplemousse</h1>
                <p className="text-[#E8613A] text-xs font-medium">Fiche de débriefing appel</p>
              </div>
            </div>
            <Link href="/dashboard" className="text-xs text-white/60 hover:text-[#E8613A] transition-colors font-medium">
              Dashboard →
            </Link>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-8">

          {/* ─── SECTION 1 — PROFIL ─── */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="bg-[#E8613A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
              Profil du prospect
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="question-block mb-0">
                <label className="question-label">Prénom du prospect</label>
                <input className="input-field" type="text" placeholder="ex: Sophie" value={form.prenom_prospect} onChange={set('prenom_prospect')} required />
              </div>
              <div className="question-block mb-0">
                <label className="question-label">Âge</label>
                <input className="input-field" type="text" placeholder="ex: 34 ans" value={form.age} onChange={set('age')} />
              </div>
            </div>

            <div className="question-block">
              <label className="question-label">Situation familiale</label>
              <ToggleGroup
                value={form.situation_familiale}
                onChange={(v) => setDirect('situation_familiale', v)}
                options={[
                  { value: 'celibataire', label: 'Célibataire' },
                  { value: 'en_couple', label: 'En couple' },
                  { value: 'enfants', label: 'Avec enfants' },
                  { value: 'couple_enfants', label: 'Couple + enfants' },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="question-block mb-0">
                <label className="question-label">Métier actuel</label>
                <input className="input-field" type="text" placeholder="ex: Comptable" value={form.metier_actuel} onChange={set('metier_actuel')} />
              </div>
              <div className="question-block mb-0">
                <label className="question-label">Ancienneté dans ce poste</label>
                <input className="input-field" type="text" placeholder="ex: 6 ans" value={form.anciennete} onChange={set('anciennete')} />
              </div>
            </div>

            <div className="question-block mt-5">
              <label className="question-label">Statut professionnel</label>
              <RadioGroup
                name="statut"
                value={form.statut}
                onChange={(v) => setDirect('statut', v)}
                options={[
                  { value: 'cdi', label: 'Salarié CDI' },
                  { value: 'cdd', label: 'CDD' },
                  { value: 'independant', label: 'Indépendant' },
                  { value: 'demandeur_emploi', label: 'Demandeur d\'emploi' },
                ]}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Revenus mensuels nets approximatifs</label>
              <input className="input-field" type="text" placeholder="ex: 2 400 €/mois" value={form.revenus_mensuels} onChange={set('revenus_mensuels')} />
            </div>

            <div className="question-block">
              <label className="question-label">A déjà fait un bilan de compétences ?</label>
              <ToggleGroup
                value={form.bilan_competences}
                onChange={(v) => setDirect('bilan_competences', v)}
                options={[
                  { value: 'oui', label: 'Oui' },
                  { value: 'non', label: 'Non' },
                  { value: 'en_cours', label: 'En cours' },
                ]}
              />
            </div>

            <div className="question-block mb-0">
              <label className="question-label">Depuis combien de temps pense-t-il/elle à changer ?</label>
              <input className="input-field" type="text" placeholder="ex: 2 ans, depuis la naissance de son fils..." value={form.duree_reflexion} onChange={set('duree_reflexion')} />
            </div>
          </div>

          {/* ─── SECTION 2 — DÉCLENCHEUR ─── */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="bg-[#E8613A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
              Déclencheur
            </h2>

            <div className="question-block">
              <label className="question-label">Qu&apos;est-ce qui l&apos;a amené à prendre RDV aujourd&apos;hui ?</label>
              <textarea
                className="textarea-field"
                rows={3}
                placeholder="Note mot pour mot ce qu'il/elle a dit..."
                value={form.raison_rdv}
                onChange={set('raison_rdv')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">A une idée de reconversion en tête ?</label>
              <ToggleGroup
                value={form.idee_reconversion}
                onChange={(v) => setDirect('idee_reconversion', v)}
                options={[
                  { value: 'oui_precise', label: '✅ Oui, précise' },
                  { value: 'vague', label: '🌫️ Vague' },
                  { value: 'flou_total', label: '❓ Flou total' },
                ]}
              />
            </div>

            <div className="question-block">
              <label className="question-label flex items-center justify-between">
                <span>Niveau de souffrance au travail</span>
                <span className="text-[#E8613A] font-bold text-xl">{form.niveau_souffrance}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={form.niveau_souffrance}
                onChange={set('niveau_souffrance')}
                className="w-full mt-2"
                style={{ '--range-progress': `${((form.niveau_souffrance - 1) / 9) * 100}%` }}
              />
              <div className="flex justify-between text-xs text-[#6B5548] mt-1">
                <span>😊 Ça va</span>
                <span>😤 En souffrance</span>
                <span>🔥 Insupportable</span>
              </div>
            </div>

            <div className="question-block mb-0">
              <label className="question-label">En a parlé à son entourage ? Quelle réaction ?</label>
              <textarea
                className="textarea-field"
                rows={3}
                placeholder="Conjoint, famille, amis... comment ont-ils réagi ?"
                value={form.reaction_entourage}
                onChange={set('reaction_entourage')}
              />
            </div>
          </div>

          {/* ─── SECTION 3 — FREINS ─── */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="bg-[#E8613A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
              Freins
            </h2>

            <div className="question-block">
              <label className="question-label">Qu&apos;est-ce qui l&apos;empêche de commencer maintenant ?</label>
              <textarea
                className="textarea-field"
                rows={3}
                placeholder="Note mot pour mot son objection principale..."
                value={form.frein_commence_maintenant}
                onChange={set('frein_commence_maintenant')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Quand il dit &quot;dans 3/6 mois/1 an&quot; — il attend quoi exactement ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Qu'est-ce qui doit se passer pour que ce soit 'le bon moment' ?"
                value={form.attente_future}
                onChange={set('attente_future')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Frein principal identifié</label>
              <ToggleGroup
                value={form.frein_principal}
                onChange={(v) => setDirect('frein_principal', v)}
                options={[
                  { value: 'financier', label: '💰 Financier' },
                  { value: 'peur_echec', label: '😨 Peur de l\'échec' },
                  { value: 'manque_temps', label: '⏰ Manque de temps' },
                  { value: 'conjoint', label: '👥 Conjoint pas d\'accord' },
                  { value: 'autre', label: '❓ Autre' },
                ]}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Si financier : CPF disponible ? Accès crédit ? Épargne ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Détails sur la situation financière (CPF, crédit conso, épargne...)"
                value={form.details_financier}
                onChange={set('details_financier')}
              />
            </div>

            <div className="question-block mb-0">
              <label className="question-label">Quelqu&apos;un influence sa décision ? Qui ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Conjoint, parent, ami ? Quelle est leur position ?"
                value={form.influence_decision}
                onChange={set('influence_decision')}
              />
            </div>
          </div>

          {/* ─── SECTION 4 — PROJECTION ─── */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="bg-[#E8613A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">4</span>
              Projection
            </h2>

            <div className="question-block">
              <label className="question-label">Où se voit-il/elle dans 1 an si rien ne change ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Sa vision du statu quo..."
                value={form.projection_1_an}
                onChange={set('projection_1_an')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Émotion dominante si même job dans 2 ans ?</label>
              <input
                className="input-field"
                type="text"
                placeholder="ex: résignation, colère, dépression, honte... (mot exact)"
                value={form.emotion_dominante}
                onChange={set('emotion_dominante')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Date de vie importante à venir ? (anniversaire, fin contrat, autre)</label>
              <input
                className="input-field"
                type="text"
                placeholder="ex: 40 ans en mars, fin CDD en juillet..."
                value={form.date_importante}
                onChange={set('date_importante')}
              />
            </div>

            <div className="question-block mb-0">
              <label className="question-label">Ce qui se passe si la reconversion réussit ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Sa vision du succès, ce que ça change concrètement..."
                value={form.succes_reconversion}
                onChange={set('succes_reconversion')}
              />
            </div>
          </div>

          {/* ─── SECTION 5 — RELATION À L'OFFRE ─── */}
          <div className="section-card">
            <h2 className="section-title">
              <span className="bg-[#E8613A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">5</span>
              Relation à l&apos;offre
            </h2>

            <div className="question-block">
              <label className="question-label">Partie de la méthode qui l&apos;a le plus accroché</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Ce qui l'a attiré, ce qui a résonné..."
                value={form.accroche_methode}
                onChange={set('accroche_methode')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Partie qui l&apos;a fait hésiter</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Ce qui lui a semblé flou, risqué ou peu adapté..."
                value={form.hesitation_methode}
                onChange={set('hesitation_methode')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">A comparé avec d&apos;autres offres ? Lesquelles ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Concurrents mentionnés, autres formations regardées..."
                value={form.comparaison_offres}
                onChange={set('comparaison_offres')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Prix qu&apos;il/elle avait en tête avant l&apos;annonce</label>
              <input
                className="input-field"
                type="text"
                placeholder="ex: 1 500 € max, pas pensé au prix..."
                value={form.prix_en_tete}
                onChange={set('prix_en_tete')}
              />
            </div>

            <div className="question-block mb-0">
              <label className="question-label">Réaction exacte au prix (mot pour mot)</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Note exactement ce qu'il/elle a dit en entendant le tarif..."
                value={form.reaction_prix}
                onChange={set('reaction_prix')}
              />
            </div>
          </div>

          {/* ─── SECTION 6 — DIAGNOSTIC CLOSER ─── */}
          <div className="section-card border-[#E8613A]/30 bg-gradient-to-br from-white to-[#FDF6EE]">
            <h2 className="section-title">
              <span className="bg-[#1C1410] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">6</span>
              Diagnostic Closer
              <span className="ml-auto text-xs text-[#6B5548] font-normal">Usage interne</span>
            </h2>

            <div className="question-block">
              <label className="question-label">Quel est le vrai frein selon toi ?</label>
              <textarea
                className="textarea-field"
                rows={3}
                placeholder="Ton analyse perso, au-delà de ce qu'il a dit..."
                value={form.vrai_frein}
                onChange={set('vrai_frein')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Niveau de maturité du prospect</label>
              <div className="flex gap-3">
                {[
                  { value: 'chaud', label: 'Chaud 🔥', color: 'bg-red-500 border-red-500' },
                  { value: 'tiede', label: 'Tiède 🌤️', color: 'bg-amber-400 border-amber-400' },
                  { value: 'froid', label: 'Froid ❄️', color: 'bg-blue-500 border-blue-500' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDirect('niveau_maturite', form.niveau_maturite === opt.value ? '' : opt.value)}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                      form.niveau_maturite === opt.value
                        ? `${opt.color} text-white shadow-md scale-105`
                        : 'border-[#F5E8D8] bg-white text-[#6B5548] hover:border-[#E8613A]/40'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="question-block">
              <label className="question-label">Élément de vie qui pourrait créer une urgence naturelle ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Un événement, une date, une échéance qui peut accélérer la décision..."
                value={form.urgence_naturelle}
                onChange={set('urgence_naturelle')}
              />
            </div>

            <div className="question-block">
              <label className="question-label">Qu&apos;est-ce qui lui manque pour signer aujourd&apos;hui ?</label>
              <textarea
                className="textarea-field"
                rows={2}
                placeholder="Le dernier blocage à lever pour closer..."
                value={form.manque_signature}
                onChange={set('manque_signature')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="question-block mb-0">
                <label className="question-label">Ton prénom (closer)</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="ex: Lucas"
                  value={form.prenom_closer}
                  onChange={set('prenom_closer')}
                  required
                />
              </div>
              <div className="question-block mb-0">
                <label className="question-label">Prochaine action convenue</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="ex: Rappel jeudi 14h, envoi devis..."
                  value={form.prochaine_action}
                  onChange={set('prochaine_action')}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-base py-4 mb-8 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enregistrement...
              </span>
            ) : '🍊 Enregistrer la fiche appel'}
          </button>
        </form>
      </div>
    </>
  )
}
