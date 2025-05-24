// src/components/Layout.tsx
import React, { PropsWithChildren, useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';
import { GETME } from '@/api/api';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (!storedAuth) return;

        // Si hay token, traemos "me" y lo guardamos en localStorage
        GETME()
            .then(res => {
                // res.data es { idUser, idProfile, userType, email, name, roles }
                localStorage.setItem('me', JSON.stringify(res.data));
            })
            .catch(err => {
                console.error('GETME failed:', err);
                // Si falla, limpiamos auth/me para forzar re-login
                localStorage.removeItem('auth');
                localStorage.removeItem('me');
            });
    }, []);
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
