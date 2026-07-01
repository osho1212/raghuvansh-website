"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Buttons";

export default function Workshops() {
  const types = [
    { title: "Summer Acting Intensive", desc: "A 4-week rigorous program covering body language, voice modulation, and scene work.", duration: "4 Weeks" },
    { title: "Weekend Baithak", desc: "Short weekend workshops focused on traditional street play techniques and street theatre.", duration: "2 Days" },
    { title: "Children's Theatre", desc: "Creative expression and confidence building workshops designed for kids aged 8-15.", duration: "2 Weeks" }
  ];

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink">
        {/* HERO */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-curtain text-canvas film-grain pt-20">
          <div className="absolute inset-0 bg-ink/70 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <span className="font-heading text-xl text-gold uppercase tracking-widest block mb-4">
              Training & Workshops
            </span>
            <h1 className="font-heading text-5xl md:text-7xl text-gold font-bold mb-6">
              Learn the Craft
            </h1>
            <p className="font-body text-lg md:text-xl text-canvas/80 max-w-2xl mx-auto">
              Professional training programs curated by NSD Alumni for aspiring actors and theatre enthusiasts.
            </p>
          </div>
        </section>

        {/* TYPES (Cards) */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-curtain font-bold text-center mb-16">Workshop Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {types.map((type, idx) => (
              <div key={idx} className="p-8 border border-gold/20 hover:border-gold/50 bg-white rounded-sm transition-colors flex flex-col justify-between">
                <div>
                  <span className="font-body text-xs text-gold uppercase tracking-widest block mb-2">{type.duration}</span>
                  <h3 className="font-heading text-2xl text-curtain font-bold mb-4">{type.title}</h3>
                  <p className="font-body text-sm text-ink/70 mb-6">{type.desc}</p>
                </div>
                <Button variant="outline" href={`/contact?subject=Workshop-${type.title.replace(/\s+/g, '')}`}>
                  Register Interest
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* WHO CAN JOIN */}
        <section className="py-24 bg-ink text-canvas">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-4xl text-gold mb-16">Who Can Join?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-body text-sm">
              <div>
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="font-heading text-2xl text-canvas mb-2">Beginners</h3>
                <p className="text-canvas/70 leading-relaxed">No prior stage experience required. Perfect for anyone looking to build confidence and communication skills.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🎬</div>
                <h3 className="font-heading text-2xl text-canvas mb-2">Aspiring Actors</h3>
                <p className="text-canvas/70 leading-relaxed">For people seeking formal training to crack drama school auditions (NSD/FTII) or step into professional acting.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📣</div>
                <h3 className="font-heading text-2xl text-canvas mb-2">Enthusiasts</h3>
                <p className="text-canvas/70 leading-relaxed">For anyone passionate about literature, public speaking, or corporate employees wanting to enhance their soft skills.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NGO PITCH */}
        <section className="py-24 bg-canvas text-ink max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-curtain font-bold mb-6">NGO & Community Workshops</h2>
          <p className="font-body text-lg text-ink/80 leading-relaxed mb-8">
            Raghuvansh believes in the power of social change through street plays (Nukkad Natak). We conduct sponsored acting and social-sensitization workshops for NGOs and underprivileged communities across Delhi NCR.
          </p>
          <Button variant="primary" href="/contact?subject=NGO">Partner With Us</Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
