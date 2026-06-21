import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import ServicesHero from "../components/Services/ServicesHero";
import PastrySection from "../components/Services/PastrySection";
import ServiceSelection from "../components/Services/ServiceSelection";
import Carousel from "../components/Carousel";
import { products } from "../components/products";

const Category = () => {
  const { id } = useParams();
  const category = products.find(
    (cat) => cat.id === id || cat.name.toLowerCase() === id?.toLowerCase(),
  );

  return (
    <div className="flex flex-col">
      <ServicesHero />

      <PastrySection onPage={false} category={id} />

      <Carousel />

      <ServiceSelection
        excludeId={category?.id}
        badge="🧁 Keep Exploring"
        title="OTHER"
        highlight="CATEGORIES"
        subtitle="Loved this? Here's everything else we bake fresh, daily."
      />
    </div>
  );
};

export default Category;
