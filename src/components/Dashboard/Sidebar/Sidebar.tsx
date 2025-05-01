// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUser, FaRegArrowAltCircleLeft } from "react-icons/fa";

const navItems = [
    { to: "/dashboard/crearperfil", label: "Crear Perfil", Icon: FaRegUser },
    // más rutas aquí cuando las necesites
];

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="w-64 bg-primary min-h-screen p-6 text-white flex flex-col">
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
                className="inline-block w-2/4 text-center px-4 py-2 mb-4 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white transition"
            >
                Mi Perfil
            </NavLink>

            {/* Datos de usuario */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Ticketera VOI</h3>
                <p className="text-sm text-gray-400">ticketeravoi@gmail.com</p>
            </div>

            {/* Título de sección */}
            <h4 className="text-lg font-semibold text-secondary mb-4">Productora</h4>

            {/* Listado de rutas */}
            <nav className="flex-1 space-y-2">
                {navItems.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded transition-colors ${isActive
                                ? "bg-secondary text-white font-semibold"
                                : "text-gray-300 hover:bg-back/50"
                            }`
                        }
                    >
                        <Icon className="mr-3" />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
