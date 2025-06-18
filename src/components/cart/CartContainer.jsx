import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MainButton from "../MainButton";
import { removeFromCart, updateQuantity } from "../../store/cartSlice";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

const CartContainer = () => {
  const dispatch = useDispatch();

  const { cartItems, total, amount, currency, delivery_fee } = useSelector(
    (state) => state.cart
  );

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityIncrease = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      dispatch(updateQuantity({ productId, newQuantity: item.quantity + 1 }));
    }
  };

  const handleQuantityDecrease = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ productId, newQuantity: item.quantity - 1 }));
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart(productId));
    }
  };

  if (amount < 1) {
    return (
      <div className="flex flex-col items-center justify-center gap-30 lg:h-150 w-screen p-8">
        <h1 className="text-6xl sour-gummy font-bold">Your Cart Is Empty</h1>
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-3xl sour-gummy">Please Select Items: </p>
          <MainButton link="/services" name="GO BACK" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-20 h-auto w-screen mt-40">
      <div className="flex flex-col gap-10 w-full max-w-6xl lg:p-10 md:p-6 p-2">
        <div className="flex lg:flex-row flex-col items-start justify-between gap-20">
          <div className="w-full px-5">
            <h1 className="text-6xl sour-gummy font-bold">Cart</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 bg-white border-2 border-black p-5 text-3xl sour-gummy w-full max-w-xl h-auto">
            <h1 className="text-4xl font-bold">Order Summary</h1>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between w-full max-w-6xl ">
              <p>Delivery Fee:</p>
              <p>
                {currency}
                {delivery_fee}
              </p>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between w-full max-w-6xl">
              <p>Total Price:</p>
              <p>
                {currency}
                {total + delivery_fee}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-10 w-full max-w-6xl text-4xl sour-gummy px-5">
          <p>Total Items:</p>
          <p>{amount}</p>
        </div>
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => {
            return (
              <div
                className="flex items-center gap-5 w-full max-w-xl  bg-white border-2 border-gray-300 lg:p-4 p-2"
                key={item.id}
              >
                <div className="w-auto">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="lg:w-70 md:w-50 w-30 lg:h-50 md:h-50 h-30 rounded-xl "
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col gap-2">
                      <h1 className="lg:text-3xl md:text-2xl text-lg sour-gummy font-bold">
                        {item.name}
                      </h1>
                      <p className="lg:text-xl md:text-lg text-md text-gray-600">
                        {item.description.length > 100
                          ? `${item.description.slice(0, 100)}...`
                          : item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="lg:text-2xl md:text-2xl text-md font-semibold">
                      {currency}
                      {item.price}
                    </p>
                    <div className="border border-gray-300 rounded-lg flex items-center justify-between gap-2 ">
                      {item.quantity === 1 ? (
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="border-r border-gray-300 bg-gray-200 cursor-pointer p-2"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleQuantityDecrease(item.id)}
                          className="font-bold border-r border-gray-300 bg-gray-200 cursor-pointer p-2"
                        >
                          <FaMinus className="text-lg" />
                        </button>
                      )}
                      <span className="font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityIncrease(item.id)}
                        className="font-bold border-l border-gray-300 bg-gray-200 cursor-pointer p-2"
                      >
                        <FaPlus className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
