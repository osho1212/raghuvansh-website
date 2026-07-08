import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-curtain text-canvas film-grain pt-16 pb-8 border-t border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-heading text-3xl text-gold mb-4 font-bold">RAGHUVANSH</h2>
            <p className="font-body text-canvas/80 max-w-md">
              A professional group of performing arts based out in new delhi, preserving the classical and pioneering the contemporary since 2000
            </p>
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
              <li><Link href="/apply" className="hover:text-gold transition-colors">Casting Auditions</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">YouTube</a></li>
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
