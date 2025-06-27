import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-24">
          <div className="hidden md:flex items-center space-x-12">
            <a className="relative group">
              <span className="text-gray-800 transition-colors duration-300 group-hover:text-black">
                Projects
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a className="relative group">
              <span className="text-gray-800 transition-colors duration-300 group-hover:text-black">
                Services
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
          <div className="flex items-center">
            <h1 className="text-3xl font-light text-black  tracking-widest transition-all duration-300 hover:tracking-[0.2em] cursor-pointer">
              NextPress
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <a className="relative group">
              <span className="text-gray-800 transition-colors duration-300 group-hover:text-black">
                About
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a className="relative group">
              <span className="text-gray-800 transition-colors duration-300 group-hover:text-black">
                Contact
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <svg
              className="h-6 w-6 transition-transform duration-300 hover:rotate-90 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
