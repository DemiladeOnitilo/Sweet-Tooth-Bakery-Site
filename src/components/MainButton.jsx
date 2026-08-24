import React from "react";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const MainButton = ({
  link,
  name,
  variant = "primary",
  direction,
  onClick,
  type = "button",
}) => {
  const isPrimary = variant.toLowerCase() === "primary";

  const content = (
    <>
      <span className="relative z-10">{name}</span>
      {direction === "down" && (
        <FaArrowDown className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
      )}
      {direction === "right" && (
        <FaArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const baseClasses =
    "group inline-flex items-center justify-center gap-2.5 rounded-full body-text text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 px-8 py-3.5 cursor-pointer transform hover:-translate-y-0.5";

  const variantClasses = isPrimary
    ? "bg-[#BE185D] text-white hover:bg-[#9D174D] shadow-md hover:shadow-lg"
    : "bg-white text-gray-900 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-md";

  const className = `${baseClasses} ${variantClasses}`;

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