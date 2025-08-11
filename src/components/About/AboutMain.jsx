import React from "react";

const AboutMain = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium mb-6">
            🍰 Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              About Sweet Tooth Bakery
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Sweet Tooth Bakery was born in the heart of Lagos from a passion for creating 
            <span className="text-pink-600 font-semibold"> irresistible cakes and pastries</span> 
            that bring joy to every celebration. Inspired by the warmth of Nigerian family 
            gatherings and the vibrant flavors of our culture, we craft treats that are as 
            beautiful as they are delicious.
            <br /><br />
            Our journey began with our founder’s grandmother, who baked for weddings, birthdays, 
            and Sunday afternoons, filling homes with the aroma of vanilla, coconut, and freshly 
            baked bread. Today, we carry forward her legacy, blending traditional recipes with 
            creative twists to surprise and delight our customers.
            <br /><br />
            Whether you’re celebrating a milestone or simply craving something sweet, Sweet Tooth 
            Bakery is here to make every bite a memory worth savoring.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;
