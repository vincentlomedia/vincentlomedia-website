'use client'

// SEO_TITLE: Contact & Custom Bookings | Vincent Lo Media
// SEO_DESC:  Book powerlifting meet photography or video coverage. Custom packages for gyms, brands, teams, and private events.

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Instagram, Mail, Clock, CheckCircle2 } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'
import clsx from 'clsx'

const SUBJECTS = [
  'General inquiry',
  'Meet booking',
  'Custom event / gym / brand',
  'Packages question',
  'Other',
]

const SUBJECT_PARAM_MAP: Record<string, string> = {
  'custom-event': 'Custom event / gym / brand',
  'custom event': 'Custom event / gym / brand',
  'custom event / gym / brand': 'Custom event / gym / brand',
  'meet-booking': 'Meet booking',
  'meet booking': 'Meet booking',
  packages: 'Packages question',
  'packages-question': 'Packages question',
  'packages question': 'Packages question',
}

interface FormState {
  name: string
  email: string
  subject: string
  meetName: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General inquiry',
    meetName: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const showMeetName = form.subject === 'Meet booking'

  useEffect(() => {
    const subjectParam = new URLSearchParams(window.location.search).get('subject')
    if (!subjectParam) return

    const normalizedSubject = subjectParam.replace(/\+/g, ' ').toLowerCase()
    const subject = SUBJECT_PARAM_MAP[normalizedSubject]
    if (subject) {
      setForm((f) => ({ ...f, subject }))
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const subject = encodeURIComponent(`[VLM] ${form.subject}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Subject: ${form.subject}`,
        form.meetName ? `Meet name: ${form.meetName}` : '',
        '',
        form.message,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    setSubmitted(true)
    setLoading(false)
    window.location.href = `mailto:vincentlomedia@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Nav />
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 md:py-24 bg-vlm-dark border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-gold font-display font-semibold mb-3">
                Get in Touch
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-display font-black uppercase text-5xl md:text-6xl tracking-tight text-white mb-4">
                Book Your
                <br />
                <span className="text-gold">Coverage</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-zinc-400 leading-relaxed">
                Questions about a specific meet, custom coverage for your gym or brand,
                or anything else — reach out and VLM will get back to you.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="py-16 bg-vlm-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {/* Form */}
              <div className="md:col-span-2">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-8 rounded-md border border-white/5 bg-vlm-card"
                  >
                    <CheckCircle2 size={40} className="text-gold mb-4" />
                    <h2 className="font-display font-bold text-2xl uppercase text-white mb-2">
                      Email Draft Opened
                    </h2>
                    <p className="text-zinc-400 text-sm max-w-sm">
                      Your email app should now have a pre-filled draft. Send it there and VLM will get back to you within 1–2 business days.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <motion.div variants={fadeUp}>
                        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-display font-semibold">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 bg-vlm-card border border-white/8 rounded text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                        />
                      </motion.div>
                      <motion.div variants={fadeUp}>
                        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-display font-semibold">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-vlm-card border border-white/8 rounded text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={fadeUp}>
                      <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-display font-semibold">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-vlm-card border border-white/8 rounded text-white text-sm focus:outline-none focus:border-gold/40 transition-colors cursor-pointer"
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </motion.div>

                    {showMeetName && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        variants={fadeUp}
                      >
                        <label htmlFor="meetName" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-display font-semibold">
                          Meet Name
                        </label>
                        <input
                          id="meetName"
                          name="meetName"
                          type="text"
                          value={form.meetName}
                          onChange={handleChange}
                          placeholder="e.g. Kraken Open 2025"
                          className="w-full px-4 py-3 bg-vlm-card border border-white/8 rounded text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                        />
                      </motion.div>
                    )}

                    <motion.div variants={fadeUp}>
                      <label htmlFor="message" className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 font-display font-semibold">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell VLM about your meet, event, or question..."
                        className="w-full px-4 py-3 bg-vlm-card border border-white/8 rounded text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-gold/40 transition-colors resize-none"
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <button
                        type="submit"
                        disabled={loading}
                        className={clsx(
                          'inline-flex items-center gap-2 px-6 py-3.5 font-bold text-sm uppercase tracking-wide rounded transition-colors cursor-pointer',
                          loading
                            ? 'bg-gold/60 text-black/60 cursor-not-allowed'
                            : 'bg-gold hover:bg-gold-light text-black',
                        )}
                      >
                        {loading ? 'Opening...' : 'Open Email Draft'}
                        {!loading && <ArrowRight size={15} />}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </div>

              {/* Sidebar */}
              <motion.aside
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-8"
              >
                <motion.div variants={fadeUp}>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-display font-semibold mb-4">
                    Direct Contact
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:vincentlomedia@gmail.com"
                      className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <Mail size={15} className="text-gold flex-shrink-0" />
                      vincentlomedia@gmail.com
                    </a>
                    <a
                      href="https://www.instagram.com/vincentlomedia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      <Instagram size={15} className="text-gold flex-shrink-0" />
                      @vincentlomedia
                    </a>
                    <div className="flex items-center gap-3 text-sm text-zinc-500">
                      <Clock size={15} className="text-zinc-600 flex-shrink-0" />
                      Replies within 1–2 business days
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="p-5 rounded-md border border-white/5 bg-vlm-card">
                  <p className="text-xs uppercase tracking-widest text-zinc-600 font-display font-semibold mb-3">
                    Checkout Note
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    All packages are purchased directly via the VLM Squarespace store. The contact
                    form is for meet bookings, custom quotes, and general questions — not for checkout.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-display font-semibold mb-3">
                    Ready to Order?
                  </p>
                  <a
                    href="/packages#packages"
                    className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors cursor-pointer"
                  >
                    Browse all packages
                    <ArrowRight size={13} />
                  </a>
                </motion.div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
