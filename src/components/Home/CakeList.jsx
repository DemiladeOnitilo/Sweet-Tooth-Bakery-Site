<<<<<<< HEAD
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CakeCard from "../CakeCard";
import { products } from "../products";
import ViewAll from "../ViewAll";

const CakeList = () => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <MdChevronLeft className="arrows" style={{ color: "black" }} />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <MdChevronRight className="arrows" style={{ color: "black" }} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />, 
  };


  return (
    <div className="flex flex-col gap-y-10 justify-center items-center h-[70vh] m-15 lg:m-0">
      <div className="flex flex-col relative justify-center items-center gap-y-8 text-center">
        <h1 className="text-6xl underline underline-offset-12 decoration-3 sour-gummy">
          Services
        </h1>
        <p className="text-2xl">Here are some of our most famous pastries</p>
        <ViewAll to="/services" />
      </div>
      <div className="flex justify-center items-center w-auto">
        <Slider {...settings} className="w-350 lg:w-400"> 
          {products.map((pastry => (
            <div key={pastry.id} >
              <CakeCard {...pastry} isHome = {true} />
            </div>
            
          )))}
        </Slider>
      </div>
    </div>
  );
};

=======
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CakeCard from "../CakeCard";
import { products } from "../products";
import ViewAll from "../ViewAll";

const CakeList = () => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <MdChevronLeft className="arrows" style={{ color: "black" }} />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div onClick={onClick} className={`arrow ${className}`}>
        <MdChevronRight className="arrows" style={{ color: "black" }} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />, 
  };


  return (
    <div className="flex flex-col gap-y-10 justify-center items-center h-[70vh] m-15 lg:m-0">
      <div className="flex flex-col relative justify-center items-center gap-y-8 text-center">
        <h1 className="text-6xl underline underline-offset-12 decoration-3 sour-gummy">
          Services
        </h1>
        <p className="text-2xl">Here are some of our most famous pastries</p>
        <ViewAll to="/services" />
      </div>
      <div className="flex justify-center items-center w-auto">
        <Slider {...settings} className="w-350 lg:w-400"> 
          {products.map((pastry => (
            <div key={pastry.id} >
              <CakeCard {...pastry} isHome = {true} />
            </div>
            
          )))}
        </Slider>
      </div>
    </div>
  );
};

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default CakeList;