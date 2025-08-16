import React from "react";
import CakeCard from "../components/CakeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Sliders = ({ onPage, main }) => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <MdChevronLeft class="arrows" style={{ color: "black" }} />
      </div>
    );
  };

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <MdChevronRight class="arrows" style={{ color: "black" }} />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
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

  let slide = onPage ? (
    <div className="w-full max-w-7xl relative">
      <div className="px-8 md:px-12">
        <Slider {...settings}>
          {main.map((item, index) => {
            return (
              <div
                key={index}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <CakeCard {...item} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  ) : (
    <div className="grid grid-row-2 grid-cols-2 gap-5 lg:flex lg:flex-wrap justify-center lg:gap-5 p-4">
      {main.map((item, index) => {
        return <CakeCard key={index} {...item} onPage={true} />;
      })}
    </div>
  );

  return <div>{slide}</div>;
};

export default Sliders;
