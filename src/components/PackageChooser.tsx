'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'
import clsx from 'clsx'

const OPTIONS = [
  {
    title: 'Best Value',
    description: 'Complete bundles that combine edited photos and video in one order.',
    href: '/packages?filter=bundle#packages',
    borderHover: 'hover:border-gold/25',
  },
  {
    title: 'Photos Only',
    description: 'Edited competition photos from your session. Single photos from $15.',
    href: '/packages?filter=photo#packages',
    borderHover: 'hover:border-zinc-400/20',
  },
  {
    title: 'Video Only',
    description: 'Static handheld lifts, all attempts, or a cinematic highlight reel.',
    href: '/packages?filter=video#packages',
    borderHover: 'hover:border-sky-400/20',
  },
  {
    title: 'Social Media',
    description: 'Clips and reels edited and formatted for Instagram or TikTok.',
    href: '/packages?filter=video#packages',
    borderHover: 'hover:border-pink-400/20',
  },
  {
    title: 'Coach Review',
    description: 'Clean handheld static videos — unedited angles for form analysis.',
    href: '/packages?filter=video#packages',
    borderHover: 'hover:border-violet-400/20',
  },
  {
    title: 'Custom Event',
    description: 'Gyms, brands, teams, and private meets. Contact for a custom quote.',
    href: '/contact?subject=custom-event',
    borderHover: 'hover:border-emerald-400/20',
  },
]

type PackageChooserProps = {
  compactMobile?: boolean
}

export default function PackageChooser({ compactMobile = false }: PackageChooserProps) {
  return (
    <section className={clsx('bg-vlm-black md:py-24 lg:py-32', compactMobile ? 'py-4' : 'py-6')}>
      <div className="section-shell">
        {compactMobile && (
          <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
            <div className="flex items-center gap-3 text-white/55">
              <span className="mono-label text-[10px]">01</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="mono-label text-[10px]">Package chooser</span>
            </div>
            <span className="mono-label text-[10px] text-white/35">Tap to filter</span>
          </div>
        )}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={clsx('mb-4 md:mb-14', compactMobile && 'hidden md:block')}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-white/55">
            <span className="mono-label text-[11px]">01</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="mono-label text-[11px]">Package chooser</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-3 font-display text-[26px] uppercase leading-[0.95] tracking-normal text-white md:mt-5 md:max-w-[14ch] md:text-[64px]">
            Start with what you actually need.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-2 max-w-[36ch] text-xs leading-relaxed text-white/55 md:mt-5 md:max-w-[58ch] md:text-base md:text-white/60">
            Six straight answers. Pick the one that sounds like your meet and we'll filter the catalog for you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={clsx(
            'grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3',
            compactMobile ? 'grid-cols-3 md:grid-cols-2' : 'grid-cols-2',
          )}
        >
          {OPTIONS.map((option, i) => (
            <motion.div key={option.title} variants={fadeUp}>
              <Link
                href={option.href}
                className={clsx(
                  'group relative flex flex-col bg-vlm-black text-left transition-colors hover:bg-[#141414] md:min-h-[180px] md:p-6 lg:p-8',
                  compactMobile ? 'min-h-[52px] justify-between p-2 sm:min-h-[120px] sm:p-5 md:justify-start' : 'min-h-[68px] p-3 sm:min-h-[120px] sm:p-5',
                  option.borderHover,
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="mono-label text-[9px] text-white/40 md:text-[10px]">0{i + 1} / 06</span>
                  <span className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold">→</span>
                </div>
                <p
                  className={clsx(
                    'font-display uppercase leading-[0.95] tracking-normal text-white md:mt-8 md:text-[28px] lg:text-[34px]',
                    compactMobile ? 'mt-1 text-[14px] sm:mt-5 sm:text-[24px]' : 'mt-2 text-[18px] sm:mt-5 sm:text-[24px]',
                  )}
                >
                  {option.title}
                </p>
                <p className="mt-2 hidden text-sm leading-relaxed text-white/55 sm:block md:mt-3">{option.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
