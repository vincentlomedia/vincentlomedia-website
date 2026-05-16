'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'
import clsx from 'clsx'

export const FAQ_ITEMS = [
  {
    q: 'What does Vincent Lo Media sell?',
    a: 'VLM sells powerlifting meet photography and video packages. Products include edited photo sets, handheld static lift videos, cinematic highlight reels, and bundles. Packages start from $15 CAD and are delivered via Google Drive.',
  },
  {
    q: 'Where does Vincent Lo Media shoot?',
    a: 'VLM primarily covers powerlifting competitions in Canada, including sanctioned meets such as the Victoria Barbell Open, Summer Open, and Kraken Open. Coverage for other locations and private events is available — contact for details.',
  },
  {
    q: 'How do I receive my photos and videos?',
    a: "All media is delivered via a private Google Drive folder. After the meet, you'll receive a download link by email. No app download or subscription is required.",
  },
  {
    q: 'How long does delivery take?',
    a: 'Edited photos are typically delivered within 7–14 days after the competition. Static handheld videos take 14–21 days. Highlight reels take up to 45 days due to the editing time involved. Express Delivery cuts these windows roughly in half.',
  },
  {
    q: 'Which package should I buy?',
    a: 'If you want everything, the Edited Photos + Highlight Reel bundle is the most popular choice. For photos only, the Edited Photo Package covers your full session. For video only, the 3 Lift Highlight Reel is the top seller. Single photos and single attempt videos start at $15 if you want to start small.',
  },
  {
    q: 'Can I buy after the competition?',
    a: "Yes — packages can be purchased after the meet as long as VLM was present and shooting. Coverage is not guaranteed if you didn't purchase before the meet, but if footage is available, orders are accepted. Contact to confirm availability.",
  },
  {
    q: 'What is included in bundle packages?',
    a: 'Bundles combine multiple product types in a single order at a discount. The Edited Photos + Highlight Reel bundle includes your full edited photo set plus a music-synced highlight reel. The Full Power Photos + Static Videos bundle includes the photo set and all 9 handheld lift videos. Check each product page for exact deliverables.',
  },
]

interface Props {
  preview?: boolean // shows only first 3 items with a "Full FAQ" link
}

export default function FAQ({ preview = false }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const items = preview ? FAQ_ITEMS.slice(0, 3) : FAQ_ITEMS

  return (
    <section className={clsx('py-20 md:py-28', preview ? 'bg-vlm-dark' : 'bg-vlm-black')}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
            Common Questions
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white">
            {preview ? 'Quick Answers' : 'Frequently Asked'}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-2"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-md border border-white/5 overflow-hidden bg-vlm-card hover:border-white/10 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white text-sm leading-relaxed">{item.q}</span>
                <span className="flex-shrink-0 text-gold mt-0.5">
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {preview && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-6 text-center"
          >
            <Link
              href="/packages#faq"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              See all {FAQ_ITEMS.length} questions
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
