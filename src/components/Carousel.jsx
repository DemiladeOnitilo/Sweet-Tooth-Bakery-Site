import React from "react";

const Carousel = () => {
  return (
    <div
      className="relative w-full h-24 overflow-hidden bg-gradient-to-r from-pink-50 via-white to-pink-50 flex items-center my-16"
      aria-hidden="true"
    >
      <div className="flex gap-12 animate-marquee whitespace-nowrap motion-reduce:animate-none">
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-4xl font-bold text-pink-300 sour-gummy">
              Sweet Delights
            </span>
            <span className="text-3xl">🍰</span>
            <span className="text-4xl font-bold text-pink-300 sour-gummy">
              Fresh Baked
            </span>
            <span className="text-3xl">🧁</span>
            <span className="text-4xl font-bold text-pink-300 sour-gummy">
              Made Daily
            </span>
            <span className="text-3xl">🎂</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Carousel;