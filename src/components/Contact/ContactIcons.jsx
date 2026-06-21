import React from 'react'
import Icon from './Icon'
import { FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa'

const ContactIcons = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium mb-6">
            📍 Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            WAYS TO{" "}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              REACH US
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-6">
          <Icon
            img={<FaLocationArrow className="text-2xl text-white" />}
            name="Address"
            info="No 1, Sweet Tooth Street, Lagos, Nigeria."
          />
          <Icon
            img={<FaPhone className="text-2xl text-white" />}
            name="Phone Number"
            info="+234 12345678910"
          />
          <Icon
            img={<FaEnvelope className="text-2xl text-white" />}
            name="Email"
            info="sweettooth@gmail.com"
          />
        </div>
      </div>
    </section>
  )
}

export default ContactIcons