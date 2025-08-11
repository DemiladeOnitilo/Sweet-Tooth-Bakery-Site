import React, { useState, useEffect } from 'react';
import MainButton from '../MainButton';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='relative h-screen flex justify-center items-center overflow-hidden'>
      {/* Background Image with Parallax */}
      <div 
        className='absolute inset-0 bg-[url(https://img.freepik.com/free-photo/chocolate-coffee-vanilla-gluten-free-marble-cake-homemade-pound-cake_114579-5318.jpg?t=st=1742464082~exp=1742467682~hmac=35508b9f6533510ab2c05708264f07ee4568683b419bc5b60a7f3543b2ec9918&w=996)] 
        bg-no-repeat bg-cover bg-center transition-transform duration-300 ease-out'
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-pink-900/40 via-purple-900/30 to-pink-800/50' />
      
      {/* Floating Elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse' />
      <div className='absolute bottom-32 right-16 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce' />
      <div className='absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg' style={{ animation: '6s ease-in-out infinite' }} />
      
      {/* Hero Content */}
      <div className='relative z-10 max-w-4xl mx-auto px-20 text-center mt-15'>
        {/* Glass Morphism Card */}
        <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl transform hover:scale-105 transition-all duration-500'>
          {/* Badge */}
          <div className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full text-white text-sm font-medium mb-6 animate-pulse'>
            ✨ Premium Bakery Experience
          </div>
          
          {/* Main Heading */}
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
            Welcome to{' '}
            <br />
            <span className='bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent animate-pulse'>
              Sweet Tooth Bakery
            </span>
            <br />
          </h1>
          
          {/* Subtitle */}
          <p className='text-lg md:text-xl text-pink-100 mb-8 max-w-2xl mx-auto leading-relaxed'>
            Indulge in top notch pastries crafted with love, where every bite tells a story of 
            <span className='text-pink-300 font-semibold'> exceptional taste</span> and 
            <span className='text-purple-300 font-semibold'> premium quality</span>
          </p>
          
          {/* Stats */}
          <div className='flex flex-wrap justify-center gap-6 mb-8'>
            <div className='text-center'>
              <div className='text-2xl md:text-3xl font-bold text-pink-300'>10K+</div>
              <div className='text-sm text-pink-200'>Happy Customers</div>
            </div>
            <div className='w-px h-12 bg-pink-300/30' />
            <div className='text-center'>
              <div className='text-2xl md:text-3xl font-bold text-purple-300'>50+</div>
              <div className='text-sm text-purple-200'>Unique Recipes</div>
            </div>
            <div className='w-px h-12 bg-pink-300/30' />
            <div className='text-center'>
              <div className='text-2xl md:text-3xl font-bold text-yellow-300'>5★</div>
              <div className='text-sm text-yellow-200'>Premium Quality</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-10 justify-center items-center'>
            <MainButton
              name='EXPLORE MENU'
              link='/Services'
              variant='primary'
            />
            <MainButton
              name='WATCH OUR STORY'
              link='/About'
              variant='secondary'
            />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className='absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce'>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-sm'>Scroll to explore</span>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
            </svg>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Hero;