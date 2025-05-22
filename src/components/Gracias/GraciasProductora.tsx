// src/pages/GraciasProductora.tsx
import React from 'react';
import { FaCheck, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import voiLogo from '@/assets/LogoGrande.svg'; // Ajusta la ruta si tu logo está en otro lugar

const GraciasProductora: React.FC = () => {
    return (
        <div className="relative z-50 flex min-h-screen flex-col items-center justify-between bg-black p-8 text-white">
            {/* Logo VOI */}
            <header className="flex justify-center">
                <img src={voiLogo} alt="VOI Logo" className="w-64 md:w-96" />
            </header>

            {/* Contenido principal */}
            <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
                <FaCheck className="mb-4 rounded-full border-2 border-green-500 p-2 text-5xl text-green-500" />
                <h1 className="mb-4 text-2xl font-bold md:text-4xl">
                    Gracias por registrarte como{' '}
                    <span className="text-secondary">productora</span> en VOI
                </h1>
                <p className="mb-2">
                    Tu solicitud ha sido recibida y será revisada por nuestro equipo en las
                    próximas <strong>48 horas hábiles</strong>.
                </p>
                <p className="mb-6">
                    Nos pondremos en contacto por correo electrónico si necesitamos más
                    información o documentación.
                </p>
                <p className="font-semibold">
                    Una vez aprobada, recibirás acceso a tu panel para comenzar a publicar
                    y gestionar tus eventos.
                </p>
            </main>

            {/* Footer de contacto */}
            <footer className="relative z-50 w-full border-t border-[#AAAAAA] py-4 text-center">
                <p className="mb-4 text-[#AAAAAA]">¿Tenés dudas?</p>
                <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:space-x-8 md:space-y-0">
                    <a
                        href="mailto:ticketeravoi@gmail.com"
                        className="flex items-center space-x-2 hover:text-white"
                    >
                        <FaEnvelope className="mr-2 text-[#AAAAAA]" />
                        <p className="text-[#AAAAAA]">Podés escribirnos a</p>
                        <p className="text-[#AAAAAA]">ticketeravoi@gmail.com</p>
                    </a>
                    <a
                        href="https://wa.me/5493765484773"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 hover:text-white"
                    >
                        <FaWhatsapp className="mr-2 text-[#AAAAAA]" />
                        <p className="text-[#AAAAAA]">O envianos un WhatsApp al</p>
                        <p className="text-[#AAAAAA]">+54 9 3765 48-4773</p>
                    </a>
                </div>
                <div
                    className="pointer-events-none absolute left-1/2 z-10 h-52 w-52 -translate-x-1/2 rounded-full bg-secondary opacity-80"
                    style={{ filter: 'blur(64px)' }}
                />
            </footer>
        </div>
    );
};

export default GraciasProductora;
