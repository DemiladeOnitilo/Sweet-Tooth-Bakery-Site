import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import MainButton from "../components/MainButton";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, total, amount, currency, delivery_fee } = useSelector(
    (state) => state.cart,
  );

  const removeItem = (productId, selectedSize, productName) => {
    dispatch(removeFromCart({ id: productId, selectedSize }));
    toast.info(`${productName} (${selectedSize}) removed from cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleQuantityIncrease = (productId, selectedSize, currentQuantity) => {
    dispatch(
      updateQuantity({
        productId,
        selectedSize,
        newQuantity: currentQuantity + 1,
      }),
    );
  };

  const handleQuantityDecrease = (productId, selectedSize, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(
        updateQuantity({
          productId,
          selectedSize,
          newQuantity: currentQuantity - 1,
        }),
      );
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/pastry-placeholder.jpg";
  };

  if (!cartItems || amount < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-white mt-20">
        <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
            <FaShoppingBag className="text-6xl text-gray-400" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            Your Cart Is Empty
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600">
            Looks like you haven't added any delicious treats yet!
          </p>
          <MainButton name="Start Shopping" link="/services" variant="primary"/>
        </div>
      </div>
    );
  }

  const orderTotal = (Number(total) || 0) + (Number(delivery_fee) || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-white pb-32 lg:pb-16 mt-24">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header - Desktop Only */}
        <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            You have <span className="font-semibold text-pink-600">{amount}</span> {amount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden py-4 border-b border-gray-100 flex items-center justify-between sticky top-16 bg-white/80 backdrop-blur-md z-10 -mx-4 px-4">
          <h1 className="text-xl font-bold text-gray-800">Cart ({amount})</h1>
          <Link to="/services" className="text-xs font-semibold text-pink-600 flex items-center gap-1">
            Continue Shopping <FaChevronRight className="text-[10px]" />
          </Link>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
          
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cartItems.map((item) => {
              const price = Number(item.price) || 0;
              const quantity = Number(item.quantity) || 1;
              const itemSize = item.selectedSize || "Standard Size";
              const uniqueItemKey = `${item.id}-${itemSize}`;

              return (
                <div
                  key={uniqueItemKey}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 relative group"
                >
                  {/* Item Thumbnail */}
                  <div className="relative w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 overflow-hidden bg-gray-50 rounded-xl">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Info Content */}
                  <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
                    <div className="flex flex-col gap-1.5">
                      {/* Title & Delete button */}
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-base sm:text-xl font-bold text-gray-800 line-clamp-2 leading-snug">
                          {item.name}
                        </h2>
                        <button
                          onClick={() => removeItem(item.id, itemSize, item.name)}
                          className="text-gray-300 hover:text-red-400 p-1 transition-colors duration-200 cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <FaTrash className="text-xs sm:text-sm" />
                        </button>
                      </div>

                      {/* Variant Details */}
                      <div className="flex flex-wrap gap-2 items-center mt-0.5">
                        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-0.5">
                          Size: {itemSize}
                        </span>
                        {item.customNotes && (
                          <span className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-100 rounded-full px-2.5 py-0.5 truncate max-w-[180px]">
                            ✏️ {item.customNotes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing & Control Box */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Price */}
                      <div className="flex flex-col">
                        <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                          {currency}
                          {price.toLocaleString()}
                        </span>
                        <span className="hidden sm:inline text-xs text-gray-400 mt-1">
                          Item total: <span className="font-semibold text-gray-600">{currency}{(price * quantity).toLocaleString()}</span>
                        </span>
                      </div>

                      {/* Rounded Colorful Quantity Selector */}
                      <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                        <button
                          onClick={() =>
                            quantity === 1
                              ? removeItem(item.id, itemSize, item.name)
                              : handleQuantityDecrease(item.id, itemSize, quantity)
                          }
                          className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                        >
                          {quantity === 1 ? (
                            <FaTrash className="text-[10px] text-red-400" />
                          ) : (
                            <FaMinus className="text-[10px]" />
                          )}
                        </button>
                        <span className="text-xs sm:text-sm font-bold text-gray-800 w-6 text-center select-none">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityIncrease(item.id, itemSize, quantity)}
                          className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                        >
                          <FaPlus className="text-[10px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Desktop Continue Shopping link */}
            <div className="hidden lg:flex justify-start mt-2">
              <Link to="/services" className="group text-sm font-medium text-gray-500 hover:text-pink-600 transition-colors duration-200 flex items-center gap-2">
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Order Summary
              </h2>
              
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    {currency}{(Number(total) || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-gray-800">
                    {currency}{(Number(delivery_fee) || 0).toFixed(2)}
                  </span>
                </div>
                
                <div className="h-px bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 my-2" />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-xl">
                    {currency}{orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden lg:block mt-6">
                <MainButton
                  name="Proceed to Checkout"
                  variant="primary"
                  onClick={() => navigate("/checkout")}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar with Colorful Rounded Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium">Total ({amount} items)</span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {currency}{orderTotal.toFixed(2)}
          </span>
        </div>
        <div className="w-1/2 max-w-[180px]">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold py-3 px-6 rounded-full shadow-md shadow-pink-500/20 hover:opacity-95 active:scale-95 transition-all duration-200 uppercase tracking-wider"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;