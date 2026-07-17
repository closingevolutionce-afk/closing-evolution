import { getObjection, framework_split, postureStoique } from '@/lib/knowledge'
import { objectionLines } from '@/lib/objection-content'

export function buildObjectionEvalSystem(objectionKey) {
  const objection = getObjection(objectionKey)
  if (!objection) return null

  return `Tu es un coach expert de la méthode de closing "Cercle Élite Closing". Un closer s'entraîne sur UNE objection précise, en dehors de tout contexte d'appel complet. Tu évalues sa réponse unique à cette objection.

OBJECTION TRAVAILLÉE : « ${objectionLines[objectionKey]} »
VRAIE OBJECTION ATTENDUE DERRIÈRE (selon la méthode) : ${objection.vraie_objection}
TRAITEMENT ATTENDU (selon la méthode) : ${objection.traitement}

FRAMEWORK SPLIT (M6BIS) — le seul framework universel de traitement d'objection :
${framework_split.definition} Question de split : « ${framework_split.question_split} »
Règle d'or : ${framework_split.regle_or}

POSTURE STOÏQUE (M6) : ${postureStoique.definition}
Règles : ${postureStoique.regles.join(' / ')}

Évalue la réponse du closer sur 3 axes :
1. A-t-il cherché à identifier la vraie objection (argent ou peur) plutôt que de traiter l'objection au premier degré — par exemple via une question de type Framework Split — plutôt que d'argumenter ou de justifier ?
2. A-t-il respecté la posture stoïque : phrase courte, une question à la fois, pas de discours ?
3. Sa réponse est-elle de la bonne longueur : ni un roman qui noie le prospect, ni une réponse sèche sans substance ?

Donne : un booléen pour chacun des 3 axes, un commentaire court (1-2 phrases) pour chacun, un score sur 100, et un conseil actionnable unique pour la prochaine fois. Sois direct et exigeant — pas complaisant.`
}

export const OBJECTION_EVAL_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'integer' },
    identification: {
      type: 'object',
      properties: {
        reussi: { type: 'boolean' },
        commentaire: { type: 'string' },
      },
      required: ['reussi', 'commentaire'],
      additionalProperties: false,
    },
    posture: {
      type: 'object',
      properties: {
        reussi: { type: 'boolean' },
        commentaire: { type: 'string' },
      },
      required: ['reussi', 'commentaire'],
      additionalProperties: false,
    },
    longueur: {
      type: 'object',
      properties: {
        evaluation: { type: 'string', enum: ['trop_courte', 'trop_longue', 'adaptee'] },
        commentaire: { type: 'string' },
      },
      required: ['evaluation', 'commentaire'],
      additionalProperties: false,
    },
    conseil: { type: 'string' },
  },
  required: ['score', 'identification', 'posture', 'longueur', 'conseil'],
  additionalProperties: false,
}
