import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "../products";

const BestSellers = () => {
  const { currency } = useSelector((state) => state.cart);

  const BESTSELLER_IDS = [
    "brownies-ChocolateBrownie",
    "cupcakes-RedVelvetCupcakes",
    "cakes-RedVelvetCakeSlice",
    "cookies-ChocolateChipCookies",
    "muffins-BananaNutMuffins",
    "parfait-ChocolateParfait",
    "custom-RegularCake",
    "custom-CustomCake",
    "custom-WeddingCake",
  ];

  const bestsellers = products
    .flatMap((category) => category.types)
    .filter((item) => BESTSELLER_IDS.includes(item.id));

  const CustomPrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="hidden md:flex items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:scale-105 z-10 cursor-pointer transition-all duration-300 absolute"
      style={{ top: "-85px", right: "70px" }}
    >
      <MdChevronLeft className="text-2xl text-gray-900" />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
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
    infinite: false, 
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false, 
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: "-40px" }} className="block">
        <ul className="m-0 p-0 flex justify-center items-center gap-1"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#BE185D] transition-all duration-300 custom-dot"></div>
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4.5 } }, 
      { breakpoint: 1024, settings: { slidesToShow: 3.5 } },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 3.15,
          arrows: false,
          dots: false 
        } 
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.3, // Mobile Netflix peek (2 full cards + 30% of the 3rd)
          arrows: false,
          dots: false, // Hid dots for app feel
          centerMode: false, 
        },
      },
    ],
  };

  return (
    <div className="w-full py-16 md:py-20 px-0 md:px-12 lg:px-10 overflow-hidden">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto relative px-4 md:px-0">
        
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
          /* Tighter margins for a dense, app-like grid */
          .slick-list {
            margin: 0 -6px;
            padding: 10px 0 20px 0;
          }
          .slick-slide > div {
            padding: 0 6px;
          }
        `}</style>

        <div className="flex items-end justify-between px-2 md:px-0">
          <div className="flex flex-col gap-2">
            <div className="body-text text-[10px] md:text-xs font-bold flex items-center gap-3 tracking-widest text-[#BE185D] uppercase">
              <span className="w-6 h-[1px] bg-[#BE185D]"></span>
              Trending Now
            </div>
            <h2 className="heading-text text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Crowd <span className="text-[#BE185D] italic">Favorites</span>
            </h2>
          </div>
        </div>

        <div className="mt-2 md:mt-4">
          <Slider {...settings}>
            {bestsellers.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group flex flex-col cursor-pointer outline-none"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:rounded-[2rem] bg-gray-50 mb-3 shadow-sm group-hover:shadow-xl transition-all duration-500 block">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 lg:top-5 lg:left-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full body-text text-[9px] lg:text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-sm">
                    Top Pick
                  </div>
                  <div className="absolute inset-0 bg-gray-900/0 md:group-hover:bg-gray-900/10 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="hidden md:flex absolute bottom-5 left-1/2 transform -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="flex bg-gray-900 text-white px-6 py-3 rounded-full body-text text-[10px] font-bold uppercase tracking-widest shadow-lg items-center gap-2 whitespace-nowrap">
                      View Details <FaArrowRight className="text-[8px]" />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <h3 className="heading-text text-sm md:text-xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors line-clamp-1 leading-tight">
                    {item.name}
                  </h3>

                  <div className="mt-1">
                    {item.price ? (
                      <p className="heading-text text-sm md:text-lg font-bold text-[#BE185D]">
                        {currency}{Number(item.price).toLocaleString()}
                      </p>
                    ) : (
                      <p className="body-text text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#BE185D]">
                        Custom Order
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;