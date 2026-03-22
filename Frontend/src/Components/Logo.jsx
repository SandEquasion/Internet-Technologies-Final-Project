import { Link } from "react-router-dom";

const Logo = ({ to = "/" }) => {
  return (
    <Link
      to={to}
      className="
        text-secondary_1 font-Display font-h1
        hover:text-secondary_3
        active:text-secondary_2 active:scale-90
        transition-all duration-150
        inline-block
      "
    >
      VERA
    </Link>
  );
};

export default Logo;