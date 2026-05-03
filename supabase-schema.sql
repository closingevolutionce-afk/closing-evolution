-- Colle ce SQL dans l'éditeur SQL de ton projet Supabase
-- Dashboard Supabase > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Section 1: Profil
  prenom_prospect TEXT,
  age TEXT,
  situation_familiale TEXT,
  metier_actuel TEXT,
  anciennete TEXT,
  statut TEXT,
  revenus_mensuels TEXT,
  bilan_competences TEXT,
  duree_reflexion TEXT,

  -- Section 2: Déclencheur
  raison_rdv TEXT,
  idee_reconversion TEXT,
  niveau_souffrance INTEGER CHECK (niveau_souffrance BETWEEN 1 AND 10),
  reaction_entourage TEXT,

  -- Section 3: Freins
  frein_commence_maintenant TEXT,
  attente_future TEXT,
  frein_principal TEXT,
  details_financier TEXT,
  influence_decision TEXT,

  -- Section 4: Projection
  projection_1_an TEXT,
  emotion_dominante TEXT,
  date_importante TEXT,
  succes_reconversion TEXT,

  -- Section 5: Relation à l'offre
  accroche_methode TEXT,
  hesitation_methode TEXT,
  comparaison_offres TEXT,
  prix_en_tete TEXT,
  reaction_prix TEXT,

  -- Section 6: Diagnostic closer
  vrai_frein TEXT,
  niveau_maturite TEXT CHECK (niveau_maturite IN ('chaud', 'tiede', 'froid')),
  urgence_naturelle TEXT,
  manque_signature TEXT,
  prenom_closer TEXT,
  prochaine_action TEXT,
  date_followup DATE,
  note_followup TEXT
);

-- Active Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Permet INSERT depuis le client (la clé anon est suffisante)
CREATE POLICY "Allow insert for all" ON submissions
  FOR INSERT WITH CHECK (true);

-- Permet SELECT depuis le client (dashboard)
CREATE POLICY "Allow select for all" ON submissions
  FOR SELECT USING (true);
