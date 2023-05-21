import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 border-yellow-500 border-t-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between flex-wrap py-6">
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <svg
                className="fill-current h-8 w-8 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z"
                />
              </svg>
            </Link>
            <span className="font-semibold text-xl tracking-tight pr-4">ARB Store</span>
          </div>
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
              onClick={toggleMenu}
            >
              <svg
                className="h-3 w-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                />
              </svg>
            </button>
          </div>
          <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="text-sm lg:flex-grow">
              <Link
                to="/shop"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
              >
                Home
              </Link>
              <Link
                to="/orders"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
              >
                Orders
              </Link>
              <Link
                to="/cart"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white mr-4"
              >
                🛒 Cart
              </Link>
              <Link
                to="/customer-profile"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-white"
              >
                Profile
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
