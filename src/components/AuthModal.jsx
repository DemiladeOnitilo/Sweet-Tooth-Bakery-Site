import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { clearError } from "../store/authSlice";
import { closeAuthModal } from "../store/authModalSlice";
import LoginView from "./Auth/LoginView";
import SignupStep1 from "./Auth/SignupStep1";
import SignupStep2 from "./Auth/SignupStep2";
import SignupSuccess from "./Auth/SignupSuccess";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isOpen, mode } = useSelector((s) => s.authModal);
  const { user } = useSelector((s) => s.auth);

  const [signupStep, setSignupStep] = useState(1);
  const [signupData, setSignupData] = useState({ name: "", email: "", phone: "" });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSignupStep(1);
      setSignupData({ name: "", email: "", phone: "" });
    }
  }, [isOpen]);

  // Close when user logs in via modal
  useEffect(() => {
    if (user && isOpen) dispatch(closeAuthModal());
  }, [user, isOpen, dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeAuthModal());
    dispatch(clearError());
  }, [dispatch]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  const renderContent = () => {
    if (mode === "login") {
      return <LoginView />;
    }

    if (signupStep === 1) {
      return (
        <SignupStep1
          data={signupData}
          onUpdate={(patch) => setSignupData((prev) => ({ ...prev, ...patch }))}
          onNext={() => setSignupStep(2)}
        />
      );
    }

    if (signupStep === 2) {
      return (
        <SignupStep2
          data={signupData}
          onUpdate={(patch) => setSignupData((prev) => ({ ...prev, ...patch }))}
          onBack={() => setSignupStep(1)}
          onSubmit={() => setSignupStep(3)}
        />
      );
    }

    return <SignupSuccess userName={signupData.name} onClose={handleClose} />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99999]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md p-7 pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end -mt-1 -mr-1 mb-2">
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;