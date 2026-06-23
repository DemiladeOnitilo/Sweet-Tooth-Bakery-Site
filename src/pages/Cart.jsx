import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

const GradientButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-500 cursor-pointer text-lg font-medium transform hover:scale-103 shadow-lg hover:shadow-2xl overflow-hidden flex items-center justify-center gap-3 ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
  </button>
);

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, total, amount, currency, delivery_fee } = useSelector(
    (state) => state.cart,
  );

  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
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
          <Link to="/services">
            <GradientButton>
              Start Shopping
              <FaArrowRight />
            </GradientButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-10 px-4 lg:px-16 mt-20 bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-white">
      <div className="flex flex-col gap-10 w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-xl text-gray-600">
              <span className="font-semibold text-pink-600">{amount}</span>{" "}
              {amount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="w-full lg:w-auto lg:min-w-[400px] bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Order Summary
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  {currency}
                  {(Number(total) || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-semibold text-gray-800">
                  {currency}
                  {(Number(delivery_fee) || 0).toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 my-2" />
              <div className="flex justify-between items-center text-2xl font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {currency}
                  {((Number(total) || 0) + (Number(delivery_fee) || 0)).toFixed(
                    2,
                  )}
                </span>
              </div>
              <GradientButton
                className="w-full mt-6"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
                <FaArrowRight />
              </GradientButton>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            const itemSize = item.selectedSize || "Standard Size";
            const uniqueItemKey = `${item.id}-${itemSize}`;

            return (
              <div
                className="group flex flex-col sm:flex-row items-start gap-6 w-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 overflow-hidden"
                key={uniqueItemKey}
              >
                {/* Image Container - Fixed height on multi-columns */}
                <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-2xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-15 flex-grow w-full">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-2 flex-grow">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {item.name}
                      </h2>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Variant tag */}
                        <span className="w-fit text-xs font-semibold px-3 py-1 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-600 border border-pink-200/40 rounded-full">
                          Option: {itemSize}
                        </span>

                        {/* Inscription / custom note — only shown if present */}
                        {item.customNotes && (
                          <span className="w-fit text-xs font-medium px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200/50 rounded-full">
                            ✏️ {item.customNotes}
                          </span>
                        )}
                      </div>

                      {/* <p className="text-base lg:text-lg text-gray-600 line-clamp-2">
                        {item.description}
                      </p> */}
                    </div>

                    <button
                      onClick={() => removeItem(item.id, itemSize, item.name)}
                      className="group/btn w-10 h-10 rounded-full bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FaTrash className="text-red-500 text-sm transition-transform duration-300 group-hover/btn:scale-110" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-gray-500">Price per option</p>
                      <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {currency}
                        {price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full p-2">
                      {quantity === 1 ? (
                        <button
                          onClick={() =>
                            removeItem(item.id, itemSize, item.name)
                          }
                          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-red-500 hover:text-red-600 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none"
                          aria-label="Remove item"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleQuantityDecrease(item.id, itemSize, quantity)
                          }
                          className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                      )}

                      <span className="text-xl font-bold text-gray-800 w-12 text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleQuantityIncrease(item.id, itemSize, quantity)
                        }
                        className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="text-sm" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-1 items-end">
                      <p className="text-sm text-gray-500">Item total</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {currency}
                        {(price * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Link onClick={refreshPage} to="/services">
            <button className="group text-lg text-gray-600 hover:text-pink-600 transition-colors duration-300 cursor-pointer flex items-center gap-2">
              <span>Continue Shopping</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
