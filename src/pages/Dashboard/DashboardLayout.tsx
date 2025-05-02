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

                {/* Main ocupa el resto */}
                <main className="flex-1  bg-primary">
                    <Outlet />
                </main>

                {/* Glow inferior, centrado */}
                <div
                    className="
            absolute bottom-0 left-1/2
            w-96 h-96
            rounded-full
            filter blur-3xl opacity-30
            bg-gradient-to-br from-secondary to-secondary
            transform -translate-x-1/2 translate-y-1/2
          "
                />
            </div>
        </Layout>
    );
};

export default DashboardLayout;
