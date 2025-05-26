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
        to: "/reseller/perfil",
        label: "Perfil Profesional",
        Icon: FaUser,
        end: true,
    },
    {
        to: "/reseller/notificaciones",
        label: "Notificaciones",
        Icon: FaBell,
        badge: 9, // ← reemplaza por tu contador dinámico
    },
    {
        to: "/reseller/ticket",
        label: "Enviar ticket",
        Icon: FaTicketAlt,
        children: [
            {
                to: "/reseller/ticket/evento",
                label: "Evento",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/reseller/ticket/lote",
                label: "Lote",
                Icon: FaRegArrowAltCircleRight,
            },
        ],
    },
    {
        to: "/reseller/ventas",
        label: "Mis Ventas",
        Icon: FaShoppingCart,
        children: [
            {
                to: "/reseller/ventas/total",
                label: "Total",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/reseller/ventas/eventos",
                label: "Eventos",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/reseller/ventas/lotes",
                label: "Lotes",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/reseller/ventas/comisiones",
                label: "Comisiones generadas (por lotes)",
                Icon: FaRegArrowAltCircleRight,
            },
        ],
    },
    {
        to: "/reseller/recursos",
        label: "Recursos",
        Icon: FaChartLine,
        children: [
            {
                to: "/reseller/recursos/marketing",
                label: "Material de marketing",
                Icon: FaRegArrowAltCircleRight,
            },
            {
                to: "/reseller/recursos/qr",
                label: "Código QR personalizado",
                Icon: FaRegArrowAltCircleRight,
            },
        ],
    },
];
