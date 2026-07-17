// Nombre max de messages (closer + prospect confondus) dans une session de roleplay,
// pour plafonner le coût d'un appel qui n'en finirait pas. Partagé entre l'API route
// (contrôle serveur, source de vérité) et l'UI (désactive l'input avant la limite).
export const ARENA_MAX_MESSAGES = 20
