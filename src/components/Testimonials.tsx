'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'

// PLACEHOLDER — replace with real testimonials from lifters/clients
const TESTIMONIALS = [
  {
    quote:
      "The highlight reel was insane — music perfectly synced to my openers. My whole gym is asking who shot it. 100% booking again at the next meet.",
    name: 'Alex T.',
    detail: 'Competitive powerlifter · Provincials 2024',
  },
  {
    quote:
      "Vincent understood what shots matter without being told. The static videos are exactly what my coach needed to break down my deadlift setup.",
    name: 'Jamie R.',
    detail: 'IPF lifter · Western Open',
  },
  {
    quote:
      "Bought the bundle for my first competition. Photos were edited and in my Drive within 10 days. Clean, dark, exactly the aesthetic I wanted.",
    name: 'Priya S.',
    detail: 'Novice lifter · Victoria Barbell Open',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-vlm-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
            Lifters Say
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white">
            What Lifters Are Saying
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              variants={fadeUp}
              className="flex flex-col p-6 rounded-md bg-vlm-card border border-white/5 hover:border-white/10 transition-colors"
            >
              {/* Quote mark */}
              <span className="text-gold font-display font-black text-4xl leading-none mb-3 select-none">
                &ldquo;
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5 italic">
                {t.quote}
              </p>
              <footer>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{t.detail}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>

        <p className="text-center text-xs text-zinc-700 mt-6">
          — Placeholder testimonials — replace with real reviews before launch —
        </p>
      </div>
    </section>
  )
}
