import React from 'react'
import ContactHero from '../components/Contact/ContactHero'
import ContactMain from '../components/Contact/ContactMain'
import ContactIcons from '../components/Contact/ContactIcons'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div className='flex flex-col'>
      <ContactHero />
      <ContactMain />
      <ContactIcons />
      <NewsLetter />
    </div>
  )
}

export default Contact