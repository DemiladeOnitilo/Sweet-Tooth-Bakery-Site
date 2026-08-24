import React from "react";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const MainButton = ({
  link,
  name,
  variant,
  direction,
  onClick,
  type = "button",
}) => {
  const content = (
    <>
      <span className="relative z-10">{name}</span>
      {direction === "down" && (
        <FaArrowDown className="w-3 h-3 md:w-5 md:h-5 text-white" />
      )}
      {direction === "right" && (
        <FaArrowRight
          className={`w-3 h-3 md:w-4 md:h-4 ${
            variant === "secondary" || variant === "primary"
              ? "text-white"
              : "text-black"
          } group-hover:translate-x-1 transition-transform duration-500`}
        />
      )}
    </>
  );

  const className = `group inline-flex items-center justify-center gap-3 rounded-xl font-medium body-text text-md md:text-lg text-[#ffffff] transition-all duration-500 hover:scale-102 transform shadow-lg hover:shadow-xl p-4 cursor-pointer ${
    variant === "primary"
      ? "bg-gradient-to-r from-pink-500 to-[#BE185D] hover:from-[#BE185D] hover:to-pink-700"
      : "bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
  }`;

  if (link) {
    return (
      <Link to={link} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default MainButton;
