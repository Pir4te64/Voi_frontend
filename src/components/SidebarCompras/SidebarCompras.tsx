import { useSidebarComprasStore } from '@/components/SidebarCompras/store/useSidebarComprasStore';
import { FaTimes } from 'react-icons/fa';

const SidebarCompras = () => {
    const { isOpen, closeSidebar } = useSidebarComprasStore();

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
                className={`fixed right-4 top-20 z-[99999999] w-80 transform rounded-lg bg-[#1a1a1a] p-4 shadow-2xl transition-all duration-200
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

                    {/* Aquí irá el contenido del carrito */}
                    <div className="flex flex-col gap-4">
                        {/* El contenido se agregará después */}
                    </div>

                    <div className="mt-auto border-t border-gray-700 pt-4">
                        <button
                            className="w-full rounded-lg bg-[#ff4d6d] py-2 text-white transition-colors hover:bg-[#ff4d6d]/90"
                        >
                            Comprar Ahora
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarCompras; 