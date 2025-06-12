// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import logo from '@/assets/Logo.svg';
import MobileMenu from '@/components/navbar/MobileMenu';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? 'text-white' : 'text-neutral'} hover:text-secondary`;

  return (
    <nav className="relative z-20 bg-primary text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Voi Logo" className="h-8 w-auto" />
        </NavLink>

        {/* Desktop links */}
        <div className="hidden space-x-8 md:flex">
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
        <div className="hidden items-center space-x-4 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-opacity ${isActive
                    ? 'bg-white text-primary'
                    : ' text-white hover:opacity-90 hover:text-secondary'
                  }`
                }
              >
                Dashboard
              </NavLink>
             
              <button
                onClick={logout}
                className="rounded-lg bg-secondary px-4 py-2 text-white transition hover:bg-secondary/90"
              >
                Cerrar sesión
              </button>
              <NavLink
                to="#"
                className="flex items-center gap-2 text-white hover:text-secondary"
              >
                <FaShoppingCart className="text-xl" />
              </NavLink>
            </>
          ) : (
            <>
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
              <NavLink
                to="/carrito"
                className="flex items-center gap-2 text-white hover:text-secondary"
              >
                <FaShoppingCart className="text-xl" />
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navbar;