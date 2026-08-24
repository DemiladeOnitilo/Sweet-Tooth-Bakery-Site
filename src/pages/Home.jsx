import React from "react";

import Hero from "../components/Home/Hero";
import CakeList from "../components/Home/CakeList";
import Goals from "../components/Goals";
import CTASection from "../components/Home/CTASection";
import NewArrivals from "../components/Newarrivals";
import BestSellers from "../components/BestSellers";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <BestSellers />
      <Goals isHome={true} />
      <NewArrivals />
      <CTASection />
      <CakeList />
    </div>
  );
};

export default Home;
