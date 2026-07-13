import { Syne, Inter } from 'next/font/google'
import './globals.css'

const display = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Cercle Élite Closing — Deviens un closer d’élite',
  description:
    'La formation francophone qui transforme les débutants en closers d’élite : roleplay IA en temps réel, simulateur d’objections, parcours structuré et coaching data-driven.',
  metadataBase: new URL('https://cercle-elite-closing.app'),
  openGraph: {
    title: 'Cercle Élite Closing — Deviens un closer d’élite',
    description:
      'Entraîne-toi contre une IA qui joue de vrais prospects. Progresse, débloque des modules, grimpe au classement.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink font-sans text-mist antialiased selection:bg-volt/30 selection:text-white">
        {children}
      </body>
    </html>
  )
}
