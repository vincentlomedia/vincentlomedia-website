'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle2,
  Dumbbell,
  Layers,
  Play,
  Video,
  Volume2,
  X,
  Zap,
} from 'lucide-react'
import clsx from 'clsx'
import {
  canAddExpressDelivery,
  EXPRESS_DELIVERY_EXCLUDED_PACKAGE_IDS,
  EXPRESS_DELIVERY_PRICE_CAD,
  type MeetPackage,
  type PackageBadge,
} from '@/data/packages'
import type { CheckoutFieldKey } from '@/data/checkoutFields'
import { getCheckoutFields } from '@/data/checkoutFields'
import { fadeUp } from '@/lib/motion'

// Category-specific graphic configs
const CATEGORY_CONFIG = {
  bundle: {
    Icon: Layers,
    stripe: '#E4B44B',
    label: 'Bundles',
  },
  photo: {
    Icon: Camera,
    label: 'Photo',
    stripe: '#9DB7C7',
  },
  video: {
    Icon: Video,
    label: 'Video',
    stripe: '#EFEBE2',
  },
  bench: {
    Icon: Dumbbell,
    label: 'Bench Only',
    stripe: '#C58A6A',
  },
  addon: {
    Icon: Zap,
    label: 'Add-on',
    stripe: '#7A7A7A',
  },
  event: {
    Icon: Calendar,
    label: 'Event',
    stripe: '#A8A39A',
  },
}

const BADGE_CONFIG: Record<PackageBadge, string> = {
  'Most Popular': 'bg-gold/10 text-gold border border-gold/30',
  'Best Value': 'bg-gold/10 text-gold border border-gold/30',
  'Best Price': 'bg-white/5 text-white/85 border border-white/15',
  'For Coaches': 'bg-white/5 text-white/85 border border-white/15',
  'New': 'bg-white/5 text-white/85 border border-white/15',
}

type CheckoutFormFieldKey = Exclude<CheckoutFieldKey, 'fullName'>

interface Props {
  pkg: MeetPackage
  index?: number
  autoPreview?: boolean
}

