import React from 'react'

const Icon = (props) => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-4 md:w-[30%] lg:w-[20%] text-center'>
        <div className='bg-pink-200 h-24 w-24 rounded-full flex justify-center items-center'>
            {props.img}
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold text-xl sour-gummy'>{props.name}</h1>
            <p className='text-sm'>{props.info}</p>
        </div>
    </div>
  )
}

export default Icon