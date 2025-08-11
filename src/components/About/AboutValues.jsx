<<<<<<< HEAD
import React from 'react'
import Values from './Values'
import ValuesContent from './ValuesContent'

const AboutValues = () => {
  return (
    <>
        <div className='flex flex-col gap-y-15 justify-center items-center text-center w-screen'>
            <div>
                <h1 className='text-3xl '>
                    THESE ARE SOME OF OUR <span className='text-pink-200 font-bold sour-gummy'>CORE VALUES</span>
                </h1>
            </div>
            <div className='flex flex-col justify-center items-center gap-y-12 lg:grid lg:grid-row-2 lg:grid-cols-2 lg:gap-2'>
                {ValuesContent.map((values) => {
                    return(
                        <Values 
                            key={values.id}
                            img={values.img}
                            name={values.name}
                            content={values.content}
                        />
                    )
                })}
                
            </div>
        </div>
    </>
  )
}

=======
import React from 'react'
import Values from './Values'
import ValuesContent from './ValuesContent'

const AboutValues = () => {
  return (
    <>
        <div className='flex flex-col gap-y-15 justify-center items-center text-center w-screen'>
            <div>
                <h1 className='text-3xl '>
                    THESE ARE SOME OF OUR <span className='text-pink-200 font-bold sour-gummy'>CORE VALUES</span>
                </h1>
            </div>
            <div className='flex flex-col justify-center items-center gap-y-12 lg:grid lg:grid-row-2 lg:grid-cols-2 lg:gap-2'>
                {ValuesContent.map((values) => {
                    return(
                        <Values 
                            key={values.id}
                            img={values.img}
                            name={values.name}
                            content={values.content}
                        />
                    )
                })}
                
            </div>
        </div>
    </>
  )
}

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default AboutValues