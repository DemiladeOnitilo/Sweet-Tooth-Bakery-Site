import React from 'react'

const GoalsCards = (props) => {
  return (
    <div className='p-8 w-100 flex flex-col items-center text-center gap-y-8'>
            <img src={props.img} className='w-100 h-80 rounded-[300px]'/>
        <div>
            <h1 className='text-3xl text-pink-200 font-semibold sour-gummy'>{props.main}</h1>
            <p className='text-lg'>{props.content}</p>
        </div>
       
    </div>
  )
}

export default GoalsCards