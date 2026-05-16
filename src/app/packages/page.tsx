'use client'

// SEO_TITLE: Media Packages | Powerlifting Photography & Video | Vincent Lo Media
// SEO_DESC:  Browse all powerlifting meet photography and video packages. Photos from $15, bundles, highlight reels, bench-only packages, and more.

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PackageCard from '@/components/PackageCard'
import PackageChooser from '@/components/PackageChooser'
import FAQ from '@/components/FAQ'
import { packages, FILTERS, type FilterId, type MeetPackage } from '@/data/packages'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'
import clsx from 'clsx'

// Group packages by event label for "By Event" view
function groupByEvent(pkgs: MeetPackage[]) {
  const groups: Record<string, MeetPackage[]> = {}
  pkgs.forEach((p) => {
    const key = p.eventLabel ?? 'Other'
    if (!groups[key]) groups[key] = []
    groups[key].push(p)
  })
  return groups
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<PackagesFallback />}>
      <PackagesContent />
    </Suspense>
  )
}

function PackagesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')

  // Respect ?filter= query param on load
  useEffect(() => {
    const f = searchParams.get('filter') as FilterId | null
    if (f && FILTERS.some((x) => x.id === f)) {
      setActiveFilter(f)
    } else {
      setActiveFilter('all')
    }

    if (window.location.hash === '#packages') {
      requestAnimationFrame(() => {
        document.getElementById('packages')?.scrollIntoView({ block: 'start' })
      })
    }
  }, [searchParams])

  const applyFilter = (filter: FilterId) => {
    setActiveFilter(filter)
    router.replace(filter === 'all' ? '/packages#packages' : `/packages?filter=${filter}#packages`, {
      scroll: false,
    })
    requestAnimationFrame(() => {
      document.getElementById('packages')?.scrollIntoView({ block: 'start' })
    })
  }

  const filtered = (() => {
    if (activeFilter === 'all') return packages
    if (activeFilter === 'bestseller') return packages.filter((p) => p.isBestSeller)
    return packages.filter((p) => p.category === activeFilter)
  })()

  const isEventView = activeFilter === 'event'
  const eventGroups = isEventView ? groupByEvent(filtered) : null

  return (
    <>
      <Nav />
      <main className="pt-16 md:pt-20">
        {/* Page header */}
        <section className="relative overflow-hidden border-b border-white/5 bg-vlm-dark py-10 md:py-28">
          <div className="absolute inset-0">
            <img
              src="/photos/_MG_0806.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-8"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-vlm-dark via-vlm-dark/95 to-vlm-dark/80" />
          </div>
          <div className="section-shell relative z-10">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.p variants={fadeUp} className="mono-label mb-2 text-[10px] text-gold md:mb-3 md:text-[11px]">
                Vincent Lo Media
              </motion.p>
              <motion.h1 variants={fadeUp} className="mb-3 font-display text-[46px] uppercase leading-[0.9] tracking-normal text-white md:mb-4 md:text-[96px]">
                Media Packages
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-2 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                Competition-day photography and video packages. Delivered via Google Drive.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-gold font-medium">
                Starting from <span className="font-bold">$15</span>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Package Chooser */}
        <PackageChooser compactMobile />

        {/* Filter bar + Grid */}
        <section id="packages" className="scroll-mt-20 bg-vlm-black py-8 md:scroll-mt-24 md:py-16">
          <div className="section-shell">
            {/* Filters */}
            <div className="mb-5 flex flex-wrap gap-2 md:mb-10">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => applyFilter(f.id)}
                  className={clsx(
                    'mono-label border px-4 py-2 text-[11px] transition-all duration-200',
                    activeFilter === f.id
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-zinc-400 border-white/10 hover:text-white hover:border-white/25',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="mono-label mb-4 text-[10px] text-white/40 md:mb-6">
              {filtered.length} package{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* Event grouped view */}
            {isEventView && eventGroups ? (
              <div className="space-y-14">
                {Object.entries(eventGroups).map(([event, pkgs]) => (
                  <div key={event}>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white">
                        {event}
                      </h2>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOnce}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                      {pkgs.map((pkg, i) => (
                        <PackageCard key={pkg.id} pkg={pkg} index={i} autoPreview />
                      ))}
                    </motion.div>
                  </div>
                ))}
              </div>
            ) : (
              /* Flat grid */
              <motion.div
                key={activeFilter}
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} autoPreview />
                ))}
              </motion.div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-zinc-600">
                <p className="text-lg font-display uppercase tracking-wide">No packages found</p>
                <button
                  onClick={() => applyFilter('all')}
                  className="mt-4 text-sm text-gold hover:text-gold-light cursor-pointer"
                >
                  Show all packages
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Full FAQ */}
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  )
}

function PackagesFallback() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20 bg-vlm-black">
        <section className="py-24 bg-vlm-dark border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
              Vincent Lo Media
            </p>
            <h1 className="font-display font-black uppercase text-5xl md:text-6xl tracking-tight text-white">
              Media Packages
            </h1>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
