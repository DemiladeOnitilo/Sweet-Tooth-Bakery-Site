import React from "react";
import { products } from "../products";
import ViewAll from "../ViewAll";

const SingleCardService = ({
  singleProduct,
  singleProductTypes,
  productNumber,
}) => {
  return (
    <div className="flex justify-center items-center w-full px-6 py-16 md:py-24 mx-auto">
      <div className="flex flex-col md:flex-row rounded-3xl max-w-7xl w-full overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500 cursor-pointer">
        <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative overflow-hidden bg-gray-50">
          <img
            src={singleProduct.img}
            alt={singleProduct.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#BE185D]/0 group-hover:bg-[#BE185D]/10 transition-colors duration-500 pointer-events-none" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-6 p-8 lg:p-16 bg-white">
          <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            {productNumber} / {String(products.length).padStart(2, "0")}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h2 className="heading-text text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors">
              {singleProduct.name}
            </h2>
            <div className="text-gray-500 text-base md:text-lg leading-relaxed body-text">
              {singleProduct.description}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="body-text text-xs font-bold text-gray-400 uppercase tracking-widest">
              Available Options
            </h3>
            <div className="flex flex-wrap text-gray-800 text-sm md:text-base font-medium">
              {singleProductTypes.map((items, index) => (
                <React.Fragment key={index}>
                  <span>{items.name.replace(/Brownies/gi, "").trim()}</span>
                  {index !== singleProductTypes.length - 1 && (
                    <span className="mx-2 text-pink-300">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <ViewAll to={`/services/category/${singleProduct.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardService;
