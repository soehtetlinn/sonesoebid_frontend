import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Fox News Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-brand-primary">PRIVACY POLICY</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-brand-accent text-white px-2 py-1 rounded text-xs font-bold">POLICY</span>
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
              Your Privacy Matters to Us
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              We respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains what data we collect, how we use it, and the choices 
              you have regarding your information.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-primary text-white px-3 py-1 rounded text-sm font-bold">DATA</span>
              INFORMATION WE COLLECT
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Account Information</h5>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Name and email address</li>
                    <li>• Username and password</li>
                    <li>• Phone number (optional)</li>
                    <li>• Profile information</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Transaction Data</h5>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Payment and billing information</li>
                    <li>• Order history and details</li>
                    <li>• Shipping addresses</li>
                    <li>• Communication records</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Usage Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Data</h5>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• IP address and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Operating system</li>
                    <li>• Cookies and tracking data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Behavioral Data</h5>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Pages visited and time spent</li>
                    <li>• Search queries and preferences</li>
                    <li>• Click-through rates</li>
                    <li>• User interactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-secondary text-white px-3 py-1 rounded text-sm font-bold">USE</span>
              HOW WE USE YOUR INFORMATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Service Delivery</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Process transactions and orders</li>
                  <li>• Provide customer support</li>
                  <li>• Deliver news and content</li>
                  <li>• Maintain platform functionality</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-brand-secondary rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Improvement</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Analyze usage patterns</li>
                  <li>• Improve user experience</li>
                  <li>• Develop new features</li>
                  <li>• Personalize content</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-brand-accent text-white px-3 py-1 rounded text-sm font-bold">RIGHTS</span>
              YOUR RIGHTS AND CHOICES
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Access</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Request access to your personal data and understand how it's used
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Correction</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Correct or update inaccurate personal information
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">D</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Deletion</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Request deletion of your personal data under certain circumstances
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-3">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">SECURITY</span>
              DATA SECURITY
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. These measures 
                include encryption, secure servers, and regular security audits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Technical Safeguards</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• SSL encryption for data transmission</li>
                    <li>• Secure data storage and backup</li>
                    <li>• Regular security updates</li>
                    <li>• Access controls and monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Organizational Measures</h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Employee training and awareness</li>
                    <li>• Privacy by design principles</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular compliance audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4">
              <h3 className="text-xl font-bold text-white">QUICK LINKS</h3>
            </div>
            <div className="p-4 space-y-3">
              <a href="#data-collection" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Information We Collect
              </a>
              <a href="#data-use" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                How We Use Data
              </a>
              <a href="#your-rights" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Your Rights
              </a>
              <a href="#data-security" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Data Security
              </a>
              <a href="#contact" className="block text-sm text-brand-primary hover:text-brand-secondary transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact Privacy */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-brand-secondary to-brand-accent p-4">
              <h3 className="text-lg font-bold text-white">PRIVACY CONTACT</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Questions about this Privacy Policy or your personal data?
              </p>
              <p className="text-brand-primary font-semibold text-sm">privacy@shltechent.com</p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-accent to-brand-primary p-4">
              <h3 className="text-lg font-bold text-white">POLICY UPDATES</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new Privacy Policy on this page.
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

export default PrivacyPolicyPage;