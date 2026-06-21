import React from "react";
import Sliders from "../Sliders";
import { products } from "../products";
import ViewAll from "../ViewAll";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PastrySection = ({ onPage = true, category }) => {
  const filteredProducts = category
    ? products.filter(
        (product) =>
          product.id === category ||
          product.name.toLowerCase() === category.toLowerCase(),
      )
    : products;

  return (
    <div className="flex flex-col ">
      {filteredProducts.map((product, index) => {
        const isAlt = index % 2 === 1;

        return (
          <section
            key={index}
            className={`flex flex-col justify-center items-center gap-8 w-full py-16 ${
              isAlt
                ? "bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30"
                : "bg-white"
            }`}
          >
            {!onPage && (
              <nav className="w-full max-w-7xl px-4 flex items-center gap-2 text-sm text-gray-500">
                <Link
                  to="/"
                  className="hover:text-pink-600 transition-colors duration-300"
                >
                  Home
                </Link>
                <FaChevronRight className="text-xs" />
                <Link
                  to="/services"
                  className="hover:text-pink-600 transition-colors duration-300"
                >
                  Services
                </Link>
                {category?.name && (
                  <>
                    <FaChevronRight className="text-xs" />
                    <Link
                      to={`/services/category/${category.name}`}
                      className="hover:text-pink-600 transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  </>
                )}
                <FaChevronRight className="text-xs" />
                <span className="text-gray-800 font-medium">
                  {product.name}
                </span>
              </nav>
            )}
            <div className="flex flex-col justify-center items-center gap-3 w-full max-w-7xl px-4 text-center">
              {onPage && (
                <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs md:text-sm font-medium">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(filteredProducts.length).padStart(2, "0")}
                </div>
              )}

              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {product.name}
                </span>
              </h1>

              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />

              {onPage && (
                <div className="mt-2">
                  <ViewAll to={`/services/category/${product.id}`} />
                </div>
              )}
            </div>

            <div className="w-full max-w-7xl px-4">
              <Sliders main={product.types} onPage={onPage} />
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default PastrySection;
