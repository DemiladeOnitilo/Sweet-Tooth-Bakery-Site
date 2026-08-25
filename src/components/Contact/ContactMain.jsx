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
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Form Column */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 flex flex-col justify-between gap-y-6 bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm"
          >
            <div className="space-y-2 mb-2">
              <h2 className="heading-text text-3xl md:text-4xl font-bold text-gray-900">
                Send a <span className="text-[#BE185D] italic">Message</span>
              </h2>
              <p className="body-text text-sm text-gray-500">
                We typically reply within 1-2 business hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ShortInput
                name="Full Name"
                type="text"
                htmlFor="fullName"
                placeholder="Your full name"
                error={error}
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Email"
                type="email"
                htmlFor="email"
                placeholder="hello@example.com"
                error={error}
                value={formData.email}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Phone Number"
                type="tel"
                htmlFor="phoneNumber"
                placeholder="080 1234 5678"
                error={error}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <ShortInput
                name="Subject"
                type="text"
                htmlFor="subject"
                placeholder="How can we help?"
                error={error}
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-y-2 mt-2">
              <label htmlFor="message" className="body-text text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your order or request..."
                rows={5}
                className={`w-full px-5 py-4 rounded-2xl border bg-gray-50/50 body-text text-sm focus:outline-none transition-all duration-300 resize-none ${
                  error 
                    ? 'border-red-400 focus:ring-1 focus:ring-red-400 focus:bg-white' 
                    : 'border-gray-200 focus:border-[#BE185D] focus:ring-1 focus:ring-[#BE185D] focus:bg-white'
                }`}
                value={formData.message}
                onChange={handleInputChange}
              />
              {error && <p className="body-text text-red-500 font-semibold text-xs mt-1">⚠️ {error}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-fit px-10 py-3.5 rounded-full bg-[#BE185D] text-white font-bold text-xs tracking-widest hover:bg-[#9D174D] shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer uppercase body-text"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Interactive Map Column */}
          <div className="lg:col-span-5 min-h-[400px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
            <Map />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMain;