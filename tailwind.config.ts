import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "text-pop-up-top": {
          "0%": {
            transform: "translateY(0)",
            "transform-origin": "50% 50%",
            "text-shadow": "none",
          },
          to: {
            transform: "translateY(-50px)",
            "transform-origin": "50% 50%",
            "text-shadow":
              "0 1px 0 #000, 0 2px 0 #000, 0 3px 0 #000, 0 4px 0 #000, 0 5px 0 #000, 0 6px 0 #000, 0 7px 0 #000, 0 8px 0 #000, 0 9px 0 #000, 0 50px 30px rgba(0, 0, 0, .3)",
          },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "text-pop-up-top":
          "text-pop-up-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

export default config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
