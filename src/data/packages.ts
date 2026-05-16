// Catalog mirrors the visible live products from https://www.vincentlomedia.com/store.
// Last checked from Squarespace JSON on 2026-05-15.
// ASSET SETUP: copy files to public/ before running:
//   public/photos/   ← from "Website photo assets/" and "Product description Samples/Photos/"
//   public/videos/   ← from "website video assets/" and "Product description Samples/"
//   public/logo/     ← from "Website Logo/"
//
// VIDEO RENAME MAP:
//   vlm promo vid_3.mp4  → public/videos/hero.mp4          (primary hero loop)
//   vlm promo vid.mp4    → public/videos/promo-1.mp4
//   vlm promo vid_2.mp4  → public/videos/promo-2.mp4
//   vlm promo vid_4.mp4  → public/videos/promo-4.mp4
//   Copy of BENCH 3.mp4  → public/videos/sample-bench.mp4
//   Copy of SQUAT 3.mp4  → public/videos/sample-squat.mp4
//   Copy of DEADLIFT 3.mp4 → public/videos/sample-deadlift.mp4
//   FELIX GUY HIGHLIGHT REEL.mp4 → public/videos/highlight-felix-guy.mp4
//   JACK HIGHLIGHT REL.mp4 → public/videos/highlight-jack.mp4
//   Copy of MARIE JOAQUIN HIGHLIGHT REEL.mp4 → public/videos/highlight-marie-joaquin.mp4
//   Copy of CARTER BOGART HIGHLIGHT REEL.mp4 → public/videos/highlight-carter-bogart.mp4
//   Bench only highlight examp.mp4 → public/videos/highlight-bench-only.mp4

export type PackageCategory = 'bundle' | 'photo' | 'video' | 'bench' | 'addon' | 'event'
export type FilterId = PackageCategory | 'all' | 'bestseller'
export const EXPRESS_DELIVERY_PACKAGE_ID = 'addon-express-delivery'
export const EXPRESS_DELIVERY_PLACEHOLDER_PRICE_CAD = 35
export const EXPRESS_DELIVERY_EXCLUDED_PACKAGE_IDS = ['photo-single', 'photo-5-pack', 'photo-10-pack']

export type PackageBadge = 'Most Popular' | 'Best Value' | 'Best Price' | 'For Coaches' | 'New'

export interface MeetPackage {
  id: string
  name: string
  slug: string
  category: PackageCategory
  priceCad: number
  badges: PackageBadge[]
  tagline: string
  description: string
  deliverables: {
    photos?: string
    highlightReel?: string
    staticVideos?: string
    addon?: string
  }
  deliveryWindow: string
  squarespaceUrl: string
  eventLabel?: string
  isBestSeller?: boolean
  samplePhotoPath?: string
  sampleVideoPath?: string
  previewVideoPath?: string
  sampleVideoOrientation?: 'portrait' | 'landscape'
}

