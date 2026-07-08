"use client";
import { useState, useRef } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { CtaButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

function VideoCard({ id }: { id: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Start play stream after card finishes zoom/enlarge transition (300ms)
    timeoutRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsPlaying(false);
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden bg-black border border-gold/25 rounded-sm transition-all duration-500 ease-out hover:scale-[1.06] hover:border-gold/60 hover:shadow-[0_15px_35px_rgba(201,162,75,0.3)]"
    >
      {isPlaying ? (
        <div className="w-full h-full pointer-events-none">
          <iframe
            className="w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0`}
            title="Glimpses of Glory Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt="Glimpses of Glory"
            className="w-full h-full object-cover transition-transform duration-500 opacity-85"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
    </div>
  );
}

export default function Ramayan() {
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
              Ramayan
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
                <div className="text-sm font-body uppercase tracking-widest text-ink">Grand Shows</div>
              </div>
              <div className="hidden md:block text-gold/30 text-5xl font-light">|</div>
              <div>
                <div className="text-gold font-bold mb-2">15+</div>
                <div className="text-sm font-body uppercase tracking-widest text-ink">Years at Red Fort</div>
              </div>
              <div className="hidden md:block text-gold/30 text-5xl font-light">|</div>
              <div>
                <div className="text-gold font-bold mb-2">5x</div>
                <div className="text-sm font-body uppercase tracking-widest text-ink">Best Production Award</div>
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
                  Our Ramayan is more than a performance; it is a cultural phenomenon. Every year, thousands gather at the historic Red Fort grounds to witness the retelling of the Ramayana.
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
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 whitespace-nowrap">
              {["Delhi Government", "Nav Shree Dharmik Leela Committee"].map((name, i) => (
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
          <div className="flex gap-6 px-4 md:px-8 pb-8 overflow-x-auto snap-x hide-scrollbar">
            {[
              "myAHgdaFJbk",
              "Q7sO8kL0S88",
              "xhj7PqgMrDI",
              "I5Rs8_zG-FA",
              "sILv2SqlBsI"
            ].map((id) => (
              <div key={id} className="flex-shrink-0 w-[420px] sm:w-[480px] aspect-video snap-center transition-all duration-300 relative z-10 hover:z-20">
                <VideoCard id={id} />
              </div>
            ))}
          </div>
        </section>

        {/* ARTIST CALL TO ACTION */}
        <section className="bg-canvas py-32 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-curtain mb-6">Work with Raghuvansh as an Artist</h2>
            <p className="font-body text-ink/70 mb-12 max-w-xl mx-auto">
              We are always looking for passionate performers, actors, musicians, and stagecraft designers to join our ensemble. Take the stage with us and keep the heritage of performing arts alive.
            </p>
            <CtaButton href="/apply">Join the Ensemble</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
