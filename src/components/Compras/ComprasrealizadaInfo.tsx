import React from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import { api_url } from '@/api/api';

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
    //const navigate = useNavigate();
    const [isResumenOpen, setIsResumenOpen] = React.useState(true);
    const [loadingPago, setLoadingPago] = React.useState(false);
    const [pagoData, setPagoData] = React.useState<any>(null);

    const handleContinuarPago = async () => {
        setLoadingPago(true);
        setPagoData(null);
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                console.error("No hay token de autenticación");
                setLoadingPago(false);
                return;
            }
            console.log(token);

            // Hacer la petición al endpoint
            const response = await axios.post(
                `${api_url.crear_orden_pago}?ordenId=${ordenCompra.id}`,
                {}, // body vacío
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setPagoData(response.data.data); // Guardar los datos de pago
        } catch (error) {
            console.error("Error al hacer la petición:", error);
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
                        <li>
                            <a href="#resumen" className="text-secondary hover:text-white">
                                Resumen de Compra
                            </a>
                        </li>
                        <li>
                            <a href="#datos" className="text-gray-400 hover:text-white">
                                Datos del Comprador
                            </a>
                        </li>
                        <li>
                            <a href="#metodo" className="text-gray-400 hover:text-white">
                                Método de Pago
                            </a>
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

                            <div className="pt-4">
                                <button
                                    onClick={() => {
                                        setIsResumenOpen(false);
                                        setTimeout(() => {
                                            document.getElementById('datos')?.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start'
                                            });
                                        }, 100);
                                    }}
                                    className="mx-auto block w-48 rounded-lg bg-secondary py-2 text-center font-semibold text-white transition-colors hover:bg-secondary/90"
                                >
                                    Continuar Pedido
                                </button>
                            </div>
                        </div>
                    </details>

                    {/* Sección 3: Método de Pago */}
                    <div id="metodo" className="mb-6 rounded-lg bg-[#252525] p-6">
                        <h2 className="mb-6 text-xl font-semibold text-secondary">Método de Pago</h2>
                        <div className="space-y-4">
                            {loadingPago && (
                                <div className="flex items-center justify-center">
                                    <span className="text-white">Cargando opciones de pago...</span>
                                </div>
                            )}
                            {!loadingPago && pagoData && (
                                <div className="space-y-4">
                                    <a
                                        href={pagoData.checkout_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full rounded-lg bg-secondary py-2 text-center font-semibold text-white transition-colors hover:bg-secondary/90"
                                    >
                                        Ir a Pagar
                                    </a>
                                    <div>
                                        <span className="text-gray-400">Monto:</span>
                                        <span className="ml-2 font-bold text-white">
                                            {pagoData.amount.value} {pagoData.amount.currency}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">QR:</span>
                                        <div className="break-all rounded bg-black/40 p-2 text-xs text-white">{pagoData.qr_data}</div>
                                    </div>
                                </div>
                            )}
                            {!loadingPago && !pagoData && (
                                <p className="text-gray-400">Haz clic en "Continuar Pago" para ver las opciones.</p>
                            )}
                        </div>
                    </div>

                    {/* Botón de Continuar */}
                    <button
                        onClick={handleContinuarPago}
                        className="w-full rounded-lg bg-secondary py-3 text-center font-semibold text-white transition-colors hover:bg-secondary/90"
                    >
                        Continuar Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComprasRealizadaInfo;
