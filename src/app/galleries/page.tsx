// SEO_TITLE: Galleries | Powerlifting Photo Galleries | Vincent Lo Media
// SEO_DESC:  Browse completed Vincent Lo Media photo galleries and open full Pixieset galleries in a new tab.

import { ArrowUpRight } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { galleries } from '@/data/galleries'

export default function GalleriesPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 md:pt-20">
        <section className="relative overflow-hidden border-b border-white/5 bg-vlm-dark py-10 md:py-28">
          <div className="absolute inset-0">
            <img
              src="/photos/_MG_0806.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center opacity-8"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-vlm-dark via-vlm-dark/95 to-vlm-dark/80" />
          </div>
          <div className="section-shell relative z-10">
            <p className="mono-label mb-2 text-[10px] text-gold md:mb-3 md:text-[11px]">
              Vincent Lo Media
            </p>
            <h1 className="mb-3 font-display text-[46px] uppercase leading-[0.9] tracking-normal text-white md:mb-4 md:text-[96px]">
              Galleries
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Browse completed meet galleries and open the full Pixieset gallery to choose photos.
            </p>
          </div>
        </section>

        <section className="bg-vlm-black py-10 md:py-16">
          <div className="section-shell">
            <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end">
              <div>
                <p className="mono-label mb-2 text-[10px] text-white/40">Photo galleries</p>
                <h2 className="font-display text-3xl uppercase leading-none tracking-normal text-white md:text-5xl">
                  Completed Meets
                </h2>
              </div>
              <p className="mono-label text-[10px] text-white/40">
                {galleries.length} galleries · Opens in Pixieset
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galleries.map((gallery, index) => (
                <a
                  key={gallery.href}
                  href={gallery.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-full flex-col overflow-hidden rounded-md border border-white/10 bg-[#0c0c0c] transition-colors duration-300 hover:border-white/25"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0e0e0e]">
                    <div className="absolute bottom-0 left-0 top-0 z-10 w-[6px] bg-gold" />
                    <img
                      src={gallery.previewImage}
                      alt=""
                      className="h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute left-6 right-4 top-4 flex items-center justify-between">
                      <span className="mono-label text-[10px] text-white/70">Gallery</span>
                      <span className="mono-label text-[10px] text-white/55">
                        GAL-{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mono-label mb-3 text-[10px] text-white/45">{gallery.meta}</p>
                    <h3 className="mb-4 font-display text-2xl uppercase leading-[1.02] tracking-normal text-white">
                      {gallery.title}
                    </h3>
                    <div className="mt-auto border-t border-white/5 pt-4">
                      <span className="mono-label inline-flex items-center gap-2 bg-white px-4 py-2 text-[11px] text-black transition-colors duration-200 group-hover:bg-gold">
                        View Gallery
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
