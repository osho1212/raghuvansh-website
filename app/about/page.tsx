"use client";
import React, { useRef, useState, useEffect } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "/about-section/gallery-webp/2.webp", category: "stage", caption: "Early Stage Presentations" },
  { src: "/about-section/gallery-webp/3.webp", category: "stage", caption: "Classical Dance Drama Rehearsals" },
  { src: "/about-section/gallery-webp/6.webp", category: "stage", caption: "Ensemble Performance Cast" },
  { src: "/about-section/gallery-webp/7.webp", category: "stage", caption: "Mythological Adaptations" },
  { src: "/about-section/gallery-webp/17.webp", category: "stage", caption: "Pt. Amitosh Sharma Directing" },
  { src: "/about-section/gallery-webp/18.webp", category: "stage", caption: "Vintage Play Highlights" },
  { src: "/about-section/gallery-webp/19.webp", category: "stage", caption: "Character Portrayals" },
  { src: "/about-section/gallery-webp/20.webp", category: "stage", caption: "Nukkad Natak Street play" },
  { src: "/about-section/gallery-webp/27.webp", category: "stage", caption: "Behind the Scenes Rehearsal" },
  
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_2.webp", category: "press", caption: "National Press Reviews" },
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_5.webp", category: "press", caption: "Sangeet Natak Akademi Features" },
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_6.webp", category: "press", caption: "Hindi Theatre News Coverage" },
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_7.webp", category: "press", caption: "Awards & Recognitions Certificate" },
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_8.webp", category: "press", caption: "Historical Play Pamphlets" },
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_13.webp", category: "press", caption: "Archival Press Reviews" },
  { src: "/about-section/gallery-webp/New Doc 07-28-2024 08.48_18.webp", category: "press", caption: "Retro Newspaper Clippings" },
  
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 11.22.58 AM_upscayl_3x_realesrgan-x4plus.webp", category: "behind", caption: "Workshop Sessions in Progress" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 11.25.45 AM.webp", category: "behind", caption: "Director Briefing the Actors" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 11.30.31 AM.webp", category: "behind", caption: "Green Room Preparations" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.10.20 AM (1)_upscayl_3x_realesrgan-x4plus.webp", category: "behind", caption: "Outdoor Audition Sessions" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.17.30 AM (1).webp", category: "behind", caption: "Stage Set Construction" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.22.15 AM.webp", category: "behind", caption: "Costume and Makeup Trials" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.34.24 AM_upscayl_3x_realesrgan-x4plus.webp", category: "behind", caption: "Script Reading Circle" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.39.55 AM (1)_upscayl_3x_realesrgan-x4plus.webp", category: "behind", caption: "Stage Lighting Calibration" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.39.55 AM_upscayl_3x_realesrgan-x4plus.webp", category: "behind", caption: "Pt. Amitosh Sharma Mentoring" },
  { src: "/about-section/gallery-webp/WhatsApp Image 2024-06-28 at 9.39.56 AM_upscayl_4x_realesrgan-x4plus.webp", category: "behind", caption: "End of Show Bows" }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 55%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.78], ["0%", "100%"]);

  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showLegacyModal, setShowLegacyModal] = useState(false);

  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 12);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <>
      <Navigation />
      <main className="flex-grow pt-20">
        {/* FOUNDER TRIBUTE */}
        <section className="bg-curtain text-canvas film-grain pt-24 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-heading text-5xl md:text-7xl text-gold font-bold mb-6"
                >
                  Late Shri Amitosh Sharma
                </motion.h1>
                <div className="font-body text-gold uppercase tracking-widest text-sm mb-8">
                  Founder & Director • AIR A-Grade Vocal Artist
                </div>
                <p className="font-body text-lg text-canvas/80 leading-relaxed mb-8">
                  A visionary of the Indian stage, Late Shri Amitosh Sharma dedicated his life to bridging the gap between ancient theatrical traditions and contemporary performance art. His directorial style was characterized by its scale, emotional depth, and uncompromising commitment to the craft.
                </p>
                
                {/* Structured Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8 text-sm font-body text-canvas/70 border-t border-b border-gold/15 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Moradabad, UP (Born 1967)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>AIR A-Grade Vocal Artist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Staged Ramayana at Red Fort for 30+ Years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold">•</span>
                    <span>Urdu Theatre Training at SRC, Delhi</span>
                  </div>
                </div>

                <blockquote className="border-l-2 border-gold pl-6 py-2 mb-8">
                  <p className="font-heading text-2xl text-canvas italic">
                    "Theatre is not merely performance; it is a ritual where the actor and the audience breathe together."
                  </p>
                </blockquote>

                <button
                  onClick={() => setShowLegacyModal(true)}
                  className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-canvas text-ink hover:text-ink font-body uppercase tracking-wider text-xs font-bold rounded-sm border border-gold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-gold/20"
                >
                  <span>View Full Legacy & Achievements</span>
                  <span>&rarr;</span>
                </button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square relative border border-gold/30 rounded-lg overflow-hidden shadow-2xl group">
                  {/* Gold frame overlay corner accents */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-gold z-20 pointer-events-none"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-gold z-20 pointer-events-none"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-gold z-20 pointer-events-none"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-gold z-20 pointer-events-none"></div>
                  
                  <Image
                    src="/media-assets/founder.webp"
                    alt="Late Shri Amitosh Sharma"
                    fill
                    className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* GOLD DIVIDER */}
        <div className="h-px w-full bg-gold/50"></div>
 
        {/* CORE MEMBERS / LEGACY */}
        <section className="py-24 bg-canvas text-ink border-b border-gold/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-4xl text-curtain font-bold mb-4">Carrying the Legacy</h2>
              <p className="font-body text-lg text-ink/80">
                Continuing the rich theatrical traditions established by Late Shri Amitosh Sharma, his children and the group's mentors lead Raghuvansh into a new era of artistic expression.
              </p>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  name: "Animesh Pandit",
                  relation: "Son of Late Shri Amitosh Sharma",
                  role: "Director & Music Practitioner",
                  desc: "A trained Hindustani classical musician (Master's in Tabla, Ajrara Gharana) and All India Radio empanelled artist, Animesh integrates structural musical discipline with dramatic stagecraft. He writes and directs Raghuvansh's major productions, carrying forward the artistic legacy of his father.",
                  image: "/about-section/animesh.webp"
                },
                {
                  name: "Anoushka Pandit",
                  relation: "Daughter of Late Shri Amitosh Sharma",
                  role: "Lead Vocalist & Coordinator",
                  desc: "A classical, Mehfil-e-Ghazal, and devotional vocalist empanelled with Akashvani, Anoushka holds a Master of Music degree. She has performed as the lead vocalist in the annual Red Fort Ramayan productions for over 20 years and coordinates cultural, theatrical, and musical presentations for Raghuvansh.",
                  image: "/about-section/anushka.webp"
                },
                {
                  name: "Shrikant Verma",
                  relation: "Mentor of the Group",
                  role: "Acclaimed Actor & NSD Alumnus",
                  desc: "An alumnus of the National School of Drama, Shrikant Verma is a highly recognized actor in Indian cinema (Panchayat, Dum Laga Ke Haisha) and theatre. As the mentor of Raghuvansh, he provides critical artistic guidance, training, and dramatic calibre to the collective.",
                  image: "/about-section/shrikant-verma.webp"
                }
              ].map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-white border border-gold/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                  {/* Portrait Frame Image */}
                  <div className="w-full aspect-[2/3] bg-ink/5 border border-gold/30 rounded-sm relative overflow-hidden mb-6 flex items-center justify-center shadow-md">
                    {/* Gold frame overlay corner accents */}
                    <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l border-gold z-20"></div>
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t border-r border-gold z-20"></div>
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l border-gold z-20"></div>
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r border-gold z-20"></div>
                    
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                  </div>
                  <h3 className="font-heading text-2xl text-curtain font-bold mb-1">{member.name}</h3>
                  <div className="font-body text-xs text-gold uppercase tracking-wider font-semibold mb-2">{member.relation}</div>
                  <div className="font-body text-sm text-ink/65 font-medium italic mb-4">{member.role}</div>
                  <p className="font-body text-sm text-ink/75 leading-relaxed text-left flex-grow">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* THE GROUP'S STORY */}
        <section className="py-24 bg-canvas text-ink relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl text-curtain font-bold mb-16 text-center">Our Journey</h2>
            
            {/* Timeline wrapper with Ref */}
            <div ref={containerRef} className="relative ml-4 md:ml-1/2">
              {/* Glowing scroll-connecting line container */}
              <div className="absolute left-0 md:left-1/2 top-11 bottom-[105px] w-[2px] -translate-x-1/2 pointer-events-none z-10">
                <motion.div 
                  style={{ height: lineHeight }}
                  className="w-full bg-gradient-to-b from-gold via-amber-400 to-gold origin-top shadow-[0_0_15px_rgba(201,162,75,0.95),0_0_6px_#C9A24B]"
                />
              </div>

              {/* Timeline Items */}
              {[
                { year: "2000", title: "The Inception", desc: "Founded in Muradabad, Uttar Pradesh  with a vision to preserve and promote the rich heritage of the performing arts." },
                { year: "2005", title: "The First Ramayan", desc: "A groundbreaking production that redefined historical storytelling." },
                { year: "2012", title: "National Acclaim", desc: "Recognized by the Sangeet Natak Akademi for contribution to arts." },
                { year: "Today", title: "A Theatrical Institution", desc: "Performing at the Red Fort and shaping the next generation of artists." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="relative pl-8 md:pl-0 py-8 md:w-1/2 md:odd:ml-0 md:even:ml-auto md:even:pl-12 md:odd:pr-12 md:odd:text-right group"
                >
                  {/* Glowing dynamic connector dot */}
                  <motion.div 
                    initial={{ scale: 0.5, backgroundColor: "rgba(201,162,75,0.15)", boxShadow: "none" }}
                    whileInView={{ 
                      scale: 1.15, 
                      backgroundColor: "#C9A24B", 
                      boxShadow: "0 0 10px rgba(201, 162, 75, 0.8), 0 0 3px #C9A24B"
                    }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.15 }}
                    className="absolute left-0 top-11 w-3.5 h-3.5 rounded-full z-20 border border-canvas -translate-x-[7px] md:left-auto md:right-0 md:translate-x-[7px] md:group-even:left-0 md:group-even:right-auto md:group-even:-translate-x-[7px]"
                  />
                  
                  <h3 className="font-heading text-3xl text-ink font-bold mb-2 group-hover:text-curtain transition-colors duration-300">{item.year}</h3>
                  <h4 className="font-body text-xl text-curtain font-semibold mb-2">{item.title}</h4>
                  <p className="font-body text-ink/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-24 bg-ink text-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-4xl text-gold mb-16">The Duality of Our Craft</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 border border-gold/20 hover:border-gold/50 transition-colors">
                <h3 className="font-heading text-3xl text-canvas mb-4">The Classical</h3>
                <p className="font-body text-canvas/70">
                  Rooted in the Natya Shastra, we preserve the rigorous discipline of ancient Indian performance, bringing epics like the Ramayana to life with authentic music, costume, and dialect.
                </p>
              </div>
              <div className="p-8 border border-gold/20 hover:border-gold/50 transition-colors">
                <h3 className="font-heading text-3xl text-canvas mb-4">The Contemporary</h3>
                <p className="font-body text-canvas/70">
                  Exploring modern themes through innovative staging, experimental narratives, and intimate formats that challenge and provoke thought in today's society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AFFILIATIONS */}
        <section className="py-20 bg-canvas border-b border-gold/20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
              {[
                { name: "NSD", full: "National School of Drama" },
                { name: "SNA", full: "Sangeet Natak Akademi" },
                { name: "AIR", full: "All India Radio" },
                { name: "FTII", full: "Film & Television Institute of India" },
                { name: "SRC", full: "Shree Ram Centre" },
                { name: "PSS", full: "Prayag Sangeet Samiti" }
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-gold/50 select-none hidden md:inline">•</span>}
                  <div className="flex flex-col items-center group relative cursor-help">
                    <span className="font-heading text-3xl md:text-4xl text-ink font-semibold tracking-widest group-hover:text-curtain transition-all duration-300 transform group-hover:scale-[1.03]">
                      {item.name}
                    </span>
                    <span className="h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-500 mt-1"></span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center pointer-events-none z-30">
                      <div className="bg-ink text-canvas text-[10px] tracking-widest uppercase py-1.5 px-3 rounded-sm shadow-xl border border-gold/20 whitespace-nowrap">
                        {item.full}
                      </div>
                      <div className="w-2 h-2 bg-ink border-r border-b border-gold/20 rotate-45 -mt-1"></div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* AWARDS WALL */}
        <section className="py-24 bg-curtain text-canvas film-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-4xl text-gold mb-16">Accolades</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-gold/50 flex items-center justify-center mb-4">
                    <span className="font-heading text-gold text-2xl">{2024 - i}</span>
                  </div>
                  <h4 className="font-body font-bold text-lg">National Award {i}</h4>
                  <p className="font-body text-sm text-canvas/70 uppercase tracking-wider mt-2">Best Production</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-24 bg-canvas text-ink border-t border-gold/15 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-body text-xs text-gold uppercase tracking-[0.2em] font-bold block mb-2">
                The Archives
              </span>
              <h2 className="font-heading text-4xl text-curtain font-bold mb-4">
                Historic Memories
              </h2>
              <p className="font-body text-lg text-ink/75">
                Explore a visual record of Late Shri Amitosh Sharma's directions, news publications, certifications, and behind-the-scenes milestones spanning over two decades.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleImages.map((img, index) => (
                  <motion.div
                    layout
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setLightboxIndex(index)}
                    className="relative aspect-[4/3] overflow-hidden border border-gold/15 bg-white shadow-sm rounded-sm hover:border-gold hover:shadow-md transition-all duration-500 cursor-pointer group"
                  >
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    {/* Subtle Click Indicator Hover Overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <div className="w-[calc(100%-24px)] h-[calc(100%-24px)] border border-gold/40 rounded-sm"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More/Less Button */}
            {galleryImages.length > 12 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-curtain hover:bg-gold text-canvas hover:text-ink font-body uppercase tracking-widest text-xs px-8 py-3 rounded-sm transition-all duration-300 font-bold border border-gold/25 cursor-pointer"
                >
                  {showAll ? "Show Less" : `Show More (${galleryImages.length - 12} Images)`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* VISION */}
        <section className="py-32 bg-canvas text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-curtain leading-tight">
              To be the definitive voice of Indian theatre, resounding across global stages.
            </h2>
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(null);
                }}
                className="absolute top-6 right-6 p-2 bg-black/50 border border-gold/30 hover:bg-gold hover:text-ink text-canvas rounded-full transition-colors z-50 cursor-pointer animate-fadeIn"
              >
                <X size={24} />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1
                  );
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 border border-gold/30 hover:bg-gold hover:text-ink text-canvas rounded-full transition-colors z-50 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 border border-gold/30 hover:bg-gold hover:text-ink text-canvas rounded-full transition-colors z-50 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-[90vw] md:w-[70vw] aspect-[4/3] max-h-[70vh] border border-gold/40 rounded-sm overflow-hidden bg-zinc-900 shadow-2xl">
                  <Image
                    src={galleryImages[lightboxIndex].src}
                    alt={galleryImages[lightboxIndex].caption}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOUNDER LEGACY MODAL */}
        <AnimatePresence>
          {showLegacyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
              onClick={() => setShowLegacyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ duration: 0.3 }}
                className="bg-ink text-canvas border border-gold/30 w-full max-w-4xl max-h-[85vh] rounded-lg overflow-hidden flex flex-col relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gold/15 bg-black/40">
                  <div>
                    <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold block">Artistic Archive</span>
                    <h2 className="font-heading text-2xl text-canvas font-bold">Late Shri Amitosh Sharma</h2>
                  </div>
                  <button
                    onClick={() => setShowLegacyModal(false)}
                    className="p-2 bg-black/40 hover:bg-gold/80 hover:text-ink border border-gold/20 rounded-full transition-all cursor-pointer text-canvas"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 font-body text-left">
                  {/* Grid for Personal / Education / Profile */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gold/10 pb-6">
                    <div className="md:col-span-1 border-r border-gold/10 pr-6 space-y-4">
                      <div>
                        <strong className="text-gold text-xs uppercase tracking-wider block mb-1">Personal Details</strong>
                        <div className="text-sm text-canvas/80 space-y-1">
                          <div>Born: 1967, Moradabad, UP</div>
                          <div>Father: Late Shri Sudarshanacharya Shastri</div>
                          <div>Mother: Late Smt. Prabha Rani Sharma</div>
                        </div>
                      </div>
                      <div>
                        <strong className="text-gold text-xs uppercase tracking-wider block mb-1">Education</strong>
                        <ul className="text-sm text-canvas/80 list-disc pl-4 space-y-1">
                          <li>Bachelor of Science (B.Sc.)</li>
                          <li>Sangeet Prabhakar (Vocal & Instrumental)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <strong className="text-gold text-xs uppercase tracking-wider block mb-1">Professional Profile</strong>
                        <ul className="text-sm text-canvas/80 list-disc pl-4 space-y-1.5">
                          <li>Head of the Music Department, CRPF School, Delhi</li>
                          <li>AIR (All India Radio) A-Grade Vocal Artist (Ghazal and Bhajan)</li>
                          <li>Urdu Theatre Training at Shri Ram Centre for Performing Arts, Delhi</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-gold text-xs uppercase tracking-wider block mb-1">Ramayana Productions</strong>
                        <p className="text-sm text-canvas/80 leading-relaxed">
                          For over 30 years, his institution staged the complete Ramayana annually at the Red Fort Parade Ground and Pitampura, Delhi.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Honours & Awards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gold/10 pb-6">
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Honours & Recognitions</h3>
                      <ul className="text-sm text-canvas/70 list-disc pl-4 space-y-2">
                        <li>Honoured by Union Home Minister <strong className="text-canvas">Shri Rajnath Singh</strong> for theatrical performance at Parade Ground (2015).</li>
                        <li>Honoured by Vice President <strong className="text-canvas">Shri M. Venkaiah Naidu</strong> for the staging of Ramayana (2017).</li>
                        <li>Honoured by the Deputy Chief Minister and Education Minister of Delhi for excellence in theatre direction at the Red Fort premises (2018).</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Key Awards</h3>
                      <ul className="text-sm text-canvas/70 list-disc pl-4 space-y-1.5">
                        <li><strong>1988:</strong> Udas Trophy, All India Ghazal Singing Competition.</li>
                        <li>Honoured with the <strong>Shaan-e-Pital Nagari</strong>, Moradabad.</li>
                        <li>Youth Music Session, Youth Festival, Lucknow.</li>
                        <li>Honoured by <strong>Sanskar Bharati</strong>.</li>
                        <li>Music Award by <strong>Mala Sanstha</strong>, Raipur (1999) & Samata, Rampur.</li>
                        <li>Honoured by the <strong>Hindi Sanskrit Academy</strong>, Delhi (2010, 2012, and 2013).</li>
                        <li>Performed Ghazal & Bhajan concerts internationally in Dubai, Hong Kong, England, and Kenya.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Theatre catalog */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gold/10 pb-6">
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Theatre Productions Directed</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-canvas/70">
                        {[
                          "Taj for Sale", "Alibaba", "Nai Sadi Ki Ore", "Aage Kya Hoga Rama Re", 
                          "Golden Owl", "Ajaatshatru Ka Dard", "Big Boss Ki Biwi", "Sanjog", 
                          "Ek Tha Gadha", "Uljhan", "Singhasan Khali Hai", "Andhon Ka Haathi", 
                          "Hai Ri Chandramukhi", "Gadhe Ki Baraat", "Pagalon Ki Duniya", 
                          "Chalta Purza", "Birwa Mangal", "Raghuvansh Navya"
                        ].map((play) => (
                          <div key={play} className="flex items-center gap-1.5">
                            <span className="text-gold/60">•</span>
                            <span>{play}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Musical Theatre</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-canvas/70">
                        {[
                          "Amir Khusro", "Karna", "Aaj Ka Abhimanyu", "Chandragupta Maurya", 
                          "Naga Agar Ji Rooth", "Jeevan Meet Sangeet", "Wenders of the World", 
                          "Uday", "Bin Paani Sab Soon", "Prithviraj Chauhan", "Meri Delhi", 
                          "Navras", "Panch Tatva"
                        ].map((musical) => (
                          <div key={musical} className="flex items-center gap-1.5">
                            <span className="text-gold/60">•</span>
                            <span>{musical}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Music Catalog */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Music Albums</h3>
                      <ul className="text-xs text-canvas/70 list-disc pl-4 space-y-1 text-left">
                        <li>Stuti</li>
                        <li>Sisodiya</li>
                        <li>Chandi Chandi (Tips)</li>
                        <li>Phir Chand (Venus)</li>
                        <li>Bhole Ki Mauj</li>
                        <li>Soul Expressions</li>
                        <li>Dheema Dheema (Venus)</li>
                        <li>Suraliya Baje (Tips)</li>
                        <li>Ghazal Guldasta (Tips)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">TV & Feature Films</h3>
                      <ul className="text-xs text-canvas/70 list-disc pl-4 space-y-1 text-left">
                        <li>Phool Hoo</li>
                        <li>Aakash Ke Diye (DD Urdu)</li>
                        <li>Akbar Birbal (Doordarshan)</li>
                        <li>Sangharsh (Sony TV)</li>
                        <li>Yakeel Jasoos Chhori</li>
                        <li>Hai Tiranga</li>
                        <li>Hum Ek Hain</li>
                        <li>Bhor</li>
                        <li>Kis Ko Pyar Karu</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Literature & Writing</h3>
                      <div className="space-y-3 text-xs text-canvas/70 text-left">
                        <div>
                          <strong className="text-canvas text-xs block mb-0.5">Books Authored</strong>
                          <div>Tumko Dekha Ghazal Ho Gayi (2015)</div>
                          <div>Ek Ghazal Ka Safarnama (2021)</div>
                        </div>
                        <div>
                          <strong className="text-canvas text-xs block mb-0.5">Songwriting</strong>
                          <div>"Nayi Roshni Ki Taraf"</div>
                        </div>
                        <div>
                          <strong className="text-canvas text-xs block mb-0.5">International Film Music (USA)</strong>
                          <div>Living in America</div>
                          <div>Where Is the Culture</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
