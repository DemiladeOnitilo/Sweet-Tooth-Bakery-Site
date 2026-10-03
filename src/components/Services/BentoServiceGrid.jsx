import React from "react";
import { products } from "../products";
import ViewAll from "../ViewAll";

const BentoServiceGrid = ({
  bentoProduct,
  bentoProductTypes,
  productNumber,
}) => {
  return (
    <div className="w-full px-4 py-20 md:py-32 mx-auto">
      <div className="flex flex-col gap-16 w-full max-w-7xl mx-auto">
        
        <div className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto">
          <div className="body-text flex items-center gap-3 text-[10px] font-bold text-[#BE185D] tracking-widest uppercase mb-2">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            Collection {productNumber} / {String(products.length).padStart(2, "0")}
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
          </div>

          <h2 className="heading-text text-4xl lg:text-6xl font-bold text-gray-900">
            {bentoProduct.name}
          </h2>

          <p className="body-text text-gray-600 text-base md:text-lg leading-relaxed mt-2 font-light">
            {bentoProduct.description}
          </p>

          <div className="mt-6">
            <ViewAll to={`/services/category/${bentoProduct.id}`} />
          </div>
        </div>

        <div className="flex flex-col md:grid grid-cols-2 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          
          <div className="row-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-1/2 md:h-full bg-gray-50 shadow-sm hover:shadow-xl transition-all duration-700">
            <img
              src={bentoProductTypes[0].img}
              alt={bentoProductTypes[0].name}
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="body-text text-white/80 text-[10px] font-bold uppercase tracking-widest mb-2">
                Featured Classic
              </p>
              <p className="heading-text text-white text-3xl md:text-4xl font-bold">
                {bentoProductTypes[0].name}
              </p>
            </div>
          </div>

          {bentoProductTypes.slice(1, 3).map((items, index) => (
            <div
              key={index}
              className="relative rounded-[2rem] overflow-hidden group cursor-pointer bg-gray-50 shadow-sm hover:shadow-xl transition-all duration-700"
            >
              <img
                src={items.img}
                alt={items.name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="heading-text text-white text-2xl md:text-3xl font-bold">
                  {items.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoServiceGrid;