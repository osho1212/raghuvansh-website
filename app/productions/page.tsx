"use client";
import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export const productionsData = [
  {
    slug: "chanakya",
    title: "Chanakya",
    year: 2023,
    director: "Pt. Amitosh Sharma",
    excerpt: "An intense historical drama depicting the life of India's greatest political strategist.",
    genre: "Historical Drama",
    duration: "120 mins"
  },
  {
    slug: "kabira-khada-bazaar-mein",
    title: "Kabira Khada Bazaar Mein",
    year: 2022,
    director: "Pt. Amitosh Sharma",
    excerpt: "Bhisham Sahni's classic play on the life and philosophy of Saint Kabir.",
    genre: "Musical Drama",
    duration: "110 mins"
  },
  {
    slug: "ashadh-ka-ek-din",
    title: "Ashadh Ka Ek Din",
    year: 2021,
    director: "Pt. Amitosh Sharma",
    excerpt: "A portrayal of the struggle between creative genius and societal expectations.",
    genre: "Classic Hindi Drama",
    duration: "135 mins"
  },
  {
    slug: "tughlaq",
    title: "Tughlaq",
    year: 2020,
    director: "Pt. Amitosh Sharma",
    excerpt: "Girish Karnad's exploration of power, idealism, and disillusionment.",
    genre: "Political Allegory",
    duration: "140 mins"
  },
  {
    slug: "andha-yug",
    title: "Andha Yug",
    year: 2019,
    director: "Pt. Amitosh Sharma",
    excerpt: "Dharamvir Bharati's powerful verse play on the aftermath of the Mahabharata war.",
    genre: "Verse Play / Tragedy",
    duration: "150 mins"
  }
];

export default function ProductionsIndex() {
  return (
    <>
      <Navigation />
      <main className="flex-grow pt-28 bg-canvas min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-5xl md:text-6xl text-curtain font-bold mb-6">
              Our Productions
            </h1>
            <p className="font-body text-lg text-ink/75">
              Explore the major stage productions by Raghuvansh Theatre Group. Click on any playbill to explore its history, cast, and gallery.
            </p>
          </div>

          {/* Playbill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionsData.map((prod) => (
              <Link
                key={prod.slug}
                href={`/productions/${prod.slug}`}
                className="group relative flex flex-col justify-end aspect-[3/4] bg-curtain overflow-hidden border border-gold/20 hover:border-gold/60 transition-all duration-300 spotlight-glow"
              >
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-ink/30 z-0 flex items-center justify-center">
                  <span className="font-body text-canvas/20 uppercase tracking-widest text-sm">
                    {prod.title} Poster
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Content */}
                <div className="relative z-20 p-8">
                  <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold block mb-2">
                    {prod.genre} • {prod.year}
                  </span>
                  <h2 className="font-heading text-3xl text-canvas font-bold group-hover:text-gold transition-colors mb-2">
                    {prod.title}
                  </h2>
                  <p className="font-body text-sm text-canvas/80 line-clamp-2 mb-4">
                    {prod.excerpt}
                  </p>
                  <span className="font-body text-xs text-canvas/50 group-hover:text-gold uppercase tracking-wider transition-colors">
                    Explore Details &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
