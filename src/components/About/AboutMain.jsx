import React from "react";

const AboutMain = () => {
  return (
    <section className="relative py-10 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30 overflow-hidden">
      <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex gap-2 justify-center items-center w-fit px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs lg:text-sm font-medium">
            🍰 Our Story
          </div>
          <div className="flex flex-col gap-2 items-center text-center max-w-4xl mx-auto px-4">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase">
                About Sweet Tooth Bakery
              </span>
            </h1>
            <p className="text-md md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Sweet Tooth Bakery was born in the heart of Lagos from a passion
              for creating
              <span className="text-pink-600 font-semibold">
                {" "}
                irresistible cakes and pastries{" "}
              </span>
              that bring joy to every celebration. Inspired by the warmth of
              Nigerian family gatherings and the vibrant flavors of our culture,
              we craft treats that are as beautiful as they are delicious.
              <br />
              <br />
              Our journey began with our founder’s grandmother, who baked for
              weddings, birthdays, and Sunday afternoons, filling homes with the
              aroma of vanilla, coconut, and freshly baked bread. Today, we
              carry forward her legacy, blending traditional recipes with
              creative twists to surprise and delight our customers.
              <br />
              <br />
              Whether you’re celebrating a milestone or simply craving something
              sweet, Sweet Tooth Bakery is here to make every bite a memory
              worth savoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;
