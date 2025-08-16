import React from "react";
import Sliders from "../Sliders";
import { products } from "../products";
import ViewAll from "../ViewAll";
import MainButton from "../MainButton";

const PastrySection = ({ onPage = true, category }) => {
  const filteredProducts = category
    ? products.filter(
        (product) => product.name.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div className="flex flex-col gap-3 items-center justify-center text-center mb-20">
      {filteredProducts.map((product, index) => {
        return (
          <section
            key={index}
            className="flex flex-col justify-center items-center gap-8 w-full max-w-7xl px-4"
          >
            {onPage ? (
              <div className="flex flex-col justify-center items-center w-full">
                <div className="relative">
                  <h1 className="text-4xl lg:text-5xl font-bold pb-2">
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent sour-gummy">
                      {product.name}
                    </span>
                  </h1>
                </div>
                <div>
                  <ViewAll to={`/category/${product.name}`} />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold  pb-2">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                    {product.name}
                  </span>
                </h1>
              </div>
            )}

            <div className="w-full">
              <Sliders main={product.types} onPage={onPage} />
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default PastrySection;
