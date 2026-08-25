import React from 'react';
import { FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactIcons = () => {
  const contactMethods = [
    {
      icon: <FaLocationArrow />,
      title: "Our Bakery",
      sub: "No 1, Sweet Tooth St, VI",
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      sub: "+234 123 456 7891",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      sub: "hello@sweettooth.com",
    },
  ];

  return (
    <section className="w-full bg-[#FCFBF9] py-12 md:py-16 px-6 border-y border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 text-center">
        {contactMethods.map((item, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center justify-center w-full group ${
              index === 1 ? "md:border-x md:border-gray-200 md:px-12" : "md:px-12"
            }`}
          >
            <div className="text-3xl md:text-4xl mb-5 text-[#BE185D] transform group-hover:-translate-y-1 transition-transform duration-300">
              {item.icon}
            </div>
            
            <h3 className="heading-text text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            
            <p className="body-text text-xs md:text-sm text-gray-500 uppercase tracking-widest leading-relaxed">
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactIcons;