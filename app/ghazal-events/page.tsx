"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { CtaButton } from "@/components/ui/Buttons";

export default function GhazalEvents() {
  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink">
        
        {/* MOODY HERO */}
        <section className="relative min-h-[80vh] flex items-center justify-center bg-curtain text-canvas film-grain pt-20">
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <span className="font-heading text-xl text-gold uppercase tracking-widest block mb-4">
              Ghazal Evenings
            </span>
            <h1 className="font-heading text-5xl md:text-7xl text-gold font-bold mb-6">
              Where Urdu Poetry Meets the Stage
            </h1>
            <p className="font-body text-lg md:text-xl text-canvas/80 max-w-2xl mx-auto">
              Immerse yourself in soul-stirring melodies and profound poetic verses curated by Raghuvansh's music wing.
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-curtain font-bold mb-6">The Musical Wing</h2>
            <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mx-auto">
              Our music wing brings together classical Hindustani musicians and seasoned vocalists to revive the traditional baithak-style ghazal presentation. Under the mentorship of Pt. Amitosh Sharma, we perform timeless compositions of Ghalib, Faiz, and Meer.
            </p>
          </div>
        </section>

        {/* FEATURED ARTIST */}
        <section className="py-24 bg-ink text-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold block mb-2">
                  Featured Vocalist
                </span>
                <h2 className="font-heading text-4xl md:text-5xl text-canvas mb-6 font-bold">
                  Anushka Sharma
                </h2>
                <p className="font-body text-lg text-canvas/80 leading-relaxed mb-6">
                  Hear the mesmerizing voice that has captivated ghazal lovers nationwide. Anushka Sharma brings a contemporary depth to classical ghazals, making Urdu poetry accessible and emotional for audiences of all ages.
                </p>
              </div>
              <div>
                {/* Video/Audio Player Placeholder */}
                <div className="aspect-video bg-curtain/20 border border-gold/30 rounded-sm flex items-center justify-center">
                  <span className="font-body text-sm text-canvas/40 uppercase tracking-wider">
                    Featured Performance Video
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FORMATS */}
        <section className="py-24 bg-canvas text-ink border-b border-gold/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl text-curtain font-bold text-center mb-16">Our Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 bg-white border border-gold/20 rounded-sm hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-2xl text-curtain font-bold mb-4">Intimate Baithak</h3>
                <p className="font-body text-sm text-ink/75">
                  A traditional close-knit sitting format designed for poetry connoisseurs. Focused heavily on dialogue and explanation of verses.
                </p>
              </div>
              <div className="p-8 bg-white border border-gold/20 rounded-sm hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-2xl text-curtain font-bold mb-4">Concert Stage</h3>
                <p className="font-body text-sm text-ink/75">
                  Large scale audio-visual experiences with full orchestration, light design, and modern spatial acoustics.
                </p>
              </div>
              <div className="p-8 bg-white border border-gold/20 rounded-sm hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-2xl text-curtain font-bold mb-4">Corporate & Private</h3>
                <p className="font-body text-sm text-ink/75">
                  Bespoke curations tailored for corporate galas and private celebrations looking for refined cultural entertainment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-curtain film-grain py-24 text-center px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-gold mb-12">Book a Ghazal Night</h2>
          <CtaButton href="/contact?subject=Ghazal">Request Booking</CtaButton>
        </section>

      </main>
      <Footer />
    </>
  );
}
