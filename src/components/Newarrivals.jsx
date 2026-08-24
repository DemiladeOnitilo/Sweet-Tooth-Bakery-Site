import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock } from "react-icons/fa";
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
  const arrivals = getActiveProductNotifications().filter(
    (n) => n.type === "new_arrival" && n.productId,
  );

  if (arrivals.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-10">
      <div className="flex flex-col gap-10 max-w-7xl mx-auto">
        
        {/* SECTION HEADER - Elegant & Clean */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <p className="body-text flex items-center justify-center gap-2 text-sm md:text-base font-bold tracking-widest text-[#BE185D] uppercase mb-3">
             New Arrivals
          </p>

          <h2 className="heading-text text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Fresh from the <span className="text-[#BE185D] italic">Oven</span>
          </h2>

          <p className="body-text text-gray-600 text-base md:text-lg">
            Limited-time drops! Grab them before they're gone.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {arrivals.map((notif) => {
            const product = findProduct(notif.productId);
            const remaining = daysLeft(notif.expiresAt);

            return (
              <Link
                key={notif.id}
                to={`/products/${notif.productId}`}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                {/* Image Container with precise aspect ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                  
                  {/* Timer Badge (Frosted Glass) */}
                  {remaining !== null && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm body-text">
                      <FaClock className="text-[#BE185D]" />
                      {remaining === 0 ? "Last day!" : `${remaining}d left`}
                    </div>
                  )}

                  {/* "New" Tag (Premium Solid Pink) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#BE185D] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm body-text">
                      New
                    </span>
                  </div>

                  {product?.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <FaStar className="text-4xl text-gray-200" />
                    </div>
                  )}
                  {/* Subtle hover overlay to tie it to the Goals section */}
                  <div className="absolute inset-0 bg-[#BE185D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="body-text text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    {product?.categoryName || "Bakery"}
                  </p>
                  
                  <h3 className="heading-text text-xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors line-clamp-1">
                    {product?.name || notif.message}
                  </h3>
                  
                  {product?.description && (
                    <p className="body-text text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {/* Card Footer: Price & Action */}
                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-50">
                    {product?.price ? (
                      <span className="body-text text-lg font-bold text-[#BE185D]">
                        ₦{Number(product.price).toLocaleString()}
                      </span>
                    ) : (
                      <span className="body-text text-sm font-semibold text-[#BE185D]">
                        Custom Price
                      </span>
                    )}
                    
                    <span className="body-text flex items-center gap-2 text-gray-800 font-semibold text-sm group-hover:text-[#BE185D] transition-colors">
                      View details
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
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