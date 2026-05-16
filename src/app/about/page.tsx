// SEO_TITLE: About | Vincent Lo Media | Powerlifting Photographer
// SEO_DESC:  Vincent Lo Media is run by a competitive powerlifter who understands the sport from the inside.

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Camera, Dumbbell, MapPin } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'

const STATS = [
  { value: '5+', label: 'Years competing in powerlifting' },
  { value: '20+', label: 'Meets covered as photographer' },
  { value: '1000+', label: 'Competition photos delivered' },
  { value: '$15', label: 'Starting price in CAD' },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        {/* Header */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            {/* ASSET: public/photos/_MG_0156.jpg — wide competition shot */}
            <img
              src="/photos/_MG_0156.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-top opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-vlm-black/80 via-vlm-black/70 to-vlm-black" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                The Photographer
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-display font-black uppercase text-5xl md:text-6xl xl:text-7xl tracking-tight text-white mb-5">
                A Powerlifter
                <br />
                Behind the Lens
              </motion.h1>
              <motion.p variants={fadeUp} className="text-zinc-400 text-base leading-relaxed">
                Vincent Lo Media is run by a competitive powerlifter. That means the person
                shooting your meet has stood on the same platform, felt the same nerves, and
                knows exactly which moments matter.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-vlm-dark border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-black text-4xl md:text-5xl text-gold mb-1">{s.value}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28 bg-vlm-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              {/* Photo */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative"
              >
                {/* ASSET: public/photos/_MG_2420.jpg — good portrait/action candidate */}
                <img
                  src="/photos/_MG_2420.jpg"
                  alt="Vincent Lo competing in powerlifting"
                  className="w-full aspect-[3/4] object-cover rounded-md"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 px-3 py-2 bg-vlm-black/80 backdrop-blur-sm rounded border border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-gold" />
                    <span className="text-xs text-zinc-400">Victoria, BC · Canada</span>
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="pt-4"
              >
                <motion.div variants={fadeUp} className="mb-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                    The Story
                  </p>
                  <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-white mb-4">
                    Built From the Inside
                  </h2>
                  <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
                    <p>
                      Most sports photographers don't lift. They don't know the difference
                      between a good depth call and a borderline one. They don't know that
                      the walk-out is where the story starts, or that the third attempt
                      expression is the shot that matters most.
                    </p>
                    <p>
                      Vincent Lo picked up a camera because he was frustrated with the photos
                      coming out of his own meets — blurry, poorly timed, wrong angle.
                      So he started showing up early, learning the platform, and shooting
                      what he knew as an athlete.
                    </p>
                    <p>
                      Every meet VLM covers gets the same treatment: real attention to the
                      lift, not just a shutter at the top. The photos look the way
                      powerlifting feels — heavy, deliberate, and earned.
                    </p>
                  </div>
                </motion.div>

                {/* What VLM covers */}
                <motion.div variants={fadeUp} className="space-y-3 mb-8">
                  {[
                    { icon: Dumbbell, text: 'Sanctioned powerlifting meets across Canada' },
                    { icon: Camera, text: 'Gym shoots, brand content, team coverage' },
                    { icon: MapPin, text: 'Based in Victoria, BC — available for travel' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Icon size={16} className="text-gold flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold hover:bg-gold-light text-black font-bold text-sm uppercase tracking-wide rounded transition-colors cursor-pointer"
                  >
                    Book Your Meet
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Photo grid — equipment/approach */}
        <section className="pb-20 bg-vlm-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-2">
              {[
                '/photos/_MG_0839.jpg',
                '/photos/_MG_0837.jpg',
                '/photos/DSCF2590.jpg',
                '/photos/DSCF2597.jpg',
                '/photos/_MG_2191.jpg',
                '/photos/DSCF2393.jpg',
              ].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded bg-vlm-card">
                  <img
                    src={src}
                    alt={`Competition photography sample ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
