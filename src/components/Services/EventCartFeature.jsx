import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { products } from "../products";

const EventCartFeature = () => {
  let cartProduct = null;
  for (const cat of products) {
    const found = cat.types.find(p => p.id === "live-event-carts" || p.id === "event-carts");
    if (found) {
      cartProduct = found;
      break;
    }
  }

  const displayImg = cartProduct?.img || "/images/cart-placeholder.jpg";
  const targetUrl = cartProduct ? `/products/${cartProduct.id}` : "/services";

  return (
    <section className="w-full px-4 py-20 md:py-32 mx-auto">
      <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden bg-gray-900 flex flex-col md:flex-row shadow-2xl relative group">
        
        {/* Left Side: Editorial Typography */}
        <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center items-start z-10 bg-gray-900 relative">
          <div className="body-text flex items-center gap-3 text-[10px] font-bold text-[#BE185D] tracking-widest uppercase mb-6">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            Live Catering Service
          </div>
          
          <h2 className="heading-text text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            WE BRING THE <span className="text-[#BE185D] italic">BAKERY</span> DIRECTLY TO YOUR VENUE.
          </h2>
          
          <p className="body-text text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-md font-light">
            {cartProduct?.description || "Elevate your next event. Choose between our standalone Premium Slushie setup, or the ultimate Slushie & Live Mini-Pancake combo station."}
          </p>

          <Link
            to={targetUrl}
            className="bg-white text-gray-900 px-8 py-4 rounded-full body-text text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-3 shadow-lg active:scale-95"
          >
            View Packages <FaArrowRight className="text-gray-900" />
          </Link>
        </div>

        <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-auto overflow-hidden">
          
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 hidden md:block"></div>
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-10 block md:hidden"></div>
          
          <img 
            src={displayImg} 
            alt="Live Event Carts" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        
      </div>
    </section>
  );
};

export default EventCartFeature;