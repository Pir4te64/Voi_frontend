import {
    FaInbox,
    FaCalendarAlt,
} from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdGroup } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
/**
 * Opciones de navegación para ADMIN.
 * `badge` es opcional y se muestra como círculo a la derecha.
 */
export const navItemsAdmin = [
    {
        to: "/admin/perfil",
        label: "Perfil",
        Icon: LuUser,
        end: true,
    },
    {
        to: "/admin/productoras",
        label: "Productoras",
        Icon: MdGroup,
        children: [
            {
                to: "/admin/productoras/solicitudes",
                label: "Solicitudes",
                Icon: FaInbox,
                badge: 19, // reemplaza por tu contador dinámico
            },
        ],
    },
    {
        to: "/admin/eventos",
        label: "Eventos",
        Icon: FaCalendarAlt,
    },
    {
        to: "/admin",
        label: "Inicio",
        Icon: IoHomeOutline,
    },
];
