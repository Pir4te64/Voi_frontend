import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "@/context/useUserInfo";

const DashboardRedirect = () => {
    const navigate = useNavigate();
    const { userType } = useUserInfo();

    useEffect(() => {
        // Redirigir según el tipo de usuario
        switch (userType) {
            case "ADMIN":
                navigate("/dashboard", { replace: true });
                break;
            case "PRODUCTORA":
                navigate("/dashboard", { replace: true });
                break;
            case "REVENDEDOR":
                navigate("/dashboard", { replace: true });
                break;
            case "USUARIO":
                navigate("/dashboard", { replace: true });
                break;
            default:
                // Fallback a dashboard general
                navigate("/dashboard", { replace: true });
                break;
        }
    }, [userType, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-secondary"></div>
                <p className="text-white">Redirigiendo al dashboard...</p>
            </div>
        </div>
    );
};

export default DashboardRedirect; 