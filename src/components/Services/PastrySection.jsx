import React from 'react';
import Sliders from '../Sliders';
import { products } from '../products';
import ViewAll from '../ViewAll';
import MainButton from '../MainButton';

const PastrySection = ({ onPage = true, category }) => {
  const filteredProducts = category
    ? products.filter((product) => product.name.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className='flex flex-col items-center justify-center text-center gap-4'>
      {filteredProducts.map((product, index) => {
        return (
          <div key={index} className='flex flex-col justify-center items-center gap-8 w-full'>
            {onPage ? (
              <div className='flex flex-col gap-y-5 justify-center lg:flex-row lg:justify-between items-center w-200'>
                <h1 className='text-5xl border-b-2 sour-gummy'>{product.name}</h1>
                <MainButton link={`/category/${product.name}`} name="ViewAll" />
              </div>
            ) : (
              <h1 className='text-5xl border-b-2 sour-gummy'>{product.name}</h1>
            )}
            <Sliders 
              main={product.types} 
              onPage={onPage} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default PastrySection;
