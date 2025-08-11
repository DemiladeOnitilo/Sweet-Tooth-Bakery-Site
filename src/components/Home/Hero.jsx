import React from 'react'
import MainButton from '../MainButton'

const Hero = () => {
  return (
    <div className='h-[90vh] md:h-[100vh] lg:h-[85vh] flex justify-center  items-center gap-y-[30px] text-center lg:mt-30 
    bg-[url(https://img.freepik.com/free-photo/chocolate-coffee-vanilla-gluten-free-marble-cake-homemade-pound-cake_114579-5318.jpg?t=st=1742464082~exp=1742467682~hmac=35508b9f6533510ab2c05708264f07ee4568683b419bc5b60a7f3543b2ec9918&w=996)] 
     bg-no-repeat bg-cover bg-center'>
        <div className='flex flex-col justify-end items-center gap-y-[30px] bg-pink-200 h-auto w-[80%] md:w-[60%] lg:w-[30%] p-10 rounded-tr-[40%] rounded-br-[20%] rounded-bl-[40%] rounded-tl-[20%] opacity-80'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-5xl md:text:5xl lg:text-6xl sour-gummy'>
                Welcome
                <br /> 
                To
                <br />
                Sweet Tooth
                <br /> 
                Bakery</h1>
            <p className='text-2xl'>Home to the best pastries on the planet</p>
          </div>
          <div className='flex justify-center items-center '>
            <MainButton
              name='JOIN US'
              link='/Join'
            />
          </div>
        </div>
    </div>
  )
}

export default Hero 