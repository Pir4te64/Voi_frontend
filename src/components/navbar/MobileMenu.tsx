// src/components/MobileMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    return (
        <div
            className={`
        fixed inset-0
        bg-primary 
        flex flex-col pt-16 items-center space-y-8 text-white z-50
        transition-opacity duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
        >
            {/* Glow top-left */}
            <div className="
        absolute top-0 -left-10 
        w-40 h-40
        bg-secondary
        rounded-full
        filter blur-3xl
        pointer-events-none
      "/>

            {/* Glow bottom-right */}
            <div className="
        absolute bottom-0 -right-10
        w-40 h-40
        bg-secondary
        rounded-full
        filter blur-3xl
        pointer-events-none
      "/>

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4"
            >
                <FaTimes className="h-6 w-6" />
            </button>

            {/* Nav links */}
            {['/', '/eventos', '/sobre-voi', '/login'].map((path, i) => {
                const label = ['Inicio', 'Eventos', 'Sobre Voi', 'Iniciar Sesión'][i];
                return (
                    <NavLink
                        key={path}
                        to={path}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `text-2xl ${isActive ? 'text-secondary' : 'text-white/80'} hover:text-secondary`
                        }
                    >
                        {label}
                    </NavLink>
                );
            })}

            {/* Registrarse */}
            <NavLink
                to="/register"
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-secondary rounded-lg text-xl font-semibold hover:opacity-90"
            >
                Registrarse
            </NavLink>
        </div>
    );
};

export default MobileMenu;
