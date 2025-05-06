import React, { useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { staticEvents } from './EventosEstaticos';
import { FaMapMarkerAlt, FaMinus, FaPlus } from 'react-icons/fa';

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event = staticEvents.find(e => e.id.toString() === id);
    const swiperRef = useRef<any>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [quantity, setQuantity] = useState(1);
    // Estado para ticket seleccionado
    const [selectedTicket, setSelectedTicket] = useState<string>(
        event?.defaultTicket || (event?.ticketTypes[0]?.type ?? '')
    );

    if (!event) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg">Evento no encontrado.</p>
            </div>
        );
    }

    const mapSrc =
        `https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`;

    // Calcula el total
    const total = useMemo(() => {
        const ticket = event.ticketTypes.find(t => t.type === selectedTicket);
        return (ticket?.price || 0) * quantity;
    }, [selectedTicket, quantity, event.ticketTypes]);

    return (
        <div className="relative w-full bg-primary">
            {/* Glow lateral */}
            <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2
                   w-96 h-96 bg-secondary rounded-full
                   filter blur-3xl opacity-30 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto py-6 flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                    {/* Carrusel */}
                    <div>
                        <Swiper
                            modules={[A11y]}
                            onSwiper={swiper => { swiperRef.current = swiper; }}
                            onSlideChange={swiper => setActiveIdx(swiper.realIndex)}
                            slidesPerView={1}
                            spaceBetween={20}
                            className="rounded-2xl overflow-hidden"
                        >
                            {event.gallery?.map((imgSrc, idx) => (
                                <SwiperSlide key={idx}>
                                    <img
                                        src={imgSrc}
                                        alt={`${event.title} slide ${idx + 1}`}
                                        className="w-full h-[680px] object-cover rounded-2xl"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="flex justify-center gap-2 mt-4">
                            {event.gallery?.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => swiperRef.current?.slideToLoop(idx)}
                                    className={`w-3 h-3 rounded-full transition-colors ${activeIdx === idx ? 'bg-white' : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Detalles */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-white">{event.title}</h1>

                        <section>
                            <h2 className="text-secondary text-sm font-semibold uppercase mb-1">Descripción</h2>
                            <p className="text-md leading-relaxed text-gray-200">
                                {event.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-secondary text-sm font-semibold uppercase mb-1">Fecha y Horario</h2>
                            <p className="text-white">{event.fullDate}</p>
                        </section>

                        <section>
                            <h2 className="text-secondary text-sm font-semibold uppercase mb-1">Dirección</h2>
                            <p className="text-white">{event.address}</p>
                            <button
                                onClick={() => setShowMap(prev => !prev)}
                                className="mt-2 flex items-center text-lg text-secondary"
                            >
                                <FaMapMarkerAlt className="mr-2" /> Ver Mapa
                            </button>
                            {showMap && (
                                <div className="mt-4 w-full h-64 rounded-lg overflow-hidden transition-all duration-300">
                                    <iframe
                                        src={mapSrc}
                                        width="100%"
                                        height="100%"
                                        loading="lazy"
                                        className="border-0"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </section>

                        {/* Entrada y Cantidad en fila */}
                        <section className="flex flex-row items-center gap-6">
                            <div className="flex-1 space-y-2">
                                <h2 className="text-secondary text-sm font-semibold uppercase">Tipo de Entrada</h2>
                                <select
                                    value={selectedTicket}
                                    onChange={e => setSelectedTicket(e.target.value)}
                                    className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white"
                                >
                                    {event.ticketTypes.map(t => (
                                        <option key={t.type} value={t.type} disabled={!t.available}>
                                            {t.type} {t.available ? '' : '(SOLD OUT)'} — ${t.price.toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-secondary text-sm font-semibold uppercase">Cantidad</h2>
                                <div className="inline-flex items-center border border-gray-600 rounded-lg overflow-hidden">
                                    <button
                                        className="px-4 py-2 text-white"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    >
                                        <FaMinus />
                                    </button>
                                    <input
                                        type="text"
                                        readOnly
                                        value={quantity}
                                        className="w-12 px-4 py-2 text-center bg-primary text-white focus:outline-none"
                                    />
                                    <button
                                        className="px-4 py-2 text-white"
                                        onClick={() => setQuantity(q => q + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Total */}
                        <div className="mt-4">
                            <p className=" text-sm font-semibold uppercase">Total</p>
                            <p className="text-4xl font-bold text-white">${total.toLocaleString()}</p>
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col  gap-4 mt-4">
                            <button className="flex-1 bg-secondary text-primary hover:text-white px-4 py-3 rounded-xl font-semibold">
                                Añadir al Carrito
                            </button>
                            <button className="flex-1 border border-secondary text-secondary hover:text-white px-4 py-3 rounded-xl font-semibold">
                                Comprar Ahora
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventDetail;
