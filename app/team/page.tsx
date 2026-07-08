"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import Image from "next/image";

export default function Team() {
  const [activeTab, setActiveTab] = React.useState("theatre");
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

          {/* ARTISTIC LEGACY BROWSER */}
          <div className="mb-24 bg-ink text-canvas rounded-lg border border-gold/30 p-8 md:p-12 relative overflow-hidden film-grain">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-curtain/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-12">
              <span className="font-body text-xs text-gold uppercase tracking-widest block mb-2">The Archive</span>
              <h2 className="font-heading text-4xl text-gold font-bold mb-4">Artistic Legacy</h2>
              <p className="font-body text-canvas/70 max-w-2xl mx-auto text-sm md:text-base">
                A lifetime dedicated to the arts. Explore the comprehensive catalog of theatrical directions, musical compositions, published literature, and national honours of Late Shri Amitosh Sharma.
              </p>
            </div>

            {/* Tab Headers */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 border-b border-gold/15 pb-6">
              {[
                { id: "theatre", label: "Theatre Productions" },
                { id: "music", label: "Music & Film" },
                { id: "literature", label: "Literature & Honours" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-sm font-body text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer font-bold ${
                    activeTab === tab.id
                      ? "bg-gold border-gold text-ink shadow-[0_0_15px_rgba(201,162,75,0.3)]"
                      : "bg-transparent border-canvas/10 hover:border-gold/50 text-canvas/80 hover:text-gold"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="min-h-[300px]">
              {activeTab === "theatre" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="bg-canvas/5 p-6 rounded-sm border border-gold/10">
                    <h3 className="font-heading text-lg text-gold mb-3 font-semibold">Ramayana Productions</h3>
                    <p className="font-body text-canvas/80 text-sm leading-relaxed">
                      For over 30 years, his institution staged the complete Ramayana annually at the Red Fort Parade Ground and Pitampura, Delhi. This production remains one of the group's cornerstone heritage works.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-4 border-b border-gold/15 pb-2 font-semibold">Theatre Plays Directed</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-canvas/70 text-sm">
                        {[
                          "Taj for Sale", "Alibaba", "Nai Sadi Ki Ore", "Aage Kya Hoga Rama Re", 
                          "Golden Owl", "Ajaatshatru Ka Dard", "Big Boss Ki Biwi", "Sanjog", 
                          "Ek Tha Gadha Aur Allah Dad Khan", "Uljhan", "Singhasan Khali Hai", 
                          "Andhon Ka Haathi", "Hai Ri Chandramukhi", "Gadhe Ki Baraat", 
                          "Pagalon Ki Duniya", "Chalta Purza", "Birwa Mangal", "Raghuvansh Navya"
                        ].map((play) => (
                          <div key={play} className="flex items-center gap-2">
                            <span className="text-gold/50 text-xs">•</span>
                            <span>{play}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg text-gold mb-4 border-b border-gold/15 pb-2 font-semibold">Musical Theatre Productions</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-canvas/70 text-sm">
                        {[
                          "Amir Khusro", "Karna", "Aaj Ka Abhimanyu", "Chandragupta Maurya", 
                          "Naga Agar Ji Rooth Gayi To", "Jeevan Meet Sangeet", "Wonders of the World", 
                          "Uday", "Bin Paani Sab Soon", "Prithviraj Chauhan", "Meri Delhi Meri Shaan", 
                          "Navras", "Panch Tatva"
                        ].map((musical) => (
                          <div key={musical} className="flex items-center gap-2">
                            <span className="text-gold/50 text-xs">•</span>
                            <span>{musical}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gold/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-canvas/80 font-body">
                    <div className="flex items-start gap-3">
                      <span className="text-gold mt-1">✈</span>
                      <div>
                        <strong className="text-gold block">International Theatre Tour</strong>
                        Participated in a prestigious theatre tour to Turkey under the guidance of Parsi theatre maestro Master Fida Hussain Jassi.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-gold mt-1">🎭</span>
                      <div>
                        <strong className="text-gold block">Theatre Training</strong>
                        Conducted Urdu Theatre Training at the Shri Ram Centre for Performing Arts, Delhi.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "music" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-4 border-b border-gold/15 pb-2 font-semibold">Music Albums</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-canvas/70 text-sm">
                        {[
                          "Stuti", "Sisodiya", "Chandi Chandi Ho Gayi (Tips)", "Phir Chand Utar Aaya (Venus)", 
                          "Bhole Ki Mauj", "Soul Expressions", "Dheema Dheema Hai Dhua (Venus)", 
                          "Suraliya Baje (Tips)", "Ghazal Guldasta (Tips)"
                        ].map((album) => (
                          <div key={album} className="flex items-center gap-2">
                            <span className="text-gold/50 text-xs">•</span>
                            <span>{album}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg text-gold mb-4 border-b border-gold/15 pb-2 font-semibold">Television & Feature Film Music</h3>
                      <div className="space-y-4 font-body text-canvas/70 text-sm">
                        <div>
                          <strong className="text-canvas block text-xs uppercase tracking-wider mb-1">Television Music Direction</strong>
                          <span className="text-canvas/60">Phool Hoo, Aakash Ke Diye (DD Urdu), Akbar Birbal (Doordarshan), Sangharsh (Sony TV), Yakeel Jasoos Chhori</span>
                        </div>
                        <div>
                          <strong className="text-canvas block text-xs uppercase tracking-wider mb-1">Feature Film Music</strong>
                          <span className="text-canvas/60">Hai Tiranga, Hum Ek Hain, Bhor, Kis Ko Pyar Karu</span>
                        </div>
                        <div>
                          <strong className="text-canvas block text-xs uppercase tracking-wider mb-1">International Film Music (USA)</strong>
                          <span className="text-canvas/60">Living in America, Where Is the Culture</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "literature" && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-heading text-lg text-gold mb-4 border-b border-gold/15 pb-2 font-semibold">Books Authored</h3>
                      <div className="space-y-4 font-body text-canvas/80 text-sm">
                        <div className="flex gap-3">
                          <span className="text-gold text-lg">📖</span>
                          <div>
                            <strong className="text-gold block font-heading text-base">Tumko Dekha Ghazal Ho Gayi (2015)</strong>
                            A published collection of ghazals capturing classical Hindustani baithak aesthetics.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-gold text-lg">📖</span>
                          <div>
                            <strong className="text-gold block font-heading text-base">Ek Ghazal Ka Safarnama (2021)</strong>
                            An archival chronicle mapping the evolutionary journey of ghazal performances.
                          </div>
                        </div>
                        <div className="flex gap-3 pt-2 border-t border-gold/10">
                          <span className="text-gold text-lg">✍</span>
                          <div>
                            <strong className="text-gold block font-heading text-base">Songwriting</strong>
                            "Nayi Roshni Ki Taraf"
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-lg text-gold mb-4 border-b border-gold/15 pb-2 font-semibold">Awards & Honours</h3>
                      <ul className="space-y-2.5 font-body text-canvas/70 text-sm list-disc pl-5">
                        <li><strong>1988:</strong> Udas Trophy, All India Ghazal Singing Competition.</li>
                        <li>Honoured with the <strong>Shaan-e-Pital Nagari</strong> title, Moradabad.</li>
                        <li>Recipient of the Music Award by <strong>Mala Sanstha</strong>, Raipur (1999).</li>
                        <li>Honoured by the <strong>Hindi Sanskrit Academy</strong>, Delhi (2010, 2012, and 2013).</li>
                        <li>Performed Ghazal and Bhajan concerts internationally in <strong>Dubai, Hong Kong, England, and Kenya</strong>.</li>
                        <li>Honoured by <strong>Sanskar Bharati</strong> for lifetime contribution to arts.</li>
                        <li>Awarded the Music Award, Moradabad, and Samata Award, Rampur.</li>
                        <li>Recognized in Lucknow's Youth Music Session at the Youth Festival.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
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
