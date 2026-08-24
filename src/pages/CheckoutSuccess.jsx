import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import axios from "axios";
import { FaCheckCircle, FaSpinner, FaShoppingBag, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [status, setStatus] = useState("verifying"); // verifying, success, failed
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/checkout/verify-and-generate-discount`,
          { reference },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.verified) {
          setStatus("success");
          dispatch(clearCart());
          if (res.data.discount) {
            setDiscount(res.data.discount);
          }
        } else {
          setStatus("failed");
        }
      } catch {
        // Fallback: try the GET verify
        try {
          const res = await axios.get(`${API_URL}/checkout/verify`, {
            params: { reference },
          });
          if (res.data.verified) {
            setStatus("success");
            dispatch(clearCart());
          } else {
            setStatus("failed");
          }
        } catch {
          setStatus("failed");
        }
      }
    };

    verifyPayment();
  }, [reference, token, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-white px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 text-center">
          {status === "verifying" && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
                <FaSpinner className="text-4xl text-pink-500 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-6">Verifying Payment...</h2>
              <p className="text-gray-500 mt-2">Please wait while we confirm your payment</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <FaCheckCircle className="text-4xl text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-6">Payment Successful!</h2>
              <p className="text-gray-500 mt-2">Your order has been placed and is being prepared.</p>

              {discount && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200 rounded-xl p-4"
                >
                  <p className="text-sm font-semibold text-yellow-700">Reward Unlocked!</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">{discount.code}</p>
                  <p className="text-sm text-gray-600">{discount.value}% off your next order!</p>
                </motion.div>
              )}

              <div className="mt-8 space-y-3">
                <Link
                  to="/profile"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:opacity-95 transition-all duration-200"
                >
                  View My Orders
                </Link>
                <Link
                  to="/services"
                  className="block w-full bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-200"
                >
                  <FaShoppingBag className="inline mr-2" /> Continue Shopping
                </Link>
              </div>
            </>
          )}

          {status === "failed" && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <FaTimesCircle className="text-4xl text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mt-6">Payment Failed</h2>
              <p className="text-gray-500 mt-2">Something went wrong. Please try again.</p>
              <Link
                to="/checkout"
                className="mt-8 inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-xl transition-all duration-200"
              >
                Try Again
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;