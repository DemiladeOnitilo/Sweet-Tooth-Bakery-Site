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
        return (
          <section
            key={index}
            className="flex flex-col justify-center items-center w-full transition-colors duration-500 py-10 md:py-12"
          >
            {!onPage && (
              <div className="w-full max-w-7xl px-16 md:px-20 mb-10">
                <nav className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-gray-400 body-text uppercase tracking-widest font-bold">
                  <Link to="/" className="hover:text-[#BE185D] transition-colors">
                    Home
                  </Link>
                  <FaChevronRight className="text-[8px]" />
                  <Link
                    to="/services"
                    className="hover:text-[#BE185D] transition-colors"
                  >
                    Services
                  </Link>
                  {category?.name && (
                    <>
                      <FaChevronRight className="text-[8px]" />
                      <Link
                        to={`/services/category/${category.name}`}
                        className="hover:text-[#BE185D] transition-colors"
                      >
                        {category.name}
                      </Link>
                    </>
                  )}
                  <FaChevronRight className="text-[8px]" />
                  <span className="text-gray-900">{product.name}</span>
                </nav>
              </div>
            )}

            <div className="w-full max-w-7xl px-0 md:px-6">
              <h1></h1>
              <Sliders 
                main={product.types} 
                onPage={onPage}
                preTitle={onPage ? `Collection ${String(product._globalIndex + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}` : null}
                title={product.name}
                viewAllLink={onPage ? `/services/category/${product.id}` : null}
                viewAllText="View Collection"
              />
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default PastrySection;