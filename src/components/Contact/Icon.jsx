import React from 'react'

const Icon = ({ img, name, info }) => {
  return (
    <div className="relative group flex flex-col justify-center items-center gap-y-4 text-center w-full md:w-[30%] lg:w-[22%] p-8 rounded-3xl bg-white shadow-lg hover:scale-[1.03] transition-all duration-700">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-50 via-white to-purple-50 -z-10" />
      <div className="bg-gradient-to-br from-pink-500 to-purple-500 h-20 w-20 rounded-full flex justify-center items-center shadow-md group-hover:scale-110 transition-transform duration-700">
        {img}
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">
          {name}
        </h2>
        <p className="text-sm text-gray-700">{info}</p>
      </div>
      <div className="absolute inset-0 rounded-3xl border border-pink-300/40 group-hover:border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.15)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] transition-all duration-700 pointer-events-none" />
    </div>
  )
}

export default Icon