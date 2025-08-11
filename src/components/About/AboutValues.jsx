import React from 'react'
import Values from './Values'
import ValuesContent from './ValuesContent'

const AboutValues = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium mb-6">
            💖 Our Principles
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            THESE ARE SOME OF OUR{" "}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent ">
              CORE VALUES
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {ValuesContent.map((values) => (
            <Values 
              key={values.id}
              img={values.img}
              name={values.name}
              content={values.content}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutValues
