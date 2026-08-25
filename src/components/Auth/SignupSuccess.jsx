import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import MainButton from "../MainButton";

const SignupSuccess = ({ userName, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="text-center py-6 px-2"
  >
    <div className="w-16 h-16 mx-auto rounded-full bg-[#BE185D]/10 flex items-center justify-center mb-6 shadow-inner">
      <FaCheck className="text-2xl text-[#BE185D]" />
    </div>

    <h2 className="heading-text text-3xl font-bold text-gray-900 mb-3">
      Welcome, <span className="text-[#BE185D] italic">{userName}</span>!
    </h2>
    <p className="body-text text-gray-500 text-sm mb-8 leading-relaxed max-w-[260px] mx-auto">
      Your account has been created successfully. You are now ready to explore
      our artisanal collections.
    </p>

    <MainButton name="Start Shopping" variant="primary" onClick={onClose} />
  </motion.div>
);

export default SignupSuccess;
