import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const PieChart = dynamic(() => import('recharts').then(m => m.PieChart), { ssr: false })
const Pie = dynamic(() => import('recharts').then(m => m.Pie), { ssr: false })
const Cell = dynamic(() => import('recharts').then(m => m.Cell), { ssr: false })
const BarChart = dynamic(() => import('recharts').then(m => m.BarChart), { ssr: false })
const Bar = dynamic(() => import('recharts').then(m => m.Bar), { ssr: false })
const XAxis = dynamic(() => import('recharts').then(m => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import('recharts').then(m => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import('recharts').then(m => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import('recharts').then(m => m.ResponsiveContainer), { ssr: false })
const Legend = dynamic(() => import('recharts').then(m => m.Legend), { ssr: false })

const PASSWORD = 'pamplemousse2024'

const MATURITE_COLORS = {
  chaud: '#EF4444',
  tiede: '#F59E0B',
  froid: '#3B82F6',
}

const MATURITE_LABELS = {
  chaud: 'Chaud 🔥',
  tiede: 'Tiède 🌤️',
  froid: 'Froid ❄️',
}

const FREIN_LABELS = {
  financier: '💰 Financier',
  peur_echec: '😨 Peur échec',
  manque_temps: '⏰ Temps',
  conjoint: '👥 Conjoint',
  autre: '❓ Autre',
}

const FREIN_COLORS = ['#E8613A', '#F59E0B', '#3B82F6', '#8B5CF6', '#6B7280']

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#F5E8D8] shadow-sm">
      <p className="text-sm text-[#6B5548] font-medium mb-1">{label}</p>
      <p className={`text-3xl font-extrabold ${color || 'text-[#1C1410]'}`}>{value}</p>
      {sub && <p className="text-xs text-[#6B5548] mt-1">{sub}</p>}
    </div>
  )
}

function FicheModal({ sub, onClose }) {
  if (!sub) return null

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  const Field = ({ label, value }) => {
    if (!value && value !== 0) return null
    return (
      <div className="mb-3">
        <p className="text-xs font-semibold text-[#6B5548] uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm text-[#1C1410] bg-[#FDF6EE] rounded-lg px-3 py-2">{value}</p>
      </div>
    )
  }

  const maturite = sub.niveau_maturite
  const maturiteBg = maturite === 'chaud' ? 'bg-red-500' : maturite === 'tiede' ? 'bg-amber-400' : 'bg-blue-500'

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1C1410] text-white rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{sub.prenom_prospect || 'Prospect'} {sub.age ? `· ${sub.age}` : ''}</h3>
            <p className="text-xs text-white/60">{formatDate(sub.created_at)} · Closer : {sub.prenom_closer}</p>
          </div>
          <div className="flex items-center gap-3">
            {maturite && (
              <span className={`${maturiteBg} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                {MATURITE_LABELS[maturite] || maturite}
              </span>
            )}
            <button onClick={onClose} className="text-white/60 hover:text-white text-2xl leading-none">×</button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="font-bold text-[#E8613A] text-xs uppercase tracking-widest mb-3">Profil</h4>
              <Field label="Situation familiale" value={sub.situation_familiale} />
              <Field label="Métier / Ancienneté" value={sub.metier_actuel && `${sub.metier_actuel}${sub.anciennete ? ` · ${sub.anciennete}` : ''}`} />
              <Field label="Statut" value={sub.statut} />
              <Field label="Revenus" value={sub.revenus_mensuels} />
              <Field label="Bilan compétences" value={sub.bilan_competences} />
              <Field label="Durée réflexion" value={sub.duree_reflexion} />
            </div>
            <div>
              <h4 className="font-bold text-[#E8613A] text-xs uppercase tracking-widest mb-3">Déclencheur</h4>
              <div className="mb-3">
                <p className="text-xs font-semibold text-[#6B5548] uppercase tracking-wide mb-0.5">Souffrance</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#F5E8D8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E8613A] rounded-full"
                      style={{ width: `${((sub.niveau_souffrance - 1) / 9) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#E8613A]">{sub.niveau_souffrance}/10</span>
                </div>
              </div>
              <Field label="Idée reconversion" value={sub.idee_reconversion} />
              <Field label="Raison du RDV" value={sub.raison_rdv} />
              <Field label="Réaction entourage" value={sub.reaction_entourage} />
            </div>
          </div>

          <div className="border-t border-[#F5E8D8] my-4" />

          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="font-bold text-[#E8613A] text-xs uppercase tracking-widest mb-3">Freins</h4>
              <Field label="Frein principal" value={sub.frein_principal && FREIN_LABELS[sub.frein_principal]} />
              <Field label="Ce qui l'empêche" value={sub.frein_commence_maintenant} />
              <Field label="Attente future" value={sub.attente_future} />
              <Field label="Détails financier" value={sub.details_financier} />
              <Field label="Influence décision" value={sub.influence_decision} />
            </div>
            <div>
              <h4 className="font-bold text-[#E8613A] text-xs uppercase tracking-widest mb-3">Projection</h4>
              <Field label="Dans 1 an si rien ne change" value={sub.projection_1_an} />
              <Field label="Émotion dominante" value={sub.emotion_dominante} />
              <Field label="Date importante" value={sub.date_importante} />
              <Field label="Si succès reconversion" value={sub.succes_reconversion} />
            </div>
          </div>

          <div className="border-t border-[#F5E8D8] my-4" />

          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <h4 className="font-bold text-[#E8613A] text-xs uppercase tracking-widest mb-3">Relation à l&apos;offre</h4>
              <Field label="Ce qui a accroché" value={sub.accroche_methode} />
              <Field label="Ce qui a fait hésiter" value={sub.hesitation_methode} />
              <Field label="Offres comparées" value={sub.comparaison_offres} />
              <Field label="Prix imaginé" value={sub.prix_en_tete} />
              <Field label="Réaction au prix" value={sub.reaction_prix} />
            </div>
            <div>
              <h4 className="font-bold text-[#1C1410] text-xs uppercase tracking-widest mb-3">Diagnostic closer</h4>
              <Field label="Vrai frein" value={sub.vrai_frein} />
              <Field label="Urgence naturelle" value={sub.urgence_naturelle} />
              <Field label="Ce qui manque pour signer" value={sub.manque_signature} />
              <Field label="Prochaine action" value={sub.prochaine_action} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setPw('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF6EE] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 shadow-lg border border-[#F5E8D8] max-w-sm w-full text-center">
        <div className="text-5xl mb-4">🍊</div>
        <h1 className="text-2xl font-bold text-[#1C1410] mb-1">Dashboard</h1>
        <p className="text-[#6B5548] text-sm mb-8">La Méthode Pamplemousse</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className={`input-field text-center mb-4 transition-all ${error ? 'border-red-400 bg-red-50' : ''}`}
            placeholder="Mot de passe"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-3">Mot de passe incorrect</p>}
          <button type="submit" className="btn-primary w-full">Accéder au dashboard</button>
        </form>
        <Link href="/" className="block mt-6 text-xs text-[#6B5548] hover:text-[#E8613A] transition-colors">
          ← Retour au formulaire
        </Link>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSub, setSelectedSub] = useState(null)
  const [search, setSearch] = useState('')
  const [filterMaturite, setFilterMaturite] = useState('')
  const [chartsReady, setChartsReady] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('pamplemousse_auth')
      if (stored === '1') setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (authed) {
      fetchData()
      setChartsReady(true)
    }
  }, [authed])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/submissions')
      const data = await res.json()
      setSubmissions(Array.isArray(data) ? data : [])
    } catch {
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    setAuthed(true)
    if (typeof window !== 'undefined') sessionStorage.setItem('pamplemousse_auth', '1')
  }

  const handleLogout = () => {
    setAuthed(false)
    if (typeof window !== 'undefined') sessionStorage.removeItem('pamplemousse_auth')
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  // Stats
  const total = submissions.length
  const avgSouffrance = total
    ? (submissions.reduce((s, r) => s + (r.niveau_souffrance || 0), 0) / total).toFixed(1)
    : '-'

  const maturiteData = ['chaud', 'tiede', 'froid'].map((k) => ({
    name: MATURITE_LABELS[k],
    value: submissions.filter((s) => s.niveau_maturite === k).length,
    color: MATURITE_COLORS[k],
  })).filter((d) => d.value > 0)

  const freinData = Object.entries(FREIN_LABELS).map(([k, label], i) => ({
    name: label,
    value: submissions.filter((s) => s.frein_principal === k).length,
    color: FREIN_COLORS[i],
  })).filter((d) => d.value > 0)

  const closerStats = submissions.reduce((acc, s) => {
    const k = s.prenom_closer || 'Inconnu'
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})
  const closerData = Object.entries(closerStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      (s.prenom_prospect || '').toLowerCase().includes(q) ||
      (s.prenom_closer || '').toLowerCase().includes(q) ||
      (s.metier_actuel || '').toLowerCase().includes(q)
    const matchMaturite = !filterMaturite || s.niveau_maturite === filterMaturite
    return matchSearch && matchMaturite
  })

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  })

  const maturiteBadge = (m) => {
    const styles = {
      chaud: 'bg-red-100 text-red-700',
      tiede: 'bg-amber-100 text-amber-700',
      froid: 'bg-blue-100 text-blue-700',
    }
    return styles[m] || 'bg-gray-100 text-gray-600'
  }

  return (
    <>
      <Head>
        <title>Dashboard — La Méthode Pamplemousse</title>
        <meta name="robots" content="noindex" />
      </Head>

      {selectedSub && <FicheModal sub={selectedSub} onClose={() => setSelectedSub(null)} />}

      <div className="min-h-screen bg-[#FDF6EE]">
        {/* Header */}
        <header className="bg-[#1C1410] text-white sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍊</span>
              <div>
                <h1 className="font-bold text-base leading-tight">Dashboard Closers</h1>
                <p className="text-[#E8613A] text-xs font-medium">La Méthode Pamplemousse</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/api/export"
                className="flex items-center gap-1.5 bg-[#E8613A] hover:bg-[#C94D28] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </a>
              <Link href="/" className="text-xs text-white/60 hover:text-white transition-colors">
                Formulaire
              </Link>
              <button onClick={handleLogout} className="text-xs text-white/40 hover:text-white/80 transition-colors">
                Déco.
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-3 border-[#E8613A] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total appels" value={total} sub="Toutes périodes" color="text-[#E8613A]" />
                <StatCard
                  label="Prospects chauds"
                  value={submissions.filter((s) => s.niveau_maturite === 'chaud').length}
                  sub={total ? `${Math.round((submissions.filter(s => s.niveau_maturite === 'chaud').length / total) * 100)}% du total` : '-'}
                  color="text-red-500"
                />
                <StatCard
                  label="Souffrance moyenne"
                  value={avgSouffrance !== '-' ? `${avgSouffrance}/10` : '-'}
                  sub="Niveau de douleur"
                  color="text-[#E8613A]"
                />
                <StatCard
                  label="Frein financier"
                  value={submissions.filter((s) => s.frein_principal === 'financier').length}
                  sub={total ? `${Math.round((submissions.filter(s => s.frein_principal === 'financier').length / total) * 100)}% du total` : '-'}
                  color="text-amber-600"
                />
              </div>

              {/* Charts */}
              {chartsReady && total > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Maturité Pie */}
                  <div className="bg-white rounded-2xl p-6 border border-[#F5E8D8] shadow-sm">
                    <h3 className="font-bold text-[#1C1410] mb-4">Maturité des prospects</h3>
                    {maturiteData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={maturiteData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {maturiteData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v, n) => [v, n]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-[#6B5548] text-sm text-center py-8">Aucune donnée</p>
                    )}
                  </div>

                  {/* Freins Bar */}
                  <div className="bg-white rounded-2xl p-6 border border-[#F5E8D8] shadow-sm">
                    <h3 className="font-bold text-[#1C1410] mb-4">Freins principaux</h3>
                    {freinData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={freinData} layout="vertical" margin={{ left: 10, right: 10 }}>
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {freinData.map((entry, i) => (
                              <Cell key={i} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-[#6B5548] text-sm text-center py-8">Aucune donnée</p>
                    )}
                  </div>

                  {/* Closers Bar */}
                  <div className="bg-white rounded-2xl p-6 border border-[#F5E8D8] shadow-sm">
                    <h3 className="font-bold text-[#1C1410] mb-4">Appels par closer</h3>
                    {closerData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={closerData} margin={{ left: 0, right: 10 }}>
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis hide />
                          <Tooltip />
                          <Bar dataKey="value" fill="#E8613A" radius={[4, 4, 0, 0]}>
                            {closerData.map((_, i) => (
                              <Cell key={i} fill={i === 0 ? '#E8613A' : '#F0825F'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-[#6B5548] text-sm text-center py-8">Aucune donnée</p>
                    )}
                  </div>
                </div>
              )}

              {/* Filters + Table */}
              <div className="bg-white rounded-2xl border border-[#F5E8D8] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F5E8D8] flex flex-wrap items-center gap-3">
                  <h3 className="font-bold text-[#1C1410] mr-2">Fiches individuelles</h3>
                  <input
                    type="text"
                    placeholder="Rechercher prospect, closer, métier..."
                    className="input-field max-w-xs text-sm py-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="flex gap-2">
                    {['', 'chaud', 'tiede', 'froid'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setFilterMaturite(m)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                          filterMaturite === m
                            ? 'bg-[#E8613A] text-white'
                            : 'bg-[#F5E8D8] text-[#6B5548] hover:bg-[#F0D8C0]'
                        }`}
                      >
                        {m ? MATURITE_LABELS[m] : 'Tous'}
                      </button>
                    ))}
                  </div>
                  <span className="ml-auto text-xs text-[#6B5548]">{filtered.length} résultat{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-[#6B5548]">
                    <div className="text-4xl mb-3">🍊</div>
                    <p className="font-medium">Aucune fiche pour le moment</p>
                    <p className="text-sm mt-1">Les appels remplis par les closers apparaîtront ici.</p>
                    <Link href="/" className="inline-block mt-4 text-[#E8613A] text-sm font-medium hover:underline">
                      Remplir le premier appel →
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#FDF6EE] text-[#6B5548] text-xs uppercase tracking-wide">
                          <th className="px-6 py-3 text-left font-semibold">Date</th>
                          <th className="px-4 py-3 text-left font-semibold">Prospect</th>
                          <th className="px-4 py-3 text-left font-semibold">Closer</th>
                          <th className="px-4 py-3 text-left font-semibold">Métier</th>
                          <th className="px-4 py-3 text-left font-semibold">Souffrance</th>
                          <th className="px-4 py-3 text-left font-semibold">Frein</th>
                          <th className="px-4 py-3 text-left font-semibold">Maturité</th>
                          <th className="px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F5E8D8]">
                        {filtered.map((s) => (
                          <tr key={s.id} className="hover:bg-[#FDF6EE]/60 transition-colors">
                            <td className="px-6 py-4 text-[#6B5548] whitespace-nowrap text-xs">{formatDate(s.created_at)}</td>
                            <td className="px-4 py-4 font-semibold text-[#1C1410]">
                              {s.prenom_prospect || '—'}
                              {s.age ? <span className="text-[#6B5548] font-normal ml-1 text-xs">· {s.age}</span> : ''}
                            </td>
                            <td className="px-4 py-4 text-[#1C1410]">{s.prenom_closer || '—'}</td>
                            <td className="px-4 py-4 text-[#6B5548] text-xs max-w-[140px] truncate">{s.metier_actuel || '—'}</td>
                            <td className="px-4 py-4">
                              {s.niveau_souffrance ? (
                                <div className="flex items-center gap-1.5">
                                  <div className="w-12 h-1.5 bg-[#F5E8D8] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#E8613A] rounded-full"
                                      style={{ width: `${((s.niveau_souffrance - 1) / 9) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-bold text-[#E8613A]">{s.niveau_souffrance}</span>
                                </div>
                              ) : '—'}
                            </td>
                            <td className="px-4 py-4 text-xs">
                              {s.frein_principal ? (
                                <span className="bg-[#F5E8D8] text-[#3D2B1F] px-2 py-1 rounded-md font-medium">
                                  {FREIN_LABELS[s.frein_principal] || s.frein_principal}
                                </span>
                              ) : '—'}
                            </td>
                            <td className="px-4 py-4">
                              {s.niveau_maturite ? (
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${maturiteBadge(s.niveau_maturite)}`}>
                                  {MATURITE_LABELS[s.niveau_maturite] || s.niveau_maturite}
                                </span>
                              ) : '—'}
                            </td>
                            <td className="px-4 py-4">
                              <button
                                onClick={() => setSelectedSub(s)}
                                className="text-[#E8613A] hover:text-[#C94D28] font-semibold text-xs hover:underline whitespace-nowrap"
                              >
                                Voir fiche →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}
