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
        heading: ["Roboto", "Helvetica", "sans-serif"],
        body: ["Open Sans", "Arial", "sans-serif"],
        futuristic: ["Inter", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
}