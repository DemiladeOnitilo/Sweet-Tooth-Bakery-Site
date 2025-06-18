import React, { useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa';
import { FaRightFromBracket } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';

const NewsLetter = () => {

    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(null);

    function handleChange(event){
        setEmail(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        let emailVal = /\S+@\S+\.\S+/.test(email);
        if(email.trim() === "" || !emailVal){
            setIsEmailValid(false)
        } else {
            setIsEmailValid(true)
            setEmail("")
        }
    }

  return (
    <div className=' h-[50vh] flex flex-col justify-center items-center gap-y-5'>
        <div className='flex flex-col justify-center items-center text-center gap-y-5 bg-pink-200 h-full md:h-[70%] lg:h-[60%] w-[80%] md:w-[60%] lg:w-[40%] p-10 rounded-tr-[40%] rounded-br-[20%] rounded-bl-[40%] rounded-tl-[20%] opacity-80'>
            <h1 className='text-6xl sour-gummy'>NEWS-LETTER</h1>
            <p className='text-2xl'>Subscribe to our news-letter</p>
            <form className='relative' onSubmit={handleSubmit}>
                <input type='email' placeholder='Enter your email' value={email} onChange={handleChange} className='border-2 border-black h-15 w-50 md:w-110 lg:w-130 p-3 rounded-4xl outline-none' />
                    {isEmailValid === false && <FaExclamationCircle className='w-7 h-7 absolute right-13 top-4 text-red-500'/>}
                    {isEmailValid === true && <FaCircleCheck className='w-7 h-7 absolute right-13 top-4 text-green-500'/>}
                <button type='submit' className='absolute right-3 top-4 cursor-pointer'>
                    <FaRightFromBracket className='w-7 h-7 hover:text-pink-600'/> 
                </button>
            </form>
        </div>
    </div>
  )
}

export default NewsLetter