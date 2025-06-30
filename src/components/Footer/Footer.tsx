// src/components/Footer.tsx
import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '@/assets/Logo.svg';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="z-50 flex flex-col justify-between bg-primary text-white md:h-auto">
            {/* Barra superior */}
            <div className="container mx-auto flex flex-col items-center space-y-6 px-4 py-6 md:flex-row md:justify-between md:space-y-0">
                {/* Logo */}
                <div className="flex flex-1 justify-center md:justify-start">
                    <img src={logo} loading='lazy' alt="VOI Logo" className="h-auto object-cover md:h-16" />
                </div>

                {/* Enlaces de utilidad */}
                <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-sm md:flex-row md:space-x-6 md:space-y-0">
                    <a href="/faq" className="transition-colors hover:text-secondary">
                        Preguntas Frecuentes
                    </a>
                    <a href="mailto:ticketeravoi@gmail.com" className="transition-colors hover:text-secondary">
                        ticketeravoi@gmail.com
                    </a>
                    <a href="tel:+5493765484773" className="transition-colors hover:text-secondary">
                        +54 9 3765 48-4773
                    </a>
                </div>

                {/* Iconos sociales */}
                <div className="flex flex-1 justify-center space-x-4 md:justify-end">
                    <a
                        href="https://instagram.com/tuCuenta"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="transition-colors hover:text-secondary"
                    >
                        <FaInstagram className="h-6 w-6" />
                    </a>
                    <a
                        href="https://api.whatsapp.com/send?phone=+3765484773&text=Te%20comunicaste%20con%20VOI.%F0%9F%8E%9F%EF%B8%8F%20%0ADejanos%20tu%20consulta%20y%20te%20responderemos%20en%20breve."
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="transition-colors hover:text-secondary"
                    >
                        <FaWhatsapp className="h-6 w-6" />
                    </a>
                </div>
            </div>

            {/* Separador */}
            <div className="border-t border-white/20" />

            {/* Barra inferior */}
            <div className="container mx-auto flex flex-col items-center justify-center space-x-3 space-y-4 px-4 py-6 text-xs text-white/70 md:flex-row md:space-y-0">
                <p className="text-center md:text-left">© {currentYear} VOI. Todos los derechos reservados.</p>
                <div className="flex flex-col justify-center space-y-2 text-center md:flex-row md:justify-end md:space-x-4 md:space-y-0">
                    <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline transition-colors hover:text-secondary"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline transition-colors hover:text-secondary"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="/cookies-settings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline transition-colors hover:text-secondary"
                    >
                        Cookies Settings
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
