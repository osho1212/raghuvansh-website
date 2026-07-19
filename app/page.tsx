"use client";
import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button, CtaButton } from "@/components/ui/Buttons";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const [showText, setShowText] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [heroHighlight, setHeroHighlight] = useState("ki Ramayan");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

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

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const time = e.currentTarget.currentTime;
    if (time >= 36) {
      setHeroHighlight("Ki Mehfil");
    } else if (time >= 23) {
      setHeroHighlight("ki Peshkash");
    } else {
      setHeroHighlight("ki Ramayan");
    }
  };

  return (
    <>
      <Navigation />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative min-h-screen flex items-end justify-center bg-curtain text-canvas film-grain pt-20 p-4 md:p-6 lg:p-8 overflow-hidden">
          {/* Background Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/media-assets/raghuvansh-hero-template-final.webm"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/90 via-transparent to-ink/30"></div>
          
          {/* Mute/Unmute Button (Bottom Right) */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-30 p-3 bg-ink/60 border border-gold/30 hover:bg-gold hover:text-ink hover:border-gold rounded-full text-canvas transition-all spotlight-glow flex items-center justify-center"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* delayed text at bottom center (flat layout) */}
          <div className="relative z-20 max-w-5xl text-center mx-auto pb-8">
            <AnimatePresence>
              {showText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-canvas font-bold mb-8 uppercase tracking-wide leading-none min-h-[5rem] sm:min-h-0">
                    Raghuvansh{" "}
                    <span className="relative inline-block sm:inline min-w-[15rem] sm:min-w-0">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={heroHighlight}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="text-gold block sm:inline-block"
                        >
                          {heroHighlight}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </h1>
                  
                  {/* Dynamic CTA buttons mapping */}
                  {(() => {
                    const cta = {
                      "ki Ramayan": { text: "WATCH RAMAYAN", href: "/ramayan" },
                      "ki Peshkash": { text: "VIEW PRODUCTIONS", href: "/productions" },
                      "Ki Mehfil": { text: "EXPERIENCE MEHFIL-E-GHAZAL", href: "/mehfil-e-ghazal" }
                    }[heroHighlight] || { text: "WATCH RAMAYAN", href: "/ramayan" };
                    
                    return (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={cta.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Button variant="secondary" href={cta.href}>
                              {cta.text}
                            </Button>
                          </motion.div>
                        </AnimatePresence>
                        <Button variant="outline" href="/contact">BOOK US</Button>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* RECOGNITION BAR (Ribbon Form) */}
        <section className="bg-canvas border-y border-gold/15 py-6 relative z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-16">
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-ink/40 select-none whitespace-nowrap">
              Featured Coverage
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
              {[
                { src: "/media-assets/bbc-logo.svg", alt: "BBC News", className: "w-20 h-6 md:w-24 md:h-7" },
                { src: "/media-assets/brut.svg", alt: "Brut", className: "w-16 h-6 md:w-20 md:h-7" },
                { src: "/media-assets/Aaj_Tak_logo transparent .svg", alt: "Aaj Tak", className: "w-11 h-9 md:w-14 md:h-11" },
                { src: "/media-assets/DD national.svg", alt: "DD National", className: "w-14 h-12 md:w-18 md:h-16", fullColor: true },
                { src: "/media-assets/india today logo transparent.webp", alt: "India Today", className: "w-12 h-9 md:w-15 md:h-11" },
                { src: "/media-assets/nbt_logo_-removebg-preview.webp", alt: "Navbharat Times", className: "w-24 h-9 md:w-30 md:h-11", fullColor: true }
              ].map((logo) => (
                <div
                  key={logo.alt}
                  className={`relative flex items-center justify-center hover:scale-[1.03] transition-transform duration-300 ${logo.className}`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className={`object-contain transition-opacity duration-300 ${logo.fullColor ? "opacity-100" : "filter opacity-65 hover:opacity-100"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-heading text-4xl md:text-5xl text-ink font-bold mb-6">
                Preserving the <span className="text-gold">Classical</span>, Pioneering the <span className="text-curtain">Contemporary</span>.
              </h2>
              <p className="font-body text-lg text-ink/80 leading-relaxed mb-8">
                Raghuvansh Group of Performing Arts is a premier performing arts collective based in New Delhi. Founded by Pt. Amitosh Sharma, a renowned AIR A-grade artist, we bring centuries of Indian theatrical tradition to the modern stage with unparalleled grandeur.
              </p>
              <Button variant="primary" href="/about">Discover Our Story</Button>
            </div>
            <div className="order-1 md:order-2 relative aspect-[7/5] w-full rounded-lg overflow-hidden border border-gold/30 shadow-2xl group">
              {/* Gold frame overlay corner accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-gold z-20 pointer-events-none"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gold z-20 pointer-events-none"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gold z-20 pointer-events-none"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-gold z-20 pointer-events-none"></div>
              
              <Image
                src="/media-assets/founder-img2.webp"
                alt="Pt. Amitosh Sharma"
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent z-10"></div>
            </div>
          </div>
        </section>

        {/* REPERTOIRE */}
        <section className="py-24 bg-ink text-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl text-gold mb-16 text-center">Our Repertoire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Playbill Cards */}
              {[
                { 
                  title: "Ramayan", 
                  href: "/ramayan", 
                  desc: "Our flagship production",
                  video: "/ramayan-assets/teaser.webm"
                },
                { 
                  title: "Productions", 
                  href: "/productions", 
                  desc: "Contemporary plays",
                  video: "/production-assets/teaser.webm"
                },
                { 
                  title: "Mehfil-e-Ghazal", 
                  href: "/mehfil-e-ghazal", 
                  desc: "Musical evenings",
                  video: "/mehfil-e-ghazal-assets/ghazal.webm"
                }
              ].map((item, idx) => (
                <Link key={idx} href={item.href} className="group block aspect-[3/4] relative overflow-hidden bg-curtain rounded-lg border border-gold/15 hover:border-gold/45 shadow-xl transition-all duration-500">
                  {item.video ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.65] group-hover:brightness-[0.75] group-hover:scale-105 transition-all duration-700"
                      src={item.video}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-curtain to-ink z-0 filter brightness-[0.65] group-hover:scale-105 transition-all duration-700" />
                  )}
                  
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
                  
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-colors duration-500 z-20 m-4" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                    <h3 className="font-heading text-xl lg:text-2xl text-gold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:-translate-y-2 transition-transform duration-300 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs tracking-widest uppercase text-canvas opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 delay-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-semibold">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRESS QUOTE */}
        <section className="py-32 bg-canvas">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-gold text-6xl font-heading leading-none">“</span>
            <h3 className="font-heading text-3xl md:text-5xl text-ink leading-tight mt-4">
              A breathtaking revival of traditional theatre that leaves the audience spellbound.
            </h3>
            <p className="font-body text-ink/60 uppercase tracking-widest mt-8">- The Indian Express</p>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="bg-curtain film-grain py-24 text-center px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-gold mb-12">Bring Raghuvansh to Your Stage</h2>
          <CtaButton href="/contact">Enquire via WhatsApp</CtaButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
