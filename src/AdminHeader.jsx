import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConsoleSideBar from './Consolesidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 border-yellow-500 border-t-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between flex-wrap py-6">
            <ConsoleSideBar />
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
            <span className="font-semibold text-xl tracking-tight pr-4">ARB Store (Admin)</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
