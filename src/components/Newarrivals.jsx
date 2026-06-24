import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight, FaClock } from "react-icons/fa";
import { getActiveProductNotifications } from "./notification";
import { products } from "./products"; // adjust path as needed

const findProduct = (productId) => {
  if (!productId) return null;
  for (const category of products) {
    const found = category.types.find((p) => p.id === productId);
    if (found) return { ...found, categoryName: category.name };
  }
  return null;
};

const daysLeft = (expiresAt) => {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

const NewArrivals = () => {
  
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const arrivals = getActiveProductNotifications().filter(
    (n) => n.type === "new_arrival" && n.productId,
  );

  if (arrivals.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <div className="inline-flex gap-2 justify-center items-center w-fit px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs lg:text-sm font-medium">
            <FaStar className="text-yellow-400" />
            New Arrivals
          </div>

          <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Fresh from the{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Oven
              </span>
            </h2>

            <p className="text-gray-500 max-w-md mx-auto text-sm lg:text-md">
              Limited-time drops!! Grab them before they're gone!
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {arrivals.map((notif) => {
            const product = findProduct(notif.productId);
            const remaining = daysLeft(notif.expiresAt);

            return (
              <Link
                key={notif.id}
                to={`/products/${notif.productId}`}
                onClick={refreshPage}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                {/* Timer badge */}
                {remaining !== null && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-pink-600 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    <FaClock className="text-[10px]" />
                    {remaining === 0 ? "Last day!" : `${remaining}d left`}
                  </div>
                )}

                {/* New badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    New
                  </span>
                </div>

                {/* Image */}
                {product?.img ? (
                  <div className="h-70 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <FaStar className="text-4xl text-pink-300" />
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs md:text-md text-purple-500 font-semibold uppercase tracking-wide mb-1">
                    {product?.categoryName || "Bakery"}
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 text-base group-hover:text-pink-600 transition-colors">
                    {product?.name || notif.message}
                  </h3>
                  {product?.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-center mt-4">
                    {product?.price && (
                      <span className="text-md font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-base">
                        ₦{product.price.toLocaleString()}
                      </span>
                    )}
                    <span
                      className="flex items-center gap-1.5 text-pink-600 font-semibold text-sm md:text-base 
                                     hover:gap-2.5 transition-all duration-200 whitespace-nowrap pb-1 group"
                    >
                      View All
                      <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
