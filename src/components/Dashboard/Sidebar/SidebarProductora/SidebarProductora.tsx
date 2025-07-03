// src/components/Sidebar/SidebarProductora.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import QRScannerModal from '@/components/Dashboard/QR/QRScannerModal';

import { navItemsProductora } from "@/components/Dashboard/Sidebar/SidebarProductora/Items/NavItemsProductora";
import { useUserInfo } from "@/context/useUserInfo";
import { useAuth } from "@/context/AuthContext";
import { BiLogOut } from "react-icons/bi";

/**
 * Sidebar completo para usuarios con rol PRODUCTORA.
 */
const SidebarProductora = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { email, allUser } = useUserInfo();
  const { logout } = useAuth();
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrResult, setQrResult] = useState<string | null>(null);

  /* Cerrar automáticamente al cambiar de ruta (mobile) */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* Expandir automáticamente los submenús cuando la URL coincida con uno de sus elementos hijo */
  useEffect(() => {
    const currentPath = location.pathname;

    // Encontrar los items padre que tienen el subitem que coincide con la ruta actual
    const itemsToExpand = navItemsProductora
      .filter((item) =>
        item.subItems?.some((subItem) => currentPath === subItem.to)
      )
      .map((item) => item.to);

    if (itemsToExpand.length > 0) {
      setExpandedItems((prev) => [...new Set([...prev, ...itemsToExpand.filter((item): item is string => Boolean(item))])]);
    }
  }, [location.pathname]);

  const toggleSubmenu = (to: string) => {
    setExpandedItems((prev) =>
      prev.includes(to) ? prev.filter((item) => item !== to) : [...prev, to]
    );
  };

  const renderNavItem = (item: any) => {
    // Si es el ítem de escanear QRs, abrir el modal
    if (item.label === "Escanear QRs") {
      return (
        <button
          key={item.to}
          className="flex w-full items-center rounded p-2 text-white transition-colors hover:text-secondary"
          onClick={() => setShowQrModal(true)}
          type="button"
        >
          <item.Icon className="mr-3 h-4 w-4" />
          {item.label}
        </button>
      );
    }
    // Resto de ítems normales
    const isExpanded = expandedItems.includes(item.to);
    const hasChildren = item.subItems && item.subItems.length > 0;
    const isActive = item.end
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

    return (
      <div key={item.to} className="space-y-1">
        <div
          className={`flex items-center justify-between w-full p-2 rounded transition-colors ${isActive
            ? "bg-secondary text-white font-semibold"
            : "text-white hover:text-secondary"
            }`}
        >
          <NavLink
            to={item.to}
            end={item.end}
            className="flex flex-1 items-center"
            onClick={() => {
              setIsOpen(false)
              toggleSubmenu(item.to)
            }}
          >
            <item.Icon className="mr-3 h-4 w-4" />
            {item.label}
          </NavLink>
          {hasChildren && (
            <button
              onClick={() => toggleSubmenu(item.to)}
              className="p-1 hover:text-secondary"
            >
              {isExpanded ? (
                <FaChevronDown className="h-3 w-3" />
              ) : (
                <FaChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-1">
            {item.subItems.map((child: any) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  `flex items-center w-full p-2 rounded transition-colors ${isActive
                    ? "bg-secondary text-white font-semibold"
                    : "text-white hover:text-secondary"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <child.Icon className="mr-3 h-4 w-4" />
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

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
          Productora
        </h4>

        {/* Navegación */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItemsProductora.map(renderNavItem)}
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

      {/* Modal para escanear QR */}
      <QRScannerModal
        open={showQrModal}
        onClose={() => setShowQrModal(false)}
        onResult={setQrResult}
      />
    </>
  );
};

export { SidebarProductora };
