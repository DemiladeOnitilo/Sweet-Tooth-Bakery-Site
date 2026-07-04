import React from "react";
import { products } from "../products";
import ViewAll from "../ViewAll";

const SingleCardService = ({ singleProduct, singleProductTypes, productNumber }) => {
  return (
    <div className="flex justify-center items-center w-full px-6 py-16 mx-auto bg-white ">
      <div className="flex flex-col md:flex-row rounded-3xl max-w-7xl overflow-hidden border border-pink-100 shadow-lg group hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 cursor-pointer">
        <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[220px] relative overflow-hidden">
          <img
            src={singleProduct.img}
            alt={singleProduct.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-4 p-8 lg:p-12 bg-white">
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs md:text-sm font-medium">
            {productNumber} / {String(products.length).padStart(2, "0")}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {singleProduct.name}
              </span>
            </h1>

            <div className="h-1 w-20 md:w-26 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
          </div>

          <div className="text-gray-500 italic text-md md:text-lg leading-relaxed">
            {singleProduct.description}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Available Options
            </h3>
            <div className="flex flex-wrap text-gray-600 italic text-xs md:text-sm lg:text-lg leading-relaxed">
              {singleProductTypes.map((items, index) => (
                <React.Fragment key={index}>
                  <span>{items.name.replace(/Brownies/gi, "").trim()}</span>
                  {index !== singleProductTypes.length - 1 && (
                    <span className="mx-2">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <ViewAll to={`/services/category/${singleProduct.id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCardService;
