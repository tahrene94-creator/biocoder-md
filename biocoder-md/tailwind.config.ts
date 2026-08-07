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
          deep: "#FFFFFF",    // primary page background (was near-navy, now white)
          panel: "#F5F6F8",   // raised surface / cards -- a hair off-white so they read as distinct from the page
          light: "#F6F8FA",
          panelLight: "#FFFFFF",
        },
        slate: {
          DEFAULT: "#D7DBE1",
          line: "#E3E6EB",    // borders/dividers -- light gray instead of dark navy-gray
        },
        signal: {
          DEFAULT: "#12B886", // emerald accent kept, still reads clearly on white
          dim: "#0B7C5C",
          bright: "#0E9A6C",  // darkened slightly from the dark-theme value for AA contrast on white
          soft: "rgba(18,184,134,0.10)",
        },
        ink: {
          DEFAULT: "#1A2233",   // primary text -- dark charcoal, not pure black (was near-white)
          dim: "#4B5768",       // secondary text
          faint: "#8590A3",     // tertiary/meta text
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
