import React from 'react'
import AboutHero from '../components/About/AboutHero'
import AboutValues from '../components/About/AboutValues'
import AboutMain from '../components/About/AboutMain'
import Goals from '../components/Goals'

const About = () => {
  return (
    <div className='flex flex-col gap-y-30'>
      <AboutHero />
      <AboutMain />
      <AboutValues /> 
      <Goals />
    </div>
  )
}

export default About