import React, { useState, useEffect } from "react";

const ContactHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] flex justify-center items-center mt-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww)] 
        bg-no-repeat bg-cover bg-center lg:bg-top transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          filter: "brightness(0.5)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-pink-800/30" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* original frosted glass design wrapper intact */}
        <div className="md:bg-white/10 md:backdrop-blur-md md:border border-white/20 md:rounded-3xl p-8 md:p-10 md:shadow-lg flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Get in{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          
          {/* New Description Content Inserted and Styled for contrast */}
          <p className="text-sm md:text-base text-white/90 font-medium max-w-md mx-auto leading-relaxed">
            Have a question about an order, a custom cake request, or just want to chat about pastries? Drop us a line!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;