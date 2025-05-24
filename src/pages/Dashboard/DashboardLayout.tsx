// src/pages/Dashboard/DashboardLayout.jsx
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import Layout from "@/Layout";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

    return (
        <Layout>
            <div className="relative flex min-h-screen overflow-hidden">
                {/* Sidebar ocupa w-64 */}
                <Sidebar />

                {/* Main ocupa el resto y contiene el glow borroso derecho */}
                <main className="relative flex-1 overflow-hidden bg-primary">
                    {/* Glow borroso desde el centro hacia la derecha */}
                    <div
                        className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/2 transform bg-secondary opacity-30 blur-3xl"
                    />
                    <Outlet />
                </main>

                {/* Glow inferior, centrado */}
                <div
                    className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-gradient-to-br from-secondary to-secondary opacity-30 blur-3xl filter"
                />
            </div>
        </Layout>
    );
};

export default DashboardLayout;
