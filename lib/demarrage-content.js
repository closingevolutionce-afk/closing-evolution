import { Briefcase, HandCoins, LayoutGrid, UserCheck } from 'lucide-react'

// Contenu de base sur le démarrage business du closer — à enrichir avec du
// contenu réel de Chirine & Emilien au fur et à mesure. Reprend et prolonge
// les concepts déjà enseignés dans M3 (Offres haute valeur, recrutement,
// écosystème) et M9 (Métriques et CRM) plutôt que de les dupliquer.
export const demarrageTopics = [
  {
    id: 'offre',
    icon: Briefcase,
    title: 'Trouver sa première offre',
    intro:
      "Avant de closer qui que ce soit, il faut une offre pour laquelle closer — une entreprise ou un infopreneur qui te délègue ses ventes.",
    points: [
      "Le réseau d'abord : la majorité des premières missions se trouvent par recommandation — dans des communautés de closers (Discord, groupes Telegram/Facebook dédiés au closing), pas en réponse à une annonce publique.",
      "LinkedIn est un vrai canal : un profil qui montre clairement \"closer high-ticket\" + des preuves concrètes (scores, résultats) attire des messages de recruteurs sans même postuler.",
      "Les plateformes de mise en relation closer ↔ infopreneur existent, mais elles sont secondaires — elles marchent mieux une fois que tu as déjà une preuve de compétence à montrer.",
      "Applique la grille des 5 critères d'une bonne offre vue en M3 avant d'accepter : promesse claire, qualité des leads, structure de commission, écosystème/support, alignement de valeurs.",
      "Red flags à écarter direct : aucun lead qualifié fourni, commission floue ou non écrite, on te demande de l'argent à toi pour \"démarrer\".",
    ],
    moduleLink: { href: '/parcours/m3', label: 'Revoir M3 — Offres haute valeur, recrutement, écosystème' },
  },
  {
    id: 'outils',
    icon: LayoutGrid,
    title: 'Les outils du quotidien',
    intro:
      "Un closer sans CRM travaille à l'instinct — et perd des deals simplement parce qu'il oublie de relancer. Le CRM n'a pas besoin d'être compliqué pour être efficace.",
    points: [
      "Le modèle enseigné en M9 : un pipeline à 5 colonnes — À contacter / En conversation / Lien envoyé / RDV booké / Archivé — avec un code couleur chaud (vert) / tiède (orange) / froid (rouge).",
      "Pour démarrer, un tableau Notion ou Airtable fait exactement ce travail — pas besoin d'un outil payant tant que le volume de leads reste gérable à la main.",
      "Calendly (ou équivalent) pour la prise de RDV : ça évite les allers-retours par message et ça filtre déjà un peu les prospects peu motivés.",
      "Chez les infopreneurs plus structurés, tu retrouveras souvent un vrai CRM (type HubSpot, Pipedrive, GoHighLevel) — l'essentiel est de comprendre la logique du pipeline, l'outil précis change peu de choses.",
      "Le réflexe qui compte le plus : la revue quotidienne de 3 minutes (vue en M9) — si tu ne mesures pas, tu ne peux pas t'améliorer.",
    ],
    moduleLink: { href: '/parcours/m9', label: 'Revoir M9 — Métriques et CRM' },
  },
  {
    id: 'remuneration',
    icon: HandCoins,
    title: 'Rémunération et contrat',
    intro:
      "La plupart des missions de closing se rémunèrent à la commission, parfois avec un petit fixe. Ce qui compte le plus, c'est ce que le contrat précise — pas juste le pourcentage annoncé.",
    points: [
      "Deux modèles courants : commission pure, ou fixe modeste + commission — la commission pure demande plus de confiance en ses skills mais paie mieux si l'offre est bonne.",
      "Les pourcentages varient beaucoup selon le secteur et le ticket moyen — sers-t'en comme repère à discuter, pas comme règle absolue, et ajuste avec l'expérience.",
      "Avant de signer, fais préciser par écrit : la commission se calcule sur le cash encaissé ou sur la valeur totale du panier ? Sous quel délai est-elle versée ? Y a-t-il une période d'essai ?",
      "Demande aussi s'il y a une clause d'exclusivité — certains mandants l'exigent, d'autres non.",
      "Un mandant qui refuse de mettre les conditions par écrit est un signal à prendre au sérieux.",
    ],
  },
  {
    id: 'candidater',
    icon: UserCheck,
    title: 'Se présenter et candidater',
    intro:
      "À compétences égales, ce qui fait la différence entre deux candidats, ce sont les preuves concrètes — pas le discours.",
    points: [
      "Comme vu en M3 : skills d'abord, réseau ensuite — un recruteur retient d'abord la preuve que tu sais closer, avant l'aisance à l'oral.",
      "Des preuves concrètes à montrer : ton score sur l'Arena, un replay de roleplay, ton niveau de progression sur Closing Evolution — ça vaut plus qu'un CV.",
      "Avant l'entretien, comprends l'offre en profondeur (à qui elle s'adresse, quelle transformation elle vend) — ça se voit immédiatement si tu poses des questions pertinentes plutôt que génériques.",
      "En entretien, applique ce que tu appliques sur un appel : pose des questions, écoute plus que tu ne parles, et montre que tu n'as pas besoin du deal à tout prix — ça inspire confiance, pas l'inverse.",
    ],
  },
]
