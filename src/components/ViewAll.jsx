import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ViewAll = ({ to }) => {
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-2 pb-1 w-fit"
    >
      <span className="body-text text-sm lg:text-base font-bold text-gray-900 uppercase tracking-widest group-hover:text-[#BE185D] transition-colors duration-300 ease-in-out">
        View All
      </span>
      
      <FaArrowRight className="text-gray-900 group-hover:text-[#BE185D] text-xs transition-all duration-300 group-hover:translate-x-1 ease-in-out" />

      <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#BE185D] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </Link>
  );
};

export default ViewAll;