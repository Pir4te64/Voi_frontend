// src/components/Sidebar.jsx
import { SidebarProductora } from "./SidebarProductora/SidebarProductora";
import { SidebarAdmin } from "./SidebarAdmin/SidebarAdmin";
import { useUserInfo } from "@/context/useUserInfo";
import { SidebarRevendedor } from "./SidebarRevendedor/SidebarRevendedor";
import { SidebarUsuario } from "./SidebarUsuarioRegular/SidebarUsuarioRegular";
const Sidebar = () => {
    const { userType } = useUserInfo();
    console.log(userType);
    if (userType === "PRODUCTORA") return <SidebarProductora />;
    if (userType === "ADMIN") return <SidebarAdmin />;
    if (userType === "REVENDEDOR") return <SidebarRevendedor />;
    if (userType === "USUARIO") return <SidebarUsuario />;

    // Rol por defecto → usuario regular
    return <SidebarUsuario />;
};

export default Sidebar;
