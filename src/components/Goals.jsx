import React from "react";
import GoalsCards from "./GoalsCards";
import GoalsContent from "./GoalsContent";

const Goals = ({ isHome = false }) => {
  const Goals = isHome ? GoalsContent.slice(0, 3) : GoalsContent;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <p className="body-text text-sm md:text-base font-bold tracking-widest text-[#BE185D] uppercase mb-3">
            Our Philosophy
          </p>
          
          <h2 className="heading-text text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Crafting a Symphony of <span className="text-[#BE185D] italic">Flavors</span>
          </h2>
          
          <p className="body-text text-base md:text-lg font-medium text-gray-600 leading-relaxed">
            We bake for those who want to treat themselves to an honest dessert. 
            Stop time for a moment and treat yourself or make your loved ones happy 
            with uncompromising quality and passion.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {Goals.map((goal) => (
            <GoalsCards
              key={goal.id}
              img={goal.img}
              main={goal.main}
              content={goal.content}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Goals;