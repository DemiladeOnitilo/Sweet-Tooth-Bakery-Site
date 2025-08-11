import React from 'react'
import GoalsCards from './GoalsCards'
import GoalsContent from './GoalsContent'

const Goals = ({ isHome = false }) => {
  const Goals = isHome ? GoalsContent.slice(0, 3) : GoalsContent

  return (
    <section className='relative py-10 bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30 overflow-hidden'>      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16 max-w-4xl mx-auto'>
          <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium mb-6'>
            ✨ Our Mission & Values
          </div>
          
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent'>
              Our Goals
            </span>
          </h2>
          
          <p className='text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto'>
            Our main goal is to play a{' '}
            <span className='text-pink-600 font-semibold'>symphony of flavors</span> in your mouth. 
            We bake for those who want to treat themselves to an{' '}
            <span className='text-purple-600 font-semibold'>honest dessert!</span> Stop time for a moment 
            and treat yourself or make your loved ones happy.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
          {Goals.map((goal, index) => (
            <GoalsCards 
              key={goal.id}
              img={goal.img}
              main={goal.main}
              content={goal.content}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Goals