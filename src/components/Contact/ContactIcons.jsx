import React from 'react';
import Icon from './Icon';
import { FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContactIcons = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white via-pink-50/10 to-purple-50/20 border-t border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-center items-stretch gap-4 sm:gap-6">
          <Icon
            img={<FaLocationArrow className="text-xl text-white" />}
            name="Our Bakery"
            info="No 1, Sweet Tooth Street, Victoria Island, Lagos, Nigeria."
          />
          <Icon
            img={<FaPhone className="text-xl text-white" />}
            name="Call Us"
            info="+234 1234 567 8910"
          />
          {/* Col-span hack perfectly centers the third box item on tablet displays */}
          <div className="sm:col-span-2 lg:col-span-1 lg:w-1/3 flex justify-center w-full">
            <Icon
              img={<FaEnvelope className="text-xl text-white" />}
              name="Email Us"
              info="orders@sweettooth.com"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactIcons;