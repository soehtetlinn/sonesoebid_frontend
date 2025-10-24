import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Fox News Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-brand-primary">TERMS OF SERVICE</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-brand-accent text-white px-2 py-1 rounded text-xs font-bold">TERMS</span>
            <span>Last Updated: {new Date().toLocaleDateString('en-US', { 
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
          {/* Introduction */}
          <section className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-8 rounded-lg border-l-4 border-brand-primary mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Terms of Service Agreement
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms of Service govern your use of SHL Hub. By using our services, you agree to 
              these terms and conditions. Please read them carefully before using our platform.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-primary text-white px-3 py-1 rounded text-sm font-bold">ACCEPTANCE</span>
              ACCEPTANCE OF TERMS
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                By accessing or using SHL Hub, you agree to be bound by these Terms of Service and 
                our Privacy Policy. If you do not agree to these terms, you may not use our services.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-200 font-semibold">
                  ⚠️ Important: These terms constitute a legally binding agreement between you and SHL Hub.
                </p>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-secondary text-white px-3 py-1 rounded text-sm font-bold">SERVICES</span>
              OUR SERVICES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Marketplace</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Buy and sell items through our platform</li>
                  <li>• Participate in auctions and bidding</li>
                  <li>• Access secure payment processing</li>
                  <li>• Benefit from buyer protection programs</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-brand-secondary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">News & Content</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Access high-quality news articles</li>
                  <li>• Read policy and society-relevant content</li>
                  <li>• Participate in community discussions</li>
                  <li>• Stay informed with breaking news updates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-accent text-white px-3 py-1 rounded text-sm font-bold">RESPONSIBILITIES</span>
              USER RESPONSIBILITIES
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Acceptable Use</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-green-600">✅ Allowed</h5>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Honest and accurate listings</li>
                    <li>• Respectful communication</li>
                    <li>• Compliance with applicable laws</li>
                    <li>• Proper use of platform features</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-red-600">❌ Prohibited</h5>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Fraudulent listings or bids</li>
                    <li>• Misuse of user data</li>
                    <li>• Harassment or abuse</li>
                    <li>• Violation of intellectual property</li>
                  </ul>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-semibold">
                  🚫 Violation of these terms may result in account suspension or termination.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">PAYMENT</span>
              PAYMENT TERMS
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Secure Payments</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All transactions are processed through secure payment gateways
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">R</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Refund Policy</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Refunds processed according to our dispute resolution procedures
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">F</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Fees</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Transparent fee structure with no hidden charges
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Liability and Disclaimers */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">LIABILITY</span>
              LIABILITY AND DISCLAIMERS
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We provide our services "as-is" to the extent permitted by law. While we strive to 
                maintain high standards, we cannot guarantee uninterrupted service or error-free operation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Service Availability</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We strive for 99.9% uptime but cannot guarantee uninterrupted service due to 
                    maintenance, updates, or unforeseen circumstances.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Dispute Resolution</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Dispute processes are available for eligible transactions. We provide mediation 
                    services to help resolve conflicts between users.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Quick Navigation */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4">
              <h3 className="text-xl font-bold text-white">QUICK NAVIGATION</h3>
            </div>
            <div className="p-4 space-y-3">
              <a href="#acceptance" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Acceptance of Terms
              </a>
              <a href="#services" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Our Services
              </a>
              <a href="#responsibilities" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                User Responsibilities
              </a>
              <a href="#payments" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Payment Terms
              </a>
              <a href="#liability" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Liability & Disclaimers
              </a>
            </div>
          </div>

          {/* Legal Contact */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-secondary to-brand-accent p-4">
              <h3 className="text-lg font-bold text-white">LEGAL CONTACT</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Questions about these Terms of Service?
              </p>
              <p className="text-brand-primary font-semibold text-sm">legal@shltechent.com</p>
            </div>
          </div>

          {/* Terms Updates */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-accent to-brand-primary p-4">
              <h3 className="text-lg font-bold text-white">TERMS UPDATES</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                We may update these Terms of Service from time to time. Continued use of our 
                services constitutes acceptance of any changes.
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TermsOfServicePage;