"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { Github, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full border-t border-border-light/50 py-12"
    >
      <div className="max-w-content mx-auto px-6 sm:px-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          {siteConfig.github && (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-soft-coral transition-colors duration-400"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {siteConfig.twitter && (
            <a
              href={siteConfig.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-soft-coral transition-colors duration-400"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
          )}
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-text-muted hover:text-soft-coral transition-colors duration-400"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          )}
        </div>
        <p className="text-xs text-text-muted tracking-wide">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.author}
        </p>
        <p className="text-xs text-text-muted/60 italic">
          安静记录，慢慢生活
        </p>
      </div>
    </motion.footer>
  );
}
