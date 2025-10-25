/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "375px",
        md: "375px",
        lg: "375px",
        xl: "375px",
        "2xl": "375px",
      },
    },
    extend: {
      colors: {
        "lead-grey": {
          500: "#404040",
        },
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px", letterSpacing: "-0.2px" }],
        sm: ["14px", { lineHeight: "20px", letterSpacing: "-0.3px" }],
        base: ["16px", { lineHeight: "22px", letterSpacing: "-0.4px" }],
        lg: ["18px", { lineHeight: "24px", letterSpacing: "-0.5px" }],
        xl: ["20px", { lineHeight: "28px", letterSpacing: "-0.6px" }],
        "2xl": ["24px", { lineHeight: "32px", letterSpacing: "-0.7px" }],
        "3xl": ["28px", { lineHeight: "36px", letterSpacing: "-0.8px" }],
        "4xl": ["32px", { lineHeight: "40px", letterSpacing: "-0.9px" }],
        "5xl": ["36px", { lineHeight: "44px", letterSpacing: "-1px" }],
        "6xl": ["40px", { lineHeight: "48px", letterSpacing: "-1.1px" }],
        "7xl": ["44px", { lineHeight: "52px", letterSpacing: "-1.2px" }],
        "8xl": ["48px", { lineHeight: "56px", letterSpacing: "-1.3px" }],
        "9xl": ["56px", { lineHeight: "64px", letterSpacing: "-1.4px" }],
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
