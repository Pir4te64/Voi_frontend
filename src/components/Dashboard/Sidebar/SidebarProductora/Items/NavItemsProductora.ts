// NavItemsProductora.js
import { FaWallet, FaCog, FaCalendarPlus, FaRegDotCircle } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";

export const navItemsProductora = [
  { to: "/dashboard", label: "Dashboard", Icon: IoHomeOutline, end: true },
  { to: "/dashboard/miperfil", label: "Mi Perfil", Icon: LuUser },
  { to: "/dashboard/escanear-qrs", label: "Escanear QRs", Icon: BsQrCode },
  {
    /*  to: "/dashboard/eventos", */
    label: "Eventos",
    Icon: FaCalendarPlus,
    subItems: [
      { to: "/dashboard/crearevento", label: "Crear Evento", Icon: FaRegDotCircle },
      { to: "/dashboard/editareventos", label: "Editar Evento", Icon: FaRegDotCircle },
    ],
  },
  { to: "/dashboard/lotes", label: "Lotes de Entrada", Icon: FaWallet },
  { to: "/dashboard/mis-ventas", label: "Mis Ventas", Icon: BiBarChartAlt2 },
  { to: "/dashboard/revendedores", label: "Revendedores", Icon: MdGroup },
  { to: "/dashboard/configuraciones", label: "Configuraciones", Icon: FaCog },
];
