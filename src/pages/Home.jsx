import React from 'react'
import Hero from '../components/Home/Hero'
import CakeList from '../components/Home/CakeList'
import Goals from '../components/Goals'
import MainButton from '../components/MainButton'
import CTASection from '../components/Home/CTASection'

const Home = () => {
  return (
    <div className='flex flex-col gap-y-10'>
      <Hero />
      <Goals 
        isHome = {true}
      />
      <CTASection />
      <CakeList />
    </div>
  )
}

export default Home