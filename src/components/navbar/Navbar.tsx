// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '@/assets/logo.svg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? 'text-white' : 'text-neutral'} hover:text-secondary`;

  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Voi Logo" className="h-8 w-auto" />
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/eventos" className={linkClass}>
            Eventos
          </NavLink>
          <NavLink to="/sobre-voi" className={linkClass}>
            Sobre Voi
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaTimes className="h-6 w-6 text-white" />
            ) : (
              <FaBars className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Actions (siempre visibles en desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/login" className={linkClass}>
            Iniciar Sesión
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-opacity ${
                isActive ? 'bg-white text-primary' : 'bg-secondary text-white hover:opacity-90'
              }`
            }
          >
            Registrarse
          </NavLink>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary px-4 pb-4 space-y-2">
          {['/', '/eventos', '/sobre-voi', '/login'].map((path, i) => {
            const label = ['Inicio', 'Eventos', 'Sobre Voi', 'Iniciar Sesión'][i];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={linkClass}
              >
                {label}
              </NavLink>
            );
          })}
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block py-2 bg-secondary text-center rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            Registrarse
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
