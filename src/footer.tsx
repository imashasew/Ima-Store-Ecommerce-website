// Footer.tsx
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; 2025 My E-commerce Store. All rights reserved.</p>
        <p>Follow us on social media: 
          <a href="https://facebook.com" className="text-blue-500">Facebook</a> | 
          <a href="https://twitter.com" className="text-blue-500">Twitter</a> | 
          <a href="https://instagram.com" className="text-blue-500">Instagram</a>
        </p>
      </div>
    </footer>
  );
};
