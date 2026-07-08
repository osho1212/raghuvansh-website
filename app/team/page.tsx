"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import Image from "next/image";

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <div className="aspect-[3/4] bg-curtain relative border border-gold/30 rounded-sm overflow-hidden flex items-center justify-center film-grain mb-6">
                  <Image
                    src="/media-assets/founder.webp"
                    alt="Late Shri Amitosh Sharma"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                
                <div className="bg-canvas border border-gold/20 p-6 rounded-sm text-sm text-ink/80 space-y-3">
                  <div className="font-heading text-base text-gold uppercase tracking-wider border-b border-gold/15 pb-2 mb-2 font-bold">Personal Profile</div>
                  <div><span className="font-semibold text-curtain">Born:</span> 1967, Moradabad, Uttar Pradesh</div>
                  <div><span className="font-semibold text-curtain">Father:</span> Late Shri Sudarshanacharya Shastri</div>
                  <div><span className="font-semibold text-curtain">Mother:</span> Late Smt. Prabha Rani Sharma</div>
                  <div><span className="font-semibold text-curtain">Education:</span>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-ink/70">
                      <li>Bachelor of Science (B.Sc.)</li>
                      <li>Sangeet Prabhakar in Vocal Music and Instrumental Music</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <span className="font-body text-sm text-gold uppercase tracking-widest font-semibold block mb-2">Founder & Artistic Director</span>
                <h1 className="font-heading text-5xl text-curtain font-bold mb-6">Late Shri Amitosh Sharma</h1>
                
                <p className="font-body text-lg text-ink/80 leading-relaxed mb-8">
                  A visionary of the Indian stage, Late Shri Amitosh Sharma founded Raghuvansh Theatre Group to bridge the gap between ancient theatrical traditions and contemporary performance art. Over the past two decades, he has directed over 50 major plays, including the landmark Ramayan performances at the Red Fort.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-heading text-xl text-curtain font-semibold border-b border-gold/15 pb-2 mb-4">Professional Profile</h3>
                    <ul className="list-disc pl-5 space-y-2 font-body text-ink/80">
                      <li>Served as the Head of the Music Department, CRPF School, Delhi.</li>
                      <li>AIR (All India Radio) A-Grade Vocal Artist (Ghazal and Bhajan).</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl text-curtain font-semibold border-b border-gold/15 pb-2 mb-4">Honours & Recognitions</h3>
                    <ul className="list-disc pl-5 space-y-3 font-body text-ink/80">
                      <li>
                        Honoured by Union Home Minister <strong className="text-curtain">Shri Rajnath Singh</strong> for theatrical performance at Parade Ground (2015).
                      </li>
                      <li>
                        Honoured by Vice President <strong className="text-curtain">Shri M. Venkaiah Naidu</strong> for the staging of Ramayana (2017).
                      </li>
                      <li>
                        Honoured by the Deputy Chief Minister and Education Minister of Delhi for excellence in theatre direction at the Red Fort premises (2018).
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gold/10">
                    <div>
                      <h3 className="font-heading text-xl text-curtain font-semibold border-b border-gold/15 pb-2 mb-4">Music Direction for TV Serials</h3>
                      <ul className="list-disc pl-5 space-y-1.5 font-body text-ink/80 text-sm">
                        <li>Phool Hoo</li>
                        <li>Aakash Ke Diye (DD Urdu)</li>
                        <li>Akbar Birbal (Doordarshan)</li>
                        <li>Sangharsh (Sony TV)</li>
                        <li>Yakeel Jasoos Chhori</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-curtain font-semibold border-b border-gold/15 pb-2 mb-4">Feature Films</h3>
                      <ul className="list-disc pl-5 space-y-1.5 font-body text-ink/80 text-sm">
                        <li>Hai Tiranga</li>
                        <li>Hum Ek Hain</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
