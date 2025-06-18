import React from 'react'
import { Audio } from 'react-loader-spinner'
import { useParams } from "react-router-dom";
import { products } from "../components/products"
import CakeCard from '../components/CakeCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const Products = () => {

  const { id } = useParams();

  const { currency } = useSelector((state) => state.cart)

  const allProducts = products.flatMap(category => category.types);

  const product = allProducts.find(item => item.id === id);

  const category = products.find(cat => cat.types.find(item => item.id === id))

  if (!category || !category.types) return null;

  const relatedProducts = category?.types?.filter(item => item.id !==id) || [];

  const recommendedCategories = products.filter(cat => cat.name !== category.name);

  const recommendedItems = recommendedCategories.filter(product => product.id !== id).slice(0, 4)

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    
    dispatch(addToCart(product));
  }

  if (!product) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center px-4 lg:px-16 py-10 gap-20'>
      
      <div className='flex flex-col lg:flex-row gap-10 bg-white p-5 rounded-xl shadow-lg mt-40'>
        <div className='w-full lg:w-1/2 flex justify-center items-center'>
          <img 
            src={product.img} 
            alt={product.name} 
            className='rounded-2xl shadow-lg max-h-[600px] object-cover w-full'
          />
        </div>

        <div className='w-full lg:w-1/2 flex flex-col justify-center gap-6'>
          <h1 className='text-5xl font-bold text-gray-800 sour-gummy'>{product.name}</h1>
          <p className='text-3xl font-semibold'>{currency}{product.price}</p>
          <p className='text-2xl text-gray-600 w-[80%]'>{product.description}</p>
          <div>
            <h2 className='text-xl font-semibold mb-2'>Ingredients:</h2>
            {product.ingredients && product.ingredients.length > 0 ? (
              <ul className='list-disc list-inside space-y-1 text-xl'>
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-500 italic'>No ingredients listed.</p>
            )}
          </div>
          <div className='bg-black p-[15px] text-xl text-center rounded-[10px] hover:bg-gray-700 text-pink-200 cursor-pointer' onClick={handleAddToCart}>
            <p>Add to cart</p>
          </div>
        </div>
      </div>
      <div 
        className='w-full h-[10vh] bg-[url(https://static.vecteezy.com/system/resources/previews/046/630/849/non_2x/pattern-sweet-food-dessert-birthday-cake-with-candle-and-ice-cream-set-of-cute-icons-cartoon-holiday-attributes-drawing-doodles-seamless-background-vector.jpg)] 
        bg-cover bg-center rounded-xl shadow-inner' 
      />

      <div className='flex flex-col justify-center items-center gap-10'>
        <h1 className='text-5xl sour-gummy'>Related Offers</h1>
        { relatedProducts.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {relatedProducts.map(item => (
              <div key={item.id} className="min-w-[200px] flex-shrink-0">
                <CakeCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <p className='text-2xl'>No Related Products</p>
        )}
      </div>

      <div className='flex flex-col justify-center items-center gap-10'>
        <h1 className='text-5xl sour-gummy'>You Might Also Like</h1>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {recommendedItems.map(item => (
            <div key={item.id} className="min-w-[200px] flex-shrink-0">
              <CakeCard {...item} isHome={true}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
