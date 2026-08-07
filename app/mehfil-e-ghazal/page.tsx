"use client";
import React, { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { CtaButton } from "@/components/ui/Buttons";
import { Volume2, VolumeX, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MehfilEGhazal() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const heroHeight = window.innerHeight || 800;
        const scrollY = window.scrollY;
        const volumeFactor = Math.max(0, 1 - scrollY / heroHeight);
        
        if (Math.abs(videoRef.current.volume - volumeFactor) > 0.01) {
          videoRef.current.volume = volumeFactor;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        const heroHeight = window.innerHeight || 800;
        const volumeFactor = Math.max(0, 1 - window.scrollY / heroHeight);
        videoRef.current.volume = volumeFactor;
      }
    }
  };

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink">
        
        {/* MOODY HERO */}
        <section className="relative min-h-[80vh] flex items-end justify-center bg-curtain text-canvas film-grain pt-20 pb-[120px] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/ghazal%20hero%20.webm"
          />
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-30 p-3 bg-ink/60 border border-gold/30 hover:bg-gold hover:text-ink hover:border-gold rounded-full text-canvas transition-all flex items-center justify-center"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <span className="font-heading text-xl text-gold uppercase tracking-widest block mb-4">
              Ghazal, Devotional & Sufi Music
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gold font-bold mb-6">
              Where Poetry & Devotion <br className="hidden md:block" /> Meet the Stage
            </h1>
            <p className="font-body text-lg md:text-xl text-canvas/80 max-w-2xl mx-auto">
              Immerse yourself in soul-stirring Ghazals, devotional bhajans, and Sufi melodies curated by Raghuvansh's music wing.
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-curtain font-bold mb-6">The Musical Wing</h2>
            <p className="font-body text-lg text-ink/80 leading-relaxed max-w-3xl mx-auto">
              Our music wing brings together classical Hindustani musicians and seasoned vocalists to revive the traditional baithak-style ghazal presentation, carrying forward the musical legacy of Pt. Amitosh Sharma.
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
                  Anoushka Pandit
                </h2>
                <p className="font-body text-lg text-canvas/80 leading-relaxed mb-6">
                  A Sangeet Natak Akademi awardee, Anoushka Pandit has captivated audiences nationwide with her mesmerizing voice. She brings a contemporary depth to classical Ghazals, devotional music, and Sufi compositions, making these rich traditions accessible and emotional for listeners of all ages.
                </p>
              </div>
              <div>
                {/* Video/Audio Player Placeholder */}
                <div 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="aspect-video relative bg-curtain/20 border border-gold/30 rounded-sm overflow-hidden flex items-center justify-center cursor-pointer group"
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    src="/mehfil-e-ghazal-assets/MVI_2050.webm"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-gold/90 text-ink flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
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
          <h2 className="font-heading text-4xl md:text-5xl text-gold mb-12">Book a Musical Presentation</h2>
          <CtaButton href="/contact?subject=Ghazal">Request Booking</CtaButton>
        </section>

        {/* VIDEO MODAL */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoModalOpen(false);
                }}
                className="absolute top-6 right-6 p-2 bg-black/50 border border-gold/30 hover:bg-gold hover:text-ink text-canvas rounded-full transition-colors z-50 cursor-pointer"
              >
                <X size={24} />
              </button>
              
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl aspect-video bg-black border border-gold/40 rounded-sm overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src="/mehfil-e-ghazal-assets/MVI_2050.webm"
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  );
}
