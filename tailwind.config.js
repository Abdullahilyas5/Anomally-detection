/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#06B6D4",
        lightBlue : "#67E8F9",
        DarkBlue : "#0891B2",
        DashboardBack : "#F0FDFF",
        softBlue : "#CFFAFE",
        cleanBlue : "#E0F7FA", 
        accent: "#F97316",
        lightoragne : "#fdba74",
        softaccent : "#fed7aa",
        background: "#F3F4F6",
        card: "#FFFFFF",
        textMain: "#111827",
        textSecondary: "#6B7280",
        borderSlate : "#e2e8f0",  
        buttonBg: "#3B82F6",
        buttonHover: "#2563EB",
      },
        fontFamily: {
        // Modern / Bold Headings
        heading: ["Poppins", "Roboto", "Montserrat", "Oswald", "sans-serif"],
        display: ["Bebas Neue", "Anton", "Playfair Display", "sans-serif"],

        // Readable Body
        body: ["Inter", "Open Sans", "Lato", "Arial", "sans-serif"],
        bodyAlt: ["Nunito", "Rubik", "Quicksand", "sans-serif"],

        // Futuristic / Tech
        futuristic: ["Orbitron", "Exo 2", "Audiowide", "Segoe UI", "sans-serif"],

        // Script / Joining / Elegant
        script: ["Dancing Script", "Pacifico", "Allura", "cursive"],
        elegant: ["Great Vibes", "Satisfy", "Parisienne", "cursive"],
        handwritten: ["Caveat", "Shadows Into Light", "Patrick Hand", "cursive"],

        // Decorative / Special
        decorative: ["Lobster", "Fredericka the Great", "Kaushan Script", "cursive"],

        // Monospace / Coding
        mono: ["Fira Code", "Courier New", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}