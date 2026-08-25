import React from "react";

const StepIndicator = ({ current, total }) => (
  <div className="flex items-center justify-center gap-2 mb-8 mt-4">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-[2px] rounded-full transition-all duration-500 ${
          i <= current ? "bg-[#BE185D] w-8" : "bg-gray-200 w-4"
        }`}
      />
    ))}
  </div>
);

export default StepIndicator;
