// src/components/SeccionEventos.tsx
import React, { useState, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import EventCard from '@/components/Eventos/EventCard';
import { staticEvents } from './EventosEstaticos';
import EventsFiltersSidebar from './EventsFiltersSidebar';
import GlowWrapper from '@/components/GlowWrapper';

/* Datos de demo */


const categories = ['Todos', 'Electrónica', 'Fiestas', 'Sociales'];
const orders = ['Aleatorio', 'Últimos Eventos Publicados', 'Primeros Eventos Publicados'];

const SeccionEventos: React.FC = () => {
    /* estado filtros */
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('Todos');
    const [order, setOrder] = useState('Aleatorio');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');

    /* Swiper */
    const swiperRef = useRef<any>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    /* filtrar + ordenar */
    const events = useMemo(() => {
        let evts = [...staticEvents];
        if (category !== 'Todos') evts = evts.filter(e => e.category === category);
        if (province) evts = evts.filter(e => e.city.toLowerCase().includes(province.toLowerCase()));
        if (city) evts = evts.filter(e => e.city.toLowerCase().includes(city.toLowerCase()));
        if (search) evts = evts.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
        if (order === 'Aleatorio') {
            evts.sort(() => Math.random() - 0.5);
        } else if (order === 'Últimos Eventos Publicados') {
            evts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        } else {
            evts.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        }
        return evts;
    }, [search, category, order, province, city]);

    return (
        <GlowWrapper reverse intensity={52}>
            <section className="w-full min-h-screen bg-primary text-white
                        flex flex-col md:flex-row gap-10
                        px-4 md:px-16 py-12">
                {/* Sidebar separada */}
                <EventsFiltersSidebar
                    search={search} setSearch={setSearch}
                    category={category} setCategory={setCategory}
                    order={order} setOrder={setOrder}
                    province={province} setProvince={setProvince}
                    city={city} setCity={setCity}
                    categories={categories}
                    orders={orders}
                />

                {/* Carrusel */}
                <div className="flex-1 min-w-0"> {/* min-w-0 evita overflow */}
                    {events.length === 0 ? (
                        <p className="text-center text-gray-400">
                            No se encontraron eventos 🤷‍♂️
                        </p>
                    ) : (
                        <>
                            <Swiper
                                modules={[A11y]}
                                onSwiper={swiper => { swiperRef.current = swiper; }}
                                onSlideChange={swiper => setActiveIdx(swiper.realIndex)}
                                slidesPerView={1}
                                spaceBetween={40}           /* valor seguro para desktop */
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 1 },
                                }}
                                className="mb-6 overflow-hidden" /* oculta sobrante */
                            >
                                {events.map(ev => (
                                    <SwiperSlide key={ev.id}>
                                        <EventCard
                                            image={ev.image}
                                            category={ev.category}
                                            date={ev.date}
                                            title={ev.title}
                                            location={ev.location}
                                            city={ev.city}
                                            onInfoClick={() => {/* modal o ruta */ }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* dots */}
                            <div className="flex justify-center gap-2">
                                {events.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => swiperRef.current?.slideToLoop(idx)}
                                        className={`
                    w-2 h-2 rounded-full transition-colors
                    ${activeIdx === idx ? 'bg-white' : 'bg-white/40'}
                  `}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </GlowWrapper>
    );
};

export default SeccionEventos;
