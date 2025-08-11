import React from 'react'
import GoalsCards from './GoalsCards'
import GoalsContent from './GoalsContent'

const Goals = ({ isHome = false}) => {

  const Goals = isHome ? GoalsContent.slice(0,3) : GoalsContent

  return (
    <div className='flex flex-col gap-y-5 items-center w-screen'>
        <div className='flex flex-col justify-center items-center gap-y-8 text-center w-[70%]'>
          <h1 className=' text-6xl underline underline-offset-12 decoration-3 sour-gummy'>OUR GOALS</h1>
          <p className='text-2xl'>Our main goal is to play a symphony of flavors in your mouth. We bake for those who want to treat themselves to an honest dessert! Stop time for a moment and treat yourself or make your loved ones happy.</p>
        </div>
        <div className='flex flex-col lg:grid lg:grid-row-2 lg:grid-cols-3 lg:gap-4'>
          {Goals.map((goals) => {
              return(
                <GoalsCards 
                  key={goals.id}
                  img= {goals.img}
                  main= {goals.main}
                  content= {goals.content}
                />
              )
            }
          )}
        </div>
    </div>
  )
}

export default Goals