import React from "react";

const Values = ({ img, name, content }) => {
  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition-all duration-700 min-h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100 -z-10"></div>
      <img
        src={img}
        alt={name}
        className="w-full h-70 object-cover rounded-t-3xl transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="relative z-10 p-6 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {name}
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed">{content}</p>
      </div>

      <div className="absolute inset-0 rounded-3xl border border-pink-300/40 group-hover:border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.2)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-700"></div>
    </div>
  );
};

export default Values;
