import React from "react";
import logo from "../assets/Images/sweet-tooth-logo.png";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-14 px-8 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="space-y-5">
          <Link
            to="/"
            onClick={refreshPage}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Sweet Tooth"
              className="h-14 w-14 rounded-full ring-2 ring-pink-400"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-300 bg-clip-text text-transparent dancing-script">
              Sweet Tooth
            </span>
          </Link>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaPhone className="text-pink-500" /> +234 12345678910
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-pink-500" /> sweettooth@gmail.com
            </p>
          </div>
          <div className="flex gap-4 text-lg">
            {[
              { img: <FaInstagram />, link: "https://www.instagram.com/" },
              { img: <FaFacebook />, link: "https://www.facebook.com/" },
              { img: <FaTwitter />, link: "https://www.twitter.com/" },
              { img: <FaYoutube />, link: "https://www.youtube.com/" },
              { img: <FaTiktok />, link: "https://www.tiktok.com/" }
            ].map((icon, index) => (
              <a
                key={index}
                href={icon.link}
                className="hover:text-pink-400 transition-colors"
              >
                {icon.img}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4 relative ">
            QUICK LINKS
            <span className="absolute left-0 -bottom-1 w-10 h-[3px] bg-pink-500 "></span>
          </h2>
          <ul className="space-y-2 ">
            {["About", "Services", "Contact", "Join"].map(
              (item, i) => (
                <li key={i}>
                  <Link
                    to={`/${item}`}
                    onClick={refreshPage}
                    className="hover:text-pink-400 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-400 transition-all duration-300 group-hover:w-3/4"></span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4 relative">
            STAY CONNECTED
            <span className="absolute left-0 -bottom-1 w-10 h-[3px] bg-pink-500 "></span>
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex rounded-full overflow-hidden border border-gray-600 focus-within:ring-2 focus-within:ring-pink-400 transition-all"
          >
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-400 text-white hover:from-pink-600 hover:to-pink-500 font-medium transition-all cursor-pointer"
            >
              Join
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4 relative ">
            ABOUT US
            <span className="absolute left-0 -bottom-1 w-10 h-[3px] bg-pink-500"></span>
          </h2>
          <p className="text-md leading-relaxed text-gray-400">
            At Sweet Tooth, we bake joy into every bite. From gourmet cakes to
            everyday treats, our passion is creating unforgettable flavors for
            all dessert lovers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Sweet Tooth Bakery — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
