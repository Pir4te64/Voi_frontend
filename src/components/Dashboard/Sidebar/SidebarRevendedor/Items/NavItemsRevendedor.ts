import {
    FaUser,
    FaBell,
    FaTicketAlt,
    FaShoppingCart,
    FaChartLine,
    FaRegArrowAltCircleRight,
} from "react-icons/fa";

/**
 * Opciones de navegación para usuarios con rol REVENDEDOR.
 * - `end: true` → coincidencia exacta para la ruta.
 * - `badge`     → contador opcional que se muestra a la derecha.
 */
export const navItemsRevendedor = [
    {
        to: "/dashboard",
        label: "Dashboard",
        Icon: FaUser,
        end: true,
    },
    {
        to: "/dashboard/miperfil",
        label: "Perfil Profesional",
        Icon: FaUser,
    },
    {
        to: "/dashboard/notificaciones",
        label: "Notificaciones",
        Icon: FaBell,
        badge: 9, // ← reemplaza por tu contador dinámico
    },
    {
        to: "/dashboard/ticket",
        label: "Enviar ticket",
        Icon: FaTicketAlt,
        children: [
            {
                to: "/dashboard/ticket/evento",
                label: "Evento",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/dashboard/ticket/lote",
                label: "Lote",
                Icon: FaRegArrowAltCircleRight,
            },
        ],
    },
    {
        to: "/dashboard/misventas",
        label: "Mis Ventas",
        Icon: FaShoppingCart,
        children: [
            {
                to: "/dashboard/ventas/total",
                label: "Total",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/dashboard/ventas/eventos",
                label: "Eventos",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/dashboard/ventas/lotes",
                label: "Lotes",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/dashboard/ventas/comisiones",
                label: "Comisiones generadas (por lotes)",
                Icon: FaRegArrowAltCircleRight,
            },
        ],
    },
    {
        to: "/dashboard/recursos",
        label: "Recursos",
        Icon: FaChartLine,
        children: [
            {
                to: "/dashboard/recursos/marketing",
                label: "Material de marketing",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/dashboard/recursos/qr",
                label: "Código QR personalizado",
                Icon: FaRegArrowAltCircleRight,
            },
        ],
    },

];
