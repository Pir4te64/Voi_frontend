// src/components/Layout.tsx
import React, { PropsWithChildren } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <AuthProvider>
            <div className="flex min-h-screen flex-col bg-primary text-white">
                {/* Cabecera */}
                <ToastContainer position="top-right" autoClose={3000} />

                <Navbar />

                {/* Contenido principal crece para llenar */}
                <main className="flex-grow">
                    {children}
                </main>

                {/* Pie de página */}
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default Layout;
