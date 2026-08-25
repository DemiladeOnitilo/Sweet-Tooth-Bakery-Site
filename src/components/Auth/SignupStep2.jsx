import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { signupUser } from "../../store/authSlice";
import MainButton from "../MainButton";
import StepIndicator from "./StepIndicator";

const SignupStep2 = ({ data, onUpdate, onBack, onSubmit }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [localError, setLocalError] = useState(null);

  const displayedError = localError || error;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    dispatch(
      signupUser({
        name: data.name,
        email: data.email,
        password,
        phone: data.phone,
      }),
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        onUpdate({ password, address });
        onSubmit();
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 body-text text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#BE185D] mb-6 cursor-pointer transition-colors"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="text-center mb-6">
        <h2 className="heading-text text-3xl font-bold text-gray-900">
          Almost <span className="text-[#BE185D] italic">Done</span>
        </h2>
        <p className="body-text text-gray-500 text-xs mt-2 uppercase tracking-widest font-medium">
          Step 2 of 2 — Security & Location
        </p>
      </div>

      <StepIndicator current={1} total={2} />

      {displayedError && (
        <div className="bg-red-50 border border-red-100 text-red-600 body-text text-xs rounded-xl px-4 py-3 mb-6 font-medium text-center">
          {displayedError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#BE185D] cursor-pointer transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            required
            className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white"
          />
        </div>

        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            rows={2}
            className="w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white resize-none"
          />
          <p className="body-text text-[10px] uppercase tracking-wider text-gray-400 mt-1.5 font-medium">
            Optional — you can add this later
          </p>
        </div>

        <div className="mt-2">
          <MainButton
            name={loading ? "Creating..." : "Create Account"}
            variant="primary"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </motion.div>
  );
};

export default SignupStep2;
