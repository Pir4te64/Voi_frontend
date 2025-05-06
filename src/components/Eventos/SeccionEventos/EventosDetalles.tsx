import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { staticEvents } from './EventosEstaticos';


const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event = staticEvents.find(e => e.id.toString() === id);
    const swiperRef = useRef<any>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    if (!event) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg">Evento no encontrado.</p>
            </div>
        );
    }

    return (
        <div className='w-full bg-primary'>
            <div className="max-w-4xl mx-auto py-6 bg-primary flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Columna izquierda: carrusel de imágenes */}
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

                        {/* Dots de navegación */}
                        <div className="flex justify-center gap-2 mt-4">
                            {event.gallery?.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => swiperRef.current.slideToLoop(idx)}
                                    className={`w-3 h-3 rounded-full transition-colors ${activeIdx === idx ? 'bg-white' : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha: detalles del evento */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-white">{event.title}</h1>

                        <p className="text-secondary  text-lg">Descripcion:</p>
                        <p className="text-md leading-relaxed text-gray-200">
                            {event.description}
                        </p>
                        <p className="text-secondary  text-lg">Fecha y Horario: </p>

                        <p className="text-white">
                            {event.fullDate}
                        </p>
                        <p className="text-secondary  text-lg">Dirección: </p>

                        <p className="text-white">
                            {event.address}

                        </p>
                        {event.mapUrl && (
                            <a
                                href={event.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-secondary"
                            >
                                Ver Mapa
                            </a>
                        )}
                        <div className="space-y-2">
                            <span className="">Tipo de Entrada:</span>
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
                        </div>

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
