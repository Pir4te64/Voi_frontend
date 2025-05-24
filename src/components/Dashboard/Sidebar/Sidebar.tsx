// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    FaRegArrowAltCircleLeft,
    FaRegArrowAltCircleRight,
    FaTimes
} from "react-icons/fa";
import { navItems } from "@/components/Dashboard/Sidebar/NavItems";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    // Cerrar sidebar al cambiar de ruta
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Leer el email de "me" en localStorage
    useEffect(() => {
        const meJson = localStorage.getItem("me");
        if (meJson) {
            try {
                const me = JSON.parse(meJson);
                setEmail(me.email || "");
            } catch {
                setEmail("");
            }
        }
    }, []);

    return (
        <>
            {/* Botón para abrir en mobile (sólo cuando está cerrado) */}
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
                className={`
          fixed inset-y-0 left-0 z-50 bg-black min-h-screen p-6 text-white flex flex-col rounded-r-md
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
                aria-hidden={!isOpen && window.innerWidth < 768}
            >
                {/* Botón para cerrar en mobile */}
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

                {/* Mi Perfil */}
                <NavLink
                    to="/dashboard/miperfil"
                    className="mb-6 inline-block w-2/4 rounded-full border border-secondary px-4 py-2 text-center text-secondary transition hover:bg-secondary hover:text-white"
                >
                    Mi Perfil
                </NavLink>

                {/* Datos de usuario */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Ticketera VOI</h3>
                    <p className="text-sm">{email}</p>
                </div>

                {/* Sección */}
                <h4 className="mb-4 text-lg font-semibold text-secondary">Productora</h4>

                {/* Navegación */}
                <nav className="flex-1 space-y-2 overflow-y-auto">
                    {navItems.map(({ to, label, Icon, children }) => (
                        <div key={to}>
                            <NavLink
                                to={to}
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

                            {children && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {children.map(({ to: subTo, label: subLabel, Icon: SubIcon }) => (
                                        <NavLink
                                            key={subTo}
                                            to={subTo}
                                            className={({ isActive }) =>
                                                `flex items-center w-full p-1 rounded text-sm transition-colors ${isActive
                                                    ? "text-secondary font-semibold"
                                                    : "text-white hover:text-secondary"
                                                }`
                                            }
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <SubIcon className="mr-2 h-3 w-3" />
                                            {subLabel}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
