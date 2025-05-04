// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
    FaRegArrowAltCircleLeft,
    FaRegArrowAltCircleRight
} from "react-icons/fa";
import { navItems } from "@/components/Dashboard/Sidebar/NavItems";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Cerrar sidebar al cambiar de ruta
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* Botón para abrir en mobile (sólo cuando está cerrado) */}
            {!isOpen && (
                <button
                    className="md:hidden fixed left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-r focus:outline-none z-50"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                >
                    <FaRegArrowAltCircleRight className="w-5 h-5" />
                </button>
            )}

            {/* Backdrop móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
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
                    className="md:hidden self-end mb-6 text-white hover:text-gray-200"
                    onClick={() => setIsOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <FaRegArrowAltCircleLeft className="w-5 h-5" />
                </button>

                {/* Volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-white hover:text-gray-200 mb-6"
                >
                    <FaRegArrowAltCircleLeft className="mr-2 w-5 h-5" />
                    Volver
                </button>

                {/* Mi Perfil */}
                <NavLink
                    to="/dashboard/miperfil"
                    className="inline-block w-2/4 text-center px-4 py-2 mb-6 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white transition"
                >
                    Mi Perfil
                </NavLink>

                {/* Datos de usuario */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Ticketera VOI</h3>
                    <p className="text-sm">ticketeravoi@gmail.com</p>
                </div>

                {/* Sección */}
                <h4 className="text-lg font-semibold text-secondary mb-4">Productora</h4>

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
                            >
                                <Icon className="mr-3 w-4 h-4" />
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
                                        >
                                            <SubIcon className="mr-2 w-3 h-3" />
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
