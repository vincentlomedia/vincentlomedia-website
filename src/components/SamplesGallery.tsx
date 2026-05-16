'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Camera, Film, Maximize2, Video, Volume2, X } from 'lucide-react'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'
import { PHOTO_SAMPLES, VIDEO_SAMPLES } from '@/data/packages'
import clsx from 'clsx'

type Tab = 'photos' | 'highlight' | 'static'

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'photos', label: 'Photos', icon: Camera },
  { id: 'highlight', label: 'Highlight Reels', icon: Film },
  { id: 'static', label: 'Static Videos', icon: Video },
]

export default function SamplesGallery() {
  const [activeTab, setActiveTab] = useState<Tab>('photos')

  return (
    <section id="samples" className="border-t border-white/5 bg-vlm-black py-24 lg:py-32">
      <div className="section-shell">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-white/55">
            <span className="mono-label text-[11px]">03</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="mono-label text-[11px]">Samples</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-5 max-w-[14ch] font-display text-[44px] uppercase leading-[0.95] tracking-normal text-white md:text-[64px]">
            See exactly what you get.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-[58ch] text-base text-white/60">
            Real competition media — the same quality delivered to every order.
          </motion.p>
        </motion.div>

        {/* Tab bar */}
        <div className="mb-8 flex w-fit items-center gap-1 rounded bg-[#0f0f0f] border border-white/10 p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={clsx(
                'mono-label flex items-center gap-2 rounded-[3px] px-5 py-2.5 text-[11px] transition-all duration-200',
                activeTab === id
                  ? 'bg-white text-black'
                  : 'text-white/65 hover:text-white',
              )}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'photos' && <PhotosTab key="photos" />}
          {activeTab === 'highlight' && <HighlightTab key="highlight" />}
          {activeTab === 'static' && <StaticVideosTab key="static" />}
        </AnimatePresence>
      </div>
    </section>
  )
}

function PhotosTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PHOTO_SAMPLES.map((src, i) => (
          <div
            key={src}
            className={clsx(
              'relative overflow-hidden rounded bg-vlm-card aspect-square group',
              // First photo spans 2 cols on desktop for visual weight
              i === 0 && 'md:col-span-2 md:row-span-2 md:aspect-auto',
            )}
          >
            <img
              src={src}
              alt={`Competition photo sample ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-600 mt-4">
        Sample photos from real competition sessions — all edited by VLM
      </p>
    </motion.div>
  )
}

function HighlightTab() {
  const [hdOpen, setHdOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      {/* Video player */}
      <div className="relative flex justify-center overflow-hidden rounded-md border border-white/5 bg-vlm-card">
        {/* ASSET: public/videos/sample-highlight.mp4 (source: "FELIX GUY HIGHLIGHT REEL.mp4") */}
        <AutoplaySampleVideo
          src="/videos/previews/highlight-preview.mp4"
          label="Highlight reel"
          poster="/photos/_MG_0658.jpg"
          className="block h-[min(72svh,680px)] max-w-full bg-black object-contain"
          onOpenHd={() => setHdOpen(true)}
        />
      </div>

      {/* Description */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
          What You Get
        </p>
        <h3 className="font-display font-bold text-2xl md:text-3xl uppercase text-white mb-4">
          Cinematic Highlight Reel
        </h3>
        <p className="text-zinc-400 leading-relaxed mb-6">
          Music-synced, color-graded, and cut to feature your best attempts
          across squat, bench, and deadlift. Typically 1–2 minutes, formatted
          for social media posting.
        </p>
        <ul className="space-y-2">
          {[
            'All 3 lifts — squat, bench, deadlift',
            'Best attempts selected + edited',
            'Music-synced cuts and transitions',
            'Color-graded cinematic look',
            'Delivered via Google Drive',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-600 mt-4">Delivery: up to 45 days</p>
      </div>
      <AnimatePresence>
        {hdOpen && (
          <HdVideoModal
            title="Highlight Reel"
            src="/videos/sample-highlight.mp4"
            poster="/photos/_MG_0658.jpg"
            orientation="portrait"
            onClose={() => setHdOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function StaticVideosTab() {
  const [hdVideo, setHdVideo] = useState<(typeof VIDEO_SAMPLES)[number] | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {VIDEO_SAMPLES.map((vid) => (
          <div key={vid.label} className="rounded-md overflow-hidden border border-white/5 bg-vlm-card">
            <div className="relative aspect-video bg-vlm-dark">
              {/* ASSET: video paths map — see packages.ts comments */}
              <AutoplaySampleVideo
                src={vid.path}
                previewSrc={vid.previewPath}
                label={`${vid.label} static video`}
                poster={vid.thumbnail}
                className="h-full w-full object-cover"
                onOpenHd={() => setHdVideo(vid)}
              />
            </div>
            <div className="px-4 py-3">
              <p className="font-display font-bold text-sm uppercase tracking-wide text-white">{vid.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">Handheld static video — all 3 attempts available</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-600">
        Sample static videos from real meets — shot handheld from the platform
      </p>
      <AnimatePresence>
        {hdVideo && (
          <HdVideoModal
            title={`${hdVideo.label} Static Video`}
            src={hdVideo.path}
            poster={hdVideo.thumbnail}
            onClose={() => setHdVideo(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function AutoplaySampleVideo({
  src,
  previewSrc,
  label,
  poster,
  className,
  onOpenHd,
}: {
  src: string
  previewSrc?: string
  label: string
  poster: string
  className: string
  onOpenHd?: () => void
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const prefersReduced = useReducedMotion()
  const shouldPlay = isInView && !prefersReduced
  const videoSrc = isInView ? (previewSrc ?? src) : undefined

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '-12% 0px -12% 0px', threshold: 0.35 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (shouldPlay) {
      video.play().catch(() => {
        // If autoplay is blocked, the visible controls still let visitors start the sample.
      })
    } else {
      video.pause()
    }
  }, [shouldPlay])

  return (
    <div ref={containerRef} className="relative flex h-full w-full justify-center bg-black">
      <video
        ref={videoRef}
        src={videoSrc}
        className={className}
        muted
        loop
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={`${label} sample video`}
      />
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 bg-black/60 px-2 py-1 text-[10px] text-zinc-300 backdrop-blur-sm">
        <Volume2 size={12} />
        <span className="mono-label">Muted autoplay</span>
      </div>
      {onOpenHd && (
        <button
          type="button"
          onClick={onOpenHd}
          className="mono-label absolute right-3 top-3 z-10 flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-[10px] text-black transition-colors hover:bg-gold"
          aria-label={`Watch ${label} in HD`}
        >
          <Maximize2 size={12} />
          HD
        </button>
      )}
    </div>
  )
}

function HdVideoModal({
  title,
  src,
  poster,
  orientation = 'landscape',
  onClose,
}: {
  title: string
  src: string
  poster: string
  orientation?: 'landscape' | 'portrait'
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} HD sample video`}
    >
      <motion.div
        className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-md border border-white/10 bg-vlm-black shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-gold">
              HD sample
            </p>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded border border-white/15 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-gold"
            aria-label="Close HD sample"
          >
            <X size={18} />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-black">
          <video
            src={src}
            className={clsx(
              'mx-auto bg-black object-contain',
              orientation === 'portrait'
                ? 'h-[min(68svh,680px)] max-w-full'
                : 'aspect-video w-full',
            )}
            autoPlay
            controls
            playsInline
            poster={poster}
          />
        </div>
        <div className="border-t border-white/10 bg-vlm-black px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="mono-label flex w-full items-center justify-center gap-2 bg-white px-4 py-3 text-[11px] text-black transition-colors hover:bg-gold sm:hidden"
          >
            Close sample
            <X size={14} />
          </button>
          <p className="hidden text-center text-xs text-zinc-500 sm:block">
            Click outside the video or press Escape to close.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
