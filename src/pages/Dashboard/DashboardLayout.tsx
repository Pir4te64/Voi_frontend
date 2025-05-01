import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import Layout from "@/Layout";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <Layout>
            <div className="flex min-h-screen">
                {/* Sidebar ocupa w-64 */}
                <Sidebar />

                {/* Main ocupa el resto */}
                <main className="flex-1 p-6 bg-primary">
                    <Outlet />
                </main>
            </div>
        </Layout>
    );
};

export default DashboardLayout;
