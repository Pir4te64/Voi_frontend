// src/components/Footer.tsx
import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '@/assets/Logo.svg';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white flex flex-col justify-between md:h-auto z-50">
            {/* Barra superior */}
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
                {/* Logo */}
                <div className="flex justify-center md:justify-start flex-1">
                    <img src={logo} loading='lazy' alt="VOI Logo" className="h-auto  md:h-16 object-cover" />
                </div>

                {/* Enlaces de utilidad */}
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 text-sm flex-1">
                    <a href="/faq" className="hover:text-secondary transition-colors">
                        Preguntas Frecuentes
                    </a>
                    <a href="mailto:ticketeravoi@gmail.com" className="hover:text-secondary transition-colors">
                        ticketeravoi@gmail.com
                    </a>
                </div>

                {/* Iconos sociales */}
                <div className="flex justify-center md:justify-end space-x-4 flex-1">
                    <a
                        href="https://instagram.com/tuCuenta"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-secondary transition-colors"
                    >
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a
                        href="https://api.whatsapp.com/send?phone=+3765484773&text=Te%20comunicaste%20con%20VOI.%F0%9F%8E%9F%EF%B8%8F%20%0ADejanos%20tu%20consulta%20y%20te%20responderemos%20en%20breve."
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="hover:text-secondary transition-colors"
                    >
                        <FaWhatsapp className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Separador */}
            <div className="border-t border-white/20" />

            {/* Barra inferior */}
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-center space-x-3 space-y-4 md:space-y-0 text-xs text-white/70">
                <p className="text-center md:text-left">© {currentYear} VOI. Todos los derechos reservados.</p>
                <div className="flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 text-center">
                    <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary underline transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary underline transition-colors"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="/cookies-settings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary underline transition-colors"
                    >
                        Cookies Settings
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
