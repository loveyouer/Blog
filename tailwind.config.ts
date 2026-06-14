import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "#FDFBF9",
        "warm-white": "#FEF8F5",
        "deep-blue": "#1B3A5C",
        "soft-coral": "#E8957C",
        "muted-coral": "#F5C5B5",
        "sage-green": "#7BAE7F",
        "bright-green": "#5ED63A",
        "pale-yellow": "#FFF8C9",
        "lavender": "#C9B5F5",
        "text-primary": "#2D3748",
        "text-secondary": "#718096",
        "text-muted": "#A0AEC0",
        "border-light": "#E8DDD8",
        "card-bg": "#FFFFFF",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-up-delay": "slideUp 0.8s ease-out 0.2s forwards",
        "slide-up-delay-2": "slideUp 0.8s ease-out 0.4s forwards",
        "gentle-float": "gentleFloat 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      maxWidth: {
        "content": "780px",
        "wide": "960px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      letterSpacing: {
        "wide-2": "0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
