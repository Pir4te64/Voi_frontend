// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaCalendarPlus,
    FaWallet,
    FaNetworkWired,
    FaRegDotCircle,
    FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { LuUser } from "react-icons/lu";
const navItems = [
    {
        to: "/dashboard/crearperfil",
        label: "Crear Perfil",
        Icon: LuUser,
    },
    {
        to: "/dashboard/crearevento",
        label: "Crear Evento",
        Icon: FaCalendarPlus,
        children: [
            { to: "/dashboard/modify-evento", label: "Modificar Evento", Icon: FaRegDotCircle },
            { to: "/dashboard/crear-lote", label: "Crear Lote", Icon: FaRegDotCircle },
        ],
    },
    {
        to: "/dashboard/mis-ventas",
        label: "Mis Ventas",
        Icon: FaWallet,
        children: [
            { to: "/dashboard/ventas/web", label: "Web", Icon: FaRegDotCircle },
            { to: "/dashboard/ventas/revendedores", label: "Revendedores", Icon: FaRegDotCircle },
            { to: "/dashboard/ventas/lote", label: "Lote", Icon: FaRegDotCircle },
        ],
    },
    {
        to: "/dashboard/revendedores",
        label: "Revendedores",
        Icon: FaNetworkWired,
        children: [
            { to: "/dashboard/revendedores/eventos", label: "Eventos", Icon: FaRegDotCircle },
            { to: "/dashboard/revendedores/agregar-revendedores", label: "Agregar Revendedores", Icon: FaRegDotCircle },
            { to: "/dashboard/revendedores/perfiles", label: "Perfiles", Icon: FaRegDotCircle },
            { to: "/dashboard/revendedores/lotes", label: "Lotes", Icon: FaRegDotCircle },
            { to: "/dashboard/revendedores/agregar-comision-por-lotes", label: "Agregar Comisión por Lotes", Icon: FaRegDotCircle },
        ],
    },
];

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="w-72 bg-primary min-h-screen p-6 text-white flex flex-col rounded-r-md">
            {/* Volver */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-white hover:text-gray-200 mb-6"
            >
                <FaRegArrowAltCircleLeft className="mr-2 w-5 h-5" />
                Volver
            </button>

            {/* Botón Mi Perfil */}
            <NavLink
                to="/dashboard/miperfil"
                className="inline-block w-2/4 text-center px-4 py-2 mb-6 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white transition"
            >
                Mi Perfil
            </NavLink>

            {/* Datos de usuario */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Ticketera VOI</h3>
                <p className="text-sm ">ticketeravoi@gmail.com</p>
            </div>

            {/* Título de sección */}
            <h4 className="text-lg font-semibold text-secondary mb-4">Productora</h4>

            {/* Listado de rutas */}
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
    );
};

export default Sidebar;
