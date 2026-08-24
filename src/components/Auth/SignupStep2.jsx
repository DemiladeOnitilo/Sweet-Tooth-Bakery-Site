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
      setLocalError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
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
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-pink-600 mb-4 cursor-pointer"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Almost Done
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Step 2 of 2 � Security & location
        </p>
      </div>

      <StepIndicator current={1} total={2} />

      {displayedError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          {displayedError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            Optional � you can add this later
          </p>
        </div>

        <MainButton
          name={loading ? "Creating account..." : "Create Account"}
          variant="primary"
          direction={loading ? null : "right"}
          onClick={handleSubmit}
        />
      </form>
    </motion.div>
  );
};

export default SignupStep2;
