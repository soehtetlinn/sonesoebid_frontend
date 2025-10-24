import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Fox News Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-brand-primary">CONTACT US</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-brand-accent text-white px-2 py-1 rounded text-xs font-bold">CONTACT</span>
            <span>{new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })}</span>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-lg border-l-4 border-brand-primary mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Get In Touch With Our Team
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Have feedback, need support, or want to partner with us? We're here to help. 
              Reach out to us through any of the channels below, and we'll get back to you promptly.
            </p>
          </section>

          {/* Contact Form */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-primary text-white px-3 py-1 rounded text-sm font-bold">FORM</span>
              SEND US A MESSAGE
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-secondary text-white px-3 py-1 rounded text-sm font-bold">INFO</span>
              CONTACT INFORMATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800 text-center">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Support</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Technical assistance and general inquiries</p>
                <p className="text-brand-primary font-semibold">support@shltechent.com</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800 text-center">
                <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Business</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Partnerships and business opportunities</p>
                <p className="text-brand-primary font-semibold">business@shltechent.com</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800 text-center">
                <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Media</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Press inquiries and media relations</p>
                <p className="text-brand-primary font-semibold">press@shltechent.com</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Quick Contact */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4">
              <h3 className="text-xl font-bold text-white">QUICK CONTACT</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">General Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">support@shltechent.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Business Inquiries</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">business@shltechent.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Press & Media</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">press@shltechent.com</p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-secondary to-brand-accent p-4">
              <h3 className="text-lg font-bold text-white">RESPONSE TIME</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Support</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">24-48 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Business</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">2-3 business days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Press</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">24 hours</span>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-accent to-brand-primary p-4">
              <h3 className="text-lg font-bold text-white">OFFICE HOURS</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Monday - Friday</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Saturday</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sunday</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Closed</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">All times are in Myanmar Standard Time (MST)</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ContactPage;