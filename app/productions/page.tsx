"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export const productionsData = [
  {
    slug: "baaki-itihaas",
    title: "Baaki Itihaas",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Baaki Itihaas transcends the boundaries of conventional theatre, emerging as a profound reflection on human existence, memory, guilt, and the enduring search for life's meaning.",
    genre: "Drama / Reflection",
    duration: "120 mins",
    poster: "/production-assets/baaki-itihaas/poster-1.webp",
    posterBackup: "/production-assets/baaki-itihaas/poster-2.webp",
    brochure: "/production-assets/baaki-itihaas/brochure.pdf",
    cast: ["Sharad (Krishna Shrivastav)", "Vasanti (Isha Khera)", "Sitanath (Animesh Pandit)", "Kanak (Anoushka Sharma)", "Vidubhushan (Anil Gagneja)", "Nikhil (Arman)", "Vijay (Aryan Verma)", "Vasudev (Aryan Verma)", "Kanak’s Father (Anil Gagneja)", "Postman (Jivansh Bihagra)"],
    playwright: "Badal Sircar",
    quote: "History is not only what is written in books; it is also what every individual silently carries within, yet never finds the words to tell.",
    directorsNote: "History is not merely what is recorded; it is equally what is remembered, forgotten, and silently carried within us."
  },
  {
    slug: "saari-raat",
    title: "Saari Raat",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Saari Raat transcends the boundaries of conventional theatre, emerging as a deeply philosophical exploration of loneliness, human relationships, and the timeless search for truth.",
    genre: "Philosophical Drama",
    duration: "110 mins",
    poster: "/production-assets/saari-raat/poster.webp",
    brochure: "/production-assets/saari-raat/brochure.pdf",
    cast: ["Husband", "Wife", "Old Man"],
    playwright: "Badal Sircar",
    quote: "Sometimes, it takes an entire night to discover what a lifetime of routine has kept hidden.",
    directorsNote: "The longest journeys are often not measured in miles, but in moments of silence, reflection, and self-discovery."
  },
  {
    slug: "shabd-baan",
    title: "Shabd Baan",
    year: 2026,
    director: "Animesh Pandit",
    excerpt: "Shabd Baan is an intense dramatic exploration of grief, dharma, and divine accountability, imagined through a searing conversation between Gandhari and Shri Krishna in the aftermath of the Mahabharata.",
    genre: "Musical & Poetic Drama",
    duration: "90 mins",
    poster: "/production-assets/shabd-baan/poster.webp",
    brochure: "/production-assets/shabd-baan/brochure.pdf",
    cast: ["Krishn", "Gaandhari", "Kaurav", "Draupadi"],
    playwright: "Animesh Pandit",
    quote: "True justice is not the destruction of an enemy, but the destruction of enmity.",
    directorsNote: "ऐसा भी कभी तुम न्याय करो, शत्रू को नहीं — शत्रुता हरो। Shabd Baan - 'word arrows' - is a theatrical experiment where words become weapons, wounds, and windows. It is envisioned as a larger series of unfiltered, uncomfortable, extended conversations between iconic figures from Indian history."
  },
  {
    slug: "wrong-turn",
    title: "Wrong Turn",
    year: 2024,
    director: "Animesh Pandit",
    excerpt: "Wrong Turn is a thought-provoking contemporary play that explores the complex relationship between human choices and their consequences, adapting Frederick Dürrenmatt's The Dangerous Game.",
    genre: "Contemporary Drama / Psychological Theatre",
    duration: "100 mins",
    poster: "/production-assets/wrong-turn/poster.webp",
    brochure: "/production-assets/wrong-turn/brochure.pdf",
    cast: ["Arun Mehra", "Lateef Zaidi", "Makarand Joshi", "Jagdeesh Mathur", "Neena Oberoi", "Banne Miyaan", "Raghu", "White Man", "Shivani"],
    playwright: "Ranjit Kapoor",
    quote: "Does every wrong decision inevitably lead to downfall, or can mistakes also become pathways to self-discovery and transformation?",
    directorsNote: "Wrong Turn is not merely an incident or a story; it is a theatrical exploration of those moments in life when, often unknowingly, a person takes a turn that challenges their beliefs, relationships, and sense of self."
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
                className="group relative flex flex-col justify-end aspect-[3/4] bg-curtain overflow-hidden border border-gold/25 hover:border-gold transition-all duration-500 spotlight-glow rounded-sm"
              >
                {/* Real WebP Image */}
                <Image
                  src={prod.poster}
                  alt={prod.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover z-0 group-hover:scale-[1.03] transition-transform duration-700"
                />
                {/* Subtle hover overlay border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/45 transition-colors duration-500 z-10"></div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
