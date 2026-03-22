import { useState } from "react";

const Checkbox = ({ checked: controlledChecked, onChange, disabled = false, label = "" }) => {

  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = () => {
    if (disabled) return;
    if (onChange) {
      onChange(!isChecked);
    } else {
      setInternalChecked(!internalChecked);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-checked={isChecked}
      role="checkbox"
      className={`
        inline-flex items-center gap-2
        bg-transparent border-none
        focus:outline-none
        disabled:cursor-not-allowed disabled:opacity-50
      `}
    >
      <span className={`
        inline-flex items-center justify-center
        w-6 h-6 rounded-md border-2
        transition-all duration-150
        ${isChecked
          ? "border-pink-600 text-pink-600"
          : "border-pink-600 text-transparent"
        }
        hover:border-secondary_3 hover:text-secondary_3
        active:scale-90
      `}>

        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
            <path
            d="M1.5 6L4.5 9L10.5 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>

      </span>

      {label && (
        <span className="text-b2 text-secondary_1">{label}</span>
      )}

    </button>
  );
};

export default Checkbox;

