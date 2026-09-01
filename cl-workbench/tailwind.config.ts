import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          0: "rgb(var(--bg-0) / <alpha-value>)",
          1: "rgb(var(--bg-1) / <alpha-value>)",
          2: "rgb(var(--bg-2) / <alpha-value>)",
          3: "rgb(var(--bg-3) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        text: {
          0: "rgb(var(--text-0) / <alpha-value>)",
          1: "rgb(var(--text-1) / <alpha-value>)",
          2: "rgb(var(--text-2) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          dim: "rgb(var(--accent-dim) / <alpha-value>)",
        },
        purple: "rgb(var(--purple) / <alpha-value>)",
        string: "rgb(var(--string) / <alpha-value>)",
        green: "rgb(var(--green) / <alpha-value>)",
        amber: "rgb(var(--amber) / <alpha-value>)",
        red: "rgb(var(--red) / <alpha-value>)",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
