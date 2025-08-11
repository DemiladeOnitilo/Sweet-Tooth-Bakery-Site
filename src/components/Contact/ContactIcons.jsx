<<<<<<< HEAD
import React from 'react'
import Icon from './Icon'
import { FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa'

const ContactIcons = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-x-10'>
        <Icon 
          img={<FaLocationArrow className='text-2xl text-white'/>}
          name='Address:'
          info='No 1, Sweet Tooth Street, Lagos, Nigeria.'
        />
        <Icon 
           img={<FaPhone className='text-2xl text-white'/>}
           name='Phone Number:'
           info='+234 12345678910'
        />
        <Icon 
           img={<FaEnvelope className='text-2xl text-white'/>}
           name='Email:'
          info='sweettooth@gmail.com'
        />
      </div>
  )
}

=======
import React from 'react'
import Icon from './Icon'
import { FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa'

const ContactIcons = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-x-10'>
        <Icon 
          img={<FaLocationArrow className='text-2xl text-white'/>}
          name='Address:'
          info='No 1, Sweet Tooth Street, Lagos, Nigeria.'
        />
        <Icon 
           img={<FaPhone className='text-2xl text-white'/>}
           name='Phone Number:'
           info='+234 12345678910'
        />
        <Icon 
           img={<FaEnvelope className='text-2xl text-white'/>}
           name='Email:'
          info='sweettooth@gmail.com'
        />
      </div>
  )
}

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default ContactIcons