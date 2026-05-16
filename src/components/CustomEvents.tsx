'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'

const CAPABILITIES = [
  ['GYM', 'Day-of shoot, members + PRs, branded delivery.'],
  ['BRAND', 'Campaign content, athlete spotlights, social cuts.'],
  ['TEAM', 'Squad photos, individual portraits, recap reel.'],
  ['SPORT', 'Strongman, weightlifting, BJJ, OCR, and more.'],
  ['EVENT', 'Grand openings, expos, conferences, charity meets.'],
]

export default function CustomEvents() {
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotion()
  const shouldPlay = isInView && !prefersReduced

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '25% 0px', threshold: 0.15 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (shouldPlay) {
      video.play().catch(() => {
        // Decorative background video can remain still if autoplay is blocked.
      })
    } else {
      video.pause()
    }
  }, [shouldPlay])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/5 bg-black py-24 lg:py-32">
      {/* Background photo */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={isInView ? '/videos/previews/custom-events-preview.mp4' : undefined}
          muted
          loop
          playsInline
          preload="none"
          poster="/photos/_MG_2420.jpg"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
      </div>

      <div className="section-shell relative z-10 grid items-end gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-white/55">
              <span className="mono-label text-[11px]">05</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="mono-label text-[11px]">Beyond the platform</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-5 max-w-[12ch] font-display text-[44px] uppercase leading-[0.9] tracking-normal text-white md:text-[72px]">
              Gyms. Brands. Teams. Sports. Custom events.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-[58ch] text-base leading-relaxed text-white/70">
              VLM is expanding beyond powerlifting. Strongman, weightlifting, jiu-jitsu, grand openings,
              campaign shoots, team posters — if it needs a competitive-sports eye behind the lens,
              we'll build a custom day-of package around it.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/contact?subject=custom-event"
                className="mono-label inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-[12px] text-black transition-colors hover:bg-white"
              >
                Plan a Custom Shoot
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="border-t border-white/15"
        >
          {CAPABILITIES.map(([key, value]) => (
            <motion.li key={key} variants={fadeUp} className="flex gap-6 border-b border-white/10 py-5">
              <span className="mono-label w-16 text-[11px] text-gold">{key}</span>
              <span className="text-[15px] text-white/80">{value}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
