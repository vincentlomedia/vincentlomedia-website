'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, viewportOnce } from '@/lib/motion'

const TESTIMONIALS = [
  {
    quote:
      'Vincent Lo Media absolutely nailed the vibe I was hoping for. My highlight reel felt intense without being over edited, and they captured all the moments I actually cared about. Super easy team to talk to in person too - everyone was friendly the whole weekend.',
    detail: 'Highlight reel package',
  },
  {
    quote:
      'The turnaround time honestly shocked me. I expected to wait a couple weeks for photos and got mine way faster than expected. The angles and timing on the shots made every lift look insane.',
    detail: 'Photo package',
  },
  {
    quote:
      'You can tell Vincent and his team genuinely care about powerlifting and not just filming random content. They knew exactly where to stand for the best shots and somehow caught every important moment from my attempts.',
    detail: 'Meet coverage',
  },
  {
    quote:
      'Probably the smoothest media experience I have had at a meet. Vincent was super approachable in person, checked in with athletes throughout the day, and the final highlight reel looked clean and professional.',
    detail: 'Highlight reel package',
  },
  {
    quote:
      'The photos came out unreal. A lot of media teams just spam burst photos and hope for the best, but these actually looked intentional. The lighting, framing, and lift timing were all perfect.',
    detail: 'Photo package',
  },
  {
    quote:
      'I could immediately tell how much work the entire Vincent Lo Media crew puts into these events. They were running around nonstop all day but still kept a positive attitude with everyone.',
    detail: 'Meet coverage',
  },
  {
    quote:
      'The highlight reel was exactly what I wanted. Nothing cheesy or overdone - just hard hitting edits that made the lifts look powerful and exciting. Easily my favourite meet video I have gotten.',
    detail: 'Highlight reel package',
  },
  {
    quote:
      'Everyone on the team was super respectful and easy to work with. Even during a busy meet they still made time to answer questions and make athletes feel comfortable.',
    detail: 'Athlete experience',
  },
  {
    quote:
      'I have worked with a few meet media companies before and Vincent Lo Media definitely stood out. The quality felt more like sports coverage than standard gym photos.',
    detail: 'Professional coverage',
  },
  {
    quote:
      'Vincent was honestly one of the nicest people at the event. Super professional but still easygoing and friendly when talking with athletes between flights.',
    detail: 'Athlete experience',
  },
  {
    quote:
      'The camera angles were crazy good. Somehow they managed to make deadlifts look cinematic without making it feel fake or overly edited.',
    detail: 'Video package',
  },
  {
    quote:
      'The whole team brought a really good energy to the meet. You could tell they actually enjoy what they do and that translated into the final product.',
    detail: 'Meet coverage',
  },
  {
    quote:
      'I pre ordered media and it was 100% worth it. The photos came back quickly, communication was clear the entire time, and the quality was way higher than I expected.',
    detail: 'Photo package',
  },
  {
    quote:
      'The highlight reel captured the atmosphere of the competition perfectly. It did not just show lifts - it actually felt like reliving the meet.',
    detail: 'Highlight reel package',
  },
  {
    quote:
      'Vincent Lo Media made the athletes feel important. They were constantly moving around trying to get the best shots for everybody instead of only focusing on top lifters.',
    detail: 'Athlete-first coverage',
  },
  {
    quote:
      'One thing I appreciated was how approachable the whole crew was. A lot of media teams keep to themselves, but Vincent and his team were genuinely fun to chat with throughout the day.',
    detail: 'Team experience',
  },
  {
    quote:
      'The editing style was clean, modern, and actually fit powerlifting. It looked professional while still keeping the raw intensity of the sport.',
    detail: 'Editing style',
  },
  {
    quote:
      'You can really see the amount of effort that goes into their work. Long meet days, nonstop filming, quick delivery times - the dedication definitely shows in the final media.',
    detail: 'Meet coverage',
  },
  {
    quote:
      'I have never had competition photos where I actually liked almost every shot. Vincent Lo Media somehow managed to capture all my best angles and important moments.',
    detail: 'Photo package',
  },
  {
    quote:
      'From the first interaction at weigh ins to receiving the final media, the entire experience was smooth. Super friendly team, great communication, and really high quality work.',
    detail: 'Client experience',
  },
]

export default function Testimonials() {
  const prefersReduced = useReducedMotion()
  const [isPaused, setIsPaused] = useState(false)
  const carouselItems = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="bg-vlm-black py-20 md:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12 text-center"
        >
          <motion.p variants={fadeUp} className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Lifters Say
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            What Lifters Are Saying
          </motion.h2>
        </motion.div>

        {prefersReduced ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </motion.div>
        ) : (
          <div
            className="relative -mx-4 overflow-hidden px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false)
              }
            }}
          >
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-vlm-black to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-vlm-black to-transparent" />
            <div
              className="testimonial-carousel-track flex w-max gap-4"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {carouselItems.map((testimonial, i) => (
                <div key={`${testimonial.quote}-${i}`} className="w-[min(82vw,380px)] shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <motion.blockquote
      variants={fadeUp}
      tabIndex={0}
      className="flex h-full flex-col rounded-md border border-white/5 bg-vlm-card p-6 transition-colors hover:border-white/10"
    >
      <span className="mb-3 select-none font-display text-4xl font-black leading-none text-gold">
        &ldquo;
      </span>
      <p className="mb-5 flex-1 text-sm italic leading-relaxed text-zinc-300">
        {testimonial.quote}
      </p>
      <footer>
        <p className="text-sm font-semibold text-white">Anonymous client</p>
        <p className="mt-0.5 text-xs text-zinc-600">{testimonial.detail}</p>
      </footer>
    </motion.blockquote>
  )
}
