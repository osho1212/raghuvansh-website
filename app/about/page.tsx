"use client";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { motion } from "framer-motion";

export default function About() {
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
                  Pt. Amitosh Sharma
                </motion.h1>
                <div className="font-body text-gold uppercase tracking-widest text-sm mb-8">
                  Founder & Director • NSD Alumnus
                </div>
                <p className="font-body text-lg text-canvas/80 leading-relaxed mb-8">
                  A visionary of the Indian stage, Pt. Amitosh Sharma has dedicated his life to bridging the gap between ancient theatrical traditions and contemporary performance art. His directorial style is characterized by its scale, emotional depth, and uncompromising commitment to the craft.
                </p>
                <blockquote className="border-l-2 border-gold pl-6 py-2">
                  <p className="font-heading text-2xl text-canvas italic">
                    "Theatre is not merely performance; it is a ritual where the actor and the audience breathe together."
                  </p>
                </blockquote>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[3/4] relative border border-gold/30 rounded-sm overflow-hidden bg-ink/20 flex items-center justify-center">
                  <span className="font-body text-canvas/40">Large Portrait Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GOLD DIVIDER */}
        <div className="h-px w-full bg-gold/50"></div>

        {/* THE GROUP'S STORY */}
        <section className="py-24 bg-canvas text-ink relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl text-curtain font-bold mb-16 text-center">Our Journey</h2>
            <div className="relative border-l border-gold/30 ml-4 md:ml-1/2 md:translate-x-[-0.5px]">
              {/* Timeline Items */}
              {[
                { year: "2000", title: "The Inception", desc: "Founded in New Delhi with a vision to revive classical theatre." },
                { year: "2005", title: "The First RamLeela", desc: "A groundbreaking production that redefined mythological storytelling." },
                { year: "2012", title: "National Acclaim", desc: "Recognized by the Sangeet Natak Akademi for contribution to arts." },
                { year: "Today", title: "A Theatrical Institution", desc: "Performing at the Red Fort and shaping the next generation of artists." }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8 md:pl-0 py-6 md:w-1/2 md:odd:ml-0 md:even:ml-auto md:even:pl-12 md:odd:pr-12 md:odd:text-right group">
                  <div className="absolute left-0 top-8 md:left-auto md:right-[-5px] md:group-even:left-[-5px] w-3 h-3 bg-gold rounded-full -translate-x-[6.5px] md:translate-x-0"></div>
                  <h3 className="font-heading text-3xl text-ink font-bold mb-2">{item.year}</h3>
                  <h4 className="font-body text-xl text-curtain font-semibold mb-2">{item.title}</h4>
                  <p className="font-body text-ink/70">{item.desc}</p>
                </div>
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
        <section className="py-16 bg-canvas border-b border-gold/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-12 font-heading text-2xl text-ink/40 uppercase tracking-widest">
              <span className="hover:text-curtain transition-colors">NSD</span>
              <span className="text-gold">•</span>
              <span className="hover:text-curtain transition-colors">SNA</span>
              <span className="text-gold">•</span>
              <span className="hover:text-curtain transition-colors">AIR</span>
              <span className="text-gold">•</span>
              <span className="hover:text-curtain transition-colors">FTII</span>
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

        {/* VISION */}
        <section className="py-32 bg-canvas text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-curtain leading-tight">
              To be the definitive voice of Indian theatre, resounding across global stages.
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
