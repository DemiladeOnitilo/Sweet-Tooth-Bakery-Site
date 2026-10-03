import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaStar } from "react-icons/fa";
import { getActiveProductNotifications } from "../notification";
import { products } from "../products"; // adjust path as needed

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
    <section className="py-20 md:py-32 px-6 md:px-12 lg:px-10">
      <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4 md:px-0">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3">
          <div className="body-text flex items-center justify-center gap-3 text-[10px] md:text-sm font-bold tracking-widest text-[#BE185D] uppercase">
            <span className="w-6 h-[1px] bg-[#BE185D]"></span>
            New Arrivals
            <span className="w-6 h-[1px] bg-[#BE185D]"></span>
          </div>

          <h2 className="heading-text text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Fresh from the <span className="text-[#BE185D] italic">Oven</span>
          </h2>

          <p className="body-text text-gray-500 text-sm md:text-base font-light mt-2">
            Check out some of our new arrivals!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {arrivals.map((notif) => {
            const product = findProduct(notif.productId);
            const remaining = daysLeft(notif.expiresAt);

            return (
              <Link
                key={notif.id}
                to={`/products/${notif.productId}`}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                  
                  {remaining !== null && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm body-text uppercase tracking-widest">
                      <FaClock className="text-[#BE185D] text-xs" />
                      {remaining === 0 ? "Last day!" : `${remaining}d left`}
                    </div>
                  )}

                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#BE185D] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm body-text">
                      New
                    </span>
                  </div>

                  {product?.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                      <FaStar className="text-4xl text-gray-200" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors duration-500 pointer-events-none" />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <p className="body-text text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    {product?.categoryName || "Bakery"}
                  </p>
                  
                  <h3 className="heading-text text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors line-clamp-1">
                    {product?.name || notif.message}
                  </h3>
                  
                  {product?.description && (
                    <p className="body-text text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed font-light">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    {product?.price ? (
                      <span className="heading-text text-lg font-bold text-[#BE185D]">
                        ₦{Number(product.price).toLocaleString()}
                      </span>
                    ) : (
                      <span className="body-text text-[10px] font-bold text-[#BE185D] uppercase tracking-widest">
                        Custom Price
                      </span>
                    )}
                    
                    <span className="body-text flex items-center gap-2 text-gray-900 font-bold text-[10px] uppercase tracking-widest group-hover:text-[#BE185D] transition-colors">
                      View details
                      <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform duration-300" />
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