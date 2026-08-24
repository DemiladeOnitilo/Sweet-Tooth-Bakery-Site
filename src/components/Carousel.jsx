import React from "react";

const Carousel = () => {
  const tickerItems = [
    { text: "Baked Fresh Daily", icon: "🧁" },
    { text: "Premium Ingredients", icon: "✨" },
    { text: "Handcrafted With Love", icon: "💖" },
    { text: "Custom Cake Designs", icon: "🎂" },
    { text: "Sweet Tooth Magic", icon: "✨" },
  ];

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 py-10 my-16 shadow-[0_8px_30px_rgb(236,72,153,0.2)] transform -rotate-1 group"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...Array(4)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center">
            {tickerItems.map((item, index) => (
              <React.Fragment key={`${arrayIndex}-${index}`}>
                <span className="mx-6 text-2xl md:text-5xl font-extrabold text-white uppercase tracking-widest sour-gummy drop-shadow-md">
                  {item.text}
                </span>
                <span className="text-2xl md:text-5xl drop-shadow-md opacity-90 pb-1">
                  {item.icon}
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
