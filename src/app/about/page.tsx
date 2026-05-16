// SEO_TITLE: About | Vincent Lo Media | Powerlifting Media Team
// SEO_DESC:  Vincent Lo Media is a powerlifting media team that understands the sport from the inside.

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Camera, Dumbbell, MapPin } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'

const STATS = [
  { value: '5+', label: 'Years on the platform' },
  { value: '20+', label: 'Meets covered by VLM' },
  { value: '1000+', label: 'Competition photos delivered' },
  { value: '$15', label: 'Starting price in CAD' },
]

const PROMO_VIDEOS = [
  {
    src: '/videos/about/hero-hq.mp4',
    fallbackSrc: '/videos/hero.mp4',
    poster: '/photos/_MG_0658.jpg',
    label: 'Meet day coverage',
  },
  {
    src: '/videos/about/promo-1-hq.mp4',
    fallbackSrc: '/videos/promo-1.mp4',
    poster: '/photos/_MG_0821.jpg',
    label: 'Platform perspective',
  },
  {
    src: '/videos/about/promo-2-hq.mp4',
    fallbackSrc: '/videos/promo-2.mp4',
    poster: '/photos/_MG_0327.jpg',
    label: 'Athlete-first media',
  },
  {
    src: '/videos/about/promo-4-hq.mp4',
    fallbackSrc: '/videos/promo-4.mp4',
    poster: '/photos/_MG_2249.jpg',
    label: 'Competition atmosphere',
  },
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
                The Team
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-display font-black uppercase text-5xl md:text-6xl xl:text-7xl tracking-tight text-white mb-5">
                Powerlifters
                <br />
                Behind the Lens
              </motion.h1>
              <motion.p variants={fadeUp} className="text-zinc-400 text-base leading-relaxed">
                Vincent Lo Media is a growing team built around powerlifters. That means the
                people shooting your meet understand the platform from lived experience: the
                nerves, the timing, and the moments athletes actually care about.
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
                {/* ASSET: public/photos/vincent-lo-headshot.png — Vincent Lo headshot from Drive */}
                <img
                  src="/photos/vincent-lo-headshot.png"
                  alt="Vincent Lo"
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
                      VLM has grown beyond a one-person setup into an expanding crew made
                      primarily of powerlifters. The team knows what it feels like to wait for
                      a third attempt, read the room before a big pull, and understand why a
                      small moment between lifts can matter as much as the lift itself.
                    </p>
                    <p>
                      Every meet we cover gets the same athlete-first treatment: real attention
                      to the lift, not just a shutter at the top. The media looks the way
                      powerlifting feels — heavy, deliberate, and earned.
                    </p>
                  </div>
                </motion.div>

                {/* What VLM covers */}
                <motion.div variants={fadeUp} className="space-y-3 mb-8">
                  {[
                    { icon: Dumbbell, text: 'Sanctioned powerlifting meets across Canada' },
                    { icon: Camera, text: 'Powerlifter-led photo and video coverage' },
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

        {/* Promo video grid */}
        <section className="pb-20 bg-vlm-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                  VLM in motion
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl uppercase text-white">
                  Meet Day Media
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                Promo clips from real competition coverage, cut for the pace and pressure of the platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {PROMO_VIDEOS.map((video, i) => (
                <div
                  key={video.src}
                  className="group relative overflow-hidden rounded-md border border-white/10 bg-vlm-card"
                >
                  <PromoVideoTile video={video} />
                  <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3">
                    <span className="mono-label text-[10px] text-white/70">
                      0{i + 1}
                    </span>
                    <span className="h-px w-8 bg-white/20" />
                    <span className="mono-label text-[10px] text-white/70">
                      {video.label}
                    </span>
                  </div>
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

function PromoVideoTile({ video }: { video: (typeof PROMO_VIDEOS)[number] }) {
  const [src, setSrc] = useState(video.src)

  return (
    <video
      src={src}
      poster={video.poster}
      className="aspect-video w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
      onError={() => {
        if (src !== video.fallbackSrc) {
          setSrc(video.fallbackSrc)
        }
      }}
    />
  )
}