export const packages: MeetPackage[] = [
  // ── BUNDLES ────────────────────────────────────────────────────────────────
  {
    id: 'bundle-ultimate-all-media',
    name: 'Ultimate Package (All Media)',
    slug: 'ultimate-package-all-media',
    category: 'bundle',
    priceCad: 299,
    badges: ['Most Popular', 'Best Value'],
    tagline: 'The complete meet day experience.',
    description:
      'The top package for athletes who want the whole meet captured: edited photos, static lift videos, and a cinematic highlight reel.',
    deliverables: {
      photos: 'Edited competition photos',
      staticVideos: 'Handheld/static lift videos',
      highlightReel: 'Music-synced cinematic reel, all 3 lifts (best attempts)',
    },
    deliveryWindow: 'Photos: 7-14 days · Videos: 14-21 days · Reel: up to 45 days',
    squarespaceUrl:
      'https://www.vincentlomedia.com/store/p/edited-photos-and-highlight-reel-only-available-if-ordered-before-competition-adh4j-358eh-k6rwf-45852',
    isBestSeller: true,
    samplePhotoPath: '/photos/video-posters/highlight-felix-guy.jpg',
    sampleVideoPath: '/videos/highlight-felix-guy.mp4',
    previewVideoPath: '/videos/previews/highlight-felix-guy-preview.mp4',
    sampleVideoOrientation: 'portrait',
  },
  {
    id: 'bundle-photos-highlight',
    name: 'Edited Photos and Highlight Reel',
    slug: 'edited-photos-and-highlight-reel',
    category: 'bundle',
    priceCad: 240,
    badges: ['Most Popular'],
    tagline: 'Photos plus the social-ready edit.',
    description:
      'Edited competition photos paired with a cinematic highlight reel of your best lifts.',
    deliverables: {
      photos: 'Edited competition photo package',
      highlightReel: 'Music-synced cinematic highlight reel',
    },
    deliveryWindow: 'Photos: 7-14 days · Reel: up to 45 days',
    squarespaceUrl:
      'https://www.vincentlomedia.com/store/p/edited-photos-and-highlight-reel-only-available-if-ordered-before-competition-adh4j-358eh-k6rwf',
    isBestSeller: true,
    samplePhotoPath: '/photos/video-posters/highlight-jack.jpg',
    sampleVideoPath: '/videos/highlight-jack.mp4',
    previewVideoPath: '/videos/previews/highlight-jack-preview.mp4',
    sampleVideoOrientation: 'portrait',
  },
  {
    id: 'bundle-photos-static',
    name: 'Full Power Photos and Static Videos',
    slug: 'full-power-photos-and-static-videos',
    category: 'bundle',
    priceCad: 205,
    badges: ['Best Value'],
    tagline: 'Photos and static lifts, combined.',
    description:
      'Edited meet photos with all 9 handheld lift videos — perfect for sharing on social and sending to your coach.',
    deliverables: {
      photos: '~50–100 edited competition photos',
      staticVideos: '9 handheld videos: squat, bench, deadlift × 3 attempts each',
    },
    deliveryWindow: 'Photos: 7-14 days · Videos: 14-21 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/full-power-photos-and-videos-623nt-fbxsl',
    samplePhotoPath: '/photos/_MG_2249.jpg',
    sampleVideoPath: '/videos/sample-squat.mp4',
    previewVideoPath: '/videos/previews/squat-preview.mp4',
  },
  {
    id: 'bundle-highlight-static',
    name: 'Highlight Reel and Static Videos',
    slug: 'highlight-reel-and-static-videos',
    category: 'bundle',
    priceCad: 225,
    badges: ['Best Value', 'New'],
    tagline: 'Every video format in one bundle.',
    description:
      'A complete video bundle with all 9 static lift videos plus a polished highlight reel.',
    deliverables: {
      staticVideos: '9 handheld lift videos (all attempts, all lifts)',
      highlightReel: 'Music-synced cinematic highlight reel',
    },
    deliveryWindow: 'Videos: 14-21 days · Reel: up to 45 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/full-power-photos-and-videos-623nt-pc9en',
    samplePhotoPath: '/photos/video-posters/highlight-marie-joaquin.jpg',
    sampleVideoPath: '/videos/highlight-marie-joaquin.mp4',
    previewVideoPath: '/videos/previews/highlight-marie-joaquin-preview.mp4',
    sampleVideoOrientation: 'portrait',
  },

  // ── VIDEO ──────────────────────────────────────────────────────────────────
  {
    id: 'video-highlight-reel',
    name: '3 Lift Highlight Reel',
    slug: '3-lift-highlight-reel',
    category: 'video',
    priceCad: 150,
    badges: ['Most Popular'],
    tagline: 'Your lifts. Cinematic.',
    description:
      'A professionally edited music-synced highlight reel covering your best attempts from all three lifts.',
    deliverables: {
      highlightReel: 'Music-synced cinematic reel, best attempts from squat, bench, deadlift',
    },
    deliveryWindow: 'Up to 45 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/3-lift-highlight-reel-2828x-w9t94-ykm3h',
    isBestSeller: true,
    samplePhotoPath: '/photos/video-posters/highlight-carter-bogart.jpg',
    sampleVideoPath: '/videos/highlight-carter-bogart.mp4',
    previewVideoPath: '/videos/previews/highlight-carter-bogart-preview.mp4',
    sampleVideoOrientation: 'portrait',
  },
  {
    id: 'video-9-static',
    name: '9 Lift Static Videos',
    slug: '9-lift-static-videos',
    category: 'video',
    priceCad: 125,
    badges: ['For Coaches'],
    tagline: 'Every attempt. Every lift.',
    description:
      'All 9 lift videos — 3 attempts for each lift — shot handheld from the platform.',
    deliverables: {
      staticVideos: '9 handheld videos: squat × 3, bench × 3, deadlift × 3',
    },
    deliveryWindow: '14-21 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/9-lift-static-video-jpaan-bzjd5-5858x',
    sampleVideoPath: '/videos/sample-squat.mp4',
    previewVideoPath: '/videos/previews/squat-preview.mp4',
  },
  {
    id: 'video-3-attempts',
    name: '3 Attempts Video',
    slug: '3-attempts-video',
    category: 'video',
    priceCad: 60,
    badges: [],
    tagline: 'All 3 attempts of one lift.',
    description:
      'Three handheld videos covering all 3 attempts of a single lift. Choose squat, bench, or deadlift.',
    deliverables: {
      staticVideos: '3 handheld videos — one lift, all attempts',
    },
    deliveryWindow: '14-21 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/single-photo-zb94d-cedwb-h98ht-tjm4z-bkay9',
    sampleVideoPath: '/videos/sample-deadlift.mp4',
    previewVideoPath: '/videos/previews/deadlift-preview.mp4',
  },
  {
    id: 'video-single-attempt',
    name: 'Single Attempt Video',
    slug: 'single-attempt-video',
    category: 'video',
    priceCad: 25,
    badges: ['Best Price'],
    tagline: 'One lift. One attempt.',
    description:
      'A single handheld video of one lift attempt. Great for sharing a PR or testing quality before committing to a larger package.',
    deliverables: {
      staticVideos: '1 handheld video of a single attempt',
    },
    deliveryWindow: '14-21 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/single-photo-zb94d-93da3-86b4d-k8ger',
    sampleVideoPath: '/videos/sample-bench.mp4',
    previewVideoPath: '/videos/previews/bench-preview.mp4',
  },

  // ── PHOTO ──────────────────────────────────────────────────────────────────
  {
    id: 'photo-edited-package',
    name: 'Edited Photo Package',
    slug: 'edited-photo-package',
    category: 'photo',
    priceCad: 125,
    badges: ['Most Popular'],
    tagline: 'Every lift, beautifully captured.',
    description:
      'The full photo package. All your attempts across all three lifts professionally edited and delivered via Google Drive.',
    deliverables: {
      photos: '~50–100 edited photos covering all lifts and attempts',
    },
    deliveryWindow: '7-14 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/edited-photo-package-es94r-b7enm-9pnmf',
    isBestSeller: true,
    samplePhotoPath: '/photos/_MG_0821.jpg',
  },
  {
    id: 'photo-10-pack',
    name: '10 Pack Photo',
    slug: '10-pack-photo',
    category: 'photo',
    priceCad: 75,
    badges: [],
    tagline: 'Choose your ten best.',
    description:
      'Pick any 10 edited photos from your meet session. Delivered via Google Drive link.',
    deliverables: {
      photos: '10 edited photos of your choice from the session',
    },
    deliveryWindow: '7-14 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/10-pack-photo-bwpl5-emmy2-dxcat',
    samplePhotoPath: '/photos/_MG_2249.jpg',
  },
  {
    id: 'photo-5-pack',
    name: '5 Pack Photo',
    slug: '5-pack-photo',
    category: 'photo',
    priceCad: 45,
    badges: [],
    tagline: 'Your five favourite moments.',
    description:
      'Five edited photos selected from your meet session. A solid starter set for social media posts.',
    deliverables: {
      photos: '5 edited photos of your choice from the session',
    },
    deliveryWindow: '7-14 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/5-pack-photo-le5bd-3begg-5tzsg-cjakh',
    samplePhotoPath: '/photos/_MG_0240.jpg',
  },
  {
    id: 'photo-single',
    name: 'Single Photo',
    slug: 'single-photo',
    category: 'photo',
    priceCad: 15,
    badges: ['Best Price'],
    tagline: 'One perfect shot.',
    description:
      'One professionally edited photo from your meet. The most accessible entry point to VLM competition coverage.',
    deliverables: {
      photos: '1 edited competition photo',
    },
    deliveryWindow: '7-14 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/single-photo-mb73t-ytrhp-8kpd3',
    samplePhotoPath: '/photos/_MG_0138.jpg',
  },

  // ── BENCH ONLY ────────────────────────────────────────────────────────────
  {
    id: 'bench-highlight-reel',
    name: 'Bench Only Highlight Reel',
    slug: 'bench-only-highlight-reel',
    category: 'bench',
    priceCad: 85,
    badges: ['Best Price'],
    tagline: 'Static bench video for review and posting.',
    description:
      'Bench-only cinematic highlight reel for athletes who want the press day edit without buying a full-power package.',
    deliverables: {
      highlightReel: 'Bench-focused highlight reel',
    },
    deliveryWindow: 'Up to 45 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/bench-only-static-videos-47n7k-a52w2-ppnw2',
    samplePhotoPath: '/photos/video-posters/highlight-bench-only.jpg',
    sampleVideoPath: '/videos/highlight-bench-only.mp4',
    previewVideoPath: '/videos/previews/highlight-bench-only-preview.mp4',
    sampleVideoOrientation: 'portrait',
  },

  // ── EVENT-SPECIFIC ────────────────────────────────────────────────────────
  {
    id: 'event-last-chance-meet',
    name: '9 Lift Static Videos',
    slug: '9-lift-static-videos-last-chance-meet',
    category: 'event',
    priceCad: 125,
    badges: ['For Coaches'],
    tagline: 'Meet-specific coverage: Last Chance Meet.',
    description:
      'All 9 static lift videos for the Last Chance Meet, delivered via Google Drive.',
    deliverables: {
      staticVideos: '9 handheld videos: squat × 3, bench × 3, deadlift × 3',
    },
    deliveryWindow: '14-21 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/9-lift-static-video-jpaan-bzjd5-y2r7j',
    eventLabel: 'Last Chance Meet',
    sampleVideoPath: '/videos/sample-squat.mp4',
    previewVideoPath: '/videos/previews/squat-preview.mp4',
  },

  // ── ADD-ON ────────────────────────────────────────────────────────────────
  {
    id: EXPRESS_DELIVERY_PACKAGE_ID,
    name: 'Express Delivery',
    slug: 'express-delivery',
    category: 'addon',
    priceCad: EXPRESS_DELIVERY_PLACEHOLDER_PRICE_CAD,
    badges: [],
    tagline: 'Get your media faster.',
    description:
      'Priority editing queue — cuts your delivery window roughly in half. Add to any eligible package at checkout.',
    deliverables: {
      addon: 'Priority editing queue — delivery cut in half across most media types',
    },
    deliveryWindow: 'Photos: 3-7 days · Videos: 7-14 days · Reel: 14-21 days',
    squarespaceUrl: 'https://www.vincentlomedia.com/store/p/express-delivery',
    samplePhotoPath:
      'https://images.squarespace-cdn.com/content/v1/65a4df859a6f1146aa8ee1b6/1712917546778-83A97JBJ252MTN0MHYHC/express+delivery.jpg',
  },
]

