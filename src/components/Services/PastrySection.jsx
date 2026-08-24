import React from "react";
import Sliders from "../Sliders";
import { products } from "../products";
import ViewAll from "../ViewAll";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PastrySection = ({ onPage = true, category, indexes, altOffset }) => {
  const filteredProducts = category
    ? products.filter(
        (product) =>
          product.id === category ||
          product.name.toLowerCase() === category.toLowerCase(),
      )
    : products;

  const displayProducts = indexes
    ? indexes.map((i) => ({ ...products[i], _globalIndex: i })).filter(Boolean)
    : filteredProducts.map((p, i) => ({ ...p, _globalIndex: i }));

  return (
    <div className="flex flex-col">
      {displayProducts.map((product, index) => {
        const isAlt = (index + (altOffset ?? 0)) % 2 === 1;

        return (
          <section
            key={index}
            className={`flex flex-col justify-center items-center gap-8 w-full py-16 md:py-20 ${
              isAlt && "bg-[#BE185D]/10" 
            }`}
          >
            {!onPage && (
              <nav className="w-full max-w-7xl px-6 md:px-12 flex items-center gap-2 text-sm text-gray-500 body-text font-medium uppercase tracking-wider mb-4">
                <Link to="/" className="hover:text-[#BE185D] transition-colors">
                  Home
                </Link>
                <FaChevronRight className="text-[10px]" />
                <Link
                  to="/services"
                  className="hover:text-[#BE185D] transition-colors"
                >
                  Services
                </Link>
                {category?.name && (
                  <>
                    <FaChevronRight className="text-[10px]" />
                    <Link
                      to={`/services/category/${category.name}`}
                      className="hover:text-[#BE185D] transition-colors"
                    >
                      {category.name}
                    </Link>
                  </>
                )}
                <FaChevronRight className="text-[10px]" />
                <span className="text-gray-900">{product.name}</span>
              </nav>
            )}

            <div className="flex flex-col justify-center items-center gap-4 w-full max-w-7xl px-6 text-center">
              {onPage && (
                <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                  {String(product._globalIndex + 1).padStart(2, "0")} /{" "}
                  {String(products.length).padStart(2, "0")}
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                </div>
              )}

              <h2 className="heading-text text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {product.name}
              </h2>

              {onPage && (
                <div className="mt-2">
                  <ViewAll to={`/services/category/${product.id}`} />
                </div>
              )}
            </div>

            <div className="w-full max-w-7xl mt-4">
              <Sliders main={product.types} onPage={onPage} />
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default PastrySection;
