import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import { FaShoppingCart, FaCheck, FaMinus, FaPlus, FaChevronRight } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { products } from "../components/products";
import CakeCard from "../components/CakeCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Carousel from "../components/Carousel";
import { toast, ToastContainer } from "react-toastify";

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currency, items: cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);

  const category = products.find((cat) =>
    cat.types.find((item) => item.id === id)
  );
  const product = category?.types?.find((item) => item.id === id);

  const relatedProducts =
    category?.types?.filter((item) => item.id !== id) || [];

  const recommendedItems = products
    .filter((cat) => cat.name !== category?.name)
    .flatMap((cat) => cat.types)
    .slice(0, 4);

  const isInCart = cartItems?.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    toast.success(`${quantity} ${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="rgb(236, 72, 153)"
          ariaLabel="Loading product details"
        />
      </div>
    );
  }

  if (!category || !category.types) return null;

  return (
    <div className="flex flex-col gap-20 lg:mt-40 mt-20">
      {/* Breadcrumb + Product Details */}
      <div className="flex flex-col gap-6 px-4 lg:px-16 max-w-7xl mx-auto w-full">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-pink-600 transition-colors duration-300">Home</Link>
          <FaChevronRight className="text-xs" />
          <Link to="/services" className="hover:text-pink-600 transition-colors duration-300">Services</Link>
          {category?.name && (
            <>
              <FaChevronRight className="text-xs" />
              <Link
                to={`/services/category/${category.name}`}
                className="hover:text-pink-600 transition-colors duration-300"
              >
                {category.name}
              </Link>
            </>
          )}
          <FaChevronRight className="text-xs" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden p-8">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-xl w-full">
              <img
                src={product.img}
                alt={`${product.name} - Delicious and available for order`}
                className="rounded-3xl shadow-lg h-[400px] lg:h-[550px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

              {isInCart && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-pink-600 rounded-full text-sm font-medium flex items-center gap-2 shadow-md">
                  <FaCheck size={14} />
                  In Cart
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-pink-600 text-sm font-semibold uppercase tracking-wide">
                {category.name}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent sour-gummy">
                {product.name}
              </h1>
            </div>

            <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {currency}
              {product.price}
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Ingredients as pill tags */}
            <div className="space-y-3 border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-800">Ingredients</h2>
              {product.ingredients && product.ingredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200/50 text-gray-700 text-sm rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-base">No ingredients listed.</p>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full px-4 py-2 w-fit">
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  aria-label="Decrease quantity"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-xl font-bold text-gray-800 w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-pink-600 hover:text-pink-700 transition-all duration-300 cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  aria-label="Increase quantity"
                >
                  <FaPlus size={12} />
                </button>
              </div>

              <button
                className="group/btn relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-700 cursor-pointer text-lg font-medium transform hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-grow"
                onClick={handleAddToCart}
                aria-label={`Add ${quantity} ${product.name} to cart`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaShoppingCart size={20} />
                  {isInCart ? "Add More to Cart" : "Add to Cart"}
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-700 ease-out"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */} 
      <Carousel />

      {/* Related Offers */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col items-center gap-10 w-full py-16 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium">
              🍰 More from {category.name}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Related Offers
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl w-full justify-items-center">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <CakeCard {...item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* You Might Also Like */}
      {recommendedItems.length > 0 && (
        <div className="flex flex-col items-center gap-10 w-full pb-20 px-4">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl w-full justify-items-center">
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <CakeCard {...item} isHome={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Products;