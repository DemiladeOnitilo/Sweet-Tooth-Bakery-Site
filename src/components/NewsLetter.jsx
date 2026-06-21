import React, { useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa';
import { FaRightFromBracket } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';

const NewsLetter = () => {

    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(null);

    function handleChange(event){
        setEmail(event.target.value)
        if (isEmailValid !== null) setIsEmailValid(null);
    }

    function handleSubmit(event){
        event.preventDefault();
        let emailVal = /\S+@\S+\.\S+/.test(email);
        if(email.trim() === "" || !emailVal){
            setIsEmailValid(false)
        } else {
            setIsEmailValid(true)
            setEmail("")
        }
    }

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="relative group w-full md:w-[70%] lg:w-[50%] bg-white rounded-3xl shadow-lg p-10 md:p-14 text-center transition-all duration-700 hover:scale-[1.01]">

          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium mb-6">
            📬 Stay Sweet
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            JOIN OUR{" "}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              NEWSLETTER
            </span>
          </h2>

          <p className="text-lg text-gray-700 mb-8">
            Sweet treats, special offers, and new recipes — straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-2">
            <div className="relative w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                className={`w-full h-14 pl-6 pr-16 rounded-full border-2 bg-white/70 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  isEmailValid === false
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-pink-200 focus:ring-pink-400'
                }`}
              />

              {isEmailValid === false && (
                <FaExclamationCircle className="w-5 h-5 absolute right-16 top-1/2 -translate-y-1/2 text-red-500" />
              )}
              {isEmailValid === true && (
                <FaCircleCheck className="w-5 h-5 absolute right-16 top-1/2 -translate-y-1/2 text-green-500" />
              )}

              <button
                type="submit"
                aria-label="Subscribe"
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FaRightFromBracket className="w-4 h-4 text-white" />
              </button>
            </div>

            {isEmailValid === false && (
              <p className="text-red-600 text-sm">Please enter a valid email address.</p>
            )}
            {isEmailValid === true && (
              <p className="text-green-600 text-sm">Subscribed! Thanks for joining us.</p>
            )}
          </form>

          <div className="absolute inset-0 rounded-3xl border border-pink-300/40 group-hover:border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.15)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] transition-all duration-700 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default NewsLetter