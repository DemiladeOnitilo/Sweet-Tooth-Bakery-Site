import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import bgmain from "../assets/Images/sweet-tooth-bg.png";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white flex items-center justify-center z-111150"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-pink-600 text-3xl font-bold"
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </>
  );
};

export default MainLayout;
