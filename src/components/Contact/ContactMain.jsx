import React, { useState } from 'react';
import Map from './Map';
import ShortInput from './ShortInput';

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
    setFormData({ fullName: '', email: '', phoneNumber: '', subject: '', message: '' });
  }

  return (
    <section className="relative py-10 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Fluid Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Form Side Column */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 flex flex-col justify-between gap-y-6 bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm"
          >
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Send a Message</h2>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">We typically reply within 1-2 business hours.</p>
            </div>

            {/* FIXED INPUT RESPONSIVENESS: Stacks perfectly on small viewports */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ShortInput
                name="Full Name"
                type="text"
                for="fullName"
                placeholder="Your full name"
                error={error}
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Email"
                type="email"
                for="email"
                placeholder="example@gmail.com"
                error={error}
                value={formData.email}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Phone Number"
                type="tel"
                for="phoneNumber"
                placeholder="080 1234 5678"
                error={error}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Subject"
                type="text"
                for="subject"
                placeholder="How can we help?"
                error={error}
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your order or request..."
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/30 focus:outline-none focus:ring-2 transition-all duration-200 text-sm resize-none ${
                  error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-pink-400/50 focus:border-pink-400'
                }`}
                value={formData.message}
                onChange={handleInputChange}
              />
              {error && <p className="text-red-500 font-semibold text-xs mt-1">⚠️ {error}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-fit px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm tracking-wide shadow-md shadow-pink-500/10 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer uppercase"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Interactive Map Section Column */}
          <div className="lg:col-span-5 min-h-[320px] sm:min-h-[400px] rounded-3xl overflow-hidden shadow-xs border border-gray-100 bg-gray-50">
            <Map />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMain;