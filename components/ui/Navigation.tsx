"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const SpotlightLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Spotlight layer */}
      {hovered && (
        <span
          className="absolute pointer-events-none rounded-full animate-fadeIn"
          style={{
            width: "120px",
            height: "120px",
            left: coords.x - 60,
            top: coords.y - 60,
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0) 70%)",
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Opaque background when scrolled
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock background scroll while the mobile menu overlay is open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  // Determine if the current page starts with a dark background at the top
  const isDarkPage = 
    pathname === "/" || 
    pathname === "/about" || 
    pathname === "/ramayan" || 
    pathname === "/productions" || 
    pathname === "/mehfil-e-ghazal" || 
    pathname === "/collaborations" || 
    pathname === "/workshops";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Flagship", path: "/ramayan" },
    { name: "Productions", path: "/productions" },
    { name: "Cultural", path: "/mehfil-e-ghazal" },
    { name: "Collaborations", path: "/collaborations" },
    { name: "Workshops", path: "/workshops" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-300 transform ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled 
            ? "bg-canvas text-ink shadow-sm" 
            : (isDarkPage ? "bg-transparent text-canvas" : "bg-transparent text-ink")
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              href="/" 
              className={`font-heading text-xl tracking-widest font-bold transition-colors duration-300 ${
                scrolled 
                  ? "text-curtain" 
                  : (isDarkPage ? "text-gold" : "text-curtain")
              }`}
            >
              RAGHUVANSH
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex space-x-3 items-center">
              {navLinks.map((link) => (
                <SpotlightLink
                  key={link.name}
                  href={link.path}
                  className="font-body text-xs uppercase tracking-widest hover:text-gold px-3 py-2 rounded-sm"
                >
                  {link.name}
                </SpotlightLink>
              ))}
              <SpotlightLink
                href="/contact"
                className="bg-curtain text-canvas px-6 py-2 rounded-sm font-body uppercase text-xs tracking-widest hover:bg-curtain/90"
              >
                Contact
              </SpotlightLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(true)} className="p-2">
                <Menu 
                  size={28} 
                  className={
                    scrolled 
                      ? "text-ink" 
                      : (isDarkPage ? "text-canvas" : "text-ink")
                  } 
                />
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
            className="fixed inset-0 z-[200] h-[100dvh] w-screen bg-curtain text-canvas overflow-hidden"
          >
            <div className="film-grain flex flex-col h-full w-full">
              <div className="flex justify-between items-center p-4 sm:p-6 h-16 sm:h-20 shrink-0">
                <span className="font-heading text-lg sm:text-xl tracking-widest text-gold font-bold">RAGHUVANSH</span>
                <button onClick={() => setIsOpen(false)} className="p-2" aria-label="Close menu">
                  <X size={26} className="text-canvas" />
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-start gap-3 sm:gap-5 px-6 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-2xl sm:text-3xl hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="w-12 border-t border-gold opacity-50 my-2 sm:my-3"></div>
                <Link href="/gallery" onClick={() => setIsOpen(false)} className="font-heading text-lg sm:text-xl hover:text-gold">Gallery</Link>
                <Link href="/media" onClick={() => setIsOpen(false)} className="font-heading text-lg sm:text-xl hover:text-gold">Media</Link>
                <Link href="/collaborate" onClick={() => setIsOpen(false)} className="font-heading text-lg sm:text-xl hover:text-gold">Collaborate</Link>
                <Link href="/apply" onClick={() => setIsOpen(false)} className="font-heading text-lg sm:text-xl hover:text-gold">Casting Calls</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="font-heading text-lg sm:text-xl text-gold mt-2">Contact</Link>
                <div className="h-4 shrink-0" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
