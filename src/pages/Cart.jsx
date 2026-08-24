import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainButton from "../components/MainButton";
import { products } from "../components/products";
import Sliders from "../components/Sliders";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for global loading overlay
  const [isRemoving, setIsRemoving] = useState(false);

  // State to track which item is showing the delete confirmation popover
  const [confirmDeleteKey, setConfirmDeleteKey] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { cartItems, total, amount, currency, delivery_fee } = useSelector(
    (state) => state.cart,
  );

  const recommendedItems = useMemo(() => {
    const cartItemIds = cartItems?.map((item) => item.id) || [];
    return products
      .flatMap((cat) => cat.types)
      .filter((item) => !cartItemIds.includes(item.id)) // Optional: don't recommend what's already in the cart
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }, [cartItems]);

  // Opens the popover
  const promptDelete = (itemKey, productId, selectedSize, productName) => {
    setConfirmDeleteKey(itemKey);
    setItemToDelete({ id: productId, selectedSize, name: productName });
  };

  // Closes the popover without deleting
  const cancelDelete = () => {
    setConfirmDeleteKey(null);
    setItemToDelete(null);
  };

  // Executes the deletion with the delay
  const confirmAndRemove = () => {
    if (!itemToDelete) return;

    setConfirmDeleteKey(null); // Hide the popover
    setIsRemoving(true); // Show loader

    setTimeout(() => {
      dispatch(
        removeFromCart({
          id: itemToDelete.id,
          selectedSize: itemToDelete.selectedSize,
        }),
      );
      toast.info(
        `${itemToDelete.name} (${itemToDelete.selectedSize}) removed`,
        {
          position: "top-right",
          autoClose: 2000,
        },
      );
      setIsRemoving(false); // Hide loader
      setItemToDelete(null);
    }, 1000);
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

  const handleQuantityDecrease = (
    itemKey,
    productId,
    selectedSize,
    currentQuantity,
    productName,
  ) => {
    if (currentQuantity > 1) {
      dispatch(
        updateQuantity({
          productId,
          selectedSize,
          newQuantity: currentQuantity - 1,
        }),
      );
    } else {
      // If quantity is 1 and they click the trash/minus icon, trigger popover
      promptDelete(itemKey, productId, selectedSize, productName);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/pastry-placeholder.jpg";
  };

  if (!cartItems || amount < 1) {
    return (
      <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-pink-50 via-purple-50 to-white pt-32 pb-20">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-6 py-16">
          <div className="relative flex items-center justify-center mb-8">
            <div
              className="absolute inset-0 bg-pink-300 rounded-full animate-ping opacity-20"
              style={{ animationDuration: "3s" }}
            ></div>
            <div className="absolute w-40 h-40 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full blur-2xl opacity-80"></div>

            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center shadow-inner border-2 border-white z-10">
              <FaShoppingBag className="text-6xl text-pink-400 drop-shadow-md transform transition-transform hover:scale-110 duration-300" />
            </div>

            <span
              className="absolute -top-2 -right-4 text-2xl animate-bounce z-20"
              style={{ animationDelay: "0.2s", animationDuration: "2.5s" }}
            >
              ✨
            </span>
            <span
              className="absolute bottom-2 -left-6 text-2xl animate-bounce z-20"
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            >
              🧁
            </span>
          </div>

          <div className="flex flex-col gap-3 mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Your Cart is Empty
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added any delicious treats yet! Let's
              change that.
            </p>
          </div>

          {/* Action Button */}
          <div className="transform hover:-translate-y-1 transition-transform duration-300">
            <MainButton
              name="Start Shopping"
              link="/services"
              variant="primary"
            />
          </div>
        </div>

        {/* Recommended Items (Empty Cart) */}
        {recommendedItems.length > 0 && (
          <div className="flex flex-col items-center gap-5 w-full mt-24 px-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Products You Might Like
                </span>
              </h2>
            </div>
            <div className="w-full max-w-7xl mx-auto">
              <Sliders main={recommendedItems} />
            </div>
          </div>
        )}
      </div>
    );
  }

  const orderTotal = (Number(total) || 0) + (Number(delivery_fee) || 0);

  return (
    <>
      {/* Loading Overlay */}
      {isRemoving && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <FaSpinner className="animate-spin text-4xl text-pink-500" />
            <p className="text-gray-700 font-semibold animate-pulse">
              Removing item...
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-white pb-32 lg:pb-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="hidden lg:block py-6 border-b border-gray-100 mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              You have{" "}
              <span className="font-semibold text-pink-600">{amount}</span>{" "}
              {amount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden py-4 border-b border-gray-100 flex items-center justify-between sticky top-16 bg-white/80 backdrop-blur-md z-10 -mx-4 px-4">
            <h1 className="text-xl font-bold text-gray-800">Cart ({amount})</h1>
            <Link
              to="/services"
              className="text-xs font-semibold text-pink-600 flex items-center gap-1"
            >
              Continue Shopping <FaChevronRight className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
            {/* Cart Items */}
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
                    <div className="relative w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 overflow-hidden bg-gray-50 rounded-xl">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-base sm:text-xl font-bold text-gray-800 line-clamp-2 leading-snug">
                            {item.name}
                          </h2>

                          {/* Trash Button & Popover Container */}
                          <div className="relative flex items-center justify-center">
                            <button
                              onClick={() =>
                                promptDelete(
                                  uniqueItemKey,
                                  item.id,
                                  itemSize,
                                  item.name,
                                )
                              }
                              disabled={isRemoving}
                              className="text-gray-400 hover:text-black p-1 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                              aria-label={`Remove ${item.name}`}
                            >
                              <FaTrash className="text-sm" />
                            </button>

                            {/* Shein-style Confirmation Popover */}
                            {confirmDeleteKey === uniqueItemKey && (
                              <div className="absolute right-0 top-full mt-3 w-[250px] bg-white rounded shadow-[0_2px_15px_rgba(0,0,0,0.15)] z-50 p-4 border border-gray-200">
                                {/* Caret pointing up to trash can */}
                                <div className="absolute -top-1.5 right-1.5 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-200"></div>

                                {/* Close X */}
                                <button
                                  onClick={cancelDelete}
                                  className="absolute top-2 right-2 text-gray-500 hover:text-black font-semibold text-sm cursor-pointer"
                                >
                                  ✕
                                </button>

                                <p className="text-sm font-bold text-gray-900 text-center mt-3 mb-5">
                                  Do you want to delete this item?
                                </p>

                                <div className="flex justify-center gap-3">
                                  <button
                                    onClick={cancelDelete}
                                    className="flex-1 py-1.5 border border-black text-black font-bold text-xs hover:bg-gray-300 transition-colors cursor-pointer"
                                  >
                                    NO
                                  </button>
                                  <button
                                    onClick={confirmAndRemove}
                                    className="flex-1 py-1.5 border border-black text-black font-bold text-xs hover:bg-gray-300 transition-colors cursor-pointer"
                                  >
                                    YES
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

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

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                          <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            {currency}
                            {price.toLocaleString()}
                          </span>
                          <span className="hidden sm:inline text-xs text-gray-400 mt-1">
                            Item total:{" "}
                            <span className="font-semibold text-gray-600">
                              {currency}
                              {(price * quantity).toLocaleString()}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                          <button
                            onClick={() =>
                              handleQuantityDecrease(
                                uniqueItemKey,
                                item.id,
                                itemSize,
                                quantity,
                                item.name,
                              )
                            }
                            disabled={isRemoving}
                            className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500 cursor-pointer hover:scale-110 transition-transform duration-200 disabled:opacity-50"
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
                            onClick={() =>
                              handleQuantityIncrease(
                                item.id,
                                itemSize,
                                quantity,
                              )
                            }
                            disabled={isRemoving}
                            className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500 cursor-pointer hover:scale-110 transition-transform duration-200 disabled:opacity-50"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="hidden lg:flex justify-start mt-2">
                <Link
                  to="/services"
                  className="group text-sm font-medium text-gray-500 hover:text-pink-600 transition-colors duration-200 flex items-center gap-2"
                >
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
                      {currency}
                      {(Number(total) || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-gray-800">
                      {currency}
                      {(Number(delivery_fee) || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 my-2" />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-xl">
                      {currency}
                      {orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

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

        {/* Mobile Checkout */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">
              Total ({amount} items)
            </span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {currency}
              {orderTotal.toFixed(2)}
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
        <ToastContainer />
      </div>
      {recommendedItems.length > 0 && (
        <div className="flex flex-col items-center gap-5 w-full mt-20 mb-10 px-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium">
              ✨ Discover More
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                You Might Also Like
              </span>
            </h2>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <Sliders main={recommendedItems} onPage={true} autoPlay={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
