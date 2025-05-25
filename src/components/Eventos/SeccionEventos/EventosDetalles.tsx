// src/components/Eventos/EventDetail.tsx
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { staticEvents, EventDetail as StaticEventDetail } from '@/components/Eventos/SeccionEventos/EventosEstaticos';
import { useEventsStore } from '@/components/heroEvents/store/useEventsStore';
import { FaMapMarkerAlt, FaMinus, FaPlus } from 'react-icons/fa';

interface RemoteEvent {
    id: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    fechaInicio: string;    // "YYYY-MM-DD"
    fechaFin: string;       // "YYYY-MM-DD"
    galeriaUrls: string[];
    // ticketTypes y defaultTicket no vienen del API
}

const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = parseInt(id!, 10);

    // estado para slider
    const swiperRef = useRef<any>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [showMap, setShowMap] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // store remoto
    const remoteEvents = useEventsStore(s => s.events) as RemoteEvent[];
    const fetchEvents = useEventsStore(s => s.fetchEvents);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // buscar en remoto y mapear
    const raw = remoteEvents.find(e => e.id === numericId);
    const mappedRemote: StaticEventDetail | undefined = raw
        ? {
            ...staticEvents[0], // tomamos shape de ejemplo
            id: raw.id,
            title: raw.nombre,
            description: raw.descripcion,
            address: raw.lugar,
            fullDate: (() => {
                const [y1, m1, d1] = raw.fechaInicio.split('-');
                const [y2, m2, d2] = raw.fechaFin.split('-');
                const day1 = parseInt(d1, 10), mon1 = monthNames[parseInt(m1, 10) - 1];
                const day2 = parseInt(d2, 10), mon2 = monthNames[parseInt(m2, 10) - 1];
                return `${day1} ${mon1} ${y1} – ${day2} ${mon2} ${y2}`;
            })(),
            gallery: raw.galeriaUrls,
            // ticketTypes y defaultTicket quedan como en staticEvents
            ticketTypes: staticEvents.find(e => e.id === raw.id)?.ticketTypes || staticEvents[0].ticketTypes,
            defaultTicket: staticEvents.find(e => e.id === raw.id)?.defaultTicket || staticEvents[0].defaultTicket,
        }
        : undefined;

    // usar remoto si existe, si no el estático
    const event = mappedRemote ?? staticEvents.find(e => e.id.toString() === id)!;

    // ticket
    const [selectedTicket, setSelectedTicket] = useState<string>(
        event.defaultTicket || event.ticketTypes[0].type
    );

    // total
    const total = useMemo(() => {
        const ticket = event.ticketTypes.find(t => t.type === selectedTicket);
        return (ticket?.price || 0) * quantity;
    }, [selectedTicket, quantity, event.ticketTypes]);

    // mapa
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed`;

    if (!event) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg">Evento no encontrado.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full bg-primary">
            <div
                className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 transform rounded-full bg-secondary opacity-30 blur-3xl filter"
            />

            <div className="mx-auto flex max-w-7xl justify-center py-6">
                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Carrusel */}
                    <div>
                        <Swiper
                            modules={[A11y]}
                            onSwiper={swiper => { swiperRef.current = swiper; }}
                            onSlideChange={swiper => setActiveIdx(swiper.realIndex)}
                            slidesPerView={1}
                            spaceBetween={20}
                            className="overflow-hidden rounded-2xl"
                        >
                            {event.gallery.map((imgSrc, idx) => (
                                <SwiperSlide key={idx}>
                                    <img
                                        src={imgSrc}
                                        alt={`${event.title} slide ${idx + 1}`}
                                        className="h-[680px] w-full rounded-2xl object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="mt-4 flex justify-center gap-2">
                            {event.gallery.map((_, idx) => (
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
                            <h2 className="mb-1 text-sm font-semibold uppercase text-secondary">Descripción</h2>
                            <p className="text-md leading-relaxed text-gray-200">
                                {event.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-1 text-sm font-semibold uppercase text-secondary">Fecha y Horario</h2>
                            <p className="text-white">{event.fullDate}</p>
                        </section>

                        <section>
                            <h2 className="mb-1 text-sm font-semibold uppercase text-secondary">Dirección</h2>
                            <p className="text-white">{event.address}</p>
                            <button
                                onClick={() => setShowMap(prev => !prev)}
                                className="mt-2 flex items-center text-lg text-secondary"
                            >
                                <FaMapMarkerAlt className="mr-2" /> Ver Mapa
                            </button>
                            {showMap && (
                                <div className="mt-4 h-64 w-full overflow-hidden rounded-lg transition-all duration-300">
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

                        {/* Entrada y Cantidad */}
                        <section className="flex flex-row items-center gap-6">
                            <div className="flex-1 space-y-2">
                                <h2 className="text-sm font-semibold uppercase text-secondary">Tipo de Entrada</h2>
                                <select
                                    value={selectedTicket}
                                    onChange={e => setSelectedTicket(e.target.value)}
                                    className="w-full rounded-lg border border-gray-600 bg-primary px-4 py-2 text-white"
                                >
                                    {event.ticketTypes.map(t => (
                                        <option key={t.type} value={t.type} disabled={!t.available}>
                                            {t.type}{t.available ? '' : ' (SOLD OUT)'} — ${t.price.toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-sm font-semibold uppercase text-secondary">Cantidad</h2>
                                <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-600">
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
                                        className="w-12 bg-primary px-4 py-2 text-center text-white focus:outline-none"
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
                            <p className="text-sm font-semibold uppercase">Total</p>
                            <p className="text-4xl font-bold text-white">${total.toLocaleString()}</p>
                        </div>

                        {/* Botones */}
                        <div className="mt-4 flex flex-col gap-4">
                            <button className="flex-1 rounded-xl bg-secondary px-4 py-3 font-semibold text-primary hover:text-white">
                                Añadir al Carrito
                            </button>
                            <button className="flex-1 rounded-xl border border-secondary px-4 py-3 font-semibold text-secondary hover:text-white">
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
