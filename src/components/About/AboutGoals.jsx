<<<<<<< HEAD
import React from 'react'
import GoalsCards from '../GoalsCards'
import GoalsContent from '../GoalsContent'

const AboutGoals = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-6xl underline underline-offset-12 decoration-3 sour-gummy'>OUR GOALS</h1>
        <p className='text-xl'>HERE IS ALL YOU NEED TO KNOW ABOUT US</p>
        <div className='grid grid-row-2 grid-cols-3'>
          {GoalsContent.map((goals) => {
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

=======
import React from 'react'
import GoalsCards from '../GoalsCards'
import GoalsContent from '../GoalsContent'

const AboutGoals = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-6xl underline underline-offset-12 decoration-3 sour-gummy'>OUR GOALS</h1>
        <p className='text-xl'>HERE IS ALL YOU NEED TO KNOW ABOUT US</p>
        <div className='grid grid-row-2 grid-cols-3'>
          {GoalsContent.map((goals) => {
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

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default AboutGoals