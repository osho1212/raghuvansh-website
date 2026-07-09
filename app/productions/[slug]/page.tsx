"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { productionsData } from "../page";

export default function ProductionDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const prod = productionsData.find((p) => p.slug === slug);

  if (!prod) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="flex-grow pt-28 bg-canvas min-h-screen text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          
          {/* Main Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
            
            {/* Poster (Left) */}
            <div className="lg:col-span-1 aspect-[3/4] bg-curtain relative border border-gold/30 rounded-sm overflow-hidden film-grain">
              <Image
                src={prod.poster}
                alt={prod.title}
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Info Panel (Right) */}
            <div className="lg:col-span-2">
              <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold block mb-2">
                {prod.genre}
              </span>
              <h1 className="font-heading text-5xl md:text-6xl text-curtain font-bold mb-6">
                {prod.title}
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gold/20 mb-8 font-body text-sm">
                <div>
                  <span className="text-ink/50 uppercase tracking-wider block mb-1">Year</span>
                  <span className="font-bold text-lg">{prod.year}</span>
                </div>
                <div>
                  <span className="text-ink/50 uppercase tracking-wider block mb-1">Director</span>
                  <span className="font-bold text-lg">{prod.director}</span>
                </div>
                <div>
                  <span className="text-ink/50 uppercase tracking-wider block mb-1">Duration</span>
                  <span className="font-bold text-lg">{prod.duration}</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h3 className="font-heading text-2xl text-curtain mb-4">Synopsis</h3>
                <p className="font-body text-lg text-ink/80 leading-relaxed">
                  {prod.excerpt}
                </p>
              </div>

              {/* Director, Playwright & Cast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-gold/20 pt-6">
                <div>
                  <h3 className="font-heading text-xl text-curtain mb-3">Creative Team</h3>
                  <p className="font-body text-sm text-ink/80 leading-relaxed mb-2">
                    <strong>Playwright:</strong> {prod.playwright}
                  </p>
                  <p className="font-body text-sm text-ink/80 leading-relaxed mb-6">
                    <strong>Director:</strong> {prod.director}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {prod.brochure && (
                      <a
                        href={prod.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-curtain hover:bg-gold text-canvas hover:text-ink font-body text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors border border-gold/30 hover:border-gold"
                      >
                        <span>Download Brochure (PDF)</span>
                        <span>&darr;</span>
                      </a>
                    )}
                    {prod.youtube && (
                      <a
                        href={prod.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF0000] hover:bg-white text-white hover:text-[#FF0000] font-body text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors border border-[#FF0000] hover:border-[#FF0000]"
                      >
                        <span>Watch on YouTube</span>
                        <span>&rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-curtain mb-3">Cast</h3>
                  <p className="font-body text-sm text-ink/80 leading-relaxed max-h-60 overflow-y-auto pr-2">
                    {prod.cast.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Review Quote / Philosophical Quote */}
          <div className="bg-curtain text-canvas film-grain p-12 text-center rounded-sm mb-16 border border-gold/30">
            <p className="font-heading text-2xl md:text-3xl italic text-gold mb-6 leading-relaxed">
              "{prod.quote}"
            </p>
            <span className="font-body text-sm uppercase tracking-wider text-canvas/70 block mb-6">
              — {prod.title}
            </span>
            {prod.directorsNote && (
              <div className="max-w-3xl mx-auto border-t border-gold/30 pt-6">
                <span className="font-body text-xs uppercase tracking-widest text-gold block mb-3 font-semibold">Director's Note</span>
                <p className="font-body text-sm text-canvas/85 italic leading-relaxed">"{prod.directorsNote}"</p>
              </div>
            )}
          </div>

          {/* Production Gallery / Stills */}
          <div>
            <h3 className="font-heading text-3xl text-curtain mb-8">Production Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prod.slug === "baaki-itihaas" ? (
                <>
                  <div className="aspect-[3/4] bg-ink/10 relative border border-gold/20 rounded-sm overflow-hidden">
                    <Image src="/production-assets/baaki-itihaas/poster-1.webp" alt="Baaki Itihaas Poster 1" fill className="object-cover" />
                  </div>
                  <div className="aspect-[3/4] bg-ink/10 relative border border-gold/20 rounded-sm overflow-hidden">
                    <Image src="/production-assets/baaki-itihaas/poster-2.webp" alt="Baaki Itihaas Poster 2" fill className="object-cover" />
                  </div>
                </>
              ) : (
                <div className="aspect-[3/4] bg-ink/10 relative border border-gold/20 rounded-sm overflow-hidden">
                  <Image src={prod.poster} alt={`${prod.title} Poster`} fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
