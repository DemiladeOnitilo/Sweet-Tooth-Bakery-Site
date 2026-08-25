import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);

  function handleChange(event) {
    setEmail(event.target.value);
    if (isEmailValid !== null) setIsEmailValid(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let emailVal = /\S+@\S+\.\S+/.test(email);
    if (email.trim() === "" || !emailVal) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setEmail("");
    }
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 md:p-16 lg:p-20 text-center">
          <div className="body-text flex justify-center items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase mb-6">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            Stay Sweet
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
          </div>

          <h2 className="heading-text text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Join Our <span className="text-[#BE185D] italic">Newsletter</span>
          </h2>

          <p className="body-text text-base md:text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Sweet treats, exclusive offers, and artisanal recipes — delivered
            straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-3 w-full max-w-lg mx-auto"
          >
            <div
              className={`relative w-full flex items-center p-1 sm:p-1.5 rounded-full border bg-gray-50/50 transition-all duration-300 ${
                isEmailValid === false
                  ? "border-red-300 bg-white"
                  : "border-gray-200 focus-within:border-[#BE185D] focus-within:bg-white"
              }`}
            >
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={handleChange}
                className="flex-1 min-w-0 bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 body-text text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex-shrink-0 bg-[#BE185D] text-white px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full body-text text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-[#9D174D] shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>

            <div className="h-6 mt-1">
              {isEmailValid === false && (
                <p className="body-text flex items-center justify-center gap-2 text-red-500 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-center">
                  <FaExclamationCircle className="flex-shrink-0" /> Please enter
                  a valid email.
                </p>
              )}
              {isEmailValid === true && (
                <p className="body-text flex items-center justify-center gap-2 text-green-600 font-semibold text-[10px] sm:text-xs uppercase tracking-wider text-center">
                  <FaCircleCheck className="flex-shrink-0" /> Subscribed! Thanks
                  for joining us.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
