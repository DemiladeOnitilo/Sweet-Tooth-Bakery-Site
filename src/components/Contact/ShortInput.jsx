import React from 'react'

const ShortInput = (props) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={props.for} className='font-bold'>{props.name}</label>
        <input 
          type={props.type} 
          name={props.for}
          value={props.value} 
          placeholder={props.placeholder} 
          onChange={props.onChange} 
          className={ props.error ? 'w-[85%] h-12 border-b-1 border-red-500 focus:outline-none' : 'w-[85%] h-12 border-b-1 border-black focus:outline-none'}
        />
    </div>
  )
}

export default ShortInput