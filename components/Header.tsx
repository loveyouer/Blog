"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navLinks } from "@/lib/config";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border-light/50">
      <div className="max-w-wide mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-serif tracking-wide text-deep-blue hover:text-soft-coral transition-colors duration-600">
          {siteConfig.name}
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-soft-coral transition-colors duration-400 tracking-wide-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="sm:hidden text-text-secondary hover:text-soft-coral transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="sm:hidden bg-cream border-b border-border-light/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-soft-coral transition-colors duration-400 tracking-wide-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
