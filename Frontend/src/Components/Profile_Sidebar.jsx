import { Link } from "react-router-dom";
import Logo_Icon_Link from "./Logo_Icon_Link";
import Profile_Icon_Link from "./Profile_Icon_Link";
import Close_Icon from "./Close_Icon";

/**
 * Profile_Sidebar Component
 *
 * @param {boolean} isOpen        - Controls whether sidebar is visible
 * @param {function} onClose      - Callback to close the sidebar
 * @param {string} username       - Display name of the logged in user
 * @param {function} onLogOut     - Callback for log out action
 */
const Profile_Sidebar = ({ isOpen, onClose, username = "Username", onLogOut }) => {

  const navLinks = [
    { label: "Profile", path: "#" },
    { label: "Settings", path: "#" },
  ];

  return (
    <>
      {/* Dark overlay - only renders when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div className={`
        fixed top-0 right-0 h-full
        w-4/5 sm:w-72 md:w-64
        bg-background
        flex flex-col justify-between
        z-50 drop_shadow
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* ── Top: profile icon + username + close button ── */}
        <div className="flex flex-col">

          {/* Header row - icon on left, X on right */}
          <div className="flex flex-col p-6 border-b-2 border-secondary_1 gap-2">

            <div className="flex flex-row items-start justify-between">

              {/* Profile icon - not clickable here, just decorative */}
              <Profile_Icon_Link mode="button" onClick={onClose} size={48} />

              {/* Close button - X in top right */}
              <button
                onClick={onClose}
                aria-label="Close sidebar"
                className="
                  text-primary text-h3 font-bold leading-none
                  hover:text-secondary_1
                  active:scale-90
                  transition-all duration-150 inline-block
                  mt-1
                "
              >
                <Close_Icon/>
              </button>

            </div>

            {/* Username below icon */}
            <span className="font-display text-primary text-h4 font-bold">
              {username}
            </span>

          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3 p-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="
                  font-display text-h4 text-secondary_1 font-bold
                  hover:text-secondary_2
                  active:text-secondary_3 active:scale-95 inline-block
                  transition-all duration-150
                "
              >
                {link.label}
              </Link>
            ))}

            {/* Log Out */}
            <button
              onClick={() => {
                if (onLogOut) onLogOut();
                onClose();
              }}
              className="
                text-left font-display text-h4 text-secondary_1 font-bold
                hover:text-secondary_2
                active:text-secondary_3 active:scale-95 inline-block
                transition-all duration-150 w-fit
              "
            >
              Log Out
            </button>
          </div>

        </div>

        {/* ── Bottom: logo ── */}
        <div className="flex flex-col items-center gap-1 p-6">
          <Logo_Icon_Link clickable={false} />
        </div>

      </div>
    </>
  );
};

export default Profile_Sidebar;