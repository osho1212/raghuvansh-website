import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-curtain text-canvas film-grain pt-16 pb-8 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/logo-gold.png"
              alt="Raghuvansh Group of Performing Arts"
              width={900}
              height={807}
              className="h-24 sm:h-28 w-auto mb-4"
            />
            <p className="font-body text-canvas/80 max-w-md">
              A professional group of performing arts based out in New Delhi, preserving the classical and pioneering the contemporary since 2000
            </p>
            <div className="space-y-6 font-body text-sm mt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-canvas/50 block text-xs uppercase tracking-wider">Email</span>
                  <a href="mailto:raghuvansh.art@gmail.com" className="text-base sm:text-lg hover:text-gold transition-colors font-semibold">
                    raghuvansh.art@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-canvas/50 block text-xs uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href="tel:+918585909213" className="text-base sm:text-lg hover:text-gold transition-colors font-semibold">
                    +91 85859 09213
                  </a>
                  ,{" "}
                  <a href="tel:+919953959498" className="text-base sm:text-lg hover:text-gold transition-colors font-semibold">
                    +91 99539 59498
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl text-gold mb-4">Explore</h3>
            <ul className="space-y-2 font-body text-sm text-canvas/80">
              <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
              <li><Link href="/ramayan" className="hover:text-gold transition-colors">Flagship</Link></li>
              <li><Link href="/productions" className="hover:text-gold transition-colors">Productions</Link></li>
              <li><Link href="/mehfil-e-ghazal" className="hover:text-gold transition-colors">Cultural</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-xl text-gold mb-4">Connect</h3>
            <ul className="space-y-2 font-body text-sm text-canvas/80">
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/collaborate" className="hover:text-gold transition-colors">Collaborate</Link></li>
              <li><Link href="/apply" className="hover:text-gold transition-colors">Work with Raghuvansh</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="https://youtube.com/@raghuvanshgpa?si=Hq6ZrKGME2DSsyyN" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center font-body text-xs text-canvas/60">
          <p>&copy; {new Date().getFullYear()} Raghuvansh Group of Performing Arts. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
