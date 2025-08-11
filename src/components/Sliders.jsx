import React from 'react'
import CakeCard from '../components/CakeCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Sliders = (props) => {


    const SamplePrevArrow = (props) => {
            const { className, onClick } = props;
            return(
              <div onClick={onClick} className={`arrow ${className}`} >
                <MdChevronLeft class="arrows" style={{color:"black"}}/>
              </div>
            )
            }
        
        function SampleNextArrow(props) {
            const { className, onClick } = props;
            return(
              <div onClick={onClick} className={`arrow ${className}`} >
                <MdChevronRight class="arrows" style={{color:"black"}}/>
              </div>
            )
          }
        
            const settings = {
              dots: false, 
              infinite: true, 
              speed: 300, 
              slidesToShow: 3, 
              slidesToScroll: 1, 
              swipe: true, 
              touchMove: true, 
              nextArrow: <SampleNextArrow to="next"/>,
              prevArrow: <SamplePrevArrow to="prev"/>
            };

            let main = props.main ; 
            let onPage = props.onPage;
            let slide = onPage ? (
              <Slider {...settings} className='w-220'>
                {main.map((item, index) => {
                  return (
                    <CakeCard 
                      key={index}
                      id={item.id}
                      img={item.img}
                      name={item.name}
                    />
                  );
                })}
              </Slider>
            ) : (
              <div className='grid grid-row-2 grid-cols-2 gap-5 lg:flex lg:flex-wrap justify-center lg:gap-5 p-4'>
                {main.map((item, index) => {
                  return (
                    <CakeCard 
                      key={index}
                      id={item.id}
                      img={item.img}
                      name={item.name}
                      price={item.price}
                      ingredients={item.ingredients}
                      description={item.description}
                      onPage={true}
                    />
                  );
                })}
              </div>
            );

  return (
    <div>
        {slide}
    </div>
  )
}

export default Sliders