import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import CakeCard from "../CakeCard";
import { products } from "../products";
import { Link } from "react-router-dom";

const CakeList = () => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} !flex !items-center !justify-center !w-12 !h-12 !bg-white !rounded-full !shadow-md hover:!shadow-lg hover:!scale-105 !border !border-gray-100 !z-10 !cursor-pointer transition-all duration-300`}
        style={{
          left: "-20px",
          transform: "translateY(-50%)",
        }}
      >
        <MdChevronLeft className="!text-3xl !text-[#BE185D]" />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} !flex !items-center !justify-center !w-12 !h-12 !bg-white !rounded-full !shadow-md hover:!shadow-lg hover:!scale-105 !border !border-gray-100 !z-10 !cursor-pointer transition-all duration-300`}
        style={{
          right: "-20px",
          transform: "translateY(-50%)",
        }}
      >
        <MdChevronRight className="!text-3xl !text-[#BE185D]" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, arrows: false },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, arrows: false },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "10%",
        },
      },
    ],
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
 
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="heading-text text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Our <span className="text-[#BE185D] italic">Menu</span>
            </h2>
            <p className="body-text text-base md:text-lg text-gray-600 mt-3">
              Discover our most beloved pastries, crafted with love and the finest ingredients.
            </p>
          </div>
          
          <Link
            to="/services"
            className="body-text hidden md:flex items-center gap-2 text-[#BE185D] font-semibold text-base hover:text-[#9D174D] hover:gap-3 transition-all duration-300 whitespace-nowrap"
          >
            Explore All
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        
        <div className="w-full relative">
          <Slider {...settings} className="px-2">
            {products.map((pastry) => (
              <div key={pastry.id} className="p-3">
                <CakeCard {...pastry} isHome={true} />
              </div>
            ))}
          </Slider>
        </div>

        <Link
          to="/services"
          className="body-text flex md:hidden items-center justify-center gap-2 text-[#BE185D] font-bold text-base mt-2"
        >
          View Full Menu <FaArrowRight className="text-sm" />
        </Link>
      </div>
    </section>
  );
};

export default CakeList;