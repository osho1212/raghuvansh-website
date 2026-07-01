"use client";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { CtaButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

export default function RamLeela() {
  return (
    <>
      <Navigation />
      <main className="flex-grow">
        {/* VIDEO HERO */}
        <section className="relative min-h-screen flex items-center justify-center bg-ink">
          {/* Placeholder for Video Background */}
          <div className="absolute inset-0 bg-ink/80 flex items-center justify-center z-0">
            <span className="font-body text-canvas/20">Video Background Placeholder</span>
          </div>
          <div className="absolute inset-0 bg-curtain/60 mix-blend-multiply z-10 film-grain"></div>
          
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="font-heading text-6xl md:text-8xl text-gold font-bold mb-6"
            >
              RamLeela
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-body text-xl md:text-3xl text-canvas tracking-wide font-light"
            >
              Performed at Red Fort since 1995
            </motion.p>
          </div>
        </section>

        {/* STAT COUNTERS */}
        <section className="bg-canvas border-b border-gold/20 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 font-heading text-4xl text-curtain text-center">
              <div>
                <div className="text-gold font-bold mb-2">50+</div>
                <div className="text-sm font-body uppercase tracking-widest text-ink">Grand Leelas</div>
              </div>
              <div className="hidden md:block text-gold/30 text-5xl font-light">|</div>
              <div>
                <div className="text-gold font-bold mb-2">15+</div>
                <div className="text-sm font-body uppercase tracking-widest text-ink">Years at Red Fort</div>
              </div>
              <div className="hidden md:block text-gold/30 text-5xl font-light">|</div>
              <div>
                <div className="text-gold font-bold mb-2">5x</div>
                <div className="text-sm font-body uppercase tracking-widest text-ink">Best Leela Award</div>
              </div>
            </div>
          </div>
        </section>

        {/* THE LEGACY */}
        <section className="py-24 bg-canvas text-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl text-curtain font-bold mb-8">The Legacy of Epic Proportions</h2>
                <p className="font-body text-lg leading-relaxed mb-6">
                  Our RamLeela is more than a performance; it is a cultural phenomenon. Every year, thousands gather at the historic Red Fort grounds to witness the retelling of the Ramayana.
                </p>
                <p className="font-body text-lg leading-relaxed text-ink/80">
                  Combining traditional Awadhi dialogues with state-of-the-art stagecraft, digital mapping, and a cast of over 200 artists, we bring the epic to life in a way that honours the past while embracing the future.
                </p>
              </div>
              <div className="aspect-[4/3] bg-ink/10 border border-gold/30 flex items-center justify-center rounded-sm">
                 <span className="font-body text-ink/40">Performance Image Placeholder</span>
              </div>
            </div>
          </div>
        </section>

        {/* FACILITATED BY */}
        <section className="bg-curtain film-grain text-canvas py-16 border-y border-gold/40">
          <div className="max-w-7xl mx-auto px-4 text-center overflow-hidden relative">
            <h3 className="font-body uppercase tracking-widest text-gold/80 mb-8 text-sm">Supported By</h3>
            <div className="flex justify-center space-x-12 whitespace-nowrap">
              {/* Marquee/Row Placeholder */}
              {["Ministry of Culture", "Delhi Government", "Sahitya Kala Parishad", "Red Fort Authority"].map((name, i) => (
                <span key={i} className="font-heading text-2xl md:text-3xl">{name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY FILMSTRIP */}
        <section className="py-24 bg-ink overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-12">
            <h2 className="font-heading text-4xl text-gold">Glimpses of Glory</h2>
          </div>
          <div className="flex gap-4 px-4 pb-8 overflow-x-auto snap-x hide-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 h-96 bg-canvas/10 border border-gold/20 snap-center flex items-center justify-center hover:border-gold/60 transition-colors">
                <span className="font-body text-canvas/40">Gallery {i}</span>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING CTA */}
        <section className="bg-canvas py-32 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-curtain mb-6">Book VIP Passes</h2>
            <p className="font-body text-ink/70 mb-12">
              Experience the grandeur from the best seats. Register your interest for the upcoming Dussehra season.
            </p>
            <CtaButton href="/contact?subject=RamLeela">Reserve Your Seat</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
