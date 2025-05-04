import { LuUser } from "react-icons/lu";
import {
    FaCalendarPlus,
    FaWallet,
    FaNetworkWired,
    FaRegDotCircle,
} from "react-icons/fa";
export const navItems = [
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
            { to: "/dashboard/modificarevento", label: "Modificar Evento", Icon: FaRegDotCircle },
            { to: "/dashboard/gestionarlotes", label: "Crear Lote", Icon: FaRegDotCircle },
        ],
    },
    {
        to: "/dashboard/misventas",
        label: "Mis Ventas",
        Icon: FaWallet,
        children: [
            { to: "/dashboard/misventas/web", label: "Web", Icon: FaRegDotCircle },
            { to: "/dashboard/misventas/revendedores", label: "Revendedores", Icon: FaRegDotCircle },
            { to: "/dashboard/misventas/lote", label: "Lote", Icon: FaRegDotCircle },
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