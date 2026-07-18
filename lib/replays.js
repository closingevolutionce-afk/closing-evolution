// Détecte le type de lien vidéo pour tenter un affichage intégré (iframe).
// Un lien "Ouvrir sur la plateforme" reste toujours affiché en secours,
// car certaines plateformes bloquent l'intégration (X-Frame-Options) sans
// qu'on puisse le détecter côté client de façon fiable.
export function getEmbedUrl(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const id = u.hostname.includes('youtu.be')
        ? u.pathname.slice(1)
        : u.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : url
    }
    if (u.hostname.includes('loom.com')) {
      return url.replace('/share/', '/embed/')
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : url
    }
    if (u.hostname.includes('drive.google.com')) {
      const match = u.pathname.match(/\/d\/([^/]+)/)
      return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url
    }
    // Fathom, Google Meet et autres : on tente le lien tel quel dans l'iframe.
    return url
  } catch {
    return url
  }
}

export function getPlatformLabel(url) {
  try {
    const hostname = new URL(url).hostname
    if (hostname.includes('fathom.video')) return 'Fathom'
    if (hostname.includes('youtube') || hostname.includes('youtu.be')) return 'YouTube'
    if (hostname.includes('loom.com')) return 'Loom'
    if (hostname.includes('vimeo.com')) return 'Vimeo'
    if (hostname.includes('drive.google.com')) return 'Google Drive'
    if (hostname.includes('meet.google.com')) return 'Google Meet'
    return hostname
  } catch {
    return 'Lien'
  }
}
