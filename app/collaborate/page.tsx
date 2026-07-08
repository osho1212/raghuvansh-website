"use client";
import React from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Buttons";

export default function Collaborate() {
  return (
    <>
      <Navigation />
      <main className="flex-grow bg-canvas text-ink pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-5xl md:text-6xl text-curtain font-bold mb-6">
              Collaborate With Us
            </h1>
            <p className="font-body text-lg text-ink/75">
              Raghuvansh partners with schools, universities, corporate brands, and non-profits to create customized art productions and public events.
            </p>
          </div>

          {/* Who We Work With */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 bg-white border border-gold/20 rounded-sm">
              <h3 className="font-heading text-2xl text-curtain font-bold mb-4">Educational Institutions</h3>
              <p className="font-body text-sm text-ink/70">
                School productions, collaborations, college theatre societies, script consultation, acting workshops, and street play training.
              </p>
            </div>
            <div className="p-8 bg-white border border-gold/20 rounded-sm">
              <h3 className="font-heading text-2xl text-curtain font-bold mb-4">Corporate Partners</h3>
              <p className="font-body text-sm text-ink/70">
                Bespoke performances for corporate events, soft skills workshops using acting methods, and event sponsorship.
              </p>
            </div>
            <div className="p-8 bg-white border border-gold/20 rounded-sm">
              <h3 className="font-heading text-2xl text-curtain font-bold mb-4">Non-Profits & NGOs</h3>
              <p className="font-body text-sm text-ink/70">
                Street plays focused on social issues, awareness campaigns, fundraising events, and drama-in-education programs.
              </p>
            </div>
          </div>

          {/* Social Welfare */}
          <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl text-curtain font-bold mb-6">Theatre for Social Good</h2>
              <p className="font-body text-lg text-ink/80 leading-relaxed mb-6">
                Under our social welfare initiative, Raghuvansh regularly conducts free theatre programs in community schools and rural areas. We use street plays (Nukkad Natak) to drive message-oriented campaigns on public health, environmental issues, and civic rights.
              </p>
            </div>
            <div className="aspect-video bg-curtain/10 border border-gold/30 rounded-sm flex items-center justify-center film-grain">
              <span className="font-body text-sm text-ink/40 uppercase tracking-wider">Social Welfare Photo</span>
            </div>
          </div>

          {/* CTA / Enquiry redirection */}
          <div className="text-center bg-curtain text-canvas film-grain py-16 rounded-sm border border-gold/20">
            <h2 className="font-heading text-3xl text-gold mb-6">Have an Idea for a Collaboration?</h2>
            <p className="font-body text-sm text-canvas/80 max-w-xl mx-auto leading-relaxed mb-8">
              Reach out to our coordination team. We'd love to understand your requirements and design a unique performance for your platform.
            </p>
            <Button variant="secondary" href="/contact?subject=Collaboration">Start Discussion &rarr;</Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
