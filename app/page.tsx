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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
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
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/media-assets/raghuvansh_1.webm"
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
                  <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-canvas font-bold mb-8 uppercase tracking-wide leading-none">
                    Raghuvansh <span className="text-gold">ki Ramayan</span>
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="secondary" href="/ramleela">WATCH THE LEELA</Button>
                    <Button variant="outline" href="/contact">BOOK US</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* RECOGNITION BAR (Ribbon Form) */}
        <section className="bg-canvas border-y border-gold/15 py-5 relative z-20">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12">
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-ink/40 select-none">
              Featured Coverage
            </span>
            <div className="flex items-center gap-10">
              <div className="relative h-11 md:h-13 w-32 md:w-40 hover:scale-[1.03] transition-transform duration-300">
                <Image
                  src="/media-assets/bbc-logo.svg"
                  alt="BBC News"
                  fill
                  className="object-contain filter opacity-65 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <span className="text-gold/40 text-sm select-none">•</span>
              <div className="relative h-7.5 md:h-9 w-22 md:w-26 hover:scale-[1.03] transition-transform duration-300">
                <Image
                  src="/media-assets/brut.svg"
                  alt="Brut"
                  fill
                  className="object-contain filter opacity-65 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
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
                Raghuvansh Theatre Group is a premier performing arts collective based in New Delhi. Founded by Pt. Amitosh Sharma, an NSD alumnus, we bring centuries of Indian theatrical tradition to the modern stage with unparalleled grandeur.
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Playbill Cards */}
              {[
                { 
                  title: "RamLeela", 
                  href: "/ramleela", 
                  desc: "Our flagship production",
                  video: "/ramleela-assets/teaser.webm"
                },
                { 
                  title: "Productions", 
                  href: "/productions", 
                  desc: "Contemporary plays",
                  video: "/production-assets/teaser.webm"
                },
                { 
                  title: "Ghazal", 
                  href: "/ghazal-events", 
                  desc: "Musical evenings",
                  video: "/ghazal-assets/ghazal.webm"
                },
                { 
                  title: "Annual Day", 
                  href: "/annual-day", 
                  desc: "School productions",
                  video: null
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
                  
                  <div className="absolute bottom-0 left-0 p-8 z-30">
                    <h3 className="font-heading text-3xl text-gold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:-translate-y-2 transition-transform duration-300">
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
