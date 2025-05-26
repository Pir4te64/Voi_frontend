// src/components/Sidebar/SidebarProductora.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    FaRegArrowAltCircleLeft,
    FaRegArrowAltCircleRight,
    FaTimes,
} from "react-icons/fa";

import { navItemsRevendedor } from "@/components/Dashboard/Sidebar/SidebarRevendedor/Items/NavItemsRevendedor";
import { useUserInfo } from "@/context/useUserInfo";
import { useAuth } from "@/context/AuthContext";
import { BiLogOut } from "react-icons/bi";
/**
 * Sidebar completo para usuarios con rol PRODUCTORA.
 */
const SidebarRevendedor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const { email, allUser } = useUserInfo();
    const { logout } = useAuth();

    /* Cerrar automáticamente al cambiar de ruta (mobile) */
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* Botón abrir (solo mobile) */}
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

            {/* Backdrop móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex min-h-screen w-64 flex-col bg-black p-6 text-white shadow-lg transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static`}
                aria-hidden={!isOpen && window.innerWidth < 768}
            >
                {/* Botón cerrar (mobile) */}
                <button
                    className="mb-6 self-end text-white hover:text-gray-200 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <FaTimes className="h-5 w-5" />
                </button>

                {/* Volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-white hover:text-gray-200"
                >
                    <FaRegArrowAltCircleLeft className="mr-2 h-5 w-5" />
                    Volver
                </button>

                {/* Datos usuario */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">{allUser?.name}</h3>
                    <p className="max-w-[12rem] truncate text-sm">{email}</p>
                </div>

                <h4 className="mb-4 text-lg font-semibold text-secondary">Productora</h4>

                {/* Navegación */}
                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navItemsRevendedor.map(({ to, label, Icon, end }) => (
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
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Botón cerrar sesión */}
                <button
                    onClick={logout}
                    className="mt-4 flex items-center gap-2 rounded p-2 text-white transition hover:text-secondary focus:outline-none"
                >
                    <BiLogOut className="h-6 w-6" />
                    Cerrar sesión
                </button>
            </aside>
        </>
    );
};

export { SidebarRevendedor };
