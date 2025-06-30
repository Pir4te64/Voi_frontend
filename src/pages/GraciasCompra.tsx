import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome } from 'react-icons/fa';
import logo from '@/assets/Logo.svg';
import Layout from '@/Layout';

const GraciasCompra: React.FC = () => {
    const navigate = useNavigate();

    const handleIrAlInicio = () => {
        navigate('/');
    };

    return (
        <Layout>
            <div className="flex min-h-screen items-center justify-center bg-primary px-4">
                <div className="w-full max-w-md text-center">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <img src={logo} alt="Voi Logo" className="h-16 w-auto" />
                    </div>

                    {/* Icono de éxito */}
                    <div className="mb-6 flex justify-center">
                        <FaCheckCircle className="text-6xl text-secondary" />
                    </div>

                    {/* Título */}
                    <h1 className="mb-4 text-3xl font-bold text-white">
                        ¡Gracias por tu compra!
                    </h1>

                    {/* Mensaje */}
                    <p className="mb-8 text-lg leading-relaxed text-neutral">
                        Tu compra ha sido procesada exitosamente.
                        Revisa tu sección de tickets o compras para ver los detalles.
                    </p>

                    {/* Información adicional */}
                    <div className="mb-8 rounded-lg bg-back p-6">
                        <h2 className="mb-3 text-xl font-semibold text-white">
                            Próximos pasos:
                        </h2>
                        <ul className="space-y-2 text-left text-neutral">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-secondary">•</span>
                                <span>Recibirás un email de confirmación</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 text-secondary">•</span>
                                <span>Puedes revisar tus tickets en tu perfil</span>
                            </li>

                        </ul>
                    </div>

                    {/* Botón para ir al inicio */}
                    <button
                        onClick={handleIrAlInicio}
                        className="inline-flex items-center gap-3 rounded-xl bg-secondary px-8 py-3 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-secondary/90"
                    >
                        <FaHome className="text-xl" />
                        Ir al Inicio
                    </button>

                </div>
            </div>
        </Layout>
    );
};

export default GraciasCompra; 