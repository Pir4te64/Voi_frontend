import React from 'react';
import { FaChevronDown, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { api_url } from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { useCarritoStore } from '@/components/SidebarCompras/store/useCarritoStore';

interface OrdenCompra {
    id: number;
    usuarioId: number;
    fechaCreacion: string;
    estado: string;
    montoTotal: number;
    cantidadTickets: number;
    recargo: number;
    tickets: {
        id: number;
        ticketId: number;
        precioUnitario: number;
    }[];
    ordenPago: any;
}

interface ComprasRealizadaInfoProps {
    ordenCompra: OrdenCompra;
}

const ComprasRealizadaInfo: React.FC<ComprasRealizadaInfoProps> = ({ ordenCompra }) => {
    const navigate = useNavigate();
    const { clearCart } = useCarritoStore();
    const [isResumenOpen, setIsResumenOpen] = React.useState(true);
    const [loadingPago, setLoadingPago] = React.useState(false);
    const [pagoData, setPagoData] = React.useState<any>(null);
    const [isMetodoPagoActive, _] = React.useState(false);
    const [showCancelModal, setShowCancelModal] = React.useState(false);
    const [peticionExitosa, setPeticionExitosa] = React.useState(false);

    const handleCancelarPago = () => {
        clearCart();
        navigate('/');
    };


    const handleContinuarPago = async () => {
        setLoadingPago(true);
        setPagoData(null);
        setPeticionExitosa(false);
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                toast.error("No hay token de autenticación. Por favor, inicia sesión nuevamente.");
                setLoadingPago(false);
                return;
            }

            // Hacer la petición al endpoint
            const response = await axios.post(
                `${api_url.crear_orden_pago}?ordenId=${ordenCompra.id}`,
                {}, // body vacío
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setPagoData(response.data.data); // Guardar los datos de pago
            setPeticionExitosa(true);
            toast.success("Orden de pago creada exitosamente");
        } catch (error: any) {
            console.error("Error al hacer la petición:", error);
            const errorMessage = error.response?.data?.message || "Error al crear la orden de pago. Inténtalo nuevamente.";
            toast.error(errorMessage);
            setPeticionExitosa(false);
        } finally {
            setLoadingPago(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Navegación Lateral */}
            <div className="w-64 flex-shrink-0 border-gray-800 bg-primary p-6">
                <h1 className="mb-6 text-2xl font-bold text-secondary">Comprar Ahora</h1>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-white">Tabla de contenidos</h2>
                    <ul className="space-y-2">
                        <li className="text-secondary hover:text-white">
                            Resumen de Compra
                        </li>
                        <li className={`${isMetodoPagoActive ? 'text-secondary' : 'text-gray-400'} hover:text-white transition-colors`}>
                            Método de Pago
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="flex-grow">
                <div className="mx-auto max-w-3xl px-8 py-6">
                    {/* Sección 1: Resumen de Compra */}
                    <details
                        className="mb-6 rounded-lg bg-[#252525] p-6"
                        open={isResumenOpen}
                        onToggle={(e) => setIsResumenOpen(e.currentTarget.open)}
                    >
                        <summary className="mb-6 flex cursor-pointer items-center gap-2 text-xl font-semibold text-white transition-colors hover:text-secondary hover:underline">
                            {isResumenOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                            Resumen de Compra
                        </summary>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-white">Nombre del Evento</h3>
                                {ordenCompra.tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex items-center justify-between border-b border-gray-700 py-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-400">Entrada General</span>
                                            <span className="text-xs text-gray-500">Ticket #{ticket.ticketId}</span>
                                        </div>
                                        <span className="font-semibold text-white">${ticket.precioUnitario.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-gray-700 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Cargo por servicio</span>
                                    <span className="font-semibold text-white">${ordenCompra.recargo.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold text-white">TOTAL DEL CARRITO</span>
                                    <span className="text-lg font-bold text-white">${ordenCompra.montoTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </details>

                    {/* Sección 3: Método de Pago */}
                    <div id="metodo" className="mb-6 rounded-lg bg-[#252525] p-6">
                        <h2 className="mb-6 text-xl font-semibold text-secondary">Método de Pago</h2>
                        <div className="space-y-4">
                            {loadingPago && (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin text-2xl text-secondary" />
                                </div>
                            )}
                            {!loadingPago && pagoData && (
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-gray-400">Monto:</span>
                                        <span className="ml-2 font-bold text-white">
                                            {pagoData.amount.value} {pagoData.amount.currency}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Código QR para pago:</span>
                                        <div className="mt-2 flex justify-center rounded bg-white p-4">
                                            <QRCodeSVG
                                                value={pagoData.checkout_url}
                                                size={200}
                                                level="M"
                                                includeMargin={true}
                                            />
                                        </div>
                                        <p className="mt-2 text-center text-xs text-gray-400">
                                            Escanea este código QR con tu aplicación de pagos móvil
                                        </p>
                                    </div>
                                </div>
                            )}
                            {!loadingPago && !pagoData && (
                                <p className="text-gray-400">Haz clic en "Continuar Pago" para ver las opciones.</p>
                            )}
                        </div>
                    </div>

                    {/* Botones de Continuar y Cancelar */}
                    <div className="flex gap-4">
                        {!peticionExitosa && (
                            <button
                                onClick={handleContinuarPago}
                                disabled={loadingPago}
                                className="flex-1 rounded-lg bg-secondary py-3 text-center font-semibold text-white transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Continuar Pago
                            </button>
                        )}

                        {peticionExitosa && pagoData && (
                            <a
                                href={pagoData.checkout_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 rounded-lg bg-secondary py-3 text-center font-semibold text-white transition-colors hover:bg-secondary/90"
                            >
                                Ir a Pagar
                            </a>
                        )}

                        <button
                            onClick={() => setShowCancelModal(true)}
                            className="flex-1 rounded-lg border border-red-500 bg-transparent py-3 text-center font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                        >
                            Cancelar Pago
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmación para Cancelar */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-[#252525] p-6">
                        <h3 className="mb-4 text-xl font-semibold text-white">
                            ¿Cancelar Pago?
                        </h3>
                        <p className="mb-6 text-gray-300">
                            ¿Estás seguro de que deseas cancelar el pago? Esta acción limpiará tu carrito y te llevará al inicio.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 rounded-lg border border-gray-600 bg-transparent py-2 text-center font-semibold text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                            >
                                No, Continuar
                            </button>
                            <button
                                onClick={handleCancelarPago}
                                className="flex-1 rounded-lg bg-red-500 py-2 text-center font-semibold text-white transition-colors hover:bg-red-600"
                            >
                                Sí, Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComprasRealizadaInfo;
