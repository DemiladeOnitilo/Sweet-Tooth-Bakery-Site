import React from 'react'
import Hero from '../components/Home/Hero'
import CakeList from '../components/Home/CakeList'
import Goals from '../components/Goals'
import MainButton from '../components/MainButton'

const Home = () => {
  return (
    <div className='flex flex-col gap-y-10'>
      <Hero />
      <Goals 
        isHome = {true}
      />
      <div className='bg-[url(https://img.freepik.com/free-photo/close-up-hand-preparing-dessert_23-2148972041.jpg?t=st=1742476676~exp=1742480276~hmac=1db6886fba8af4069a7157b4569efe5aa330f96fa1aeceb70601921460e540a9&w=900)]
      bg-no-repeat bg-center bg-cover h-[90vh] lg:h-[70vh]  flex flex-col justify-center'>
          <div className='flex flex-col justify-center items-center gap-y-7 text-center p-12'>
            <h1 className='text-8xl font-extrabold sour-gummy'>FOR ALL YOUR SUGAR NEEDS</h1>
            <MainButton 
              link= '/Order'
              name= 'ORDER NOW'
            />          
        </div>
      </div>
      <CakeList />
    </div>
  )
}

export default Home