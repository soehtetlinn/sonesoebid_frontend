import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Fox News Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-brand-primary">ABOUT US</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-brand-accent text-white px-2 py-1 rounded text-xs font-bold">ABOUT</span>
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
              SHL Hub: Your Trusted Marketplace and News Destination
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              SHL Hub is a community-focused marketplace and news destination committed to 
              transparent commerce, safer payments, and high-quality editorial standards. 
              We publish policy- and society-relevant articles and guides to help users make 
              informed decisions.
            </p>
          </section>

          {/* Our Mission */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-primary text-white px-3 py-1 rounded text-sm font-bold">MISSION</span>
              OUR MISSION
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                At SHL Hub, we believe in creating a platform where commerce meets journalism. 
                Our mission is to provide a secure, transparent marketplace while delivering 
                high-quality news and analysis that keeps our community informed and engaged.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We are committed to upholding the highest standards of integrity, accuracy, 
                and fairness in both our marketplace operations and editorial content.
              </p>
            </div>
          </section>

          {/* Our Principles */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-secondary text-white px-3 py-1 rounded text-sm font-bold">VALUES</span>
              OUR PRINCIPLES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Transparency</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete transparency and fairness in listings and bidding processes. 
                  We ensure all transactions are conducted with full disclosure.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-brand-secondary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Security</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Security by design with modern protections. Your data and transactions 
                  are safeguarded with industry-leading security measures.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Quality</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  High-value content with references and editorial review. We maintain 
                  the highest standards in our news reporting and marketplace listings.
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-accent text-white px-3 py-1 rounded text-sm font-bold">STORY</span>
              OUR STORY
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Founded with the vision of creating a comprehensive platform that serves both 
                commerce and information needs, SHL Hub has grown from a simple marketplace 
                into a trusted destination for news, analysis, and community engagement.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our team of experienced journalists, developers, and business professionals 
                work tirelessly to ensure that our platform meets the evolving needs of our 
                community while maintaining the highest standards of quality and integrity.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, SHL Hub stands as a beacon of trust and reliability in the digital 
                marketplace, committed to serving our community with excellence and innovation.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Quick Facts */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4">
              <h3 className="text-xl font-bold text-white">QUICK FACTS</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Founded</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Headquarters</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Myanmar</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Platform Type</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Marketplace & News</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Focus Areas</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Commerce & Journalism</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-secondary to-brand-accent p-4">
              <h3 className="text-lg font-bold text-white">GET IN TOUCH</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">General Inquiries</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">contact@shltechent.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Business Partnerships</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">business@shltechent.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Media & Press</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">press@shltechent.com</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AboutPage;