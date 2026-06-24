import React from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
          <FaExclamationTriangle className="text-6xl text-yellow-400" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-6xl lg:text-7xl  font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl lg:text-4xl  font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Page Not Found
          </h2>
        </div>

        <p className="text-xl lg:text-2xl text-gray-600">
          Looks like this page got eaten before we could serve it!
        </p>

        <Link  to="/" onClick={refreshPage}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-500 cursor-pointer text-lg font-medium transform hover:scale-103 shadow-lg hover:shadow-2xl overflow-hidden flex items-center gap-3">
            <FaHome className="relative z-10" />
            <span className="relative z-10">Go Back Home</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
