import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaStickyNote, FaSpinner, FaLock } from "react-icons/fa";

const API_URL = "http://localhost:5000/api";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total, delivery_fee, currency } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);

  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!cartItems || cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const subtotal = Number(total) || 0;
  const orderTotal = subtotal + Number(delivery_fee);

  const handlePay = async () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/checkout/initialize`,
        {
          items: cartItems,
          subtotal,
          delivery_fee: Number(delivery_fee),
          total: orderTotal,
          delivery_address: address,
          phone,
          notes,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Paystack payment page
      window.location.href = res.data.authorization_url;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to initialize payment");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-white mt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 mb-6 transition-colors cursor-pointer"
        >
          <FaArrowLeft /> Back to Cart
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left — Delivery form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" /> Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 08012345678"
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address"
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Order Notes (optional)
                  </label>
                  <div className="relative">
                    <FaStickyNote className="absolute left-4 top-4 text-gray-400 text-sm" />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions?"
                      rows={2}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Order summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.selectedSize} x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {currency}{(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{currency}{Number(delivery_fee).toLocaleString()}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 my-2" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {currency}{orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:opacity-95 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <FaLock /> Pay {currency}{orderTotal.toLocaleString()}
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Secured by Paystack. Your payment info is encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;