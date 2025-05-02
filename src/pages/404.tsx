// src/pages/ErrorNotFound.jsx
import { Link } from "react-router-dom";
import logoGrande from "@/assets/LogoGrande.svg";

const ErrorNotFound = () => {
    return (
        <div className="relative flex items-center justify-center h-screen bg-primary text-white overflow-hidden">
            {/* Logo al centro, con opacidad baja */}
            <img
                src={logoGrande}
                alt="Logo CruzNegra"
                className="absolute inset-0 w-full h-full max-h-[70vh] m-auto object-contain opacity-10 pointer-events-none select-none"
            />

            {/* Contenido principal */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-[10vw] leading-none font-extrabold drop-shadow-lg">
                    404
                </h1>
                <p className="mt-2 mb-8 text-lg md:text-2xl text-center font-light">
                    ¡Ups! La página que buscas no existe.
                </p>

                <Link
                    to="/"
                    className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow hover:bg-gray-100 transition"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default ErrorNotFound;
