// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '@/assets/logo.svg';
import MobileMenu from '@/components/navbar/MobileMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? 'text-white' : 'text-neutral'} hover:text-secondary`;

  return (
    <nav className="bg-primary text-white relative z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Voi Logo" className="h-8 w-auto" />
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClass}>Inicio</NavLink>
          <NavLink to="/eventos" className={linkClass}>Eventos</NavLink>
          <NavLink to="/sobre-voi" className={linkClass}>Sobre Voi</NavLink>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className="h-6 w-6 text-white" />
            ) : (
              <FaBars className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/login" className={linkClass}>Iniciar Sesión</NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-opacity ${isActive
                ? 'bg-white text-primary'
                : 'bg-secondary text-white hover:opacity-90'
              }`
            }
          >
            Registrarse
          </NavLink>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navbar;
