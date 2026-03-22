import { useState } from "react";

/**
 * InputField Component
 *
 * @param {string} [placeholder] - Placeholder text shown when empty
 * @param {string} [value]       - Controlled value
 * @param {function} [onChange]  - Callback when value changes
 * @param {string} [type]        - Input type e.g. "text", "email", "password"
 * @param {boolean} [disabled]   - Disables the input
 * @param {string} [className]   - Extra classes
 */
const Input_Field = ({
  placeholder = "Text...",
  value: controlledValue,
  onChange,
  type = "text",
  disabled = false,
  className = "",
  onBlur,
}) => {

  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const hasText = value.length > 0;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
  };

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {setIsFocused(false); if (onBlur) onBlur();}}
      className={`
        w-1/3 h-10 px-6 py-4 rounded-lg
        bg-background outline-none
        border-2 transition-all duration-150
        text-base font-b1 text-secondary_1
        disabled:opacity-50 disabled:cursor-not-allowed
        drop_shadow

        ${isFocused
          ? "border-secondary_1 !text-secondary_1 placeholder-transparent"
          : hasText
          ? "border-transparent !text-secondary_1"
          : "border-transparent text-secondary_2"
        }
        ${className}
      `}
    />
  );
};

export default Input_Field;