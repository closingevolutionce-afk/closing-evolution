// Bibliothèque de "hooks" (accroches) que les closers peuvent réutiliser pour
// leur propre positionnement / prospection — technique de copywriting, pas de
// contenu généré par IA, donc zéro coût.
export const hooks = [
  {
    situation: "Tu veux annoncer une offre ou un lancement sans que ça sonne comme une pub.",
    technique: 'Pattern Interrupt',
    cover: "Ce qui circule depuis 48h... il faut que je vous en parle.",
    script: [
      'Déclaration officielle suite à ce qui se dit sur moi.',
      "Je m'appelle [ton prénom]. Et avec ce qui circule depuis 48h, je ne peux plus me taire.",
      "J'ai vu les messages. Les captures. Ce qui se raconte en DM. Il est temps que je rétablisse la vérité.",
      "Oui. J'ai ouvert de nouvelles places dans [ton offre]. (C'est tout. Il ne s'est rien passé. Personne ne parle de moi.)",
      "Si tu es arrivé jusqu'ici, c'est normal. Ce que tu viens de vivre s'appelle un pattern interrupt. Et le cerveau de ton audience n'y peut rien.",
    ],
    why: "Tu casses l'attente du lecteur — il s'attend à un vrai scandale, son cerveau ne peut pas décrocher avant la résolution. Tu profites de cette attention captée pour retomber sur ton offre, avec un taux de lecture jusqu'au bout largement supérieur à une annonce classique.",
  },
  {
    situation: "Tu viens d'annoncer le prix, et l'envie te prend de faire silence comme pour une objection.",
    technique: 'Enchaînement actif',
    cover: "Après l'annonce du prix : ne te tais JAMAIS.",
    script: [
      "« Donc pour récapituler, c'est [prix]. Et ce qu'on fait maintenant, c'est qu'on t'envoie le lien pour valider ta place, et je te programme dès aujourd'hui ta première session. »",
    ],
    why: "Le silence est une arme après une QUESTION — il fait réfléchir le prospect et le pousse à se positionner. Mais après le PRIX, le silence crée un vide que le prospect remplit avec du doute, pas avec une décision. En enchaînant tout de suite sur les prochaines étapes, tu gardes la main sur le tempo et tu transformes l'annonce du prix en évidence, pas en question ouverte.",
  },
  {
    situation: "Tu sens que ton prospect hésite, qu'il reste dans l'identité de quelqu'un qui \"réfléchit\" plutôt que de quelqu'un qui \"fait\".",
    technique: 'Ancrage identitaire',
    cover: "Colle-lui l'identité de quelqu'un qui passe à l'action.",
    script: [
      "« Ok donc toi, quand t'as décidé un truc, tu le fais. Je le sens direct dans ta façon de parler. »",
      "Plus tard dans l'appel : « Ça, ça sonne exactement comme quelqu'un qui est prêt à passer à l'action maintenant. »",
    ],
    why: "Tant que ton prospect reste dans l'identité de quelqu'un qui hésite, il n'achètera pas — parce qu'acheter maintenant contredirait qui il pense être. En lui répétant et en lui collant l'identité de quelqu'un de proactif tout au long de l'appel, tu le pousses à se conformer à cette identité au moment de conclure, par simple cohérence avec l'image que tu lui as renvoyée.",
  },
  {
    situation: "Tu démarres l'appel et tu es tenté d'attaquer directement le factuel (parcours, offre, logistique).",
    technique: 'Ouverture émotionnelle',
    cover: "L'émotion crée la confiance. La confiance crée la vente.",
    script: [
      "« Avant qu'on rentre dans le concret, dis-moi — qu'est-ce qui fait que t'as pris le temps aujourd'hui pour cet appel ? »",
    ],
    why: "Un appel qui commence par du factuel reste froid, et un prospect froid ne fait pas confiance. En allant chercher l'émotionnel dès les premières minutes, tu crées la confiance qui rend tout le reste de l'appel — discovery, pitch, closing — dix fois plus fluide.",
  },
  {
    situation: "Tout au long de l'appel, à chaque relance ou question importante.",
    technique: 'Prénom répété',
    cover: "Ton prospect adore une chose : s'entendre appeler par son prénom.",
    script: [
      "« Sarah, qu'est-ce qui te bloque exactement là-dessus ? »",
      "« C'est exactement ça, Sarah. »",
    ],
    why: "Entendre son propre prénom active une zone du cerveau liée à l'attention et à la reconnaissance de soi. Utilisé avec parcimonie et au bon moment, ça renforce la connexion et la sensation d'être écouté personnellement — pas juste \"un prospect de plus\".",
  },
  {
    situation: "Ton prospect répond à côté de la question, minimise ou botte en touche — dès la première fois que ça arrive.",
    technique: 'Coup de boule bienveillant',
    cover: "La première fois qu'il te bullshit, tout se joue.",
    script: [
      "« Attends, je vais être honnête avec toi — ce que tu viens de dire, ça répond pas vraiment à ma question. Qu'est-ce qui se passe vraiment ? »",
    ],
    why: "Si tu laisses passer une seule réponse évasive sans la recadrer, tu valides implicitement que c'est acceptable de te bullshit — et ce pattern va se répéter pendant tout le reste de l'appel. Le confronter avec bienveillance dès la première fois pose le cadre : cet appel se fait dans la vérité.",
  },
  {
    situation: "Tu présentes ton offre ou tu proposes les prochaines étapes.",
    technique: 'Simplicité du choix',
    cover: "La confusion tue la conversion.",
    script: [
      "Au lieu de : « T'as l'option A, B ou C, avec ou sans le module bonus, en mensuel ou en une fois... »",
      "Fais : « Pour toi, c'est [l'offre], point. Voilà exactement ce que ça t'apporte. »",
    ],
    why: "Un cerveau face à trop d'options ne choisit pas la meilleure — il ne choisit rien du tout, et remet la décision à plus tard. Moins tu donnes d'options, plus la décision devient simple et rapide à prendre.",
  },
  {
    situation: "Tu veux créer une vraie connexion et te différencier de la concurrence sans la descendre frontalement.",
    technique: 'Ennemi commun',
    cover: "Trouve l'ennemi commun. Il devient ton allié.",
    script: [
      "« Tu sais ce qui me gonfle ? Toutes ces formations en closing qui t'apprennent des scripts par cœur mais jamais la psychologie derrière la vente. »",
    ],
    why: "Détester la même chose crée un lien plus fort et plus rapide qu'être d'accord sur quelque chose de positif — c'est un raccourci vers la complicité. En pointant un ennemi commun crédible, tu passes du statut de \"vendeur\" à celui d'\"allié\".",
  },
  {
    situation: "Le moment de conclure, juste après avoir présenté l'offre.",
    technique: 'Présupposé de la vente',
    cover: "Ne demande jamais \"si\". Demande \"comment\".",
    script: [
      "Au lieu de : « Est-ce que ça te dit d'avancer ? »",
      "Fais : « Comment tu veux qu'on procède pour la suite ? »",
    ],
    why: "\"Est-ce que\" ouvre la porte à un non. \"Comment\" présuppose que la décision d'avancer est déjà prise, et ne laisse ouvert que la question de la logistique — ton prospect se retrouve à répondre à une question sur le \"comment\" plutôt que sur le \"si\".",
  },
  {
    situation: "Pendant la discovery, quand tu explores ce qui ne va pas dans la situation actuelle du prospect.",
    technique: 'Empilement de douleurs',
    cover: "Plus tu empiles les douleurs, plus il achète facilement.",
    script: [
      "« Et à part ça, qu'est-ce que ça t'a coûté d'autre, cette situation ? Niveau confiance, niveau argent, niveau relations ? »",
    ],
    why: "Une seule douleur isolée est facile à relativiser (\"bah c'est pas si grave\"). En empilant plusieurs douleurs liées les unes aux autres, tu construis un poids cumulatif que le prospect ne peut plus minimiser — le changement devient urgent, pas juste souhaitable.",
  },
  {
    situation: "Tu veux ancrer une croyance chez ton prospect sans lui asséner comme un fait.",
    technique: 'Auto-persuasion',
    cover: "Fais-le convaincre lui-même de ce que tu penses déjà.",
    script: [
      "« À ton avis, pourquoi certains closers progressent en 3 mois et d'autres stagnent pendant 2 ans ? »",
    ],
    why: "Une croyance qu'on t'impose, tu la contestes. Une croyance que tu formules toi-même, avec tes propres mots, tu la défends. En posant la question plutôt qu'en affirmant, tu fais dire à ton prospect exactement ce que tu voulais qu'il pense — et il en devient l'auteur, pas juste le destinataire.",
  },
  {
    situation: "Tu veux faire changer d'avis ton prospect sur une croyance limitante, sans qu'il se braque en mode défensif.",
    technique: 'Pattern Interrupt (perspective)',
    cover: "Et si c'était pas exactement ce que tu pensais... ?",
    script: [
      "« Et si c'était pas exactement ce que tu pensais... ? »",
      "(Silence. Laisse la question s'installer avant d'enchaîner sur la nouvelle perspective.)",
    ],
    why: "Si tu enchaînes direct sur ta nouvelle perspective, le cerveau de ton prospect la compare et la rejette contre celle qu'il a déjà. En cassant d'abord la perspective actuelle avec un pattern interrupt, tu crées un vide mental — et c'est dans ce vide que ta nouvelle perspective peut s'installer sans résistance.",
  },
  {
    situation: "Ton prospect campe sur une croyance limitante bien ancrée (\"je suis pas quelqu'un de doué pour le commercial\").",
    technique: 'Dissonance cognitive',
    cover: "Mets deux croyances en tension. Laisse son cerveau faire le travail.",
    script: [
      "« Tu me dis que t'es pas doué pour le commercial... et en même temps tu m'as vendu ton projet pendant 10 minutes sans même t'en rendre compte. »",
    ],
    why: "Le cerveau ne supporte pas de porter deux croyances contradictoires en même temps — il va chercher à résoudre la tension. En mettant en évidence deux croyances opposées que ton prospect tient toutes les deux, tu n'as rien à démontrer : c'est lui qui va devoir ajuster sa croyance pour retrouver la cohérence.",
  },
  {
    situation: "Ton prospect sort une objection qui sonne comme autre chose (\"je dois réfléchir\", \"je dois en parler à mon conjoint\"...).",
    technique: 'Redirection',
    cover: "Il n'y a que deux vraies objections. Ramène-le toujours là.",
    script: [
      "« Ok, et concrètement, entre le budget et le fait de te lancer dans quelque chose de nouveau — c'est plutôt lequel des deux qui te freine ? »",
    ],
    why: "Derrière presque toutes les objections se cachent seulement l'ARGENT (logistique) ou la PEUR (incertitude) — tout le reste est du bullshit ou un prospect non qualifié. Rediriger systématiquement vers ces deux options t'évite de perdre du temps à traiter des fausses objections.",
  },
  {
    situation: "Tu es en plein traitement d'objection et tu sens l'envie de \"sauver\" la vente à tout prix.",
    technique: 'Détachement',
    cover: "Un closer détaché close toujours plus qu'un closer accroché à la vente.",
    script: [
      "« Écoute, si c'est pas le bon moment ou le bon fit, c'est pas grave — je préfère qu'on soit honnêtes tous les deux plutôt que de te pousser dans un truc qui te correspond pas. »",
    ],
    why: "Ton prospect sent ton attachement à la vente — et l'attachement se lit comme du besoin, ce qui inspire de la méfiance, pas de la confiance. En restant détaché du résultat, tu gardes ta posture stoïque et c'est justement cette posture qui rend la vente plus facile.",
  },
  {
    situation: "Tout au long de l'appel, en particulier pendant les négociations ou objections.",
    technique: 'Posture du départ',
    cover: "Il doit sentir que tu es prêt à raccrocher. Sinon, tu as déjà perdu.",
    script: [
      "« Je suis pas là pour te convaincre à tout prix — si en fin d'appel on sent que c'est pas le bon fit, on se dit au revoir en bons termes, et c'est ok. »",
    ],
    why: "Si ton prospect sent que tu as absolument besoin de conclure, le rapport de force s'inverse en sa faveur et il perd tout respect pour ton cadre. En transmettant que tu es prêt à quitter l'appel si nécessaire, tu gardes le lead sur la conversation et tu deviens paradoxalement plus désirable.",
  },
  {
    situation: "Le tout dernier moment de l'appel, juste avant de conclure ou de passer aux prochaines étapes.",
    technique: 'Question de contrôle perçu',
    cover: "Celui qui a l'impression de choisir achète toujours plus facilement.",
    script: [
      "« Ok... qu'est-ce que t'as envie de faire du coup, maintenant ? »",
    ],
    why: "Une décision imposée se subit ; une décision qu'on a l'impression d'avoir prise soi-même, on l'assume et on la défend. En terminant sur une question ouverte qui redonne (en apparence) le contrôle à ton prospect, tu maximises la sensation de libre choix — et cette sensation, à elle seule, fait vendre plus facilement.",
  },
  {
    situation: "Pendant la discovery, avant de présenter ton offre.",
    technique: 'Miroir des critères',
    cover: "Demande-lui l'offre idéale. Puis repitche-lui mot pour mot.",
    script: [
      "« Si tu devais imaginer l'accompagnement parfait pour toi, il ressemblerait à quoi ? »",
      "(Plus tard) « Donc ce que tu m'as décrit — [répète exactement ses mots] — c'est exactement ce qu'on fait. »",
    ],
    why: "Personne ne peut mieux te vendre ton offre que ton prospect lui-même. En lui faisant décrire ses critères idéaux puis en les lui repitchant mot pour mot, tu ne vends plus \"ton\" offre — tu lui présentes la sienne, telle qu'il l'a décrite.",
  },
  {
    situation: "En discovery, quand tu creuses pourquoi ton prospect n'a toujours pas résolu son problème.",
    technique: 'Croyances plutôt que douleurs',
    cover: "Le vrai blocage n'est jamais la douleur. C'est la croyance derrière.",
    script: [
      "« Qu'est-ce qui, à ton avis, t'a empêché de régler ça avant aujourd'hui ? »",
    ],
    why: "Se concentrer uniquement sur la douleur du prospect te donne de l'urgence, mais pas la clé pour la débloquer — parce que ce n'est pas la douleur qui l'a empêché d'agir jusqu'ici, ce sont les croyances et blocages derrière (\"je suis pas fait pour ça\", \"ça marche pas pour moi\"). Identifie et traite ces croyances, et la douleur se résout par la même occasion.",
  },
  {
    situation: "Ton prospect part dans un monologue ou une anecdote qui n'apporte rien à l'appel.",
    technique: 'Recadrage du tempo',
    cover: "S'il raconte sa vie, coupe. Le call, c'est toi qui le mènes.",
    script: [
      "« Je vais te couper deux secondes parce que c'est important — [reviens directement à ta question]. »",
    ],
    why: "Un appel qui traîne en longueur sur du hors-sujet perd en intensité et en tempo — et un appel sans tempo se termine rarement par un closing net. En coupant poliment mais fermement, tu montres aussi que c'est toi qui tiens le cadre de l'appel, pas lui.",
  },
]
