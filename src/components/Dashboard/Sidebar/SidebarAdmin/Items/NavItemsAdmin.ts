import {
    FaInbox,
    FaCalendarAlt,
} from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
/**
 * Opciones de navegación para ADMIN.
 * `badge` es opcional y se muestra como círculo a la derecha.
 */
export const navItemsAdmin = [
    {
        to: "/dashboard",
        label: "Inicio",
        Icon: IoHomeOutline,
        end: true,
    },
    {
        to: "/dashboard/productoras",
        label: "Productoras",
        Icon: MdGroup,
        children: [
            {
                to: "/dashboard/productoras/solicitudes",
                label: "Solicitudes",
                Icon: FaInbox,
                badge: 19, // reemplaza por tu contador dinámico
            },
        ],
    },
    {
        to: "/dashboard/eventos",
        label: "Eventos",
        Icon: FaCalendarAlt,
    },

];
