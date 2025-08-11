<<<<<<< HEAD
import React from 'react'
import logo from '../assets/Images/sweet-tooth-logo.png'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {

    function refreshPage(){ 
        window.location.reload = window.parent.location.href; 
    }

  return (
    <div>
        <div className='mt-20 bg-[url(https://static.vecteezy.com/system/resources/thumbnails/053/280/078/small_2x/delicious-assortment-of-gourmet-cakes-with-fresh-berries-photo.jpeg)] 
        bg-cover bg-center bg-no-repeat opacity-50 h-[40vh] flex justify-center items-center text-center '>
            <h1 className='text-6xl '>FOR ALL OUR <span className='text-[#f86a82]'>SWEET TOOTH</span> OUT THERE</h1>
        </div>
        <div className='bg-pink-200 h-[90vh] md:h-[60vh] lg:h-[50vh] flex flex-col justify-center items-center gap-y-15 md:flex-row md:justify-between md:items-center lg:flex-row lg:justify-between lg:items-center p-10 md:p-10 lg:p-15'>
            <div className='text-4xl dancing-script col-span-2 flex flex-col justify-center items-center gap-y-5 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-y-5 text-center'>
                <Link onClick={refreshPage} to='/' className='flex text-5xl md:text-4xl lg:text-6xl'><img src={logo} alt='Sweet Tooth logo' className='h-15 md:h-10 lg:h-20 rounded-full'/>Sweet Tooth</Link>
                <div className='text-3xl text-black flex gap-x-4 '>
                    <Link className='hover:text-white' to='https://www.instagram.com/'><FaInstagram /></Link>
                    <Link className='hover:text-white' to='https://www.facebook.com/'><FaFacebook /></Link>
                    <Link className='hover:text-white' to='https://www.x.com/'><FaTwitter /></Link>
                    <Link className='hover:text-white' to='https://www.youtube.com/'><FaYoutube /></Link>
                    <Link className='hover:text-white' to='https://www.tiktok.com/'><FaTiktok /></Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-y-5'>
                <h2  className='text-3xl underline underline-offset-8 '>Quick Links</h2>
                <div className='grid grid-rows-3 grid-cols-2 gap-10 text-xl'>
                    <Link onClick={refreshPage} className='hover:text-white' to='/'>Home</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/About'>About</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Services'>Services</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Contacts'>Contacts</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Services'>Order</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Join'>Join</Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-y-[15px] w-50'>
                <h2  className='text-4xl text-4xl'>Contacts Us</h2>
                <p className='flex items-center gap-x-2'><FaPhone />+234 12345678910</p>
                <p className='flex items-center gap-x-2 '><FaEnvelope />sweettooth@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

=======
import React from 'react'
import logo from '../assets/Images/sweet-tooth-logo.png'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {

    function refreshPage(){ 
        window.location.reload = window.parent.location.href; 
    }

  return (
    <div>
        <div className='mt-20 bg-[url(https://static.vecteezy.com/system/resources/thumbnails/053/280/078/small_2x/delicious-assortment-of-gourmet-cakes-with-fresh-berries-photo.jpeg)] 
        bg-cover bg-center bg-no-repeat opacity-50 h-[40vh] flex justify-center items-center text-center '>
            <h1 className='text-6xl '>FOR ALL OUR <span className='text-[#f86a82]'>SWEET TOOTH</span> OUT THERE</h1>
        </div>
        <div className='bg-pink-200 h-[90vh] md:h-[60vh] lg:h-[50vh] flex flex-col justify-center items-center gap-y-15 md:flex-row md:justify-between md:items-center lg:flex-row lg:justify-between lg:items-center p-10 md:p-10 lg:p-15'>
            <div className='text-4xl dancing-script col-span-2 flex flex-col justify-center items-center gap-y-5 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-y-5 text-center'>
                <Link onClick={refreshPage} to='/' className='flex text-5xl md:text-4xl lg:text-6xl'><img src={logo} alt='Sweet Tooth logo' className='h-15 md:h-10 lg:h-20 rounded-full'/>Sweet Tooth</Link>
                <div className='text-3xl text-black flex gap-x-4 '>
                    <Link className='hover:text-white' to='https://www.instagram.com/'><FaInstagram /></Link>
                    <Link className='hover:text-white' to='https://www.facebook.com/'><FaFacebook /></Link>
                    <Link className='hover:text-white' to='https://www.x.com/'><FaTwitter /></Link>
                    <Link className='hover:text-white' to='https://www.youtube.com/'><FaYoutube /></Link>
                    <Link className='hover:text-white' to='https://www.tiktok.com/'><FaTiktok /></Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-y-5'>
                <h2  className='text-3xl underline underline-offset-8 '>Quick Links</h2>
                <div className='grid grid-rows-3 grid-cols-2 gap-10 text-xl'>
                    <Link onClick={refreshPage} className='hover:text-white' to='/'>Home</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/About'>About</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Services'>Services</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Contacts'>Contacts</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Services'>Order</Link>
                    <Link onClick={refreshPage} className='hover:text-white' to='/Join'>Join</Link>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-y-[15px] w-50'>
                <h2  className='text-4xl text-4xl'>Contacts Us</h2>
                <p className='flex items-center gap-x-2'><FaPhone />+234 12345678910</p>
                <p className='flex items-center gap-x-2 '><FaEnvelope />sweettooth@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default Footer