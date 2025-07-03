import {
    FaCalendarAlt,
    FaRegDotCircle,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

/**
 * Opciones de navegación para ADMIN.
 * `badge` es opcional y se muestra como círculo a la derecha.
 */
export const navItemsAdmin = [
    {
        to: "/dashboard",
        label: "Dashboard",
        Icon: IoHomeOutline,
        end: true,
        children: [
            {
                to: "/dashboard/solicitudes-alta",
                label: "Solicitudes (ALTA)",
                Icon: FaRegDotCircle,
                badge: null, // El badge se llenará dinámicamente en el Sidebar
            },
        ],
    },
    {
        to: "/dashboard/eventos",
        label: "Eventos",
        Icon: FaCalendarAlt,
    },
];
