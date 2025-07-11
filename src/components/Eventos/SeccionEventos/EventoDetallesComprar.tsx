import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useCarritoStore } from '@/components/SidebarCompras/store/useCarritoStore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StaticEventDetail } from '@/components/Eventos/SeccionEventos/data/Interfaces';
import axios from 'axios';
import { api_url } from '@/api/api';
import { useAuth } from '@/context/AuthContext';

interface EventoDetallesComprarProps {
    event: StaticEventDetail;
}

const EventoDetallesComprar: React.FC<EventoDetallesComprarProps> = ({ event }) => {
    const navigate = useNavigate();
    const { addToCart, isAuthenticated, getItemQuantity, updateQuantity, items } = useCarritoStore();
    const { me } = useAuth();

    // Función para verificar si el usuario puede comprar (solo usuarios normales)
    const canUserBuy = () => {
        return isAuthenticated() && me?.roles?.includes('ROLE_USUARIO');
    };

    // Estado para el ticket seleccionado
    const [selectedTicket, setSelectedTicket] = useState<string>(() => {
        const defaultTicket = event.defaultTicket || event.ticketTypes[0]?.type;
        if (!defaultTicket) {
            console.warn('No se encontró un ticket por defecto para el evento:', event.id);
            return "";
        }
        return defaultTicket;
    });

    // Verificar si hay lotes disponibles
    const hasAvailableTickets = event.ticketTypes && event.ticketTypes.length > 0;

    // Inicializar quantity con la cantidad del carrito si existe
    const [quantity, setQuantity] = useState(() => {
        if (!hasAvailableTickets) return 0;

        const defaultTicket = event.defaultTicket || event.ticketTypes[0]?.type;
        if (!defaultTicket) return 0;

        // Solo considerar el carrito si el usuario puede comprar
        if (isAuthenticated() && canUserBuy()) {
            return getItemQuantity(event.id, defaultTicket) || 1;
        }
        return 1;
    });

    // Escuchar cambios en el carrito para este ticket
    useEffect(() => {
        if (!hasAvailableTickets || !selectedTicket) return;

        // Solo actualizar si el usuario puede comprar
        if (isAuthenticated() && canUserBuy()) {
            const nuevaCantidad = getItemQuantity(event.id, selectedTicket);
            // Si el elemento existe en el carrito, usar esa cantidad
            // Si no existe, usar 1 como cantidad por defecto
            setQuantity(nuevaCantidad > 0 ? nuevaCantidad : 1);
        }
    }, [items, selectedTicket, event.id, getItemQuantity, hasAvailableTickets]);

    // Actualizar cantidad cuando cambie el tipo de ticket seleccionado
    useEffect(() => {
        if (!hasAvailableTickets || !selectedTicket) return;

        // Solo actualizar si el usuario puede comprar
        if (isAuthenticated() && canUserBuy()) {
            const nuevaCantidad = getItemQuantity(event.id, selectedTicket);
            // Si el elemento existe en el carrito, usar esa cantidad
            // Si no existe, usar 1 como cantidad por defecto
            setQuantity(nuevaCantidad > 0 ? nuevaCantidad : 1);
        }
    }, [selectedTicket, event.id, getItemQuantity, hasAvailableTickets]);

    // Calcular total
    const total = (() => {
        if (!selectedTicket || !hasAvailableTickets) return 0;
        const ticket = event.ticketTypes.find((t) => t.type === selectedTicket);
        return (ticket?.price ?? 0) * quantity;
    })();

    // Función para actualizar la cantidad
    const handleQuantityChange = (newQuantity: number) => {
        if (!hasAvailableTickets || !selectedTicket) return;

        setQuantity(newQuantity);

        // Si el usuario está autenticado y puede comprar, actualizar el carrito en tiempo real
        if (isAuthenticated() && canUserBuy()) {
            const selectedTicketType = event.ticketTypes.find(t => t.type === selectedTicket);
            if (!selectedTicketType) return;

            if (newQuantity > 0) {
                updateQuantity(event.id, selectedTicket, newQuantity);
            }
        }
    };

    const handleAddToCart = () => {
        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesión para agregar items al carrito');
            return;
        }

        if (!canUserBuy()) {
            toast.error('Solo los usuarios unicos pueden agregar items al carrito');
            return;
        }

        if (!hasAvailableTickets || !selectedTicket) {
            toast.error('No hay entradas disponibles para agregar al carrito');
            return;
        }

        const selectedTicketType = event.ticketTypes.find(t => t.type === selectedTicket);
        if (!selectedTicketType) {
            toast.error('Error al agregar al carrito: Tipo de entrada no encontrado');
            return;
        }

        if (!selectedTicketType.loteId) {
            toast.error('Error: No se encontró el ID del lote');
            return;
        }

        addToCart({
            eventId: event.id,
            title: event.title,
            ticketType: selectedTicket,
            quantity,
            price: selectedTicketType.price,
            loteId: selectedTicketType.loteId
        });
    };

    const handleBuyNow = async () => {
        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesión para realizar la compra');
            return;
        }

        if (!canUserBuy()) {
            toast.error('Solo los usuarios unicos pueden realizar compras');
            return;
        }

        if (!hasAvailableTickets || !selectedTicket) {
            toast.error('No hay entradas disponibles para comprar');
            return;
        }

        const selectedTicketType = event.ticketTypes.find(t => t.type === selectedTicket);
        if (!selectedTicketType) {
            toast.error('Error al agregar al carrito: Tipo de entrada no encontrado');
            return;
        }

        // Primero agregamos el item actual al carrito
        addToCart({
            eventId: event.id,
            title: event.title,
            ticketType: selectedTicket,
            quantity,
            price: selectedTicketType.price,
            loteId: selectedTicketType.loteId!
        });

        // Obtenemos todos los items del carrito (incluido el que acabamos de agregar)
        const { items } = useCarritoStore.getState();

        const ticketsData = {
            tickets: items.map(item => ({
                loteId: item.loteId,
                cantidad: item.quantity
            }))
        };

        try {
            const token = localStorage.getItem("auth")
                ? JSON.parse(localStorage.getItem("auth")!).accessToken
                : null;

            if (!token) {
                toast.error('No hay token de autenticación');
                return;
            }

            const response = await axios.post(
                api_url.comprar_tickets,
                ticketsData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log('Respuesta de compra:', response.data);
            toast.success('Compra realizada con éxito');
            navigate('/compra-realizada', { state: { ordenCompra: response.data } });
        } catch (error: any) {
            console.error('Error al realizar la compra:', error);
            toast.error(error.response?.data?.message || 'Error al realizar la compra');
        }
    };

    return (
        <div className="space-y-4">
            {!hasAvailableTickets ? (
                <div className="py-8 text-center">
                    <h2 className="mb-2 text-lg font-semibold text-secondary">
                        No hay entradas disponibles
                    </h2>
                    <p className="text-sm text-gray-300">
                        Este evento no tiene lotes de entradas configurados o todos los lotes están agotados.
                    </p>
                </div>
            ) : (
                <>
                    {/* Entrada y Cantidad */}
                    <section className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                        <div className="w-full space-y-2">
                            <h2 className="text-sm font-semibold uppercase text-secondary">
                                Tipo de Entrada
                            </h2>
                            <select
                                value={selectedTicket}
                                onChange={(e) => setSelectedTicket(e.target.value)}
                                className="w-full rounded-lg border border-gray-600 bg-primary px-3 py-2 text-sm text-white md:px-4 md:text-base"
                            >
                                {event.ticketTypes.map((t) => (
                                    <option key={t.type} value={t.type} disabled={!t.available}>
                                        {t.type}
                                        {t.available ? "" : " (SOLD OUT)"} — $
                                        {t.price.toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full space-y-2">
                            <h2 className="text-sm font-semibold uppercase text-secondary">
                                Cantidad
                            </h2>
                            <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-600">
                                <button
                                    className="px-3 py-2 text-white md:px-4"
                                    onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                                >
                                    <FaMinus />
                                </button>
                                <input
                                    type="text"
                                    readOnly
                                    value={quantity}
                                    className="w-10 bg-primary px-2 py-2 text-center text-sm text-white focus:outline-none md:w-12 md:px-4 md:text-base"
                                />
                                <button
                                    className="px-3 py-2 text-white md:px-4"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Total */}
                    <div className="mt-4">
                        <p className="text-sm font-semibold uppercase">Total</p>
                        <p className="text-3xl font-bold text-white md:text-4xl">
                            ${total.toLocaleString()}
                        </p>
                    </div>

                    {/* Botones */}
                    <div className="mt-4 flex flex-col gap-3 md:gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-primary transition hover:text-white md:py-3 md:text-base"
                        >
                            Añadir al Carrito
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="w-full rounded-xl border border-secondary px-4 py-2.5 text-sm font-semibold text-secondary transition hover:text-white md:py-3 md:text-base"
                        >
                            Comprar Ahora
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default EventoDetallesComprar; 