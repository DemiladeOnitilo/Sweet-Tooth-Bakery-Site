import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/Images/sweet-tooth-logo.png"; // Imported logo asset
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    // Lock background scrolling while view-loader is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      // Restore natural document scroll context
      document.body.style.overflow = "unset";
    }, 900); // Bumped slightly to 900ms for visual animation sync

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [location.pathname]); // Safe lookup directly tracking path changes

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[99999]"
          >
            <div className="relative flex items-center justify-center">
              
              {/* Premium CSS Spinning Accent Blur Ring */}
              <div className="absolute w-28 h-28 rounded-full border-2 border-pink-100 border-t-pink-500 border-b-purple-500 animate-spin" style={{ animationDuration: '1.5s' }} />
              
              {/* Pulsing Outer Glow Aura Effect */}
              <motion.div 
                animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="absolute w-24 h-24 rounded-full bg-pink-200/50 blur-md"
              />

              {/* Seamless Scale-looping Brand Logo Identity Badge */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: [0.95, 1.03, 0.95], opacity: 1 }}
                transition={{
                  scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                  opacity: { duration: 0.3 }
                }}
                className="relative w-24 h-24 rounded-full bg-white p-1 shadow-inner flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="Sweet Tooth Loading Identifier Badge"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </div>

            {/* Subtitle Label Text Track */}
            <motion.p 
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-xs font-black tracking-widest text-gray-400 uppercase mt-6 ml-1.5"
            >
              Preparing Treats...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE FIX: Wrap structural elements so they don't fight background animation rendering */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Navbar />
          <Outlet />
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default MainLayout;