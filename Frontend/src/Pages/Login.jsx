import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo_Icon_Link from "../Components/Logo_Icon_Link";
import LoginSignUpModal from "../Components/Login_SignUp";
import Input_Field from "../Components/Input_Field";
import Button from "../Components/Button";
import { loginUser, createUser } from "../Services/userService";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (activeTab === "login") {
        await loginUser({ username, password });
      } else {
        await createUser({ username, email, password });
      }
      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // call this when the email field loses focus
  const handleEmailBlur = () => {
    if (email && !isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const allFieldsFilled = activeTab === "login"
    ? username.trim() !== "" && password.trim() !== ""
    : username.trim() !== "" && password.trim() !== "" && email.trim() !== "" && isValidEmail(email);

  return (
    // mobile: column layout, desktop: row layout
    <div className="flex flex-col lg:flex-row w-screen min-h-screen">

      {/* ── Left: Visual image ── */}
      <div className="w-full h-48 lg:w-2/3 lg:h-screen flex-shrink-0">
        <img
          src="https://i.postimg.cc/4y8bKcx9/Login-Visual.png"
          alt="Woman holding product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Right: Login form ── */}
      <div className="
        w-full lg:w-1/3
        lg:min-h-screen lg:h-screen
        bg-background
        flex flex-col items-center justify-center
        gap-6
        px-6 py-10 lg:px-12 lg:py-0
      ">

        {/* Logo */}
        <div className="flex flex-col items-center gap-1">
          <Logo_Icon_Link clickable={false}/>
        </div>

        {/* Login / Sign Up toggle */}
        <LoginSignUpModal
          defaultActive={activeTab}
          onLoginClick={() => handleTabSwitch("login")}
          onSignUpClick={() => handleTabSwitch("signup")}
        />

        {/* Form fields */}
        <div className="flex flex-col gap-5 w-full">

          {/* Email - signup only */}
          {activeTab === "signup" && (
            <div className="flex flex-col gap-1">
              <label className="font-display text-sm text-primary font-medium">
                Email:
              </label>
              <Input_Field
                placeholder="example@gmail.com"
                value={email}
                onChange={(val) => {
                  setEmail(val);
                  if (emailError) setEmailError("");
                }}
                type="email"
                className="!w-full placeholder-secondary_1 placeholder-opacity-75"
                onBlur = {handleEmailBlur}
              />
              {/* error message appears when invalid */}
              {emailError && (
                <p className="text-secondary_1 text-xs ml-1">{emailError}</p>
              )}
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="font-display text-sm text-primary font-medium">
              Username:
            </label>
            <Input_Field
              placeholder="Eg. James_Dunfy"
              value={username}
              onChange={setUsername}
              type="text"
              className="!w-full placeholder-secondary_1 placeholder-opacity-75"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-display text-sm text-primary font-medium">
              Password:
            </label>
            <Input_Field
              placeholder="Password"
              value={password}
              onChange={setPassword}
              type="password"
              className="!w-full placeholder-secondary_1 placeholder-opacity-75"
            />
            <button
              onClick={() => console.log("forgot password")}
              className="text-left text-xs text-secondary_1 hover:text-secondary_3 transition-colors duration-150 w-fit ml-2 mt-0.5"
            >
              Forgot Password
            </button>
          </div>

        </div>

        {/* Error message - add this above the submit button */}
        {error && (
          <p className="text-pink-600 text-sm font-display text-center w-full">
            {error}
          </p>
        )}

        {/* Submit button - update to show loading state */}
        <Button
          variant="filled"
          onClick={handleSubmit}
          disabled={!allFieldsFilled || loading}
          className="px-12 py-3 rounded-xl text-h4"
        >
          {loading
            ? "Please wait..."
            : activeTab === "login" ? "Login" : "Sign Up"
          }
        </Button>

        {/* Guest login */}
        <Button
          variant="text"
          onClick={()=>navigate("/")}
          className="px-12 py-3 border-none text-h4"
        >
          login as Guest
        </Button>
      </div>

    </div>
  );
};

export default Login;