export function canAddExpressDelivery(packageId: string) {
  return (
    packageId !== EXPRESS_DELIVERY_PACKAGE_ID &&
    !EXPRESS_DELIVERY_EXCLUDED_PACKAGE_IDS.includes(packageId)
  )
}

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'bestseller', label: 'Best Sellers' },
  { id: 'photo', label: 'Photo' },
  { id: 'video', label: 'Video' },
  { id: 'bundle', label: 'Bundles' },
  { id: 'bench', label: 'Bench Only' },
  { id: 'addon', label: 'Add-ons' },
  { id: 'event', label: 'By Event' },
]

export const PHOTO_SAMPLES = [
  '/photos/_MG_0658.jpg',
  '/photos/_MG_0821.jpg',
  '/photos/_MG_0327.jpg',
  '/photos/_MG_0138.jpg',
  '/photos/_MG_2249.jpg',
  '/photos/_MG_0240.jpg',
  '/photos/DSCF3338.jpg',
  '/photos/_MG_0502.jpg',
]

export const VIDEO_SAMPLES = [
  {
    label: 'Squat',
    path: '/videos/sample-squat.mp4',
    previewPath: '/videos/previews/squat-preview.mp4',
    thumbnail: '/photos/_MG_0855.jpg',
  },
  {
    label: 'Bench',
    path: '/videos/sample-bench.mp4',
    previewPath: '/videos/previews/bench-preview.mp4',
    thumbnail: '/photos/DSCF3338.jpg',
  },
  {
    label: 'Deadlift',
    path: '/videos/sample-deadlift.mp4',
    previewPath: '/videos/previews/deadlift-preview.mp4',
    thumbnail: '/photos/_MG_1386.jpg',
  },
]
