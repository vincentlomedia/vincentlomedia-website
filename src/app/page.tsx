// SEO_TITLE: Powerlifting Meet Photography & Video Packages | Vincent Lo Media
// SEO_DESC:  Competition-day photos, static lift videos, and highlight reels. Starting from $15.

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HeroVideo from '@/components/HeroVideo'
import PackageChooser from '@/components/PackageChooser'
import FeaturedPackages from '@/components/FeaturedPackages'
import SamplesGallery from '@/components/SamplesGallery'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import CustomEvents from '@/components/CustomEvents'
import Process from '@/components/Process'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroVideo />
        <PackageChooser />
        <FeaturedPackages />
        <SamplesGallery />
        <Process />
        <CustomEvents />
        <Testimonials />
        <FAQ preview />
      </main>
      <Footer />
    </>
  )
}
