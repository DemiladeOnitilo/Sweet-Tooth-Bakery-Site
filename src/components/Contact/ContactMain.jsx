<<<<<<< HEAD
import React, { useState } from 'react'
import Map from './Map'
import ShortInput from './ShortInput'

const ContactMain = () => {

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { fullName, email, phoneNumber, subject, message } = formData;

    if (!fullName || !email || !phoneNumber || !subject || !message) {
      setError('All fields are required.');
      return;
    }

    alert('Message Sent!');
    setError('');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: ''
    });
  }

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center lg:h-[70vh] w-full lg:w-[80%] lg:m-auto lg:p-10'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-y-10 w-full lg:h-[70vh] lg:w-[40%] bg-gray-400 p-15'>
            <h1 className='text-5xl font-bold'>Contact Us</h1>
          <div className='grid grid-cols-2 grid-row-2 gap-y-12 gap-x-2'>
            <ShortInput 
              name='Full Name'
              type='text'
              for='fullName'
              placeholder='Name'
              error={error}
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <ShortInput 
              name='Email'
              type='email'
              for='email'
              placeholder='Email'
              error={error}
              value={formData.email}
              onChange={handleInputChange}
            />
            <ShortInput 
              name='Phone Number'
              type='tel'
              for='phoneNumber'
              placeholder='Number'
              error={error}
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <ShortInput 
              name='Subject'
              type='text'
              for='subject'
              placeholder='Subject'
              error={error}
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="message" className='font-bold'>Message</label>
            <input 
              type="text" 
              name="message" 
              placeholder='Message' 
              className={ error ? 'w-full h-27 border-b-1 border-red-500 focus:outline-none' : 'w-full h-27 border-b-1 border-black focus:outline-none'}
              value={formData.message}
              onChange={handleInputChange}
            />
            <p className='text-red-600 text-xl'>{error}</p>
          </div>
          <div>
            <button className='cursor-pointer h-15 w-full lg:w-[30%] bg-pink-200 hover:bg-black hover:text-pink-200 rounded-xl'>Send Message</button>
          </div>
        </form>
        <Map />
      </div>
  )
}

=======
import React, { useState } from 'react'
import Map from './Map'
import ShortInput from './ShortInput'

const ContactMain = () => {

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { fullName, email, phoneNumber, subject, message } = formData;

    if (!fullName || !email || !phoneNumber || !subject || !message) {
      setError('All fields are required.');
      return;
    }

    alert('Message Sent!');
    setError('');
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: ''
    });
  }

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center lg:h-[70vh] w-full lg:w-[80%] lg:m-auto lg:p-10'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-y-10 w-full lg:h-[70vh] lg:w-[40%] bg-gray-400 p-15'>
            <h1 className='text-5xl font-bold'>Contact Us</h1>
          <div className='grid grid-cols-2 grid-row-2 gap-y-12 gap-x-2'>
            <ShortInput 
              name='Full Name'
              type='text'
              for='fullName'
              placeholder='Name'
              error={error}
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <ShortInput 
              name='Email'
              type='email'
              for='email'
              placeholder='Email'
              error={error}
              value={formData.email}
              onChange={handleInputChange}
            />
            <ShortInput 
              name='Phone Number'
              type='tel'
              for='phoneNumber'
              placeholder='Number'
              error={error}
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <ShortInput 
              name='Subject'
              type='text'
              for='subject'
              placeholder='Subject'
              error={error}
              value={formData.subject}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="message" className='font-bold'>Message</label>
            <input 
              type="text" 
              name="message" 
              placeholder='Message' 
              className={ error ? 'w-full h-27 border-b-1 border-red-500 focus:outline-none' : 'w-full h-27 border-b-1 border-black focus:outline-none'}
              value={formData.message}
              onChange={handleInputChange}
            />
            <p className='text-red-600 text-xl'>{error}</p>
          </div>
          <div>
            <button className='cursor-pointer h-15 w-full lg:w-[30%] bg-pink-200 hover:bg-black hover:text-pink-200 rounded-xl'>Send Message</button>
          </div>
        </form>
        <Map />
      </div>
  )
}

>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
export default ContactMain