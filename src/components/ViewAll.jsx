import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForward, MdChevronRight } from "react-icons/md";

const ViewAll = ({ to }) => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center">
      <Link
        to={to}
        onClick={refreshPage}
        className={
          "group inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-gray-800 border-2 border-gray-300 rounded-full hover:border-pink-400 hover:text-pink-500 transition-all duration-300 hover:shadow-md hover:scale-105"
        }
      >
        <span>View All</span>

        <div className="flex items-center justify-center w-8 h-8 bg-pink-50 rounded-full group-hover:bg-pink-100 transition-colors duration-300">
          <MdArrowForward className="text-lg transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </Link>
    </div>
  );
};

export default ViewAll;
