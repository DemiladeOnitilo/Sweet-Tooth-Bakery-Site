import React, { useState } from "react";
import logo from "../assets/Images/sweet-tooth-logo.png";
import { NavLink, Link } from "react-router-dom";
import MainButton from "./MainButton";
import DropDown from "./DropDown";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { amount } = useSelector((state) => state.cart);

  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const active = ({ isActive }) =>
    isActive
      ? " bg-pink-200 text-black rounded-md p-[8px]"
      : " hover:bg-pink-200 hover:text-black rounded-md p-[8px] ";

  return (
    <>
      <nav className="bg-white fixed right-0 left-0 top-0 h-20 md:h-40 lg:h-30 shadow-lg flex justify-between items-center z-999">
        <div className="text-3xl md:text-6xl lg:text-5xl m-3 md:m-10 lg:m-15 dancing-script">
          <Link onClick={refreshPage} to="/" className="flex">
            <img
              src={logo}
              alt="Sweet Tooth logo"
              className="h-8 md:h-15 lg:h-13 rounded-full"
            />
            Sweet Tooth
          </Link>
        </div>
        <div className="lg:flex gap-x-10 text-2xl hidden ">
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
        <div className="flex justify-center items-center gap-x-10 lg:mr-20">
          <Link
            onClick={refreshPage}
            to="/Cart"
            className="cursor-pointer relative"
          >
            <FaShoppingCart className="text-3xl " />
            {amount > 0 ? (
              <div className="absolute -top-2 -right-2 bg-pink-200 text-black w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold">
                {amount}
              </div>
            ) : (
              <div className="absolute -top-2 -right-2 bg-pink-200 text-black w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold">
                <span>0</span>
              </div>
            )}
          </Link>
          <div className="lg:flex gap-x-10 items-center hidden ">
            <MainButton name="ORDER NOW" link="/Services" />
          </div>
          <div
            className="lg:hidden mr-3 md:mr-7"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="text-3xl text-black" />
          </div>
        </div>
      </nav>

      <DropDown open={isOpen} setOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
