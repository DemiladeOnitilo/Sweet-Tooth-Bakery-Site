import React, { useState, useEffect } from "react";
import logo from "../assets/Images/sweet-tooth-logo.png";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaBell } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { amount } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const active = ({ isActive }) => {
    return isActive
      ? "text-pink-600 font-bold bg-pink-50 px-4 py-2 rounded-full relative"
      : "text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-full transition-all duration-300 relative";
  };

  const mobileNavClass = ({ isActive }) => 
    `block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
      isActive
        ? "text-pink-600 bg-pink-50 font-bold"
        : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
    }`;

  return (
    <nav
      className={`bg-white/95 backdrop-blur-md fixed right-0 left-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg border-b border-gray-100 py-2"
          : "shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link
              onClick={refreshPage}
              to="/"
              className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Sweet Tooth logo"
                  className="h-10 w-10 rounded-full ring-2 ring-pink-200 group-hover:ring-pink-400 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent dancing-script">
                Sweet Tooth
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 bg-gray-50 rounded-full p-2 shadow-inner">
            <NavLink onClick={refreshPage} to="/About" className={active}>
              About
            </NavLink>
            <NavLink onClick={refreshPage} to="/Services" className={active}>
              Services
            </NavLink>
            <NavLink onClick={refreshPage} to="/Contact" className={active}>
              Contact
            </NavLink>
          </div>

          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search treats..."
                className="w-48 pl-4 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-3 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Notifications */}
            <button className="hidden md:flex relative p-2 rounded-full hover:bg-pink-50 transition-all duration-300 group cursor-pointer">
              <FaBell className="text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* Cart */}
            <Link
              onClick={refreshPage}
              to="/Cart"
              className="relative p-2 rounded-full hover:bg-pink-50 transition-all duration-300 group"
            >
              <FaShoppingCart className="text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
              {amount > 0 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                  {amount > 99 ? "99+" : amount}
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link
                onClick={refreshPage}
                to="/Services"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
              >
                ORDER NOW
              </Link>
            </div>

            {/* Mobile Menu Button - FIXED */}
            <button
              className="lg:hidden relative p-2 rounded-full hover:bg-pink-50 transition-all duration-300 group z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
              ) : (
                <FaBars className="text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
              )}
              <div className="absolute inset-0 rounded-full bg-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile  Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-64 opacity-100 border-t border-gray-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 bg-white/95 backdrop-blur-md">
          <NavLink
            onClick={() => {
              refreshPage();
              setIsOpen(false);
            }}
            to="/About"
            className={mobileNavClass}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => {
              refreshPage();
              setIsOpen(false);
            }}
            to="/Services"
            className={mobileNavClass}
          >
            Services
          </NavLink>
          <NavLink
            onClick={() => {
              refreshPage();
              setIsOpen(false);
            }}
            to="/Contact"
            className={mobileNavClass}
          >
            Contact
          </NavLink>
          <div className="pt-3">
            <Link
              onClick={() => {
                refreshPage();
                setIsOpen(false);
              }}
              to="/Services"
              className="block w-full text-center bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg"
            >
              ORDER NOW
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

