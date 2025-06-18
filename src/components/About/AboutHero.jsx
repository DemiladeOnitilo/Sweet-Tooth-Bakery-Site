import React from 'react'

const AboutHero = () => {
  return (
    <div className='h-[90vh] md:h-[100vh] lg:h-[50vh] lg:mt-30  flex flex-col justify-center items-center gap-y-10 
    text-center bg-[url(https://s.hdnux.com/photos/01/41/75/66/25681283/3/rawImage.jpg)] 
    bg-no-repeat bg-cover bg-center'>
      <div className='flex flex-col justify-center items-center text-center gap-y-[30px] bg-pink-200 h-[40%] w-[80%] md:w-[60%] lg:w-[30%] p-10 rounded-tr-[40%] rounded-br-[20%] rounded-bl-[40%] rounded-tl-[20%] opacity-80'>
        <h1 className='text-5xl md:text:5xl lg:text-6xl sour-gummy'>
            Get To Know Us
        </h1>
      </div>
    </div>
  )
}

export default AboutHero