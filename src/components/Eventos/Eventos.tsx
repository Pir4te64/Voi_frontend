// src/components/EventsSection.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import EventCard, { EventCardProps } from '@/components/Eventos/EventCard';
import HeaderEvent from '@/components/Eventos/HeaderEvent';
import GlowWrapper from '@/components/GlowWrapper';
import EventsNav from '@/components/Eventos/EventsNav';
import { useEventsStore } from '@/components/heroEvents/store/useEventsStore';
import sliderImage from '@/assets/SliderEvent/Slider.png';

const monthNames = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

// Eventos estáticos por defecto
const staticEvents: EventCardProps[] = [
    {
        id: 1,
        image: sliderImage,
        category: 'Electrónica',
        date: '22 Mar 2025',
        title: 'Garden Rituals',
        location: 'Tambor de Tacuarí 8160',
        city: 'Posadas (Misiones)',
    },
    {
        id: 2,
        image: sliderImage,
        category: 'Fiestas',
        date: '30 Abr 2025',
        title: 'Sunset Beats',
        location: 'Av. Costanera 1234',
        city: 'Posadas (Misiones)',
    },
    {
        id: 3,
        image: sliderImage,
        category: 'Sociales',
        date: '10 May 2025',
        title: 'City Vibes',
        location: 'Rivadavia 567',
        city: 'Posadas (Misiones)',
    },
    {
        id: 4,
        image: sliderImage,
        category: 'Electrónica',
        date: '18 Jun 2025',
        title: 'Deep House Night',
        location: 'Ruta 12 km 8',
        city: 'Posadas (Misiones)',
    },
];

// Categorías estáticas
const staticCategories = ['Todos', 'Electrónica', 'Fiestas', 'Sociales'];

const EventsSection: React.FC = () => {
    const [activeCat, setActiveCat] = useState<string>('Todos');
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<any>(null);

    // Datos remotos de Zustand
    const eventsFromStore = useEventsStore(state => state.events);
    const fetchEvents = useEventsStore(state => state.fetchEvents);

    // Cargar al montar
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Transformar datos remotos al shape de EventCardProps
    const mappedEvents: EventCardProps[] = eventsFromStore.map(ev => {
        const [year, monthNum, dayStr] = ev.fechaInicio.split('-');
        const day = parseInt(dayStr, 10).toString();
        const month = monthNames[parseInt(monthNum, 10) - 1];
        return {
            id: ev.id,
            image: ev.sliderImageUrl,
            category: ev.categoriaNombre,
            date: `${day} ${month} ${year}`,
            title: ev.nombre,
            location: ev.lugar,
            city: 'Posadas (Misiones)', // ningun campo city en API
        };
    });

    // Decidir fuente de datos: si hay datos remotos, usarlos; si no, los estáticos
    const hasRemote = mappedEvents.length > 0;
    const dataSource = hasRemote ? mappedEvents : staticEvents;

    // Categorías dinámicas o estáticas según disponibilidad de datos
    const categories = hasRemote
        ? ['Todos', ...Array.from(new Set(mappedEvents.map(ev => ev.category)))]
        : staticCategories;

    // Filtrar según categoría activa
    const filtered = activeCat === 'Todos'
        ? dataSource
        : dataSource.filter(ev => ev.category === activeCat);

    return (
        <GlowWrapper className="bg-primary px-4 py-12 text-white md:px-16">
            <section className="relative w-full overflow-hidden text-white">
                <HeaderEvent />

                {/* Filtros + Ver Todos desktop */}
                <div className="mb-8 flex flex-wrap justify-between gap-2">
                    <div className="space-x-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`
                  px-4 py-2 text-md rounded-2xl transition uppercase
                  ${activeCat === cat
                                        ? 'bg-secondary text-primary'
                                        : 'bg-back text-white hover:bg-white/30'}
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button className="mt-4 hidden rounded border border-white px-4 py-2 transition hover:bg-white hover:text-primary sm:inline-block md:mt-0">
                        Ver Todos
                    </button>
                </div>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[A11y]}
                    onSwiper={swiper => { swiperRef.current = swiper; }}
                    onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="mb-4"
                >
                    {filtered.map(ev => (
                        <SwiperSlide key={ev.id}>
                            <EventCard {...ev} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Flechas de navegación */}
                <EventsNav swiperRef={swiperRef} />

                {/* Dots mobile */}
                <div className="mt-4 flex justify-center space-x-2 sm:hidden">
                    {filtered.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => swiperRef.current?.slideToLoop(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${activeIndex === idx ? 'bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Ver Todos mobile */}
                <div className="my-8 flex justify-center sm:hidden">
                    <button className="rounded border border-white px-4 py-2 transition hover:bg-white hover:text-primary">
                        Ver Todos
                    </button>
                </div>
            </section>
        </GlowWrapper>
    );
};

export default EventsSection;
