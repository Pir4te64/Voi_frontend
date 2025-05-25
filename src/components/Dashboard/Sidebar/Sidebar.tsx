// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUserInfo } from "@/context/useUserInfo";
import { SidebarUsuarioRegular } from "./SidebarUsuarioRegular/SidebarUsuarioRegular";
import { SidebarProductora } from "./SidebarProductora/SidebarProductora";

const Sidebar = () => {
    const location = useLocation();


    // Cerrar sidebar al cambiar de ruta
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Leer el email de "me" en localStorage
    const [_, setIsOpen] = useState(false);
    const { userType } = useUserInfo();

    console.log(userType);

    return (
        <>
            {/* Navegación */}
            {userType === "PRODUCTORA" ? (
                <SidebarProductora />
            ) : (
                <SidebarUsuarioRegular onItemClick={() => { }} />
            )}
        </>
    );
};

export default Sidebar;
