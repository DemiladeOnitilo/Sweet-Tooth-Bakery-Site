import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../components/Home/Hero";
import CakeList from "../components/Home/CakeList";
import Goals from "../components/Goals";
import MainButton from "../components/MainButton";
import CTASection from "../components/Home/CTASection";
import NewArrivals from "../components/Newarrivals";
import { products } from "../components/products";

const Home = () => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { cartItems, total, amount, currency, delivery_fee } = useSelector(
    (state) => state.cart,
  );

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
    <div className="flex flex-col">
      <Hero />
      {/* Mobile-only bestsellers strip */}
      <div className="block lg:hidden bg-white">
        <p className="px-4 pt-3 pb-1 text-xs md:text-lg font-semibold tracking-widest text-gray-400 uppercase">
          Bestsellers
        </p>
        <div className="flex gap-3 mx-auto overflow-x-auto px-4 pb-4 scrollbar-hide">
          {bestsellers.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
               className="flex-none w-25 md:w-30 rounded-xl border border-gray-100 overflow-hidden active:scale-95 transition-transform"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-16 object-cover"
              />
              <div className="p-2">
                <p className="text-[9.5px] md:text-sm font-medium text-gray-800 truncate leading-tight">
                  {item.name}
                </p>
                {item.price ? (
                  <p className="text-[9px] md:text-xs text-purple-500 font-semibold mt-0.5">
                    {currency} {item.price}
                  </p>
                ) : (
                  <p className="text-[9px] md:text-xs text-purple-500 font-semibold mt-0.5">
                    Consultaion Only
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Goals isHome={true} />
      <NewArrivals />
      <CTASection />
      <CakeList />
    </div>
  );
};

export default Home;
