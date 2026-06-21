import React from 'react'

const ShortInput = (props) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor={props.for} className="text-xs font-bold uppercase tracking-wide text-gray-600">
        {props.name}
      </label>
      <input
        type={props.type}
        name={props.for}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`w-full h-12 px-4 rounded-xl border bg-white/70 focus:outline-none focus:ring-2 transition-all duration-300 ${
          props.error
            ? 'border-red-400 focus:ring-red-300'
            : 'border-pink-200 focus:ring-pink-400'
        }`}
      />
    </div>
  )
}

export default ShortInput