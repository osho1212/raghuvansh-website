"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function Gallery() {
  const categories = ["All", "Ramayan", "Productions", "Mehfil-e-Ghazal", "Rehearsals"];
  const [activeCategory, setActiveCategory] = useState("All");

  const images = [
    { id: 1, category: "Ramayan", title: "Red Fort Performance" },
    { id: 2, category: "Productions", title: "Chanakya Stage Setup" },
    { id: 3, category: "Mehfil-e-Ghazal", title: "Baithak Evening" },
    { id: 4, category: "Rehearsals", title: "Backstage Prep" },
    { id: 5, category: "Ramayan", title: "Varanasi Tour" },
    { id: 6, category: "Productions", title: "Andha Yug Climax" },
  ];

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-5xl md:text-6xl text-curtain font-bold mb-6">
              Gallery
            </h1>
            <p className="font-body text-lg text-ink/75">
              A visual archive of our stage plays, musical evenings, rehearsals, and historic moments at the Red Fort.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 border rounded-sm font-body uppercase text-xs tracking-widest transition-all ${
                  activeCategory === cat
                    ? "bg-curtain border-curtain text-canvas"
                    : "border-gold/30 hover:border-gold text-ink/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-video bg-curtain/10 border border-gold/20 hover:border-gold/60 rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <span className="font-body text-sm text-ink/40 uppercase tracking-wider group-hover:text-ink/60 transition-colors">
                  {img.title}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-body text-xs text-gold uppercase tracking-widest block">{img.category}</span>
                  <span className="font-heading text-lg text-canvas font-bold">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
