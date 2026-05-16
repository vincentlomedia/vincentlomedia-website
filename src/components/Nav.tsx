'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/#samples', label: 'Samples' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menu on route change
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-vlm-black/85 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent',
        )}
      >
        <div className="section-shell">
          <div className="flex h-[68px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {/* ASSET: public/logo/watermark.png — from Website Logo/WATERMARK.png */}
              <img
                src="/logo/watermark.png"
                alt="Vincent Lo Media"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'mono-label px-3 py-2 text-[11px] transition-colors duration-200',
                    pathname === link.href
                      ? 'text-white'
                      : 'text-white/55 hover:text-gold',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/packages"
                className="mono-label hidden items-center gap-2 bg-white px-4 py-2 text-[12px] text-black transition-colors duration-200 hover:bg-gold sm:inline-flex"
              >
                Shop Packages →
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className={clsx(
                  'p-2 text-zinc-400 transition-colors hover:text-white md:hidden',
                  open ? 'pointer-events-none invisible' : 'cursor-pointer',
                )}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-hidden={open}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-vlm-black/98 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center justify-between h-16 px-4">
              <img src="/logo/watermark.png" alt="Vincent Lo Media" className="h-8 w-auto" />
              <button
                onClick={(event) => {
                  event.stopPropagation()
                  setOpen(false)
                }}
                className="p-2 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-2">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={(event) => event.stopPropagation()}
                    className={clsx(
                      'block text-3xl font-display font-bold uppercase tracking-wider py-3 text-center transition-colors',
                      pathname === link.href ? 'text-gold' : 'text-white hover:text-gold',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: LINKS.length * 0.06 }}
                className="mt-6"
              >
                <Link
                  href="/packages"
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-light text-black font-bold text-lg rounded transition-colors cursor-pointer"
                >
                  Shop Packages
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
