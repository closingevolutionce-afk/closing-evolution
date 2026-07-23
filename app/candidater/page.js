import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import CandidaterContent from '@/components/candidater/CandidaterContent'

export const metadata = {
  title: 'Candidater — Closing Evolution',
  description: "Réserve un appel avec Chirine & Emilien pour voir si Closing Evolution est fait pour toi.",
}

export default function CandidaterPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-40 blur-[140px]" />
        <CandidaterContent />
      </main>
      <Footer />
    </>
  )
}
