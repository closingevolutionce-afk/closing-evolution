import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })

  const columns = [
    'created_at', 'prenom_closer', 'prenom_prospect', 'age', 'situation_familiale',
    'metier_actuel', 'anciennete', 'statut', 'revenus_mensuels', 'bilan_competences',
    'duree_reflexion', 'raison_rdv', 'idee_reconversion', 'niveau_souffrance',
    'reaction_entourage', 'frein_commence_maintenant', 'attente_future', 'frein_principal',
    'details_financier', 'influence_decision', 'projection_1_an', 'emotion_dominante',
    'date_importante', 'succes_reconversion', 'accroche_methode', 'hesitation_methode',
    'comparaison_offres', 'prix_en_tete', 'reaction_prix', 'vrai_frein',
    'niveau_maturite', 'urgence_naturelle', 'manque_signature', 'prochaine_action',
  ]

  const headers = [
    'Date', 'Closer', 'Prénom prospect', 'Âge', 'Situation familiale',
    'Métier actuel', 'Ancienneté', 'Statut', 'Revenus mensuels', 'Bilan compétences',
    'Durée réflexion', 'Raison RDV', 'Idée reconversion', 'Niveau souffrance',
    'Réaction entourage', 'Frein actuel', 'Attente future', 'Frein principal',
    'Détails financier', 'Influence décision', 'Projection 1 an', 'Émotion dominante',
    'Date importante', 'Succès reconversion', 'Accroche méthode', 'Hésitation méthode',
    'Comparaison offres', 'Prix en tête', 'Réaction prix', 'Vrai frein',
    'Niveau maturité', 'Urgence naturelle', 'Manque signature', 'Prochaine action',
  ]

  const escape = (val) => {
    if (val === null || val === undefined) return ''
    const str = String(val)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const rows = [
    headers.join(','),
    ...data.map((row) => columns.map((col) => escape(row[col])).join(',')),
  ]

  const csv = rows.join('\n')

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="pamplemousse-appels-${new Date().toISOString().slice(0, 10)}.csv"`)
  res.status(200).send('﻿' + csv)
}
