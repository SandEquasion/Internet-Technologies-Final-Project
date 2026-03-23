import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile_Icon_Link from "./Profile_Icon_Link";
import Logo from "./Logo";
import Profile_Sidebar from "./Profile_Sidebar";
import { logoutUser, getUserId } from "../Services/userService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // read username directly from localStorage
  const username = localStorage.getItem("username") || "Guest";

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "Your Bag", path: "/cart" },
  ];

  const handleLogout = async () => {
    try {
      const userId = getUserId();

      if (userId) {
        await logoutUser(userId);
      } else {
        // no userId stored - just clear localStorage and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
      }
    } catch (err) {
      // still clear localStorage even if backend call fails
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
    } finally {
      setSidebarOpen(false);
      navigate("/login");
    }
  };
  return (
    <>
      <div className="flex items-center justify-between w-full bg-background drop_shadow p-4">
        <Logo/>

        <div className="flex flex-row items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                font-display transition-all duration-150
                hover:text-secondary_3 active:scale-95 inline-block
                ${isActive(item.path)
                  ? "text-secondary_1 text-sm md:text-h2 font-display"
                  : "text-secondary_1 text-xs md:text-h3 font-display"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Profile_Icon_Link
          mode="button"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      <Profile_Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        username={username}
        onLogOut={handleLogout}
      />
    </>
  );
};

export default Header;