// src/pages/GraciasProductora.tsx
import React from 'react';
import { FaCheck, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import voiLogo from '@/assets/LogoGrande.svg';

const GraciasProductora: React.FC = () => {
    return (
        <div className="relative z-50 flex min-h-screen flex-col items-center justify-between overflow-hidden bg-black p-8 text-white">
            {/* Logo VOI */}
            <header className="flex items-center justify-center">
                <img src={voiLogo} alt="VOI Logo" className="w-64 md:w-[30rem]" />
            </header>

            {/* Contenido principal */}
            <main className="flex flex-grow flex-col items-center justify-center space-y-4 px-4 text-center">
                <FaCheck className="my-4 rounded-full border-2 border-green-500 p-1.5 text-3xl text-green-500 md:my-6 md:p-2 md:text-5xl lg:text-6xl" />
                <h1 className="mb-4 text-xl font-bold md:text-4xl">
                    Gracias por registrarte como{' '}
                    <span className="text-secondary">productora</span> en VOI
                </h1>
                <p className="mb-2 text-lg md:text-2xl">
                    Tu solicitud ha sido recibida y será revisada por nuestro equipo en las
                    próximas <strong>48 horas hábiles</strong>.
                </p>
                <p className="mb-6 text-lg md:text-2xl">
                    Nos pondremos en contacto por correo electrónico si necesitamos más
                    información o documentación.
                </p>
                <p className="text-lg font-bold md:text-2xl">
                    Una vez aprobada, recibirás acceso a tu panel para comenzar a publicar
                    y gestionar tus eventos.
                </p>
            </main>

            {/* Footer de contacto */}
            <footer className="relative z-50 w-full border-[#AAAAAA] py-4 text-center md:py-8">
                <div className='mx-auto my-4 w-3/4 border-t-[0.5px] border-[#AAAAAA] md:my-8 md:w-1/2' />
                <p className="mb-4 text-base text-[#AAAAAA] md:mb-6 md:text-lg">¿Tenés dudas?</p>

                <div className="flex flex-col items-center justify-center space-y-6 px-4 md:flex-row md:space-x-16 md:space-y-0 md:px-0">
                    {/* Email */}
                    <a
                        href="mailto:ticketeravoi@gmail.com"
                        className="flex w-full max-w-xs items-start space-x-2 hover:text-white md:w-auto"
                    >
                        <FaEnvelope className="mt-1 text-[#AAAAAA] md:text-lg" />
                        <div className="text-sm leading-snug text-[#AAAAAA] md:text-base">
                            <span>Podés escribirnos a</span>
                            <br />
                            <span className="font-semibold">ticketeravoi@gmail.com</span>
                        </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/5493765484773"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full max-w-xs items-start space-x-2 hover:text-white md:w-auto"
                    >
                        <FaWhatsapp className="mt-1 text-[#AAAAAA] md:text-lg" />
                        <div className="text-sm leading-snug text-[#AAAAAA] md:text-base">
                            <span>O envianos un WhatsApp al</span>
                            <br />
                            <span className="font-semibold">+54 9 3765 48-4773</span>
                        </div>
                    </a>
                </div>

                {/* Glare inferior */}
                <div
                    className="pointer-events-none absolute left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary opacity-80 md:-bottom-20 md:h-96 md:w-96"
                    style={{ filter: 'blur(64px)' }}
                />
            </footer>
        </div>
    );
};

export default GraciasProductora;
