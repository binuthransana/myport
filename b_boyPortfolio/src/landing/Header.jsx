import React from 'react';

function Header() {
  return (
    <header className="w-full fixed top-0 z-50 flex justify-between items-center p-6 bg-transparent backdrop-blur-sm border-b-2 border-synth-purple">
      {/* Brand Logo */}
      <div className="font-arcade text-synth-cyan text-xl text-glow-cyan cursor-pointer transition-all hover:text-white">
        BINUTH RANSANA
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 font-orbitron text-sm tracking-widest uppercase">
        <li>
          <a href="#about" className="text-gray-300 hover:text-synth-pink hover:text-glow-pink transition-all duration-300">
            About
          </a>
        </li>
        <li>
          <a href="#projects" className="text-gray-300 hover:text-synth-cyan hover:text-glow-cyan transition-all duration-300">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className="text-gray-300 hover:text-synth-yellow transition-all duration-300">
            Contact
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;