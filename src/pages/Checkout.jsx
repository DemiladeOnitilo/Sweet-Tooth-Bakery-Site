import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaStickyNote, 
  FaSpinner, 
  FaLock,
  FaTag,
  FaTimes
} from "react-icons/fa";

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

  // --- DISCOUNT STATE ---
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  if (!cartItems || cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const subtotal = Number(total) || 0;

  // Calculate Discount
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === "percentage") {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else if (appliedDiscount.type === "fixed") {
      discountAmount = appliedDiscount.value;
    }
  }

  const orderTotal = subtotal - discountAmount + Number(delivery_fee);

  // --- DISCOUNT LOGIC ---
  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    setIsApplying(true);
    setDiscountError("");

    try {
      // Fake network delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // MOCK VALIDATION: Replace this with an actual axios.post to your backend!
      if (discountCode.toUpperCase() === "SWEET10") {
        setAppliedDiscount({ code: "SWEET10", type: "percentage", value: 10 });
        setDiscountCode("");
        toast.success("Promo code applied!", {
          className: "body-text text-xs font-bold uppercase tracking-widest",
        });
      } else {
        setDiscountError("Invalid or expired promo code.");
      }
    } catch (err) {
      setDiscountError("Failed to apply discount.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountError("");
    toast.info("Promo code removed", {
      className: "body-text text-xs font-bold uppercase tracking-widest",
    });
  };

  // --- PAYMENT LOGIC ---
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
          discount_amount: discountAmount,
          promo_code: appliedDiscount?.code || null,
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
    <div className="min-h-screen bg-[#FCFBF9] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Back button */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 body-text text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#BE185D] mb-8 cursor-pointer transition-colors"
        >
          <FaArrowLeft /> Back to Cart
        </button>

        <div className="mb-8">
          <h1 className="heading-text text-4xl font-bold text-gray-900">
            Secure <span className="text-[#BE185D] italic">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left — Delivery form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 md:p-10">
              <h2 className="heading-text text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                Delivery Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 08012345678"
                      required
                      className="w-full pl-12 pr-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-5 top-4 text-gray-400 text-sm" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full delivery address"
                      required
                      rows={3}
                      className="w-full pl-12 pr-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                    Order Notes <span className="text-gray-400 normal-case tracking-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FaStickyNote className="absolute left-5 top-4 text-gray-400 text-sm" />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions for the baker or driver?"
                      rows={2}
                      className="w-full pl-12 pr-5 py-3.5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Order summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 sticky top-28">
              <h2 className="heading-text text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 hide-scrollbar mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-4">
                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="heading-text text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="body-text text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">
                        {item.selectedSize.split(' | ')[0]} <span className="text-gray-300 mx-1">×</span> {item.quantity}
                      </p>
                    </div>
                    <p className="body-text text-sm font-bold text-gray-900">
                      {currency}{(Number(item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                {!appliedDiscount ? (
                  <form onSubmit={handleApplyDiscount} className="flex flex-col gap-2">
                    <label className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Gift Card or Discount Code
                    </label>
                    <div className={`relative flex items-center p-1 rounded-2xl border transition-all duration-300 ${discountError ? 'border-red-300 bg-white' : 'border-gray-200 bg-gray-50/50 focus-within:border-[#BE185D] focus-within:bg-white'}`}>
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(""); }}
                        placeholder="Enter code (Try SWEET10)"
                        className="flex-1 min-w-0 bg-transparent px-4 py-2.5 body-text text-sm text-gray-800 uppercase placeholder:normal-case focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!discountCode.trim() || isApplying}
                        className="bg-gray-900 text-white px-5 py-3 rounded-xl body-text text-[10px] font-bold uppercase tracking-widest hover:bg-[#BE185D] transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-[80px]"
                      >
                        {isApplying ? <FaSpinner className="animate-spin text-sm" /> : "Apply"}
                      </button>
                    </div>
                    {discountError && (
                      <p className="body-text text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">
                        {discountError}
                      </p>
                    )}
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-[#BE185D]/5 border border-[#BE185D]/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <FaTag className="text-[#BE185D] text-xs" />
                      </div>
                      <div>
                        <p className="heading-text text-sm font-bold text-gray-900 uppercase tracking-wider">{appliedDiscount.code}</p>
                        <p className="body-text text-[10px] text-[#BE185D] font-bold uppercase tracking-widest mt-0.5">Discount Applied</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleRemoveDiscount} 
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-red-500 transition-colors shadow-sm cursor-pointer"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 body-text text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{currency}{subtotal.toLocaleString()}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-[#BE185D]">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span className="font-bold">-{currency}{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">{currency}{Number(delivery_fee).toLocaleString()}</span>
                </div>
                
                <div className="h-px bg-gray-100 my-4" />
                
                <div className="flex justify-between items-center">
                  <span className="heading-text text-xl font-bold text-gray-900">Total</span>
                  <span className="heading-text text-2xl font-bold text-[#BE185D]">
                    {currency}{orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full mt-8 bg-[#BE185D] hover:bg-[#9D174D] text-white body-text text-xs font-bold py-4 rounded-full shadow-sm active:scale-95 transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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

              <p className="body-text text-[10px] text-gray-400 text-center mt-5 uppercase tracking-widest font-medium">
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