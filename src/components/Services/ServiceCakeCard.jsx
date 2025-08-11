import React from "react";
import { Link } from "react-router-dom";

const ServiceCakeCard = ({ name, img, id }) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-y-2 justify-center items-center">
      <Link
        to={`/category/${id}`}
        onClick={refreshPage}
        className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
      >
        <img
          src={img}
          alt={name} 
          className="h-40 w-40 md:h-80 md:w-80 lg:h-60 lg:w-60 shadow-md max-w-xs transition duration-300 ease-in-out hover:scale-110"
        />
      </Link>
      <Link
        to={`/category/${id}`}
        onClick={refreshPage}
        className="text-4xl hover:text-[#f86a82]"
      >
        <h1 className="text-4xl sour-gummy">{name}</h1>
      </Link>
    </div>
  );
};

export default ServiceCakeCard;