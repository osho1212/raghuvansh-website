"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function Team() {
  const members = [
    { name: "Anushka Sharma", role: "Vocalist & Music Lead" },
    { name: "Rohan Sen", role: "Associate Director" },
    { name: "Priya Das", role: "Lead Choreographer" },
    { name: "Vikram Malhotra", role: "Stage & Set Designer" },
    { name: "Meera Nair", role: "Costume Coordinator" },
    { name: "Suresh Gupta", role: "Sound Engineer" }
  ];

  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          
          {/* FOUNDER SPOTLIGHT */}
          <div className="mb-24 border-b border-gold/20 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1 aspect-[3/4] bg-curtain relative border border-gold/30 rounded-sm overflow-hidden flex items-center justify-center film-grain">
                <span className="font-body text-canvas/40 uppercase tracking-widest text-sm">
                  Pt. Amitosh Sharma
                </span>
              </div>
              <div className="lg:col-span-2">
                <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold block mb-2">Founder & Artistic Director</span>
                <h1 className="font-heading text-5xl text-curtain font-bold mb-6">Pt. Amitosh Sharma</h1>
                <p className="font-body text-lg text-ink/80 leading-relaxed mb-6">
                  An alumnus of the National School of Drama (NSD), Pt. Amitosh Sharma founded Raghuvansh Theatre Group to give classic Indian epics and literary giants a grand, contemporary stage. Over the past two decades, he has directed over 50 major plays, including the landmark RamLeela performances at the Red Fort.
                </p>
              </div>
            </div>
          </div>

          {/* MEMBERS GRID */}
          <div className="mb-24">
            <h2 className="font-heading text-4xl text-curtain font-bold text-center mb-16">Core Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, idx) => (
                <div key={idx} className="p-8 bg-white border border-gold/20 rounded-sm hover:border-gold/50 transition-colors flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-curtain/10 flex items-center justify-center font-heading text-xl text-curtain font-bold">
                    {member.name[0]}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-ink font-bold">{member.name}</h3>
                    <p className="font-body text-sm text-ink/60">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ALUMNI */}
          <div className="text-center bg-ink text-canvas py-16 rounded-sm border border-gold/20">
            <h2 className="font-heading text-3xl text-gold mb-6">Our Alumni</h2>
            <p className="font-body text-sm text-canvas/80 max-w-xl mx-auto leading-relaxed">
              Many of our actors, technicians, and crew members have graduated to prominent careers in Bollywood, national television, and premier performing arts institutes (NSD/FTII). We take pride in being a launchpad for raw artistic talent.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
