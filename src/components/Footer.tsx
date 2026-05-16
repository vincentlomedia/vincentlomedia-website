import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Media Packages' },
  { href: '/galleries', label: 'Galleries' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const PACKAGE_LINKS = [
  { href: '/packages?filter=bundle#packages', label: 'Bundles' },
  { href: '/packages?filter=photo#packages', label: 'Photo Packages' },
  { href: '/packages?filter=video#packages', label: 'Video Packages' },
  { href: '/packages?filter=bench#packages', label: 'Bench Only' },
  { href: '/packages?filter=event#packages', label: 'By Event' },
]

export default function Footer() {
  return (
    <footer className="bg-vlm-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="/logo/watermark.png"
              alt="Vincent Lo Media"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-zinc-500 text-sm leading-relaxed">
              Powerlifting meet photography and video. Shot by a competitive powerlifter
              who understands what matters on the platform.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600 font-display font-semibold mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600 font-display font-semibold mb-4">
              Packages
            </p>
            <ul className="space-y-2">
              {PACKAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-600 font-display font-semibold mb-4">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/vincentlomedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Custom Bookings
                </Link>
              </li>
              <li>
                <a
                  href="mailto:vincentlomedia@gmail.com"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  vincentlomedia@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Vincent Lo Media. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700 font-display uppercase tracking-widest">
            Shot by a competitive powerlifter
          </p>
        </div>
      </div>
    </footer>
  )
}
