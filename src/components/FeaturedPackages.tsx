'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'
import { packages } from '@/data/packages'
import PackageCard from './PackageCard'

const FEATURED_IDS = [
  'bundle-ultimate-all-media',
  'bundle-photos-static',
  'bundle-highlight-static',
]

export default function FeaturedPackages() {
  const featured = FEATURED_IDS.map((id) => packages.find((p) => p.id === id)).filter(Boolean) as typeof packages

  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="section-shell">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-white/55">
              <span className="mono-label text-[11px]">02</span>
              <span className="h-px w-8 bg-white/20" />
              <span className="mono-label text-[11px]">Featured packages</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="mt-5 max-w-[14ch] font-display text-[44px] uppercase leading-[0.95] tracking-normal text-white md:text-[64px]">
              The three everyone buys.
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/packages#packages"
              className="mono-label inline-flex items-center gap-2 text-[11px] text-white/60 transition-colors hover:text-gold"
            >
              View all packages
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {featured.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} autoPreview />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
