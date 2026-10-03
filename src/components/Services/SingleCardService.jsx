import React from "react";
import { products } from "../products";
import ViewAll from "../ViewAll";

const SingleCardService = ({
  singleProduct,
  singleProductTypes,
  productNumber,
}) => {
  return (
    <div className="flex justify-center items-center w-full px-8 py-20 md:py-32 mx-auto">
      <div className="flex flex-col md:flex-row max-w-7xl w-full group cursor-pointer gap-4 lg:gap-10 xl:gap-16 items-center bg-[#ffffff] rounded-4xl shadow-2xl group-hover:shadow-3xl">
        
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-l-4xl bg-gray-50 aspect-square shadow-sm group-hover:shadow-2xl transition-all duration-700">
          <img
            src={singleProduct.img}
            alt={singleProduct.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-500 pointer-events-none" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-2 md:gap-4 lg:gap-6 p-6 lg:p-4">
          <div className="body-text flex items-center gap-3 text-[10px] font-bold text-[#BE185D] tracking-widest uppercase">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            Collection {productNumber} / {String(products.length).padStart(2, "0")}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h2 className="heading-text text-4xl lg:text-6xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors leading-tight">
              {singleProduct.name}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed body-text font-light">
              {singleProduct.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h3 className="body-text text-xs font-bold text-gray-400 uppercase tracking-widest">
              Available Creations
            </h3>
            <div className="flex flex-wrap text-gray-900 body-text text-xs font-bold uppercase tracking-wider">
              {singleProductTypes.map((items, index) => (
                <React.Fragment key={index}>
                  <span>{items.name.replace(/Brownies/gi, "").trim()}</span>
                  {index !== singleProductTypes.length - 1 && (
                    <span className="mx-2 text-[#BE185D]">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-8">
            <ViewAll to={`/services/category/${singleProduct.id}`} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleCardService;