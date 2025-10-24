import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-black text-white mt-auto border-t border-gray-700 dark:border-gray-600">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} SHL Hub. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
            <Link to="/about" className="hover:underline text-gray-300">About</Link>
            <Link to="/contact" className="hover:underline text-gray-300">Contact</Link>
            <Link to="/disputes" className="hover:underline text-gray-300">Dispute Center</Link>
            <Link to="/privacy" className="hover:underline text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline text-gray-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;