"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Buttons";

export default function AnnualDay() {
  const faqs = [
    {
      q: "What is the typical timeline for an Annual Day production?",
      a: "A complete production usually takes 2 to 3 months, including script finalization, casting, training workshops, music production, and dress rehearsals."
    },
    {
      q: "Do you handle costumes and set design?",
      a: "Yes, Raghuvansh provides end-to-end production support, including customized historical costumes, set design and installation, professional lighting, and sound equipment."
    },
    {
      q: "Can you train large student cohorts?",
      a: "Absolutely. We are experienced in handling and choreographing large groups of up to 300+ students on stage simultaneously, ensuring every student has a role and feels confident."
    },
    {
      q: "Do you write custom scripts based on school themes?",
      a: "Yes, our scriptwriting team creates customized, age-appropriate screenplays based on the educational, social, or historical theme requested by the school."
    }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink">
        
        {/* HERO */}
        <section className="relative min-h-[75vh] flex items-center justify-center bg-curtain text-canvas film-grain pt-20">
          <div className="absolute inset-0 bg-ink/70 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <span className="font-heading text-xl text-gold uppercase tracking-widest block mb-4">
              Annual Day Productions
            </span>
            <h1 className="font-heading text-5xl md:text-7xl text-gold font-bold mb-6">
              Unforgettable School Plays
            </h1>
            <p className="font-body text-lg md:text-xl text-canvas/80 max-w-2xl mx-auto">
              Transforming standard school annual events into Broadway-scale theatrical experiences.
            </p>
          </div>
        </section>

        {/* WHAT WE BRING */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-curtain font-bold text-center mb-16">What We Bring</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-body">
            {[
              { label: "End-to-End Direction", icon: "🎬" },
              { label: "Custom Scriptwriting", icon: "✍️" },
              { label: "Grand Set & Costumes", icon: "🎭" },
              { label: "Professional Audio-Visuals", icon: "🔊" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-gold/20 hover:border-gold/50 rounded-sm transition-colors bg-white">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-base font-semibold uppercase tracking-wider">{item.label}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* WHY A PROFESSIONAL GROUP */}
        <section className="py-24 bg-ink text-canvas">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl text-gold text-center mb-16">Why Hire Raghuvansh?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-body text-sm">
              <div>
                <h3 className="font-heading text-2xl text-gold mb-4">1. Expert Training</h3>
                <p className="text-canvas/80 leading-relaxed">
                  Our professional actors and directors personally train and mentor students, teaching them authentic acting, voice modulation, and stage presence techniques.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-gold mb-4">2. Unmatched Scale</h3>
                <p className="text-canvas/80 leading-relaxed">
                  We design massive sets, historical props, and provide custom-tailored costumes that match the grandeur of professional theatre productions.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-gold mb-4">3. Hassle-Free Execution</h3>
                <p className="text-canvas/80 leading-relaxed">
                  From sound engineering to stage management, we manage the entire event execution, leaving the school administration free to enjoy the show.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAST INSTITUTIONS */}
        <section className="py-16 bg-canvas border-b border-gold/20">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="font-body uppercase tracking-widest text-center text-ink/50 text-xs mb-8">Trusted by Elite Institutions</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 font-heading text-xl text-ink/40 uppercase tracking-widest">
              <span>DPS RK Puram</span>
              <span className="text-gold">•</span>
              <span>Modern School Barakhamba</span>
              <span className="text-gold">•</span>
              <span>Amity International</span>
              <span className="text-gold">•</span>
              <span>GD Goenka</span>
            </div>
          </div>
        </section>

        {/* FAQ (Accordion) */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl text-curtain font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gold/20 rounded-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 font-heading text-xl flex justify-between items-center text-ink hover:text-curtain"
                >
                  <span>{faq.q}</span>
                  <span className="text-gold">{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="p-6 pt-0 font-body text-sm text-ink/80 border-t border-gold/10">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ENQUIRY FORM */}
        <section className="bg-curtain film-grain py-24 text-center px-4">
          <h2 className="font-heading text-4xl md:text-5xl text-gold mb-8">Transform Your Next Annual Day</h2>
          <p className="font-body text-canvas/80 mb-12 max-w-md mx-auto">
            Book a consultation call with Pt. Amitosh Sharma to discuss script ideas and production timelines for your school.
          </p>
          <Button variant="secondary" href="/contact?subject=AnnualDay">Enquire Now</Button>
        </section>

      </main>
      <Footer />
    </>
  );
}
