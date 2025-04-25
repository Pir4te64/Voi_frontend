// src/components/EventsSection.tsx
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import EventCard, { EventCardProps } from './EventCard';
import sliderImage from '@/assets/SliderEvent/Slider.png';

interface Event extends Omit<EventCardProps, 'onInfoClick'> {
    id: number;
}

const staticEvents: Event[] = [
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

const categories = ['Todos', 'Electrónica', 'Fiestas', 'Sociales'];

const EventsSection: React.FC = () => {
    const [activeCat, setActiveCat] = useState<string>('Todos');
    const swiperRef = useRef<any>(null);

    const filtered = activeCat === 'Todos'
        ? staticEvents
        : staticEvents.filter(e => e.category === activeCat);

    return (
        <section className="relative py-12 px-4 md:px-16 bg-primary text-white overflow-hidden">
            <div
                className="
        absolute -top-10 -right-10
        w-40 h-40
        bg-secondary rounded-full
        filter blur-3xl opacity-80
        pointer-events-none
      "
            />
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h2 className="text-5xl font-bold">Eventos</h2>
                    <p className="my-2 text-xl font-bold text-white">Categoría</p>
                </div>

            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-between">
                <div className='space-x-2'>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`
              p-2 text-md rounded-2xl transition
              ${activeCat === cat
                                    ? 'bg-secondary text-primary'
                                    : 'bg-back text-white hover:bg-white/30 '}
            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button className="mt-4 md:mt-0 px-4 py-2 border border-white rounded hover:bg-white hover:text-primary transition">
                    Ver Todos
                </button>
            </div>

            {/* Swiper Carousel */}
            <Swiper
                modules={[A11y]}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="mb-8"
            >
                {filtered.map(ev => (
                    <SwiperSlide key={ev.id}>
                        <EventCard
                            image={ev.image}
                            category={ev.category}
                            date={ev.date}
                            title={ev.title}
                            location={ev.location}
                            city={ev.city}
                            onInfoClick={() => {
                                /* abrir modal o navegar */
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Arrows */}
            <div className="flex justify-end items-center space-x-4 mt-4">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="bg-transparent text-secondary border border-secondary p-3 rounded-full hover:opacity-90 transition-opacity"
                >
                    <FaArrowLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="bg-transparent text-secondary border border-secondary p-3 rounded-full hover:opacity-90 transition-opacity"
                >
                    <FaArrowRight className="w-5 h-5" />
                </button>
            </div>
            <div
                className="
        absolute -bottom-10 -left-10
        w-40 h-40
        bg-secondary rounded-full
        filter blur-3xl opacity-80
        pointer-events-none
      "
            />
        </section>
    );
};

export default EventsSection;
