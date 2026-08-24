import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setAuthMode } from "../../store/authModalSlice";
import MainButton from "../MainButton";
import StepIndicator from "./StepIndicator";

const SignupStep1 = ({ data, onUpdate, onNext }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Invalid email";
    if (!data.phone.trim()) errs.phone = "Phone number is required";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-500 text-md mt-1">Step 1 of 2 � Your details</p>
      </div>

      <StepIndicator current={0} total={2} />

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => {
              onUpdate({ name: e.target.value });
              setErrors((prev) => ({ ...prev, name: null }));
            }}
            placeholder="Your name"
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 ${
              errors.name
                ? "border-red-300 ring-1 ring-red-200"
                : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => {
              onUpdate({ email: e.target.value });
              setErrors((prev) => ({ ...prev, email: null }));
            }}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 ${
              errors.email
                ? "border-red-300 ring-1 ring-red-200"
                : "border-gray-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => {
              onUpdate({ phone: e.target.value });
              setErrors((prev) => ({ ...prev, phone: null }));
            }}
            placeholder="e.g. 08012345678"
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 ${
              errors.phone
                ? "border-red-300 ring-1 ring-red-200"
                : "border-gray-200"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <MainButton
          name="Continue"
          variant="primary"
          direction="right"
          onClick={handleContinue}
        />
      </div>

      <div className="mt-5 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => dispatch(setAuthMode("login"))}
            className="text-pink-600 font-semibold hover:text-pink-700 cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupStep1;
