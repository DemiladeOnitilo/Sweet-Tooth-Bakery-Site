import React from "react";

const AboutMain = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6 md:px-12">
        
        <p className="body-text text-sm md:text-base font-bold tracking-widest text-[#BE185D] uppercase mb-4">
          Our Heritage
        </p>
        
        <h2 className="heading-text text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          The Story Behind <br/>
          <span className="text-[#BE185D] italic">Sweet Tooth</span> Bakery
        </h2>
        
        <div className="body-text text-base md:text-lg text-gray-600 leading-relaxed space-y-6 text-left md:text-center">
          <p>
            Sweet Tooth Bakery was born in the heart of Lagos from a passion for creating 
            <span className="text-gray-900 font-semibold"> irresistible cakes and pastries </span> 
            that bring joy to every celebration. Inspired by the warmth of Nigerian family 
            gatherings and the vibrant flavors of our culture, we craft treats that are as 
            beautiful as they are delicious.
          </p>
          <p>
            Our journey began with our founder’s grandmother, who baked for weddings, 
            birthdays, and Sunday afternoons, filling homes with the aroma of vanilla, 
            coconut, and freshly baked bread. Today, we carry forward her legacy, blending 
            traditional recipes with creative twists to surprise and delight our customers.
          </p>
          <p className="text-gray-900 font-medium text-lg pt-4 italic">
            "Whether you’re celebrating a milestone or simply craving something sweet, 
            Sweet Tooth Bakery is here to make every bite a memory worth savoring."
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default AboutMain;