<<<<<<< HEAD
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center gap-y-2 mt-40'>
        <FaExclamationTriangle className='text-9xl text-yellow-300 mt-[10px]'/> 
        <h1 className='text-6xl'>404 NOT FOUND</h1>
        <p className='text-3xl'>This page does not exist</p>
        <Link to='/' className='bg-[#f86a82] rounded-md p-[8px] m-4 text-2xl hover:bg-black hover:text-[#f86a82]'>GO BACK</Link>
    </div>
  )
}

=======
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center gap-y-2 mt-40'>
        <FaExclamationTriangle className='text-9xl text-yellow-300 mt-[10px]'/> 
        <h1 className='text-6xl'>404 NOT FOUND</h1>
        <p className='text-3xl'>This page does not exist</p>
        <Link to='/' className='bg-[#f86a82] rounded-md p-[8px] m-4 text-2xl hover:bg-black hover:text-[#f86a82]'>GO BACK</Link>
    </div>
  )
}

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default NotFoundPage