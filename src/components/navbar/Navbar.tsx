// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import logo from '@/assets/Logo.svg';
import MobileMenu from '@/components/navbar/MobileMenu';
import { useAuth } from '@/context/AuthContext';
import SidebarCompras from '@/components/SidebarCompras/SidebarCompras';
import { useSidebarComprasStore } from '@/components/SidebarCompras/store/useSidebarComprasStore';
import { useCarritoStore } from '@/components/SidebarCompras/store/useCarritoStore';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout, me } = useAuth();
  const { toggleSidebar } = useSidebarComprasStore();
  const { items } = useCarritoStore();

  const totalItems = items.length;

  // Función para verificar si debe mostrar el carrito
  const shouldShowCart = () => {
    return isAuthenticated && me?.roles?.includes('ROLE_USUARIO');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? 'text-white' : 'text-neutral'} hover:text-secondary`;

  const CartIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <div className="relative">
      <FaShoppingCart className={className} />
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-black">
          {totalItems}
        </span>
      )}
    </div>
  );

  return (
    <>
      <nav className={`fixed left-0 right-0 top-0 z-[999] bg-primary text-white transition-shadow duration-300 ${isScrolled ? 'shadow-lg shadow-black/20' : ''
        }`}>
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

          {/* Mobile buttons */}
          <div className="flex items-center gap-4 md:hidden">
            {shouldShowCart() && (
              <button
                onClick={toggleSidebar}
                className="flex items-center gap-2 text-white hover:text-secondary"
              >
                <CartIcon />
              </button>
            )}
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
                {shouldShowCart() && (
                  <button
                    onClick={toggleSidebar}
                    className="flex items-center gap-2 text-white hover:text-secondary"
                  >
                    <CartIcon className="text-xl" />
                  </button>
                )}
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
                {shouldShowCart() && (
                  <button
                    onClick={toggleSidebar}
                    className="flex items-center gap-2 text-white hover:text-secondary"
                  >
                    <CartIcon className="text-xl" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile full-screen menu */}
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </nav>
      {/* Spacer para compensar el navbar fijo */}
      <div className="h-[60px]" />
      <SidebarCompras />
    </>
  );
};

export default Navbar;