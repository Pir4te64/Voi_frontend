// src/components/Sidebar/SidebarUsuario.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    FaRegArrowAltCircleLeft,
    FaRegArrowAltCircleRight,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";
import voiLogo from "@/assets/Logo.svg"; // ajusta la ruta si cambia
import { useUserInfo } from "@/context/useUserInfo";
import { useAuth } from "@/context/AuthContext";
import { navItemsUsuario } from "@/components/Dashboard/Sidebar/SidebarUsuarioRegular/Items/navItemsUsuario";

/**
 * Sidebar para usuarios de tipo USUARIO (cliente final).
 */
const SidebarUsuario = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const { email, allUser } = useUserInfo();
    const { logout } = useAuth();

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* Botón abrir (mobile) */}
            {!isOpen && (
                <button
                    className="fixed left-0 top-1/2 z-50 -translate-y-1/2 transform rounded-r bg-secondary p-2 text-white focus:outline-none md:hidden"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                >
                    <FaRegArrowAltCircleRight className="h-5 w-5" />
                </button>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex min-h-screen w-64 flex-col bg-primary   p-6 text-white shadow-lg transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static`}
                aria-hidden={!isOpen && window.innerWidth < 768}
            >
                {/* Cabecera: logo + volver */}
                <div className="mb-6 flex items-center justify-between">
                    <img src={voiLogo} alt="VOI" className="h-8" />
                    <button
                        onClick={() => navigate(-1)}
                        aria-label="Volver"
                        className="flex items-center gap-1 text-white hover:text-secondary"
                    >
                        <FaRegArrowAltCircleLeft className="h-5 w-5" />
                        <span className="hidden sm:inline">Volver</span>
                    </button>
                </div>

                {/* Avatar */}
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-700">
                    <FaUser className="h-10 w-10 text-gray-300" />
                </div>

                {/* Datos usuario */}
                <div className="mb-8 text-center">
                    <h3 className="text-xl font-semibold leading-tight">
                        {allUser?.name ?? "Nombre"}
                    </h3>
                    <p className="text-sm text-gray-300">{email}</p>
                </div>

                {/* Navegación */}
                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navItemsUsuario.map(({ to, label, Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center w-full p-2 rounded transition-colors ${isActive
                                    ? "bg-secondary text-white font-semibold"
                                    : "text-white hover:text-secondary"
                                }`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon className="mr-3 h-6 w-6" />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Cerrar sesión */}
                <button
                    onClick={logout}
                    className="mt-8 flex items-center gap-2 text-white transition hover:text-secondary focus:outline-none"
                >
                    <FaSignOutAlt className="h-4 w-4" />
                    Cerrar sesión
                </button>
            </aside>
        </>
    );
};

export { SidebarUsuario };