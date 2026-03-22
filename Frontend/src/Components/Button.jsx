import React from "react";
 
/**
 * Button Component
 *
 * @param {"filled" | "outlined" | "text"} variant  - Visual style of the button
 * @param {"default" | "hover" | "pressed" | "disabled"} [state]  - Force a specific visual state (optional; normally handled by interaction)
 * @param {boolean} [disabled]   - Disables the button
 * @param {function} [onClick]   - Click handler
 * @param {React.ReactNode} children  - Button label
 * @param {string} [className]   - Extra Tailwind classes
 */
const Button = ({
  variant = "filled",
  disabled = false,
  onClick,
  children = "Button",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-display text-h2 leading-none select-none transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary_3 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer disabled:cursor-not-allowed";

  const variants = {
    filled: [
      "rounded-lg px-3 py-1 border-2", 
      "bg-secondary_1 text-background",                           // default
      "hover:bg-secondary_3",                                // hover
      "active:bg-secondary_2 active:scale-[0.97]",          // pressed
      "disabled:bg-neutral_3 disabled:text-background",     // disabled
    ].join(" "),
 
    outlined: [
      "rounded-lg px-3 py-1 border-2",
      "border-secondary_1 text-primary bg-transparent",        // default
      "hover:border-secondary_3 hover:text-primary",        // hover
      "active:border-secondary_2 active:text-primary active:scale-[0.97]", // pressed
      "disabled:border-neutral_3 disabled:text-neutral_3", // disabled
    ].join(" "),
 
    text: [
      "bg-transparent px-1 py-0.5 rounded border-transparent",
      "text-secondary_1",                                    // default
      "hover:text-secondary_3",                              // hover
      "active:text-secondary_2 active:scale-[0.97]",        // pressed
      "disabled:text-neutral_3",                           // disabled
    ].join(" "),
  };
 
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
 
export default Button;