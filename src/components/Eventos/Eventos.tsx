// src/components/EventsSection.tsx
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import EventCard, { EventCardProps } from '@/components/Eventos/EventCard';
import sliderImage from '@/assets/SliderEvent/Slider.png';
import HeaderEvent from '@/components/Eventos/HeaderEvent';
import GlowWrapper from '@/components/GlowWrapper';
import EventsNav from '@/components/Eventos/EventsNav';

interface Event extends Omit<EventCardProps, 'onInfoClick'> {
    id: number;
}

const staticEvents: Event[] = [
    { id: 1, image: sliderImage, category: 'Electrónica', date: '22 Mar 2025', title: 'Garden Rituals', location: 'Tambor de Tacuarí 8160', city: 'Posadas (Misiones)' },
    { id: 2, image: sliderImage, category: 'Fiestas', date: '30 Abr 2025', title: 'Sunset Beats', location: 'Av. Costanera 1234', city: 'Posadas (Misiones)' },
    { id: 3, image: sliderImage, category: 'Sociales', date: '10 May 2025', title: 'City Vibes', location: 'Rivadavia 567', city: 'Posadas (Misiones)' },
    { id: 4, image: sliderImage, category: 'Electrónica', date: '18 Jun 2025', title: 'Deep House Night', location: 'Ruta 12 km 8', city: 'Posadas (Misiones)' },
];

const categories = ['Todos', 'Electrónica', 'Fiestas', 'Sociales'];

const EventsSection: React.FC = () => {
    const [activeCat, setActiveCat] = useState<string>('Todos');
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const swiperRef = useRef<any>(null);

    const filtered = activeCat === 'Todos'
        ? staticEvents
        : staticEvents.filter(e => e.category === activeCat);

    return (
        <GlowWrapper className="py-12 px-4 md:px-16 bg-primary text-white  ">
            <section className="relative text-white overflow-hidden w-full ">
                <HeaderEvent />

                {/* Filters + Ver Todos desktop */}
                <div className="flex flex-wrap gap-2 mb-8 justify-between">
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
                    <button className="hidden sm:inline-block mt-4 md:mt-0 px-4 py-2 border border-white rounded hover:bg-white hover:text-primary transition">
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
                            <EventCard
                                id={ev.id}
                                image={ev.image}
                                category={ev.category}
                                date={ev.date}
                                title={ev.title}
                                location={ev.location}
                                city={ev.city}
                            />

                        </SwiperSlide>
                    ))}
                </Swiper>


                {/* Flechas de navegación */}
                <EventsNav swiperRef={swiperRef} />

                {/* Dots de navegación solo en mobile */}
                <div className="flex sm:hidden justify-center mt-4 space-x-2">
                    {filtered.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => swiperRef.current?.slideToLoop(idx)}
                            className={`
                w-2 h-2 rounded-full transition-colors
                ${activeIndex === idx ? 'bg-white' : 'bg-white/50'}
              `}
                        />
                    ))}
                </div>
                <div className="sm:hidden flex justify-center my-8">
                    <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-primary transition">
                        Ver Todos
                    </button>
                </div>
            </section>
        </GlowWrapper>
    );
};

export default EventsSection;
