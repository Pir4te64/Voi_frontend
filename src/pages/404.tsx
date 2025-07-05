// src/pages/ErrorNotFound.jsx
import { Link } from "react-router-dom";
import logoGrande from "@/assets/LogoGrande.svg";
import { usePageTitle } from '@/context/usePageTitle';

const ErrorNotFound = () => {
    usePageTitle('404');
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-primary text-white">
            {/* Logo al centro, con opacidad baja */}
            <img
                src={logoGrande}
                alt="Logo CruzNegra"
                className="pointer-events-none absolute inset-0 m-auto h-full max-h-[70vh] w-full select-none object-contain opacity-10"
            />

            {/* Contenido principal */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-[10vw] font-extrabold leading-none drop-shadow-lg">
                    404
                </h1>
                <p className="mb-8 mt-2 text-center text-lg font-light md:text-2xl">
                    ¡Ups! La página que buscas no existe.
                </p>

                <Link
                    to="/"
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow transition hover:bg-gray-100"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default ErrorNotFound;
