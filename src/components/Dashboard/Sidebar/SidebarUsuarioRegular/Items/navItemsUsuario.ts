import { LuUser } from "react-icons/lu";
import { CgShoppingCart } from "react-icons/cg";
import { FaCalendarPlus } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";


export const navItemsUsuario = [
    {
        to: "/usuario/perfil",
        label: "Mi Perfil",
        Icon: LuUser,
        end: true,
    },
    {
        to: "/usuario/compras",
        label: "Mis Compras",
        Icon: CgShoppingCart,
    },
    {
        to: "/usuario/eventos",
        label: "Mis Eventos",
        Icon: FaCalendarPlus,
    },
    {
        to: "/usuario",
        label: "Inicio",
        Icon: IoHomeOutline,
    },
];
