"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "RamLeela", path: "/ramleela" },
    { name: "Productions", path: "/productions" },
    { name: "Ghazal", path: "/ghazal-events" },
    { name: "Annual Day", path: "/annual-day" },
    { name: "Workshops", path: "/workshops" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          scrolled ? "bg-canvas text-ink shadow-sm" : "bg-transparent text-canvas"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="font-heading text-xl tracking-widest text-gold font-bold">
              RAGHUVANSH
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="font-body text-xs uppercase tracking-widest hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-curtain text-canvas px-6 py-2 rounded-sm font-body uppercase text-xs tracking-widest hover:bg-gold transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(true)} className="p-2">
                <Menu size={28} className={scrolled ? "text-ink" : "text-canvas"} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Curtain Drop Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-curtain text-canvas flex flex-col film-grain"
          >
            <div className="flex justify-between items-center p-6 h-20">
              <span className="font-heading text-xl tracking-widest text-gold font-bold">RAGHUVANSH</span>
              <button onClick={() => setIsOpen(false)} className="p-2">
                <X size={28} className="text-canvas" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center space-y-6 pb-20">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-3xl hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-12 border-t border-gold opacity-50 my-4"></div>
              <Link href="/gallery" onClick={() => setIsOpen(false)} className="font-heading text-xl hover:text-gold">Gallery</Link>
              <Link href="/media" onClick={() => setIsOpen(false)} className="font-heading text-xl hover:text-gold">Media</Link>
              <Link href="/collaborate" onClick={() => setIsOpen(false)} className="font-heading text-xl hover:text-gold">Collaborate</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="font-heading text-xl text-gold mt-4">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
