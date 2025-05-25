// src/components/Sidebar.jsx
import { SidebarUsuarioRegular } from "./SidebarUsuarioRegular/SidebarUsuarioRegular";
import { SidebarProductora } from "./SidebarProductora/SidebarProductora";
import { SidebarAdmin } from "./SidebarAdmin/SidebarAdmin";
import { useUserInfo } from "@/context/useUserInfo";

const Sidebar = () => {
    const { userType } = useUserInfo();

    if (userType === "PRODUCTORA") return <SidebarProductora />;
    if (userType === "ADMIN") return <SidebarAdmin />;

    // Rol por defecto → usuario regular
    return <SidebarUsuarioRegular onItemClick={() => { }} />;
};

export default Sidebar;
