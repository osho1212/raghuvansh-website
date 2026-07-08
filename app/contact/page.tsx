"use client";
import React, { useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

function ContactContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "General";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: initialSubject
    }
  });

  useEffect(() => {
    if (initialSubject) {
      setValue("subject", initialSubject);
    }
  }, [initialSubject, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, "enquiries"), {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error saving enquiry to Firebase: ", e);
    }

    const whatsappNumber = "918585909213";
    const text = encodeURIComponent(
      `Hello Raghuvansh Group of Performing Arts! I have sent an enquiry.\n\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Subject:* ${data.subject}\n*Message:* ${data.message}`
    );
    window.location.href = `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <main className="flex-grow bg-canvas text-ink pt-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-lg overflow-hidden border border-gold/20">
          
          {/* Left: Info (Curtain Red) */}
          <div className="bg-curtain text-canvas p-12 flex flex-col justify-between film-grain relative">
            <div className="absolute inset-0 bg-black/20 z-0"></div>
            <div className="relative z-10">
              <span className="font-body text-xs text-gold uppercase tracking-widest font-semibold block mb-2">Get in Touch</span>
              <h1 className="font-heading text-4xl md:text-5xl text-gold font-bold mb-8">Contact Raghuvansh</h1>
              <p className="font-body text-canvas/80 leading-relaxed mb-12 max-w-sm">
                We look forward to hearing from you. Reach out to coordinate event bookings, school productions, or workshop registrations.
              </p>

              <div className="space-y-6 font-body text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-canvas/50 block text-xs uppercase tracking-wider">Email</span>
                    <a href="mailto:contact@raghuvansh.co" className="hover:text-gold transition-colors font-semibold">contact@raghuvansh.co</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-canvas/50 block text-xs uppercase tracking-wider">Phone / WhatsApp</span>
                    <a href="tel:+918585909213" className="hover:text-gold transition-colors font-semibold">+91 85859 09213</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-canvas/50 block text-xs uppercase tracking-wider">Office</span>
                    <span className="font-semibold">Mandi House, New Delhi, India</span>
                  </div>
                </div>
              </div>

              {/* Casting Calls Section */}
              <div className="border-t border-gold/20 pt-6 mt-8">
                <h3 className="font-heading text-lg text-gold mb-2 uppercase tracking-wider">Casting Calls</h3>
                <p className="font-body text-xs text-canvas/75 leading-relaxed mb-4">
                  Are you an actor, dancer, or voice artist? Raghuvansh holds regular auditions for upcoming theatre productions and workshops.
                </p>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 bg-gold text-ink text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-canvas hover:text-curtain transition-all rounded-sm shadow-sm font-body"
                >
                  Apply for Auditions <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="relative z-10 pt-12 border-t border-gold/20 mt-12 text-xs font-body text-canvas/60">
              <span>Raghuvansh &copy; {new Date().getFullYear()}</span>
            </div>
          </div>

          {/* Right: Form (White/Canvas) */}
          <div className="bg-white p-12">
            <h2 className="font-heading text-3xl text-curtain font-bold mb-8">Send an Enquiry</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-body text-sm">
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">Full Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink"
                  placeholder="Enter your name"
                />
                {errors.name && <span className="text-curtain text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">Email Address</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink"
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-curtain text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">Subject</label>
                <select
                  {...register("subject")}
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink"
                >
                  <option value="General">General Enquiry</option>
                  <option value="Casting">Casting Call / Auditions</option>
                  <option value="RamLeela">Ramayan VIP Pass / Booking</option>
                  <option value="Productions">Theatre Productions Booking</option>
                  <option value="Ghazal">Mehfil-e-Ghazal Booking</option>
                  <option value="AnnualDay">Collaborations</option>
                  <option value="Workshop">Workshops & Training</option>
                  <option value="Collaboration">Collaboration Ideas</option>
                  <option value="NGO">NGO & Community Partnerships</option>
                </select>
                {errors.subject && <span className="text-curtain text-xs mt-1 block">{errors.subject.message}</span>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink/60 mb-2 font-semibold">Message</label>
                <textarea
                  rows={4}
                  {...register("message")}
                  className="w-full bg-canvas border border-gold/20 focus:border-gold outline-none p-3 rounded-sm transition-colors text-ink resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
                {errors.message && <span className="text-curtain text-xs mt-1 block">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-curtain text-canvas font-body uppercase tracking-widest text-sm p-4 rounded-sm hover:bg-gold hover:text-ink transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit & Connect on WhatsApp"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function Contact() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-screen bg-canvas flex items-center justify-center font-body text-ink/50">Loading...</div>}>
        <ContactContent />
      </Suspense>
      <Footer />
    </>
  );
}
