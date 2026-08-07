import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// BioCoder MD design tokens
// Palette shifted to a light academic/institutional look (white field, dark
// charcoal text, restrained emerald accent) to match a university programme
// reference site. Token names (bg.deep, ink.DEFAULT, etc.) are kept as-is so
// every component that already references them repaints automatically --
// only the hex values changed.
// ---------------------------------------------------------------------------
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: "#F8F9FA",    // primary page background -- light gray field (was pure white)
          panel: "#FFFFFF",   // cards/panels are now white, so they lift off the gray page
          light: "#F6F8FA",
          panelLight: "#FFFFFF",
        },
        slate: {
          DEFAULT: "#D7DBE1",
          line: "#E3E6EB",
        },
        signal: {
          DEFAULT: "#E0590C", // burnt-orange accent (was emerald), matches reference site
          dim: "#B0470A",
          bright: "#F0722A",
          soft: "rgba(224,89,12,0.10)",
        },
        ink: {
          DEFAULT: "#262B33",   // primary text -- slightly softer charcoal, closer to reference
          dim: "#4B5768",
          faint: "#8590A3",
          onLight: "#0E1524",
          onLightDim: "#5B6981",
        },
        alert: {
          amber: "#B7791F",
          rose: "#C23A4B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        panel: "10px",
        pill: "999px",
      },
      boxShadow: {
        // Subtle card shadow tuned for a white/light-gray field instead of
        // the previous dark-theme glow.
        panel: "0 1px 0 rgba(255,255,255,0.6) inset, 0 4px 16px rgba(15,23,42,0.08)",
      },
      keyframes: {
        trace: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        trace: "trace 3.2s linear infinite",
        blink: "blink 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
