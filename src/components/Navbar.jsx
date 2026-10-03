import { useState, useEffect, useRef } from "react";
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

  const isHeroPage = ["/", "/about", "/services", "/contact"].includes(
    location.pathname,
  );

  const isSolid = scrolled || isOpen || !isHeroPage;

  const allProducts = products.flatMap((category) =>
    (category.types || []).map((product) => ({
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
    `relative px-4 py-2 font-bold body-text text-sm uppercase tracking-widest transition-colors duration-300 ease-in-out 
     after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-0 after:h-[2px] after:bg-[#BE185D] after:transition-transform after:duration-500 after:origin-left ${
       isActive
         ? "text-[#BE185D] after:scale-x-100"
         : `${
             isSolid ? "text-gray-900" : "text-white"
           } hover:text-[#BE185D] after:scale-x-0 hover:after:scale-x-100`
     }`;

  const mobileNavClass = ({ isActive }) =>
    `flex items-center w-full px-5 py-4 text-base heading-text font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 ease-out ${
      isActive
        ? "text-[#BE185D] bg-[#BE185D]/5 shadow-sm"
        : "text-gray-700 hover:text-[#BE185D] hover:bg-gray-50 hover:translate-x-1"
    }`;

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full fixed right-0 left-0 top-0 z-[9999] transition-all duration-500 ${
          isSolid
            ? "bg-white shadow-sm border-b border-gray-100 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-10">
          <div className="flex justify-between items-center h-16 px-2 md:px-0">
            <div className="flex items-center z-50">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 group transition-transform duration-300 hover:-translate-y-0.5 rounded-full"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={logo}
                    alt="Sweet Tooth Bakery Logo"
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-sm object-cover"
                  />
                </div>
                <span
                  className={`block text-2xl md:text-3xl heading-text font-bold italic tracking-tight transition-colors duration-300 ${isSolid ? "text-gray-900" : "text-white group-hover:text-[#BE185D]"}`}
                >
                  Sweet <span className="text-[#BE185D]">Tooth</span>
                </span>
              </Link>
            </div>

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

            <div className="flex items-center gap-2 md:gap-4 z-50">
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
                    className="w-48 pl-4 pr-10 py-2.5 body-text text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#BE185D] focus:border-[#BE185D] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#BE185D] transition-colors cursor-pointer"
                  >
                    <FaSearch />
                  </button>
                </form>

                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl min-w-70 max-h-80 overflow-y-auto z-50">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchSelect(product.id)}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors duration-200"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-full mr-3 border border-gray-100"
                        />
                        <div className="flex-1">
                          <h4 className="heading-text font-bold text-gray-900 text-sm">
                            {product.name}
                          </h4>
                          <p className="body-text text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                            {product.categoryName}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="hidden lg:flex xl:hidden items-center relative"
                ref={mobileSearchRef}
              >
                <button
                  onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                  className={`p-2 rounded-full transition-all duration-300 group cursor-pointer ${
                    isSolid ? "hover:bg-[#BE185D]/5" : "hover:bg-white/20"
                  }`}
                  aria-label="Toggle search"
                >
                  <FaSearch
                    className={`text-lg transition-colors duration-300 ${
                      isMobileSearchOpen || isSolid
                        ? "text-gray-900 group-hover:text-[#BE185D]"
                        : "text-white group-hover:text-pink-100"
                    }`}
                  />
                </button>

                {isMobileSearchOpen && (
                  <div className="absolute top-full right-0 mt-4 w-[280px] z-50 overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-xl">
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                      <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                          type="text"
                          placeholder="Search treats..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                          className="w-full pl-4 pr-10 py-2.5 body-text text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#BE185D] focus:border-[#BE185D] transition-all shadow-sm"
                        />
                        <button
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#BE185D] cursor-pointer"
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
                            className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
                          >
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-full mr-3 shadow-sm"
                            />
                            <div className="flex-1">
                              <h4 className="heading-text font-bold text-gray-900 text-sm">
                                {product.name}
                              </h4>
                              <p className="body-text text-[10px] font-bold text-[#BE185D] mt-0.5">
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

              <div className="flex items-center justify-center">
                <NotificationBell scrolled={isSolid} isOpen={isOpen} />
              </div>

              <Link
                to="/Cart"
                onClick={() => setIsOpen(false)}
                className={`relative p-2 rounded-full transition-all duration-300 group cursor-pointer ${
                  isSolid ? "hover:bg-[#BE185D]/5" : "hover:bg-white/20"
                }`}
              >
                <FaShoppingCart
                  className={`text-xl transition-colors duration-300 ${
                    isSolid
                      ? "text-gray-900 group-hover:text-[#BE185D]"
                      : "text-white group-hover:text-pink-100"
                  }`}
                />
                {amount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#BE185D] text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm px-1">
                    {amount > 99 ? "99+" : amount}
                  </span>
                )}
              </Link>

              <Link
                to="/services"
                className="hidden lg:flex items-center justify-center gap-2 rounded-full body-text text-xs font-bold tracking-widest uppercase transition-all duration-300 px-6 py-2.5 cursor-pointer transform hover:-translate-y-0.5 bg-[#BE185D] text-white hover:bg-[#9D174D] shadow-sm hover:shadow-md"
              >
                Order Now
              </Link>

              <div className="hidden md:flex items-center" ref={profileRef}>
                {token ? (
                  <div className="relative group">
                    <button
                      onClick={() => setIsProfileOpen((prev) => !prev)}
                      className={`flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isSolid ? "hover:bg-[#BE185D]/5" : "hover:bg-white/20"
                      }`}
                      aria-label="User Profile"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#BE185D] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    </button>

                    <div
                      className={`absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 z-50 overflow-hidden ${
                        isProfileOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      }`}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-5 py-3.5 body-text text-sm font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 hover:text-[#BE185D] transition-colors"
                      >
                        <FaUser className="text-[#BE185D]" /> My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          dispatch(logout());
                          navigate("/");
                        }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 body-text text-sm font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => dispatch(openAuthModal("login"))}
                    className={`body-text font-bold uppercase tracking-widest text-xs rounded-full border transition-all duration-300 px-8 py-2.5 cursor-pointer transform hover:-translate-y-0.5 ${
                      isSolid
                        ? "border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50"
                        : "border-white/50 text-white hover:bg-white/20"
                    }`}
                  >
                    Sign In
                  </button>
                )}
              </div>

              <button
                className="lg:hidden relative p-2 rounded-full transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="text-2xl text-gray-900" />
                ) : (
                  <FaBars
                    className={`text-2xl transition-colors ${
                      isSolid ? "text-gray-900" : "text-white"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9997] lg:hidden transition-opacity duration-500 ${
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
          <div className="relative w-full mb-8">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full group"
            >
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#BE185D] transition-colors text-base" />
              <input
                type="text"
                placeholder="Search treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 body-text text-sm bg-gray-50 border border-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BE185D] focus:border-[#BE185D] transition-all shadow-sm"
              />
            </form>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-72 overflow-y-auto z-50 flex flex-col">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      handleSearchSelect(product.id);
                      setIsMobileSearchOpen(false);
                      setIsOpen(false);
                    }}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-full mr-3 shadow-sm border border-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="heading-text font-bold text-gray-900 text-sm">
                        {product.name}
                      </h4>
                      <p className="body-text text-xs font-bold text-[#BE185D] mt-0.5">
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

        <div className="p-6 border-t border-gray-100 bg-[#FCFBF9] space-y-4">
          {token ? (
            <div className="flex flex-col gap-3 md:hidden">
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-gray-200 text-gray-900 body-text text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 shadow-sm transition-all"
              >
                <FaUser className="text-[#BE185D]" />
                {user?.name || "My Profile"}
              </NavLink>
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-3 w-full py-4 text-red-500 body-text text-sm font-bold uppercase tracking-widest rounded-full hover:bg-red-50 transition-all cursor-pointer"
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
                className="py-3.5 text-gray-900 body-text font-bold uppercase tracking-widest text-xs bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  dispatch(openAuthModal("signup"));
                  setIsOpen(false);
                }}
                className="py-3.5 bg-gray-900 text-white body-text font-bold uppercase tracking-widest text-xs rounded-full shadow-md hover:bg-gray-800 transition-all"
              >
                Register
              </button>
            </div>
          )}

          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full bg-[#BE185D] hover:bg-[#9D174D] text-white py-4 rounded-full body-text text-sm font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.98]"
          >
            Order Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
