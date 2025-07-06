import {
    FaChartLine,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { IoMdRadioButtonOn } from "react-icons/io";
/**
 * Opciones de navegación para usuarios con rol REVENDEDOR.
 * - `end: true` → coincidencia exacta para la ruta.
 * - `badge`     → contador opcional que se muestra a la derecha.
 */
export const navItemsRevendedor = [
    {
        to: "/dashboard",
        label: "Dashboard",
        Icon: IoHomeOutline,
        end: true,
    },
    {
        to: "/dashboard/miperfil",
        label: "Perfil Profesional",
        Icon: FiUser,
    },
    {
        to: "/dashboard/notificaciones",
        label: "Notificaciones",
        Icon: FaRegBell,
        badge: 9, // ← reemplaza por tu contador dinámico
    },
    {
        to: "/dashboard/misventas",
        label: "Mis Ventas",
        Icon: BsBarChart,
        subItems: [
            {
                to: "/dashboard/ticket",
                label: "Enviar ticket",
                Icon: IoMdRadioButtonOn,
            },
        ],
    },
    {
        to: "/dashboard/recursos",
        label: "Recursos",
        Icon: FaChartLine,

    },

];
