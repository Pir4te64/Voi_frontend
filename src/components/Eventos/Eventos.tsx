// src/components/EventsSection.tsx
import React, { useState } from 'react';
import EventCard from './EventCard';
import sliderImage from '@/assets/SliderEvent/Slider.png';

interface Event {
    id: number;
    image: string;
    category: string;
    date: string;
    title: string;
    location: string;
    city: string;
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
];

const categories = ['Todos', 'Electrónica', 'Fiestas', 'Sociales'];

const EventsSection: React.FC = () => {
    const [activeCat, setActiveCat] = useState<string>('Todos');

    const filtered = activeCat === 'Todos'
        ? staticEvents
        : staticEvents.filter(e => e.category === activeCat);

    return (
        <section className="relative py-12 px-4 md:px-16 bg-primary text-white overflow-hidden">
            {/* Título y subtítulo */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Eventos</h2>
                    <p className="mt-1 text-sm text-white/70">Categoría</p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 border border-white rounded hover:bg-white hover:text-primary transition">
                    Ver Todos
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCat(cat)}
                        className={`
              px-3 py-1 text-sm rounded-full transition
              ${activeCat === cat
                                ? 'bg-secondary text-primary'
                                : 'bg-white/20 text-white hover:bg-white/30'}
            `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(ev => (
                    <EventCard
                        key={ev.id}
                        image={ev.image}
                        category={ev.category}
                        date={ev.date}
                        title={ev.title}
                        location={ev.location}
                        city={ev.city}
                        onInfoClick={() => {/* abrir modal o ruta */ }}
                    />
                ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-end items-center space-x-4 mt-8 text-white/70">
                <button className="p-2 rounded-full hover:bg-white/20 transition">
                    ◀
                </button>
                <button className="p-2 rounded-full hover:bg-white/20 transition">
                    ▶
                </button>
            </div>
        </section>
    );
};

export default EventsSection;
