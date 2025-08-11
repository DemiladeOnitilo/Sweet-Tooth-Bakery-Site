import React from 'react'

const Values = (props) => {
  return (
    <div className='flex flex-col justify-center items-center lg:flex-row  bg-pink-200 h-120 w-90 md:h-150 md:w-130 lg:h-100 lg:w-170 rounded-xl'>
        <img className='w-full h-[70%] lg:h-full lg:w-[60%] rounded-xl' src={props.img} />
        <div className='flex flex-col justify-center items-center text-center h-[30%] w-[70%] lg:h-full lg:w-[40%] p-9'>
            <h2 className='text-xl md:text-3xl lg:text-3xl font-bold sour-gummy'>{props.name}</h2>
            <p className='md:text-xl lg:text-lg'>{props.content}</p>
        </div>
    </div>
  )
}

export default Values