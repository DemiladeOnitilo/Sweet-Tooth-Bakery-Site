import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CakeCard from "../CakeCard";
import { products } from "../products";
import MainButton from "../MainButton";

const CakeList = () => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} !flex !items-center !justify-center !w-12 !h-12 !bg-white !rounded-full !shadow-lg hover:!bg-gray-50 !border-2 !border-gray-200 !z-10 !cursor-pointer`}
        style={{
          left: "-25px",
          transform: "translateY(-50%)",
        }}
      >
        <MdChevronLeft className="!text-2xl !text-gray-700" />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} !flex !items-center !justify-center !w-12 !h-12 !bg-white !rounded-full !shadow-lg hover:!bg-gray-50 !border-2 !border-gray-200 !z-10 !cursor-pointer`}
        style={{
          right: "-25px",
          transform: "translateY(-50%)",
        }}
      >
        <MdChevronRight className="!text-2xl !text-gray-700" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-[70vh] py-10 px-4 lg:px-8">
      <div className="flex flex-col relative justify-center items-center gap-8 text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Service
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Discover our most beloved pastries, crafted with love and the finest
          ingredients
        </p>
        <MainButton link="/services" name="View All" />
      </div>

      <div className="w-full max-w-7xl relative">
        <div className="px-8 md:px-12">
          <Slider {...settings}>
            {products.map((pastry) => (
              <div key={pastry.id} className="px-2">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <CakeCard {...pastry} isHome={true} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CakeList;
