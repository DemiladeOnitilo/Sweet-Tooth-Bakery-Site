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
    if (!data.phone.trim()) errs.phone = "Phone is required";

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
        <h2 className="heading-text text-3xl font-bold text-gray-900">
          Create <span className="text-[#BE185D] italic">Account</span>
        </h2>
        <p className="body-text text-gray-500 text-xs mt-2 uppercase tracking-widest font-medium">
          Step 1 of 2 — Your details
        </p>
      </div>

      <StepIndicator current={0} total={2} />

      <div className="flex flex-col gap-5">
        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
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
            className={`w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 focus:bg-white ${
              errors.name
                ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                : "border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D]"
            }`}
          />
          {errors.name && (
            <p className="body-text text-red-500 text-[10px] mt-1.5 uppercase tracking-wider font-bold">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
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
            className={`w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 focus:bg-white ${
              errors.email
                ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                : "border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D]"
            }`}
          />
          {errors.email && (
            <p className="body-text text-red-500 text-[10px] mt-1.5 uppercase tracking-wider font-bold">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
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
            className={`w-full px-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 focus:bg-white ${
              errors.phone
                ? "border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                : "border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D]"
            }`}
          />
          {errors.phone && (
            <p className="body-text text-red-500 text-[10px] mt-1.5 uppercase tracking-wider font-bold">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="mt-2">
          <MainButton
            name="Continue"
            variant="primary"
            onClick={handleContinue}
          />
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-50 pt-6">
        <p className="body-text text-xs text-gray-500 uppercase tracking-widest font-medium">
          Already have an account?{" "}
          <button
            onClick={() => dispatch(setAuthMode("login"))}
            className="text-[#BE185D] font-bold hover:text-[#9D174D] cursor-pointer ml-1"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupStep1;
