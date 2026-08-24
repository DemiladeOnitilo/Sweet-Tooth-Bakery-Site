const StepIndicator = ({ current, total }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i <= current ? "bg-gradient-to-r from-pink-500 to-purple-500 w-8" : "bg-gray-200 w-4"
        }`}
      />
    ))}
  </div>
);

export default StepIndicator;