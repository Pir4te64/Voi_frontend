// src/components/navbar/MobileMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const { isAuthenticated, logout } = useAuth();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `text-2xl ${isActive ? 'text-secondary' : 'text-white/80'} hover:text-secondary`;

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
            <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-secondary blur-3xl filter" />

            {/* Glow bottom-right */}
            <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-secondary blur-3xl filter" />

            {/* Close button */}
            <button onClick={onClose} className="absolute right-4 top-4">
                <FaTimes className="h-6 w-6" />
            </button>

            {/* Nav links comunes */}
            <NavLink to="/" onClick={onClose} className={linkClass}>
                Inicio
            </NavLink>
            <NavLink to="/eventos" onClick={onClose} className={linkClass}>
                Eventos
            </NavLink>
            <NavLink to="/sobre-voi" onClick={onClose} className={linkClass}>
                Sobre Voi
            </NavLink>

            {/* Acciones según auth */}
            {isAuthenticated ? (
                <>
                    <NavLink
                        to="/dashboard"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `text-lg px-3 py-1.5 rounded-lg ${isActive ? 'bg-white text-primary' : 'bg-secondary text-white hover:opacity-90'
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <button
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-lg font-semibold transition hover:bg-red-700"
                    >
                        Cerrar sesión
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login" onClick={onClose} className={linkClass}>
                        Iniciar Sesión
                    </NavLink>
                    <NavLink
                        to="/register"
                        onClick={onClose}
                        className="mt-4 rounded-lg bg-secondary px-4 py-2 text-lg font-semibold hover:opacity-90"
                    >
                        Registrarse
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default MobileMenu;
