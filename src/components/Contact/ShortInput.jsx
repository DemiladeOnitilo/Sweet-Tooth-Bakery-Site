import React from 'react';

const ShortInput = (props) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={props.htmlFor} className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
        {props.name}
      </label>
      <input
        type={props.type}
        name={props.htmlFor}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`w-full h-12 px-5 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 ${
          props.error
            ? 'border-red-400 focus:ring-1 focus:ring-red-400 focus:bg-white'
            : 'border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white'
        }`}
      />
    </div>
  );
};

export default ShortInput;