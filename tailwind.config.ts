import type { Config } from "tailwindcss";

// ---------------------------------------------------------------------------
// BioCoder MD design tokens
// Palette is grounded in the clinical monitor: deep slate/navy field, a single
// emerald "signal" accent (the one color that means "live/active/normal"
// on every hospital display), and crisp white for clinical clarity.
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
          deep: "#0A0F1A",   // primary dark-mode field (near-navy, not pure black)
          panel: "#111A2B",  // raised surface / cards on dark
          light: "#F6F8FA",  // primary light-mode field (crisp, cool white)
          panelLight: "#FFFFFF",
        },
        slate: {
          DEFAULT: "#1E293B",
          line: "#243247",
        },
        signal: {
          DEFAULT: "#12B886", // emerald "vitals" green
          dim: "#0B7C5C",
          bright: "#3FE1B0",
          soft: "rgba(18,184,134,0.14)",
        },
        ink: {
          DEFAULT: "#E7ECF3",
          dim: "#93A1B7",
          faint: "#5B6981",
          onLight: "#0E1524",
          onLightDim: "#5B6981",
        },
        alert: {
          amber: "#E0A93E",
          rose: "#E0616B",
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
        panel: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)",
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
