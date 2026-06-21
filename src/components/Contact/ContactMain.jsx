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
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 lg:gap-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-y-8 w-full lg:w-[45%] bg-white rounded-3xl shadow-lg border border-pink-200/40 p-8 md:p-12"
          >
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-sm font-medium mb-4">
                💌 Send a Message
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <ShortInput
                name="Full Name"
                type="text"
                for="fullName"
                placeholder="Name"
                error={error}
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Email"
                type="email"
                for="email"
                placeholder="Email"
                error={error}
                value={formData.email}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Phone Number"
                type="tel"
                for="phoneNumber"
                placeholder="Number"
                error={error}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Subject"
                type="text"
                for="subject"
                placeholder="Subject"
                error={error}
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wide text-gray-600">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border bg-white/70 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                  error ? 'border-red-400 focus:ring-red-300' : 'border-pink-200 focus:ring-pink-400'
                }`}
                value={formData.message}
                onChange={handleInputChange}
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="cursor-pointer h-14 w-full sm:w-[60%] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          <div className="w-full lg:w-[45%] min-h-[400px] rounded-3xl overflow-hidden shadow-lg border border-pink-200/40">
            <Map />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMain