import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Images/sweet-tooth-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { products } from "./products";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  const { amount } = useSelector((state) => state.cart);
  const { currency } = useSelector((state) => state.cart);

  const allProducts = products.flatMap((category) =>
    category.types.map((product) => ({
      ...product,
      categoryName: category.name,
    }))
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.categoryName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (product.ingredients &&
              product.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(searchQuery.toLowerCase())
              ))
        )
        .slice(0, 6);

      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleSearchSelect = (productId) => {
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMobileSearchOpen(false);
    navigate(`/products/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchSelect(searchResults[0].id);
    }
  };

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
        scrolled ? "shadow-lg border-b border-gray-100 py-2" : "shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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

          <div className="flex items-center gap-6">
            <div
              className="hidden md:flex lg:hidden xl:flex items-center relative"
              ref={searchRef}
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search treats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pl-4 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-pink-600 transition-colors duration-300"
                >
                  <FaSearch />
                </button>
              </form>

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchSelect(product.id)}
                      className="flex items-center p-3 hover:bg-pink-50 cursor-pointer border-b last:border-b-0 transition-colors duration-200"
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {product.categoryName}
                        </p>
                        <p className="text-xs  font-semibold">
                          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            {currency}
                            {product.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex md:hidden lg:flex xl:hidden items-center relative">
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="text-gray-700 cursor-pointer hover:text-pink-600 p-2 rounded-full hover:bg-pink-50 transition-all duration-300"
              >
                <FaSearch />
              </button>
            </div>

            <button className="hidden md:flex relative p-2 rounded-full hover:bg-pink-50 transition-all duration-300 group cursor-pointer">
              <FaBell className="text-xl text-gray-700 group-hover:text-pink-600 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

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

            <div className="hidden lg:flex items-center justify-center">
              <Link
                onClick={refreshPage}
                to="/Services"
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
              >
                ORDER NOW
              </Link>
            </div>

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

        {isMobileSearchOpen && (
          <div
            className="md:hidden lg:block xl:hidden mt-4 pb-4"
            ref={mobileSearchRef}
          >
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search treats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-pink-600"
                >
                  <FaSearch />
                </button>
              </form>

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchSelect(product.id)}
                      className="flex items-center p-3 hover:bg-pink-50 cursor-pointer border-b last:border-b-0 transition-colors duration-200"
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {product.categoryName}
                        </p>
                        <p className="text-xs  font-semibold">
                          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            {currency}
                            {product.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
