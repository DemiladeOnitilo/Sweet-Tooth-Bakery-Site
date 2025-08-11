<<<<<<< HEAD
import React from 'react';
import { useParams } from 'react-router-dom';
import ServicesHero from '../components/Services/ServicesHero';
import PastrySection from '../components/Services/PastrySection';
import ServiceSelection from '../components/Services/ServiceSelection';

const Category = () => {
  const { id } = useParams();

  return (
    <div className='flex flex-col gap-20'>
      <ServicesHero />
      <PastrySection 
        onPage={false}
        category={id} // Pass the category ID to filter pastries
      />
      <div className='bg-[url(https://static.vecteezy.com/system/resources/previews/046/630/849/non_2x/pattern-sweet-food-dessert-birthday-cake-with-candle-and-ice-cream-set-of-cute-icons-cartoon-holiday-attributes-drawing-doodles-seamless-background-vector.jpg)] bg-no-repeat bg-center bg-cover h-[30vh] mt-20'></div>
      <ServiceSelection />
    </div>
  );
};

=======
import React from 'react';
import { useParams } from 'react-router-dom';
import ServicesHero from '../components/Services/ServicesHero';
import PastrySection from '../components/Services/PastrySection';
import ServiceSelection from '../components/Services/ServiceSelection';

const Category = () => {
  const { id } = useParams();

  return (
    <div className='flex flex-col gap-20'>
      <ServicesHero />
      <PastrySection 
        onPage={false}
        category={id} // Pass the category ID to filter pastries
      />
      <div className='bg-[url(https://static.vecteezy.com/system/resources/previews/046/630/849/non_2x/pattern-sweet-food-dessert-birthday-cake-with-candle-and-ice-cream-set-of-cute-icons-cartoon-holiday-attributes-drawing-doodles-seamless-background-vector.jpg)] bg-no-repeat bg-center bg-cover h-[30vh] mt-20'></div>
      <ServiceSelection />
    </div>
  );
};

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default Category;