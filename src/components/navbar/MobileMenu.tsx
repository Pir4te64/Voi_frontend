// src/components/navbar/MobileMenu.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes, FaHome, FaCalendarAlt, FaInfoCircle, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import logoPequeno from "@/assets/Logo.svg";
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const { isAuthenticated, logout } = useAuth();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `text-xl z-50 flex items-center gap-3 ${isActive ? 'text-secondary' : 'text-white/80'} hover:text-secondary`;

    return (
        <div
            className={`
        fixed inset-0
        bg-primary 
        flex flex-col pt-16 items-start px-4 space-y-6 text-white z-50
        transition-opacity duration-300 ease-in-out
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
        >
            {/* Logo pequeño */}
            <div className="absolute left-3 top-5">
                <Link to="/" className="relative h-8 w-8">
                    <span className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-secondary opacity-80 blur-3xl filter" />
                    <img
                        src={logoPequeno}
                        alt="Logo Pequeño"
                        className="relative z-10 w-full cursor-pointer object-cover"
                    />
                </Link>
            </div>

            {/* Close button */}
            <button onClick={onClose} className="absolute right-4 top-1">
                <FaTimes className="h-6 w-6" />
            </button>

            {/* Nav links comunes */}
            <NavLink to="/" onClick={onClose} className={linkClass}>
                <FaHome className="text-md" />
                Inicio
            </NavLink>
            <NavLink to="/eventos" onClick={onClose} className={linkClass}>
                <FaCalendarAlt className="text-md" />
                Eventos
            </NavLink>
            <NavLink to="/sobre-voi" onClick={onClose} className={linkClass}>
                <FaInfoCircle className="text-md" />
                Sobre Voi
            </NavLink>
            <NavLink to="/faq" onClick={onClose} className={linkClass}>
                <FaQuestionCircle className="text-md" />
                FAQs
            </NavLink>

            {/* Acciones según auth */}
            {isAuthenticated ? (
                <>
                    <NavLink
                        to="/dashboard"
                        onClick={onClose}
                        className={linkClass}
                    >
                        <FaTachometerAlt className="text-md" />
                        Dashboard
                    </NavLink>
                    <button
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                        className="z-50 flex items-center gap-3 text-2xl text-white/80 hover:text-red-500"
                    >
                        <FaSignOutAlt className="text-md" />
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login" onClick={onClose} className={linkClass}>
                        <FaSignInAlt className="text-md" />
                        Iniciar Sesión
                    </NavLink>
                    <NavLink
                        to="/register"
                        onClick={onClose}
                        className={linkClass}
                    >
                        <FaUserPlus className="text-md" />
                        Registrarse
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default MobileMenu;
