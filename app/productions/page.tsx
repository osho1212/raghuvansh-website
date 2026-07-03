"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export const productionsData = [
  {
    slug: "baaki-itihaas",
    title: "Baaki Itihaas",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Baaki Itihaas transcends the boundaries of conventional theatre, emerging as a profound reflection on human existence, memory, guilt, and the enduring search for life's meaning.",
    genre: "Drama / Reflection",
    duration: "120 mins",
    poster: "/production-assets/baaki-itihaas/poster-1.webp",
    posterBackup: "/production-assets/baaki-itihaas/poster-2.webp",
    brochure: "/production-assets/baaki-itihaas/brochure.pdf",
    cast: ["Sharad (Krishna Shrivastav)", "Vasanti (Isha Khera)", "Sitanath (Animesh Pandit)", "Kanak (Anoushka Sharma)", "Vidubhushan (Anil Gagneja)", "Nikhil (Arman)", "Vijay (Aryan Verma)", "Vasudev (Aryan Verma)", "Kanak’s Father (Anil Gagneja)", "Postman (Jivansh Bihagra)"],
    playwright: "Badal Sircar",
    quote: "History is not only what is written in books; it is also what every individual silently carries within, yet never finds the words to tell.",
    directorsNote: "History is not merely what is recorded; it is equally what is remembered, forgotten, and silently carried within us."
  },
  {
    slug: "saari-raat",
    title: "Saari Raat",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Saari Raat transcends the boundaries of conventional theatre, emerging as a deeply philosophical exploration of loneliness, human relationships, and the timeless search for truth.",
    genre: "Philosophical Drama",
    duration: "110 mins",
    poster: "/production-assets/saari-raat/poster.webp",
    brochure: "/production-assets/saari-raat/brochure.pdf",
    cast: ["Husband", "Wife", "Old Man"],
    playwright: "Badal Sircar",
    quote: "Sometimes, it takes an entire night to discover what a lifetime of routine has kept hidden.",
    directorsNote: "The longest journeys are often not measured in miles, but in moments of silence, reflection, and self-discovery."
  },
  {
    slug: "shabd-baan",
    title: "Shabd Baan",
    year: 2026,
    director: "Animesh Pandit",
    excerpt: "Shabd Baan is an intense dramatic exploration of grief, dharma, and divine accountability, imagined through a searing conversation between Gandhari and Shri Krishna in the aftermath of the Mahabharata.",
    genre: "Musical & Poetic Drama",
    duration: "90 mins",
    poster: "/production-assets/shabd-baan/poster.webp",
    brochure: "/production-assets/shabd-baan/brochure.pdf",
    cast: ["Krishn", "Gaandhari", "Kaurav", "Draupadi"],
    playwright: "Animesh Pandit",
    quote: "True justice is not the destruction of an enemy, but the destruction of enmity.",
    directorsNote: "ऐसा भी कभी तुम न्याय करो, शत्रू को नहीं — शत्रुता हरो। Shabd Baan - 'word arrows' - is a theatrical experiment where words become weapons, wounds, and windows. It is envisioned as a larger series of unfiltered, uncomfortable, extended conversations between iconic figures from Indian history."
  },
  {
    slug: "wrong-turn",
    title: "Wrong Turn",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Wrong Turn is a thought-provoking contemporary play that explores the complex relationship between human choices and their consequences, adapting Frederick Dürrenmatt's The Dangerous Game.",
    genre: "Contemporary Drama / Psychological Theatre",
    duration: "100 mins",
    poster: "/production-assets/wrong-turn/poster.webp",
    brochure: "/production-assets/wrong-turn/brochure.pdf",
    cast: ["Arun Mehra", "Lateef Zaidi", "Makarand Joshi", "Jagdeesh Mathur", "Neena Oberoi", "Banne Miyaan", "Raghu", "White Man", "Shivani"],
    playwright: "Ranjit Kapoor",
    quote: "Does every wrong decision inevitably lead to downfall, or can mistakes also become pathways to self-discovery and transformation?",
    directorsNote: "Wrong Turn is not merely an incident or a story; it is a theatrical exploration of those moments in life when, often unknowingly, a person takes a turn that challenges their beliefs, relationships, and sense of self."
  }
];

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

  // Left Spotlight beam polygon calculations
  const dxLeft = mouse.x;
  const dyLeft = mouse.y;
  const angleLeft = Math.atan2(dyLeft, dxLeft);
  const perpLeft = angleLeft + Math.PI / 2;
  const beamWidth = 85; // slightly wider beam at target
  
  const lx1 = mouse.x + Math.cos(perpLeft) * beamWidth;
  const ly1 = mouse.y + Math.sin(perpLeft) * beamWidth;
  const lx2 = mouse.x - Math.cos(perpLeft) * beamWidth;
  const ly2 = mouse.y - Math.sin(perpLeft) * beamWidth;

  // Right Spotlight beam polygon calculations
  const dxRight = mouse.x - size.w;
  const dyRight = mouse.y;
  const angleRight = Math.atan2(dyRight, dxRight);
  const perpRight = angleRight + Math.PI / 2;

  const rx1 = mouse.x + Math.cos(perpRight) * beamWidth;
  const ry1 = mouse.y + Math.sin(perpRight) * beamWidth;
  const rx2 = mouse.x - Math.cos(perpRight) * beamWidth;
  const ry2 = mouse.y - Math.sin(perpRight) * beamWidth;

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Dynamic Multi-layered Cursor Focus Spotlight (Light Pool) */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
        }}
      >
        {/* Outer wide soft pool */}
        <div className="absolute w-[360px] h-[360px] bg-gold/10 rounded-full blur-[65px] -translate-x-1/2 -translate-y-1/2" />
        {/* Mid intense halo */}
        <div className="absolute w-[180px] h-[180px] bg-gold/25 rounded-full blur-[30px] -translate-x-1/2 -translate-y-1/2" />
        {/* Bright central hot spot */}
        <div className="absolute w-[60px] h-[60px] bg-canvas/30 rounded-full blur-[10px] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_#C9A24B]" />
        {/* Tiny white pin-point flare core */}
        <div className="absolute w-4 h-4 bg-canvas rounded-full blur-[2px] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#FAF7F2]" />
      </div>

      {/* Left Spotlight Volumetric Beam */}
      <div
        className="absolute inset-0 opacity-85 blur-[12px]"
        style={{
          background: "radial-gradient(circle at 0% 0%, rgba(201, 162, 75, 0.28) 0%, rgba(201, 162, 75, 0.05) 55%, transparent 85%)",
          clipPath: `polygon(0 0, ${lx1}px ${ly1}px, ${lx2}px ${ly2}px)`,
        }}
      />
      {/* Left Spotlight Source Glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-gold/15 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 left-0 w-12 h-12 bg-gold/30 rounded-full blur-md -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 left-0 w-5 h-5 bg-canvas rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_#C9A24B,0_0_10px_#FAF7F2]" />

      {/* Right Spotlight Volumetric Beam */}
      <div
        className="absolute inset-0 opacity-85 blur-[12px]"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(201, 162, 75, 0.28) 0%, rgba(201, 162, 75, 0.05) 55%, transparent 85%)",
          clipPath: `polygon(100% 0, ${rx1}px ${ry1}px, ${rx2}px ${ry2}px)`,
        }}
      />
      {/* Right Spotlight Source Glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/15 rounded-full blur-xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-12 h-12 bg-gold/30 rounded-full blur-md translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-5 h-5 bg-canvas rounded-full translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_#C9A24B,0_0_10px_#FAF7F2]" />
    </div>
  );
};

export default function ProductionsIndex() {
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
              Explore the major stage productions by Raghuvansh Theatre Group. Click on any playbill to explore its history, cast, and gallery.
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

                <Link
                  href={`/productions/${prod.slug}`}
                  className="relative flex flex-col justify-end w-full h-full bg-curtain overflow-hidden border border-gold/30 hover:border-gold transition-all duration-500 spotlight-glow rounded-xl z-10"
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
