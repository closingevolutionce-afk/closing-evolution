import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_PREFIXES = [
  '/parcours',
  '/arena',
  '/objections',
  '/defi',
  '/mindset',
  '/profil',
  '/coach',
  '/onboarding',
  '/replays',
]

// Fermé aux comptes en accès "apercu" (acompte versé, solde en attente) —
// ce sont les fonctionnalités qui coûtent en appels IA.
const FULL_ACCESS_ONLY_PREFIXES = ['/arena', '/objections', '/defi']

export async function middleware(request) {
  let response = NextResponse.next({ request })

  // Si Supabase n'est pas encore configuré, on laisse l'app tourner sans auth
  // plutôt que de bloquer tout le monde derrière un écran cassé.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  const needsFullAccess = FULL_ACCESS_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (user && needsFullAccess) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('access_level')
      .eq('id', user.id)
      .single()

    if (profile?.access_level && profile.access_level !== 'complet') {
      const url = request.nextUrl.clone()
      url.pathname = '/parcours'
      url.searchParams.set('limited', '1')
      return NextResponse.redirect(url)
    }
  }

  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/parcours'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/arena|api/objections|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
