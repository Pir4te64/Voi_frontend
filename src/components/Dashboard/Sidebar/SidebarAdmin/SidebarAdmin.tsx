// src/components/Sidebar/SidebarAdmin.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaTimes,
} from "react-icons/fa";

import { useUserInfo } from "@/context/useUserInfo";
import { useAuth } from "@/context/AuthContext";
import { navItemsAdmin } from "@/components/Dashboard/Sidebar/SidebarAdmin/Items/NavItemsAdmin";
import { BiLogOut } from "react-icons/bi";

/**
 * Sidebar para usuarios con rol ADMIN.
 */
const SidebarAdmin = () => {
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
        className={`fixed inset-y-0 left-0 z-[999] flex min-h-screen w-64 flex-col bg-primary p-6 text-white shadow-lg transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
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

        <h4 className="mb-4 text-lg font-semibold text-secondary">
          Administrador
        </h4>

        {/* Navegación */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItemsAdmin.map(({ to, label, Icon, end, children }: any) => (
            <div key={to}>
              <NavLink
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
                {children && (
                  <span className="ml-auto rounded-full bg-secondary px-2 text-xs font-bold text-black">
                    {children.length}
                  </span>
                )}
              </NavLink>

              {children && (
                <div className="ml-6 mt-1 space-y-1">
                  {children.map(
                    ({
                      to: subTo,
                      label: subLabel,
                      Icon: SubIcon,
                      badge: subBadge,
                    }: any) => (
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
                        {subBadge !== undefined && (
                          <span className="ml-auto rounded-full bg-secondary px-2 text-[10px] font-bold text-black">
                            {subBadge}
                          </span>
                        )}
                      </NavLink>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Cerrar sesión */}
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

export { SidebarAdmin };
