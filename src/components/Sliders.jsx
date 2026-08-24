import React from "react";
import CakeCard from "../components/CakeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Sliders = ({ onPage, main, autoPlay }) => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} !flex !items-center !justify-center !w-10 !h-10 !bg-white !rounded-full !shadow-md hover:!shadow-lg !z-10 !cursor-pointer transition-all`}
        style={{ left: "-15px", transform: "translateY(-50%)" }}
      >
        <MdChevronLeft className="!text-2xl !text-[#BE185D]" />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className} !flex !items-center !justify-center !w-10 !h-10 !bg-white !rounded-full !shadow-md hover:!shadow-lg !z-10 !cursor-pointer transition-all`}
        style={{ right: "-15px", transform: "translateY(-50%)" }}
      >
        <MdChevronRight className="!text-2xl !text-[#BE185D]" />
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
    autoplay: autoPlay,
    autoplaySpeed: 3000,
    touchMove: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
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
    <div className="w-full">
      {onPage ? (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12">
          <Slider {...settings} className="px-2">
            {main.map((item, index) => (
              <div key={index} className="p-3">
                <CakeCard {...item} onPage={true} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 max-w-7xl mx-auto">
          {main.map((item, index) => (
            <CakeCard key={index} {...item} onPage={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sliders;