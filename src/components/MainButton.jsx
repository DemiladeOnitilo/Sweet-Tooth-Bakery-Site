import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const MainButton = (props) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link
      onClick={refreshPage}
      to={props.link}
      className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 transform ${
        props.variant === "secondary"
          ? "bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white hover:shadow-lg"
          : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
      } `}
    >
      <span className="relative z-10">{props.name}</span>

      {/* Arrow Icon */}
      <FaArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
    </Link>
  );
};

export default MainButton;
