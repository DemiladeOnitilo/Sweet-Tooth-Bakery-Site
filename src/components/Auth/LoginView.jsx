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
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-md mt-1">
          Sign in to your Sweet Tooth account
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <MainButton
          name={loading ? "Signing In..." : "Sign In"}
          variant="primary"
          direction={loading ? null : "right"}
          onClick={handleSubmit}
        />
      </form>

      <div className="mt-5 text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => dispatch(setAuthMode("signup"))}
            className="text-pink-500 font-semibold hover:text-pink-700 cursor-pointer"
          >
            Create one
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginView;
