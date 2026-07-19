"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Buttons";
import Image from "next/image";

const CollabSlideshow = () => {
  const images = [
    "/collab page/DSC03046.webp",
    "/collab page/DSC03069~2.webp",
    "/collab page/IMG_8876~2.webp",
    "/collab page/IMG_8898.JPG.webp",
    "/collab page/Screenshot_20260719_232205_Drive.webp",
    "/collab page/Screenshot_20260719_233048_Gallery~2.webp",
    "/collab page/Snapseed(81).webp"
  ];
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
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
            alt="Collaborations Slideshow Frame"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default function Collaborations() {
  const faqs = [
    {
      q: "What is the typical timeline for a Collaborations production?",
      a: "The staging of a complete production generally spans two to three months, encompassing script finalization, casting, intensive training workshops, music production, and dress rehearsals. However, this timeline is highly flexible and can be customized to accommodate the specific scheduling and operational requirements of our clients."
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
          <CollabSlideshow />
          <div className="absolute inset-0 bg-ink/75 z-10"></div>
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <span className="font-heading text-xl text-gold uppercase tracking-widest block mb-4">
              Collaborations
            </span>
            <h1 className="font-heading text-5xl md:text-7xl text-gold font-bold mb-6">
              Unforgettable Productions
            </h1>
            <p className="font-body text-lg md:text-xl text-canvas/80 max-w-2xl mx-auto">
              Transforming standard annual events into Broadway-scale theatrical productions.
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
        <section className="relative py-24 bg-ink text-canvas overflow-hidden">
          <CollabSlideshow />
          <div className="absolute inset-0 bg-ink/80 z-10"></div>
          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="font-heading text-4xl md:text-5xl text-gold mb-8">Transform Your Next Collaboration</h2>
          <p className="font-body text-canvas/80 mb-12 max-w-md mx-auto">
            Book a consultation call with the Raghuvansh Team.
          </p>
          <Button variant="secondary" href="/contact?subject=AnnualDay">Enquire Now</Button>
        </section>

      </main>
      <Footer />
    </>
  );
}
