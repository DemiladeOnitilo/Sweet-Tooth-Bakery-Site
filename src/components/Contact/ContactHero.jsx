import React from 'react'

const ContactHero = () => {
  return (
    <div className='bg-[url(https://img.freepik.com/free-photo/black-woman-talking-phone_53876-128553.jpg?t=st=1742384861~exp=1742388461~hmac=261fb1ea1e1c844fac18e94e39cfece474169f0b24894163a215a1407cd25426&w=1380)] 
    bg-no-repeat bg-cover bg-center lg:bg-top h-[90vh] md:h-[100vh] lg:h-[50vh] lg:mt-30 flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center text-center gap-y-[30px] bg-pink-200 h-[40%] w-[80%] md:w-[60%] lg:w-[30%] p-10 rounded-tr-[40%] rounded-br-[20%] rounded-bl-[40%] rounded-tl-[20%] opacity-80'>
        <h1 className='text-5xl md:text:5xl lg:text-6xl sour-gummy'>Contact Us</h1>
      </div>
    </div>
  )
}

export default ContactHero