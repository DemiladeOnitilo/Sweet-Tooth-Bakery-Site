import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import MainButton from "../MainButton";

const SignupSuccess = ({ userName, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4 }}
    className="text-center py-4"
  >
    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">
      <FaCheckCircle className="text-4xl text-green-500" />
    </div>

    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {userName}!</h2>
    <p className="text-gray-500 text-sm mb-6">
      Your account has been created successfully. Start exploring our treats!
    </p>

    <MainButton name="Start Shopping" variant="primary" direction="right" onClick={onClose} />
  </motion.div>
);

export default SignupSuccess;