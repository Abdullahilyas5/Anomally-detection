import React from "react";

// Variants using YOUR theme colors
const VARIANT_STYLES = {
  // 🔵 Main CTA (use for "Request Demo")
  primary:
    "bg-primary text-white hover:bg-blue-900 shadow-sm",

  // 🔹 Secondary (less important actions)
  secondary:
    "bg-secondary text-white hover:bg-DarkBlue",

  // 🟠 Accent (highlight / special actions)
  accent:
    "bg-accent text-white hover:bg-orange-600",

  // ⚪ Outline (clean minimal)
  outline:
    "border border-primary text-primary hover:bg-softBlue",

  // 🧊 Ghost (navbar style)
  ghost:
    "text-primary hover:bg-cleanBlue",

  // 🟢 Success
  success:
    "bg-green-600 text-white hover:bg-green-700",

  // 🔴 Danger
  danger:
    "bg-red-600 text-white hover:bg-red-700",

  // 🧠 Premium gradient (very SaaS feel)
  gradient:
    "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90",

  // 🪶 Soft subtle button (cards / UI)
  soft:
    "bg-softaccent text-accent hover:bg-lightoragne",

  // 🧾 Dashboard style
  dashboard:
    "bg-DashboardBack text-primary border border-borderSlate hover:bg-softBlue",

  mild:
    "bg-gray-100 text-gray-700 hover:bg-gray-200",

  disco : 
    "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600",

  neutral_blue : 
    "bg-blue-600 text-white hover:bg-blue-500",

};

const Button = ({
  text,
  variant = "primary",
  className = "",
  boxClass = "",
  onClick,
  fullWidth = false,
  Icon , 
  Ficon
}) => {
  const variantClass = VARIANT_STYLES[variant];

  return (
    <div className={boxClass}>
      <button
        onClick={onClick}
        className={`
          ${variantClass}
          ${fullWidth ? "w-full" : "w-auto"}
          px-4 py-3 rounded-lg
          text-sm font-medium
          transition-all duration-200
          flex gap-2
          items-center justify-center
          ${className}
           my-2 
        `}
      >
        {Icon && <span className="ml-2">{Icon}</span>}
        {text}
        {Ficon && <span className="mr-2">{Ficon}</span>}
      </button>
    </div>
  );
};

export default Button;