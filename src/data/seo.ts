// SEO constants — wire metadata in layout.tsx once backend/CMS is added
// No plumbing implemented here; Codex should wire these into Next.js metadata API

export const SEO = {
  site: {
    name: 'Vincent Lo Media',
    url: 'https://www.vincentlomedia.com',
    description:
      'Powerlifting meet photography and video packages. Competition-day photos, static lift videos, and highlight reels — shot by a competitive powerlifter.',
    ogImage: '/og-image.jpg', // TODO: generate OG image from hero frame
  },
  pages: {
    home: {
      title: 'Powerlifting Meet Photography & Video Packages | Vincent Lo Media',
      description:
        'Competition-day photos, static lift videos, and highlight reels for powerlifters. Shot by a competitive powerlifter. Packages from $15.',
      keywords:
        'powerlifting photography, powerlifting video, meet photography Canada, powerlifting highlight reel, static lift videos, competition photography',
    },
    packages: {
      title: 'Media Packages | Powerlifting Photography & Video | Vincent Lo Media',
      description:
        'Browse all powerlifting meet photography and video packages. Single photos from $15, bundles, highlight reels, bench-only packages, and more.',
      keywords:
        'powerlifting photography packages, powerlifting video packages, meet photos Canada, highlight reel package, bench only photography',
    },
    about: {
      title: 'About | Vincent Lo Media | Powerlifting Photographer',
      description:
        'Vincent Lo Media is run by a competitive powerlifter. Understanding the sport from the inside means capturing what other photographers miss.',
      keywords:
        'Vincent Lo, powerlifting photographer, powerlifting videographer, meet photographer Canada, competitive powerlifter photographer',
    },
    contact: {
      title: 'Contact & Custom Bookings | Vincent Lo Media',
      description:
        'Book powerlifting meet photography or video coverage. Custom packages available for gyms, brands, teams, and private events.',
      keywords:
        'book powerlifting photographer, powerlifting photography booking, custom event photography, gym photography Canada',
    },
  },
}
