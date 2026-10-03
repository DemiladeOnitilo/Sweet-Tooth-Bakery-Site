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
  const SamplePrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="hidden md:flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 z-10 cursor-pointer transition-all duration-300 absolute"
      style={{ top: "-85px", right: "70px" }}
    >
      <MdChevronLeft className="text-2xl text-gray-900" />
    </div>
  );

  const SampleNextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="hidden md:flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 z-10 cursor-pointer transition-all duration-300 absolute"
      style={{ top: "-85px", right: "10px" }}
    >
      <MdChevronRight className="text-2xl text-gray-900" />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: "-40px" }} className="md:hidden">
        <ul className="m-0 p-0 flex justify-center items-center gap-1">
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#BE185D] transition-all duration-300 custom-dot"></div>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 }, 
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, arrows: false },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2, 
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-12 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 px-6 md:px-0 relative">
        <style>{`
          .slick-dots li.slick-active .custom-dot {
            background-color: #BE185D;
            width: 20px;
            border-radius: 9999px;
          }
          .slick-dots li {
            margin: 0 4px;
            width: auto;
            height: auto;
          }
          .slick-list {
            margin: 0 -10px;
            padding: 10px 0 20px 0;
          }
          .slick-slide > div {
            padding: 0 10px;
          }
        `}</style>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="heading-text text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Our <span className="text-[#BE185D] italic">Menu</span>
            </h2>

            <p className="body-text text-base md:text-lg text-gray-600 mt-3">
              Discover our most beloved pastries, crafted with love and the
              finest ingredients.
            </p>
          </div>


        </div>

        <div className="w-full relative pb-6 md:pb-0">
          <Slider {...settings}>
            {products.map((pastry) => (
              <Link
                key={pastry.id}
                to={`/services/category/${pastry.id}`}
                className="block outline-none"
              >
                <CakeCard {...pastry} isHome={true} />
              </Link>
            ))}
          </Slider>
        </div>

        <Link
          to="/services"
          className="body-text flex items-center justify-center gap-2 text-[#BE185D] font-bold text-[10px] md:text-base uppercase tracking-widest mt-8 md:mt-14"
        >
          View Full Menu <FaArrowRight className="text-[10px]" />
        </Link>
      </div>
    </section>
  );
};

export default CakeList;
