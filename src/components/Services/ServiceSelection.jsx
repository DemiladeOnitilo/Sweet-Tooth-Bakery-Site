import React from 'react'
import ServiceCakeCard from './ServiceCakeCard'
import { MdChevronLeft } from "react-icons/md";
import { products } from '../products'
import { Link } from 'react-router-dom';

const ServiceSelection = ({onService = false}) => {

  function refreshPage(){ 
    window.scrollTo({ top: 0, behavior: 'smooth' });    
  }

  let back = onService ? <Link to='/Services' onClick={refreshPage} className='absolute left-0'>
  <MdChevronLeft className='h-10 w-10 bg-black text-white rounded-3xl'/>
</Link> : null

  return (
    <div className='flex flex-col gap-y-5 items-center justify-center text-center lg:h-[40vh] '>
        <div className='flex justify-center items-center w-320 relative'>
            {back}
            <h1 className='text-6xl sour-gummy'>Selections</h1>
        </div>
        <div className='grid grid-row-3 grid-cols-2 gap-3 md:gap-5 lg:gap-10 lg:flex lg:gap-x-4 lg:justify-center lg:items-center w-auto'>        
              {products.map((pastry => 
                {
                  return(
                    <div key={pastry.id}>
                      <Link to={`/category/${pastry.id}`} onClick={refreshPage} className='flex flex-col gap-y-2 justify-center items-center'>
                        <ServiceCakeCard {...pastry}/>
                      </Link>
                    </div>
                  )
                }
              ))}

        </div>
    </div>
  )
}

export default ServiceSelection