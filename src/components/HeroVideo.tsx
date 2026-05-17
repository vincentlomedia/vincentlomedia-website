'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { fadeUp, stagger } from '@/lib/motion'

export default function HeroVideo() {
  const prefersReduced = useReducedMotion()
  const [loadVideo, setLoadVideo] = useState(false)
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO_HQ)
  const hasStartedHqRef = useRef(false)
  const hasFallenBackRef = useRef(false)

  useEffect(() => {
    if (prefersReduced) return

    const timeout = window.setTimeout(() => setLoadVideo(true), 900)
    return () => window.clearTimeout(timeout)
  }, [prefersReduced])

  useEffect(() => {
    if (!loadVideo || prefersReduced || videoSrc !== HERO_VIDEO_HQ) return

    const timeout = window.setTimeout(() => {
      if (!hasStartedHqRef.current) useFallbackVideo()
    }, 4500)

    return () => window.clearTimeout(timeout)
  }, [loadVideo, prefersReduced, videoSrc])

  const useFallbackVideo = () => {
    if (hasFallenBackRef.current || videoSrc === HERO_VIDEO_FALLBACK) return
    hasFallenBackRef.current = true
    setVideoSrc(HERO_VIDEO_FALLBACK)
  }

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-black">
      {/* Background video — prefers HQ, falls back to optimized low-bandwidth asset if loading stalls. */}
      <div className="absolute inset-0">
        {!prefersReduced && (
          <video
            src={loadVideo ? videoSrc : undefined}
            className="video-fill"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/photos/_MG_0658.jpg"
            onCanPlayThrough={() => {
              hasStartedHqRef.current = true
            }}
            onPlaying={() => {
              hasStartedHqRef.current = true
            }}
            onError={useFallbackVideo}
            onStalled={useFallbackVideo}
            aria-hidden="true"
          />
        )}
        {/* Fallback still for reduced motion / no-js */}
        <img
          src="/photos/_MG_0658.jpg"
          alt=""
          className="video-fill"
          style={{ display: prefersReduced ? 'block' : 'none' }}
          aria-hidden="true"
        />
        {/* Cinematic overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.85)]" />
      </div>

      <div className="absolute left-0 right-0 top-[88px] z-10 hidden text-white/55 md:block">
        <div className="section-shell flex items-center justify-between">
          <p className="mono-label text-[10px]">VLM · EST. 2023 · VICTORIA, BC</p>
          <p className="mono-label text-[10px]">REEL 03 · MEET DAY LOOP · LIVE</p>
        </div>
      </div>

      {/* Hero content */}
      <div className="section-shell relative z-10 flex min-h-[100svh] flex-1 flex-col justify-end pb-20 pt-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[1160px]"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="mono-label mb-5 text-[11px] text-gold"
          >
            Powerlifter who shoots powerlifters
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="mb-8 max-w-[16ch] font-display text-[14vw] uppercase leading-[0.86] tracking-normal text-warm md:text-[8.5vw] lg:text-[8vw]"
          >
            <span className="block">Powerlifting</span>
            <span className="block">Meet Photography</span>
            <span className="block text-white/55">& Video Packages</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="max-w-[58ch] text-base leading-relaxed text-white/75 md:text-lg"
          >
            Competition-day photos, static lift videos, and highlight reels for lifters
            who want the meet captured properly. <span className="text-white">Packages from $15.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mb-14 mt-9 flex flex-wrap gap-3">
            <Link
              href="/packages"
              className="mono-label inline-flex items-center gap-2 bg-white px-6 py-3.5 text-[12px] text-black transition-colors duration-200 hover:bg-gold"
            >
              Shop Packages
              <ArrowRight size={15} />
            </Link>
            <a
              href="#samples"
              className="mono-label inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-[12px] text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              See Examples
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={fadeUp}
            className="grid max-w-[1000px] grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 md:grid-cols-5"
          >
            {TRUST_ITEMS.map((item, i) => (
              <div key={item} className="flex gap-2">
                <span className="mono-label text-[10px] text-gold">0{i + 1}</span>
                <span className="mono-label text-[10px] normal-case tracking-[0.06em] text-white/75">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-zinc-500"
        aria-hidden="true"
      >
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  )
}

const TRUST_ITEMS = [
  'Shot by a competitive powerlifter',
  'Delivered by Google Drive',
  'Photos in 7–14 days',
  'Static videos in 14–21 days',
  'Highlight reels up to 45 days',
]

const HERO_VIDEO_HQ = '/videos/about/hero-hq.mp4'
const HERO_VIDEO_FALLBACK = '/videos/hero.mp4'
