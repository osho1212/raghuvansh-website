"use client";
import React from "react";
import { useParams, notFound } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { productionsData } from "../page";

export default function ProductionDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const prod = productionsData.find((p) => p.slug === slug);

  if (!prod) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="flex-grow pt-28 bg-canvas min-h-screen text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          
          {/* Main Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
            
            {/* Poster (Left) */}
            <div className="lg:col-span-1 aspect-[3/4] bg-curtain relative border border-gold/30 rounded-sm overflow-hidden flex items-center justify-center film-grain">
              <span className="font-body text-canvas/40 uppercase tracking-widest text-sm">
                Poster Placeholder
              </span>
            </div>

            {/* Info Panel (Right) */}
            <div className="lg:col-span-2">
              <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold block mb-2">
                {prod.genre}
              </span>
              <h1 className="font-heading text-5xl md:text-6xl text-curtain font-bold mb-6">
                {prod.title}
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gold/20 mb-8 font-body text-sm">
                <div>
                  <span className="text-ink/50 uppercase tracking-wider block mb-1">Year</span>
                  <span className="font-bold text-lg">{prod.year}</span>
                </div>
                <div>
                  <span className="text-ink/50 uppercase tracking-wider block mb-1">Director</span>
                  <span className="font-bold text-lg">{prod.director}</span>
                </div>
                <div>
                  <span className="text-ink/50 uppercase tracking-wider block mb-1">Duration</span>
                  <span className="font-bold text-lg">{prod.duration}</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h3 className="font-heading text-2xl text-curtain mb-4">Synopsis</h3>
                <p className="font-body text-lg text-ink/80 leading-relaxed">
                  {prod.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et tempor ex luctus eget. In elementum diam at tempus ultrices. Aliquam nec aliquet dolor, eget consequat metus.
                </p>
              </div>

              {/* Director & Cast */}
              <div className="mb-8">
                <h3 className="font-heading text-2xl text-curtain mb-4">Director & Cast</h3>
                <p className="font-body text-ink/80 leading-relaxed mb-4">
                  <strong>Director:</strong> {prod.director}
                </p>
                <p className="font-body text-ink/80 leading-relaxed">
                  <strong>Cast:</strong> Pt. Amitosh Sharma, Anushka Sharma, Rohan Sen, Priya Das, Vikram Malhotra, Meera Nair
                </p>
              </div>
            </div>
          </div>

          {/* Review Quote */}
          <div className="bg-curtain text-canvas film-grain p-12 text-center rounded-sm mb-16 border border-gold/30">
            <p className="font-heading text-2xl md:text-3xl italic text-gold mb-4">
              "An absolute triumph. Pt. Amitosh Sharma has delivered his finest work yet."
            </p>
            <span className="font-body text-sm uppercase tracking-wider text-canvas/70">
              — The Times of India
            </span>
          </div>

          {/* Photo Strip */}
          <div>
            <h3 className="font-heading text-3xl text-curtain mb-8">Production Stills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-ink/10 border border-gold/20 flex items-center justify-center rounded-sm">
                  <span className="font-body text-xs text-ink/40">Still {i}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
