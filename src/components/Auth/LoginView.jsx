import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../store/authSlice";
import { closeAuthModal, setAuthMode } from "../../store/authModalSlice";
import MainButton from "../MainButton";

const LoginView = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(closeAuthModal());
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="text-center mb-8">
        <h2 className="heading-text text-3xl font-bold text-gray-900">
          Welcome <span className="text-[#BE185D] italic">Back</span>
        </h2>
        <p className="body-text text-gray-500 text-sm mt-2">
          Sign in to your Sweet Tooth account
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 body-text text-xs rounded-xl px-4 py-3 mb-6 font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white"
          />
        </div>

        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <MainButton
            name={loading ? "Signing In..." : "Sign In"}
            variant="primary"
            onClick={handleSubmit}
          />
        </div>
      </form>

      <div className="mt-8 text-center border-t border-gray-50 pt-6">
        <p className="body-text text-xs text-gray-500 uppercase tracking-widest font-medium">
          Don't have an account?{" "}
          <button
            onClick={() => dispatch(setAuthMode("signup"))}
            className="text-[#BE185D] font-bold hover:text-[#9D174D] cursor-pointer ml-1"
          >
            Create one
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginView;
