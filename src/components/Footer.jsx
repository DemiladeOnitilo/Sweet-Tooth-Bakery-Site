import React from "react";
import logo from "../assets/Images/sweet-tooth-logo.jpeg";
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
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
        
        {/* BRAND & CONTACT (Spans 5 cols on large screens) */}
        <div className="flex flex-col space-y-6 lg:col-span-5">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <img
              src={logo}
              alt="Sweet Tooth"
              className="h-14 w-14 rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow"
            />
            <span className="heading-text text-3xl font-bold text-white tracking-tight">
              Sweet <span className="text-[#BE185D] italic">Tooth</span>
            </span>
          </Link>
          
          <p className="body-text text-base leading-relaxed text-gray-400 max-w-sm">
            We bake joy into every bite. From gourmet cakes to everyday artisanal treats, 
            our passion is creating unforgettable flavors for dessert lovers everywhere.
          </p>
          
          <div className="body-text space-y-3 pt-2">
            <a href="tel:+23412345678910" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
              <FaPhone className="text-[#BE185D]" /> +234 123 456 7891
            </a>
            <a href="mailto:hello@sweettooth.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
              <FaEnvelope className="text-[#BE185D]" /> hello@sweettooth.com
            </a>
          </div>
          
          {/* SOCIAL ICONS */}
          <div className="flex gap-5 text-xl pt-2">
            {[
              { img: <FaInstagram />, link: "https://www.instagram.com/" },
              { img: <FaFacebook />, link: "https://www.facebook.com/" },
              { img: <FaTwitter />, link: "https://www.twitter.com/" },
              { img: <FaYoutube />, link: "https://www.youtube.com/" },
              { img: <FaTiktok />, link: "https://www.tiktok.com/" },
            ].map((icon, index) => (
              <a
                key={index}
                href={icon.link}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#BE185D] transform hover:-translate-y-1 transition-all duration-300"
              >
                {icon.img}
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS (Spans 3 cols) */}
        <div className="lg:col-span-3 lg:pl-8">
          <h3 className="heading-text text-sm font-bold text-white tracking-widest uppercase mb-6">
            Quick Links
          </h3>
          {/* FIXED: Removed the duplicated links from the original array */}
          <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-4">
            {[
              { name: "Home", path: "" },
              { name: "Our Menu", path: "services" },
              { name: "About Us", path: "about" },
              { name: "Contact", path: "contact" },
              { name: "My Profile", path: "profile" },
              { name: "Shopping Cart", path: "Cart" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.path}`}
                  className="body-text text-gray-400 hover:text-[#BE185D] transition-colors relative group w-fit flex items-center"
                >
                  <span className="w-0 h-[1px] bg-[#BE185D] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NEWSLETTER (Spans 4 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <h3 className="heading-text text-sm font-bold text-white tracking-widest uppercase mb-2">
            Stay Connected
          </h3>
          <p className="body-text text-gray-400 text-sm mb-2">
            Subscribe to our newsletter for exclusive pastry drops, sweet discounts, and holiday specials.
          </p>
          
          {/* FIXED: Replaced absolute positioning with Flexbox for a flawless mobile layout */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex p-1 bg-gray-800 border border-gray-700 rounded-full focus-within:border-[#BE185D] transition-colors duration-300 mt-2"
          >
            <input
              type="email"
              placeholder="Email address..."
              className="body-text flex-1 px-4 py-2 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-sm"
              required
            />
            <button
              type="submit"
              className="body-text px-6 py-2.5 rounded-full bg-[#BE185D] text-white hover:bg-[#9D174D] font-medium transition-colors cursor-pointer text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="body-text text-sm text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} Sweet Tooth Bakery. All Rights Reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-500 body-text">
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;