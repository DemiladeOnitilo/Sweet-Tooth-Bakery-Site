import React from "react";

const Carousel = () => {
  const tickerItems = [
    { text: "Baked Fresh Daily" },
    { text: "Artisanal Ingredients" },
    { text: "Handcrafted With Passion" },
    { text: "Bespoke Celebrations" },
    { text: "Uncompromising Quality" },
  ];

  return (
    <div
      className="relative w-full overflow-hidden bg-[#BE185D] py-5 md:py-6 my-16 shadow-md transform -rotate-2 group flex"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none items-center">
        {[...Array(4)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center">
            {tickerItems.map((item, index) => (
              <React.Fragment key={`${arrayIndex}-${index}`}>
                <span className="mx-6 md:mx-10 heading-text text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
                  {item.text}
                </span>
                
                <span className="text-pink-300 text-lg md:text-xl pb-1 opacity-80">
                  ✦
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;