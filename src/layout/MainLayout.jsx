import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import logo from "../assets/Images/sweet-tooth-logo.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 900); 

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#FCFBF9] flex flex-col items-center justify-center z-[99999]"
          >
            <div className="relative flex items-center justify-center">
              
       
              <div className="absolute w-24 h-24 rounded-full border border-gray-200 border-t-[#BE185D] animate-spin" style={{ animationDuration: '1s' }} />
   
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-20 h-20 rounded-full bg-white p-1 shadow-sm flex items-center justify-center z-10"
              >
                <img
                  src={logo}
                  alt="Sweet Tooth Loading"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </div>

            <motion.p 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="body-text text-[10px] font-bold tracking-widest text-[#BE185D] uppercase mt-8"
            >
              Curating Your Experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navbar />
          <Outlet />
          <Footer />
        </motion.div>
      )}

      <AuthModal />
    </>
  );
};

export default MainLayout;