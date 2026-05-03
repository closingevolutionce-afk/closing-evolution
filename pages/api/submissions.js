import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const body = req.body

    const { data, error } = await supabase
      .from('submissions')
      .insert([{
        prenom_prospect: body.prenom_prospect,
        age: body.age,
        situation_familiale: body.situation_familiale,
        metier_actuel: body.metier_actuel,
        anciennete: body.anciennete,
        statut: body.statut,
        revenus_mensuels: body.revenus_mensuels,
        bilan_competences: body.bilan_competences,
        duree_reflexion: body.duree_reflexion,
        raison_rdv: body.raison_rdv,
        idee_reconversion: body.idee_reconversion,
        niveau_souffrance: parseInt(body.niveau_souffrance, 10),
        reaction_entourage: body.reaction_entourage,
        frein_commence_maintenant: body.frein_commence_maintenant,
        attente_future: body.attente_future,
        frein_principal: body.frein_principal,
        details_financier: body.details_financier,
        influence_decision: body.influence_decision,
        projection_1_an: body.projection_1_an,
        emotion_dominante: body.emotion_dominante,
        date_importante: body.date_importante,
        succes_reconversion: body.succes_reconversion,
        accroche_methode: body.accroche_methode,
        hesitation_methode: body.hesitation_methode,
        comparaison_offres: body.comparaison_offres,
        prix_en_tete: body.prix_en_tete,
        reaction_prix: body.reaction_prix,
        vrai_frein: body.vrai_frein,
        niveau_maturite: body.niveau_maturite,
        urgence_naturelle: body.urgence_naturelle,
        manque_signature: body.manque_signature,
        prenom_closer: body.prenom_closer,
        prochaine_action: body.prochaine_action,
        date_followup: body.date_followup || null,
        note_followup: body.note_followup,
      }])
      .select()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data[0])
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
