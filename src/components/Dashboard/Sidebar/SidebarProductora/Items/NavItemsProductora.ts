// NavItemsProductora.js
import {
    FaWallet,
    FaCog,
    FaCalendarPlus,
} from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { BiBarChartAlt2 } from "react-icons/bi";

export const navItemsProductora = [
    { to: "/dashboard", label: "Dashboard", Icon: IoHomeOutline, end: true, },
    { to: "/dashboard/miperfil", label: "Mi Perfil", Icon: LuUser },
    {
        to: "/dashboard/crearevento",
        label: "Eventos",
        Icon: FaCalendarPlus,
    },
    { to: "/dashboard/lotes", label: "Lotes de Entrada", Icon: FaWallet },
    { to: "/dashboard/mis-ventas", label: "Mis Ventas", Icon: BiBarChartAlt2 },
    { to: "/dashboard/revendedores", label: "Revendedores", Icon: MdGroup },
    { to: "/dashboard/configuraciones", label: "Configuraciones", Icon: FaCog },
];
