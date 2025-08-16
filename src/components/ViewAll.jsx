import React from "react";
import { Link } from "react-router-dom";

const ViewAll = ({ to }) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <Link to={to} onClick={refreshPage} className="group inline-block">
        <h1 className="text-lg md:text-xl font-bold transition-all duration-500 group-hover:scale-105 mb-2">
          <span className="text-black group-hover:bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text group-hover:text-transparent">
            View All
          </span>
        </h1>
      </Link>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
    </div>
  );
};

export default ViewAll;