export default function PackageCard({ pkg, index = 0, autoPreview = false }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const previewRef = useRef<HTMLVideoElement | null>(null)
  const cardRef = useRef<HTMLElement | null>(null)
  const prefersReduced = useReducedMotion()
  const cfg = CATEGORY_CONFIG[pkg.category]
  const shouldAutoplayPreview = autoPreview && Boolean(pkg.sampleVideoPath) && isInView && !prefersReduced && !modalOpen
  const previewSrc = isInView ? (pkg.previewVideoPath ?? pkg.sampleVideoPath) : undefined
  const isPortraitVideo = pkg.sampleVideoOrientation === 'portrait'
  const graphicNumber = getGraphicNumber(pkg)
  const graphicLabel = getGraphicLabel(pkg)

  useEffect(() => {
    if (!autoPreview || !pkg.sampleVideoPath || !cardRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '-12% 0px -12% 0px', threshold: 0.35 },
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [autoPreview, pkg.sampleVideoPath])

  useEffect(() => {
    const video = previewRef.current
    if (!video) return

    if (shouldAutoplayPreview) {
      video.play().catch(() => {
        // Browser autoplay policies can still reject in edge cases; the tap-to-watch path remains available.
      })
    } else {
      video.pause()
    }
  }, [shouldAutoplayPreview])

  useEffect(() => {
    if (!modalOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modalOpen])

  return (
    <motion.article
      ref={cardRef}
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'group relative flex flex-col overflow-hidden rounded-md border transition-colors duration-300',
        'bg-[#0c0c0c] border-white/10 hover:border-white/25',
        pkg.badges.includes('Most Popular') && 'border-gold/15',
      )}
    >
      {/* Category graphic area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0e0e0e]">
        <div className="absolute bottom-0 left-0 top-0 w-[6px]" style={{ backgroundColor: cfg.stripe }} />
        <div
          className="absolute inset-0 text-white/10"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {pkg.id === 'addon-express-delivery' && pkg.samplePhotoPath ? (
          <div className="absolute inset-0">
            <img
              src={pkg.samplePhotoPath}
              alt=""
              className="h-full w-full object-cover opacity-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          </div>
        ) : null}
        {/* Muted preview that only plays while featured cards are in view. */}
        {pkg.sampleVideoPath && autoPreview && (
          <video
            ref={previewRef}
            src={previewSrc}
            className={clsx(
              'absolute inset-0 h-full w-full',
              isPortraitVideo
                ? 'bg-black object-contain opacity-70'
                : 'object-cover opacity-35 mix-blend-screen',
            )}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        )}
        <div className="absolute left-6 right-4 top-4 flex items-center justify-between">
          <span className="mono-label text-[10px] text-white/55">{cfg.label}</span>
          <span className="mono-label text-[10px] text-white/55">{pkg.category.toUpperCase().slice(0, 3)}-{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pl-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[92px] leading-[0.85] tracking-normal text-white/95 sm:text-[110px]">
              {graphicNumber}
            </span>
            <span className="font-display pb-2 text-[18px] uppercase tracking-[0.05em] text-white/55">
              {graphicLabel}
            </span>
          </div>
        </div>
        <img
          src="/logo/watermark.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-4 right-4 h-8 w-auto opacity-15"
        />
        {pkg.sampleVideoPath && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setModalOpen(true)
            }}
            className="mono-label absolute bottom-3 right-3 z-10 flex items-center gap-1.5 border border-white/15 bg-black/65 px-2.5 py-1.5 text-[10px] text-white backdrop-blur-sm transition-colors hover:bg-black/85"
            aria-label={`Watch ${pkg.name} sample with sound`}
          >
            {autoPreview ? <Volume2 size={12} /> : <Play size={11} fill="currentColor" />}
            {autoPreview ? 'Sound' : 'Watch'}
          </button>
        )}
        {pkg.sampleVideoPath && autoPreview && (
          <div className="mono-label absolute bottom-3 left-3 z-10 bg-black/55 px-2 py-1 text-[10px] text-zinc-300 backdrop-blur-sm">
            Muted preview
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Badges */}
        {(pkg.badges.length > 0 || pkg.eventLabel) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {pkg.badges.map((badge) => (
              <span key={badge} className={clsx('mono-label px-2 py-1 text-[10px]', BADGE_CONFIG[badge])}>
                {badge}
              </span>
            ))}
            {pkg.eventLabel && (
              <span className="mono-label border border-white/15 px-2 py-1 text-[10px] text-white/80">
                {pkg.eventLabel}
              </span>
            )}
          </div>
        )}

        {/* Name + tagline */}
        <h3 className="mb-2 font-display text-2xl uppercase leading-[1.02] tracking-normal text-white">
          {pkg.name}
        </h3>
        <p className="mono-label mb-3 text-[10px] text-white/45">{pkg.tagline}</p>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{pkg.description}</p>

        {/* Deliverables */}
        <div className="space-y-1.5 mb-4 flex-1">
          {pkg.deliverables.photos && (
            <DeliverableRow icon={Camera} label="Photos" value={pkg.deliverables.photos} />
          )}
          {pkg.deliverables.highlightReel && (
            <DeliverableRow icon={Video} label="Highlight Reel" value={pkg.deliverables.highlightReel} />
          )}
          {pkg.deliverables.staticVideos && (
            <DeliverableRow icon={Play} label="Static Videos" value={pkg.deliverables.staticVideos} />
          )}
          {pkg.deliverables.addon && (
            <DeliverableRow icon={Zap} label="Add-on" value={pkg.deliverables.addon} />
          )}
        </div>

        {/* Delivery window */}
        <p className="mono-label mb-4 text-[10px] normal-case tracking-[0.06em] text-white/40">
          Delivery: {pkg.deliveryWindow}
        </p>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
          <div>
            {pkg.salePriceCad ? (
              <>
                <span className="text-zinc-600 line-through text-sm mr-2">
                  {formatCad(pkg.priceCad)}
                </span>
                <span className="text-2xl font-display text-gold">
                  {formatCad(pkg.salePriceCad)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-display text-white">
                {formatCad(pkg.priceCad)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            aria-label={`Buy ${pkg.name} through Squarespace checkout`}
            title="Start Squarespace checkout"
            className="mono-label inline-flex items-center gap-1.5 bg-white px-4 py-2 text-[11px] text-black transition-colors duration-200 hover:bg-gold"
          >
            Buy
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
      <ModalPortal>
        <AnimatePresence>
          {modalOpen && pkg.sampleVideoPath && (
            <PreviewModal pkg={pkg} onClose={() => setModalOpen(false)} />
          )}
          {checkoutOpen && (
            <CheckoutModal pkg={pkg} onClose={() => setCheckoutOpen(false)} />
          )}
        </AnimatePresence>
      </ModalPortal>
    </motion.article>
  )
}

function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(children, document.body)
}

function CheckoutModal({ pkg, onClose }: { pkg: MeetPackage; onClose: () => void }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    meetDetails: '',
    clothing: '',
    song: '',
    attemptWeightPreference: '',
    phone: '',
    notes: '',
    expressDelivery: false,
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const checkoutFields = getCheckoutFields(pkg.id)
  const expressDeliveryAvailable = canAddExpressDelivery(pkg.id)
  const expressDeliveryUnavailableForGalleryPhotos = EXPRESS_DELIVERY_EXCLUDED_PACKAGE_IDS.includes(pkg.id)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const updateField =
    (field: CheckoutFormFieldKey | 'firstName' | 'lastName') =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  const updateExpressDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, expressDelivery: event.target.checked }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/squarespace-checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ packageId: pkg.id, form }),
      })
      const contentType = response.headers.get('content-type') ?? ''
      const data = contentType.includes('application/json')
        ? ((await response.json()) as { checkoutUrl?: string; error?: string })
        : { error: await response.text() }

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(
          data.error && !data.error.trim().startsWith('<')
            ? data.error
            : 'Checkout could not be started. Please refresh the page and try again.',
        )
      }

      window.location.href = data.checkoutUrl
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Checkout could not be started.',
      )
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Checkout for ${pkg.name}`}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-white/10 bg-vlm-black shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-gold">
              Vincent Lo Media
            </p>
            <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-white">
              {pkg.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded border border-white/15 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-gold"
            aria-label="Close checkout"
          >
            <X size={16} />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
          {checkoutFields.length === 0 && (
            <p className="text-sm leading-relaxed text-zinc-400">
              This product does not require extra order details on Squarespace.
            </p>
          )}

          {checkoutFields.map((field) => {
            if (field.type === 'name') {
              return (
                <div key={field.squarespaceFieldId} className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="First name"
                    value={form.firstName}
                    onChange={updateField('firstName')}
                    required={field.required}
                  />
                  <Field
                    label="Last name"
                    value={form.lastName}
                    onChange={updateField('lastName')}
                    required={field.required}
                  />
                </div>
              )
            }

            if (field.type === 'textarea') {
              const fieldKey = field.key as CheckoutFormFieldKey
              return (
                <TextareaField
                  key={field.squarespaceFieldId}
                  label={field.label}
                  value={form[fieldKey]}
                  onChange={updateField(fieldKey)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )
            }

            if (field.type === 'select') {
              const fieldKey = field.key as CheckoutFormFieldKey
              return (
                <SelectField
                  key={field.squarespaceFieldId}
                  label={field.label}
                  value={form[fieldKey]}
                  onChange={updateField(fieldKey)}
                  options={field.options ?? []}
                  description={field.description}
                  required={field.required}
                />
              )
            }

            const fieldKey = field.key as CheckoutFormFieldKey
            return (
              <Field
                key={field.squarespaceFieldId}
                label={field.label}
                type={field.type === 'phone' ? 'tel' : field.type}
                value={form[fieldKey]}
                onChange={updateField(fieldKey)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )
          })}

          {expressDeliveryAvailable && (
            <label className="flex gap-3 rounded border border-white/10 bg-black/40 p-3">
              <input
                type="checkbox"
                checked={form.expressDelivery}
                onChange={updateExpressDelivery}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-gold"
              />
              <span className="block">
                <span className="mono-label block text-[10px] text-white/70">
                  Add Express Delivery?
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-zinc-400">
                  Yes, add priority editing for +{formatCad(EXPRESS_DELIVERY_PRICE_CAD)}. This cuts the
                  delivery window roughly in half and will be added to the Squarespace checkout.
                </span>
              </span>
            </label>
          )}

          {expressDeliveryUnavailableForGalleryPhotos && (
            <p className="rounded border border-white/10 bg-black/40 p-3 text-sm leading-relaxed text-zinc-400">
              Express Delivery is unavailable for Single Photo, 5 Pack Photo, and 10 Pack Photo because
              photos are sent once the gallery is live.
            </p>
          )}

          {error && (
            <p className="border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-3 border-t border-white/10 bg-vlm-black p-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="mono-label flex w-full items-center justify-center gap-2 bg-white px-4 py-3 text-[11px] text-black transition-colors hover:bg-gold disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? 'Creating checkout...' : 'Continue to checkout'}
            <ArrowRight size={14} />
          </button>
          <a
            href={pkg.squarespaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs text-zinc-500 transition-colors hover:text-white"
          >
            Open the original Squarespace product page instead
          </a>
        </div>
      </motion.form>
    </motion.div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mono-label mb-2 block text-[10px] text-white/55">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold"
      />
    </label>
  )
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mono-label mb-2 block text-[10px] text-white/55">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        rows={3}
        className="w-full rounded border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-gold"
        placeholder={placeholder}
      />
    </label>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  description,
  required = false,
}: {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  description?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mono-label mb-2 block text-[10px] text-white/55">{label}</span>
      {description && (
        <span className="mb-2 block text-xs leading-relaxed text-white/45">{description}</span>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gold"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function PreviewModal({ pkg, onClose }: { pkg: MeetPackage; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${pkg.name} sample video`}
    >
      <motion.div
        className="relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-md border border-white/10 bg-vlm-black shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-[10px] font-display uppercase tracking-widest text-gold">
              Sample with audio
            </p>
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white leading-tight">
              {pkg.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded border border-white/15 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-black transition-colors hover:bg-gold"
            aria-label="Close video preview"
          >
            <X size={16} />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-black">
          <video
            src={pkg.sampleVideoPath}
            className={clsx(
              'mx-auto bg-black object-contain',
              pkg.sampleVideoOrientation === 'portrait'
                ? 'h-[min(68svh,680px)] max-w-full'
                : 'aspect-video w-full',
            )}
            autoPlay
            controls
            playsInline
            poster={pkg.samplePhotoPath}
          />
        </div>
        <div className="border-t border-white/10 bg-vlm-black px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="mono-label flex w-full items-center justify-center gap-2 bg-white px-4 py-3 text-[11px] text-black transition-colors hover:bg-gold sm:hidden"
          >
            Close preview
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

function formatCad(value: number) {
  return `$${value.toLocaleString('en-CA', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}

function getGraphicNumber(pkg: MeetPackage) {
  const graphicNumberByPackageId: Record<string, string> = {
    'bundle-ultimate-all-media': '3x',
    'bundle-photos-highlight': '2x',
    'bundle-photos-static': '2x',
    'bundle-highlight-static': '2x',
    'photo-edited-package': 'ALL',
    'photo-single': '1',
    'video-highlight-reel': '1',
    'video-single-attempt': '1',
    'bench-highlight-reel': '1',
  }

  if (graphicNumberByPackageId[pkg.id]) return graphicNumberByPackageId[pkg.id]

  const match = pkg.name.match(/\b(\d+)\b/)
  if (match) return match[1]
  if (pkg.category === 'bundle') return '2x'
  if (pkg.category === 'bench') return 'B'
  if (pkg.category === 'addon') return '+'
  if (pkg.category === 'event') return 'EV'
  return '01'
}

function getGraphicLabel(pkg: MeetPackage) {
  const graphicLabelByPackageId: Record<string, string> = {
    'bundle-ultimate-all-media': 'Bundle',
    'bundle-photos-highlight': 'Bundle',
    'bundle-photos-static': 'Bundle',
    'bundle-highlight-static': 'Bundle',
    'photo-edited-package': 'Photos',
    'photo-single': 'Photo',
    'video-highlight-reel': 'Reel',
    'bench-highlight-reel': 'Reel',
  }

  if (graphicLabelByPackageId[pkg.id]) return graphicLabelByPackageId[pkg.id]

  if (/highlight/i.test(pkg.name)) return 'Reel'
  if (/static|handheld|attempt/i.test(pkg.name)) return 'Static'
  if (/photo/i.test(pkg.name)) return 'Photo'
  if (pkg.category === 'bundle') return 'Bundle'
  if (pkg.category === 'event') return 'Event'
  if (pkg.category === 'addon') return 'Add-on'
  return 'Package'
}

function DeliverableRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex gap-2 items-start">
      <CheckCircle2 size={13} className="text-gold mt-0.5 flex-shrink-0" />
      <span className="text-xs text-zinc-400 leading-relaxed">
        <span className="text-zinc-300 font-medium">{label}:</span> {value}
      </span>
    </div>
  )
}
