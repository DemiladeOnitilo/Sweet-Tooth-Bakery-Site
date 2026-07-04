import React from 'react';

const ShortInput = (props) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor={props.for} className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {props.name}
      </label>
      <input
        type={props.type}
        name={props.for}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`w-full h-11 px-4 rounded-xl border bg-gray-50/30 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
          props.error
            ? 'border-red-400 focus:ring-red-200'
            : 'border-gray-200 focus:ring-pink-400/50 focus:border-pink-400'
        }`}
      />
    </div>
  );
};

export default ShortInput;