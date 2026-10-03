import React from "react";
import GoalsCards from "./GoalsCards";
import GoalsContent from "./GoalsContent";

const Goals = ({ isHome = false }) => {
  const GoalsList = isHome ? GoalsContent.slice(0, 3) : GoalsContent;

  return (
    <section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            <p className="body-text text-[10px] md:text-sm md:text-base font-bold tracking-widest text-[#BE185D] uppercase">
              Our Vision
            </p>
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
          </div>
          
          <h2 className="heading-text text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            More than just baking. <br className="hidden md:block" />
            It's an <span className="text-[#BE185D] italic">Experience.</span>
          </h2>
          
          <p className="body-text text-base md:text-xl text-gray-600 leading-relaxed">
            Stop time for a moment and treat yourself. We bake for those who 
            want to experience honest desserts crafted with uncompromising passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {GoalsList.map((goal, index) => (
            <GoalsCards
              key={goal.id}
              img={goal.img}
              main={goal.main}
              content={goal.content}
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Goals;