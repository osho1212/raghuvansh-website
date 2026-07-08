"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

import { productionsData } from "./data";
export { productionsData };
import { Volume2, VolumeX, Play, Download, X, ArrowLeft } from "lucide-react";

const GoldDust = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating slow dust */}
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 2 + 1; // 1px to 3px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 12; // 0s to 12s
        const duration = Math.random() * 20 + 20; // 20s to 40s
        return (
          <div
            key={`slow-${i}`}
            className="absolute rounded-full bg-gold/40"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: `-20px`,
              animation: `floatUp ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      {/* Twinkling sprinkles scattered all over the page */}
      {[...Array(50)].map((_, i) => {
        const size = Math.random() * 1.5 + 0.5; // 0.5px to 2px
        const left = Math.random() * 100; // 0% to 100%
        const top = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 6; // 0s to 6s
        const duration = Math.random() * 5 + 4; // 4s to 9s
        return (
          <div
            key={`sprinkle-${i}`}
            className="absolute rounded-full bg-gold/50"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animation: `twinkle ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const SpotlightBeams = () => {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const [size, setSize] = React.useState({ w: 1200, h: 800 });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const updateMouse = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    const updateSize = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  if (!mounted) return null;

  // Left Spotlight beam calculations
  const dxLeft = mouse.x;
  const dyLeft = mouse.y;
  const dLeft = Math.sqrt(dxLeft * dxLeft + dyLeft * dyLeft);
  const angleLeft = Math.atan2(dyLeft, dxLeft);
  const perpLeft = angleLeft + Math.PI / 2;
  const beamWidth = 85;
  
  const lx1 = mouse.x + Math.cos(perpLeft) * beamWidth;
  const ly1 = mouse.y + Math.sin(perpLeft) * beamWidth;
  const lx2 = mouse.x - Math.cos(perpLeft) * beamWidth;
  const ly2 = mouse.y - Math.sin(perpLeft) * beamWidth;

  // Right Spotlight beam calculations
  const dxRight = mouse.x - size.w;
  const dyRight = mouse.y;
  const dRight = Math.sqrt(dxRight * dxRight + dyRight * dyRight);
  const angleRight = Math.atan2(dyRight, dxRight);
  const perpRight = angleRight + Math.PI / 2;

  const rx1 = mouse.x + Math.cos(perpRight) * beamWidth;
  const ry1 = mouse.y + Math.sin(perpRight) * beamWidth;
  const rx2 = mouse.x - Math.cos(perpRight) * beamWidth;
  const ry2 = mouse.y - Math.sin(perpRight) * beamWidth;

  const rLeft = Math.max(dLeft, 50);
  const rRight = Math.max(dRight, 50);
  const leftRadius = Math.sqrt(dLeft * dLeft + beamWidth * beamWidth);
  const rightRadius = Math.sqrt(dRight * dRight + beamWidth * beamWidth);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Target Light Pool on Stage - Decreased to a subtle minimum */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
        }}
      >
        {/* Outer soft pool */}
        <div className="absolute w-[240px] h-[240px] bg-gold/5 rounded-full blur-[45px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        {/* Mid subtle halo */}
        <div className="absolute w-[120px] h-[120px] bg-gold/10 rounded-full blur-[20px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Volumetric Spotlight Beams with fully rounded bases (SVG sector shapes) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" pointerEvents="none">
        <defs>
          <filter id="beamBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <radialGradient id="leftBeamGrad" cx="0" cy="0" r={rLeft} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity={0.55} />
            <stop offset="70%" stopColor="#C9A24B" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="rightBeamGrad" cx={size.w} cy="0" r={rRight} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9A24B" stopOpacity={0.55} />
            <stop offset="70%" stopColor="#C9A24B" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Left Beam - Sweeping clockwise */}
        <path
          d={`M 0 0 L ${lx1} ${ly1} A ${leftRadius} ${leftRadius} 0 0 1 ${lx2} ${ly2} Z`}
          fill="url(#leftBeamGrad)"
          filter="url(#beamBlur)"
          className="opacity-90 pointer-events-none"
        />

        {/* Right Beam - Sweeping counter-clockwise */}
        <path
          d={`M ${size.w} 0 L ${rx1} ${ry1} A ${rightRadius} ${rightRadius} 0 0 0 ${rx2} ${ry2} Z`}
          fill="url(#rightBeamGrad)"
          filter="url(#beamBlur)"
          className="opacity-90 pointer-events-none"
        />
      </svg>

      {/* Left Spotlight Source Glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gold/15 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-12 h-12 bg-gold/30 rounded-full blur-md -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-0 w-5 h-5 bg-canvas rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_#C9A24B,0_0_10px_#FAF7F2] pointer-events-none" />

      {/* Right Spotlight Source Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/15 rounded-full blur-xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-12 h-12 bg-gold/30 rounded-full blur-md translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-5 h-5 bg-canvas rounded-full translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_#C9A24B,0_0_10px_#FAF7F2] pointer-events-none" />
    </div>
  );
};

const ImageSlideshow = ({ images }: { images: string[] }) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds per image
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      {images.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-45" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt="Slideshow Frame"
            fill
            className="object-cover object-center scale-105"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default function ProductionsIndex() {
  const [selectedProd, setSelectedProd] = React.useState<any | null>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  React.useEffect(() => {
    if (selectedProd) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProd]);

  return (
    <>
      <Navigation />
      <main className="relative flex-grow pt-28 bg-ink min-h-screen overflow-hidden">
        {/* Interactive Spotlight Beams */}
        <SpotlightBeams />

        {/* Play Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-70 pointer-events-none mix-blend-lighten">
          <Image
            src="/production-assets/page-assets/page-bg.webp"
            alt="Theater Background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay to make content readable and blend background */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/5 to-ink"></div>
        </div>

        {/* Animated Gold Dust Particles & Twinkling Sprinkles */}
        <GoldDust />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="font-heading text-5xl md:text-6xl text-gold font-bold mb-6">
              Our Productions
            </h1>
            <p className="font-body text-lg text-canvas/80">
              Explore the major stage productions by Raghuvansh Theatre Group. Click on any playbill to open its immersive overview, watch the teaser, and view the full credits.
            </p>
          </div>

          {/* Centered Playbill Layout */}
          <div className="flex flex-wrap justify-center gap-14 lg:gap-16">
            {productionsData.map((prod) => (
              <div key={prod.slug} className="group relative w-full sm:w-[320px] md:w-[350px] aspect-[3/4]">
                
                {/* Warm Light Radial Glow Behind each poster */}
                <div className="absolute -inset-6 bg-gold/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
                
                {/* Royal Golden Frame Corners (Floating outside the poster) */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold z-20 pointer-events-none transition-transform duration-500 group-hover:translate-x-[-5px] group-hover:translate-y-[-5px]">
                  <div className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-gold/40"></div>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-gold z-20 pointer-events-none transition-transform duration-500 group-hover:translate-x-[5px] group-hover:translate-y-[-5px]">
                  <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-gold/40"></div>
                </div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-gold z-20 pointer-events-none transition-transform duration-500 group-hover:translate-x-[-5px] group-hover:translate-y-[5px]">
                  <div className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-gold/40"></div>
                </div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold z-20 pointer-events-none transition-transform duration-500 group-hover:translate-x-[5px] group-hover:translate-y-[5px]">
                  <div className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 rounded-full bg-gold"></div>
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-gold/40"></div>
                </div>

                <button
                  onClick={() => setSelectedProd(prod)}
                  className="relative flex flex-col justify-end w-full h-full bg-curtain overflow-hidden border border-gold/30 hover:border-gold transition-all duration-500 spotlight-glow rounded-xl z-10 text-left cursor-pointer"
                >
                  {/* Real WebP Image */}
                  <Image
                    src={prod.poster}
                    alt={prod.title}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover z-0 group-hover:scale-[1.04] transition-transform duration-700 rounded-xl"
                  />
                  
                  {/* Subtle hover overlay border */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-colors duration-500 z-10 rounded-xl"></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* Netflix Info Window */}
      {selectedProd && (
        <div className="fixed inset-0 z-[100] bg-ink overflow-y-auto w-full h-full font-body animate-fadeIn">
          {/* Header Bar */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 md:px-12 z-50 pointer-events-none">
            <button
              onClick={() => setSelectedProd(null)}
              className="pointer-events-auto flex items-center gap-2 text-canvas/80 hover:text-gold transition-colors duration-300 font-body text-xs uppercase tracking-widest cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Productions</span>
            </button>
            <span className="font-heading text-lg tracking-widest text-gold font-bold">RAGHUVANSH</span>
            <button
              onClick={() => setSelectedProd(null)}
              className="pointer-events-auto p-2 bg-black/40 hover:bg-gold/80 hover:text-ink text-canvas rounded-full transition-all duration-300 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Hero Banner Area */}
          <div className="relative h-[65vh] md:h-[75vh] w-full bg-black overflow-hidden flex flex-col justify-end flex-shrink-0">
            {selectedProd.teaser ? (
              Array.isArray(selectedProd.teaser) ? (
                <ImageSlideshow images={selectedProd.teaser} />
              ) : (
                <video
                  src={selectedProd.teaser}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
              )
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={selectedProd.poster}
                  alt={selectedProd.title}
                  fill
                  className="object-cover object-center opacity-45 scale-105 z-0"
                  priority
                />
              </div>
            )}

            {/* Premium Volumetric Dark Overlay to blend the bottom and top edges of the video */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent z-10"></div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
            
            {/* Info details floating on top of banner */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pb-10 flex justify-between items-end gap-6">
              <div className="max-w-2xl text-left">
                <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold block mb-2 font-heading">
                  Raghuvansh Presentation
                </span>
                <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-canvas mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  {selectedProd.title}
                </h2>
                
                {/* Horizontal row of tags */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-canvas/70 mb-6 font-body">
                  <span className="text-gold">{selectedProd.year}</span>
                  <span className="w-1 h-1 rounded-full bg-canvas/30"></span>
                  <span>{selectedProd.duration}</span>
                  <span className="w-1 h-1 rounded-full bg-canvas/30"></span>
                  <span>{selectedProd.genre}</span>
                  <span className="w-1 h-1 rounded-full bg-canvas/30"></span>
                  <span>Written by {selectedProd.playwright}</span>
                </div>

                {/* Primary actions */}
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={selectedProd.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gold hover:bg-canvas text-ink font-body font-bold text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-sm transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-[1.02]"
                  >
                    <Download size={16} />
                    <span>Download Brochure</span>
                  </a>
                </div>
              </div>

              {/* Sound Toggle (only if video available) */}
              {selectedProd.teaser && typeof selectedProd.teaser === "string" && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-black/60 hover:bg-gold hover:text-ink text-canvas border border-canvas/20 hover:border-gold rounded-full transition-all duration-300 cursor-pointer shadow-lg transform hover:scale-[1.05]"
                  title={isMuted ? "Unmute Teaser" : "Mute Teaser"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              )}
            </div>
          </div>

          {/* Detailed Info Area */}
          <div className="w-full flex-grow bg-ink text-canvas py-16 px-6 md:px-12 border-t border-gold/15">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* Left Column (Synopsis & Notes) */}
              <div className="lg:col-span-2 space-y-12">
                {/* Synopsis */}
                <div>
                  <h3 className="font-heading text-2xl text-gold font-bold mb-6 tracking-wide border-b border-gold/20 pb-3 uppercase text-left">
                    Synopsis
                  </h3>
                  <div className="space-y-6 text-canvas/80 leading-relaxed font-body text-base md:text-lg text-left">
                    {selectedProd.synopsisFull.map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Director's Note */}
                <div className="bg-canvas/5 p-8 rounded-lg border border-gold/10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 h-full w-[3px] bg-gold" />
                  <h4 className="font-heading text-xl text-gold font-bold mb-4 uppercase tracking-wider text-left">
                    Director's Note
                  </h4>
                  <div className="space-y-4 text-canvas/70 font-body text-base leading-relaxed text-left">
                    {selectedProd.directorsNoteFull.map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Play Quote */}
                <div className="py-8 px-6 text-center border-y border-gold/15">
                  <span className="text-gold/20 text-7xl font-serif block -mb-8 leading-none">“</span>
                  <p className="font-heading text-lg md:text-xl text-gold italic leading-relaxed px-4">
                    {selectedProd.quote}
                  </p>
                  <span className="text-gold/20 text-7xl font-serif block -mt-4 leading-none text-right">”</span>
                </div>
              </div>

              {/* Right Column (Cast & Credits) */}
              <div className="space-y-12">
                {/* Cast */}
                <div>
                  <h3 className="font-heading text-2xl text-gold font-bold mb-6 tracking-wide border-b border-gold/20 pb-3 uppercase text-left">
                    Cast
                  </h3>
                  <div className="divide-y divide-canvas/10 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                    {selectedProd.castRoles.map((item: any, idx: number) => (
                      <div key={idx} className="py-3 flex justify-between gap-4 font-body text-sm text-left">
                        <span className="text-gold font-semibold tracking-wider">{item.role}</span>
                        <span className="text-canvas/60">{item.actor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credits / Production Metadata */}
                <div>
                  <h3 className="font-heading text-2xl text-gold font-bold mb-6 tracking-wide border-b border-gold/20 pb-3 uppercase text-left">
                    Credits
                  </h3>
                  <div className="space-y-4 font-body text-sm text-left">
                    <div className="flex justify-between py-1 border-b border-canvas/5">
                      <span className="text-canvas/50">Director</span>
                      <span className="text-canvas/80 font-medium">{selectedProd.director}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-canvas/5">
                      <span className="text-canvas/50">Playwright</span>
                      <span className="text-canvas/80 font-medium">{selectedProd.playwright}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-canvas/5">
                      <span className="text-canvas/50">Year</span>
                      <span className="text-canvas/80 font-medium">{selectedProd.year}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-canvas/5">
                      <span className="text-canvas/50">Genre</span>
                      <span className="text-canvas/80 font-medium">{selectedProd.genre}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-canvas/50">Duration</span>
                      <span className="text-canvas/80 font-medium">{selectedProd.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Brochure Button */}
                <div className="pt-4">
                  <a
                    href={selectedProd.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-gold/40 hover:border-gold hover:bg-gold/5 text-gold font-body font-bold text-xs tracking-wider uppercase py-4 rounded-sm transition-all duration-300 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>View Full Brochure PDF</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
