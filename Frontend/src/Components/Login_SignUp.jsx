import { useState } from "react";
import Button from "./Button";
 
/**
 * LoginSignUpModal Component
 *
 * A toggle pill that switches between "Log In" and "Sign Up" active states.
 *
 * @param {"login" | "signup"} [defaultActive="login"] - Which tab is active by default
 * @param {function} [onLoginClick]  - Callback when Log In is the active selection
 * @param {function} [onSignUpClick] - Callback when Sign Up is the active selection
 */
const LoginSignUpModal = ({
  defaultActive = "login",
  onLoginClick,
  onSignUpClick
}) => {
  const [active, setActive] = useState(defaultActive);
 
  const handleLogin = () => {
    setActive("login");
    if (onLoginClick) onLoginClick();
  };
 
  const handleSignUp = () => {
    setActive("signup");
    if (onSignUpClick) onSignUpClick();
  };
 
  
  return (
    <div className="inline-flex items-center justify-center bg-background rounded-full p-1 gap-2 shadow-inner px-3 py-2">
      <Button
        variant={active === "login" ? "filled" : "outlined"}
        onClick={handleLogin}
        className="!rounded-full px-4 py-1.5 text-sm md:text-base border-0-transparent"
      >
        Log In
      </Button>
 
      <Button
        variant={active === "signup" ? "filled" : "outlined"}
        onClick={handleSignUp}
        className="!rounded-full px-4 py-1.5 text-sm md:text-base border-0-transparent"
      >
        Sign Up
      </Button>
    </div>
  );
};
 
export default LoginSignUpModal;