import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import CakeCard from "../components/CakeCard";
import { Link } from "react-router-dom";

const Sliders = ({ 
  onPage, 
  main, 
  autoPlay, 
  preTitle, 
  title, 
  subtitle, 
  viewAllLink, 
  viewAllText = "View Full Menu" 
}) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: autoPlay,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ bottom: "-40px" }}>
        <ul className="m-0 p-0 flex justify-center items-center gap-1">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#BE185D] transition-all duration-300 custom-dot"></div>
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="w-full">
      {title && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-10">
          <div className="flex flex-row items-end justify-between gap-6">
            <div className="max-w-2xl">
              {preTitle && (
                <div className="body-text flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#BE185D] uppercase mb-3">
                  <span className="w-6 h-[1px] bg-[#BE185D]"></span>
                  {preTitle}
                </div>
              )}
              <h2 className="heading-text text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="body-text text-base md:text-lg text-gray-500 mt-3 font-light">
                  {subtitle}
                </p>
              )}
            </div>

            {onPage && (
              <div className="hidden md:flex items-center gap-3 pb-2">
                <button
                  onClick={() => sliderRef.current?.slickPrev()}
                  className="flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 z-10 cursor-pointer transition-all duration-300 outline-none"
                >
                  <MdChevronLeft className="text-2xl text-gray-900" />
                </button>
                <button
                  onClick={() => sliderRef.current?.slickNext()}
                  className="flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 z-10 cursor-pointer transition-all duration-300 outline-none"
                >
                  <MdChevronRight className="text-2xl text-gray-900" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {onPage ? (
        <div className="w-full max-w-7xl mx-auto relative px-2 md:px-4 mb-12">
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

          <div className="w-full relative pb-12">
            <Slider ref={sliderRef} {...settings}>
              {main.map((item, index) => (
                <div key={index} className="outline-none">
                  <CakeCard {...item} onPage={true} />
                </div>
              ))}
            </Slider>
          </div>

          {viewAllLink && (
            <div className="mt-8 flex justify-center w-full">
              <Link
                to={viewAllLink}
                className="body-text flex items-center justify-center gap-2 text-gray-900 hover:text-[#BE185D] font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors"
              >
                {viewAllText} <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4 max-w-7xl mx-auto">
          {main.map((item, index) => (
            <CakeCard key={index} {...item} onPage={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sliders;