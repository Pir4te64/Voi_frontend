// navItemsUsuario.js
import { LuUser } from "react-icons/lu";
import { CgShoppingCart } from "react-icons/cg";
/* import { FaCalendarPlus } from "react-icons/fa"; */
import { IoHomeOutline } from "react-icons/io5";

export const navItemsUsuario = [
    {
        to: "/dashboard",
        label: "Dashboard",
        Icon: IoHomeOutline,
        end: true,          // 👈  solo match exacto
    },
    {
        to: "/dashboard/miperfil",
        label: "Mi Perfil",
        Icon: LuUser,
    },
    {
        to: "/dashboard/miscompras",
        label: "Mis Compras",
        Icon: CgShoppingCart,
    },
    /* {
        to: "/dashboard/miseventos",   // suponiendo que aquí va “Mis Eventos”
        label: "Mis Eventos",
        Icon: FaCalendarPlus,
    }, */
];
