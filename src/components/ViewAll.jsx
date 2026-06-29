import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ViewAll = ({ to }) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link
      to={to}
      onClick={refreshPage}
      className="group relative inline-flex items-center gap-2"
    >
      <span className="text-lg md:text-xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 ease-in-out">
        View All
      </span>
      <FaArrowRight className="text-gray-800 group-hover:text-pink-600 text-sm transition-all duration-500 group-hover:translate-x-1 ease-in-out" />

      <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
    </Link>
  );
};

export default ViewAll;