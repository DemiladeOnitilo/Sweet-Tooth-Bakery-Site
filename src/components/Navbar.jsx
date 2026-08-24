import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Images/sweet-tooth-logo.jpeg";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { openAuthModal } from "../store/authModalSlice";
import { products } from "./products";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { amount, currency } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);

  const allProducts = products.flatMap((category) =>
    category.types.map((product) => ({
      ...product,
      categoryName: category.name,
    })),
  );

  useEffect(() => {
    setIsOpen(false);
    setShowSearchResults(false);
    setIsProfileOpen(false);
    setSearchQuery("");
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
                ingredient.toLowerCase().includes(searchQuery.toLowerCase()),
              )),
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
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSelect = (productId) => {
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMobileSearchOpen(false);
    setIsOpen(false);
    navigate(`/products/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchSelect(searchResults[0].id);
    }
  };

  const active = ({ isActive }) =>
    `relative px-4 py-2 font-semibold transition-colors duration-500 ease-in-out 
     after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-0 after:h-[2px] after:bg-[#BE185D] after:transition-transform after:duration-500 after:origin-center ${
       isActive
         ? "text-[#BE185D] after:scale-x-100"
         : `${
             scrolled || isOpen ? "text-gray-700" : "text-white"
           } hover:text-[#BE185D] after:scale-x-0 hover:after:scale-x-100`
     }`;

  const mobileNavClass = ({ isActive }) =>
    `flex items-center w-full px-5 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ease-out ${
      isActive
        ? "text-[#BE185D] bg-pink-50 shadow-sm"
        : "text-gray-700 hover:text-[#BE185D] hover:bg-gray-50 hover:translate-x-1"
    }`;

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full fixed right-0 left-0 top-0 z-[9999] transition-all duration-500 ${
          scrolled || isOpen ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <div className="flex items-center z-50">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 md:space-x-3 group transition-transform duration-300 hover:scale-105 rounded-full"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={logo}
                    alt="Sweet Tooth Bakery Logo"
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full ring-2 ring-pink-200 object-cover"
                  />
                </div>
                <span className="hidden sm:block text-2xl md:text-3xl text-[#BE185D] heading-text font-bold italic tracking-tight transition-colors duration-300">
                  Sweet Tooth
                </span>
              </Link>
            </div>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden lg:flex items-center gap-2">
              <NavLink to="/about" className={active}>
                About
              </NavLink>
              <NavLink to="/services" className={active}>
                Services
              </NavLink>
              <NavLink to="/contact" className={active}>
                Contact
              </NavLink>
            </div>

            {/* ACTION BUTTONS & ICONS */}
            <div className="flex items-center gap-2 md:gap-4 z-50">
              {/* XL Desktop Search */}
              <div
                className="hidden xl:flex items-center relative"
                ref={searchRef}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search treats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 pl-4 pr-10 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    <FaSearch />
                  </button>
                </form>

                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-70 max-h-80 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchSelect(product.id)}
                        className="flex items-center p-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200"
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* LG Search Toggle */}
              <div
                className="hidden lg:flex xl:hidden items-center relative"
                ref={mobileSearchRef}
              >
                <button
                  onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                  className={`p-2 rounded-full transition-all duration-300 group cursor-pointer ${
                    scrolled || isOpen
                      ? "hover:bg-pink-50"
                      : "hover:bg-white/20"
                  }`}
                  aria-label="Toggle search"
                >
                  <FaSearch
                    className={`text-lg transition-colors duration-300 ${
                      isMobileSearchOpen || scrolled || isOpen
                        ? "text-gray-700 group-hover:text-pink-600"
                        : "text-white group-hover:text-pink-200"
                    }`}
                  />
                </button>

                {isMobileSearchOpen && (
                  <div className="absolute top-full right-0 mt-3 w-[280px] z-50 overflow-hidden bg-white border border-gray-100 rounded-xl shadow-xl">
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                      <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                          type="text"
                          placeholder="Search treats..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                          className="w-full pl-4 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all shadow-sm"
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-600"
                        >
                          <FaSearch />
                        </button>
                      </form>
                    </div>

                    {showSearchResults && searchResults.length > 0 && (
                      <div className="max-h-72 overflow-y-auto">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              handleSearchSelect(product.id);
                              setIsMobileSearchOpen(false);
                            }}
                            className="flex items-center p-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-full mr-3 shadow-sm"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 text-sm">
                                {product.name}
                              </h4>
                              <p className="text-xs font-semibold text-pink-600 mt-0.5">
                                {currency}
                                {product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* NOTIFICATION BELL (with transparent navbar sync) */}
              <div className="flex items-center justify-center">
                <NotificationBell scrolled={scrolled} isOpen={isOpen} />
              </div>

              {/* CART ICON */}
              <Link
                to="/Cart"
                onClick={() => setIsOpen(false)}
                className={`relative p-2 rounded-full transition-all duration-500 group cursor-pointer ${
                  scrolled || isOpen ? "hover:bg-pink-50" : "hover:bg-white/20"
                }`}
              >
                <FaShoppingCart
                  className={`text-xl transition-colors duration-300 ${
                    scrolled || isOpen
                      ? "text-gray-700 group-hover:text-pink-600"
                      : "text-white group-hover:text-pink-200"
                  }`}
                />
                {amount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow px-1">
                    {amount > 99 ? "99+" : amount}
                  </span>
                )}
              </Link>

              {/* ORDER NOW (LG and above) */}
              <Link
                to="/services"
                className="hidden lg:flex bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-500 hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                ORDER NOW
              </Link>

              {/* PROFILE / AUTH (MD and above - Works on Click & Hover) */}
              <div className="hidden md:flex items-center" ref={profileRef}>
                {token ? (
                  <div className="relative group">
                    <button
                      onClick={() => setIsProfileOpen((prev) => !prev)}
                      className={`flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        scrolled || isOpen
                          ? "hover:bg-pink-50"
                          : "hover:bg-white/20"
                      }`}
                      aria-label="User Profile"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    </button>

                    {/* Works on click (isProfileOpen) AND on hover (group-hover) */}
                    <div
                      className={`absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl transition-all duration-200 z-50 overflow-hidden ${
                        isProfileOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      }`}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      >
                        <FaUser className="text-xs" /> My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          dispatch(logout());
                          navigate("/");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <FaSignOutAlt className="text-xs" /> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch(openAuthModal("login"))}
                    className={`font-medium text-sm px-4 py-2 rounded-full border transition-all ${
                      scrolled || isOpen
                        ? "border-gray-300 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                        : "border-white/50 text-white hover:bg-white/20"
                    }`}
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* HAMBURGER TOGGLE (Below LG) */}
              <button
                className="lg:hidden relative p-2 rounded-full transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="text-2xl text-gray-800" />
                ) : (
                  <FaBars
                    className={`text-2xl transition-colors ${
                      scrolled ? "text-gray-800" : "text-white"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER (Below LG) */}
      <div
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[9997] lg:hidden transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[9998] lg:hidden flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto flex flex-col pt-24 px-6 pb-6 hide-scrollbar">
          {/* Mobile Search */}
          <div className="relative w-full mb-6">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full group"
            >
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors text-lg" />
              <input
                type="text"
                placeholder="Search treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-base bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all shadow-inner"
              />
            </form>

            {/* The Dropdown Results for the Drawer */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-72 overflow-y-auto z-50 flex flex-col">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      handleSearchSelect(product.id);
                      setIsMobileSearchOpen(false);
                      setIsOpen(false); // Closes the drawer after clicking a treat
                    }}
                    className="flex items-center p-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-full mr-3 shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-pink-600 mt-0.5">
                        {currency}
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <NavLink to="/" className={mobileNavClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={mobileNavClass}>
              About
            </NavLink>
            <NavLink to="/services" className={mobileNavClass}>
              Services
            </NavLink>
            <NavLink to="/contact" className={mobileNavClass}>
              Contact
            </NavLink>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          {token ? (
            <div className="flex flex-col gap-3 md:hidden">
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-gray-200 text-gray-800 text-base font-semibold rounded-xl hover:bg-gray-50 shadow-sm transition-all"
              >
                <FaUser className="text-pink-500" />
                {user?.name || "My Profile"}
              </NavLink>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-red-500 text-base font-semibold rounded-xl hover:bg-red-50 transition-all"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:hidden">
              <button
                onClick={() => {
                  dispatch(openAuthModal("login"));
                  setIsOpen(false);
                }}
                className="py-3.5 text-gray-700 font-semibold text-sm bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  dispatch(openAuthModal("signup"));
                  setIsOpen(false);
                }}
                className="py-3.5 bg-gray-900 text-white font-semibold text-sm rounded-xl shadow-md hover:bg-gray-800 transition-all"
              >
                Register
              </button>
            </div>
          )}

          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-pink-500/30 transition-all active:scale-95"
          >
            ORDER NOW
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
