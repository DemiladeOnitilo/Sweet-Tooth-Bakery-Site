import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { products } from "../components/products";

const BestSellers = () => {
  const { currency } = useSelector((state) => state.cart);

  const BESTSELLER_IDS = [
    "brownies-ChocolateBrownie",
    "cupcakes-RedVelvetCupcakes",
    "cakes-RedVelvetCakeSlice",
    "cookies-ChocolateChipCookies",
    "muffins-BananaNutMuffins",
    "parfait-ChocolateParfait",
    "custom-RegularCake",
    "custom-CustomCake",
    "custom-WeddingCake",
  ];

  const bestsellers = products
    .flatMap((category) => category.types)
    .filter((item) => BESTSELLER_IDS.includes(item.id));
    
  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-12 lg:px-10">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <h2 className="heading-text text-2xl md:text-3xl lg:text-4xl font-bold text-[#BE185D] tracking-tight">
            Crowd Favorites
          </h2>
          <p className="body-text text-sm md:text-base text-gray-600 mt-2">
            Our most loved treats, baked fresh daily.
          </p>
        </div>
        <Link
          to="/services"
          className="body-text hidden sm:flex text-[#BE185D] hover:text-[#9D174D] font-semibold text-sm transition-colors"
        >
          View Full Menu &rarr;
        </Link>
      </div>

      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory hide-scrollbar">
        {bestsellers.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="group flex-none w-64 md:w-auto flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 snap-start cursor-pointer"
          >
            {/* Image Container with precise aspect ratio and zoom effect */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#BE185D] uppercase tracking-wider shadow-sm body-text">
                Best Seller
              </div>
            </div>

            <div className="p-4 md:p-5 flex flex-col flex-grow">
              <h3 className="heading-text text-base md:text-lg font-bold text-gray-800 group-hover:text-[#BE185D] transition-colors">
                {item.name}
              </h3>

              <div className="mt-auto pt-3 flex items-center justify-between">
                {item.price ? (
                  <p className="body-text text-base md:text-lg font-bold text-gray-900">
                    {currency}
                    {item.price}
                  </p>
                ) : (
                  <p className="body-text text-sm font-semibold text-pink-500">
                    Custom Order
                  </p>
                )}

                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                  <span className="body-text text-lg font-medium leading-none mb-0.5">
                    +
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
