import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-sm font-body uppercase tracking-widest text-sm transition-all duration-300";
  
  const variants = {
    primary: "bg-curtain text-canvas hover:bg-gold spotlight-glow",
    secondary: "bg-gold text-ink hover:bg-curtain hover:text-canvas spotlight-glow",
    outline: "border border-gold text-gold hover:bg-gold hover:text-ink",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export const CtaButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className="inline-flex items-center justify-center px-8 py-4 bg-curtain text-canvas hover:bg-gold font-heading text-xl transition-all duration-300 spotlight-glow group"
    >
      {children}
      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
};
