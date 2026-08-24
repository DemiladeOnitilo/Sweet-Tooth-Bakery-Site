import React from "react";
import Values from "./Values";
import ValuesContent from "./ValuesContent";

const AboutValues = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <p className="body-text text-sm md:text-base font-bold tracking-widest text-[#BE185D] uppercase mb-3">
            Our Principles
          </p>
          <h2 className="heading-text text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            What We Stand <span className="text-[#BE185D] italic">For</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {ValuesContent.map((value) => (
            <Values
              key={value.id}
              img={value.img}
              name={value.name}
              content={value.content}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default AboutValues;