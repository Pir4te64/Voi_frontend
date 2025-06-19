import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useSidebarComprasStore } from './store/useSidebarComprasStore';
import { useCarritoStore } from './store/useCarritoStore';
import { useNavigate } from 'react-router-dom';

const SidebarCompras = () => {
    const { isOpen, closeSidebar } = useSidebarComprasStore();
    const { items, removeFromCart, isAuthenticated, updateQuantity } = useCarritoStore();
    const navigate = useNavigate();

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleQuantityChange = (eventId: number, ticketType: string, currentQuantity: number, change: number) => {
        const newQuantity = Math.max(0, currentQuantity + change);
        updateQuantity(eventId, ticketType, newQuantity);
    };

    const handleCheckout = () => {
        if (!isAuthenticated()) {
            closeSidebar();
            navigate('/login');
            return;
        }
        closeSidebar();
        navigate('/checkout');
    };

    return (
        <>
            {/* Overlay - solo visible en mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[99999998] bg-black bg-opacity-50 transition-opacity duration-200 md:hidden"
                />
            )}

            {/* Carrito Popup/Sidebar */}
            <div
                className={`fixed right-4 top-20 z-[99999999] w-96 transform rounded-lg bg-[#1a1a1a] p-4 shadow-2xl transition-all duration-200
                    ${isOpen
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }
                    ${/* Mobile styles */ ''}
                    md:right-4 md:top-20
                    max-md:inset-x-0 max-md:top-0 max-md:h-full max-md:w-full max-md:rounded-none
                `}
            >
                {/* Botón de cierre móvil */}
                <button
                    onClick={closeSidebar}
                    className="absolute right-4 top-4 text-secondary transition-colors hover:text-white md:hidden"
                >
                    <FaTimes className="h-6 w-6" />
                </button>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-secondary">Carrito</h2>

                    {/* Lista de items */}
                    <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
                        {items.length === 0 ? (
                            <p className="py-4 text-center text-gray-400">Tu carrito está vacío</p>
                        ) : (
                            items.map((item) => (
                                <div key={`${item.eventId}-${item.ticketType}`} className="flex flex-col gap-2 rounded-lg bg-[#252525] p-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium text-white">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.ticketType}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.eventId, item.ticketType)}
                                            className="text-gray-400 transition-colors hover:text-red-500"
                                        >
                                            <FaTrash className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.eventId, item.ticketType, item.quantity, -1)}
                                                className="p-1 text-white transition-colors hover:text-secondary"
                                            >
                                                <FaMinus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.eventId, item.ticketType, item.quantity, 1)}
                                                className="p-1 text-white transition-colors hover:text-secondary"
                                            >
                                                <FaPlus className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <span className="text-white">${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Total y botón de checkout */}
                    {items.length > 0 && (
                        <div className="mt-auto border-t border-gray-700 pt-4">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="font-semibold text-white">Total</span>
                                <span className="text-xl font-bold text-white">${total.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full rounded-lg border border-white bg-transparent py-2 text-white transition-colors hover:bg-[#ff4d6d]/90"
                            >
                                Comprar Ahora
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidebarCompras; 