import React from "react";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const MainButton = ({link, name, variant, direction, onClick}) => {

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault()
      onClick();
    } else {
      refreshPage();
    }
  };

  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link
      onClick={handleClick}
      to={link}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform ${
        variant === "secondary"
          ? "bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white hover:shadow-lg px-8 py-4 "
          : variant === "primary"
          ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl px-8 py-4 "
          : "bg-black/20 backdrop-blur-sm border border-black hover:bg-white/30 text-black hover:shadow-lg px-6 py-2 "
      } `}
    >
      <span className="relative z-10">{name}</span>

      {direction === "down" ? (
        <FaArrowDown className="w-5 h-5 text-white " />
      ) : (
        <FaArrowRight
          className={`w-5 h-5 ${
            variant === "secondary" || variant === "primary"
              ? "text-white"
              : "text-black"
          } group-hover:translate-x-1 transition-transform duration-300`}
        />
      )}
    </Link>
  );
};

export default MainButton;
