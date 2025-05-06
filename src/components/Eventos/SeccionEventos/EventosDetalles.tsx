import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { staticEvents } from './EventosEstaticos';
import { FaMapMarkerAlt } from 'react-icons/fa';

const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event = staticEvents.find(e => e.id.toString() === id);
    const swiperRef = useRef<any>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const [showMap, setShowMap] = useState(false);

    if (!event) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg">Evento no encontrado.</p>
            </div>
        );
    }

    // Usamos la dirección para generar un embed de Google Maps
    const mapSrc =
        `https://www.google.com/maps?q=${encodeURIComponent(event.mapUrl || '')}&output=embed`;

    return (
        <div className="relative w-full bg-primary">
            {/* Glow a la izquierda, centrado verticalmente */}
            <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2
                   w-96 h-96 bg-secondary rounded-full
                   filter blur-3xl opacity-30 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto py-6 bg-primary flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                    {/* Columna izquierda: carrusel */}
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

                    {/* Columna derecha: detalles */}
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
                                className="mt-2 flex items-center text-lg text-secondary "
                            >
                                <FaMapMarkerAlt className="mr-2" /> Ver Mapa
                            </button>

                            {/* Mapa embebido */}
                            {showMap && (
                                <div className="mt-4 w-full h-64 rounded-lg overflow-hidden">
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

                        <section className="space-y-2">
                            <span className="text-secondary text-sm font-semibold uppercase">Tipo de Entrada</span>
                            <select
                                defaultValue={event.defaultTicket}
                                className="w-full bg-primary border border-gray-600 rounded-lg px-4 py-2 text-white"
                            >
                                {event.ticketTypes.map(t => (
                                    <option key={t.type} value={t.type} disabled={!t.available}>
                                        {t.type} {t.available ? '' : '(SOLD OUT)'} — ${t.price.toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-secondary text-primary py-3 rounded-full font-semibold">
                                Añadir al Carrito
                            </button>
                            <button className="flex-1 border border-secondary text-secondary py-3 rounded-full font-semibold">
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
