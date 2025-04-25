// src/components/Layout.tsx
import React, { PropsWithChildren } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-back text-white">
            {/* Cabecera */}
            <Navbar />

            {/* Contenido principal crece para llenar */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Pie de página */}
            <Footer />
        </div>
    );
};

export default Layout;
