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
        mystic: {
          black: "#0a0a0f",
          dark: "#0f0f1a",
          purple: {
            DEFAULT: "#6b21a8",
            light: "#9333ea",
            deep: "#3b0764",
            glow: "#a855f7",
          },
          gold: {
            DEFAULT: "#d4af37",
            light: "#f0d060",
            dark: "#a07820",
          },
        },
      },
      fontFamily: {
        mystic: ["Cinzel Decorative", "Georgia", "serif"],
        body: ["Crimson Text", "Georgia", "serif"],
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "text-reveal": "textReveal 0.05s ease forwards",
        twinkle: "twinkle 3s ease-in-out infinite",
        "orbit-1": "orbit1 8s linear infinite",
        "orbit-2": "orbit2 12s linear infinite",
        "orbit-3": "orbit3 16s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseGold: {
          "0%, 100%": { textShadow: "0 0 10px #d4af37, 0 0 20px #d4af37" },
          "50%": { textShadow: "0 0 20px #f0d060, 0 0 40px #d4af37, 0 0 60px #a07820" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.7)" },
        },
        orbit1: {
          "0%": { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(80px) rotate(-360deg)" },
        },
        orbit2: {
          "0%": { transform: "rotate(120deg) translateX(120px) rotate(-120deg)" },
          "100%": { transform: "rotate(480deg) translateX(120px) rotate(-480deg)" },
        },
        orbit3: {
          "0%": { transform: "rotate(240deg) translateX(160px) rotate(-240deg)" },
          "100%": { transform: "rotate(600deg) translateX(160px) rotate(-600deg)" },
        },
      },
      backgroundImage: {
        "gradient-mystic":
          "radial-gradient(ellipse at top, #3b0764 0%, #0a0a0f 60%)",
        "gradient-gold":
          "linear-gradient(90deg, transparent, #d4af37, #f0d060, #d4af37, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
