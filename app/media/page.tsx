"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function Media() {
  const clippings = [
    { title: "Reviving Epics at the Red Fort", source: "Hindustan Times", date: "Oct 2024" },
    { title: "Urdu Poetry finds a New Voice", source: "Dainik Jagran", date: "Aug 2024" },
    { title: "Raghuvansh: 20 Years of Artistic Integrity", source: "Indian Express", date: "Jan 2024" }
  ];

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-5xl md:text-6xl text-curtain font-bold mb-6">
              Press & Media
            </h1>
            <p className="font-body text-lg text-ink/75">
              Explore coverage, interviews, and reviews of Raghuvansh Theatre Group across national and international press outlets.
            </p>
          </div>

          {/* BBC / Brut Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-ink text-canvas border border-gold/20 p-8 hover:border-gold/60 transition-colors flex flex-col justify-between aspect-video rounded-sm">
              <span className="font-body text-xs text-gold uppercase tracking-widest block mb-4">Video Interview</span>
              <div>
                <h3 className="font-heading text-3xl font-bold mb-2">BBC Hindi Features</h3>
                <p className="font-body text-sm text-canvas/70 mb-6">A deep-dive interview with Pt. Amitosh Sharma on the historical significance of the RamLeela performances at the Red Fort.</p>
              </div>
              <a href="#" className="font-body text-xs uppercase tracking-wider text-gold hover:underline">Watch Video &rarr;</a>
            </div>

            <div className="bg-ink text-canvas border border-gold/20 p-8 hover:border-gold/60 transition-colors flex flex-col justify-between aspect-video rounded-sm">
              <span className="font-body text-xs text-gold uppercase tracking-widest block mb-4">Docu-feature</span>
              <div>
                <h3 className="font-heading text-3xl font-bold mb-2">Brut India Documentary</h3>
                <p className="font-body text-sm text-canvas/70 mb-6">Behind-the-scenes look at the scale of our productions, covering rehearsals, stage building, and visual planning.</p>
              </div>
              <a href="#" className="font-body text-xs uppercase tracking-wider text-gold hover:underline">Watch Video &rarr;</a>
            </div>
          </div>

          {/* Clippings Masonry */}
          <div className="mb-24">
            <h2 className="font-heading text-4xl text-curtain font-bold text-center mb-16">Press Clippings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {clippings.map((clip, idx) => (
                <div key={idx} className="p-8 bg-white border border-gold/20 rounded-sm hover:border-gold/50 transition-colors">
                  <h3 className="font-heading text-2xl text-ink font-bold mb-4">"{clip.title}"</h3>
                  <div className="flex justify-between items-center text-xs font-body text-ink/60 border-t border-gold/10 pt-4 mt-6">
                    <span>{clip.source}</span>
                    <span>{clip.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Govt Acknowledgements */}
          <div className="text-center py-16 bg-curtain text-canvas film-grain rounded-sm border border-gold/20">
            <h2 className="font-heading text-3xl text-gold mb-6">Government Acknowledgements</h2>
            <p className="font-body text-sm text-canvas/80 max-w-xl mx-auto leading-relaxed">
              We express our gratitude to the Ministry of Culture, Government of India, and the Sahitya Kala Parishad for their continued support, patronage, and recognition of Raghuvansh Theatre Group's cultural preservation efforts.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
