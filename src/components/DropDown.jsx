import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const DropDown = ({open, setOpen}) => {

    function refreshPage(){ 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpen(false)
    }
    
  return (
    <AnimatePresence mode='wait'>
        {
            open && (
                <motion.div 
                    initial={{ opacity: 0, y: -50}}
                    animate={{ opacity: 1, y: 0}}
                    exit={{ opacity: 0, y: -50}}
                    transition={{duration: 0.3}}
                    className='absolute h-screen w-full fixed top-20 md:top-40 left-0 z-20 lg:hidden'
                >
                    <div className='bg-pink-200 text-2xl rounded-3xl m-6 font-semibold'>
                        <ul className='flex flex-col justify-center items-center'>
                            <li><NavLink onClick={refreshPage} to='/About' className="w-220 h-22 flex justify-center items-center text-black rounded-lg">About</NavLink></li>
                            <li><NavLink onClick={refreshPage} to='/Services' className="w-220 h-22 flex justify-center items-center text-black rounded-lg">Services</NavLink></li>
                            <li><NavLink onClick={refreshPage} to='/Contact' className="w-220 h-22 flex justify-center items-center text-black rounded-lg">Contact</NavLink></li>
                        </ul>
                    </div>
                </motion.div>    
            )
        }
    </AnimatePresence>
  )
}

export default DropDown