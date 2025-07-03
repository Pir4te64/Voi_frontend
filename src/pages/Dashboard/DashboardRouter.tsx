import { useUserInfo } from "@/context/useUserInfo";
import DashboardProductora from "./DashboardProductora";
import DashboardRevendedor from "./DashboardRevendedor";
import DashboardUsuario from "./DashboardUsuario";
import Index from "./Index"; // Dashboard Admin (ya existente)

const DashboardRouter = () => {
    const { userType } = useUserInfo();

    // Renderizar el dashboard correspondiente según el tipo de usuario
    switch (userType) {
        case "ADMIN":
            return <Index />;
        case "PRODUCTORA":
            return <DashboardProductora />;
        case "REVENDEDOR":
            return <DashboardRevendedor />;
        case "USUARIO":
            return <DashboardUsuario />;
        default:
            // Fallback a usuario regular
            return <DashboardUsuario />;
    }
};

export default DashboardRouter; 