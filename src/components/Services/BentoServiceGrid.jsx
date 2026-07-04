import React from "react";
import { products } from "../products";
import ViewAll from "../ViewAll";

const BentoServiceGrid = ({
  bentoProduct,
  bentoProductTypes,
  productNumber,
}) => {
  return (
    <div className="flex w-full py-12 px-6 mx-auto bg-white">
      <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-1 items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs md:text-sm font-medium">
            {productNumber} / {String(products.length).padStart(2, "0")}
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl lg:text-5xl font-bold ">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {bentoProduct.name}
              </span>
            </h1>

            <div className="h-1 w-26 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
          </div>

          <div className="text-gray-400 italic text-xl leading-relaxed">
            {bentoProduct.description}
          </div>
          <div className="mt-2">
            <ViewAll to={`/services/category/${bentoProduct.id}`} />
          </div>
        </div>

        <div className="flex flex-col md:grid grid-cols-2 grid-rows-2 gap-3 h-[800px] md:h-[420px]">
          <div className="row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer h-1/2 md:h-full">
            <img
              src={bentoProductTypes[0].img}
              alt={bentoProductTypes[0].name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-md font-medium sour-gummy">
                {bentoProductTypes[0].name}
              </p>
              <p className="text-white/70 text-sm">Featured</p>
            </div>
          </div>
          {bentoProductTypes.slice(1, 3).map((items, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={items.img}
                alt={items.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <p className="text-white text-sm font-medium sour-gummy">
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
