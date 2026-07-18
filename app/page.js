import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import BangersMarquee from '@/components/landing/BangersMarquee'
import SocialProof from '@/components/landing/SocialProof'
import Features from '@/components/landing/Features'
import Levels from '@/components/landing/Levels'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import Founders from '@/components/landing/Founders'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BangersMarquee />
        <SocialProof />
        <Features />
        <Levels />
        <HowItWorks />
        <Testimonials />
        <Founders />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
