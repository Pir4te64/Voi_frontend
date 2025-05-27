// src/components/Sidebar.jsx
import { SidebarProductora } from "@/components/Dashboard/Sidebar/SidebarProductora/SidebarProductora";
import { SidebarAdmin } from "@/components/Dashboard/Sidebar/SidebarAdmin/SidebarAdmin";
import { useUserInfo } from "@/context/useUserInfo";
import { SidebarRevendedor } from "@/components/Dashboard/Sidebar/SidebarRevendedor/SidebarRevendedor";
import { SidebarUsuario } from "@/components/Dashboard/Sidebar/SidebarUsuarioRegular/SidebarUsuarioRegular";


const Sidebar = () => {
    const { userType } = useUserInfo();
    if (userType === "PRODUCTORA") return <SidebarProductora />;
    if (userType === "ADMIN") return <SidebarAdmin />;
    if (userType === "REVENDEDOR") return <SidebarRevendedor />;
    if (userType === "USUARIO") return <SidebarUsuario />;

    // Rol por defecto → usuario regular
    return <SidebarUsuario />;
};

export default Sidebar;
