'use client'

import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

const STEPS = [
  {
    n: '01',
    title: 'Book online',
    body: 'Pick a package on the Squarespace store. Pay once, no subscription or hidden platform fee.',
  },
  {
    n: '02',
    title: 'Compete',
    body: 'Show up to the meet. Coverage follows the rhythm of warm-ups, attempts, and platform moments.',
  },
  {
    n: '03',
    title: 'Get a Drive link',
    body: 'Edited deliverables land in your inbox as soon as they are ready, organized for download and sharing.',
  },
]

export default function Process() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="section-shell">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-white/55">
            <span className="mono-label text-[11px]">04</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="mono-label text-[11px]">Process</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-5 max-w-[16ch] font-display text-[44px] uppercase leading-[0.95] tracking-normal text-white md:text-[64px]">
            Three steps from platform to inbox.
          </motion.h2>

          <motion.div variants={stagger} className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
            {STEPS.map((step) => (
              <motion.div key={step.n} variants={fadeUp} className="bg-black p-8 lg:p-10">
                <p className="mono-label text-[11px] text-gold">{step.n}</p>
                <h3 className="mt-4 font-display text-[28px] uppercase leading-tight tracking-normal text-white">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-white/60">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
