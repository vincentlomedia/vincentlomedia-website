'use client'

// TEMPLATE: Meet-specific landing page
// SEO pattern: "[Meet Name] Photography & Video Packages | Vincent Lo Media"
// Duplicate this for each new meet; wire real data via packages.ts or CMS

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PackageCard from '@/components/PackageCard'
import FAQ from '@/components/FAQ'
import { packages } from '@/data/packages'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'

// MOCKED meet data — Codex wires from CMS or data file per meet slug
const MEET_DATA: Record<string, {
  name: string
  location: string
  date: string
  deadline: string
  description: string
  packageIds: string[]
  heroPhoto: string
}> = {
  'kraken-open-2025': {
    name: 'Kraken Open 2025',
    location: 'Victoria, BC',
    date: 'TBD 2025', // TODO: wire real date
    deadline: 'TBD', // TODO: wire booking deadline
    description:
      'Full competition coverage for Kraken Open 2025. Edited photos, highlight reels, and static lift videos available. Limited spots — book early to guarantee your coverage.',
    packageIds: ['event-kraken-open-2025', 'bundle-photos-highlight', 'video-highlight-reel', 'photo-edited-package'],
    heroPhoto: '/photos/_MG_0806.jpg',
  },
  'victoria-barbell': {
    name: 'Victoria Barbell',
    location: 'Victoria, BC',
    date: 'TBD',
    deadline: 'TBD',
    description:
      'Photography and video packages for Victoria Barbell Club competitions. Edited photos and handheld static videos available.',
    packageIds: ['event-victoria-barbell', 'bundle-photos-static', 'photo-edited-package'],
    heroPhoto: '/photos/_MG_0327.jpg',
  },
}

const FALLBACK_MEET = {
  name: 'Upcoming Meet',
  location: 'Canada',
  date: 'TBD',
  deadline: 'TBD',
  description: 'Photography and video packages for this competition.',
  packageIds: ['bundle-photos-highlight', 'video-highlight-reel', 'photo-edited-package'],
  heroPhoto: '/photos/_MG_0658.jpg',
}

interface Props {
  params: { slug: string }
}

export default function MeetPage({ params }: Props) {
  const meet = MEET_DATA[params.slug] ?? { ...FALLBACK_MEET, name: params.slug }
  const meetPackages = meet.packageIds
    .map((id) => packages.find((p) => p.id === id))
    .filter(Boolean) as typeof packages

  return (
    <>
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={meet.heroPhoto}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-vlm-black/60 via-vlm-black/70 to-vlm-black" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                Meet Coverage
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-display font-black uppercase text-5xl md:text-6xl tracking-tight text-white mb-5">
                {meet.name}
              </motion.h1>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-5">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin size={14} className="text-gold" />
                  {meet.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Calendar size={14} className="text-gold" />
                  {meet.date}
                </div>
              </motion.div>
              <motion.p variants={fadeUp} className="text-zinc-400 leading-relaxed mb-6">
                {meet.description}
              </motion.p>

              {meet.deadline !== 'TBD' && (
                <motion.div variants={fadeUp} className="flex items-start gap-3 p-4 rounded border border-amber-900/50 bg-amber-950/30">
                  <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300">Booking Deadline: {meet.deadline}</p>
                    <p className="text-xs text-amber-700 mt-0.5">Orders placed after this date may not be fulfilled.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Packages for this meet */}
        <section className="py-16 bg-vlm-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mb-10"
            >
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                Available For This Meet
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl uppercase tracking-tight text-white">
                Packages
              </motion.h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {meetPackages.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Samples — reuse site-wide gallery */}
        <section className="py-16 bg-vlm-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                From Previous Meets
              </p>
              <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-white mb-2">
                What to Expect
              </h2>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                '/photos/_MG_0658.jpg',
                '/photos/_MG_0821.jpg',
                '/photos/_MG_0327.jpg',
                '/photos/_MG_0138.jpg',
                '/photos/_MG_2249.jpg',
                '/photos/DSCF3338.jpg',
              ].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded bg-vlm-card">
                  <img
                    src={src}
                    alt={`Sample competition photo ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet-specific FAQ */}
        <div id="faq">
          <FAQ />
        </div>

        {/* CTA strip */}
        <section className="py-16 bg-vlm-dark border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-zinc-500 text-sm mb-4">Questions about this meet?</p>
            <Link
              href="/contact?subject=Meet+booking"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light text-black font-bold text-sm uppercase tracking-wide rounded transition-colors cursor-pointer"
            >
              Contact VLM
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
