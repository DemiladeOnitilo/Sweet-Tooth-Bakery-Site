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
import CakeCard from "../components/CakeCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRemoving, setIsRemoving] = useState(false);
  const [confirmDeleteKey, setConfirmDeleteKey] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { cartItems, total, amount, currency, delivery_fee } = useSelector(
    (state) => state.cart,
  );

  const recommendedItems = useMemo(() => {
    const cartItemIds = cartItems?.map((item) => item.id) || [];
    return products
      .flatMap((cat) => cat.types)
      .filter((item) => !cartItemIds.includes(item.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
  }, [cartItems]);

  const promptDelete = (itemKey, productId, selectedSize, productName) => {
    setConfirmDeleteKey(itemKey);
    setItemToDelete({ id: productId, selectedSize, name: productName });
  };

  const cancelDelete = () => {
    setConfirmDeleteKey(null);
    setItemToDelete(null);
  };

  const confirmAndRemove = () => {
    if (!itemToDelete) return;

    setConfirmDeleteKey(null);
    setIsRemoving(true);

    setTimeout(() => {
      dispatch(
        removeFromCart({
          id: itemToDelete.id,
          selectedSize: itemToDelete.selectedSize,
        }),
      );
      toast.info(`${itemToDelete.name} removed from cart.`, {
        position: "top-right",
        autoClose: 2000,
        className: "text-sm body-text font-bold uppercase tracking-wider",
      });
      setIsRemoving(false);
      setItemToDelete(null);
    }, 800);
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
      promptDelete(itemKey, productId, selectedSize, productName);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/pastry-placeholder.jpg";
  };

  if (!cartItems || amount < 1) {
    return (
      <div className="flex flex-col items-center min-h-screen w-full pt-32 pb-20">
        <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto px-6 py-16 bg-white rounded-[2rem] border border-gray-100 shadow-sm mt-10">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
            <FaShoppingBag className="text-4xl text-gray-300" />
          </div>

          <div className="flex flex-col gap-3 mb-10">
            <h1 className="heading-text text-3xl lg:text-4xl font-bold text-gray-900">
              Your Cart is <span className="text-[#BE185D] italic">Empty</span>
            </h1>
            <p className="body-text text-base text-gray-500 leading-relaxed max-w-sm mx-auto">
              Looks like you haven't added any artisanal treats yet. Discover
              our latest collections.
            </p>
          </div>

          <MainButton name="Browse Menu" link="/services" variant="primary" />
        </div>

       {recommendedItems.length > 0 && (
            <div className="flex flex-col items-center gap-8 w-full border-t border-gray-200 pt-16">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                  Discover More
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                </div>
                <h2 className="heading-text text-3xl md:text-4xl font-bold text-gray-900">
                  You Might Also <span className="text-[#BE185D] italic">Like</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                {recommendedItems.map((item) => (
                  <CakeCard key={item.id} {...item} onPage={true} />
                ))}
              </div>
            </div>
          )}
          
      </div>
    );
  }

  const orderTotal = (Number(total) || 0) + (Number(delivery_fee) || 0);

  return (
    <>
      {isRemoving && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 bg-white px-8 py-6 rounded-2xl shadow-xl border border-gray-100">
            <FaSpinner className="animate-spin text-3xl text-[#BE185D]" />
            <p className="body-text text-xs font-bold uppercase tracking-widest text-gray-900">
              Updating Cart...
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen pb-32 lg:pb-20 pt-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="hidden lg:flex items-end justify-between py-8 border-b border-gray-200 mb-8">
            <div>
              <h1 className="heading-text text-4xl font-bold text-gray-900">
                Shopping <span className="text-[#BE185D] italic">Cart</span>
              </h1>
              <p className="body-text text-sm font-bold uppercase tracking-widest text-gray-500 mt-2">
                {amount} {amount === 1 ? "Item" : "Items"}
              </p>
            </div>
            <Link
              to="/services"
              className="body-text text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#BE185D] transition-colors flex items-center gap-2 mb-1"
            >
              Continue Shopping <FaChevronRight className="text-[10px]" />
            </Link>
          </div>

          <div className="lg:hidden py-5 border-b border-gray-200 flex items-center justify-between bg-[#FCFBF9] mb-6">
            <h1 className="heading-text text-2xl font-bold text-gray-900">
              Cart ({amount})
            </h1>
            <Link
              to="/services"
              className="body-text text-[10px] font-bold uppercase tracking-widest text-[#BE185D] flex items-center gap-1"
            >
              Browse <FaChevronRight className="text-[8px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 flex flex-col gap-4">
              {cartItems.map((item) => {
                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;
                const itemSize = item.selectedSize || "Standard";
                const uniqueItemKey = `${item.id}-${itemSize}`;

                return (
                  <div
                    key={uniqueItemKey}
                    className="flex gap-4 p-4 md:p-5 bg-white rounded-3xl shadow-sm border border-gray-100 relative group"
                  >
                    <div className="relative w-24 h-32 md:w-32 md:h-36 flex-shrink-0 overflow-hidden bg-gray-50 rounded-2xl border border-gray-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="heading-text text-lg md:text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                            {item.name}
                          </h2>

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
                              className="text-gray-300 hover:text-red-500 p-1 transition-colors duration-200 cursor-pointer disabled:opacity-50"
                              aria-label={`Remove ${item.name}`}
                            >
                              <FaTrash className="text-sm" />
                            </button>

                            {confirmDeleteKey === uniqueItemKey && (
                              <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl z-50 p-5 border border-gray-100">
                                <div className="absolute -top-1.5 right-2 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-100" />
                                <p className="body-text text-xs font-bold uppercase tracking-wider text-gray-900 text-center mb-4">
                                  Remove this item?
                                </p>
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={cancelDelete}
                                    className="flex-1 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-full body-text text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 cursor-pointer"
                                  >
                                    Keep
                                  </button>
                                  <button
                                    onClick={confirmAndRemove}
                                    className="flex-1 py-2 bg-red-500 text-white rounded-full body-text text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 cursor-pointer shadow-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                            {itemSize.split(" | ")[0]}
                          </span>
                          {item.customNotes && (
                            <span className="body-text text-[10px] font-bold uppercase tracking-widest text-[#BE185D] bg-[#BE185D]/5 border border-[#BE185D]/20 rounded-full px-3 py-1 truncate max-w-[180px]">
                              Customized
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        <div className="flex flex-col">
                          <span className="heading-text text-xl md:text-2xl font-bold text-[#BE185D]">
                            {currency}
                            {price.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-2 py-1">
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
                            className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#BE185D] cursor-pointer focus:outline-none"
                          >
                            {quantity === 1 ? (
                              <FaTrash className="text-[10px] text-gray-400 hover:text-red-500" />
                            ) : (
                              <FaMinus className="text-[10px]" />
                            )}
                          </button>
                          <span className="heading-text text-sm font-bold text-gray-900 w-4 text-center select-none">
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
                            className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#BE185D] cursor-pointer focus:outline-none"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h2 className="heading-text text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-4 body-text text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">
                      {currency}
                      {(Number(total) || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-gray-900">
                      {currency}
                      {(Number(delivery_fee) || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="h-px bg-gray-100 my-2" />

                  <div className="flex justify-between items-center text-lg">
                    <span className="heading-text font-bold text-gray-900">
                      Total
                    </span>
                    <span className="heading-text text-2xl font-bold text-[#BE185D]">
                      {currency}
                      {orderTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block mt-8">
                  <MainButton
                    name="Proceed to Checkout"
                    variant="primary"
                    onClick={() => navigate("/checkout")}
                  />
                  <p className="body-text text-[10px] text-center text-gray-400 uppercase tracking-widest mt-4">
                    Taxes calculated at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>

        {recommendedItems.length > 0 && (
            <div className="flex flex-col items-center gap-8 w-full border-t border-gray-200 pt-16">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                  Discover More
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                </div>
                <h2 className="heading-text text-3xl md:text-4xl font-bold text-gray-900">
                  You Might Also <span className="text-[#BE185D] italic">Like</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                {recommendedItems.map((item) => (
                  <CakeCard key={item.id} {...item} onPage={true} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-5 flex items-center justify-between z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col">
          <span className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Total
          </span>
          <span className="heading-text text-2xl font-bold text-[#BE185D]">
            {currency}
            {orderTotal.toLocaleString()}
          </span>
        </div>
        <div className="w-1/2 max-w-[180px]">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-[#BE185D] hover:bg-[#9D174D] text-white body-text text-xs font-bold py-3.5 px-6 rounded-full shadow-sm active:scale-95 transition-all duration-200 uppercase tracking-widest"
          >
            Checkout
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Cart;
